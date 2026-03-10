import { For, Show } from "solid-js";
import { ContentNode } from "~/types";
import { findChild } from "~/utils/content";

type LegalBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: { bold?: string; text: string }[] };

export const LegalContent = (props: { content: ContentNode | null | undefined }) => {
  const blocks = (): LegalBlock[] => {
    const node = props.content;
    if (!node) return [];
    const contentChild = findChild(node, "content");
    if (!contentChild?.value) return [];
    try {
      return JSON.parse(contentChild.value) as LegalBlock[];
    } catch {
      return [];
    }
  };

  return (
    <Show when={blocks().length > 0} fallback={<p>Loading...</p>}>
      <For each={blocks()}>
        {(block) => {
          if (block.type === "heading") {
            return (
              <p>
                <strong>{block.text}</strong>
              </p>
            );
          }
          if (block.type === "list") {
            return (
              <For each={block.items}>
                {(item) => (
                  <p>
                    &bull;
                    <Show when={item.bold}>
                      <strong>{item.bold}</strong>
                    </Show>
                    {item.text}
                  </p>
                )}
              </For>
            );
          }
          return <p>{block.text}</p>;
        }}
      </For>
    </Show>
  );
};
