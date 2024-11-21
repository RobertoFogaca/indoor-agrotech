import React, { ReactNode } from "react";

interface Props {
  title: string;
  description: string[]; // Mudança para um array de strings

}

export default function CardPlans({ title, description }: Props) {
  return (
    <div className="h-full w-full flex flex-col justify-center gap-4 items-center p-6 rounded-lg shadow-md">
      <div className="flex flex-col gap-2 items-start text-start">
        <h1 className="text-[#56de37] font-bold text-2xl uppercase">{title}</h1>
        <ul className="text-muted text-sm space-y-1">
          {description.map((line, index) => (
            <li key={index}><strong className="text-transparent">a</strong>•<strong className="text-transparent">aa</strong>{line}</li> // Adiciona um marcador antes de cada item
          ))}
        </ul>
      </div>
    </div>
  );
}
