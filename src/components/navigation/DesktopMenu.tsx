import { useLocation } from "@solidjs/router";
import { routes } from "./routes";
import { createSignal, onCleanup, onMount } from "solid-js";
import clsx from "clsx";
import { NavigationButton } from "./NavigationButton";

export const DesktopMenu = () => {
  const location = useLocation();
  const [positionFixed, setPositionFixed] = createSignal(true);

  onMount(() => {
    const footer = document.querySelector("footer");
    const observer = new IntersectionObserver((entries) => {
      const [footer] = entries;
      if (footer.isIntersecting) {
        setPositionFixed(false);
      } else {
        setPositionFixed(true);
      }
    });

    if (footer) {
      observer.observe(footer);
    }

    onCleanup(() => {
      if (footer) {
        observer.unobserve(footer);
      }
    });
  });

  const position = () => {
    return positionFixed()
      ? "fixed bottom-0 right-0"
      : "absolute right-0 top-0 -translate-y-full";
  };

  return (
    <nav
      class={clsx(
        "z-20 px-6 py-8 list-none flex-col gap-2 hidden lg:flex",
        position()
      )}
    >
      {routes
        .filter((route) => !route.excludeFromNav)
        .map(({ id, path, label }) => (
          <li>
            <NavigationButton
              pageId={id}
              to={path}
              label={label}
              selected={() => location.pathname === path}
            />
          </li>
        ))}
    </nav>
  );
};
