import type { ReactElement, ReactNode } from "react";

type MarkdownMessageProps = {
  className?: string;
  content: string;
  progress?: number;
};

type InlineNode =
  | { type: "text"; value: string }
  | { type: "strong"; children: InlineNode[] }
  | { type: "em"; children: InlineNode[] }
  | { type: "code"; value: string };

type BlockNode =
  | { type: "paragraph"; children: InlineNode[] }
  | { type: "list"; items: InlineNode[][] };

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function parseInline(content: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  let cursor = 0;
  let buffer = "";

  const flushBuffer = (): void => {
    if (!buffer) return;
    nodes.push({ type: "text", value: buffer });
    buffer = "";
  };

  while (cursor < content.length) {
    if (content.startsWith("**", cursor)) {
      const end = content.indexOf("**", cursor + 2);
      if (end !== -1) {
        flushBuffer();
        nodes.push({
          type: "strong",
          children: parseInline(content.slice(cursor + 2, end)),
        });
        cursor = end + 2;
        continue;
      }
    }

    if (content[cursor] === "*") {
      const end = content.indexOf("*", cursor + 1);
      if (end !== -1) {
        flushBuffer();
        nodes.push({
          type: "em",
          children: parseInline(content.slice(cursor + 1, end)),
        });
        cursor = end + 1;
        continue;
      }
    }

    if (content[cursor] === "`") {
      const end = content.indexOf("`", cursor + 1);
      if (end !== -1) {
        flushBuffer();
        nodes.push({
          type: "code",
          value: content.slice(cursor + 1, end),
        });
        cursor = end + 1;
        continue;
      }
    }

    buffer += content[cursor];
    cursor += 1;
  }

  flushBuffer();
  return nodes;
}

function parseMarkdown(content: string): BlockNode[] {
  const normalized = content.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  return normalized
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split("\n").map((line) => line.trimEnd());
      const isList = lines.every((line) => line.trim().startsWith("- "));

      if (isList) {
        return {
          type: "list",
          items: lines.map((line) => parseInline(line.trim().replace(/^- /, ""))),
        } satisfies BlockNode;
      }

      return {
        type: "paragraph",
        children: parseInline(block),
      } satisfies BlockNode;
    });
}

function countInlineCharacters(nodes: InlineNode[]): number {
  return nodes.reduce((total, node) => {
    if (node.type === "text" || node.type === "code") {
      return total + node.value.length;
    }

    return total + countInlineCharacters(node.children);
  }, 0);
}

function countBlockCharacters(blocks: BlockNode[]): number {
  return blocks.reduce((total, block) => {
    if (block.type === "paragraph") {
      return total + countInlineCharacters(block.children);
    }

    return (
      total +
      block.items.reduce((itemTotal, item) => itemTotal + countInlineCharacters(item), 0)
    );
  }, 0);
}

function renderInlineNodes(
  nodes: InlineNode[],
  state: { remaining: number },
  keyPrefix: string,
): ReactNode[] {
  const rendered: ReactNode[] = [];

  nodes.forEach((node, index) => {
    if (state.remaining <= 0) {
      return;
    }

    const key = `${keyPrefix}-${index}`;

    if (node.type === "text" || node.type === "code") {
      const visibleValue = node.value.slice(0, state.remaining);
      if (!visibleValue) {
        return;
      }

      state.remaining -= visibleValue.length;
      rendered.push(
        node.type === "code" ? <code key={key}>{visibleValue}</code> : <span key={key}>{visibleValue}</span>,
      );
      return;
    }

    const children = renderInlineNodes(node.children, state, key);
    if (children.length === 0) {
      return;
    }

    if (node.type === "strong") {
      rendered.push(<strong key={key}>{children}</strong>);
      return;
    }

    rendered.push(<em key={key}>{children}</em>);
  });

  return rendered;
}

function renderBlocks(blocks: BlockNode[], visibleCharacters: number): ReactNode[] {
  const state = { remaining: visibleCharacters };

  return blocks.flatMap((block, index) => {
    if (state.remaining <= 0) {
      return [];
    }

    const key = `block-${index}`;

    if (block.type === "paragraph") {
      const children = renderInlineNodes(block.children, state, key);
      return children.length > 0 ? [<p key={key}>{children}</p>] : [];
    }

    const items = block.items
      .map((item, itemIndex) => {
        const children = renderInlineNodes(item, state, `${key}-item-${itemIndex}`);
        return children.length > 0 ? <li key={`${key}-item-${itemIndex}`}>{children}</li> : null;
      })
      .filter(Boolean);

    return items.length > 0 ? [<ul key={key}>{items}</ul>] : [];
  });
}

export function MarkdownMessage(props: MarkdownMessageProps): ReactElement | null {
  const { className, content, progress } = props;
  const blocks = parseMarkdown(content);
  const totalCharacters = countBlockCharacters(blocks);
  const visibleCharacters =
    progress == null ? totalCharacters : Math.ceil(totalCharacters * clamp01(progress));

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {renderBlocks(blocks, visibleCharacters)}
    </div>
  );
}
