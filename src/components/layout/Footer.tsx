import { A } from "@solidjs/router";

export const Footer = () => {
  return (
    <footer class="flex flex-col items-start px-10 py-5 border-t-2 border-gray-200 gap-12 lg:flex-row bg-white">
      <img src="/img/lightdetail_logo_black.png" alt="Light Detail Studio logo" class="h-8 lg:h-12 shrink-0" />
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
        <p>Tel: +40740488935 / +40751195354</p>
        <p>Address: Memorandumului 10, Cluj-Napoca, Romania</p>
        <p>Mail: bianca.cimpean@lightdetail.eu</p>
        <p>Mail: camelia.popa@lightdetail.eu</p>
      </div>
    </footer>
  );
};
