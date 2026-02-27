import { A } from "@solidjs/router";

export const Header = () => {
  return (
    <header class="absolute top-0 left-0 w-full z-10 px-6 lg:px-10 py-5 flex items-center">
      <A href="/">
        <img
          src="/img/lightdetail_logo_white.png"
          class="h-8 lg:h-12"
          alt="company logo"
        />
      </A>
      <div class="flex gap-5 ml-auto ">
        <a href="https://www.facebook.com/lightdetailstudio" target="_blank">
          <img
            src="/svg/facebook.svg"
            class="h-8 filter invert"
            alt="facebook logo"
          />
        </a>
        <a href="https://www.instagram.com/lightdetailstudio" target="_blank">
          <img
            src="/svg/instagram.svg"
            class="h-8 filter invert"
            alt="instagram logo"
          />
        </a>
      </div>
    </header>
  );
};
