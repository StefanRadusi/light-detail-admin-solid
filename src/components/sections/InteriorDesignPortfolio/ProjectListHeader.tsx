import clsx from "clsx";
import { ProjectType } from "~/types";
import { useIsFixedPosition } from "~/utils/viewport";

type Props = {
  type: ProjectType;
  setType: (type: ProjectType) => void;
};

export const ProjectListHeader = (props: Props) => {
  const position = useIsFixedPosition();

  const isSelected = (type: ProjectType) => {
    return props.type === type;
  };

  const textColor = (type: ProjectType) => {
    return isSelected(type) ? "text-brandYellow" : "text-black";
  };

  return (
    <div
      class={clsx(
        "top-0 left-0 flex w-full px-6 lg:px-60 z-20 bg-gradient-to-b from-20% from-white ",
        position()
      )}
    >
      <div class="h-24 flex m-auto flex-1 max-w-6xl  relative overflow-hidden">
        <div
          class={clsx(
            "absolute top-0 left-0 w-1/2 h-full overflow-hidden transition-transform duration-300",
            isSelected(ProjectType.RESIDENTIAL)
              ? "translate-x-0"
              : "translate-x-full"
          )}
        >
          <div class="bg-gray-200 absolute bottom-0 left-1/2 w-full pt-[100%] -translate-x-1/2 rounded-full" />
        </div>
        {[ProjectType.RESIDENTIAL, ProjectType.COMMERCIAL].map((tab) => (
          <button
            class={clsx(
              "w-1/2 z-10 transition-colors duration-300 font-bold",
              textColor(tab)
            )}
            onClick={() => props.setType(tab)}
          >
            {tab.toLocaleUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};
