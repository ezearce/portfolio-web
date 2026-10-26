'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FaWhatsapp } from 'react-icons/fa'
import styles from '@/styles/Navbar.module.css'

const WHATSAPP_URL = 'https://wa.me/5492920248803'

const LINKS = [
  { id: 'services', label: 'Servicios' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -72 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Navbar() {
  const [active, setActive]   = useState('hero')
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme }   = useTheme()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-50% 0px -50% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => sections.forEach((s) => observer.unobserve(s))
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a
          href="#hero"
          className={styles.brand}
          onClick={(e) => { e.preventDefault(); scrollTo('hero'); setOpen(false) }}
        >
          <span className={styles.brandName}>Esear</span>
          <span className={styles.brandSuffix}>Studio</span>
        </a>

        <nav className={`${styles.nav} ${open ? styles.open : ''}`}>
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`${styles.link} ${active === id ? styles.active : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo(id); setOpen(false) }}
            >
              {label}
            </a>
          ))}
          <a href="#contact" className={styles.ctaLink} onClick={(e) => { e.preventDefault(); scrollTo('contact'); setOpen(false) }}>
            Contactarme
          </a>
        </nav>

        <div className={styles.right}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsapp}
            aria-label="Escribinos por WhatsApp"
          >
            <FaWhatsapp size={18} />
          </a>

          <button
            className={styles.themeBtn}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Cambiar tema"
          >
            {mounted && (
              theme === 'dark'
                ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
                : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>

          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}
    </header>
  )
}
