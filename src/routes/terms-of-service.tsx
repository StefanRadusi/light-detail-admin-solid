import { createSignal } from "solid-js";
import { AnimatedCircle } from "~/components/decorations/AnimatedCircle";
import { Page } from "~/components/layout/Page";
import { Seo } from "~/components/seo/Seo";

export default function TermOfService() {
  const [divRef1, setDivRef1] = createSignal<HTMLDivElement | null>(null);

  return (
    <Page id="termsOfService">
      <Seo
        title="Terms of Service | Light Detail Studio"
        description="Terms of Service for Light Detail Studio. Read the terms governing the use of our interior design services."
        path="/terms-of-service"
      />
      <div class="flex relative overflow-hidden lg:px-60">
        <AnimatedCircle divRef={divRef1} options={{ threshold: 0.3 }} />
        <div
          ref={setDivRef1}
          class="flex flex-col px-6 m-auto flex-1 max-w-6xl py-8 lg:py-16 gap-3"
        >
          <h3 class="text-2xl">
            <strong>Terms of Service</strong>
          </h3>
          <p></p>
          <p>
            <strong>Introduction</strong>
          </p>
          <p></p>
          <p>
            Welcome to Light Detail. These Terms of Service
            (&ldquo;Terms&rdquo;) govern your use of our website and services.
            By accessing or using our website and services, you agree to be
            bound by these Terms.
          </p>
          <p></p>
          <p>
            <strong>Services</strong>
          </p>
          <p></p>
          <p>
            Light Detail provides interior design services, including
            consultations, design planning, and project management. Our services
            are designed to help you create aesthetically pleasing and
            functional spaces tailored to your needs.
          </p>
          <p></p>
          <p>
            <strong>Use of Services</strong>
          </p>
          <p></p>
          <p>
            You agree to use our services for lawful purposes only. You shall
            not use our services in any way that could harm Light Detail, our
            employees, or other clients.
          </p>
          <p></p>
          <p>
            <strong>Fees and Payments</strong>
          </p>
          <p></p>
          <p>
            Fees for our services will be agreed upon in a written contract
            before the commencement of any work. Payments are due as outlined in
            the contract. Late payments may incur additional charges.
          </p>
          <p></p>
          <p>
            <strong>Cancellation and Refund Policy</strong>
          </p>
          <p></p>
          <p>
            If you wish to cancel our services, you must provide written notice.
            Refunds will be provided based on the terms outlined in your
            contract. Certain fees may be non-refundable.
          </p>
          <p></p>
          <p>
            <strong>Intellectual Property</strong>
          </p>
          <p></p>
          <p>
            All content, including but not limited to designs, graphics, and
            text, provided by Light Detail is the property of Light Detail and
            is protected by copyright laws. You may not reproduce, distribute,
            or create derivative works from our content without our express
            written permission.
          </p>
          <p></p>
          <p>
            <strong>Confidentiality</strong>
          </p>
          <p></p>
          <p>
            We respect your privacy and are committed to protecting your
            personal information. We will not disclose your information to third
            parties without your consent, except as required by law.
          </p>
          <p></p>
          <p>
            <strong>Limitation of Liability</strong>
          </p>
          <p></p>
          <p>
            Light Detail is not liable for any direct, indirect, incidental, or
            consequential damages arising from the use of our services. Our
            liability is limited to the amount paid for the services provided.
          </p>
          <p></p>
          <p>
            <strong>Indemnification</strong>
          </p>
          <p></p>
          <p>
            You agree to indemnify and hold Light Detail harmless from any
            claims, losses, or damages arising from your use of our services or
            your violation of these Terms.
          </p>
          <p></p>
          <p>
            <strong>Governing Law</strong>
          </p>
          <p></p>
          <p>
            These Terms are governed by the laws of Romania. Any disputes
            arising from these Terms or our services will be resolved in the
            courts of Romania.
          </p>
          <p></p>
          <p>
            <strong>Changes to Terms</strong>
          </p>
          <p></p>
          <p>
            We reserve the right to modify these Terms at any time. Any changes
            will be effective immediately upon posting on our website. Your
            continued use of our services constitutes your acceptance of the
            modified Terms.
          </p>
          <p></p>
          <p>
            <strong>Contact Form and Data Collection</strong>
          </p>
          <p></p>
          <p>
            When you fill out our contact form, we collect the personal
            information you provide, including your name, email address, and any
            other details you choose to include. This information is used solely
            for the purpose of responding to your inquiries and providing you
            with information about our services. We will not share your personal
            information with third parties without your consent, except as
            required by law.
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
