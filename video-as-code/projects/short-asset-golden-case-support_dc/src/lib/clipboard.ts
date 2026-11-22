/**
 * 统一的文本复制 helper：
 * - 优先使用现代 Clipboard API；
 * - 在不支持的环境里回退到 `document.execCommand("copy")`；
 * - 失败时统一抛错，由调用方决定 toast 文案。
 */
export async function writeTextToClipboard(value: string): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  if (typeof document === "undefined") {
    throw new Error("clipboard-write-failed");
  }

  const textarea: HTMLTextAreaElement = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  const copied: boolean = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!copied) {
    throw new Error("clipboard-write-failed");
  }
}
