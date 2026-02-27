import { A } from "@solidjs/router";
import { Seo } from "~/components/seo/Seo";

export default function NotFound() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <Seo
        title="Page Not Found | Light Detail Studio"
        description="The page you are looking for does not exist. Return to Light Detail Studio's homepage."
        path="/404"
      />
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Not Found
      </h1>
      <p class="my-4">
        <A href="/" class="text-sky-600 hover:underline">
          Home
        </A>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>
      </p>
    </main>
  );
}
