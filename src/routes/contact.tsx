import { Page } from "~/components/layout/Page";
import { Section } from "~/components/layout/Section";
import { ContactForm } from "~/components/sections/Contact/ContactForm";
import { clientOnly } from "@solidjs/start";
const GoogleMaps = clientOnly(() => import("~/components/google-maps"));

import { getStaff } from "~/resources/staff";
import { AnimatedCircle } from "~/components/decorations/AnimatedCircle";
import { createSignal } from "solid-js";
import { Seo } from "~/components/seo/Seo";
import { createAsync } from "@solidjs/router";
import { getContentSection } from "~/resources/content";
import { getText, getImage } from "~/utils/content";
import { useSiteInfo } from "~/context/SiteContent";

export const route = {
  load: () => {
    getStaff();
    getContentSection("contact");
  },
};

export default function Contact() {
  const [divRef, setDivRef] = createSignal<HTMLDivElement | null>(null);
  const siteInfo = useSiteInfo();
  const content = createAsync(() => getContentSection("contact"), {
    deferStream: true,
  });

  return (
    <Page id="contact">
      <Seo
        title={getText(content(), "seo-title")}
        description={getText(content(), "seo-description")}
        keywords={getText(content(), "seo-keywords")}
        path="/contact"
        ogImage={getImage(content(), "og-image")?.src}
      />
      <Section
        decorations={
          <AnimatedCircle divRef={divRef} options={{ threshold: 0.3 }} />
        }
      >
        <div
          ref={setDivRef}
          class="flex gap-4 flex-col my-14 lg:flex-row lg:items-start lg:gap-6"
        >
          <div class="flex flex-col min-w-[300px]">
            <h2 class="text-4xl mb-2">{getText(content(), "heading")}</h2>
            <p>
              <span class="text-gray-500">Mobil:</span>{siteInfo().phone1} /
              {" "}{siteInfo().phone2}
            </p>
            <p>
              <span class="text-gray-500">E-mail:</span>{" "}
              {siteInfo().email1} / {siteInfo().email2}
            </p>
            <p>
              <span class="text-gray-500">Address:</span> str. {siteInfo().address}
            </p>
            <p>
              <span class="text-gray-500">City:</span> {siteInfo().city}
            </p>
            <p>
              <span class="text-gray-500">Country:</span> {siteInfo().country}
            </p>
          </div>

          <div class="h-2 border-b-4 lg:border-r-4 border-black lg:self-stretch lg:h-[unset]" />
          <h2 class="text-4xl lg:pt-[200px]">
            {getText(content(), "cta-heading")} <br />{" "}
            <span class="text-brandYellow">{getText(content(), "cta-subheading")}</span>
          </h2>
        </div>
        <ContactForm />
      </Section>
      <GoogleMaps />
    </Page>
  );
}
