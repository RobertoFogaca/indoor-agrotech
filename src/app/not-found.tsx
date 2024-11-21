import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import errorImg from "./img/404.png"
import twoGuys from "./img/two-guys.png"

export default function NotFound(){
    return(
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <Image
                src={errorImg}
                alt="404"
                width={400}
                />
                <p className="text-xl text-muted-foreground mb-8">Página não encontrada</p>
                <Link href="/">
                    <Button className="bg-[#277318]">
                    Página inicial
                    </Button>
                </Link>
            </div>
        </>
    )
}