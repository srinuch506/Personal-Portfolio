import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

function Hero() {
  const canvasRef = useRef(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  // Simple typing effect for roles
  const roles = [
    "Voice Agents & Telephony",
    "Local RAG Pipelines",
    "FastAPI AI backends",
    "Applied LLM Workflows"
  ]
  const [roleIndex, setRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(100)

  useEffect(() => {
    let timer
    const handleTyping = () => {
      const fullText = roles[roleIndex]
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1))
        setTypingSpeed(100)
        
        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000)
          return
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1))
        setTypingSpeed(50)
        
        if (currentText === '') {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }
      
      timer = setTimeout(handleTyping, typingSpeed)
    }

    timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, roleIndex])

  // HTML5 Canvas synapse animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    
    let animationFrameId
    let particles = []
    
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth || window.innerWidth
      canvas.height = canvas.parentElement.offsetHeight || 600
    }
    
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    
    // Create particles
    const particleCount = 45
    particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1
      })
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const isLightTheme = document.body.classList.contains('light-theme')
      
      // Draw lines between close particles
      ctx.strokeStyle = isLightTheme ? 'rgba(139, 92, 246, 0.18)' : 'rgba(139, 92, 246, 0.07)'
      ctx.lineWidth = 0.8
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 130) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      
      // Draw particles
      ctx.fillStyle = isLightTheme ? 'rgba(6, 182, 212, 0.55)' : 'rgba(6, 182, 212, 0.25)'
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
        
        // Update positions
        p.x += p.vx
        p.y += p.vy
        
        // Boundaries checks
        if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx
        if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy
      })
      
      animationFrameId = requestAnimationFrame(draw)
    }
    
    draw()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const tags = ["Gen AI", "Agentic AI", "RAG", "LLM", "FastAPI", "Pipecat", "Multi-Agent", "Web Scraping", "OCR"]

  return (
    <motion.section 
      id="home" 
      className="hero"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Dynamic Canvas Particles Synapses Background */}
      <div className="hero__canvas-wrap" aria-hidden="true">
        <canvas ref={canvasRef} id="heroCanvas"></canvas>
      </div>

      {/* Animated Background Elements */}
      <div className="hero__background">
        <div className="hero__gradient-circle hero__gradient-circle--1"></div>
        <div className="hero__gradient-circle hero__gradient-circle--2"></div>
        <div className="hero__gradient-circle hero__gradient-circle--3"></div>
      </div>

      <div className="hero__container">
        <div className="hero__content-wrapper">
          <motion.div
            className="hero__content"
            variants={itemVariants}
          >
            <motion.span 
              className="hero__greeting"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Associate AI Engineer
            </motion.span>
            
            <h1 className="hero__title">
              <span className="hero__name hero__name--first">Srinivasarao</span>
              <span className="hero__name hero__name--last">Cherukupalli</span>
            </h1>

            <div className="hero__typing">
              <span className="hero__role">{currentText}</span>
              <span className="hero__cursor">|</span>
            </div>

            <p className="hero__subtitle">
              Designing and shipping production AI systems: voice agents, local RAG pipelines, and applied LLM infrastructure.
            </p>

            <div className="hero__tags-container">
              {tags.map((tag) => (
                <span key={tag} className="hero__tag">{tag}</span>
              ))}
            </div>

            <div className="hero__cta">
              <a href="#projects" className="hero__btn btn-primary">
                <span>View Projects</span>
              </a>
              <a href="#contact" className="hero__btn btn-secondary">
                <span>Get In Touch</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Profile Picture */}
          <motion.div 
            className="hero__image-container"
            variants={itemVariants}
          >
            <div className="hero__image-wrapper">
              <div className="hero__image-glow"></div>
              <img 
                src="/Profile_Pic.png" 
                alt="Srinivasarao Cherukupalli" 
                className="hero__image-graphic"
              />
            </div>
          </motion.div>
        </div>

        {/* Identity Stats Bar */}
        <motion.div 
          className="hero__stats-bar"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8, ease: "easeOut" }}
        >
          <div className="hero__stat-card">
            <span className="hero__stat-label">AI Engineer</span>
          </div>
          <div className="hero__stat-card">
            <span className="hero__stat-label">Voice Agent Developer</span>
          </div>
          <div className="hero__stat-card">
            <span className="hero__stat-label">RAG Specialist</span>
          </div>
          <div className="hero__stat-card">
            <span className="hero__stat-label">FastAPI & Local LLMs</span>
          </div>
        </motion.div>

        {/* Tech Stack Scrolling Marquees (Two Rows) */}
        <motion.div 
          className="hero__marquees-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {/* Row 1: Left Scrolling */}
          <div className="hero__marquee hero__marquee--left">
            <div className="hero__marquee-track">
              {[
                { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                { name: "PyTorch", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
                { name: "NumPy", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
                { name: "Pandas", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
                { name: "OpenCV", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
                { name: "FastAPI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
                { name: "Flask", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
                { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
                { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
              ].concat([
                { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                { name: "PyTorch", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
                { name: "NumPy", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
                { name: "Pandas", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
                { name: "OpenCV", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
                { name: "FastAPI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
                { name: "Flask", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
                { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
                { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
              ]).map((icon, idx) => (
                <img 
                  key={`row1-${icon.name}-${idx}`} 
                  src={icon.url} 
                  alt={icon.name} 
                  title={icon.name}
                  className="hero__marquee-icon"
                />
              ))}
            </div>
          </div>

          {/* Row 2: Right Scrolling */}
          <div className="hero__marquee hero__marquee--right">
            <div className="hero__marquee-track">
              {[
                { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
                { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
                { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
                { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
                { name: "Playwright", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg" },
                { name: "Postman", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" }
              ].concat([
                { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
                { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
                { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
                { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
                { name: "Playwright", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg" },
                { name: "Postman", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" }
              ]).map((icon, idx) => (
                <img 
                  key={`row2-${icon.name}-${idx}`} 
                  src={icon.url} 
                  alt={icon.name} 
                  title={icon.name}
                  className="hero__marquee-icon"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div 
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, repeat: Infinity, repeatType: "reverse", duration: 2 }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 12L16 20L26 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Hero
