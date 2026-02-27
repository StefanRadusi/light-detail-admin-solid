export type Route = {
  id: string;
  label: string;
  path: string;
  img: string;
  imgMobile?: string;
  vid?: string;
  vidMobile?: string;
  title: string;
  subTitle: string;
  excludeFromNav?: boolean;
};

export const routes: Route[] = [
  {
    id: "home",
    label: "home",
    path: "/",
    img: "/img/cover.jpg",
    vid: "/vid/home-landscape.webm",
    vidMobile: "/vid/home-portrait.webm",
    title: "our|mission",
    subTitle:
      "Light Detail Studio's mission is to design and implement functionally-aesthetically balanced spaces tailored to the client's personality traits.",
  },
  {
    id: "about",
    label: "about us",
    path: "/about",
    img: "/img/about-us-new.webp",
    imgMobile: "/img/about-us-mobile.webp",
    title: "about|us",
    subTitle:
      "Duo of inspiration and collaboration in the form of a friendly partnership created to freely bring bold ideas into life.",
  },
  {
    id: "interior_design",
    label: "interior design",
    path: "/interior-design",
    img: "/img/interior-design.webp",
    title: "interior design|portfolio",
    subTitle:
      "Light Detail Studio's mission is to design and implement functionally-aesthetically balanced spaces tailored to the client's personality traits.",
  },
  // {
  //   id: "visualization",
  //   label: "visualization",
  //   path: "/visualization",
  //   img: "/img/visualisation1.jpg",
  //   title: "visualization|portfolio",
  //   subTitle:
  //     "3D renderings are a photorealistic way of understanding an architectural plan, a construction drawing or something that does not exist yet, an idea or a concept.",
  // },
  {
    id: "services",
    label: "services",
    path: "/services",
    img: "/img/services_1.png",
    title: "our|services",
    subTitle:
      "We design homes that mirrors and shelters each and every lifestyle.",
  },
  {
    id: "contact",
    label: "contact",
    path: "/contact",
    img: "/img/contact-new.webp",
    imgMobile: "/img/contact-mobile.webp",
    title: "contact|us",
    subTitle:
      "We design homes that mirrors and shelters each and every lifestyle.",
  },
  {
    id: "termsOfService",
    label: "Terms of Service",
    path: "/terms-of-service",
    img: "/img/residential.jpg",
    title: "Terms of|Service",
    subTitle:
      "Welcome to Light Detail. These Terms of Service (“Terms”) govern your use of our website and services. By accessing or using our website and services, you agree to be bound by these Terms.",
    excludeFromNav: true,
  },
  {
    id: "privacyPolicy",
    label: "Privacy Policy",
    path: "/privacy-policy",
    img: "/img/residential.jpg",
    title: "Privacy|Policy",
    subTitle:
      "Welcome to Light Detail. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your information when you use our contact form.",
    excludeFromNav: true,
  },
];
