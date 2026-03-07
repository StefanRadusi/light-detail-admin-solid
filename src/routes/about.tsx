import { createAsync } from "@solidjs/router";
import { For, createSignal } from "solid-js";
import { AnimatedCircle } from "~/components/decorations/AnimatedCircle";
import { Page } from "~/components/layout/Page";
import { StaffCard } from "~/components/sections/Staff/StaffCard";
import { Seo } from "~/components/seo/Seo";

import { getStaff } from "~/resources/staff";

export const route = {
  load: () => getStaff(),
};

export default function About() {
  const data = createAsync(() => getStaff(), {
    deferStream: true,
  });

  const [divRef1, setDivRef1] = createSignal<HTMLDivElement | null>(null);
  const [divRef2, setDivRef2] = createSignal<HTMLDivElement | null>(null);

  return (
    <Page id="about">
      <Seo
        title="About Us | Light Detail Studio - Interior Design Cluj-Napoca"
        description="Echipa design interior Cluj — cunoaste echipa Light Detail Studio. Duo de inspiratie si colaborare in design interior Cluj-Napoca."
        keywords="echipa design interior Cluj, despre noi Light Detail, interior designers Cluj-Napoca"
        path="/about"
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
