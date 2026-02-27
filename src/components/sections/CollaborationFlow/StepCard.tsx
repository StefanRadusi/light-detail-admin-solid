import clsx from "clsx";
import { Show } from "solid-js";

export enum StepCardTextPosition {
  LEFT = "left",
  RIGHT = "right",
}

type Props = {
  title: string;
  subTitle: string;
  description: string;
  img: string;
  textPosition: StepCardTextPosition;
  showHeaderTitle?: boolean;
};

export const StepCard = (props: Props) => {
  return (
    <div
      class={clsx(
        "flex flex-col mt-10 lg:flex-row",
        props.textPosition === StepCardTextPosition.RIGHT
          ? "lg:flex-row"
          : "lg:flex-row-reverse"
      )}
    >
      <div class="flex-1 mb-5 lg:mb-0">
        <Show when={props.showHeaderTitle}>
          <h3 class="text-3xl font-bold">
            <span class="text-brandYellow">SO,</span> WHAT IF WE <br /> WORK
            TOGETHER?
          </h3>
        </Show>
      </div>
      <div
        class={clsx(
          "mb-5 lg:mb-0 w-[60%] lg:w-[150px] overflow-hidden rounded-md shadow-md ",
          props.textPosition === StepCardTextPosition.LEFT && "ml-auto lg:ml-0"
        )}
      >
        <img
          class="w-full h-full object-cover object-bottom lg:object-center"
          src={props.img}
        />
      </div>
      <div class="lg:flex-1 relative h-[120px] lg:h-unset">
        <div
          class={clsx(
            "absolute bottom-0 left-0  w-full flex flex-col gap-3",
            props.textPosition === StepCardTextPosition.RIGHT
              ? "pl-[70px]"
              : "pr-[70px] text-right"
          )}
        >
          <p
            class={clsx(
              "absolute bottom-[35px] text-3xl -rotate-90 font-bold ",
              props.textPosition === StepCardTextPosition.RIGHT
                ? "-left-[15px]"
                : "-right-[15px]"
            )}
          >
            {props.title}
          </p>
          <p>{props.subTitle}</p>
          <p class="text-gray-500">{props.description}</p>
        </div>
      </div>
    </div>
  );
};
