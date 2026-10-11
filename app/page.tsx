"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ElementKey, SajuRequest, SajuResponse } from "@/lib/saju/schema";

const colors: Record<ElementKey, string> = { wood: "#73c69b", fire: "#ff766d", earth: "#d7a85d", metal: "#ddd9d1", water: "#59aee8" };
const labels: Record<ElementKey, string> = { wood: "Wood", fire: "Fire", earth: "Earth", metal: "Metal", water: "Water" };
type Locale = "ko" | "en";
const copy = {
  en: { eyebrow:"Korean astrology · Four pillars", hero1:"You know your zodiac.", hero2:"Meet your Korean one.", heroBody:"Your birthday holds four pillars and eight characters. Discover the element at the center of your story.", discover:"Discover my core element", chart:"Your birth chart", question:"When did your story begin?", date:"Birth date · Solar calendar", time:"Birth time", unknown:"I don't know my birth time", place:"Birthplace (optional in beta)", placeHolder:"Seoul, South Korea", gender:"Gender used by the chart system", female:"Female", male:"Male", explore:"What do you want to explore?", personality:"Personality", love:"Love", career:"Career", year:"Year ahead", privacy:"Your birth details are not saved. Calculated chart results, gender and topic are recorded for statistics.", read:"Read my chart", loading:"Finding your Four Pillars…", loadingSub:"Reading your eight characters" },
  ko: { eyebrow:"한국 사주 · 사주팔자", hero1:"별자리는 알고 있죠.", hero2:"이제 나의 사주를 만나보세요.", heroBody:"생년월일에는 네 개의 기둥과 여덟 글자가 담겨 있어요. 나를 이루는 중심 기운을 발견해 보세요.", discover:"나의 중심 기운 알아보기", chart:"나의 사주", question:"당신의 이야기는 언제 시작됐나요?", date:"생년월일 · 양력", time:"태어난 시간", unknown:"태어난 시간을 몰라요", place:"출생지 (베타에서는 선택 사항)", placeHolder:"서울, 대한민국", gender:"사주 계산에 사용할 성별", female:"여성", male:"남성", explore:"무엇이 궁금한가요?", personality:"성격", love:"연애", career:"직업", year:"올해의 흐름", privacy:"생년월일시·출생지 원문은 저장하지 않습니다. 계산된 사주 결과와 성별·관심 주제는 통계에 기록합니다.", read:"내 사주 보기", loading:"사주 네 기둥을 찾고 있어요…", loadingSub:"여덟 글자를 읽는 중" },
} as const;

export default function Home() {
  const formRef = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [unknownTime, setUnknownTime] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<SajuResponse | null>(null);
  const [lastRequest, setLastRequest] = useState<SajuRequest | null>(null);
  const [locale, setLocale] = useState<Locale>("en");
  const maxDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const t = copy[locale];
  useEffect(() => {
    const saved = localStorage.getItem("k-fortune-locale");
    if (saved !== "ko" && saved !== "en") return;
    const timer = window.setTimeout(() => setLocale(saved), 0);
    return () => window.clearTimeout(timer);
  }, []);
  function changeLocale(next: Locale) { setLocale(next); localStorage.setItem("k-fortune-locale", next); document.documentElement.lang = next; setResult(null); }

  async function submit(formData: FormData) {
    const payload: SajuRequest = {
      locale,
      birthDate: String(formData.get("birthDate")), birthTime: unknownTime ? undefined : String(formData.get("birthTime")),
      birthTimeKnown: !unknownTime, gender: String(formData.get("gender")) as SajuRequest["gender"], birthPlace: String(formData.get("birthPlace") || "") || undefined,
      topic: String(formData.get("topic")) as SajuRequest["topic"],
    };
    setLastRequest(payload);
    await requestReading(payload);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit(new FormData(event.currentTarget));
  }

  async function requestReading(payload: SajuRequest) {
    setLoading(true); setError(""); setResult(null);
    try {
      const response = await fetch("/api/saju", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Please check your details.");
      setResult(data);
      setTimeout(() => document.querySelector("#result")?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Something went wrong."); }
    finally { setLoading(false); }
  }

  async function changeTopic(topic: SajuRequest["topic"]) {
    if (!lastRequest) return;
    const payload = { ...lastRequest, locale, topic };
    setLastRequest(payload);
    await requestReading(payload);
  }

  return <main className="shell">
    <nav className="nav" aria-label="Primary"><span>K—Fortune</span><div className="nav-tools"><Link href="/stats">{locale === "ko" ? "통계" : "Statistics"}</Link><div className="language-switch" aria-label="Language"><button className={locale === "ko" ? "active" : ""} onClick={()=>changeLocale("ko")} aria-pressed={locale === "ko"}>한국어</button><span>/</span><button className={locale === "en" ? "active" : ""} onClick={()=>changeLocale("en")} aria-pressed={locale === "en"}>EN</button></div><span className="brand-mark" aria-hidden="true">{[1,2,3,4].map((x) => <i key={x} style={{ "--i": x } as React.CSSProperties} />)}</span></div></nav>
    <section className="hero">
      <span className="eyebrow">{t.eyebrow}</span>
      <h1 className="serif">{t.hero1}<br/><em>{t.hero2}</em></h1>
      <p>{t.heroBody}</p>
      <div><button className="primary" onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}>{t.discover}</button></div>
    </section>

    <section className="onboarding" ref={formRef} aria-labelledby="birth-heading">
      <div className="progress" aria-label="Step 1 of 1"><i className="active"/><i className="active"/><i/><i/></div>
      <div className="panel">
        {loading && <div className="loading" aria-live="polite"><div><div className="stars" aria-hidden="true">{[1,2,3,4,5,6,7,8].map((x)=><i key={x}/>)}</div><h2 className="serif">{t.loading}</h2><p className="eyebrow">{t.loadingSub}</p></div></div>}
        <form onSubmit={handleSubmit} className={loading ? "form-hidden" : undefined}>
          <span className="eyebrow">{t.chart}</span><h2 id="birth-heading" className="serif">{t.question}</h2>
          <div className="field"><label htmlFor="birthDate">{t.date}</label><input required id="birthDate" name="birthDate" type="date" max={maxDate}/></div>
          <div className="field"><label htmlFor="birthTime">{t.time}</label><input required={!unknownTime} disabled={unknownTime} id="birthTime" name="birthTime" type="time"/></div>
          <label className="choice"><input type="checkbox" checked={unknownTime} onChange={(event)=>setUnknownTime(event.target.checked)}/> {t.unknown}</label>
          <div className="field"><label htmlFor="birthPlace">{t.place}</label><input id="birthPlace" name="birthPlace" placeholder={t.placeHolder} maxLength={120}/></div>
          <div className="row"><div className="field"><label htmlFor="gender">{t.gender}</label><select id="gender" name="gender" defaultValue="female"><option value="female">{t.female}</option><option value="male">{t.male}</option></select></div>
          <div className="field"><label htmlFor="topic">{t.explore}</label><select id="topic" name="topic" defaultValue="personality"><option value="personality">{t.personality}</option><option value="love">{t.love}</option><option value="career">{t.career}</option><option value="year">{t.year}</option></select></div></div>
          <p className="eyebrow">{t.privacy}</p>{error && <p className="error" role="alert">{error}</p>}
          <div className="actions"><button className="primary" type="submit">{t.read}</button></div>
        </form>
      </div>
    </section>
    {result && <Result data={result} locale={locale} activeTopic={lastRequest?.topic ?? "personality"} onTopic={changeTopic}/>} 
  </main>;
}

function Result({ data, locale, activeTopic, onTopic }: { data: SajuResponse; locale: Locale; activeTopic: SajuRequest["topic"]; onTopic: (topic: SajuRequest["topic"]) => void }) {
  const element = data.chart.dayMaster.element;
  const ko = locale === "ko";
  const pillarNames: Record<string, string> = { year: "연주", month: "월주", day: "일주", hour: "시주" };
  const elementNames: Record<ElementKey, string> = ko ? { wood: "목", fire: "화", earth: "토", metal: "금", water: "수" } : labels;
  const style = { "--element": colors[element] } as React.CSSProperties;
  const pillarEntries = Object.entries(data.chart.pillars) as [string, SajuResponse["chart"]["pillars"]["year"] | null][];
  const sectionCopy = ko ? {
    personality: ["나의 타고난 패턴", "자연스럽게 드러나는 모습", "성장을 위한 힌트"],
    love: ["관계 속의 나", "사랑할 때의 강점", "관계에서 살펴볼 점"],
    career: ["나의 업무 방식", "일할 때의 강점", "커리어에서 살펴볼 점"],
    year: ["올해의 흐름", "올해 활용할 수 있는 힘", "올해 조심스럽게 살펴볼 점"],
  }[activeTopic] : {
    personality: ["Your natural pattern", "What comes naturally", "Your growth edge"],
    love: ["You in relationships", "Relationship strengths", "Patterns to watch"],
    career: ["Your working style", "Professional strengths", "Career watch-outs"],
    year: ["Your year ahead", "Strengths to use this year", "What to watch this year"],
  }[activeTopic];
  return <section id="result" className="result" style={style} aria-labelledby="result-title">
    <div className="topic-switch" aria-label={ko ? "해석 주제" : "Reading topic"}>{(["personality", "love", "career", "year"] as const).map((topic) => <button key={topic} className={activeTopic === topic ? "active" : ""} aria-pressed={activeTopic === topic} onClick={() => onTopic(topic)}>{ko ? { personality:"성격", love:"연애", career:"직업", year:"올해의 흐름" }[topic] : { personality:"Personality", love:"Love", career:"Career", year:"Year ahead" }[topic]}</button>)}</div>
    <div className="reveal"><span className="eyebrow">{ko ? "나의 중심 기운" : "Your core element"}</span><div className="element-orb" aria-hidden="true"/><h2 id="result-title" className="serif">{data.reading.title}</h2><h3 className="serif">{data.reading.tagline}</h3><p>{data.reading.summary}</p></div>
    <article className="section"><span className="eyebrow">{sectionCopy[0]}</span><h3 className="serif">{sectionCopy[1]}</h3><ul>{data.reading.strengths.map(x=><li key={x}>{x}</li>)}</ul><h3 className="serif">{sectionCopy[2]}</h3><ul>{data.reading.growthAreas.map(x=><li key={x}>{x}</li>)}</ul></article>
    <article className="section"><span className="eyebrow">{ko ? "나를 이루는 구조" : "The structure beneath"}</span><h3 className="serif">{ko ? "나의 사주 네 기둥" : "Your Four Pillars"}</h3><div className="pillars">{pillarEntries.map(([name,pillar])=><div className="pillar" key={name}><span className="eyebrow">{ko ? pillarNames[name] : name}</span><strong>{pillar?.label ?? (ko ? "미상" : "Unknown")}</strong><small>{pillar?.hanja ?? "—"}</small></div>)}</div></article>
    <article className="section"><span className="eyebrow">{ko ? "기운의 균형" : "Element balance"}</span><h3 className="serif">{ko ? "나의 오행" : "Your Five Elements"}</h3><div className="bars">{Object.entries(data.chart.fiveElements).map(([key,value])=><div className="bar" key={key}><span>{elementNames[key as ElementKey]}</span><div className="bar-track"><div className="bar-fill" style={{width:`${Math.max(4,value/8*100)}%`, background: colors[key as ElementKey]}}/></div><span>{value}</span></div>)}</div>
    <div className="notice">{ko ? "베타 계산에서는 절기 경계를 날짜 단위로 근사하며 진태양시를 보정하지 않습니다." : data.chart.limitations.join(" ")}</div></article>
    <article className="section"><span className="eyebrow">{ko ? "현실적인 해석" : "A grounded reading"}</span><h3 className="serif">{ko ? "이렇게 활용해 보세요" : "Take this with you"}</h3><ul>{data.reading.guidance.map(x=><li key={x}>{x}</li>)}</ul><p>{ko ? "이 해석은 자기 이해와 재미를 위한 참고 자료이며, 결정된 운명이나 전문적인 조언이 아닙니다." : "This reading is for self-reflection and entertainment—not a fixed verdict or professional advice."}</p><div className="result-actions"><button className="primary" onClick={()=>window.print()}>{ko ? "결과 저장" : "Save my result"}</button><button className="secondary" onClick={()=>navigator.share?.({title:ko ? "나의 사주" : "My Korean Astrology",text:`${data.reading.title} — ${data.reading.tagline}`,url:location.href})}>{ko ? "공유" : "Share"}</button></div></article>
  </section>;
}
