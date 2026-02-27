import { createSignal } from "solid-js";
import { AnimatedCircle } from "~/components/decorations/AnimatedCircle";
import { Page } from "~/components/layout/Page";
import { Seo } from "~/components/seo/Seo";

export default function PrivacyPolicy() {
  const [divRef1, setDivRef1] = createSignal<HTMLDivElement | null>(null);

  return (
    <Page id="privacyPolicy">
      <Seo
        title="Privacy Policy | Light Detail Studio"
        description="Privacy Policy for Light Detail Studio. Learn how we collect, use, and protect your personal information."
        path="/privacy-policy"
      />
      <div class="flex relative overflow-hidden lg:px-60">
        <AnimatedCircle divRef={divRef1} options={{ threshold: 0.3 }} />
        <div
          ref={setDivRef1}
          class="flex flex-col px-6 m-auto flex-1 max-w-6xl py-8 lg:py-16 gap-3"
        >
          <h3 class="text-2xl">
            <strong>Privacy Policy</strong>
          </h3>
          <p></p>
          <p></p>
          <p>
            <strong>Introduction</strong>
          </p>
          <p></p>
          <p>
            Welcome to Light Detail. We are committed to protecting your privacy
            and ensuring that your personal information is handled in a safe and
            responsible manner. This Privacy Policy outlines how we collect,
            use, and protect your information when you use our contact form.
          </p>
          <p></p>
          <p>
            <strong>Information We Collect</strong>
          </p>
          <p></p>
          <p>
            When you use our contact form, we collect the following personal
            information:
          </p>
          <p></p>
          <p>
            &bull;<strong>Name</strong>: To address you properly in our
            communications.
          </p>
          <p>
            &bull;<strong>Email Address</strong>: To respond to your inquiries.
          </p>
          <p>
            &bull;<strong>Phone Number</strong>: (If provided) To contact you
            regarding your inquiries.
          </p>
          <p>
            &bull;<strong>Message Content</strong>: Any information you choose
            to include in your message to us.
          </p>
          <p></p>
          <p>
            <strong>Use of Information</strong>
          </p>
          <p></p>
          <p>
            The information collected through our contact form is used solely
            for the following purposes:
          </p>
          <p></p>
          <p>
            &bull;To respond to your inquiries and provide information about our
            services.
          </p>
          <p>
            &bull;To improve our website and services based on your feedback.
          </p>
          <p></p>
          <p>
            <strong>Data Sharing and Disclosure</strong>
          </p>
          <p></p>
          <p>
            We do not share, sell, or rent your personal information to third
            parties. Your information may only be disclosed under the following
            circumstances:
          </p>
          <p></p>
          <p>&bull;With your explicit consent.</p>
          <p>
            &bull;As required by law, such as to comply with a subpoena or
            similar legal process.
          </p>
          <p></p>
          <p>
            <strong>Data Security</strong>
          </p>
          <p></p>
          <p>
            We take the security of your personal information seriously. We
            implement appropriate technical and organizational measures to
            protect your information from unauthorized access, disclosure,
            alteration, or destruction.
          </p>
          <p></p>
          <p>
            <strong>Data Retention</strong>
          </p>
          <p></p>
          <p>
            We will retain your personal information only for as long as
            necessary to fulfill the purposes for which it was collected and to
            comply with legal obligations.
          </p>
          <p></p>
          <p>
            <strong>Your Rights</strong>
          </p>
          <p></p>
          <p>
            You have the following rights regarding your personal information:
          </p>
          <p></p>
          <p>
            &bull;<strong>Access</strong>: You have the right to request a copy
            of the personal information we hold about you.
          </p>
          <p>
            &bull;<strong>Correction</strong>: You have the right to request
            that we correct any inaccuracies in your personal information.
          </p>
          <p>
            &bull;<strong>Deletion</strong>: You have the right to request that
            we delete your personal information, subject to certain legal
            restrictions.
          </p>
          <p></p>
          <p>
            <strong>Changes to This Privacy Policy</strong>
          </p>
          <p></p>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated revision date. Your
            continued use of our website and services constitutes your
            acceptance of the updated Privacy Policy.
          </p>
          <p>
            <strong>Contact Us</strong>
          </p>
          <p></p>
          <p>
            If you have any questions or concerns about these Terms, please
            contact us at:
          </p>
          <p></p>
          <p>Light Detail</p>
          <p>Address: Ludwing van Beethoven, nr.29a</p>
          <p>City: Cluj-Napoca, Romania</p>
          <p>Email: bianca.cimpean@lightdetail.eu</p>
          <p>Tel: +40740488935 / +40751195354</p>
          <p></p>
          <p>
            By using our services, you acknowledge that you have read,
            understood, and agree to be bound by these Terms of Service. Thank
            you for choosing Light Detail for your interior design needs.
          </p>
        </div>
      </div>
    </Page>
  );
}
