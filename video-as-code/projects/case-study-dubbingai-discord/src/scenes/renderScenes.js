import { caseStudyData, sceneTimeline } from "../data/caseStudy.js";
import {
  communityThread,
  loopCard,
  metricTile,
  queueCard,
  statPill,
  structureCard,
} from "../components/sceneChrome.js";

const supportCloudDots = [
  { x: 12, y: 18, size: 8 },
  { x: 20, y: 30, size: 10 },
  { x: 28, y: 16, size: 6 },
  { x: 36, y: 34, size: 9 },
  { x: 46, y: 22, size: 7 },
  { x: 54, y: 14, size: 8 },
  { x: 62, y: 28, size: 10 },
  { x: 70, y: 18, size: 6 },
  { x: 78, y: 32, size: 9 },
  { x: 84, y: 20, size: 7 },
  { x: 18, y: 48, size: 7 },
  { x: 30, y: 56, size: 8 },
  { x: 42, y: 50, size: 10 },
  { x: 56, y: 60, size: 7 },
  { x: 68, y: 50, size: 9 },
  { x: 80, y: 58, size: 8 },
  { x: 24, y: 72, size: 6 },
  { x: 36, y: 78, size: 8 },
  { x: 48, y: 70, size: 10 },
  { x: 62, y: 78, size: 7 },
  { x: 74, y: 72, size: 9 },
  { x: 86, y: 80, size: 6 },
];

function setupScene() {
  return `
    <section class="scene scene--setup" data-scene="scene-setup">
      <div class="scene__surface">
        <div class="scene__hero">
          <div class="scene__hero-copy">
            <div class="scene__eyebrow">Customer case</div>
            <p class="scene__brandline">Discord support at scale</p>
            <h1 class="scene__headline">30K members. One Discord support surface.</h1>
            <p class="scene__body">DubbingAI had a large community and a small team carrying the support burden.</p>
            <div class="scene__pill-row">
              ${statPill("30K members")}
              ${statPill("Discord support")}
              ${statPill("Team of 3")}
            </div>
          </div>
          <div class="scene__hero-visual">
            <div class="orbital-grid"></div>
            <div class="community-presence">
              <span class="community-presence__label">Community activity</span>
              <div class="community-presence__bars">
                ${Array.from({ length: 7 })
                  .map((_, index) => `<span style="--bar-index:${index}"></span>`)
                  .join("")}
              </div>
            </div>
            <div class="community-stack">
              ${caseStudyData.repeatedSignals
                .slice(0, 5)
                .map((item, index) =>
                  communityThread(item, index, index < 2 ? "Live" : "Repeat"),
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function overloadScene() {
  return `
    <section class="scene scene--overload" data-scene="scene-overload">
      <div class="scene__surface scene__surface--dense">
        <div class="scene__split">
          <div class="scene__split-copy">
            <div class="scene__eyebrow">Where it broke</div>
            <h2 class="scene__headline scene__headline--medium">The same questions kept landing on the same three people.</h2>
            <p class="scene__body">As the community grew, support did too. The queue stayed live, and the team stayed on call.</p>
          </div>
          <div class="scene__split-visual scene__split-visual--pressure">
            <div class="queue-stack">
              ${caseStudyData.repeatedSignals
                .map((item, index) => queueCard(item, index, index > 3 ? "Escalation" : "Repeat"))
                .join("")}
            </div>
            <div class="pressure-meter">
              <span class="pressure-meter__label">Always on</span>
              <div class="pressure-meter__rail">
                <div class="pressure-meter__fill"></div>
              </div>
            </div>
            <div class="operator-strip">
              <div class="operator-strip__label">Human team</div>
              <div class="operator-strip__avatars">
                <span>01</span>
                <span>02</span>
                <span>03</span>
              </div>
              <div class="operator-strip__meters">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="operator-strip__status">Support stayed on call around the clock.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function luciusScene() {
  return `
    <section class="scene scene--lucius" data-scene="scene-lucius">
      <div class="scene__surface">
        <div class="system-stage system-stage--flow">
          <div class="system-stage__column system-stage__column--left">
            <div class="scene__eyebrow">Inside the workflow</div>
            <h2 class="scene__headline scene__headline--medium">Lucius reads the work the community is already generating.</h2>
            <p class="scene__body">Repeated questions, prior resolutions, and escalation patterns become usable support structure.</p>
            <div class="signal-card-stack">
              ${caseStudyData.repeatedSignals
                .slice(0, 4)
                .map(
                  (item, index) => `
                    <div class="signal-card" style="--signal-index:${index}">
                      <span class="signal-card__badge">${index < 2 ? "History" : "Live"}</span>
                      <strong>${item}</strong>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="system-stage__center">
            <div class="flow-lane flow-lane--left">
              ${Array.from({ length: 5 })
                .map((_, index) => `<span class="flow-particle flow-particle--left" style="--particle-index:${index}"></span>`)
                .join("")}
            </div>
            <div class="flow-lane flow-lane--right">
              ${Array.from({ length: 5 })
                .map((_, index) => `<span class="flow-particle flow-particle--right" style="--particle-index:${index}"></span>`)
                .join("")}
            </div>
            <div class="lucius-node">
              <img src="./public/assets/lucius.svg" alt="Lucius" />
            </div>
            <div class="lucius-node__rings">
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="system-stage__column system-stage__column--right">
            <p class="system-stage__label">What Lucius structures</p>
            <div class="structure-stack">
              ${caseStudyData.structuredOutputs.map((item, index) => structureCard(item, index)).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function loopScene() {
  return `
    <section class="scene scene--loop" data-scene="scene-loop">
      <div class="scene__surface">
        <div class="loop-layout">
          <div class="loop-layout__copy">
            <div class="scene__eyebrow">Learning loop</div>
            <h2 class="scene__headline scene__headline--medium">Lucius improves in the flow, not after the fact.</h2>
            <p class="scene__body">It starts from history, learns live, optimizes over time, and hands off edge cases when needed.</p>
          </div>
          <div class="loop-system">
            <div class="loop-orbit"></div>
            <div class="loop-orbit loop-orbit--inner"></div>
            <div class="loop-token"></div>
            <div class="loop-grid">
              ${caseStudyData.learningLoop.map((step, index) => loopCard(step.title, step.body, index)).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function resultsScene() {
  return `
    <section class="scene scene--results" data-scene="scene-results">
      <div class="scene__surface">
        <div class="results-layout">
          <div class="results-layout__copy">
            <div class="scene__eyebrow">Measured result</div>
            <h2 class="scene__headline scene__headline--medium">In 15 days, the operating model changed.</h2>
            <p class="scene__body">80% automation. 3 to 0 human mods. 24/7 coverage across a 30K-member Discord community.</p>
            <div class="scene__pill-row">
              ${statPill("30K community")}
              ${statPill("15-day ramp")}
            </div>
          </div>
          <div class="results-layout__panel">
            <div class="metrics-grid">
              ${caseStudyData.metrics
                .map((metric, index) => {
                  const accents = ["lavender", "violet", "moss", "", "warm"];
                  const variant = index === 3 ? "reduction" : "";
                  return metricTile(metric, accents[index] ?? "", index, variant);
                })
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function humanScene() {
  return `
    <section class="scene scene--human" data-scene="scene-human">
      <div class="scene__surface">
        <div class="human-layout">
          <div class="human-layout__quote">
            <div class="scene__eyebrow">Human outcome</div>
            <p class="quote-mark">"</p>
            <h2 class="scene__headline scene__headline--medium">${caseStudyData.outcomeQuote}</h2>
            <p class="scene__body">Support kept moving, but the team no longer had to live inside Discord.</p>
          </div>
          <div class="human-layout__visual">
            <div class="ghost-queue">
              ${Array.from({ length: 4 })
                .map((_, index) => `<span class="ghost-strip" style="--ghost-index:${index}"></span>`)
                .join("")}
            </div>
            <div class="calm-panel">
              <div class="calm-panel__header">Live support continues</div>
              <div class="calm-panel__rows">
                ${caseStudyData.supportRows
                  .map(
                    (row, index) => `
                      <div class="calm-panel__row" style="--row-index:${index}">
                        <span>${row.label}</span>
                        <em>${row.owner}</em>
                        <i class="support-spark"></i>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
            </div>
            <div class="holiday-marker">Holiday mode, finally possible</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function methodScene() {
  return `
    <section class="scene scene--method" data-scene="scene-method">
      <div class="scene__surface scene__surface--editorial">
        <div class="method-layout">
          <div class="method-layout__diagram">
            <div class="support-cloud">
              ${supportCloudDots
                .map(
                  (dot, index) => `
                    <span
                      class="support-cloud__dot"
                      style="--dot-index:${index}; --dot-x:${dot.x}%; --dot-y:${dot.y}%; --dot-size:${dot.size}px;"
                    ></span>
                  `,
                )
                .join("")}
            </div>
            <div class="channel-bars">
              ${caseStudyData.channels
                .map((label, index) => `<span style="--channel-index:${index}">${label}</span>`)
                .join("")}
            </div>
          </div>
          <div class="method-layout__copy">
            <div class="scene__eyebrow">What this case proves</div>
            <h2 class="scene__headline scene__headline--serif">${caseStudyData.methodLine}</h2>
            <p class="scene__body">The win is not more visible structure. It is a support system strong enough to keep participation moving until the community carries itself.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

const sceneMarkup = {
  "scene-setup": setupScene,
  "scene-overload": overloadScene,
  "scene-lucius": luciusScene,
  "scene-loop": loopScene,
  "scene-results": resultsScene,
  "scene-human": humanScene,
  "scene-method": methodScene,
};

export function renderScenes(target) {
  target.innerHTML = `
    <main class="experience-shell">
      <div class="stage-meta">
        <span class="stage-meta__brand">Lucius Case Study Motion</span>
        <span class="stage-meta__project">${caseStudyData.title}</span>
      </div>
      <section class="experience-stage">
        ${sceneTimeline.map((scene) => sceneMarkup[scene.id]()).join("")}
      </section>
    </main>
  `;

  const scenes = Array.from(target.querySelectorAll("[data-scene]"));
  let activeIndex = 0;

  const activateScene = (nextIndex) => {
    scenes.forEach((scene, index) => {
      scene.classList.remove("is-active", "is-leaving");
      if (index === nextIndex) {
        scene.classList.add("is-active");
      } else if (index === activeIndex) {
        scene.classList.add("is-leaving");
      }
    });
    activeIndex = nextIndex;
  };

  activateScene(0);

  const playSequence = (index = 0) => {
    const duration = sceneTimeline[index]?.duration ?? 6000;
    window.setTimeout(() => {
      const nextIndex = (index + 1) % sceneTimeline.length;
      activateScene(nextIndex);
      playSequence(nextIndex);
    }, duration);
  };

  playSequence();
}
