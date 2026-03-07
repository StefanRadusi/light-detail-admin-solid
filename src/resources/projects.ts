import { query } from "@solidjs/router";
import { server } from "./server";
import { Project } from "~/types";

export const getLatestProjects = query(async () => {
  "use server";
  try {
    const response = await server.get<{ projects?: Project[] }>(
      "/projects/latest",
    );

    if (response.data?.projects) return response.data.projects as Project[];
  } catch (error) {
    console.error(error);
  }

  return [];
}, "latestProjects");

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
    console.log(response.data);

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
