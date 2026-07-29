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
  title: 'Esear Studio — Software que resuelve problemas reales',
  description:
    'Desarrollamos aplicaciones web, apps móviles y sistemas a medida para negocios y emprendedores.',
  keywords: [
    'esear studio',
    'desarrollo de software',
    'desarrollo web',
    'apps móviles',
    'sistemas a medida',
    'e-commerce',
    'automatizaciones',
    'software argentina',
  ],
  authors: [{ name: 'Esear Studio' }],
  openGraph: {
    title: 'Esear Studio — Software que resuelve problemas reales',
    description: 'Desarrollamos aplicaciones web, apps móviles y sistemas a medida para negocios y emprendedores.',
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
      <body>
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
