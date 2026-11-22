export const caseStudyData = {
  title: "DubbingAI",
  subtitle: "Discord support case study",
  metrics: [
    { value: "30K", label: "Members", detail: "Discord community" },
    { value: "80%", label: "Automation", detail: "Reached in 15 days" },
    { value: "15", label: "Days", detail: "To operating change" },
    { value: "3 -> 0", label: "Human mods", detail: "Dedicated coverage load" },
    { value: "24/7", label: "Coverage", detail: "Support kept moving" },
  ],
  repeatedSignals: [
    "How do I export the dubbed video?",
    "Why is lip sync drifting in this clip?",
    "Can I switch voices after generation?",
    "Where do I change subtitle timing?",
    "The same setup questions keep coming back.",
    "Escalations still land on the same three people.",
  ],
  structuredOutputs: [
    "Recurring intent mapped",
    "Likely resolution path",
    "Escalation boundary ready",
    "Reusable answer pattern",
  ],
  learningLoop: [
    {
      title: "Onboard from history",
      body: "Start from the community's own chat history, repeated intents, and prior resolutions.",
    },
    {
      title: "Learn in the flow",
      body: "Pick up new questions as they appear in live Discord support work.",
    },
    {
      title: "Optimize over time",
      body: "Use successful resolutions and missed cases to improve future responses.",
    },
    {
      title: "Escalate edge cases",
      body: "Hand off what still needs a human, then learn from the outcome.",
    },
  ],
  supportRows: [
    { label: "Answer delivered", owner: "Lucius" },
    { label: "Repeat question resolved", owner: "Auto" },
    { label: "Edge case escalated", owner: "Human" },
  ],
  channels: ["general", "help", "showcase", "announcements"],
  outcomeQuote: "Lucius basically gave me my holidays back.",
  methodLine: "Better support keeps the room alive.",
};

export const sceneTimeline = [
  { id: "scene-setup", duration: 6800 },
  { id: "scene-overload", duration: 7000 },
  { id: "scene-lucius", duration: 7600 },
  { id: "scene-loop", duration: 7600 },
  { id: "scene-results", duration: 6800 },
  { id: "scene-human", duration: 7000 },
  { id: "scene-method", duration: 8200 },
];
