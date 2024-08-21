import Image from "next/image";
import indoorLogo from "./favicon.ico"
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const buttonData = [
    { id: 1, text: "Sobre nós" },
    { id: 2, text: "Nossos serviços" },
    { id: 3, text: "Contato" },
    { id: 4, text: "Planos" }
  ];
  
  return (
    <ScrollArea className="w-full h-full">
      <main className="flex flex-col w-full h-full bg-[#aedd9f] overflow-hidden">
        <header className="bg-[#0b4200] flex flex-row w-full h-full justify-between px-16 py-2 items-center text-muted">
          <nav className="flex flex-row w-full h-full items-center gap-4">
            <Image
              src={indoorLogo}
              width={55}
              height={55}
              alt="img"
            />
            <p className="font-bold">Indoor Agrotech</p>
          </nav>
          <nav className="flex flex-row gap-6">
            <div className="flex flex-row gap-3">
              {buttonData.map((button) => (
                <Button 
                  key={button.id}
                  variant={"ghost"}
                  className="hover:bg-transparent hover:underline hover:text-slate-100"
                >
                  {button.text}
                </Button>
              ))}
            </div>
            <div className="flex flex-row gap-3">
              <Button className="flex bg-white text-[#0b4200] p-4 hover:bg-white/80">
                Criar conta
              </Button>
              <Button variant={"outline"} className="flex bg-transparent p-4">
                Entrar
              </Button>
            </div>
          </nav>
        </header>
        <main className="flex flex-col w-full h-full justify-between">
          <div className="flex w-full h-[82vh] shadow-md shadow-[#aedd9f]">

          </div>
          <div className="flex flex-col items-center bg-slate-50 h-[60vh] w-full border-y-8 border-white">
            <div className="flex flex-col items-center">
              <h1 className="font-bold text-2xl">Sobre a Empresa</h1>
              <p className="text-muted-foreground">Conheça mais sobre a nossa historia e nossos valores.</p>
            </div>
          </div>
          <div className="flex flex-col h-60">

          </div>
        </main>
      </main>
      <footer className="flex flex-row justify-between h-20 px-10 bg-[#d2ff99] text-muted-foreground">
        <div className="flex flex-row items-center gap-4">
          <p className="text-2xl">©</p>
          <p>2024 Fatec Garça-sp</p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button className="hover:bg-transparent hover:underline" variant={"ghost"}>Politica de Privacidade</Button>
          <Button className="hover:bg-transparent hover:underline" variant={"ghost"}>Termos de uso</Button>
          <Button className="hover:bg-transparent hover:underline" variant={"ghost"}>Contato</Button>
        </div>
      </footer>
    </ScrollArea>
  )
}
