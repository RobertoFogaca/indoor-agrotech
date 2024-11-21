'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Camera, Trash2, Power } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Define o tipo de cada câmera
type CameraType = {
  id: number;
  name: string;
  url: string;
  status: 'Online' | 'Offline';
}

export default function CameraControl() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [cameras, setCameras] = useState<CameraType[]>([]) // Define o tipo explícito para as câmeras
  const [newCamera, setNewCamera] = useState({ name: '', url: '' }) // Mantém o tipo como strings para os campos de entrada

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const handleRegisterCamera = () => {
    if (newCamera.name && newCamera.url) {
      // Verifique se a URL é válida
      const videoUrlPattern = /^https?:\/\/.+/;
      if (!videoUrlPattern.test(newCamera.url)) {
        alert("URL inválida. Certifique-se de que a URL começa com http:// ou https://");
        return;
      }

      setCameras([
        ...cameras,
        { id: cameras.length + 1, name: newCamera.name, url: newCamera.url, status: 'Offline' },
      ])
      setNewCamera({ name: '', url: '' }) // Limpa os campos após o registro
    }
  }

  const handleDeleteCamera = (id: number) => {
    setCameras(cameras.filter(camera => camera.id !== id))
  }

  const handleToggleCameraStatus = (id: number) => {
    setCameras(cameras.map(camera => 
      camera.id === id ? { ...camera, status: camera.status === 'Online' ? 'Offline' : 'Online' } : camera
    ))
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 h-[7rem] bg-[#e2febf] dark:bg-gray-800 shadow">
          <div className="flex items-center">
            <div className='flex flex-row items-center'>
              <span className='bg-[#65f448]/35 size-16 rounded-full flex items-center justify-center'>
                <span className="material-symbols-rounded text-4xl  text-[#1d5412]">speed_camera</span>
              </span>
              <div className='flex flex-col mx-6'>
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Controle de câmeras</h1>
                <p className='text-muted-foreground'>Aqui você poderá controlar e monitorar suas câmeras</p>
              </div>
            </div>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button className='gap-1 bg-[#122a0e] hover:bg-[#122a0e]/85'>
                <span className="material-symbols-rounded text-xl">add_circle</span>
                <p>Registrar câmeras</p>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Registre uma nova câmera</SheetTitle>
                <SheetDescription>
                  Adicione os detalhes para o registro de uma nova câmera ao seu sistema.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nome de registro
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={newCamera.name}
                    onChange={(e) => setNewCamera({ ...newCamera, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="url" className="text-right">
                    URL da câmera
                  </Label>
                  <Input
                    id="url"
                    className="col-span-3"
                    value={newCamera.url}
                    onChange={(e) => setNewCamera({ ...newCamera, url: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button 
                  type="button" 
                  onClick={handleRegisterCamera}
                  className='gap-1 bg-[#122a0e] hover:bg-[#122a0e]/85'
                >
                  <span className="material-symbols-rounded text-xl">add_circle</span>
                  <p>Registrar Câmera</p>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        {/* Camera Grid */}
        <ScrollArea className="w-full h-full overflow-auto">
          <main className="flex-1 overflow-hidden h-full bg-[#f5ffe9] dark:bg-gray-900 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cameras.map((camera) => (
                <AlertDialog key={camera.id}>
                  <AlertDialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-0">
                        <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                          <div className="absolute inset-0 flex items-center justify-center">
                            {camera.status === 'Online' ? (
                              <video className="w-full h-full object-cover" autoPlay muted>
                                <source src={camera.url} type="video/mp4" />
                                Seu navegador não suporta o formato de vídeo.
                              </video>
                            ) : (
                              <Camera className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                            )}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{camera.name}</h3>
                          <div className="flex flex-row gap-2">
                            <p>Status:</p>
                            <Badge className={camera.status === 'Online' ? 'bg-green-600' : 'bg-red-600'}>
                              {camera.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-6xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle>{camera.name} Feed</AlertDialogTitle>
                      <AlertDialogDescription>
                        Transmissão ao vivo de: {camera.name}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="mt-4">
                      {camera.status === 'Online' ? (
                        <video className="w-full h-full object-cover" autoPlay muted>
                          <source src={camera.url} type="video/mp4" />
                          Seu navegador não suporta o formato de vídeo.
                        </video>
                      ) : (
                        <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <Camera className="w-24 h-24 text-gray-400 dark:text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleToggleCameraStatus(camera.id)}
                          className={camera.status === 'Online' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                        >
                          <Power className="mr-2 h-4 w-4" />
                          {camera.status === 'Online' ? 'Câmera ativada' : 'Câmera desativada'}
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                             <Trash2 className="mr-2 h-4 w-4" />
                              Excluir câmera
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Isso excluirá permanentemente a câmera
                                e remover seus dados de nossos servidores.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteCamera(camera.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Sim, excluir câmera
                             </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      <AlertDialogCancel asChild>
                        <Button variant="outline">
                          Fechar
                        </Button>
                      </AlertDialogCancel>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              ))}
            </div>
          </main>
        </ScrollArea>
      </div>
    </div>
  )
}
