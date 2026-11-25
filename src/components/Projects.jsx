'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import useInView from '@/lib/useInView'
import styles from '@/styles/Projects.module.css'

// Para sumar un trabajo, agregarlo a esta lista: el número y el carrusel se arman solos.
const PROJECTS = [
  {
    title: 'Guerreros del Deporte',
    desc: 'Sistema de stock para un comercio de artículos deportivos. El dueño encuentra cualquier producto en segundos —por nombre, marca, talle o color— y responde precio y disponibilidad con el cliente adelante. Cada ingreso y venta queda registrado, importa y exporta a Excel, y funciona igual en la PC del mostrador que en el celular.',
    image: '/assets/guerreros.png',
    url: 'https://guerreros-330.pages.dev/',
    repo: null,
  },
  {
    title: 'La Rotonda',
    desc: 'Herramienta online para una forrajería: el cliente elige su mascota y el alimento que le da, y al instante sabe cuánto darle por día y cuántos días le dura la bolsa, según la tabla de cada marca. Al terminar puede pedir la próxima bolsa por WhatsApp o Instagram con el mensaje ya armado. El local la comparte en sus redes y le genera pedidos.',
    image: '/assets/larotonda.png',
    url: 'https://larotonda-1qq.pages.dev/',
    repo: null,
  },
  {
    title: 'Servicio Ya',
    desc: 'Conecta a personas que necesitan un servicio con profesionales de su zona. El cliente busca, pide presupuesto, sigue el trabajo en tiempo real y califica al finalizar, todo desde el celular. Resuelve la falta de un lugar confiable para encontrar y contratar oficios cerca.',
    image: '/assets/servicioya.png',
    url: 'https://www.servicioyaweb.com.ar/',
    repo: null,
  },
  {
    title: 'TurnosFutbol',
    desc: 'Plataforma para reservar canchas de fútbol por internet. Los jugadores buscan complejos por ciudad, ven los horarios libres al instante y reservan en pocos pasos, con confirmación por email. Cada complejo administra sus canchas, precios y turnos desde su propio panel, sin depender del teléfono ni de un cuaderno.',
    image: '/assets/turnosfutbol.png',
    url: 'https://turnosfutbol.vercel.app/',
    repo: null,
  },
  {
    title: 'LuxeHome',
    desc: 'Sitio para una inmobiliaria donde los interesados exploran propiedades en venta o alquiler, las filtran por ciudad, tipo y precio, ven fotos y detalles, y contactan directo por WhatsApp. La agencia carga y actualiza todas sus propiedades desde un panel privado, manteniendo su web al día sin depender de nadie.',
    image: '/assets/luxehome.png',
    url: 'https://real-estate-cms-zeta.vercel.app/',
    repo: null,
  },
  {
    title: 'MOV3S',
    desc: 'App que incentiva el transporte sustentable: registra recorridos a pie o en bici, propone desafíos, permite reportar incidentes en la vía pública y ofrece un chatbot que orienta al usuario. Busca reducir la huella de carbono premiando a quienes se mueven de forma más ecológica. En uso activo.',
    image: '/assets/mov3s.png',
    url: 'https://mov3s.com/',
    repo: null,
  },
  {
    title: 'Tienda online',
    desc: 'Comercio electrónico completo con carrito de compras y pagos por Mercado Pago. El cliente compra en pocos clics y el dueño gestiona productos, pedidos, stock y usuarios desde un panel de administración. Lleva un negocio a vender online sin necesidad de plataformas de terceros.',
    image: '/assets/ecommerce.png',
    url: null,
    repo: null,
  },
]

const pad = (n) => String(n).padStart(2, '0')

function ProjectSlide({ project, number, active }) {
  return (
    <article
      className={styles.card}
      aria-roledescription="slide"
      aria-label={`${number} de ${pad(PROJECTS.length)}`}
      aria-hidden={!active}
      inert={!active}
    >
      <div className={styles.imgWrap}>
        {project.url ? (
          <Link href={project.url} target="_blank" rel="noopener noreferrer" className={styles.imgLink} tabIndex={-1} draggable={false}>
            <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" quality={85} className={styles.img} draggable={false} />
          </Link>
        ) : (
          <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" quality={85} className={styles.img} draggable={false} />
        )}
      </div>

      <div className={styles.content}>
        <span className={styles.index}>{number}</span>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.desc}>{project.desc}</p>
        <div className={styles.links}>
          {project.url && (
            <Link href={project.url} target="_blank" rel="noopener noreferrer" className={styles.linkPrimary}>
              <FiExternalLink size={13} /> Ver proyecto
            </Link>
          )}
          {project.repo && (
            <Link href={project.repo} target="_blank" rel="noopener noreferrer" className={styles.linkSecondary}>
              <FiGithub size={13} /> Repositorio
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [headRef, headVisible] = useInView()
  const [bodyRef, bodyVisible] = useInView({ threshold: 0.08 })
  const [current, setCurrent] = useState(0)
  const total = PROJECTS.length

  const go = (i) => setCurrent((i + total) % total)

  const onDragEnd = (_, { offset, velocity }) => {
    const swipe = offset.x + velocity.x * 0.2
    if (swipe < -80) go(current + 1)
    else if (swipe > 80) go(current - 1)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(current + 1)
    if (e.key === 'ArrowLeft') go(current - 1)
  }

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <div ref={headRef} className={`${styles.head} reveal ${headVisible ? 'show' : ''}`}>
          <span className={styles.eyebrow}>~ proyectos ~</span>
          <h2 className={styles.title}>Últimos trabajos.</h2>
          <p className={styles.subtitle}>
            Proyectos que desarrollé de principio a fin y que hoy están en uso real.
          </p>
        </div>

        <div
          ref={bodyRef}
          className={`${styles.carousel} reveal ${bodyVisible ? 'show' : ''}`}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Proyectos"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div className={styles.viewport}>
            <motion.div
              className={styles.track}
              animate={{ x: `${-current * 100}%` }}
              transition={{ type: 'spring', stiffness: 260, damping: 32 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={onDragEnd}
            >
              {PROJECTS.map((p, i) => (
                <div key={p.title} className={styles.slide}>
                  <ProjectSlide project={p} number={pad(i + 1)} active={i === current} />
                </div>
              ))}
            </motion.div>
          </div>

          <div className={styles.controls}>
            <span className={styles.counter}>
              <strong>{pad(current + 1)}</strong> / {pad(total)}
            </span>

            <div className={styles.dots}>
              {PROJECTS.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                  onClick={() => go(i)}
                  aria-label={`Ver ${p.title}`}
                  aria-current={i === current}
                />
              ))}
            </div>

            <div className={styles.arrows}>
              <button type="button" className={styles.arrow} onClick={() => go(current - 1)} aria-label="Proyecto anterior">
                <FiArrowLeft size={18} />
              </button>
              <button type="button" className={styles.arrow} onClick={() => go(current + 1)} aria-label="Proyecto siguiente">
                <FiArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
