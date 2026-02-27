import { clsx } from "clsx";
import { JSX, Show } from "solid-js";

type TextAreaProps = {
  label: string;
  value: string;
  errorMsg?: string;
  onInput: JSX.EventHandler<HTMLTextAreaElement, InputEvent>;
};

export const TextArea = (props: TextAreaProps) => {
  return (
    <div class="relative">
      <div
        class={clsx(
          "flex flex-col text-lg border-b gap-2 pt-4 pb-2 mb-2 border-gray-300",
          props.errorMsg && "border-red-600"
        )}
      >
        <label>{props.label}</label>
        <textarea
          value={props.value ?? ""}
          class="h-20 outline-none text-gray-500  bg-transparent text-lg"
          onInput={props.onInput}
        />
      </div>
      <Show when={props.errorMsg}>
        {
          <p class="absolute top-full left-0 text-sm -translate-y-2 ml-2 text-red-600">
            {props.errorMsg}
          </p>
        }
      </Show>
    </div>
  );
};
