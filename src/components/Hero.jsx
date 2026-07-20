'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import styles from '@/styles/Hero.module.css'

const MARQUEE = [
  'Páginas web', 'Apps móviles', 'E-commerce',
  'Sistemas a medida', 'Automatizaciones', 'Integraciones',
  'Software a medida', 'Landing pages',
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.4 } },
}

const lineVariant = {
  hidden: { opacity: 0, y: 70, skewY: 4 },
  show: {
    opacity: 1, y: 0, skewY: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
}

const LINES = [
  { text: 'Software que', accent: false },
  { text: 'resuelve', accent: true },
  { text: 'problemas reales.', accent: false },
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <section id="hero" className={styles.hero} ref={ref}>
      <motion.div className={styles.glow} style={{ y }} aria-hidden />

      <div className={styles.inner}>
        <motion.h1
          className={styles.title}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {LINES.map(({ text, accent }, i) => (
            <span key={i} className={styles.lineWrap}>
              <motion.span
                className={`${styles.line} ${accent ? styles.accent : ''}`}
                variants={lineVariant}
              >
                {text}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          Apps, páginas web y sistemas para negocios y emprendedores.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.7 }}
        >
          <a href="#contact" className={styles.primary}>
            Hablemos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Scrolling marquee */}
      <div className={styles.marquee} aria-hidden>
        <div className={styles.track}>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              {item}
              <span className={styles.sep}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
