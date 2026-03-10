import { createContext, createMemo, useContext, JSXElement } from "solid-js";
import { createAsync } from "@solidjs/router";
import { getContentSection } from "~/resources/content";
import { ContentNode } from "~/types";
import { getText } from "~/utils/content";

type SiteInfo = {
  companyName: string;
  phone1: string;
  phone2: string;
  email1: string;
  email2: string;
  address: string;
  city: string;
  country: string;
  website: string;
  facebook: string;
  instagram: string;
};

const defaults: SiteInfo = {
  companyName: "Light Detail Studio",
  phone1: "+40740488935",
  phone2: "+40751195354",
  email1: "bianca.cimpean@lightdetail.eu",
  email2: "camelia.popa@lightdetail.eu",
  address: "Memorandumului 10",
  city: "Cluj-Napoca",
  country: "Romania",
  website: "https://lightdetail.eu",
  facebook: "https://www.facebook.com/lightdetailstudio",
  instagram: "https://www.instagram.com/lightdetailstudio",
};

const SiteContentContext = createContext<() => SiteInfo>(() => defaults);

export function SiteContentProvider(props: { children: JSXElement }) {
  const data = createAsync(() => getContentSection("site-info"), {
    deferStream: true,
  });

  const siteInfo = createMemo((): SiteInfo => {
    const node = data();
    if (!node) return defaults;

    return {
      companyName: getText(node, "company-name", defaults.companyName),
      phone1: getText(node, "phone-1", defaults.phone1),
      phone2: getText(node, "phone-2", defaults.phone2),
      email1: getText(node, "email-1", defaults.email1),
      email2: getText(node, "email-2", defaults.email2),
      address: getText(node, "address", defaults.address),
      city: getText(node, "city", defaults.city),
      country: getText(node, "country", defaults.country),
      website: getText(node, "website", defaults.website),
      facebook: getText(node, "facebook", defaults.facebook),
      instagram: getText(node, "instagram", defaults.instagram),
    };
  });

  return (
    <SiteContentContext.Provider value={siteInfo}>
      {props.children}
    </SiteContentContext.Provider>
  );
}

export function useSiteInfo() {
  return useContext(SiteContentContext);
}
