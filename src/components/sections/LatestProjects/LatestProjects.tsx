import { AnimatedCircle } from "~/components/decorations/AnimatedCircle";
import { GotToButton } from "~/components/buttons/GoToButton";
import { Show, createEffect, createSignal } from "solid-js";
import { ProjectCard } from "~/components/lists/ProjectCard";
import { ProjectCardProps } from "~/components/lists/CardList";

type Props = {
  projects: ProjectCardProps[];
};

export const LatestProjects = (props: Props) => {
  const [divRef, setDivRef] = createSignal<HTMLDivElement | null>(null);

  const getProjectByIndex = (index: number) => props.projects[index] ?? {};

  return (
    <Show when={props.projects.length}>
      <div class="w-full relative lg:px-60">
        <AnimatedCircle divRef={divRef} />
        <div class="flex flex-1 mx-auto max-w-6xl px-6 lg:pt-20 gap-6 flex-col lg:flex-row">
          <div class="flex flex-1 flex-col gap-6">
            <div class="h-[300px] flex items-center">
              <div
                ref={setDivRef}
                class="flex flex-col items-end justify-center gap-6 border-r-4 py-4 pr-4 border-black"
              >
                <h2 class="text-4xl font-bold text-right">
                  OUR LATEST
                  <br />
                  PROJECTS
                </h2>
                <p class="text-right text-gray-500">
                  Lightdetail’s mission is to design and implement
                  functionally-aesthetically balanced spaces tailored to the
                  client's personality traits.
                </p>
              </div>
            </div>
            <ProjectCard {...getProjectByIndex(0)} />
          </div>
          <div class="flex flex-1 flex-col gap-6">
            <ProjectCard {...getProjectByIndex(1)} />
            <ProjectCard {...getProjectByIndex(2)} />
          </div>
        </div>
        <div class="ml-6 mt-6 pl-10 lg:m-0 lg:absolute lg:bottom-4 lg:left-1/2 lg:-translate-x-[calc(100%+10px)]">
          <GotToButton to="/interior-design" label="find out more" selected />
        </div>
      </div>
    </Show>
  );
};
