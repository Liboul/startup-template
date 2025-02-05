import { randomUUID } from 'crypto';
import { ServerClient, Message } from 'postmark';
import type { MessageSendingResponse } from 'postmark/dist/client/models/message/Message';

type EmailToSend = Omit<Message, 'From'> & { From?: Message['From'] };

export const sendEmail = (
  email: EmailToSend,
): Promise<MessageSendingResponse> => {
  if (process.env.NODE_ENV === 'production') {
    const serverToken = getServerToken();
    const client = new ServerClient(serverToken);
    const defaultFrom = getDefaultEmailFrom();

    return client.sendEmail({
      ...email,
      From: email.From ?? defaultFrom,
    });
  } else {
    console.log(`Did not send this email: ${JSON.stringify(email, null, 2)}`);
    return new Promise((resolve) => {
      resolve({
        To: 'fake-address@example.com',
        SubmittedAt: new Date().toISOString(),
        MessageID: randomUUID(),
        ErrorCode: 0,
        Message: 'OK',
      });
    });
  }
};

const getServerToken = () => {
  const serverToken = process.env.POSTMARK_SERVER_TOKEN;
  if (!serverToken) {
    throw new Error('POSTMARK_SERVER_TOKEN is not set');
  }
  return serverToken;
};

const getDefaultEmailFrom = () => {
  const defaultFrom = process.env.DEFAULT_EMAIL_FROM;
  if (!defaultFrom) {
    throw new Error('DEFAULT_EMAIL_FROM is not set');
  }
  return defaultFrom;
};
