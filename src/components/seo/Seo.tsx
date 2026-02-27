import { Title, Meta, Link } from "@solidjs/meta";

type Props = {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  ogImage?: string;
};

const BASE_URL = "https://lightdetail.eu";

export const Seo = (props: Props) => {
  const canonicalUrl = () => `${BASE_URL}${props.path}`;

  return (
    <>
      <Title>{props.title}</Title>
      <Meta name="description" content={props.description} />
      {props.keywords && <Meta name="keywords" content={props.keywords} />}
      <Meta property="og:title" content={props.title} />
      <Meta property="og:description" content={props.description} />
      <Meta
        property="og:image"
        content={props.ogImage || `${BASE_URL}/img/residential.jpg`}
      />
      <Meta property="og:url" content={canonicalUrl()} />
      <Meta property="og:type" content="website" />
      <Link rel="canonical" href={canonicalUrl()} />
    </>
  );
};
