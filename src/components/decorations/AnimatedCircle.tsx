import clsx from "clsx";
import {
  Accessor,
  Setter,
  createEffect,
  createSignal,
  onCleanup,
} from "solid-js";

const setShowWhenInView = (
  element: HTMLDivElement,
  callback: Setter<boolean>,
  options?: IntersectionObserverInit
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        callback(true);
      } else {
        callback(false);
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1,
      ...options,
    }
  );

  observer.observe(element);

  return observer;
};

export const AnimatedCircle = (props: {
  divRef: Accessor<HTMLDivElement | null>;
  cssClass?: string;
  options?: IntersectionObserverInit;
}) => {
  let observer: IntersectionObserver;
  const [visibility, setVisibility] = createSignal(false);

  createEffect(() => {
    const div = props.divRef();
    if (div) {
      observer = setShowWhenInView(div, setVisibility, props.options);
    }
  });

  onCleanup(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return (
    <div
      class={clsx(
        props.cssClass ??
          "w-[180%] pb-[180%] lg:w-full lg:pb-[100%] top-0 left-0 -translate-x-1/2 -translate-y-1/2",
        "absolute bg-gray-200 rounded-full -z-10 scale-0 transition-transform duration-700",
        visibility() && "scale-100"
      )}
    />
  );
};
