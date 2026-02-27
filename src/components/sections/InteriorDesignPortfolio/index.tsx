import { Show, createSignal } from "solid-js";
import { CardList, ProjectCardProps } from "~/components/lists/CardList";
import { Project, ProjectType } from "~/types";
import { ProjectListHeader } from "./ProjectListHeader";
import { ProjectCircle } from "./ProjectsCircle";
import { Transition } from "solid-transition-group";

type Props = {
  list: ProjectCardProps[];
};

export const InteriorDesignPortfolio = (props: Props) => {
  let ref: HTMLDivElement | undefined;
  const [type, setType] = createSignal(ProjectType.RESIDENTIAL);

  const projectsByType = (type: ProjectType) => {
    return props.list.filter((project) => project.type === type);
  };

  const handleSetType = (type: ProjectType) => {
    if (ref) ref.scrollIntoView({ behavior: "smooth" });
    setType(type);
  };

  return (
    <div class="flex relative overflow-hidden lg:px-60 pb-32">
      <ProjectCircle left={type() !== ProjectType.RESIDENTIAL} />
      <ProjectListHeader type={type()} setType={handleSetType} />
      <div
        ref={ref}
        class="flex flex-col px-6 m-auto flex-1 max-w-6xl  min-h-screen gap-8 pt-[150px] lg:gap-16"
      >
        <Transition name="slide-fade">
          <Show when={type() === ProjectType.RESIDENTIAL}>
            <CardList list={projectsByType(ProjectType.RESIDENTIAL)} />
          </Show>
        </Transition>
        <Transition name="slide-fade">
          <Show when={type() === ProjectType.COMMERCIAL}>
            <CardList list={projectsByType(ProjectType.COMMERCIAL)} />
          </Show>
        </Transition>
      </div>
    </div>
  );
};
