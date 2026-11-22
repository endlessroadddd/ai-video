export type MemberStatus = "online" | "idle" | "dnd" | "offline";

export interface Member {
  id: string;
  name: string;
  status: MemberStatus;
  role?: string;
  isSpam?: boolean;
}

export type MemberEvent =
  | {
      kind: "join";
      atMs: number;
      member: Member;
    }
  | {
      kind: "remove";
      atMs: number;
      memberId: string;
    };

export interface VisibleMember extends Member {
  enteredAtMs: number;
  removedAtMs?: number;
  order: number;
}

export const INITIAL_MEMBERS: readonly Member[] = [
  { id: "alex", name: "Alex", status: "online", role: "ops lead" },
  { id: "sam", name: "Sam", status: "online", role: "community" },
  { id: "jordan", name: "Jordan", status: "idle", role: "design" },
  { id: "riley", name: "Riley", status: "online", role: "support" },
  { id: "airdrop-king", name: "airdrop_king", status: "online", role: "new member", isSpam: true },
];

export const MEMBER_EVENTS: readonly MemberEvent[] = [
  { kind: "remove", atMs: 23_720, memberId: "airdrop-king" },
  {
    kind: "join",
    atMs: 25_100,
    member: { id: "free-nitro-01", name: "free_nitro_01", status: "online", role: "new member", isSpam: true },
  },
  {
    kind: "join",
    atMs: 25_760,
    member: { id: "crypto-alpha-bot", name: "crypto_alpha_bot", status: "online", role: "new member", isSpam: true },
  },
  {
    kind: "join",
    atMs: 26_380,
    member: { id: "airdrop-queen", name: "airdrop_queen", status: "online", role: "new member", isSpam: true },
  },
  {
    kind: "join",
    atMs: 27_000,
    member: { id: "nitro-vault-9", name: "nitro_vault_9", status: "online", role: "new member", isSpam: true },
  },
  {
    kind: "join",
    atMs: 27_660,
    member: { id: "discord-gift-bot", name: "discord_gift_bot", status: "online", role: "new member", isSpam: true },
  },
  {
    kind: "join",
    atMs: 28_280,
    member: { id: "free-boost-01", name: "free_boost_01", status: "online", role: "new member", isSpam: true },
  },
  {
    kind: "join",
    atMs: 28_960,
    member: { id: "fast-dm-verify", name: "fast_dm_verify", status: "online", role: "new member", isSpam: true },
  },
  {
    kind: "join",
    atMs: 29_620,
    member: { id: "airdrop-4u", name: "airdrop_4u", status: "online", role: "new member", isSpam: true },
  },
  {
    kind: "join",
    atMs: 30_260,
    member: { id: "gift-link-hub", name: "gift_link_hub", status: "online", role: "new member", isSpam: true },
  },
];

const REMOVAL_TRAIL_MS = 440;

export function resolveVisibleMembers(currentMs: number): VisibleMember[] {
  const members = new Map<string, VisibleMember>();

  INITIAL_MEMBERS.forEach((member, index) => {
    members.set(member.id, {
      ...member,
      enteredAtMs: 0,
      order: index,
    });
  });

  let order = INITIAL_MEMBERS.length;
  for (const event of MEMBER_EVENTS) {
    if (event.atMs > currentMs) {
      break;
    }

    if (event.kind === "join") {
      members.set(event.member.id, {
        ...event.member,
        enteredAtMs: event.atMs,
        order,
      });
      order += 1;
      continue;
    }

    const existing = members.get(event.memberId);
    if (existing) {
      existing.removedAtMs = event.atMs;
    }
  }

  return [...members.values()]
    .filter((member) => member.removedAtMs === undefined || currentMs < member.removedAtMs + REMOVAL_TRAIL_MS)
    .sort((a, b) => a.order - b.order);
}

export function getBotPreview(limit = 6): VisibleMember[] {
  return [
    ...INITIAL_MEMBERS.filter((member) => member.isSpam).map((member, index) => ({
      ...member,
      enteredAtMs: 0,
      order: index,
    })),
    ...MEMBER_EVENTS.filter((event): event is Extract<MemberEvent, { kind: "join" }> => event.kind === "join").map(
      (event, index) => ({
        ...event.member,
        enteredAtMs: event.atMs,
        order: INITIAL_MEMBERS.length + index,
      }),
    ),
  ].slice(0, limit);
}
