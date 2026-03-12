import clsx from "clsx";
import "./PageBanner.css";
import { Show, onMount, createSignal, onCleanup, createEffect } from "solid-js";
import { getImageUrl, getVideoUrl } from "~/utils/image";

type Props = {
  id?: string;
  img?: string;
  imgMobile?: string;
  vid?: string;
  vidMobile?: string;
  title?: string;
  subTitle?: string;
};

export const PageBanner = (props: Props) => {
  const splitTitle = () => props.title?.split("|");
  const [videoRef, setVideoRef] = createSignal<HTMLVideoElement>();

  const getTextSize = (text?: string) => {
    if ((text?.length ?? 0) > 8) {
      return "text-4xl";
    }

    return "text-7xl";
  };

  const playVideo = async (video: HTMLVideoElement) => {
    try {
      await video.play();
    } catch (error) {
      // If autoplay fails, try again after a short delay
      setTimeout(() => {
        video.play().catch(() => {
          // If still failing, we can't do much more
        });
      }, 100);
    }
  };

  const handleVideoLoad = (video: HTMLVideoElement) => {
    setVideoRef(video);

    // Play immediately if possible
    if (video.readyState >= 3) {
      playVideo(video);
    } else {
      video.addEventListener("canplay", () => playVideo(video), { once: true });
    }
  };

  // Handle component mount and visibility changes
  onMount(() => {
    // Handle page visibility changes (tab switching, app switching)
    const handleVisibilityChange = () => {
      const video = videoRef();
      if (video && document.visibilityState === "visible") {
        setTimeout(() => {
          if (video.paused) {
            playVideo(video);
          }
        }, 100);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    onCleanup(() => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    });
  });

  // React to props changes (when navigating to the same component with different props)
  createEffect(() => {
    const video = videoRef();
    if (video && props.vid) {
      // Small delay to ensure the video sources are updated
      setTimeout(() => {
        video.load(); // Reload the video with new sources
        playVideo(video);
      }, 50);
    }
  });

  return (
    <section
      id={props.id}
      class={clsx(
        "w-full overflow-hidden relative page-banner",
        !props.vid && "h-screen",
      )}
    >
      <div
        class={clsx(
          "w-full relative",
          !props.vid && "h-full absolute top-0 left-0",
        )}
      >
        <Show
          when={props.vid}
          fallback={
            <picture>
              <Show when={props.imgMobile}>
                <source
                  media="(max-width: 768px)"
                  srcset={props.imgMobile && getImageUrl(props.imgMobile)}
                />
              </Show>
              <img
                src={props.img && getImageUrl(props.img)}
                alt={`${props.title?.replace("|", " ")} - Light Detail Studio`}
                class="w-full h-full object-cover"
              />
            </picture>
          }
        >
          <div class="w-full h-[764px] lg:h-screen relative overflow-hidden">
            <video
              ref={handleVideoLoad}
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
              class="w-full h-full object-cover absolute top-0 left-0"
            >
              <Show when={props.vidMobile}>
                <source
                  media="(max-width: 768px)"
                  src={props.vidMobile && getVideoUrl(props.vidMobile)}
                />
              </Show>
              <source src={props.vid && getVideoUrl(props.vid)} />
            </video>
          </div>
        </Show>

        <Show when={!props.vid}>
          <div class="absolute w-full h-full top-0 left-0 bg-black opacity-50" />
        </Show>
      </div>
      <Show when={!props.vid}>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[2px] max-w-full">
          <div class="relative">
            <div class="overflow-hidden overflowHandle">
              <h1
                class={clsx(
                  "uppercase text-center text-yellow-500 lg:text-8xl font-semibold text-shadow moveBannerTextTop",
                  getTextSize(splitTitle()?.[0]),
                )}
              >
                {splitTitle()?.[0]}
              </h1>
            </div>
            <div class="bg-white w-full h-[4px] rounded-md scaleDivider" />
            <div class="overflow-hidden overflowHandle">
              <h1
                class={clsx(
                  "uppercase text-center text-white lg:text-8xl font-semibold text-shadow z-10 relative moveBannerTextBottom",
                  getTextSize(splitTitle()?.[1]),
                )}
              >
                {splitTitle()?.[1]}
              </h1>
            </div>
          </div>

          <Show when={props.subTitle}>
            <div class="translate-y-[-0px] lg:translate-y-[-20px] fadeIn">
              <p class="text-center text-white text-xl lg:text-2xl font-thin">
                {props.subTitle}
              </p>
            </div>
          </Show>
        </div>
      </Show>
    </section>
  );
};
