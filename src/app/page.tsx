"use client"
import Image from "next/image";
import indoorLogo from "./favicon.ico";


import muieDasPranta from "./img/muie-das-pranta.png";
import bgFundo from "./img/bg-image-plans.png"
import CardCorporate from "./_components/card-about-us";
import plants from "./img/prantacao.png";
import farm from "./img/guys-at-farm.png";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { smoothScrollToId } from "@/utils/btnScroll";
import CardPlans from "./_components/card-plans";
import { Description } from "@radix-ui/react-toast";
import { useState } from "react";
import { useCallback, useEffect } from "react";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3, // Exibe 3 slides por vez por padrão
      spacing: 15, // Espaço entre os slides
    },
    breakpoints: {
      "(max-width: 768px)": { // Define o comportamento para telas menores que 768px
        slides: {
          perView: 1, // Exibe 1 slide por vez em telas menores
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel); // Atualiza o slide ativo
    },
  });
    // Navegação para o próximo e o slide anterior
    const handlePrev = () => {
      if (instanceRef.current) instanceRef.current.prev();
    };
  
    const handleNext = () => {
      if (instanceRef.current) instanceRef.current.next();
    };

    useEffect(() => {
      const interval = setInterval(() => {
        if (instanceRef.current) {
          const nextSlide = (currentSlide + 1) % instanceRef.current.track.details.slides.length;
          instanceRef.current.moveToIdx(nextSlide);
        }
      }, 4000); // Troca os slides a cada 3 segundos
    
      return () => clearInterval(interval);
    }, [currentSlide, instanceRef]);

  const buttonData = [
    { id: 1, text: "Sobre nós", redirect: "sobre-nos" },
    { id: 2, text: "Nossos serviços" },
    { id: 3, text: "Contato" },
    { id: 4, text: "Nossos Planos", redirect: "nossos-planos" }
  ]
  const cardsData = [
    { id: 1, icon: "corporate_fare", title: "A empresa", description: "Nós somos uma empresa voltada a ajudar aqueles que querem ter sua plantação pessoal ou para uma possível nova fonte de renda ter mais controle de sua safra." },
    { id: 2, icon: "code", title: "Desenvolvimento", description: "Nossos sistemas são desenvolvidos planejado para o seu melhor manejo de plantações e possíveis pragas, usando uma inteligência artificial para fiscalizar as suas plantações." },
    { id: 3, icon: "headset_mic", title: "Suporte", description: "Nosso time de suporte está sempre pronto para ajudá-lo com qualquer dúvida ou problema que você possa ter." }
  ]
  const plansData = [
    {id: 1, title: "Básico", description: `Uma conta vinculada \n Funcionalidades básicas`},
    {id: 2, title: "Profissional", description: `Até 3 contas vinculadas \n Recurso TimeBloc`},
    {id: 3, title: "Pro Plus", description: `Recursos ilimitados de contas vinculadas \n TimeBloc e SmartAssist`}
  ]
  const missonData = [
    {id: 1, title: "Praticidade", Description: "Queremos facilitar sua seu manejo de plantações na sua vida pessoal ou no seu negocio", image: plants},
    {id: 2, title: "Conhecimento", Description: "Com a nossa empresa você não terá que entender 100% de plantações, iremos ajuda-lo com isso!", image: farm},
    {id: 3, title: "Controle", Description: "tenha na palma da sua mão resultados sobre sua mini lavoura.", image: muieDasPranta},
  ]
  const motives = [
    {icon: "check_circle", title: "Muitos aplicativos disputando sua atenção", description: "Incididunt voluptate adipisicing ullamco excepteur Lorem irure est proident labore. Do quis elit culpa ipsum nulla laboris minim aliqua voluptate aute Lorem."},
    {icon: "check_circle", title: "Muitos aplicativos disputando sua atenção", description: "Incididunt voluptate adipisicing ullamco excepteur Lorem irure est proident labore. Do quis elit culpa ipsum nulla laboris minim aliqua voluptate aute Lorem."},
    {icon: "check_circle", title: "Muitos aplicativos disputando sua atenção", description: "Incididunt voluptate adipisicing ullamco excepteur Lorem irure est proident labore. Do quis elit culpa ipsum nulla laboris minim aliqua voluptate aute Lorem."},
  ];

  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="flex flex-col w-full h-full bg-[#aedd9f] overflow-hidden z-10">
      <header className="h-[4.5rem] sticky flex flex-row justify-between z-20 items-center text-muted">
        <div className="bg-[#0b4200] fixed flex flex-row justify-between items-center w-full h-[4.5rem] px-10 shadow-2xl">
        <nav className="flex flex-row w-full h-full items-center gap-4">
      <Image src={indoorLogo} width={55} height={55} alt="img" />
      <div className="overflow-hidden">
        <p className="md:block hidden font-bold">Indoor Agrotech</p> {/* Para telas maiores */}
      </div>
    </nav>

    <div className="md:hidden">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {isOpen ? (
          <span className="material-symbols-rounded">close</span>
        ) : (
          <span className="material-symbols-rounded">menu</span>
        )}
      </button>
    </div>
          <nav
            className={`${
              isOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row items-center gap-6 md:gap-3 w-full md:w-auto bg-[#0b4200]/90  md:bg-transparent md:static fixed top-[4.5rem] left-0 right-0 p-4 md:p-0`}
          >
            <div className="flex flex-col md:flex-row gap-0.5 py-1 px-1.5 lg:px-3 lg:py-1 lg:gap-3 ">
              {buttonData.map((button) => (
                <Button
                  key={button.id}
                  variant={"ghost"}
                  className="hover:bg-transparent hover:underline md:text-sm hover:text-slate-100"
                  onClick={() => {
                    smoothScrollToId(`${button.redirect}`);
                    setIsOpen(false); // Fecha o menu ao clicar
                  }}
                >
                  {button.text}
                </Button>
              ))}
            </div>
            <div className="flex h-full w-full flex-col md:flex-row gap-3 mt-6 md:mt-0">
              <Button className="flex bg-white text-[#0b4200] p-2 md:p-4 hover:bg-white/80">
                Criar conta
              </Button>
              <Button variant={"outline"} className="flex bg-transparent hover:bg-white/40 hover:border-white/45 p-2 md:p-4">
                Entrar
              </Button>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex flex-col w-full h-full justify-between">
        <div className="flex justify-between flex-col md:flex-row w-full xl:h-[87vh] h-full shadow-md items-center">
          <div className="md:m-12 w-full md:size-[45%] m-5 lg:size-full items-center justify-center flex flex-col md:items-start gap-5">
            <div className="gap-2 flex flex-col text-center md:text-start m-4">
              <h1 className="text-3xl font-bold">
                Bem vindo a Indoor Agrotech
              </h1>
              <p className="text-muted-foreground w-full md:w-[20rem] lg:w-[40rem]">
                Somos uma empresa especializada em soluções inovadoras para nossos clientes. Há mais de 20 anos no mercado, oferecemos serviços de alta qualidade e atendimento personalizado.
              </p>
            </div>
            <div className="ml-0 md:ml-6 flex flex-row gap-4">
              <Button
               variant={"secondary"}
               onClick={() => smoothScrollToId('nossos-planos')}
               >
                Veja nossos planos
              </Button>
              <Button
                onClick={() => smoothScrollToId('sobre-nos')}
                className="bg-[#0b4200] hover:bg-[#173811] border-none">
                Sobre nós
              </Button>
            </div>
          </div>
          <div className="shadow-2xl size-full">
            <Image
              src={muieDasPranta}
              alt="img"
              height={1000}
              width={900}
            />
          </div>
        </div>
        <div className="h-full md:h-screen w-full">
          <div className="w-full h-full flex flex-col p-6 md:p-10 lg:p-12 items-center gap-5 justify-center text-white z-10 bg-[#051203]">
            <h1 className="text-muted text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-extrabold">
              A perda de tempo é uma epidemia. Estamos aqui para erradicá-la.
            </h1>
            
            <div className="flex flex-col sm:flex-row text-center justify-start h-full gap-6">
              {motives.map((motive, index) => (
                <div key={index} className="flex flex-col items-center justify-center p-4 sm:p-6">
                  <span className="material-symbols-rounded ative text-[#4eff33] text-4xl sm:text-5xl md:text-6xl">
                    {motive.icon}
                  </span>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold mt-2">{motive.title}</h1>
                  <p className="text-[#4eff33] text-sm font-light sm:text-base md:text-lg">{motive.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      <div id="sobre-nos" className="flex flex-col items-center bg-[#ebffd2] h-[60vh] w-full border-y-8 border-[#f0ffdd] z-10 shadow-md gap-3">
        <div className="flex flex-col items-center h-full w-full">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-xl lg:text-3xl">Sobre a Empresa</h1>
            <p className="text-muted-foreground text-base lg:text-xl">
              Conheça mais sobre a nossa história e nossos valores.
            </p>
          </div>
          <div className="relative w-full h-full">
            <div ref={sliderRef} className="keen-slider flex h-full w-full justify-center items-center">
            {cardsData.map((card, idx) => {
                    const centralSlide = (currentSlide + 1) % cardsData.length;
                    return (
                      <div
                        key={card.id}
                        className={`keen-slider__slide h-full w-full flex items-center justify-center transition-opacity duration-300 ${
                          idx === centralSlide
                            ? "opacity-100 scale-110" // Destaque apenas no slide central
                            : "opacity-50 scale-90" // Menor opacidade e escala nos slides laterais
                        }`}
                      >
                        <CardCorporate
                          title={card.title}
                          description={card.description}
                          icon={card.icon}
                        />
                      </div>
                    );
                  })}
            </div>
            {/* Botões de navegação */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <Button variant="ghost" onClick={handlePrev}>
                <span className="material-symbols-rounded text-4xl">arrow_back</span>
              </Button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <Button variant="ghost" onClick={handleNext}>
                <span className="material-symbols-rounded text-4xl">arrow_forward</span>
              </Button>
            </div>
          </div>
        </div>
          </div>
          <div id="nossos-planos" className="relative w-full h-full md:h-[80vh] overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                alt="bg"
                src={bgFundo}
                layout="fill" // Faz a imagem cobrir toda a área do container
                objectFit="cover" // Ajusta a imagem para cobrir o container sem distorção
                className="brightness-[.3]" // Ajuste o brilho da imagem
              />
            </div>
            <div className="relative w-full min-h-screen border-b-4 border-[#f0ffdd]">
              <div className="flex flex-col items-center py-10 gap-3 w-full text-center bg-[#102b0a]">
                <h1 className="text-muted font-bold text-3xl sm:text-4xl">Opções de planos</h1>
                <p className="text-muted-foreground text-lg sm:text-xl">
                  Com planos acessíveis e flexíveis, você pode ter nossa IA como quiser.
                </p>
              </div>
              <div className="flex flex-col md:flex-row w-full justify-center items-center gap-8 px-6 md:px-10 py-10">
                {plansData.map((plans) => (
                  <CardPlans
                    key={plans.id}
                    title={plans.title}
                    description={plans.description}
                    buttonTitle="Escolher Plano"
                  />
                ))}
              </div>
            </div>
          </div>  
          <div className="flex h-full my-4 px-3 w-full flex-col gap-3">
            <div className="w-full flex flex-col items-center">
              <h1 className="font-black text-2xl">Nossa Missão</h1>
              <p className="text-muted-foreground text-center">Entenda melhor sobre nós e oque queremos oferecer</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {missonData.map((mission) =>{
                return(
                    <div className="grid grid-cols-2 gap-5 w-full h-full ">
                      <span className="w-full h-full overflow-hidden">
                      <Image
                        src={mission.image}
                        height={1000}
                        width={10000}
                        alt="Serviço 1"
                        className="rounded w-full h-full"
                      />
                      </span>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{mission.title}</h3>
                        <p className="text-muted-foreground">{mission.Description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
          </div>
        </main>
      <footer className="flex flex-col md:flex-row py-5 justify-center md:justify-between h-full md:h-20 px-10 bg-[#d2ff99] text-muted-foreground">
        <div className="flex flex-row justify-center items-center gap-3">
          <p className="text-2xl">©</p>
          <p>2024 Fatec Garça-sp</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Button className="hover:bg-transparent hover:underline" variant={"ghost"}>Política de Privacidade</Button>
          <Button className="hover:bg-transparent hover:underline" variant={"ghost"}>Termos de uso</Button>
          <Button className="hover:bg-transparent hover:underline" variant={"ghost"}>Contato</Button>
        </div>
      </footer>
    </main>
  )
}
