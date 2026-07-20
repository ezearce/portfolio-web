'use client'
import { motion } from 'framer-motion'
import useInView from '@/lib/useInView'
import styles from '@/styles/Services.module.css'

const SERVICES = [
  {
    n: '01',
    title: 'Páginas y sistemas web',
    desc: 'Desde una landing page hasta un sistema completo con login, base de datos y panel de administración. Lo que tu negocio necesite, online.',
  },
  {
    n: '02',
    title: 'Aplicaciones móviles',
    desc: 'Una app para que tus clientes o tu equipo usen desde el celular. Disponible para Android e iOS, con notificaciones, GPS y todo lo que necesite.',
  },
  {
    n: '03',
    title: 'Integraciones y pagos',
    desc: 'Conectamos tu sistema con Mercado Pago, WhatsApp, pasarelas de pago y cualquier servicio externo que ya uses o que necesites sumar.',
  },
  {
    n: '04',
    title: 'Software a medida',
    desc: 'Un sistema hecho específicamente para el proceso de tu negocio: ventas, stock, turnos, facturación. Sin depender de herramientas genéricas.',
  },
  {
    n: '05',
    title: 'Mantenimiento y mejoras',
    desc: 'Tenés un sistema que ya funciona y necesitás mejorarlo, agregarle algo o corregir errores. Trabajamos sobre lo que ya existe sin empezar de cero.',
  },
]

function ServiceRow({ service, idx }) {
  const [ref, visible] = useInView({ threshold: 0.15 })
  return (
    <motion.div
      ref={ref}
      className={`${styles.row} reveal ${visible ? 'show' : ''}`}
      style={{ transitionDelay: `${idx * 0.07}s` }}
      whileHover="hover"
    >
      <span className={styles.num}>{service.n}</span>

      <div className={styles.body}>
        <motion.h3
          className={styles.rowTitle}
          variants={{ hover: { x: 6 } }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>
        <p className={styles.rowDesc}>{service.desc}</p>
      </div>

      <motion.span
        className={styles.arrow}
        variants={{ hover: { x: 6, opacity: 1 } }}
        initial={{ opacity: 0.3 }}
        transition={{ duration: 0.3 }}
        aria-hidden
      >
        →
      </motion.span>
    </motion.div>
  )
}

export default function Services() {
  const [headRef, headVisible] = useInView()
  return (
    <section id="services" className={styles.services}>
      <div className={styles.inner}>
        <div ref={headRef} className={`${styles.head} reveal ${headVisible ? 'show' : ''}`}>
          <span className={styles.eyebrow}>~ servicios ~</span>
          <h2 className={styles.title}>Qué hacemos.</h2>
        </div>

        <div className={styles.list}>
          {SERVICES.map((s, i) => <ServiceRow key={s.n} service={s} idx={i} />)}
        </div>

        <div className={styles.bottom}>
          <a href="#contact" className={styles.cta}>
            ¿Tenés un proyecto? Hablemos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
