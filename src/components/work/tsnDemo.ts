// Prewritten examples illustrate the repository's routing rules. No article is
// fetched, scored by an LLM, or published by this portfolio component.
export const tsnSamples = [
  {
    id: "report",
    label: "Detailed report",
    title: "Inside an electric bus pilot",
    content:
      "An illustrative report describing a city's electric bus pilot, its operating conditions, charging requirements, and the next evaluation steps.",
    score: 74,
    categories: ["Technology", "Environment"],
    summary: [
      "A pilot explores electric buses on selected routes.",
      "Charging and operating conditions shape the trial.",
      "Evaluation informs the next phase of the project.",
    ],
    tags: ["Urban mobility", "Technology enthusiast"],
  },
  {
    id: "clickbait",
    label: "Low-quality story",
    title: "You won't believe what happens next",
    content:
      "This fictional example has enough text to pass the input length check, but contains vague claims and little useful context for a reader.",
    score: 32,
    categories: ["General news"],
    summary: [
      "The headline promises a surprising outcome.",
      "The text offers little supporting context.",
      "The claim needs more source material before use.",
    ],
    tags: ["General reader", "Low-information input"],
  },
  {
    id: "incomplete",
    label: "Incomplete input",
    title: "An unfinished update",
    content: "A short update.",
    score: null,
    categories: [],
    summary: [],
    tags: [],
  },
] as const;

export type TsnSample = (typeof tsnSamples)[number];

export function evaluateTsnSample(sample: TsnSample, threshold: number) {
  if (!sample.title.trim() || sample.content.trim().length < 50) {
    return { status: "invalid", label: "Invalid input", score: null } as const;
  }
  if (sample.score !== null && sample.score >= threshold) {
    return { status: "approved", label: "Passes quality gate", score: sample.score } as const;
  }
  return { status: "discarded", label: "Below threshold", score: sample.score } as const;
}
