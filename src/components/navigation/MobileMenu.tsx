import { HiOutlineBars3, HiOutlineArrowSmallLeft } from "solid-icons/hi";
import { GotToButton } from "../buttons/GoToButton";
import { routes } from "./routes";
import { useLocation } from "@solidjs/router";
import clsx from "clsx";
import { createEffect, createSignal, onCleanup } from "solid-js";

export const clickOutside = (el: HTMLDivElement, fn: () => () => void) => {
  const onClick = (e: Event) => {
    if (!el.contains(e.target as Node)) {
      fn()();
    }
  };

  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
};

export const MobileMenu = () => {
  const location = useLocation();
  const [hideMenuList, setHideMenuList] = createSignal(true);

  createEffect(() => {
    location.pathname;
    setHideMenuList(true);
  });

  return (
    <nav
      use:clickOutside={() => setHideMenuList(true)}
      class="fixed right-4 bottom-4 z-20"
    >
      <div
        onClick={() => {
          setHideMenuList(!hideMenuList());
        }}
        class="bg-black/80 rounded-full p-2 relative"
      >
        <HiOutlineBars3
          size={40}
          color="white"
          class={clsx(
            "transition-all duration-300",
            hideMenuList() ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
          )}
        />
        <HiOutlineArrowSmallLeft
          size={40}
          color="white"
          class={clsx(
            "absolute top-2 left-2 transition-all duration-300",
            hideMenuList() ? "rotate-0 opacity-0" : "rotate-180 opacity-100"
          )}
        />
      </div>
      <div
        class={clsx(
          "flex bg-black/90 flex-col absolute left-[calc(100%+1rem)] top-0 -translate-y-[calc(100%+0.4rem)] p-4 pl-11 pr-4 rounded-lg -translate-x-[calc(100%-0.5rem)] z-20  gap-2 transition-transform duration-300",
          hideMenuList() && "translate-x-0"
        )}
      >
        {routes
          .filter((route) => !route.excludeFromNav)
          .map(({ path, label }) => (
            <GotToButton
              to={path}
              label={label}
              selected={() => location.pathname === path}
              color="white"
              fullHighlight
            />
          ))}
      </div>
    </nav>
  );
};
