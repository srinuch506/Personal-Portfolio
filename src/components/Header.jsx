import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Header.css'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
  }

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme')
    } else {
      document.body.classList.remove('light-theme')
    }
  }, [theme])

  const navItems = [
    { name: 'HOME', href: '#home', isExternal: false },
    { name: 'PROJECTS', href: '#projects', isExternal: false },
    { name: 'BLOG', href: '#/blog', isExternal: false },
    { name: 'CONTACT', href: '#contact', isExternal: false },
    { name: 'GITHUB', href: 'https://github.com/srinuch506', isExternal: true }
  ]
  const [active, setActive] = useState('home')
  const mobileNavRef = useRef(null)
  const toggleRef = useRef(null)

  const handleNavClick = (e, item) => {
    if (item.isExternal) {
      return
    }
    e.preventDefault()

    const currentHash = window.location.hash
    const targetHash = item.href

    if (targetHash === '#/blog') {
      window.location.hash = '#/blog'
      setMobileMenuOpen(false)
      return
    }

    if (currentHash === '#/blog' || currentHash === '#/voice-agent' || currentHash === '#/local-rag' || currentHash === '#/ocr-engine') {
      window.location.hash = targetHash === '#home' ? '#/' : targetHash
      setTimeout(() => {
        const id = targetHash.replace('#', '')
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (targetHash === '#home') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 150)
      setMobileMenuOpen(false)
      return
    }

    const id = targetHash.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (targetHash === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const [currentHash, setCurrentHash] = useState(window.location.hash)

  useEffect(() => {
    const handleHash = () => {
      setCurrentHash(window.location.hash)
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#/blog') {
      setActive('blog')
      return
    } else if (hash === '#/voice-agent' || hash === '#/local-rag' || hash === '#/ocr-engine') {
      setActive('projects')
      return
    }

    let obs

    // Wait a brief moment to let the home view render and mount its elements
    const timer = setTimeout(() => {
      const sections = navItems
        .filter(i => !i.isExternal && i.href !== '#/blog')
        .map(i => document.getElementById(i.href.replace('#', '')))
        .filter(Boolean)

      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const id = entry.target.id
              setActive(id)
              
              // Dynamically update URL hash without scroll jumps or hashchange events
              const newHash = id === 'home' ? '#/' : `#${id}`
              if (window.location.hash !== newHash) {
                window.history.replaceState(null, null, newHash)
              }
            }
          })
        },
        { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )
      sections.forEach(s => obs.observe(s))

      // Set active based on current hash immediately on return
      const currentSection = window.location.hash.replace('#', '')
      if (currentSection && document.getElementById(currentSection)) {
        setActive(currentSection)
      } else if (window.location.hash === '#/' || window.location.hash === '') {
        setActive('home')
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      if (obs) obs.disconnect()
    }
  }, [currentHash])

  // handle ESC to close and trap focus inside mobile nav when open
  useEffect(() => {
    if (!mobileMenuOpen) return

    const focusableSelector = 'a, button, input, textarea, [tabindex]:not([tabindex="-1"])'
    const node = mobileNavRef.current
    const focusable = node ? Array.from(node.querySelectorAll(focusableSelector)) : []
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (first) first.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        toggleRef.current?.focus()
      } else if (e.key === 'Tab') {
        if (focusable.length === 0) return
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileMenuOpen])

  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header__container">
        <div className="header__inner">
          <motion.a 
            href="#/"
            className="header__logo"
            whileHover={{ scale: 1.02 }}
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="header__logo-text">SC<span className="header__logo-dot">.</span></span>
            <span className="header__logo-badge">AI ENGINEER</span>
          </motion.a>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.name}
                  className="header__nav-item"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <a 
                    href={item.href} 
                    target={item.isExternal ? '_blank' : '_self'}
                    rel="noreferrer"
                    className={"header__nav-link" + (active === item.href.replace('#','') ? ' header__nav-link--active' : '')}
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navItems.length) * 0.08 }}
                className="header__nav-item"
              >
                <a 
                  href="https://www.linkedin.com/in/srinivasarao-cherukupalli-34a844240" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="header__cta-btn header__cta-btn--linkedin"
                >
                  LINKEDIN
                </a>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navItems.length + 1) * 0.08 }}
                className="header__nav-item"
              >
                <button 
                  className="header__theme-toggle" 
                  onClick={toggleTheme} 
                  aria-label="Toggle theme"
                  style={{
                    background: 'transparent',
                    border: '1.5px solid var(--accent-purple)',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    outline: 'none',
                    margin: '0 0.5rem',
                    fontSize: '1.1rem',
                    lineHeight: '1'
                  }}
                >
                  {theme === 'dark' ? '☽' : '☀'}
                </button>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navItems.length + 2) * 0.08 }}
                className="header__nav-item"
              >
                <a 
                  href="#contact" 
                  className="header__cta-btn header__cta-btn--hire"
                  onClick={(e) => handleNavClick(e, { href: '#contact' })}
                >
                  HIRE ME
                </a>
              </motion.li>
            </ul>
          </nav>

          <button 
            ref={toggleRef}
            className={"header__mobile-toggle" + (mobileMenuOpen ? ' open' : '')}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            id="mobile-nav"
            ref={mobileNavRef}
            className="header__mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <ul className="header__mobile-nav-list">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    target={item.isExternal ? '_blank' : '_self'}
                    rel="noreferrer"
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="https://www.linkedin.com/in/srinivasarao-cherukupalli-34a844240"
                  target="_blank" 
                  rel="noreferrer"
                >
                  LINKEDIN
                </a>
              </li>
              <li>
                <a 
                  href="#contact"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, { href: '#contact' });
                  }}
                >
                  HIRE ME
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
