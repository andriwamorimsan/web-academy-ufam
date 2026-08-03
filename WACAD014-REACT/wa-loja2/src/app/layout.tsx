import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import BootstrapClient from "./components/Clients/BootstrapClient";
import {ReactQueryClientProvider} from "@/app/components/Clients/ReactQueryClient";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Navbar } from './components/Navbar/Navbar'

export const metadata: Metadata = {
  title: 'WA Loja',
  description: 'Loja da Web Academy',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {

  return (
    <html lang='pt-BR'>
      <body>
        <ReactQueryClientProvider>
            <Navbar />
            {children}


            <BootstrapClient />
            <ReactQueryDevtools  />
        </ReactQueryClientProvider>


      </body>
    </html>
  )
}
 
