'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import useInView from '@/lib/useInView'
import styles from '@/styles/Projects.module.css'

const PROJECTS = [
  {
    index: '01',
    title: 'Servicio Ya',
    desc: 'Plataforma donde profesionales ofrecen sus servicios y los clientes los contratan desde el celular. Permite buscar, pedir presupuesto, seguir el trabajo en tiempo real y calificar al finalizar. Incluye app móvil y página web.',
    image: '/assets/servicioya.png',
    url: 'https://www.servicioyaweb.com.ar/',
    repo: null,
  },
  {
    index: '02',
    title: 'MOV3S',
    desc: 'App para incentivar el transporte sustentable: registra recorridos a pie y en bici, propone desafíos, permite reportar incidentes en la vía pública y tiene un chatbot para orientar al usuario. En uso activo.',
    image: '/assets/mov3s.png',
    url: 'https://mov3s.com/',
    repo: null,
  },
  {
    index: '03',
    title: 'Tienda online',
    desc: 'Plataforma de ventas con carrito de compras, pagos con Mercado Pago, control de stock en tiempo real y panel de administración para gestionar productos, pedidos y usuarios.',
    image: '/assets/ecommerce.png',
    url: 'https://arce-diz-js.vercel.app/',
    repo: null,
  },
  {
    index: '04',
    title: 'Sistema de Gestión de Ventas',
    desc: 'Sistema para que un negocio administre sus productos, ventas y stock desde una sola pantalla. Registra cada transacción, controla el inventario automáticamente y evita errores manuales.',
    image: '/assets/supermarket.png',
    url: null,
    repo: 'https://github.com/ezearce/GestionVentas',
  },
]

function ProjectCard({ project, reverse }) {
  const [ref, visible] = useInView({ threshold: 0.08 })
  return (
    <article
      ref={ref}
      className={`${styles.card} ${reverse ? styles.reverse : ''} reveal ${visible ? 'show' : ''}`}
    >
      <div className={styles.imgWrap}>
        {project.url ? (
          <Link href={project.url} target="_blank" rel="noopener noreferrer" className={styles.imgLink} tabIndex={-1}>
            <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" quality={85} className={styles.img} />
          </Link>
        ) : (
          <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" quality={85} className={styles.img} />
        )}
      </div>

      <div className={styles.content}>
        <span className={styles.index}>{project.index}</span>
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
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <div ref={headRef} className={`${styles.head} reveal ${headVisible ? 'show' : ''}`}>
          <span className={styles.eyebrow}>~ proyectos ~</span>
          <h2 className={styles.title}>Trabajos en producción.</h2>
          <p className={styles.subtitle}>
            Proyectos que desarrollé de principio a fin y que hoy están en uso real.
          </p>
        </div>

        <div className={styles.list}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.index} project={p} reverse={i % 2 !== 0} />
          ))}
        </div>

        <div className={styles.github}>
          <Link href="https://github.com/ezearce" target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
            <FiGithub size={15} /> Ver más en GitHub
          </Link>
        </div>
      </div>
    </section>
  )
}
