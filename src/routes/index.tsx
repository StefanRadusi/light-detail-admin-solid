import { LatestProjects } from "~/components/sections/LatestProjects/LatestProjects";
import { WorkFlow } from "~/components/sections/WorkFlow/WorkFlow";
import { getLatestProjects } from "~/resources/projects";
import { createAsync } from "@solidjs/router";
import { Page } from "~/components/layout/Page";
import { Show } from "solid-js";
import { Project } from "~/types";
import { Seo } from "~/components/seo/Seo";
import { JsonLd } from "~/components/seo/JsonLd";

export const route = {
  load: () => getLatestProjects(),
};

export default function Home() {
  const data = createAsync(() => getLatestProjects(), {
    deferStream: true,
  });

  const getDataWithPath = () =>
    data()?.map((project: Project) => ({
      ...project,
      path: `/interior-design/${project.id}`,
    })) || [];

  return (
    <Page id="home">
      <Seo
        title="Light Detail Studio | Interior Design Cluj-Napoca"
        description="Light Detail Studio — design interior Cluj-Napoca. Amenajari interioare Cluj, randari 3D si vizualizari arhitecturale. Transformam spatii cu design functional si estetic."
        keywords="design interior Cluj, amenajari interioare Cluj-Napoca, interior design Cluj-Napoca, randari 3D, Light Detail Studio"
        path="/"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          additionalType: "https://schema.org/InteriorDesigner",
          name: "Light Detail Studio",
          url: "https://lightdetail.eu",
          logo: "https://lightdetail.eu/img/lightdetail_logo_black.png",
          image: "https://lightdetail.eu/img/residential.jpg",
          telephone: ["+40740488935", "+40751195354"],
          email: ["bianca.cimpean@lightdetail.eu", "camelia.popa@lightdetail.eu"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Memorandumului 10",
            addressLocality: "Cluj-Napoca",
            addressCountry: "RO",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 46.76990498138808,
            longitude: 23.587283658350607,
          },
          sameAs: [
            "https://www.facebook.com/lightdetailstudio",
            "https://www.instagram.com/lightdetailstudio",
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Light Detail Studio",
          url: "https://lightdetail.eu",
        }}
      />
      <Show when={getDataWithPath().length > 0}>
        <LatestProjects projects={getDataWithPath()} />
      </Show>

      <WorkFlow />
    </Page>
  );
}
