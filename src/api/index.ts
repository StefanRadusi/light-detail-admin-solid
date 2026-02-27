"use server";

import { Resend } from "resend";

// Server-only module ("use server") – we can rely solely on process.env
// Add a lightweight accessor mainly to enable an inline warning.
const env = (key: string): string | undefined => process.env[key];

const resendApiKey = env("RESEND_API_KEY");
if (!resendApiKey) {
  console.warn(
    "[sendEmail] Missing RESEND_API_KEY env variable – emails will fail."
  );
}
const resend = new Resend(resendApiKey);

import { SendEmailParams, SendEmailResponse } from "./types";

export const sendEmail = async (
  payload: SendEmailParams
): Promise<SendEmailResponse> => {
  console.log(payload);
  // Basic HTML escape to avoid injection in the email body.
  const escape = (v: string) =>
    v
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const { name, email, subject, content } = payload;
  const receivedAt = new Date().toISOString();
  const BRAND = {
    name: "Light Detail",
    accent: "#D8983B", // pulled from design (gold / orange accent)
    dark: "#111111",
    text: "#333333",
    muted: "#555555",
  };

  const internalRecipients = (env("CONTACT_TO") || "radusi.stefan@gmail.com")
    .split(/[;,]/)
    .map((s: string) => s.trim())
    .filter(Boolean);
  if (!env("CONTACT_TO")) {
    console.warn("[sendEmail] CONTACT_TO not set – using fallback recipient.");
  }

  const html = `
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden">
      <thead>
        <tr>
          <th style="background:#111;color:#fff;padding:16px;text-align:left;font-size:18px">New Contact Form Submission</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:16px">
            <p style="margin:0 0 8px;font-size:14px;color:#555">You received a new message via the website contact form.</p>
            <table cellpadding="0" cellspacing="0" style="font-size:14px;color:#333;margin:16px 0;width:100%">
              <tr>
                <td style="font-weight:600;padding:4px 8px;width:120px;background:#fafafa;border:1px solid #eee">Name</td>
                <td style="padding:4px 8px;border:1px solid #eee">${escape(
                  name
                )}</td>
              </tr>
              <tr>
                <td style="font-weight:600;padding:4px 8px;background:#fafafa;border:1px solid #eee">Email</td>
                <td style="padding:4px 8px;border:1px solid #eee"><a href="mailto:${escape(
                  email
                )}" style="color:#0a58ca;text-decoration:none">${escape(
    email
  )}</a></td>
              </tr>
              <tr>
                <td style="font-weight:600;padding:4px 8px;background:#fafafa;border:1px solid #eee">Subject</td>
                <td style="padding:4px 8px;border:1px solid #eee">${escape(
                  subject
                )}</td>
              </tr>
              <tr>
                <td style="font-weight:600;padding:4px 8px;background:#fafafa;border:1px solid #eee;vertical-align:top">Message</td>
                <td style="padding:8px;border:1px solid #eee;white-space:pre-wrap;font-family:inherit">${escape(
                  content
                )}</td>
              </tr>
              <tr>
                <td style="font-weight:600;padding:4px 8px;background:#fafafa;border:1px solid #eee">Received</td>
                <td style="padding:4px 8px;border:1px solid #eee">${receivedAt}</td>
              </tr>
            </table>
            <p style="font-size:12px;color:#999;margin-top:24px">This email was generated automatically.</p>
          </td>
        </tr>
      </tbody>
    </table>
  `;

  // Confirmation email for the user (if they provided an email)
  const userHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:'Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;max-width:640px;margin:0 auto;border:1px solid #eee;border-radius:16px;overflow:hidden;background:#ffffff">
      <thead>
        <tr>
          <th style="background:${
            BRAND.dark
          };padding:28px 24px;text-align:left">
            <div style="font-size:22px;line-height:1.2;font-weight:700;color:#fff;margin:0;">
              <span style="color:${
                BRAND.accent
              }">Thank you</span> for reaching out
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:24px 24px 8px;font-size:15px;line-height:1.55;color:${
            BRAND.text
          }">
            Hi ${escape(name || "there")},<br/><br/>
            We’ve received your message and a member of the <strong>${
              BRAND.name
            }</strong> team will get back to you shortly.<br/>
            Below is a copy for your records:
          </td>
        </tr>
        <tr>
          <td style="padding:8px 24px 16px">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;color:${
              BRAND.text
            }">
              <tr>
                <td style="padding:6px 10px;font-weight:600;background:#fafafa;border:1px solid #eee;width:120px">Subject</td>
                <td style="padding:6px 10px;border:1px solid #eee">${escape(
                  subject
                )}</td>
              </tr>
              <tr>
                <td style="padding:6px 10px;font-weight:600;background:#fafafa;border:1px solid #eee;vertical-align:top">Message</td>
                <td style="padding:10px;border:1px solid #eee;white-space:pre-wrap">${escape(
                  content
                )}</td>
              </tr>
              <tr>
                <td style="padding:6px 10px;font-weight:600;background:#fafafa;border:1px solid #eee">Time</td>
                <td style="padding:6px 10px;border:1px solid #eee">${receivedAt}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 24px 0;font-size:15px;line-height:1.55;color:${
            BRAND.text
          }">
            While you wait, you can explore:
          </td>
        </tr>
        <tr>
          <td style="padding:12px 24px 8px">
            <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px">
              <tr>
                <td style="width:33.33%;padding:6px 4px;text-align:center">
                  <a href="https://lightdetail.eu/services" style="display:block;padding:14px 10px;text-decoration:none;border:1px solid #eee;border-radius:10px;font-weight:600;color:${
                    BRAND.dark
                  }">Services</a>
                </td>
                <td style="width:33.33%;padding:6px 4px;text-align:center">
                  <a href="https://lightdetail.eu/interior-design" style="display:block;padding:14px 10px;text-decoration:none;border:1px solid #eee;border-radius:10px;font-weight:600;color:${
                    BRAND.dark
                  }">Interior Design</a>
                </td>
                <td style="width:33.33%;padding:6px 4px;text-align:center">
                  <a href="https://lightdetail.eu/visualization" style="display:block;padding:14px 10px;text-decoration:none;border:1px solid #eee;border-radius:10px;font-weight:600;color:${
                    BRAND.dark
                  }">Visualization</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 24px 32px;font-size:13px;line-height:1.5;color:${
            BRAND.muted
          };border-top:1px solid #f1f1f1">
            Warm regards,<br/>
            The <strong style="color:${BRAND.dark}">${
    BRAND.name
  }</strong> Team<br/><br/>
            <span style="font-size:11px;color:#999">If you didn't submit this form, you can ignore this email.</span>
          </td>
        </tr>
      </tbody>
    </table>
  `;

  const userText = `Hi ${
    name || "there"
  },\n\nWe received your message and will reply shortly.\n\nSubject: ${subject}\nMessage:\n${content}\nSent at: ${receivedAt}\n\n${
    BRAND.name
  } Team`;

  try {
    // Send internal and user confirmation (if user email provided & looks valid)
    const tasks: Promise<any>[] = [];
    tasks.push(
      resend.emails.send({
        from: `${BRAND.name} Website <notification@contact.lightdetail.eu>`,
        to: internalRecipients,
        subject: subject?.trim()
          ? `[Contact] ${subject.trim()}`
          : "New Message from Contact Form",
        html,
        text: `New contact form submission\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${content}\nReceived: ${receivedAt}`,
      })
    );

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && emailRegex.test(email)) {
      tasks.push(
        resend.emails.send({
          from: `${BRAND.name} <no-reply@contact.lightdetail.eu>`,
          // send a confirmation to the user
          to: email,
          subject: `${BRAND.name} – We've received your message`,
          html: userHtml,
          text: userText,
        })
      );
    }

    await Promise.all(tasks);
    return { msg: "Emails sent" };
  } catch (err) {
    console.error("Failed to send email(s)", err);
    return { msg: "Failed to send email" };
  }
};
