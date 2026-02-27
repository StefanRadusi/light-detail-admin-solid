import clsx from "clsx";
import { createSignal, onMount, onCleanup } from "solid-js";
import { GotToButton } from "~/components/buttons/GoToButton";

export const VisualizationsServices = () => {
  const [flip, setFlip] = createSignal(true);
  let sectionRef!: HTMLDivElement;

  onMount(() => {
    if (!sectionRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFlip(false);
          } else {
            setFlip(true);
          }
        });
      },
      {
        threshold: 1,
      }
    );

    observer.observe(sectionRef);

    onCleanup(() => observer.disconnect());
  });

  return (
    <section
      onClick={() => setFlip(!flip())}
      class="mt-12 lg:mt-0 w-full flex relative h-screen max-h-[600px] overflow-hidden lg:px-48 lg:mb-20 cursor-pointer"
    >
      <div
        class={clsx(
          "absolute top-0 left-0 w-full h-[80%] gap-[40px] flex transition-transform duration-300",
          flip() ? "-translate-x-[calc(40%+40px)]" : "translate-x-0"
        )}
      >
        <div
          class={clsx(
            "h-full w-[70%] shrink-0 transition-opacity duration-300",
            flip() ? "opacity-30" : "opacity-100"
          )}
        >
          <img
            class="w-full h-full object-cover"
            src="/img/visualisation1.jpg"
          />
        </div>
        <div
          class={clsx(
            "h-full w-[70%] shrink-0 transition-opacity duration-300",
            flip() ? "opacity-100" : "opacity-30"
          )}
        >
          <img
            class="w-full h-full object-cover"
            src="/img/visualisation2.jpg"
          />
        </div>
      </div>
      <div class="flex flex-col mx-auto px-6 flex-1 max-w-6xl overflow-hidden relative justify-end ">
        <div
          ref={sectionRef}
          class="flex flex-col w-full bg-gray-100 p-6 gap-4 shadow-md mb-4 rounded-md max-w-[500px]"
        >
          <h3 class="text-4xl">VISUALIZATIONS</h3>
          <p>
            We create CG ART visualizations for residential and commercial
            interiors. 3D renderings are a photorealistic way of understanding
            an architectural plan, a construction drawing or something that does
            not exist yet, an idea or a concept.
          </p>
          <p>
            Therefore, if you are looking to outsource a CG ART visualization
            for a client presentation or marketing purposes we are the team to
            partner with.
          </p>
          <div class="pl-[35px]">
            <GotToButton to="/contact" label="CONTACT US" selected />
          </div>
        </div>
      </div>
    </section>
  );
};
