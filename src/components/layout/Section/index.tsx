import clsx from "clsx";
import { JSXElement } from "solid-js";

type Props = {
  children: JSXElement;
  decorations?: JSXElement;
  class?: string;
};

export const Section = (props: Props) => {
  return (
    <section class={clsx("w-full flex relative lg:px-48", props.class)}>
      {props.decorations}
      <div class="flex flex-col px-6 mx-auto flex-1 max-w-6xl overflow-hidden">
        {props.children}
      </div>
    </section>
  );
};
