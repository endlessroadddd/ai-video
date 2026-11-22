export interface Shot {
  id: string;
  segment: string;
  startMs: number;
  durationMs: number;
  route: string;
}

export const shots: Shot[] = [
  { id: "0.1", segment: "S00", startMs: 0, durationMs: 1000, route: "s0-1" },
  { id: "0.2", segment: "S00", startMs: 1000, durationMs: 2000, route: "s0-2" },
  { id: "0.3", segment: "S00", startMs: 3000, durationMs: 1000, route: "s0-3" },
  { id: "1.1", segment: "S01", startMs: 4000, durationMs: 1000, route: "s1-1" },
  { id: "1.2", segment: "S01", startMs: 5000, durationMs: 1500, route: "s1-2" },
  { id: "1.3", segment: "S01", startMs: 6500, durationMs: 3500, route: "s1-3" },
  { id: "1.4", segment: "S01", startMs: 10000, durationMs: 2000, route: "s1-4" },
  { id: "2.1", segment: "S02", startMs: 12000, durationMs: 1000, route: "s2-1" },
  { id: "2.2", segment: "S02", startMs: 13000, durationMs: 1000, route: "s2-2" },
  { id: "2.3", segment: "S02", startMs: 14000, durationMs: 1000, route: "s2-3" },
  { id: "3.1", segment: "S03", startMs: 15000, durationMs: 1000, route: "s3-1" },
  { id: "3.2", segment: "S03", startMs: 16000, durationMs: 3000, route: "s3-2" },
  { id: "3.3", segment: "S03", startMs: 19000, durationMs: 4000, route: "s3-3" },
  { id: "3.4", segment: "S03", startMs: 23000, durationMs: 2000, route: "s3-4" },
  { id: "4.1", segment: "S04", startMs: 25000, durationMs: 1000, route: "s4-1" },
  { id: "4.2", segment: "S04", startMs: 26000, durationMs: 2000, route: "s4-2" },
  { id: "4.3", segment: "S04", startMs: 28000, durationMs: 2000, route: "s4-3" },
];

export const totalDurationMs = 30000;

export function getShotAtTime(t: number): Shot | null {
  for (const shot of shots) {
    if (t >= shot.startMs && t < shot.startMs + shot.durationMs) {
      return shot;
    }
  }
  return null;
}

export function getShotByRoute(route: string): Shot | null {
  return shots.find((s) => s.route === route) ?? null;
}

export const sceneRoutes = [
  "s0-1", "s0-2", "s0-3",
  "s1-1", "s1-2", "s1-3", "s1-4",
  "s2-1", "s2-2", "s2-3",
  "s3-1", "s3-2", "s3-3", "s3-4",
  "s4-1", "s4-2", "s4-3",
] as const;

export type SceneRoute = (typeof sceneRoutes)[number];

export function isSceneRoute(value: string | null): value is SceneRoute {
  return !!value && sceneRoutes.includes(value as SceneRoute);
}

export const frameRoutes = ["00", "01", "02", "03", "04", "05"] as const;
export type FrameRoute = (typeof frameRoutes)[number];

export function isFrameRoute(value: string | null): value is FrameRoute {
  return !!value && frameRoutes.includes(value as FrameRoute);
}
