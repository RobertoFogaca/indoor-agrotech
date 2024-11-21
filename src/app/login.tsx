"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Verifica se o token está presente na URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      const email = Buffer.from(token, "base64").toString("utf-8");
      // Aqui você pode validar o email ou criar uma sessão de login
      setIsAuthenticated(true);
      router.push("/home");  // Redireciona após a autenticação
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isAuthenticated ? (
        <p>Você está autenticado! Redirecionando...</p>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}