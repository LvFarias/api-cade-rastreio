import { Inject, Injectable } from '@nestjs/common';
import { ApiClient, ContactsApi, CreateContact, SendSmtpEmail, SendSmtpEmailBcc, SendSmtpEmailTo, TransactionalEmailsApi } from 'sib-api-v3-sdk';
import { Logger } from 'winston';

@Injectable()
export class EmailService {

    private defaultClient = ApiClient.instance;
    private apiKey = this.defaultClient.authentications['api-key'];
    private emailBcc = new SendSmtpEmailBcc(process.env.EMAIL_CONTACT);

    constructor(@Inject('winston') private logger: Logger) {
        this.apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
    }

    private transactionalApi(): TransactionalEmailsApi {
        return new TransactionalEmailsApi();
    }

    private contactsApi(): ContactsApi {
        return new ContactsApi();
    }

    private createContactParams(contact: any): CreateContact {
        const name = contact.name.split(' ')[0];
        return new CreateContact.constructFromObject({
            email: contact.email,
            attributes: {
                NAME: name,
                LAST_NAME: contact.name.split(`${name} `)[1],
            },
            updateEnabled: false,
            emailBlacklisted: false,
        });
    }

    private async createContact(email: String, name: String): Promise<Boolean> {
        return new Promise((res, rej) => {
            if (process.env.NODE_ENV === 'dev') {
                this.logger.debug('Email-Mock [createContact] called with data: ', { email, name });
                return res(true);
            }
            const contactParams = this.createContactParams({ email, name })

            this.contactsApi().createContact(contactParams).then((data: any) => {
                this.logger.debug('Email-API [createContact] called. Return data: ', data);
                res(true);
            }, (error: any) => {
                this.logger.error(error);
                rej(false);
            });
        });
    }

    private createEmail(templateId: Number, to: String, params: any): SendSmtpEmail {
        const emailTo = new SendSmtpEmailTo(to);

        return new SendSmtpEmail.constructFromObject({
            params,
            templateId,
            to: [emailTo],
            bcc: [this.emailBcc]
        });
    }

    private async sendEmail(templateId: Number, to: String, params: any = {}) {
        return new Promise((res, rej) => {
            if (process.env.NODE_ENV === 'dev') {
                this.logger.debug('Email-Mock [sendTransacEmail] called with data: ', { to, ...params });
                return res(true);
            }
            this.transactionalApi().sendTransacEmail(this.createEmail(templateId, to, params)).then((data: any) => {
                this.logger.debug('Email-API [sendTransacEmail] called. Return data: ', data);
                res(data);
            }, (error: any) => {
                this.logger.error(error);
                rej(error);
            });
        });
    }

    async welcome(email: String, userName: String): Promise<any> {
        await this.createContact(email, userName);
        return this.sendEmail(1, email);
    }

    async forgotPassword(email: String, token: String): Promise<any> {
        const link = `${process.env.APP_URL}/change-password?token=${token}`;
        return this.sendEmail(2, email, { link });
    }
}
