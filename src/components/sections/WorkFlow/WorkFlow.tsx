import { createSignal } from "solid-js";
import { GotToButton } from "~/components/buttons/GoToButton";
import { AnimatedCircle } from "~/components/decorations/AnimatedCircle";

const steps = [
  {
    img: "/img/space.jpg",
    title: "Space planning",
    subTitle: "Shape forming.",
  },
  {
    img: "/img/concept.jpg",
    title: "Concept development",
    subTitle:
      "Determining the best interior style for you. Developing the design concept.",
  },
  {
    img: "/img/product.jpg",
    title: "Product selection & buying",
    subTitle: "Selection of the appropriate items and products required.",
  },
  {
    img: "/img/project.jpg",
    title: "Project implementation",
    subTitle: "Managing every stage of the interior design process.",
  },
];

export const WorkFlow = () => {
  const [divRef, setDivRef] = createSignal<HTMLDivElement | null>(null);

  return (
    <div class="flex w-full mt-20 lg:mt-32 relative overflow-hidden pb-12 lg:px-60">
      <AnimatedCircle
        cssClass="w-[120%] pb-[120%] lg:w-full lg:pb-[100%] top-0 left-0 translate-x-[40%] lg:translate-x-1/2"
        divRef={divRef}
        options={{ threshold: 0.3 }}
      />
      <div
        ref={setDivRef}
        class="flex flex-1 max-w-6xl m-auto px-6 gap-12 lg:gap-32 justify-start items-start flex-col-reverse lg:flex-row"
      >
        <div class="flex flex-col flex-1 gap-12 lg:gap-6">
          {steps.map(({ title, img, subTitle }) => (
            <div class="flex gap-6 flex-col-reverse lg:flex-row">
              <img
                src={img}
                class="object-cover w-full lg:w-52 h-52 shadow-md"
              />
              <div class="flex flex-col pt-3 gap-3">
                <h3 class="text-3xl font-bold">{title}</h3>
                <p class="text-gray-500">{subTitle}</p>
              </div>
            </div>
          ))}
          <div class="flex mt-6 pl-10 lg:hidden">
            <GotToButton
              to="/interior-design"
              label="check out our working process"
              selected
            />
          </div>
        </div>

        <div class="flex flex-col text-right lg:w-[40%] pt-3 gap-3 border-r-4 py-4 pr-4 border-black">
          <h3 class="text-3xl font-bold ">
            HOW DO <br />
            WE WORK
          </h3>
          <p class="text-gray-500">
            A strategic playground of shapes and colors chosen with care for the
            environment and economical sustainability, working together with
            local providers as much as possible. Designed homes that mirrors and
            shelters each and every lifestyle.
          </p>
          <div class="hidden lg:flex justify-end mt-12">
            <GotToButton
              to="/interior-design"
              label="check out our working process"
              selected
            />
          </div>
        </div>
      </div>
    </div>
  );
};
