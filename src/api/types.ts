export type SendEmailParams = {
  name: string;
  email: string;
  subject: string;
  content: string;
};

export type SendEmailResponse = { msg: string };
