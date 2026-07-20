'use client'
import { motion } from 'framer-motion'
import useInView from '@/lib/useInView'
import styles from '@/styles/About.module.css'

const PILLARS = [
  {
    n: '01',
    title: 'Sin intermediarios.',
    desc: 'Hablás directamente con quien desarrolla. Sin cuenta manager, sin teléfono roto, sin traducción de lo que pediste.',
  },
  {
    n: '02',
    title: 'Plazos reales.',
    desc: 'Estimamos con honestidad y avisamos con tiempo si algo cambia. Sin fechas inventadas ni sorpresas de última hora.',
  },
  {
    n: '03',
    title: 'Resultados reales.',
    desc: 'No hacemos prototipos ni demos. Trabajamos en proyectos que terminan en producción y que la gente usa todos los días.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function About() {
  const [headRef, headVisible] = useInView()
  const [gridRef, gridVisible] = useInView({ threshold: 0.1 })

  return (
    <section id="about" className={styles.about}>
      <div className={styles.inner}>
        <div ref={headRef} className={`${styles.head} reveal ${headVisible ? 'show' : ''}`}>
          <span className={styles.eyebrow}>~ por qué elegirnos ~</span>
          <h2 className={styles.title}>Sin vueltas.</h2>
        </div>

        <motion.div
          ref={gridRef}
          className={styles.grid}
          variants={container}
          initial="hidden"
          animate={gridVisible ? 'show' : 'hidden'}
        >
          {PILLARS.map((p) => (
            <motion.div key={p.n} className={styles.pillar} variants={item}>
              <span className={styles.pillarNum}>{p.n}</span>
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarDesc}>{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className={`${styles.stat} reveal ${headVisible ? 'show' : ''}`} ref={headRef}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>+3 años</span>
            <span className={styles.statLabel}>entregando proyectos en producción</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>Remoto</span>
            <span className={styles.statLabel}>cualquier zona horaria</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>Buenos Aires</span>
            <span className={styles.statLabel}>Argentina</span>
          </div>
        </div>
      </div>
    </section>
  )
}
