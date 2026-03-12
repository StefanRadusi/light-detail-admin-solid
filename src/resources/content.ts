import { query } from "@solidjs/router";
import { server } from "./server";
import { ContentNode } from "~/types";

export const getContentTree = query(async () => {
  "use server";
  try {
    const response = await server.get<ContentNode[]>("/content/tree");
    if (response.data) return response.data;
  } catch (error) {
    console.error(
      "[Content] Failed to fetch content tree, using defaults:",
      error,
    );
  }
  return [];
}, "contentTree");

export const getContentSection = query(async (key: string) => {
  "use server";
  try {
    const response = await server.get<ContentNode>(`/content/tree/${key}`);

    if (response.data) return response.data;
  } catch (error) {
    console.warn(
      `[Content] Failed to fetch section "${key}", components will use fallback values`,
    );
  }
  return null;
}, "contentSection");
