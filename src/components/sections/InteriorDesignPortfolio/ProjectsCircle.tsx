import clsx from "clsx";
import { useIsFixedPosition } from "~/utils/viewport";

type Props = {
  left?: boolean;
};

export const ProjectCircle = (props: Props) => {
  const position = useIsFixedPosition();

  return (
    <div
      class={clsx(
        "rounded-full w-screen aspect-square top-32 left-0 bg-gray-200 transition-transform duration-300 -z-10",
        props.left ? "-translate-x-1/2" : "translate-x-1/2",
        position()
      )}
    />
  );
};
