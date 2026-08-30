import type { ElementKey, Reading, SajuChart, SajuRequest } from "@/lib/saju/schema";

const identities: Record<ElementKey, { name: string; symbol: string; tagline: string; qualities: string[]; growth: string[] }> = {
  wood: { name: "Wood", symbol: "Growth", tagline: "The Quiet Pioneer", qualities: ["Growth-minded", "Adaptable", "Purposeful"], growth: ["Protect your energy", "Finish before expanding"] },
  fire: { name: "Fire", symbol: "Spark", tagline: "The Living Flame", qualities: ["Expressive", "Warm", "Motivating"], growth: ["Pause before reacting", "Make room for recovery"] },
  earth: { name: "Earth", symbol: "Ground", tagline: "The Steady Center", qualities: ["Reliable", "Practical", "Supportive"], growth: ["Welcome change", "Share the load"] },
  metal: { name: "Metal", symbol: "Clarity", tagline: "The Hidden Diamond", qualities: ["Discerning", "Composed", "Precise"], growth: ["Soften perfectionism", "Say what you need"] },
  water: { name: "Water", symbol: "Flow", tagline: "The Deep Current", qualities: ["Intuitive", "Observant", "Resourceful"], growth: ["Choose a direction", "Turn reflection into action"] },
};

export function buildLocalReading(chart: SajuChart, input: SajuRequest): Reading {
  const identity = identities[chart.dayMaster.element];
  const polarity = chart.dayMaster.yinYang === "yin" ? "Yin" : "Yang";
  if (input.locale === "ko") {
    const elementKo: Record<ElementKey, string> = { wood: "목", fire: "화", earth: "토", metal: "금", water: "수" };
    const taglineKo: Record<ElementKey, string> = { wood: "고요한 개척자", fire: "살아 있는 불꽃", earth: "단단한 중심", metal: "숨겨진 보석", water: "깊은 물결" };
    const strengthsKo: Record<ElementKey, string[]> = {
      wood: ["성장을 추구해요", "유연하게 적응해요", "목적의식이 뚜렷해요"], fire: ["표현력이 좋아요", "따뜻해요", "사람들에게 동기를 줘요"],
      earth: ["믿음직해요", "현실적이에요", "주변을 안정시켜요"], metal: ["분별력이 있어요", "침착해요", "정확해요"], water: ["직관적이에요", "관찰력이 좋아요", "상황 대처가 유연해요"],
    };
    const growthKo: Record<ElementKey, string[]> = {
      wood: ["에너지를 지켜 주세요", "확장하기 전에 마무리해 보세요"], fire: ["반응하기 전 잠시 멈춰 보세요", "회복할 시간을 만드세요"],
      earth: ["변화를 환영해 보세요", "짐을 나눠 보세요"], metal: ["완벽주의를 조금 내려놓으세요", "필요한 것을 말해 보세요"], water: ["한 방향을 선택해 보세요", "생각을 행동으로 옮겨 보세요"],
    };
    const weakKo = chart.weakElements.map((item) => elementKo[item]).join("·") || "뚜렷한 부족 요소 없음";
    const topicKo = {
      personality: "성격을 볼 때 중요한 것은 한 가지 특징으로 자신을 규정하지 않는 거예요. 겉으로 드러나는 방식과 혼자 있을 때의 마음이 다를 수 있고, 그것은 모순이 아니라 상황에 맞춰 살아온 힘일 수 있습니다.",
      love: "관계에서는 상대에게 맞추는 것과 내 마음을 지키는 것 사이에서 고민할 수 있어요. 좋은 관계는 오래 참는 관계보다 불편함을 안전하게 말할 수 있는 관계에 가깝습니다. 지금의 관계를 당장 결론 내리기보다, 내 감정이 존중받고 있는지 천천히 살펴보세요.",
      career: "일에서는 책임감 때문에 예상보다 많은 몫을 떠안을 수 있어요. 잘 해내는 능력과 계속 감당해야 할 의무는 같은 말이 아닙니다. 성과를 인정하면서도 어디까지가 내 책임인지 선을 그어도 괜찮아요.",
      year: `${input.targetYear ?? new Date().getFullYear()}년은 정답을 맞히는 해라기보다 무엇을 유지하고 무엇을 조정할지 살펴보는 시간으로 활용해 보세요. 큰 결정을 서두르기보다 반복해서 마음에 걸리는 신호를 기록하면 내 기준이 더 선명해질 수 있어요.`,
    }[input.topic];
    const summary = [
      `당신의 중심 기운은 ${chart.dayMaster.yinYang === "yin" ? "음" : "양"}의 ${elementKo[chart.dayMaster.element]}입니다. ${taglineKo[chart.dayMaster.element]}라는 표현처럼, 쉽게 드러내지 않더라도 안쪽에는 분명한 기준과 고유한 속도가 있을 수 있어요. 지금까지 주변의 기대에 맞추느라 자신의 마음을 뒤로 미뤘다면, 그것은 약해서가 아니라 관계와 책임을 소중히 여겨 왔기 때문일 거예요.`,
      `오행 분포에서는 ${elementKo[chart.dayMaster.element]} 기운을 중심으로 여러 성향이 함께 움직입니다. 어떤 기운이 많다고 무조건 좋거나, 적다고 결함인 것은 아니에요. 상대적으로 약하게 나타난 ${weakKo} 기운은 “없는 능력”이 아니라 의식적으로 쉬어 가거나 다른 사람과 환경의 도움을 받아 균형을 만들 수 있는 지점으로 보는 편이 좋습니다.`,
      `마음속에서는 잘하고 싶은 마음과 편안하고 싶은 마음이 동시에 움직일 수 있어요. 책임감이 강해질수록 작은 실수도 크게 느끼거나, 충분히 해낸 뒤에도 부족한 부분부터 볼 가능성이 있습니다. 하지만 스스로에게 엄격했던 시간만큼 이미 많은 것을 버티고 배워 왔다는 사실도 함께 기억해 주세요.`,
      topicKo,
      `이 해석은 앞으로 일어날 일을 확정하는 예언이 아닙니다. 오히려 지금의 나를 조금 더 다정하고 정확하게 바라보기 위한 언어에 가까워요. 모든 조언을 한꺼번에 따르기보다, 지금 마음에 남는 한 문장만 골라 생활 속에서 시험해 보세요. 당신에게 맞는 답은 결국 당신의 경험과 선택 속에서 만들어집니다.`,
    ].join("\n\n");
    return {
      title: `${chart.dayMaster.yinYang === "yin" ? "음" : "양"}의 ${elementKo[chart.dayMaster.element]}`,
      tagline: taglineKo[chart.dayMaster.element],
      summary,
      strengths: strengthsKo[chart.dayMaster.element].map((item) => `${item}. 이 장점이 가장 자연스럽게 드러났던 최근 경험을 떠올려 보세요.`),
      growthAreas: growthKo[chart.dayMaster.element].map((item) => `${item}. 바꾸지 못한 자신을 탓하기보다 아주 작은 범위부터 연습해도 충분합니다.`),
      guidance: ["이번 주에 반복해서 마음이 불편했던 순간을 한 번만 기록해 보세요. 감정 아래에 어떤 필요가 있었는지 살펴보면 내 기준을 찾는 데 도움이 됩니다.", "결정을 앞두고 있다면 ‘해야 하는 것’과 ‘내가 원하는 것’을 따로 적어 보세요. 둘이 겹치지 않아도 잘못된 것이 아닙니다.", "지치거나 불안할 때는 큰 결론을 미루고 수면, 식사, 휴식처럼 지금 조절 가능한 것부터 돌보세요."], source: "local",
    };
  }
  const topic = input.topic === "year" ? `${input.targetYear ?? new Date().getFullYear()} can be used as a reflection point` : `${input.topic[0].toUpperCase()}${input.topic.slice(1)} is best read as a pattern, not a prediction`;

  return {
    title: `${polarity} ${identity.name}`,
    tagline: identity.tagline,
    summary: `Your core energy is ${polarity} ${identity.name}: ${identity.symbol.toLowerCase()} expressed in a ${chart.dayMaster.strength} pattern. This can describe someone who carries a clear inner standard even when it is not immediately visible to others. If you have spent a long time meeting expectations or keeping things steady, that does not make you weak—it may show how seriously you take people and responsibility.\n\nYour element balance is not a scorecard. Strong elements describe familiar strategies, while weaker elements point to places where rest, conscious practice, or support from other people can help. Nothing in this chart makes you incomplete.\n\n${topic}. Treat it as a way to notice repeated patterns rather than a forecast of fixed events. You do not need to act on every insight today. Keep the sentence that feels useful and let your lived experience decide what is true for you.`,
    strengths: identity.qualities.map((item) => `${item}: think of a recent moment when this quality helped you or someone around you.`),
    growthAreas: identity.growth.map((item) => `${item}. Start gently; growth does not require rejecting who you have been.`),
    guidance: ["Write down one moment this week that felt emotionally heavy and name the need underneath it.", "Before a decision, separate what you feel expected to do from what you genuinely want.", "When tired or anxious, delay sweeping conclusions and care for what is within reach first."],
    source: "local",
  };
}
