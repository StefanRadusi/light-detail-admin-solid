import { JSXElement, createMemo } from "solid-js";
import { PageBanner } from "./PageBanner/PageBanner";
import { routes } from "../navigation/routes";

type Props = {
  id: string;
  children: JSXElement;
};

export const Page = (props: Props) => {
  const route = () => routes.find((route) => route.id === props.id)!;

  return (
    <main class="w-full flex flex-col relative">
      <PageBanner
        id={props.id}
        img={route().img}
        title={route().title}
        subTitle={route().subTitle}
        imgMobile={route().imgMobile}
        vid={route().vid}
        vidMobile={route().vidMobile}
      />
      {props.children}
    </main>
  );
};
