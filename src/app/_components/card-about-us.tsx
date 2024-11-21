import {
    Card,
    CardContent,

    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  interface Props{
    icon:string
    title: string
    description: string
  }

export default function CardCorporate({icon, title, description}: Props){
    return(
        <Card className="h-full w-full bg-[#f9fff2]">
        <CardHeader className="px-6 py-2 pt-7 flex flex-row items-center gap-3 text-xl lg:text-2xl">
          <span className="material-symbols-rounded text-3xl lg:!text-4xl">{icon}</span>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base lg:text-lg">{description}</p>
        </CardContent>
      </Card>
    )
}