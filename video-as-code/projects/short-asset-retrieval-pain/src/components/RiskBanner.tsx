import { AlertTriangle } from "lucide-react";

type RiskBannerProps = {
  label: string;
};

export function RiskBanner(props: RiskBannerProps) {
  const { label } = props;

  return (
    <div className="risk-banner">
      <AlertTriangle size={16} />
      <span>{label}</span>
    </div>
  );
}
