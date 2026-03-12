// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Show, Suspense } from "solid-js";
import { MetaProvider } from "@solidjs/meta";
import { DesktopMenu } from "./components/navigation/DesktopMenu";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";

import "./app.css";
import { useIsMobile } from "./utils/viewport";
import { MobileMenu } from "./components/navigation/MobileMenu";
import { ImgPreview } from "./components/img-preview";
import { SiteContentProvider } from "./context/SiteContent";

export default function App() {
  const isMobile = useIsMobile();

  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <SiteContentProvider>
            <Suspense>
              <Header />
              {props.children}
              <div class="relative">
                <Show when={!isMobile()} fallback={<MobileMenu />}>
                  <DesktopMenu />
                </Show>

                <Footer />
              </div>
            </Suspense>
            <ImgPreview />
          </SiteContentProvider>
        </MetaProvider>
      )}
      preload
    >
      <FileRoutes />
    </Router>
  );
}
