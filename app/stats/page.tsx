import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { getReadings } from "@/lib/supabase/readings";
import { aggregateReadings } from "@/lib/supabase/stats";
import { elements } from "@/lib/supabase/schema";

export const metadata: Metadata = { title: "사주 통계 | K-Fortune", description: "기록된 사주 계산 결과의 오행과 일간 분포를 살펴보세요." };
const names = { wood: "목 · Wood", fire: "화 · Fire", earth: "토 · Earth", metal: "금 · Metal", water: "수 · Water" };
const colors = { wood: "#73c69b", fire: "#ff766d", earth: "#d7a85d", metal: "#ddd9d1", water: "#59aee8" };
const number = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 });

export default async function StatsPage() {
  await connection();
  let stats: ReturnType<typeof aggregateReadings> | null = null;
  try { stats = aggregateReadings(await getReadings()); } catch { /* Render an honest unavailable state, never fabricated zeros. */ }

  return <main className="shell stats-shell" lang="ko">
    <nav className="nav" aria-label="주 메뉴"><Link href="/">K—Fortune</Link><Link href="/">내 사주 보기 ↗</Link></nav>
    <header className="stats-header"><span className="eyebrow">Our elements · 사주 통계</span><h1 className="serif">우리를 이루는<br/><em>다섯 가지 기운.</em></h1><p>이곳에서 만난 사주에는 어떤 기운이 담겨 있을까요?<br/>저장된 계산 결과를 모아 함께 살펴봅니다.</p></header>
    {!stats ? <section className="section stats-state" role="status"><h2>통계를 불러오지 못했어요</h2><p>잠시 후 다시 시도해 주세요. 사주 보기는 계속 이용할 수 있어요.</p><a className="secondary" href="/stats">다시 불러오기</a></section>
      : stats.total === 0 ? <section className="section stats-state"><h2>아직 기록된 사주가 없어요</h2><p>첫 계산 결과가 저장되면 오행과 일간 분포가 여기에 나타납니다.</p><Link className="primary" href="/">내 사주 보기</Link></section>
      : <>
        <div className="stats-summary"><article><span>누적 계산 건수</span><strong>{number.format(stats.total)}<small>건</small></strong></article><article><span>출생 시간을 아는 기록</span><strong>{number.format(stats.timeAccuracy.known / stats.total * 100)}<small>%</small></strong></article><article><span>출생 시간 미상</span><strong>{number.format(stats.timeAccuracy.unknown)}<small>건</small></strong></article></div>
        <div className="stats-grid">
          <Distribution title="일간의 오행" description="나를 대표하는 중심 기운 · 전체 계산 건수 대비 비율" items={elements.map(key => ({ label: names[key], value: stats!.dayMasters[key], color: colors[key] }))} denominator={stats.total}/>
          <Distribution title="평균 오행 분포" description="계산 1건당 오행 개수의 평균 · 시간 미상 기록은 6글자 기준" items={elements.map(key => ({ label: names[key], value: stats!.averageElements[key], color: colors[key] }))} denominator={8} average/>
          <Distribution title="일간의 강약" description="강약은 좋고 나쁨을 의미하지 않아요." items={[{ label: "신강", value: stats.strength.strong }, { label: "신약", value: stats.strength.weak }, { label: "중화", value: stats.strength.balanced }]} denominator={stats.total}/>
          <Distribution title="궁금했던 이야기" description="어떤 주제로 사주를 살펴보았을까요?" items={[{ label: "성격", value: stats.topics.personality }, { label: "연애", value: stats.topics.love }, { label: "직업", value: stats.topics.career }, { label: "올해의 흐름", value: stats.topics.year }, ...(stats.topics.other ? [{ label: "기타", value: stats.topics.other }] : [])]} denominator={stats.total}/>
        </div>
        <Distribution title="일간의 음양" description="일간이 가진 음과 양의 분포" items={[{ label: "음 · Yin", value: stats.yinYang.yin }, { label: "양 · Yang", value: stats.yinYang.yang }]} denominator={stats.total}/>
      </>}
    <aside className="notice stats-note">통계는 저장에 성공한 계산 건수 기준이며, 같은 사람의 재조회와 주제 변경도 각각 포함합니다. 전체 인구의 분포를 나타내지 않습니다. 생년월일시·출생지 원문은 저장하지 않으며, 계산된 사주 결과와 성별·관심 주제만 기록합니다. 페이지를 새로 열면 최신 기록을 조회합니다.</aside>
  </main>;
}

function Distribution({ title, description, items, denominator, average = false }: { title: string; description: string; items: { label: string; value: number; color?: string }[]; denominator: number; average?: boolean }) {
  return <section className="section stats-card"><h2 className="serif">{title}</h2><p>{description}</p><ul className="stats-bars">{items.map(item => {
    const percent = denominator ? item.value / denominator * 100 : 0;
    return <li key={item.label}><div className="stats-bar-label"><span>{item.label}</span><span>{number.format(item.value)}{average ? "개" : `건 · ${number.format(percent)}%`}</span></div><div className="bar-track" aria-hidden="true"><div className="bar-fill" style={{ width: `${Math.min(100, percent)}%`, background: item.color ?? "var(--accent)" }}/></div></li>;
  })}</ul></section>;
}
