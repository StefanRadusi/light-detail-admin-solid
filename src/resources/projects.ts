import { query } from "@solidjs/router";
import { server } from "./server";
import { Project, ContentNode } from "~/types";

export const getFeaturedProjects = query(async () => {
  "use server";
  try {
    const contentRes = await server.get<ContentNode>("/content/tree/latest-projects");
    const node = contentRes.data;
    if (!node?.children) return [];

    const ids = node.children
      .filter((c: ContentNode) => c.key.startsWith("featured-"))
      .sort((a: ContentNode, b: ContentNode) => (a.order ?? 0) - (b.order ?? 0))
      .map((c: ContentNode) => c.value)
      .filter((v): v is string => v !== null && v !== undefined);

    const projects = await Promise.all(
      ids.map(async (id: string) => {
        try {
          const res = await server.get<Project>(`/projects/${id}`);
          return res.data ?? null;
        } catch {
          return null;
        }
      }),
    );

    return projects.filter(Boolean) as Project[];
  } catch (error) {
    console.error("Failed to fetch featured projects:", error);
  }

  return [];
}, "featuredProjects");

export const getAllProjects = query(async () => {
  "use server";
  try {
    const response = await server.get<Project[]>("/projects");

    if (response.data) return response.data;
  } catch (error) {
    console.error(error);
  }

  return [];
}, "allProjects");

export const getProjectsByType = query(async (type: string) => {
  "use server";
  try {
    const response = await server.get<Project[]>(`/projects/type/${type}`);

    if (response.data) return response.data;
  } catch (error) {
    console.error(error);
  }

  return [];
}, "projectsByType");

export const getProjectsById = query(async (id: string) => {
  "use server";
  try {
    const response = await server.get<Project>(`/projects/${id}`);

    if (response.data)
      return {
        ...response.data,
        id: response.data.id,
      } as Project;
  } catch (error) {
    console.error(error);
  }

  return {} as Project;
}, "getProjectsById");
