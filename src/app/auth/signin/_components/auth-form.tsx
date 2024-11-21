"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import googleLogo from "@/app/img/google-logo.png";
import Image from "next/image";
import TooltipButton from "@/app/_components/tooltip-button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações básicas de email e senha
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuário logado:", userCredential.user);
      router.push("/home"); // Redireciona para a página inicial
    } catch (err: any) {
      setError("Credenciais inválidas. Tente novamente.");
      setSuccess(null); // Limpa a mensagem de sucesso caso exista
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      router.push("/home");
    } catch (err: any) {
      setError("Erro ao fazer login com Google.");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Por favor, insira um email para redefinir a senha.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("E-mail para redefinição de senha enviado com sucesso!");
      setError(null); // Limpa a mensagem de erro caso exista
    } catch (err: any) {
      setError("Erro ao enviar e-mail de redefinição de senha.");
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ebffd2] to-[#f0ffdd] p-4">
      <Card className="w-full max-w-md bg-white relative">
        <TooltipButton
          tooltipText="Voltar"
          link="/"
          variant="ghost"
          size="icon"
          className="absolute m-[1.2rem]"
        >
          <span className="material-symbols-rounded !text-muted-foreground">arrow_back</span>
        </TooltipButton>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[#429b30]">
            Entrar na conta
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Digite seu e-mail e senha para entrar na sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col w-full items-center">
            <form className="space-y-4 w-full" onSubmit={handleLogin}>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                required
                aria-label="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-muted-foreground focus:border-[#4eff33] p-5 focus:ring-2 focus:ring-[#4eff33] transition duration-200 ease-in-out"
              />
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                required
                aria-label="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-muted-foreground focus:border-[#4eff33] p-5 focus:ring-2 focus:ring-[#4eff33] transition duration-200 ease-in-out"
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#265e1b] hover:bg-[#265e1b]/90 text-white transition duration-200 ease-in-out"
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            <Button
              variant="link"
              onClick={handlePasswordReset}
              className="text-[#2ECC71] hover:underline"
            >
              Esqueci minha senha
            </Button>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {success && <p className="text-green-500 text-center mt-4">{success}</p>}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted-foreground"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Ou entre usando</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full border-muted-foreground text-muted-foreground gap-2 hover:bg-[#1a73e81a] hover:border-[#1a73e8] hover:text-[#1a73e8] hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <Image src={googleLogo} alt="Google" width={19} height={19} />
              <p>Google</p>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 text-center text-muted-foreground text-sm">
          <p>
            Ainda não tem uma conta?{" "}
            <Link href="/auth/signup" className="text-[#2ECC71] hover:underline">
              Crie uma
            </Link>
          </p>
          <p>
            Ao clicar em continuar, você concorda com nossos <span className="text-[#2ECC71] hover:underline">Termos de Serviço</span> e <span className="text-[#2ECC71] hover:underline">Política de Privacidade.</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
