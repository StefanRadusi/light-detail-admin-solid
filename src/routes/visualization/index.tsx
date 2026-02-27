import { createAsync } from "@solidjs/router";
import { Show, createMemo } from "solid-js";
import { Page } from "~/components/layout/Page";
import { VisualizationPortfolio } from "~/components/sections/VisualizationPortfolio";
import { getProjectsByType } from "~/resources/projects";
import { ProjectType } from "~/types";

export const route = {
  load: () => getProjectsByType(ProjectType.VISUALIZATION),
};

export default function Visualization() {
  const data = createAsync(() => getProjectsByType(ProjectType.VISUALIZATION), {
    deferStream: true,
    initialValue: [],
  });

  const getDataWithPath = createMemo(() =>
    data().map((project) => ({
      ...project,
      path: `/visualization/${project.id}`,
    }))
  );

  return (
    <Page id="visualization">
      <Show when={getDataWithPath().length}>
        <VisualizationPortfolio list={getDataWithPath()} />
      </Show>
    </Page>
  );
}
