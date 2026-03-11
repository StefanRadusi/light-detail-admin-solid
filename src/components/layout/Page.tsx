import { JSXElement } from "solid-js";
import { createAsync } from "@solidjs/router";
import { PageBanner } from "./PageBanner/PageBanner";
import { routes } from "../navigation/routes";
import { getContentSection } from "~/resources/content";
import { getText, getImage } from "~/utils/content";

const pageKeyMap: Record<string, string> = {
  home: "home",
  about: "about",
  interior_design: "interior-design",
  services: "services",
  contact: "contact",
  termsOfService: "terms-of-service",
  privacyPolicy: "privacy-policy",
};

type Props = {
  id: string;
  children: JSXElement;
};

export const Page = (props: Props) => {
  const route = () => routes.find((route) => route.id === props.id)!;

  const contentKey = () => pageKeyMap[props.id];
  const pageContent = createAsync(
    () => {
      const key = contentKey();
      return key
        ? getContentSection(key)
        : Promise.resolve(null);
    },
    { deferStream: true }
  );

  const bannerImg = () => {
    const img = getImage(pageContent(), "banner-img");
    return img?.src ?? route().img;
  };

  const bannerImgMobile = () => {
    const img = getImage(pageContent(), "banner-img");
    return img?.mobile ?? route().imgMobile;
  };

  const bannerVid = () => {
    const node = pageContent();
    if (!node) return route().vid;
    const vidChild = node.children?.find((c) => c.key === "banner-vid");
    return vidChild?.value ?? route().vid;
  };

  const bannerVidMobile = () => {
    const node = pageContent();
    if (!node) return route().vidMobile;
    const vidChild = node.children?.find((c) => c.key === "banner-vid");
    return (vidChild?.metadata?.mobile as string) ?? route().vidMobile;
  };

  return (
    <main class="w-full flex flex-col relative">
      <PageBanner
        id={props.id}
        img={bannerImg()}
        title={getText(pageContent(), "banner-title")}
        subTitle={getText(pageContent(), "banner-subtitle")}
        imgMobile={bannerImgMobile()}
        vid={bannerVid()}
        vidMobile={bannerVidMobile()}
      />
      {props.children}
    </main>
  );
};
