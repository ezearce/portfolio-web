'use client'
import { useRef, useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import useInView from '@/lib/useInView'
import styles from '@/styles/Contact.module.css'

export default function Contact() {
  const [headRef, headVisible] = useInView()
  const [bodyRef, bodyVisible] = useInView({ threshold: 0.08 })
  const [loading, setLoading]  = useState(false)
  const [status, setStatus]    = useState(null)
  const formRef                = useRef()

  useEffect(() => {
    if (!status) return
    const t = setTimeout(() => setStatus(null), 5000)
    return () => clearTimeout(t)
  }, [status])

  const send = (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    emailjs
      .sendForm('service_c599kaq', 'template_6gcaffp', formRef.current, '-T-9FFiNA-uvjQsi_')
      .then(() => { setStatus('ok'); formRef.current.reset() })
      .catch(() => setStatus('err'))
      .finally(() => setLoading(false))
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <div ref={headRef} className={`${styles.head} reveal ${headVisible ? 'show' : ''}`}>
          <span className={styles.eyebrow}>~ contacto ~</span>
          <h2 className={styles.title}>
            Hablemos de tu<br /><em>proyecto.</em>
          </h2>
          <p className={styles.subtitle}>
            ¿Tenés una propuesta o una idea? Escribinos — respondemos en menos de 24hs.
          </p>
        </div>

        <div ref={bodyRef} className={`${styles.body} reveal ${bodyVisible ? 'show' : ''}`}>
          {/* ── Info ── */}
          <div className={styles.info}>
            <a href="mailto:ezequielagustinarce1@gmail.com" className={styles.email}>
              <FiMail size={16} />
              ezequielagustinarce1@gmail.com
            </a>

            <div className={styles.socials}>
              <a
                href="https://www.linkedin.com/in/ezequiel-arce-4457371b7/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                <FaLinkedin size={18} />
                <div>
                  <span className={styles.socialName}>LinkedIn</span>
                  <span className={styles.socialHandle}>Ezequiel Arce</span>
                </div>
              </a>
              <a
                href="https://github.com/ezearce"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                <FaGithub size={18} />
                <div>
                  <span className={styles.socialName}>GitHub</span>
                  <span className={styles.socialHandle}>github.com/ezearce</span>
                </div>
              </a>
            </div>

            <p className={styles.infoNote}>
              Respuesta en menos de 24hs.<br />
              Trabajo remoto con clientes de cualquier zona horaria.
            </p>
          </div>

          {/* ── Form ── */}
          <form ref={formRef} onSubmit={send} className={styles.form}>
            <div className={styles.row}>
              <label className={styles.field}>
                <span>Nombre</span>
                <input type="text" name="user_name" placeholder="Tu nombre" required />
              </label>
              <label className={styles.field}>
                <span>Email</span>
                <input type="email" name="user_email" placeholder="tu@email.com" required />
              </label>
            </div>

            <label className={styles.field}>
              <span>Mensaje</span>
              <textarea name="message" placeholder="Contanos sobre el proyecto…" rows={5} required />
            </label>

            <button type="submit" disabled={loading} className={styles.submit}>
              {loading ? 'Enviando…' : 'Enviar mensaje'}
              {!loading && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              )}
            </button>

            {status === 'ok' && (
              <p className={`${styles.alert} ${styles.ok}`}>
                Mensaje enviado. Nos ponemos en contacto en breve.
              </p>
            )}
            {status === 'err' && (
              <p className={`${styles.alert} ${styles.err}`}>
                No se pudo enviar. Probá de nuevo o escribinos directo al mail.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
