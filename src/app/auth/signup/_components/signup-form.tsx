"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import googleLogo from "@/app/img/google-logo.png";
import TooltipButton from "@/app/_components/tooltip-button";

export default function CreateAccountPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || name.length < 3) {
      setError("O nome deve ter pelo menos 3 caracteres.");
      return;
    }

    // Validação mais forte para o email
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    // Senha precisa de pelo menos 6 caracteres, um número, uma letra maiúscula e um caractere especial
    if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)) {
      setError("A senha deve ter pelo menos 6 caracteres, incluindo um número, uma letra maiúscula e um caractere especial.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        uid: user.uid,
      });

      router.push("/auth/signin");
    } catch (error: any) {
      // Captura de erro de segurança mais específico, como email já em uso
      if (error.code === "auth/email-already-in-use") {
        setError("Este email já está em uso. Tente outro.");
      } else if (error.code === "auth/weak-password") {
        setError("A senha fornecida é muito fraca. Use uma senha mais forte.");
      } else {
        setError(error.message || "Erro ao criar a conta.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/home");
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login com Google.");
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
            Criar conta
          </CardTitle>
          <CardDescription className="text-center text-[#173811]">
            Insira seus dados para criar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 w-full" onSubmit={handleCreateAccount}>
            <Input
              id="name"
              type="text"
              placeholder="Nome"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-muted-foreground focus:border-[#4eff33] p-5 focus:ring-2 focus:ring-[#4eff33] transition duration-200 ease-in-out"
            />
            <Input
              id="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-muted-foreground focus:border-[#4eff33] p-5 focus:ring-2 focus:ring-[#4eff33] transition duration-200 ease-in-out"
            />
            <Input
              id="password"
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-muted-foreground focus:border-[#4eff33] p-5 focus:ring-2 focus:ring-[#4eff33] transition duration-200 ease-in-out"
            />
            <Button
              type="submit"
              className="w-full bg-[#265e1b] hover:bg-[#265e1b]/90 text-white transition duration-200 ease-in-out"
            >
              Criar conta
            </Button>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#173811]"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-[#173811]">Ou entre usando</span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full border-muted-foreground text-muted-foreground flex items-center gap-2"
          >
            <Image src={googleLogo} alt="google" width={19} height={19} />
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 text-center text-muted-foreground text-sm">
          <p>
            Já tem uma conta?{" "}
            <a href="/auth/signin" className="text-[#2ECC71] hover:underline">
              Entre
            </a>
          </p>
          <p>
            Ao clicar em continuar, você concorda com nossos <span className="text-[#2ECC71] hover:underline">Termos de Serviço</span> e <span className="text-[#2ECC71] hover:underline">Política de Privacidade.</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}