import { Show, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";
import { HiSolidXCircle } from "solid-icons/hi";

export const [currentPreviewImg, setPreviewImg] = createSignal<string | null>(
  null
);

export const ImgPreview = () => {
  return (
    <Transition name="slide-fade">
      <Show when={currentPreviewImg()}>
        <div class="fixed top-0 left-0 w-screen h-screen p-12 bg-black/90 text-white z-20">
          <HiSolidXCircle
            class="absolute top-6 right-6 cursor-pointer"
            color="white"
            size={35}
            onClick={() => setPreviewImg(null)}
          />
          <img
            class="w-full h-full object-contain"
            src={currentPreviewImg() ?? undefined}
            alt="Full size preview"
          />
        </div>
      </Show>
    </Transition>
  );
};
