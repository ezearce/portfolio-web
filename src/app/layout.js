import { Playfair_Display, Inter, Caveat } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import SmoothScroll from '@/components/SmoothScroll'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-hand',
  display: 'swap',
})

export const metadata = {
  title: 'Bahía Webs — Páginas web, apps y sistemas a medida',
  description:
    'Desarrollamos páginas web, apps móviles y sistemas a medida para negocios y emprendedores. Bahía Blanca y todo el país.',
  keywords: [
    'bahia webs',
    'páginas web',
    'desarrollo web',
    'diseño web bahía blanca',
    'apps móviles',
    'sistemas a medida',
    'e-commerce',
    'tienda online',
    'software argentina',
  ],
  authors: [{ name: 'Bahía Webs' }],
  openGraph: {
    title: 'Bahía Webs — Páginas web, apps y sistemas a medida',
    description: 'Desarrollamos páginas web, apps móviles y sistemas a medida para negocios y emprendedores. Bahía Blanca y todo el país.',
    type: 'website',
    locale: 'es_AR',
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} ${caveat.variable}`}
    >
      <body suppressHydrationWarning>
        <Providers>
          <SmoothScroll />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}
