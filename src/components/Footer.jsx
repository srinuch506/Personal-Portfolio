import { motion } from 'framer-motion'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="footer__container">
        <div className="footer__grid">
          {/* Left Column: Brand & Bio */}
          <div className="footer__brand-col">
            <h3 className="footer__logo">SC<span className="logo__dot">.</span></h3>
            <p className="footer__bio">
              AI Engineer, building production AI systems: voice agents, local RAG pipelines, and applied LLM workflows.
            </p>
            <a href="mailto:srinivasaraoch506@gmail.com" className="footer__email-link">
              srinivasaraoch506@gmail.com
            </a>
          </div>

          {/* Right Column: Links Grid */}
          <div className="footer__links-grid">
            <div className="footer__links-col">
              <h4>NAVIGATION</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer__links-col">
              <h4>CONNECT</h4>
              <ul>
                <li><a href="https://github.com/srinuch506" target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/srinivasarao-cherukupalli-34a844240" target="_blank" rel="noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright & quick links */}
        <div className="footer__bottom">
          <div className="footer__copyright">
            &copy; {currentYear} Srinivasarao Cherukupalli
          </div>
          <div className="footer__quick-links">
            <a href="https://github.com/srinuch506" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/srinivasarao-cherukupalli-34a844240" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:srinivasaraoch506@gmail.com">srinivasaraoch506@gmail.com</a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
