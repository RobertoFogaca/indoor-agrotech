import { Button } from "@/components/ui/button";
import React from "react";
interface Props{
    title: string,
    description: string
    buttonTitle?:string
}
export default function CardPlans({ title, description, buttonTitle }: Props) {
    return (
      <div className="h-full w-full flex flex-col justify-center gap-4 items-center p-6 rounded-lg shadow-md">
        <div className="flex flex-col gap-2 items-start text-start">
          <h1 className="text-[#56de37] font-bold text-2xl uppercase">{title}</h1>
          <div className="text-muted text-sm space-y-1">
            {description.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
        <Button className="bg-white hover:bg-white/75 text-black w-full py-2 mt-4">
          {buttonTitle || "Saiba mais"}
        </Button>
      </div>
    );
  }