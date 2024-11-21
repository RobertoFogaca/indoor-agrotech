import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email é obrigatório' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: parseInt(process.env.MAILTRAP_PORT || '587'),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Sua Plataforma" <no-reply@sua-plataforma.com>',
      to: email,
      subject: 'Confirmação de Login',
      text: 'Você realizou login com sucesso em nossa plataforma!',
      html: '<p>Você realizou login com sucesso em nossa plataforma!</p>',
    });

    res.status(200).json({ message: 'Email enviado com sucesso' });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Erro ao enviar email' });
  }
}
