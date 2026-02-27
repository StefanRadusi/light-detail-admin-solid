import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preload" as="image" href="/img/cover.jpg"></link>
          <link rel="preload" as="image" href="/img/about-us-cover.jpg"></link>
          <link rel="preload" as="image" href="/img/residential.jpg"></link>
          <link rel="preload" as="image" href="/img/visualisation1.jpg"></link>
          <link rel="preload" as="image" href="/img/services.png"></link>
          <link rel="preload" as="image" href="/img/contact.jpg"></link>
          <script src="/script/meta.js" />
          <noscript>
            <img
              height="1"
              width="1"
              style="display:none"
              src="https://www.facebook.com/tr?id=4104641113138375&ev=PageView&noscript=1"
            />
          </noscript>

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-17547056259"
          ></script>
          <script src="/script/google.js"></script>

          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
