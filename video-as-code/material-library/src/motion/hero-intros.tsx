type HeroIntroBaseProps = {
  className?: string;
  headlineAccent: string;
  headlineLead: string;
  kicker?: string;
  subline: string;
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

function HeroIntroCard({
  cardClassName,
  className,
  headlineAccent,
  headlineLead,
  kicker = "Lucius · Client Agent",
  kickerClassName,
  ruleClassName,
  subline,
  sublineClassName,
  titleAccentClassName,
  titleClassName,
  washClassName,
  wrapperClassName,
}: HeroIntroBaseProps & {
  cardClassName: string;
  kickerClassName: string;
  ruleClassName: string;
  sublineClassName: string;
  titleAccentClassName: string;
  titleClassName: string;
  washClassName: string;
  wrapperClassName: string;
}) {
  return (
    <div className={joinClassNames(wrapperClassName, className)}>
      <div className={washClassName} aria-hidden="true" />
      <div className={cardClassName}>
        <p className={kickerClassName}>{kicker}</p>
        <h1 className={titleClassName}>
          {headlineLead} <span className={titleAccentClassName}>{headlineAccent}</span>
        </h1>
        <p className={sublineClassName}>{subline}</p>
        <div className={ruleClassName} aria-hidden="true" />
      </div>
    </div>
  );
}

export type OneCommandHeroIntroProps = HeroIntroBaseProps;

export function OneCommandHeroIntro({
  className,
  headlineAccent = "everywhere.",
  headlineLead = "One command, shipped",
  kicker,
  subline = "Start with one clear action, then let the system show that it propagates across every surface.",
}: Partial<OneCommandHeroIntroProps>) {
  return (
    <HeroIntroCard
      wrapperClassName="vac-onecmd-hero"
      washClassName="vac-onecmd-hero__wash"
      cardClassName="vac-onecmd-hero__card"
      kickerClassName="vac-onecmd-hero__kicker"
      titleClassName="vac-onecmd-hero__title"
      titleAccentClassName="vac-onecmd-hero__title-accent"
      sublineClassName="vac-onecmd-hero__sub"
      ruleClassName="vac-onecmd-hero__rule"
      className={className}
      headlineAccent={headlineAccent}
      headlineLead={headlineLead}
      kicker={kicker}
      subline={subline}
    />
  );
}

export type LearnConversationsHeroIntroProps = HeroIntroBaseProps;

export function LearnConversationsHeroIntro({
  className,
  headlineAccent = "knowledge.",
  headlineLead = "Turn real conversations into product",
  kicker,
  subline = "Use the original learn-from-conversations opening card when the beat is about scattered feedback becoming something structured and reusable.",
}: Partial<LearnConversationsHeroIntroProps>) {
  return (
    <HeroIntroCard
      wrapperClassName="vac-lfc-hero"
      washClassName="vac-lfc-hero__wash"
      cardClassName="vac-lfc-hero__card"
      kickerClassName="vac-lfc-hero__kicker"
      titleClassName="vac-lfc-hero__title"
      titleAccentClassName="vac-lfc-hero__title-accent"
      sublineClassName="vac-lfc-hero__sub"
      ruleClassName="vac-lfc-hero__rule"
      className={className}
      headlineAccent={headlineAccent}
      headlineLead={headlineLead}
      kicker={kicker}
      subline={subline}
    />
  );
}
