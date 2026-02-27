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

export default function InteriorDesignProject(props: {
  params: { id: string };
}) {
  const data = createAsync<Project>(() => getProjectsById(props.params.id), {
    deferStream: true,
  });

  return (
    <Show when={data()}>
      <Seo
        title={`${data()!.title} | Interior Design - Light Detail Studio`}
        description={data()!.description || `${data()!.title} — interior design project by Light Detail Studio Cluj-Napoca.`}
        path={`/interior-design/${props.params.id}`}
        ogImage={data()!.coverImageUrl}
      />
      <ProjectPage project={data()!} />
    </Show>
  );
}
