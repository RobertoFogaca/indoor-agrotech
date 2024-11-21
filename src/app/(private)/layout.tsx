'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import indoorLogo from "@/app/favicon.ico"
import { Poppins } from 'next/font/google'
import { Separator } from '@radix-ui/react-context-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { auth, db } from "@/lib/firebase"
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const menuItems = [
  { icon: 'home', label: 'Inicio', path: '/home' },
  { icon: 'speed_camera', label: 'Monitoramento', path: '/monitoring' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null) // Para armazenar o usuário autenticado
  const [userData, setUserData] = useState<any>(null) // Para armazenar os dados do usuário do Firestore
  const pathname = usePathname()
  const router = useRouter()

  // Obter o usuário atual autenticado e seus dados do Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)

        // Buscar dados do usuário no Firestore
        const userDocRef = doc(db, "users", currentUser.uid)
        const userDoc = await getDoc(userDocRef)

        if (userDoc.exists()) {
          setUserData(userDoc.data())
        }
      } else {
        setUser(null)
        setUserData(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="flex h-screen bg-[#ebffd2] dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-[15rem]' : 'w-20'
        } transition-all duration-300 ease-in-out bg-[#0b4200] dark:bg-gray-800 py-4 px-3 shadow-md`}
      >
        <div className="flex items-center justify-between gap-5 px-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 rounded-full w-[2.7rem] h-[2.7rem] hover:bg-[#2a5123]/80 hover:text-gray-500 dark:text-gray-400"
          >
            <span className="material-symbols-rounded">menu</span>
          </Button>
        </div>
        <nav className="flex flex-col max-h-[90vh] h-full justify-between pb-8 overflow-hidden">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Button
                  variant="ghost"
                  className={`w-full text-muted-foreground gap-5 justify-start py-[1.5rem] hover:bg-[#2a5123]/80 hover:text-muted-foreground/60 ${
                    pathname === item.path ? 'bg-[#2a5123]/80 text-white' : ''
                  }`}
                  onClick={() => router.push(item.path)} // Navegação ao clicar
                >
                  <span className="material-symbols-rounded">{item.icon}</span>
                  {isSidebarOpen && item.label}
                </Button>
              </li>
            ))}
          </ul>
          <div className="w-full">
            <div className="flex flex-row w-full h-full gap-3">
              <Avatar>
                <AvatarImage src={user?.photoURL || "https://github.com/shadcn.png"} alt={user?.displayName || "@shadcn"} />
                <AvatarFallback>{userData?.name?.[0] || "CN"}</AvatarFallback>
              </Avatar>
              {isSidebarOpen ? (
                <div className="flex flex-col w-full text-muted-foreground">
                  <p className="text-base font-semibold">{userData?.name || "Nome Não Disponível"}</p>
                  <span className="w-full truncate ...">
                    <p className="text-sm">{userData?.email || "Email Não Disponível"}</p>
                  </span>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#0b4200] dark:bg-gray-800 shadow-2xl flex flex-col items-center justify-items-end justify-center w-full h-[5rem]">
          <nav className="flex items-center gap-4 w-full px-4">
            <Image src={indoorLogo} width={40} height={40} alt="Indoor Agrotech logo" />
            <p className={`${poppins.className} hidden md:block font-bold w-full text-white`}>
              Indoor Agrotech
            </p>
          </nav>
        </header>

        {/* Scrollable Area */}
        {children}
      </div>
    </div>
  )
}
