import type { Metadata } from 'next'
import { Fraunces, Epilogue, Crimson_Pro } from 'next/font/google'
import { Providers } from '@/components/providers'
import '@/styles/globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
  display: 'swap',
})

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson-pro',
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cromiw — Dentallabor-Software',
  description: 'Jeder Fall. Pünktlich.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${fraunces.variable} ${epilogue.variable} ${crimsonPro.variable}`}
    >
      <body className="font-sans bg-cream text-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
