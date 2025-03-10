import * as nodemailer from 'nodemailer';
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'elmore.swaniawski@ethereal.email',
                pass: '2XXVYGZDsJywxKuUhQ'
            }
        });
    }

    async sendPasswordResetEmail(to: string, token: string) {
        const resetLink = `http://yourapp.com/reset-password?token=${token}`;
        const mailOptions = {
            from: 'Address Clothing <support@addressclothing.com>',
            to,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please click the following link to reset your password: <a href="${resetLink}">Reset Password</a>`
        }

        await this.transporter.sendMail(mailOptions);
    }
}