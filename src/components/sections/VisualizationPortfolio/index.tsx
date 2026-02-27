import clsx from "clsx";
import { CardList, ProjectCardProps } from "~/components/lists/CardList";
import { useIsFixedPosition } from "~/utils/viewport";
import { ProjectCircle } from "../InteriorDesignPortfolio/ProjectsCircle";

type Props = {
  list: ProjectCardProps[];
};

export const VisualizationPortfolio = (props: Props) => {
  const position = useIsFixedPosition();

  return (
    <div class="flex relative overflow-hidden lg:px-60 pb-32">
      <ProjectCircle />
      <div
        class={clsx(
          "top-0 left-0 flex w-full px-6 lg:px-60 z-20 bg-gradient-to-b from-20% from-white ",
          position()
        )}
      >
        <div class="h-24 flex m-auto flex-1 max-w-6xl  relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1/2 h-full overflow-hidden transition-transform duration-300 translate-x-0">
            <div class="bg-gray-200 absolute bottom-0 left-1/2 w-full pt-[100%] -translate-x-1/2 rounded-full" />
          </div>
          <button class="w-1/2 z-10 transition-colors duration-300 font-bold text-brandYellow">
            VISUALIZATION
          </button>
        </div>
      </div>
      <div class="flex flex-col px-6 m-auto flex-1 max-w-6xl  min-h-screen gap-8 pt-[150px] lg:gap-16">
        <CardList list={props.list} />
      </div>
    </div>
  );
};
