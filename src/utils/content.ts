import { ContentNode } from "~/types";

export function findChild(
  node: ContentNode | null | undefined,
  key: string
): ContentNode | undefined {
  return node?.children?.find((c) => c.key === key);
}

export function getText(
  node: ContentNode | null | undefined,
  key: string,
  fallback = "",
  optional = false
): string {
  const value = findChild(node, key)?.value;
  if (value === undefined || value === null) {
    if (node && !optional) {
      console.warn(`[Content] Key "${key}" not found in section "${node.key}", using fallback`);
    }
    return fallback;
  }
  return value;
}

export function getImage(
  node: ContentNode | null | undefined,
  key: string
): { src: string; mobile?: string } | undefined {
  const child = findChild(node, key);
  if (!child?.value) return undefined;
  return {
    src: child.value,
    mobile: child.metadata?.mobile as string | undefined,
  };
}

export function findSection(
  tree: ContentNode[],
  ...keys: string[]
): ContentNode | undefined {
  let current: ContentNode | undefined = tree.find((n) => n.key === keys[0]);
  for (let i = 1; i < keys.length; i++) {
    if (!current) return undefined;
    current = findChild(current, keys[i]);
  }
  return current;
}
