import { createAsync } from "@solidjs/router";
import { For, createSignal } from "solid-js";
import { AnimatedCircle } from "~/components/decorations/AnimatedCircle";
import { Page } from "~/components/layout/Page";
import { StaffCard } from "~/components/sections/Staff/StaffCard";
import { Seo } from "~/components/seo/Seo";

import { getStaff } from "~/resources/staff";
import { getContentSection } from "~/resources/content";
import { getText, getImage } from "~/utils/content";

export const route = {
  load: () => {
    getStaff();
    getContentSection("about");
  },
};

export default function About() {
  const data = createAsync(() => getStaff(), {
    deferStream: true,
  });

  const content = createAsync(() => getContentSection("about"), {
    deferStream: true,
  });

  const [divRef1, setDivRef1] = createSignal<HTMLDivElement | null>(null);
  const [divRef2, setDivRef2] = createSignal<HTMLDivElement | null>(null);

  return (
    <Page id="about">
      <Seo
        title={getText(content(), "seo-title")}
        description={getText(content(), "seo-description")}
        keywords={getText(content(), "seo-keywords")}
        path="/about"
        ogImage={getImage(content(), "og-image")?.src}
      />
      <div class="flex relative overflow-hidden lg:px-60">
        <AnimatedCircle divRef={divRef1} options={{ threshold: 0.3 }} />
        <AnimatedCircle
          cssClass="w-[180%] pb-[180%] lg:w-full lg:pb-[100%] top-full left-full -translate-x-1/2 -translate-y-1/2"
          divRef={divRef2}
          options={{ threshold: 0.1, rootMargin: "200px" }}
        />
        <div
          ref={setDivRef1}
          class="flex flex-col px-6 m-auto flex-1 max-w-6xl py-8 lg:py-16 gap-8 lg:gap-16"
        >
          <For each={data()}>
            {(staffMember) => <StaffCard {...staffMember} />}
          </For>
        </div>
      </div>
      <div ref={setDivRef2} />
    </Page>
  );
}
