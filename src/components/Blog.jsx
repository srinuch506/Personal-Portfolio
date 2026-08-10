import { motion } from 'framer-motion'
import './Blog.css'

const posts = [
  {
    id: 1,
    title: 'Optimizing Real-time Audio Streams for Low-Latency Voice Agents',
    date: 'July 2026',
    category: 'Voice Bots',
    readTime: '6 min read',
    excerpt: 'How we reduced conversational latency to sub-800ms using FastAPI WebSockets, Silero VAD interruption buffers, and PCM stream chunking on local Llama models.',
    content: 'Duplex audio streaming requires asynchronous frames orchestration to prevent lag. In this post, we discuss how we configured event-driven interruption signals to cancel pending asyncio tasks and clear client audio buffers within milliseconds when user speech starts.'
  },
  {
    id: 2,
    title: 'Dense vs Sparse: Hybrid Vector Search Tuning in Local RAG',
    date: 'May 2026',
    category: 'RAG Systems',
    readTime: '8 min read',
    excerpt: 'Exploring the engineering decisions of fusing dense vector similarity queries (FAISS) with sparse full-text keyword indexing (MySQL/PgSQL) for high-recall Q&A.',
    content: 'Pure semantic search often misses keyword matches like invoice IDs or serial codes. We show how fusing dense retrieval outputs (70% weight) with sparse database indexes (30% weight) provides a higher retrieval recall rate than either system alone.'
  },
  {
    id: 3,
    title: 'Layout-Aware OCR Preprocessing using OpenCV Contours',
    date: 'March 2026',
    category: 'Computer Vision',
    readTime: '5 min read',
    excerpt: 'Isolating separate text columns, bounding box grids, and morphological deskewing rules in OpenCV to maximize character recognition in PaddleOCR.',
    content: 'Scanned invoices and receipts often suffer from faded text, tilt, and multi-column overlaps. We walk through applying adaptive Gaussian thresholds and kernel morphology to restore character contours before layout extraction.'
  }
]

function Blog() {
  return (
    <motion.div 
      className="blog-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="blog-view__hero">
        <div className="blog-view__hero-background">
          <div className="blog-view__hero-glow blog-view__hero-glow--1"></div>
          <div className="blog-view__hero-glow blog-view__hero-glow--2"></div>
        </div>
        
        <div className="blog-view__hero-container">
          <motion.h1 
            className="blog-view__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            My <span className="blog-view__title-accent">Blog.</span>
          </motion.h1>
          <motion.p 
            className="blog-view__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Technical deep-dives on building voice agents, RAG pipelines, and applied LLM workflows.
          </motion.p>
        </div>
      </section>

      <section className="blog-view__posts">
        <div className="blog-view__posts-container">
          <div className="blog-view__grid">
            {posts.map((post, idx) => (
              <motion.article 
                key={post.id}
                className="blog-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
              >
                <div className="blog-card__header">
                  <span className="blog-card__category">{post.category}</span>
                  <span className="blog-card__meta">{post.date} &bull; {post.readTime}</span>
                </div>
                <h2 className="blog-card__title">{post.title}</h2>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <div className="blog-card__body-preview">
                  <p>{post.content}</p>
                </div>
                <div className="blog-card__footer">
                  <span className="blog-card__read-more">DRAFT ARTICLE</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Blog
