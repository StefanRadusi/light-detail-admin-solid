import { server } from "~/resources/server";
import { Project } from "~/types";

const BASE_URL = "https://www.lightdetail.eu";

const staticRoutes = [
  { path: "/", priority: "1.0" },
  { path: "/about", priority: "0.8" },
  { path: "/interior-design", priority: "0.9" },
  { path: "/services", priority: "0.9" },
  { path: "/contact", priority: "0.8" },
  { path: "/privacy-policy", priority: "0.3" },
  { path: "/terms-of-service", priority: "0.3" },
];

export async function GET() {
  let projects: Project[] = [];
  try {
    const response = await server.get<{ projects?: Project[] }>(
      "/projects/all",
    );
    if (response.data?.projects) {
      projects = response.data.projects;
    }
  } catch (error) {
    console.error("Sitemap: failed to fetch projects", error);
  }

  const staticEntries = staticRoutes
    .map(
      (route) => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join("\n");

  const projectEntries = projects
    .map(
      (project) => `  <url>
    <loc>${BASE_URL}/interior-design/${project.id}</loc>
    <priority>0.7</priority>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${projectEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
