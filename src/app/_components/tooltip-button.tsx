// components/TooltipButton.tsx

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';

type ButtonVariant = "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
type ButtonSize = "default" | "sm" | "lg" | "icon"; // Defina os tamanhos que você quer permitir

interface TooltipButtonProps {
  tooltipText: string; // Texto obrigatório do tooltip
  variant?: ButtonVariant; // Variant opcional do botão
  size?: ButtonSize; // Tamanho opcional do botão
  children: React.ReactNode; // Aceita texto ou ícone como filhos
  className?: string; // ClassName opcional para customização
  link?: any; //link opcional para redirecionamento de pagina
}

export default function TooltipButton({
  tooltipText,
  variant = 'outline', // Default para 'outline'
  size = 'default', // Default para 'default'
  children,
  className = '', // Valor padrão vazio para className
  link = '', //Valor padrão para link
}: TooltipButtonProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div className="flex">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a href={link}>
            <Button 
              variant={variant} 
              className={`${className}`} // Aplica a className recebida
              size={size} // Aplica o tamanho recebido
              onMouseEnter={() => setTooltipOpen(true)} 
              onMouseLeave={() => setTooltipOpen(false)}
            >
              {children} {/* Aqui podem ser passados texto ou ícone */}
            </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent className='bg-black/60'>
            <p>{tooltipText}</p> {/* Texto do tooltip */}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

