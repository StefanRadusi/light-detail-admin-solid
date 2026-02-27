import clsx from "clsx";
import { JSX, Show } from "solid-js";

type TextFieldProps = {
  label: string;
  value: string;
  errorMsg?: string;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
};

export const TextField = (props: TextFieldProps) => {
  return (
    <div class="relative">
      <div
        class={clsx(
          "flex border-b gap-4 pt-4 pb-2 mb-2 text-lg border-gray-300",
          props.errorMsg && "border-red-600"
        )}
      >
        <label>{props.label}</label>
        <input
          class="text-gray-500 outline-none flex-1 bg-transparent"
          value={props.value ?? ""}
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
