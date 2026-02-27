import { JSX, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import { AnimatedCube } from "../decorations/AnimatedCube";
import { HiOutlinePaperAirplane } from "solid-icons/hi";
import { HiOutlineXCircle } from "solid-icons/hi";

type Props = {
  children: JSX.Element;
  onSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent>;
  loading: boolean;
  isSentSuccessfully: boolean;
  isSentError: boolean;
};

export const Form = (props: Props) => {
  return (
    <form onSubmit={props.onSubmit} class="flex flex-col gap-4 relative">
      {props.children}
      <Transition name="slide-fade">
        <Show when={props.loading}>
          <div class="absolute top-0 left-0 w-full h-full 2 bg-white/90">
            <AnimatedCube />
          </div>
        </Show>
      </Transition>
      <Transition name="slide-fade">
        <Show when={props.isSentSuccessfully}>
          <div class="absolute top-0 left-0 w-full h-full 2 bg-white/90 flex items-center justify-center gap-4">
            <HiOutlinePaperAirplane size={40} class="text-brandYellow" />
            <p>Email sent successfully</p>
          </div>
        </Show>
      </Transition>
      <Transition name="slide-fade">
        <Show when={props.isSentError}>
          <div class="absolute top-0 left-0 w-full h-full 2 bg-white/90 flex items-center justify-center gap-4">
            <HiOutlineXCircle size={40} class="text-red-600" />
            <p>Something went wrong</p>
          </div>
        </Show>
      </Transition>
    </form>
  );
};
