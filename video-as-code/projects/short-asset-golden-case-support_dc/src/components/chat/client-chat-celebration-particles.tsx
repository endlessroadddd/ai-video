import {
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";

import type { ISourceOptions } from "@tsparticles/engine";

type TsParticlesReactModule = typeof import("@tsparticles/react");
type TsParticlesComponent = TsParticlesReactModule["default"];

let clientChatCelebrationParticlesPromise:
  | Promise<TsParticlesComponent>
  | null = null;

const CLIENT_CHAT_CELEBRATION_START_DELAY_MS = 760;
const CLIENT_CHAT_CELEBRATION_VISIBLE_DURATION_MS = 4200;

const CLIENT_CHAT_CELEBRATION_PARTICLES_STYLE: CSSProperties = {
  position: "absolute",
  inset: "0",
  pointerEvents: "none",
};

const CLIENT_CHAT_CELEBRATION_CONFETTI_OPTIONS: ISourceOptions = {
  preset: "confetti",
  fullScreen: {
    enable: false,
    zIndex: 0,
  },
  background: {
    color: "transparent",
  },
  emitters: [
    {
      startCount: 18,
      life: {
        delay: 0.08,
        duration: 0.18,
        count: 1,
      },
      position: {
        x: 24,
        y: 70,
      },
      rate: {
        delay: 0,
        quantity: 0,
      },
      size: {
        width: 0,
        height: 0,
      },
      particles: {
        move: {
          direction: "top-right",
          speed: 34,
        },
      },
    },
    {
      startCount: 18,
      life: {
        delay: 0.12,
        duration: 0.18,
        count: 1,
      },
      position: {
        x: 76,
        y: 70,
      },
      rate: {
        delay: 0,
        quantity: 0,
      },
      size: {
        width: 0,
        height: 0,
      },
      particles: {
        move: {
          direction: "top-left",
          speed: 34,
        },
      },
    },
    {
      startCount: 12,
      life: {
        delay: 0.18,
        duration: 0.12,
        count: 1,
      },
      position: {
        x: 50,
        y: 78,
      },
      rate: {
        delay: 0,
        quantity: 0,
      },
      size: {
        width: 0,
        height: 0,
      },
      particles: {
        move: {
          direction: "top",
          speed: 28,
        },
      },
    },
  ],
  particles: {
    color: {
      value: ["#ff7a59", "#facc15", "#34d399", "#60a5fa", "#c084fc"],
    },
    life: {
      count: 1,
      duration: {
        sync: true,
        value: 2.1,
      },
    },
    move: {
      decay: 0.12,
      gravity: {
        enable: true,
        acceleration: 10.5,
      },
      speed: 42,
      outModes: {
        default: "destroy",
      },
    },
    opacity: {
      value: {
        min: 0,
        max: 1,
      },
      animation: {
        enable: true,
        speed: 0.75,
        startValue: "max",
        destroy: "min",
      },
    },
    roll: {
      enable: true,
      speed: {
        min: 16,
        max: 24,
      },
      darken: {
        enable: true,
        value: 20,
      },
    },
    rotate: {
      value: {
        min: 0,
        max: 360,
      },
      direction: "random",
      animation: {
        enable: true,
        speed: 50,
      },
    },
    size: {
      value: {
        min: 3,
        max: 7,
      },
    },
    tilt: {
      enable: true,
      direction: "random",
      value: {
        min: 0,
        max: 360,
      },
      animation: {
        enable: true,
        speed: 50,
      },
    },
    wobble: {
      enable: true,
      distance: 18,
      speed: {
        min: -9,
        max: 9,
      },
    },
  },
  detectRetina: true,
};

const CLIENT_CHAT_CELEBRATION_FIREWORKS_OPTIONS: ISourceOptions = {
  preset: "fireworks",
  fullScreen: {
    enable: false,
    zIndex: 0,
  },
  background: {
    color: "transparent",
  },
  emitters: {
    direction: "top",
    life: {
      count: 1,
      duration: 0.14,
      delay: 0.58,
    },
    position: {
      x: 50,
      y: 88,
    },
    rate: {
      delay: 0.18,
      quantity: 2,
    },
    size: {
      width: 48,
      height: 0,
    },
  },
  particles: {
    move: {
      trail: {
        enable: true,
        length: 6,
        fill: {
          color: "transparent",
        },
      },
    },
  },
  sounds: {
    enable: false,
  },
  detectRetina: true,
};

async function loadClientChatCelebrationParticles(): Promise<TsParticlesComponent> {
  if (!clientChatCelebrationParticlesPromise) {
    clientChatCelebrationParticlesPromise = Promise.all([
      import("@tsparticles/react"),
      import("@tsparticles/preset-confetti"),
      import("@tsparticles/preset-fireworks"),
    ]).then(async ([reactModule, confettiModule, fireworksModule]) => {
      await reactModule.initParticlesEngine(async (engine) => {
        await Promise.all([
          confettiModule.loadConfettiPreset(engine),
          fireworksModule.loadFireworksPreset(engine, false),
        ]);
      });

      return reactModule.default;
    });
  }

  return clientChatCelebrationParticlesPromise;
}

export function ClientChatCelebrationParticles(): ReactElement | null {
  const [ParticlesComponent, setParticlesComponent] =
    useState<TsParticlesComponent | null>(null);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const particlesIdPrefix: string = useId().replace(/:/g, "");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (reducedMotionQuery.matches) {
      setShouldRender(false);
      return;
    }

    let isCancelled = false;
    void loadClientChatCelebrationParticles().then((Particles) => {
      if (!isCancelled) {
        setParticlesComponent(() => Particles);
      }
    });

    const startTimer = window.setTimeout(() => {
      if (!isCancelled) {
        setShouldRender(true);
      }
    }, CLIENT_CHAT_CELEBRATION_START_DELAY_MS);

    const stopTimer = window.setTimeout(() => {
      if (!isCancelled) {
        setShouldRender(false);
      }
    }, CLIENT_CHAT_CELEBRATION_VISIBLE_DURATION_MS);

    return () => {
      isCancelled = true;
      window.clearTimeout(startTimer);
      window.clearTimeout(stopTimer);
    };
  }, []);

  if (!shouldRender || !ParticlesComponent) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="dashboard-chat-message-celebration-particles"
    >
      <ParticlesComponent
        id={`${particlesIdPrefix}-confetti`}
        className="dashboard-chat-message-celebration-particles-layer dashboard-chat-message-celebration-particles-layer--confetti"
        style={CLIENT_CHAT_CELEBRATION_PARTICLES_STYLE}
        options={CLIENT_CHAT_CELEBRATION_CONFETTI_OPTIONS}
      />
      <ParticlesComponent
        id={`${particlesIdPrefix}-fireworks`}
        className="dashboard-chat-message-celebration-particles-layer dashboard-chat-message-celebration-particles-layer--fireworks"
        style={CLIENT_CHAT_CELEBRATION_PARTICLES_STYLE}
        options={CLIENT_CHAT_CELEBRATION_FIREWORKS_OPTIONS}
      />
    </div>
  );
}
