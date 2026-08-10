import { motion } from 'framer-motion'
import './Projects.css'

function Projects() {
  const projects = [
    {
      id: 1,
      title: 'AI Voice Agent (Pipecat & FastAPI)',
      date: 'Jun 2026',
      description: 'A low-latency, real-time conversational AI voice agent built with FastAPI and Pipecat. Handles WebSocket-based duplex audio streams, Voice Activity Detection (VAD) via Silero, Automated Speech Recognition (ASR), Text-to-Speech (TTS), and LLM response handling. Configured with interruption filters and telephony-ready mu-law serialization for low-latency voice bot integrations.',
      tools: ['Python', 'FastAPI', 'Pipecat', 'WebSockets', 'ASR & TTS', 'LLMs', 'Docker'],
      link: '#/voice-agent',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M8 24 L24 8 L40 24 L24 40 Z" strokeLinejoin="round"/>
          <path d="M16 24 L24 16 L32 24 L24 32 Z" opacity="0.5" strokeLinejoin="round" strokeWidth="1.5"/>
          <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.8"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Production-Ready Local RAG Pipeline',
      date: 'Mar 2026',
      description: 'A secure, local Retrieval-Augmented Generation (RAG) pipeline for querying enterprise documents. Implements hybrid search (FAISS dense vector retrieval + BM25 sparse text search) coupled with local reranker models. Features document parser layers, scanned PDF OCR processing, and local LLM orchestration (Llama 3/Mistral via Ollama) with context relevance validation guardrails.',
      tools: ['Python', 'FastAPI', 'LLMs & Local Models', 'Ollama', 'Vector Databases', 'RAG Concepts', 'OpenCV', 'Docker'],
      link: '#/local-rag',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M24 8 L42 38 L6 38 Z" strokeLinejoin="round"/>
          <path d="M24 18 L34 35 L14 35 Z" opacity="0.5" strokeLinejoin="round" strokeWidth="1.5"/>
          <circle cx="24" cy="30" r="3" fill="currentColor" opacity="0.8"/>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Intelligent Document OCR Extraction Engine',
      date: 'Feb 2025',
      description: 'An asynchronous document processing pipeline designed to extract structured JSON data from unstructured invoices, receipts, and forms. Leverages local PaddleOCR models, regex-based extraction layers, and Pydantic schemas via Instructor/Outlines. Utilizes Celery and Redis to handle concurrent tasks asynchronously without system timeouts.',
      tools: ['Python', 'FastAPI', 'PaddleOCR', 'Doctr OCR', 'Redis', 'RegEx', 'PostgreSQL & MySQL', 'OpenCV', 'Docker'],
      link: '#/ocr-engine',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M24 8 L24 40 M8 24 L40 24 M12 12 L36 36 M12 36 L36 12" strokeLinecap="round"/>
          <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.8"/>
        </svg>
      )
    }
  ]

  return (
    <motion.section 
      id="projects" 
      className="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="projects__container">
        <div className="projects__header">
          <motion.h2 
            className="projects__title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            AI <span className="projects__title-accent">Projects.</span>
          </motion.h2>
          
          <a href="#/projects" className="projects__all-link" onClick={(e) => e.preventDefault()}>
            <span>ALL PROJECTS &rarr;</span>
          </a>
        </div>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project__card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -6 }}
            >
              {/* Card visual thumbnail with geometric icon */}
              <div className="project__thumb-container">
                <div className="project__thumb-noise"></div>
                <div className="project__thumb-icon">
                  {project.icon}
                </div>
              </div>

              <div className="project__content">
                <p className="project__date">{project.date}</p>
                <h3>{project.title}</h3>
                <p className="project__desc">{project.description}</p>
                
                <div className="project__tools">
                  {project.tools.map(tool => (
                    <span key={tool} className="project__tool-tag">{tool}</span>
                  ))}
                </div>

                <a href={project.link} className="project__case-btn">
                  <span>DETAILS &rarr;</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Projects
