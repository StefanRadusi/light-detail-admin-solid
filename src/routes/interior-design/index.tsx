import { createAsync } from "@solidjs/router";
import { Show } from "solid-js";
import { Page } from "~/components/layout/Page";
import { InteriorDesignPortfolio } from "~/components/sections/InteriorDesignPortfolio";
import { getAllProjects } from "~/resources/projects";
import { Project } from "~/types";
import { Seo } from "~/components/seo/Seo";

export const route = {
  load: () => getAllProjects(),
};

export default function InteriorDesign() {
  const data = createAsync(() => getAllProjects(), {
    deferStream: true,
  });

  const getDataWithPath = () =>
    data()?.map((project: Project) => ({
      ...project,
      path: `/interior-design/${project.id}`,
    })) || [];

  return (
    <Page id="interior_design">
      <Seo
        title="Interior Design Portfolio | Light Detail Studio Cluj-Napoca"
        description="Portofoliu design interior Cluj — proiecte de amenajari interioare realizate de Light Detail Studio in Cluj-Napoca. Descoperiti lucrarile noastre."
        keywords="portofoliu design interior Cluj, amenajari interioare Cluj-Napoca, proiecte design interior"
        path="/interior-design"
      />
      <Show when={getDataWithPath().length}>
        <InteriorDesignPortfolio list={getDataWithPath()} />
      </Show>
    </Page>
  );
}
