import { CheckIcon } from "./icons";

interface ToastProps {
  visible: boolean;
  message: string;
}

export default function Toast(props: Readonly<ToastProps>) {
  const { message, visible } = props;

  if (!visible) {
    return null;
  }

  return (
    <div className="toast">
      <CheckIcon />
      <span>{message}</span>
    </div>
  );
}
