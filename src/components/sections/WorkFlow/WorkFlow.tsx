import { createSignal } from "solid-js";
import { createAsync } from "@solidjs/router";
import { GotToButton } from "~/components/buttons/GoToButton";
import { AnimatedCircle } from "~/components/decorations/AnimatedCircle";
import { getContentSection } from "~/resources/content";
import { getText } from "~/utils/content";


export const WorkFlow = () => {
  const [divRef, setDivRef] = createSignal<HTMLDivElement | null>(null);
  const content = createAsync(() => getContentSection("workflow"), {
    deferStream: true,
  });

  const steps = () => {
    const node = content();
    if (!node?.children?.length) return [];
    return node.children
      .filter((c) => c.type === "section")
      .map((step) => ({
        img: (step.metadata?.img as string) ?? "",
        title: getText(step, "title"),
        subTitle: getText(step, "subtitle"),
      }));
  };

  const heading = () => getText(content(), "heading");
  const description = () => getText(content(), "description");

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
          {steps().map(({ title, img, subTitle }) => (
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
            {heading().split("|").map((part, i) => (
              <>{i > 0 && <br />}{part}</>
            ))}
          </h3>
          <p class="text-gray-500">{description()}</p>
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
