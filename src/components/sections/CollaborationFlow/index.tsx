import { For, Show, createSignal, onMount } from "solid-js";
import { createAsync } from "@solidjs/router";
import { StepCard, StepCardTextPosition } from "./StepCard";
import { flowSteps as defaultFlowSteps } from "./flowSteps";
import { FlowConnector } from "./flow-connector-svg";
import clsx from "clsx";
import { getContentSection } from "~/resources/content";
import { getText } from "~/utils/content";

export const CollaborationFlow = () => {
  const [visibleElements, setVisibleElements] = createSignal<
    Record<number, boolean>
  >({});
  let containerRef: HTMLDivElement | undefined;

  const content = createAsync(() => getContentSection("collaboration-flow"), {
    deferStream: true,
  });

  const steps = () => {
    const node = content();
    if (!node?.children?.length) return defaultFlowSteps;
    return node.children
      .filter((c) => c.type === "section")
      .map((step, i) => ({
        title: getText(step, "title", defaultFlowSteps[i]?.title ?? ""),
        subTitle: getText(step, "subtitle", defaultFlowSteps[i]?.subTitle ?? ""),
        description: getText(step, "description", defaultFlowSteps[i]?.description ?? ""),
        img: (step.metadata?.img as string) ?? defaultFlowSteps[i]?.img ?? "",
      }));
  };

  onMount(() => {
    if (!containerRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementIndex = parseInt(
              entry.target.getAttribute("data-element-index") || "0"
            );
            setVisibleElements((prev) => ({ ...prev, [elementIndex]: true }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    const elements = containerRef.querySelectorAll("[data-element-index]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });

  return (
    <section class="w-full flex relative lg:px-48 ">
      <div
        ref={containerRef}
        class="flex flex-col px-6 mx-auto flex-1 max-w-6xl overflow-hidden pb-24"
      >
        <For each={steps()}>
          {(step, index) => {
            const stepElementIndex = index() * 2;
            const connectorElementIndex = index() * 2 + 1;

            return (
              <>
                <div
                  class={clsx(
                    "mt-8 transition-all duration-700 ease-out delay-500 first:delay-0",
                    visibleElements()[stepElementIndex]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                  data-element-index={stepElementIndex}
                >
                  <StepCard
                    {...step}
                    showHeaderTitle={index() === 0}
                    textPosition={
                      index() % 2
                        ? StepCardTextPosition.LEFT
                        : StepCardTextPosition.RIGHT
                    }
                  />
                </div>
                <Show when={index() < steps().length - 1}>
                  <div
                    class={clsx(
                      "relative transition-opacity duration-500 ease-out delay-300",
                      index() % 2 === 0
                        ? "-scale-x-100 lg:scale-x-100"
                        : "scale-x-100 lg:-scale-x-100",
                      visibleElements()[connectorElementIndex]
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    )}
                    data-element-index={connectorElementIndex}
                  >
                    <div class="absolute top-0 right-[20px] lg:left-1/2 lg:-translate-x-[calc(100%-15px)] w-[130px]">
                      <FlowConnector
                        animate={visibleElements()[connectorElementIndex]}
                      />
                    </div>
                  </div>
                </Show>
              </>
            );
          }}
        </For>
      </div>
    </section>
  );
};
