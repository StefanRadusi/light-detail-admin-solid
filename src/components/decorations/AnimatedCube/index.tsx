import clsx from "clsx";
import { createSignal, onCleanup, onMount } from "solid-js";

import "./AnimatedCube.css";

const cubePositions = [
  "show-front",
  "show-right",
  "show-bottom",
  "show-back",
  "show-top",
  "show-left",
];

export const AnimatedCube = () => {
  const [cubeFace, setCubeFace] = createSignal("show-front");

  onMount(() => {
    setTimeout(() => {
      setCubeFace(cubePositions[1]);
    }, 100);

    let i = 2;
    const interval = setInterval(() => {
      setCubeFace(cubePositions[i]);
      i = i === cubePositions.length - 1 ? 0 : i + 1;
    }, 1000);

    onCleanup(() => clearInterval(interval));
  });

  return (
    <div class="cube-container">
      <div class={clsx("cube", cubeFace())}>
        <div class="cube__face cube__face--front" />
        <div class="cube__face cube__face--back" />
        <div class="cube__face cube__face--right" />
        <div class="cube__face cube__face--left" />
        <div class="cube__face cube__face--top" />
        <div class="cube__face cube__face--bottom" />
      </div>
    </div>
  );
};
