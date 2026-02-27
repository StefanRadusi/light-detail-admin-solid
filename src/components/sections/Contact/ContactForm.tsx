import { sendEmail } from "~/api";
import { SendEmailParams, SendEmailResponse } from "~/api/types";
import { Form } from "~/components/form";
import { useForm } from "~/components/form/signals";
import { SubmitButton } from "~/components/form/submit-button";
import { TextArea } from "~/components/form/text-area";
import { TextField } from "~/components/form/text-field";
import { isEmail, isRequired } from "~/components/form/validations";

export const ContactForm = () => {
  const form = useForm();

  return (
    <div class="mb-20">
      <Form {...form.submit<SendEmailParams, SendEmailResponse>(sendEmail)}>
        <TextField
          label="Name"
          {...form.register("name", isRequired, "required")}
        />
        <TextField
          label="Email"
          {...form.register("email", isEmail, "invalid email")}
        />
        <TextField
          label="Subject"
          {...form.register("subject", isRequired, "required")}
        />
        <TextArea
          label="Message"
          {...form.register("content", isRequired, "required")}
        />
        <SubmitButton />
      </Form>
    </div>
  );
};
