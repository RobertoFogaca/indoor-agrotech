import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prismadb";
import nodemailer from "nodemailer";

interface props{
  session: any
  user: any
}

// Configuração do Mailtrap
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// Configuração de autenticação
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
      },
      from: "noreply@example.com",
      async generateVerificationToken() {
        // Gera um token de verificação customizado (opcional)
        const randomToken = Math.random().toString(36).substr(2, 10);
        return randomToken;
      },
      async sendVerificationRequest({ identifier, url }) {
        // Configuração personalizada para o e-mail de Magic Link
        try {
          await transporter.sendMail({
            from: "noreply@example.com",
            to: identifier, // O e-mail do usuário
            subject: "Seu link de login",
            text: `Olá! Você solicitou acesso ao sistema. Clique no link abaixo para entrar:\n\n${url}\n\nSe você não solicitou isso, ignore este e-mail.`,
            html: `<p>Olá! Você solicitou acesso ao sistema. Clique no link abaixo para entrar:</p><p><a href="${url}">${url}</a></p><p>Se você não solicitou isso, ignore este e-mail.</p>`,
          });
          console.log(`E-mail enviado para ${identifier}`);
        } catch (error) {
          console.error("Erro ao enviar e-mail de Magic Link:", error);
          throw new Error("Erro ao enviar e-mail de verificação.");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: props) {
      // Adiciona o ID do usuário na sessão
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Página de login personalizada
    verifyRequest: "/auth/verify-request", // Página de verificação
  },
  secret: process.env.NEXTAUTH_SECRET, // Certifique-se de configurar o NEXTAUTH_SECRET no .env
};

export default NextAuth(authOptions);
