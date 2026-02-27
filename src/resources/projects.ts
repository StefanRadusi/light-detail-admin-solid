import { cache } from "@solidjs/router";
import { server } from "./server";
import { Project } from "~/types";

export const getLatestProjects = cache(async () => {
  try {
    const response = await server.get<{ projects?: Project[] }>(
      "/projects/latest"
    );

    if (response.data?.projects) return response.data.projects as Project[];
  } catch (error) {
    console.error(error);
  }

  return [];
}, "latestProjects");

export const getAllProjects = cache(async () => {
  try {
    const response = await server.get<{ projects?: Project[] }>(
      "/projects/all"
    );

    if (response.data?.projects) return response.data.projects;
  } catch (error) {
    console.error(error);
  }

  return [];
}, "allProjects");

export const getProjectsByType = cache(async (type: string) => {
  try {
    const response = await server.get<{ projects?: Project[] }>(
      `/projects/${type}`
    );

    if (response.data?.projects) return response.data.projects;
  } catch (error) {
    console.error(error);
  }

  return [];
}, "projectsByType");

export const getProjectsById = cache(async (id: string) => {
  try {
    const response = await server.get<{ project?: any }>(`/project/${id}`);

    if (response.data?.project)
      return {
        ...response.data.project,
        id: response.data.project.pk,
      } as Project;
  } catch (error) {
    console.error(error);
  }

  return {} as Project;
}, "getProjectsById");
