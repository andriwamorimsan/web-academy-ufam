import 'bootstrap/dist/css/bootstrap.min.css'

import type { Metadata } from 'next'
import BootstrapClient from './components/BootstrapClient'
import FavoritesProvider from './context/FavoritesContext/FavoritesProvider'
import Navbar from './components/Navbar/Navbar'
import AuthProvider from "@/app/context/AuthContext/AuthProvider";

export const metadata: Metadata = {
  title: 'WA Loja'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-br'>
      <body>
      <AuthProvider>
        <FavoritesProvider>
          <Navbar />
          {children}
          <BootstrapClient />
        </FavoritesProvider>
      </AuthProvider>

      </body>
    </html>
  )
}
