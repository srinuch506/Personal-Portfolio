import { motion } from 'framer-motion'
import './ProjectCaseStudy.css'

const projectData = {
  'voice-agent': {
    title: 'AI Voice Agent (Pipecat & FastAPI)',
    subtitle: 'Real-time duplex conversational voice bot designed for low-latency call center automation.',
    quote: 'Upload your telephony schema and run duplex voice agents. The bot orchestrates audio input streaming, automated speech recognition (ASR), local large language model inference, text-to-speech (TTS) output synthesis, and playback in real-time.',
    overview: 'Developed a high-performance, duplex conversational AI voice agent. The system orchestrates raw audio input streaming, automated speech recognition, local reasoning model inference, and voice output generation. Using FastAPI WebSockets for connection management and Pipecat as the framing pipeline, it reduces voice bot response latency below 800ms, creating a human-like conversational experience.',
    role: 'Associate AI Engineer (Real-time Audio Streaming, WebSockets, & Pipecat pipeline)',
    context: 'VMax e-Solutions Pvt. Ltd (Collaborative Team Project)',
    features: [
      {
        title: 'Full-Duplex Audio Streaming',
        desc: 'Utilizes FastAPI WebSockets to stream raw PCM audio bidirectionally, bypassing standard HTTP request/response bottlenecks.'
      },
      {
        title: 'Asynchronous Pipecat Pipelines',
        desc: 'Employs Pipecat to construct an event-driven framing loop where audio frames, transcripts, and LLM tokens flow concurrently.'
      },
      {
        title: 'Silero VAD & Interruption Handling',
        desc: 'Integrates local Voice Activity Detection (VAD) to determine when the user begins speaking, instantly flushing playback buffers.'
      },
      {
        title: 'Telephony-Ready Integration',
        desc: 'Engineered custom serialization wrappers to support Twilio Media Streams format (8kHz, 8-bit, mu-law audio) over VoIP/SIP.'
      },
      {
        title: 'Dockerized MLOps Setup',
        desc: 'Configured multi-stage Docker builds to package speech models and dependencies for streamlined pipeline deployment.'
      }
    ],
    challenges: [
      {
        title: 'Challenge: Accumulating API Latency',
        desc: 'Combining ASR, LLM reasoning, and TTS synthesis sequentially can cause an awkward 2-3 second pause in conversation, making interactions feel unnatural.'
      },
      {
        title: 'Solution: Token Streaming & Asynchronous PIPING',
        desc: 'Implemented token-level streaming. Instead of waiting for the LLM to output its full response, individual text tokens are piped to the TTS generator immediately. Audio chunks are sent to the client dynamically as they are generated, dropping response lag to sub-800ms.'
      },
      {
        title: 'Challenge: Interruption Lag & Playback Overlap',
        desc: 'If the user speaks over the bot while it is playing audio, the bot keeps speaking its queued sentence, causing confusing conversational overlaps.'
      },
      {
        title: 'Solution: Asyncio Execution Loop Flushing',
        desc: 'Programmed interruption filters. When the client-side VAD detects speech, it fires a cancel event through the asyncio execution loop. This immediately flushes the audio buffer, terminates the pending LLM stream task, and resets the TTS player in under 100ms.'
      }
    ],
    tools: ['Python', 'FastAPI', 'Pipecat', 'WebSockets', 'ASR & TTS', 'LLMs', 'Docker'],
    image: './ai_voice_agent.png'
  },
  'local-rag': {
    title: 'Enterprise Local RAG Pipeline',
    subtitle: 'Secure, local Retrieval-Augmented Generation system for querying unstructured corporate knowledge.',
    quote: 'Upload your company files once, then query them on-premises. The system splits files, indexes vector embeddings, and performs semantic question-answering with page-level citations.',
    overview: 'Designed and deployed an on-premises Retrieval-Augmented Generation (RAG) pipeline optimized for high-security enterprise environments. The pipeline parses scanned and text-based documents locally, generates vector embeddings, stores them in vector databases, and runs semantic question answering against local models (Llama 3/Mistral via Ollama) without exposing data to external APIs.',
    role: 'Associate AI Engineer (Document Parsing, OCR Layers, and Local Vector Ingestion)',
    context: 'VMax e-Solutions Pvt. Ltd (Collaborative Team Project)',
    features: [
      {
        title: 'Privacy-First Architecture',
        desc: 'Self-contained deployment running entirely on-premises, ensuring zero leaks of sensitive document data.'
      },
      {
        title: 'OpenCV-Driven Image Processing',
        desc: 'Ingests scanned documents and applies perspective corrections, threshold filtering, and character sharpening.'
      },
      {
        title: 'Dual-Engine Layout Parsing',
        desc: 'Uses local PaddleOCR and Doctr models to parse multi-column scanned PDFs and convert tables into markdown blocks.'
      },
      {
        title: 'Hybrid Vector Search',
        desc: 'Fuses dense vector similarity queries (FAISS) with sparse full-text keyword searches to maximize recall.'
      },
      {
        title: 'Hallucination Mitigation Guardrails',
        desc: 'Validates chunk context similarity scores against thresholds to prevent the model from answering out-of-scope queries.'
      }
    ],
    challenges: [
      {
        title: 'Challenge: Scanned Document Layout Distortion',
        desc: 'Standard OCR parsers lose column layouts and table grids when extracting text, destroying semantic relationships and leading to garbled database chunks.'
      },
      {
        title: 'Solution: OpenCV Bounding Box Isolation',
        desc: 'Implemented layout-aware processing. OpenCV isolates separate column bounds and table borders before running character extraction. PaddleOCR is then guided to extract text in natural reading order, preserving document layout structures.'
      },
      {
        title: 'Challenge: Query Hallucinations',
        desc: 'LLMs attempt to answer user queries using their pre-trained weights even when the context is missing, causing hallucinations.'
      },
      {
        title: 'Solution: Strict Grounding Checks',
        desc: 'Implemented prompt constraints and vector score evaluation. If retrieval similarity drops below 0.65, the RAG loop bypasses LLM inference and returns a standardized "I do not have enough information in the documents" response.'
      }
    ],
    tools: ['Python', 'FastAPI', 'LLMs & Local Models', 'Ollama', 'Vector Databases', 'RAG Concepts', 'OpenCV', 'Docker'],
    image: './local_rag.png'
  },
  'ocr-engine': {
    title: 'Intelligent Document OCR Extraction Engine',
    subtitle: 'Asynchronous document processing pipeline built to parse scans and extract structured JSON grids.',
    quote: 'Ingest raw scanned invoices, tax documents, or receipts, and convert them asynchronously into clean, validated JSON schemas mapped to relational databases.',
    overview: 'Developed an asynchronous image extraction (OCR) and data parsing system designed to process complex scanned files. Powered by FastAPI endpoints and Redis queues, it processes uploads asynchronously, cleans faded scanned text, structures unstructured text via Coordinate RegEx patterns, and logs validated data into relational SQL storage.',
    role: 'Software Intern / Python Developer (FastAPI Endpoints, RegEx Post-Processing, SQL Pipelines)',
    context: 'Staffbee Solutions / Codegnan IT (Collaborative Development Project)',
    features: [
      {
        title: 'Asynchronous Queue Processing',
        desc: 'FastAPI background task runners integrated with Redis status trackers handle document queues without gateway timeouts.'
      },
      {
        title: 'Morphological Preprocessing',
        desc: 'Cleans low-contrast document images using OpenCV threshold filters, kernel dilations, and noise removal.'
      },
      {
        title: 'Coordinate RegEx Extraction',
        desc: 'Coordinates-based text bounding box tracking matched against RegEx schemas to parse keys like invoice totals and tax IDs.'
      },
      {
        title: 'Relational DB Pipelines',
        desc: 'Saves validated JSON extractions directly into relational PostgreSQL and MySQL schemas for immediate reporting.'
      },
      {
        title: 'Docker Deployment',
        desc: 'Packaged into containerized microservices supporting GPU pass-through configurations to accelerate OCR runs.'
      }
    ],
    challenges: [
      {
        title: 'Challenge: Bulky Multi-Page PDF Timeouts',
        desc: 'Uploading and parsing multi-page files synchronously blocks HTTP processes, exceeding client timeouts and crashing the server.'
      },
      {
        title: 'Solution: Redis-Backed Queue Offloading',
        desc: 'Designed an asynchronous queue model. Uploads instantly trigger a 202 Accepted return code containing a task UUID. Tasks are pushed to background queues and tracked in Redis, allowing clients to poll job status.'
      },
      {
        title: 'Challenge: Parsing Faded and Low-Contrast Scans',
        desc: 'Receipts or old invoices with faded print result in high character error rates during character extraction.'
      },
      {
        title: 'Solution: Morphological OpenCV Filters',
        desc: 'Designed adaptive Gaussian thresholding and kernel Morphological dilation. This enhances character thickness and sharpens text contours prior to OCR execution, raising character accuracy by over 30%.'
      }
    ],
    tools: ['Python', 'FastAPI', 'PaddleOCR', 'Doctr OCR', 'Redis', 'RegEx', 'PostgreSQL & MySQL', 'OpenCV', 'Docker'],
    image: './ocr_engine.png'
  }
}

function ProjectCaseStudy({ projectId }) {
  const project = projectData[projectId]

  if (!project) {
    return (
      <div className="case-study__error">
        <h2>Case Study Not Found</h2>
        <a href="#/" className="btn-primary">Go Back Home</a>
      </div>
    )
  }

  return (
    <motion.div 
      className="case-study"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="case-study__hero">
        <div className="case-study__hero-background">
          <div className="case-study__hero-glow case-study__hero-glow--1"></div>
          <div className="case-study__hero-glow case-study__hero-glow--2"></div>
        </div>
        
        <div className="case-study__hero-container">
          <motion.h1 
            className="case-study__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {project.title}
          </motion.h1>
          <motion.p 
            className="case-study__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {project.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="case-study__details">
        <div className="case-study__details-container">
          <div className="case-study__grid">
            {/* Left Column: Description & Case Outline */}
            <motion.div 
              className="case-study__main"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h2 className="case-study__section-title">Project Overview</h2>
              <p className="case-study__overview-text">{project.overview}</p>
              
              <hr className="case-study__divider" />

              <h2 className="case-study__section-title">Key Features</h2>
              <div className="case-study__breakdown">
                {project.features.map((feature, index) => (
                  <div key={index} className="case-study__detail-item">
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </div>
                ))}
              </div>

              <hr className="case-study__divider" />

              <h2 className="case-study__section-title">Technical Challenges & Solutions</h2>
              <div className="case-study__breakdown" style={{ marginTop: '1.5rem' }}>
                {project.challenges.map((challenge, index) => (
                  <div 
                    key={index} 
                    className="case-study__detail-item"
                    style={{ borderLeftColor: index % 2 === 0 ? 'var(--accent-purple)' : 'var(--accent-cyan)' }}
                  >
                    <h3>{challenge.title}</h3>
                    <p>{challenge.desc}</p>
                  </div>
                ))}
              </div>

              <p className="case-study__footer-text">
                *Note: This system was deployed as a proprietary solution for corporate client operations, hence its source repository and live urls are kept private.*
              </p>
            </motion.div>

            {/* Right Column: Tools Used & Links */}
            <motion.div 
              className="case-study__sidebar"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="case-study__card">
                <h2 className="case-study__section-title">Project Metadata</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>My Role:</strong>
                    <span style={{ color: 'var(--text-secondary)', lineHeight: '1.5', display: 'block' }}>{project.role}</span>
                  </div>
                  <div className="case-study__meta-item">
                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>Context:</strong>
                    <span style={{ color: 'var(--text-secondary)', display: 'block' }}>{project.context}</span>
                  </div>
                  <div className="case-study__meta-item">
                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>Codebase Status:</strong>
                    <span style={{ color: 'var(--accent-purple)', fontStyle: 'italic', display: 'block' }}>Proprietary (Confidential)</span>
                  </div>
                </div>
              </div>

              <div className="case-study__card">
                <h2 className="case-study__section-title">Tools Used</h2>
                <div className="case-study__tools">
                  {project.tools.map((tool) => (
                    <span key={tool} className="case-study__tool-badge">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {project.image && (
                <div className="case-study__card case-study__image-card">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="case-study__sidebar-image"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default ProjectCaseStudy
