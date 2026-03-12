import { createContext, createMemo, useContext, JSXElement } from "solid-js";
import { createAsync } from "@solidjs/router";
import { getContentSection } from "~/resources/content";
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

const empty: SiteInfo = {
  companyName: "",
  phone1: "",
  phone2: "",
  email1: "",
  email2: "",
  address: "",
  city: "",
  country: "",
  website: "",
  facebook: "",
  instagram: "",
};

const SiteContentContext = createContext<() => SiteInfo>(() => empty);

export function SiteContentProvider(props: { children: JSXElement }) {
  const data = createAsync(() => getContentSection("site-info"), {
    deferStream: true,
  });

  const siteInfo = createMemo((): SiteInfo => {
    const node = data();
    if (!node) return empty;

    return {
      companyName: getText(node, "company-name"),
      phone1: getText(node, "phone-1"),
      phone2: getText(node, "phone-2"),
      email1: getText(node, "email-1"),
      email2: getText(node, "email-2"),
      address: getText(node, "address"),
      city: getText(node, "city"),
      country: getText(node, "country"),
      website: getText(node, "website"),
      facebook: getText(node, "facebook"),
      instagram: getText(node, "instagram"),
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
