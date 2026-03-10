import { Page } from "~/components/layout/Page";
import { Section } from "~/components/layout/Section";
import { SectionHeader } from "~/components/layout/Section/SectionHeader";
import { AnimatedCircle } from "~/components/decorations/AnimatedCircle";
import { For, createSignal } from "solid-js";
import { ProposalCard } from "~/components/sections/Services/ProposalCard";
import { proposals as defaultProposals } from "~/components/sections/Services/proposals";
import { VisualizationsServices } from "~/components/sections/Services/VisualizationsServices";
import { CollaborationFlow } from "~/components/sections/CollaborationFlow";
import { Seo } from "~/components/seo/Seo";
import { JsonLd } from "~/components/seo/JsonLd";
import { createAsync } from "@solidjs/router";
import { getContentSection } from "~/resources/content";
import { getText, findChild } from "~/utils/content";
import { useSiteInfo } from "~/context/SiteContent";
import { ContentNode } from "~/types";

export const route = {
  load: () => {
    getContentSection("services");
    getContentSection("proposals");
    getContentSection("visualizations");
    getContentSection("collaboration-flow");
  },
};

function proposalsFromContent(node: ContentNode | null | undefined) {
  if (!node?.children?.length) return defaultProposals;
  return node.children.map((pkg, i) => {
    const servicesSection = findChild(pkg, "services");
    return {
      id: i + 1,
      title: getText(pkg, "title", defaultProposals[i]?.title ?? ""),
      img: (pkg.metadata?.img as string) ?? defaultProposals[i]?.img ?? "",
      subTitle: getText(pkg, "subtitle", defaultProposals[i]?.subTitle ?? ""),
      description: getText(pkg, "description", defaultProposals[i]?.description ?? ""),
      descriptionFooter: getText(pkg, "description-footer", "", true) || undefined,
      services: servicesSection?.children?.map((s) => ({
        type: (s.metadata?.serviceType as string) ?? "basic",
        text: s.value ?? "",
      })) ?? defaultProposals[i]?.services ?? [],
      isBestValue: (pkg.metadata?.isBestValue as boolean) ?? false,
    };
  });
}

export default function Services() {
  const [divRef, setDivRef] = createSignal<HTMLDivElement | null>(null);
  const siteInfo = useSiteInfo();
  const content = createAsync(() => getContentSection("services"), {
    deferStream: true,
  });
  const proposalsContent = createAsync(() => getContentSection("proposals"), {
    deferStream: true,
  });

  const proposals = () => proposalsFromContent(proposalsContent());

  return (
    <Page id="services">
      <Seo
        title={getText(content(), "seo-title", "Interior Design Services Cluj-Napoca | Light Detail Studio")}
        description={getText(content(), "seo-description", "Servicii design interior Cluj-Napoca — pachete personalizate de amenajari interioare, randari 3D si management de proiect. Light Detail Studio.")}
        keywords={getText(content(), "seo-keywords", "servicii design interior Cluj-Napoca, randari 3D, amenajari interioare Cluj, pachete design interior")}
        path="/services"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Interior Design",
          provider: {
            "@type": "LocalBusiness",
            name: siteInfo().companyName,
            url: siteInfo().website,
          },
          areaServed: {
            "@type": "City",
            name: siteInfo().city,
          },
          description: getText(content(), "jsonld-description", "Interior design services including tailored design packages, 3D visualizations, and project management in Cluj-Napoca, Romania."),
        }}
      />
      <Section
        class="pt-8 lg:mb-28"
        decorations={
          <div
            class="absolute top-1 left-0 w-full h-full -z-10"
            ref={setDivRef}
          >
            <AnimatedCircle divRef={divRef} options={{ threshold: 0.3 }} />
          </div>
        }
      >
        <SectionHeader
          title={getText(content(), "section-title", "Discover the right pack for you")}
          subTitle={getText(content(), "section-subtitle", "We offer 3 tailored service packages designed to meet a variety of needs, lifestyles, and budgets. Whether you’re looking for a solid design foundation, personalized guidance during implementation, or a fully managed, stress-free transformation, we’ve got you covered. Explore our offerings below to find the perfect fit for your project.")}
        />
        <div class="flex gap-6 pb-4 overflow-x-auto no-scrollbar">
          <For each={proposals()}>
            {(proposal) => <ProposalCard {...proposal} />}
          </For>
        </div>
      </Section>
      <VisualizationsServices />
      <CollaborationFlow />
    </Page>
  );
}
