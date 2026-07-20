'use client'
import useInView from '@/lib/useInView'
import styles from '@/styles/Process.module.css'

const STEPS = [
  {
    n: '01',
    title: 'Hablamos',
    desc: 'Contanos el proyecto. Se identifican las necesidades reales y el alcance del trabajo. Sin compromiso.',
  },
  {
    n: '02',
    title: 'Propuesta',
    desc: 'Se envía un estimado de tiempos y alcance por escrito. Claro, sin letra chica ni sorpresas.',
  },
  {
    n: '03',
    title: 'Construimos',
    desc: 'Entregas parciales para que veas el avance antes del resultado final. Comunicación constante.',
  },
  {
    n: '04',
    title: 'Cerramos',
    desc: 'Se entrega el resultado acordado, configurado y listo para usar. Con toda la información necesaria para su uso.',
  },
]

function Step({ step, idx }) {
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      className={`${styles.step} reveal ${visible ? 'show' : ''}`}
      style={{ transitionDelay: `${idx * 0.1}s` }}
    >
      <span className={styles.number}>{step.n}</span>
      <h3 className={styles.stepTitle}>{step.title}</h3>
      <p className={styles.stepDesc}>{step.desc}</p>
    </div>
  )
}

export default function Process() {
  const [headRef, headVisible] = useInView()
  return (
    <section id="process" className={styles.process}>
      <div className={styles.inner}>
        <div ref={headRef} className={`${styles.head} reveal ${headVisible ? 'show' : ''}`}>
          <span className={styles.eyebrow}>~ cómo trabajamos ~</span>
          <h2 className={styles.title}>Sin sorpresas.</h2>
          <p className={styles.subtitle}>
            Un proceso simple para que sepas qué esperar desde el primer mensaje.
          </p>
        </div>

        <div className={styles.grid}>
          {STEPS.map((s, i) => <Step key={s.n} step={s} idx={i} />)}
        </div>
      </div>
    </section>
  )
}
