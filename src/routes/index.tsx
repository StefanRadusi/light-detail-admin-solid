import { LatestProjects } from "~/components/sections/LatestProjects/LatestProjects";
import { WorkFlow } from "~/components/sections/WorkFlow/WorkFlow";
import { createAsync } from "@solidjs/router";
import { Page } from "~/components/layout/Page";
import { Seo } from "~/components/seo/Seo";
import { JsonLd } from "~/components/seo/JsonLd";
import { getContentSection } from "~/resources/content";
import { getText, getImage } from "~/utils/content";
import { useSiteInfo } from "~/context/SiteContent";

export const route = {
  load: () => {
    getContentSection("home");
  },
};

export default function Home() {
  const content = createAsync(() => getContentSection("home"), {
    deferStream: true,
  });

  const siteInfo = useSiteInfo();

  return (
    <Page id="home">
      <Seo
        title={getText(content(), "seo-title")}
        description={getText(content(), "seo-description")}
        keywords={getText(content(), "seo-keywords")}
        path="/"
        ogImage={getImage(content(), "og-image")?.src}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          additionalType: "https://schema.org/InteriorDesigner",
          name: siteInfo().companyName,
          url: siteInfo().website,
          logo: `${siteInfo().website}/img/lightdetail_logo_black.png`,
          image: `${siteInfo().website}/img/residential.jpg`,
          telephone: [siteInfo().phone1, siteInfo().phone2],
          email: [siteInfo().email1, siteInfo().email2],
          address: {
            "@type": "PostalAddress",
            streetAddress: siteInfo().address,
            addressLocality: siteInfo().city,
            addressCountry: "RO",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 46.76990498138808,
            longitude: 23.587283658350607,
          },
          sameAs: [siteInfo().facebook, siteInfo().instagram],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteInfo().companyName,
          url: siteInfo().website,
        }}
      />
      <LatestProjects />

      <WorkFlow />
    </Page>
  );
}
