import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";
import { GotToButton } from "../buttons/GoToButton";
import { useLocation } from "@solidjs/router";

type Props = {
  pageId: string;
  to: string;
  label: string;
  selected?: Accessor<boolean> | boolean;
};

export const NavigationButton = (props: Props) => {
  const [isOnTopOfBanner, setIsOnTopOfBanner] = createSignal(true);
  const location = useLocation();

  let divRef: HTMLDivElement | undefined;
  let divRefRect: { top: number; height: number };

  createEffect(() => {
    location.pathname;

    const banner = document.querySelector(`section.page-banner`);
    const rectBanner = banner?.getBoundingClientRect();
    const rectDiv = divRef?.getBoundingClientRect();
    if (!divRefRect && rectDiv?.top && rectDiv?.height) {
      divRefRect = { top: rectDiv.top, height: rectDiv.height };
    }
    const rootMargin = divRefRect
      ? `${
          (rectBanner?.height ?? 0) -
          (divRefRect.top ?? 0) -
          (divRefRect.height ?? 0) / 2
        }px`
      : "0px";

    const observer = new IntersectionObserver(
      (entries) => {
        const [banner] = entries;

        if (banner.isIntersecting) {
          setIsOnTopOfBanner(true);
        } else {
          setIsOnTopOfBanner(false);
        }
      },
      {
        threshold: 1,
        rootMargin,
      }
    );
    if (banner) {
      observer.observe(banner);
    }
    onCleanup(() => {
      if (banner) {
        observer.unobserve(banner);
      }
    });
  });

  const color = () => {
    return isOnTopOfBanner() ? "white" : "black";
  };

  return (
    <div ref={divRef}>
      <GotToButton {...props} color={color} />
    </div>
  );
};
