import { createSignal } from "solid-js";
import { createAsync } from "@solidjs/router";
import { AnimatedCircle } from "~/components/decorations/AnimatedCircle";
import { Page } from "~/components/layout/Page";
import { Seo } from "~/components/seo/Seo";
import { getContentSection } from "~/resources/content";
import { getText } from "~/utils/content";
import { LegalContent } from "~/components/sections/Legal/LegalContent";

export const route = {
  load: () => getContentSection("privacy-policy"),
};

export default function PrivacyPolicy() {
  const [divRef1, setDivRef1] = createSignal<HTMLDivElement | null>(null);
  const content = createAsync(() => getContentSection("privacy-policy"), {
    deferStream: true,
  });

  return (
    <Page id="privacyPolicy">
      <Seo
        title={getText(content(), "seo-title")}
        description={getText(content(), "seo-description")}
        path="/privacy-policy"
      />
      <div class="flex relative overflow-hidden lg:px-60">
        <AnimatedCircle divRef={divRef1} options={{ threshold: 0.3 }} />
        <div
          ref={setDivRef1}
          class="flex flex-col px-6 m-auto flex-1 max-w-6xl py-8 lg:py-16 gap-3"
        >
          <LegalContent content={content()} />
        </div>
      </div>
    </Page>
  );
}
