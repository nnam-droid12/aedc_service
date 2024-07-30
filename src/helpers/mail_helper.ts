import fs from 'fs';
import handlebars from 'handlebars';
import { USER_ROLE, UserDoc } from 'khufu-legos';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

import Logger from '../libs/logger.js';
import User from '../models/StaffModel/StaffModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FROM_EMAIL = process.env.FROM_EMAIL;
const FROM_NAME = process.env.FROM_NAME;
const SMTP_HOST = process.env.SMTP_HOST ?? '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT ?? '587', 10);
const SMTP_USER = process.env.SMTP_USER ?? '';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD ?? '';

type TriggerEmailParams<T> = {
  doc: T;
  roles: USER_ROLE[];
  template: string;
  subject: string;
};

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD
  }
});

export const sendMail = async <T>(data: TriggerEmailParams<T>, user: UserDoc) => {
  try {
    const emailData = {
      user,
      entity: data.doc,
      subject: data.subject,
      template: data.template,
      year: new Date().getFullYear()
    };

    const filePath = path.join(__dirname, `../email_templates/${emailData.template}`);
    const source = fs.readFileSync(filePath, 'utf-8');
    const emailTemplate = handlebars.compile(source);

    const message = {
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: user.email,
      subject: emailData.subject,
      html: emailTemplate(emailData)
    };
    await transporter.sendMail(message);
    return true;
  } catch (error) {
    Logger.error(error);
  }
};

export const triggerEmail = async <T>(document: TriggerEmailParams<T>) => {
  const users = await User.find({ role: { $in: document.roles } }).lean();
  for (const user of users) {
    await sendMail(document, user);
  }
  return true;
};