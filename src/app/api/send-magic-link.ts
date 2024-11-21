import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";

// Configurações do Mailtrap
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USER,  // Substitua com suas credenciais do Mailtrap
    pass: process.env.MAILTRAP_PASS,  // Substitua com suas credenciais do Mailtrap
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body;

    // Gerar magic link (em um caso real, seria algo mais seguro)
    const magicLink = `http://localhost:3000/login?token=${Buffer.from(email).toString('base64')}`;

    // Configuração do email
    const mailOptions = {
      from: "no-reply@yourapp.com", // Seu e-mail
      to: email,
      subject: "Seu Magic Link",
      text: `Clique no link abaixo para acessar sua conta:\n\n${magicLink}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Erro ao enviar o email: ", error);
      return res.status(500).json({ error: "Erro ao enviar o magic link." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
