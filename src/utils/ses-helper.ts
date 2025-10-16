import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { getGeneralConfig } from "../config";

export class AwsSesHelper {
  private transporter: nodemailer.Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: getGeneralConfig().awsSesHost,
      port: getGeneralConfig().awsSesPort,
      auth: {
        user: getGeneralConfig().awsSesUsername,
        pass: getGeneralConfig().awsSesPassword,
      },
      // tls: {
      //   rejectUnauthorized: false, // Bypass certificate validation
      // },
    });
  }

  async sendEmail(
    receiver: string,
    sender: string,
    html: string,
    subject: string
  ) {
    const mailOptions: Mail.Options = {
      from: sender,
      to: receiver,
      subject,
      html,
    };

    const data = await this.transporter.sendMail(mailOptions);
    return data;
  }
}
