import clsx from "clsx";
import { Accessor, Show } from "solid-js";
import { A } from "@solidjs/router";

type Props = {
  to: string;
  label: string;
  selected?: Accessor<boolean> | boolean;
  color?: Accessor<"black" | "white"> | "black" | "white";
  fullHighlight?: boolean;
};

export const GotToButton = ({
  to,
  label,
  selected = false,
  color = "black",
  fullHighlight,
}: Props) => {
  const [firstWord, ...rest] = label.split(" ");

  const isSelected = () => {
    if (typeof selected === "function") return selected();

    return selected;
  };

  const show = () => {
    return isSelected() ? "opacity-100" : "opacity-0";
  };

  const getColor = () => {
    if (typeof color === "function") return color();

    return color;
  };

  const getTextColor = () => {
    switch (getColor()) {
      case "black":
        return "text-black";
      case "white":
        return "text-white";
      default:
        return "";
    }
  };

  const getImgFilter = () => {
    switch (getColor()) {
      case "black":
        return "invert-0";
      case "white":
        return "invert";
      default:
        return "";
    }
  };

  const highlight = () => {
    return isSelected() ? "text-brandYellow" : getTextColor();
  };

  return (
    <A href={to} class="flex gap-3 relative">
      <img
        class={clsx(
          "absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 pr-3 transition-all duration-700",
          show(),
          getImgFilter()
        )}
        src="/svg/arrows.svg"
      />
      <p
        class={clsx(
          "uppercase transition-colors duration-700 text-nowrap",
          fullHighlight ? highlight() : getTextColor()
        )}
      >
        <span class={clsx("transition-colors duration-700", highlight())}>
          {firstWord}{" "}
        </span>
        {rest.join(" ")}
      </p>
    </A>
  );
};
