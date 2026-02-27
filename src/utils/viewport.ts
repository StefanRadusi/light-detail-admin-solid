import { createSignal, onCleanup, onMount } from "solid-js";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = createSignal(false);

  onMount(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      if (isMobile() !== window.innerWidth < 768) {
        setIsMobile(window.innerWidth < 768);
      }
    };

    window.addEventListener("resize", handleResize);

    onCleanup(() => {
      window.removeEventListener("resize", handleResize);
    });
  });

  return isMobile;
};

export const useIsFixedPosition = () => {
  const [positionFixed, setPositionFixed] = createSignal(false);

  const position = () => {
    return positionFixed() ? "fixed" : "absolute";
  };

  onMount(() => {
    const footer = document.querySelector(".page-banner");
    const observer = new IntersectionObserver(
      (entries) => {
        const [footer] = entries;
        if (footer.isIntersecting) {
          setPositionFixed(false);
        } else {
          setPositionFixed(true);
        }
      },
      { threshold: 0 }
    );

    if (footer) {
      observer.observe(footer);
    }

    onCleanup(() => {
      if (footer) {
        observer.unobserve(footer);
      }
    });
  });

  return position;
};
