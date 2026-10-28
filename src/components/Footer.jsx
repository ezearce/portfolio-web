import { FaGithub, FaLinkedin } from 'react-icons/fa'
import styles from '@/styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.copy}>
          © {new Date().getFullYear()} Bahía Webs
        </span>
        <div className={styles.links}>
          <a href="https://github.com/ezearce" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub size={17} />
          </a>
          <a href="https://www.linkedin.com/in/ezequiel-arce-4457371b7/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={17} />
          </a>
        </div>
      </div>
    </footer>
  )
}
