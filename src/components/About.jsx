import { motion } from 'framer-motion'
import './About.css'

function About() {
  const skills = [
    'Python',
    'FastAPI',
    'Pipecat (AI Voice Agents)',
    'RAG Concepts',
    'LLMs & Local Models',
    'Vector Databases',
    'ASR & TTS (Speech/Text)',
    'OCR (PaddleOCR & Doctr)',
    'OpenCV',
    'Playwright (Web Scraping)',
    'Redis',
    'Docker',
    'PostgreSQL & MySQL',
    'REST APIs',
    'Git & GitHub',
    'PyTorch',
    'Flask',
    'HTML, CSS & JS',
    'Pandas & NumPy',
    'scikit-learn',
    'Prompt Engineering',
    'RegEx',
    'Machine Learning',
    'Postman'
  ]

  return (
    <motion.section 
      id="about" 
      className="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="about__container">
        <motion.h2 
          className="about__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          About <span className="about__title-accent">Me.</span>
        </motion.h2>
        
        <div className="about__content">
          <motion.div 
            className="about__main"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3>Get to know me!</h3>
            <p>
              I'm a <strong>Associate AI Engineer </strong> specializing in end-to-end AI Voice Agents, RAG pipelines, and automated workflows using FastAPI, LLMs, and modern ML toolchains.
            </p>
            <p>
              <strong>Core Expertise</strong>
            </p>
            <ul className="about__experience-list">
              <li>
                <strong>AI Voice Agents & RAG</strong>: Building conversational voice bots with local LLMs, Pipecat, telephony integrations (Twilio, SIP), and vector database-backed RAG systems.
              </li>
              <li>
                <strong>OCR & Automation</strong>: Deploying local OCR models (PaddleOCR, Doctr) for structured data extraction and building robust automation frameworks with Playwright.
              </li>
              <li>
                <strong>Backend & MLOps</strong>: Managing SQL/NoSQL databases and containerizing applications using Docker.
              </li>
            </ul>
            <p>
              <strong>Career Aspiration</strong><br/>
              Seeking an Associate AI Engineer role to contribute to innovative AI and Python projects in a dynamic environment.
            </p>
            <div className="about__cta" style={{ marginTop: '2rem' }}>
              <a href="./Srinivas_AI_Engineer.pdf" download className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="about__skills"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3>My Skills</h3>
            <div className="skills__list">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="skill__badge"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.03 }}
                  whileHover={{ scale: 1.08 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default About
