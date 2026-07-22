import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Navbar } from './components/Navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'

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
        <Navbar />
        {children}
      </body>
    </html>
  )
}
