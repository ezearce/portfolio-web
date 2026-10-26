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
    desc: 'Conecta a personas que necesitan un servicio con profesionales de su zona. El cliente busca, pide presupuesto, sigue el trabajo en tiempo real y califica al finalizar, todo desde el celular. Resuelve la falta de un lugar confiable para encontrar y contratar oficios cerca.',
    image: '/assets/servicioya.png',
    url: 'https://www.servicioyaweb.com.ar/',
    repo: null,
  },
  {
    index: '02',
    title: 'TurnosFutbol',
    desc: 'Plataforma para reservar canchas de fútbol por internet. Los jugadores buscan complejos por ciudad, ven los horarios libres al instante y reservan en pocos pasos, con confirmación por email. Cada complejo administra sus canchas, precios y turnos desde su propio panel, sin depender del teléfono ni de un cuaderno.',
    image: '/assets/turnosfutbol.png',
    url: 'https://turnosfutbol.vercel.app/',
    repo: null,
  },
  {
    index: '03',
    title: 'LuxeHome',
    desc: 'Sitio para una inmobiliaria donde los interesados exploran propiedades en venta o alquiler, las filtran por ciudad, tipo y precio, ven fotos y detalles, y contactan directo por WhatsApp. La agencia carga y actualiza todas sus propiedades desde un panel privado, manteniendo su web al día sin depender de nadie.',
    image: '/assets/luxehome.png',
    url: 'https://real-estate-cms-zeta.vercel.app/',
    repo: null,
  },
  {
    index: '04',
    title: 'MOV3S',
    desc: 'App que incentiva el transporte sustentable: registra recorridos a pie o en bici, propone desafíos, permite reportar incidentes en la vía pública y ofrece un chatbot que orienta al usuario. Busca reducir la huella de carbono premiando a quienes se mueven de forma más ecológica. En uso activo.',
    image: '/assets/mov3s.png',
    url: 'https://mov3s.com/',
    repo: null,
  },
  {
    index: '05',
    title: 'Tienda online',
    desc: 'Comercio electrónico completo con carrito de compras y pagos por Mercado Pago. El cliente compra en pocos clics y el dueño gestiona productos, pedidos, stock y usuarios desde un panel de administración. Lleva un negocio a vender online sin necesidad de plataformas de terceros.',
    image: '/assets/ecommerce.png',
    url: null,
    repo: null,
  },
  {
    index: '06',
    title: 'Sistema de Gestión de Ventas',
    desc: 'Sistema para que un negocio administre productos, ventas y stock desde una sola pantalla. Registra cada operación, actualiza el inventario de forma automática y evita los errores del control manual. Pensado para llevar orden y datos confiables del día a día.',
    image: '/assets/supermarket.png',
    url: null,
    repo: null,
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
      </div>
    </section>
  )
}
