import { Page } from "~/components/layout/Page";
import { Section } from "~/components/layout/Section";
import { ContactForm } from "~/components/sections/Contact/ContactForm";
import { clientOnly } from "@solidjs/start";
const GoogleMaps = clientOnly(() => import("~/components/google-maps"));

import { getStaff } from "~/resources/staff";
import { AnimatedCircle } from "~/components/decorations/AnimatedCircle";
import { createSignal } from "solid-js";
import { Seo } from "~/components/seo/Seo";

export const route = {
  load: () => getStaff(),
};

export default function Contact() {
  const [divRef, setDivRef] = createSignal<HTMLDivElement | null>(null);

  return (
    <Page id="contact">
      <Seo
        title="Contact | Light Detail Studio - Interior Design Cluj-Napoca"
        description="Contacteaza Light Detail Studio — design interior Cluj-Napoca. Programeaza o consultatie pentru amenajari interioare. Memorandumului 10, Cluj-Napoca."
        keywords="contact design interior Cluj, Light Detail Studio contact, design interior Cluj-Napoca"
        path="/contact"
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
            <h2 class="text-4xl mb-2">LIGHT DETAIL</h2>
            <p>
              <span class="text-gray-500">Mobil:</span>+40740488935 /
              +40751195354
            </p>
            <p>
              <span class="text-gray-500">E-mail:</span>{" "}
              bianca.cimpean@lightdetail.eu / camelia.popa@lightdetail.eu
            </p>
            <p>
              <span class="text-gray-500">Address:</span> str. Memorandumului 10
            </p>
            <p>
              <span class="text-gray-500">City:</span> Cluj-Napoca
            </p>
            <p>
              <span class="text-gray-500">Country:</span> Romania
            </p>
          </div>

          <div class="h-2 border-b-4 lg:border-r-4 border-black lg:self-stretch lg:h-[unset]" />
          <h2 class="text-4xl lg:pt-[200px]">
            LET`S GET TO KNOW EACH OTHER <br />{" "}
            <span class="text-brandYellow">SEND US</span> AN EMAIL
          </h2>
        </div>
        <ContactForm />
      </Section>
      <GoogleMaps />
    </Page>
  );
}
