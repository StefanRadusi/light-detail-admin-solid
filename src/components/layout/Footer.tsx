import { A } from "@solidjs/router";
import { useSiteInfo } from "~/context/SiteContent";

export const Footer = () => {
  const siteInfo = useSiteInfo();
  console.log(siteInfo());

  return (
    <footer class="flex flex-col items-start px-10 py-5 border-t-2 border-gray-200 gap-12 lg:flex-row bg-white">
      <img
        src="/img/lightdetail_logo_black.png"
        alt="Light Detail Studio logo"
        class="h-8 lg:h-12 shrink-0"
      />
      <div class="flex flex-col gap-3">
        <p class="font-bold">Portfolio</p>
        <A href="/interior-design">Interior Design</A>
      </div>
      <div class="flex flex-col gap-3">
        <p class="font-bold">Services</p>
        <A href="/services#offers">Offers</A>
        <A href="/services#steps">Steps</A>
      </div>
      <div class="flex flex-col gap-3">
        <p class="font-bold">Legal</p>
        <A href="/terms-of-service">Terms of Service</A>
        <A href="/privacy-policy">Privacy Policy</A>
      </div>
      <div class="flex flex-col gap-3">
        <p class="font-bold">Contact</p>
        <p>
          Tel: {siteInfo().phone1} / {siteInfo().phone2}
        </p>
        <p>
          Address: {siteInfo().address}, {siteInfo().city}, {siteInfo().country}
        </p>
        <p>Mail: {siteInfo().email1}</p>
        <p>Mail: {siteInfo().email2}</p>
      </div>
    </footer>
  );
};
