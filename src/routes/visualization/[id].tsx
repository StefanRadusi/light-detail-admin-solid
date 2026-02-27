import { createAsync } from "@solidjs/router";
import { Show } from "solid-js";
import { ProjectPage } from "~/components/sections/ProjectPage";
import { getProjectsById } from "~/resources/projects";
import { Project } from "~/types";
import { Seo } from "~/components/seo/Seo";

export const route = {
  load: (props: { params: { id: string } }) => {
    return getProjectsById(props.params.id);
  },
};

export default function VisualizationProject(props: {
  params: { id: string };
}) {
  const data = createAsync<Project>(() => getProjectsById(props.params.id), {
    deferStream: true,
  });

  return (
    <Show when={data()}>
      <Seo
        title={`${data()!.title} | Visualization - Light Detail Studio`}
        description={data()!.description || `${data()!.title} — 3D visualization project by Light Detail Studio Cluj-Napoca.`}
        path={`/visualization/${props.params.id}`}
        ogImage={data()!.coverImageUrl}
      />
      <ProjectPage project={data()!} />
    </Show>
  );
}
