import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectCaseStudy from './components/ProjectCaseStudy'
import Blog from './components/Blog'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState('home') // 'home', 'project-1', 'project-2', 'project-3'

  // Hash-based routing to support navigation and back button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#/voice-agent') {
        setCurrentView('voice-agent')
        window.scrollTo(0, 0)
      } else if (hash === '#/local-rag') {
        setCurrentView('local-rag')
        window.scrollTo(0, 0)
      } else if (hash === '#/ocr-engine') {
        setCurrentView('ocr-engine')
        window.scrollTo(0, 0)
      } else if (hash === '#/blog') {
        setCurrentView('blog')
        window.scrollTo(0, 0)
      } else {
        setCurrentView('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Run on initial render
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])



  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <motion.div 
        className="loading-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="loader"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p>Loading...</p>
      </motion.div>
    )
  }

  return (
    <div className="App">
      <Header />
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => {
              const hash = window.location.hash
              if (hash && hash.startsWith('#') && hash !== '#/') {
                const id = hash.replace('#', '')
                if (id === 'home') {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                } else {
                  const el = document.getElementById(id)
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }
              }
            }}
          >
            <Hero />
            <About />
            <Projects />
            <Contact />
            <Footer />
          </motion.div>
        ) : currentView === 'blog' ? (
          <motion.div
            key="blog"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Blog />
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCaseStudy projectId={currentView} />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

