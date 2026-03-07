import { StaffMember } from "~/types";
import { server } from "./server";
import { query } from "@solidjs/router";

export const getStaff = query(async () => {
  "use server";
  try {
    const response = await server.get<StaffMember[]>("/staff");

    if (response.data) return response.data;
  } catch (error) {
    console.error(error);
  }

  return [];
}, "staff");
