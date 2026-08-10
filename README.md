# Portfolio - Srinivasarao Cherukupalli

A modern, responsive portfolio website showcasing AI engineering projects, skills, and contact information.

## 🎯 Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Axios** - HTTP client

## 📁 Project Structure

```
portfolio/
├── src/                      # React components & code
│   ├── components/           # UI elements (Header, Hero, About, etc.)
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/                   # Public assets (Resume, Profile Picture, etc.)
├── package.json              # npm scripts and packages
├── vite.config.js            # Vite configuration
└── .env                      # Formspree endpoint config
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Run

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory with your Formspree endpoint:
   ```text
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id_here
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

5. **Build for Production**
   ```bash
   npm run build
   ```

## 📧 Contact Integration

The contact form is activated using [Formspree](https://formspree.io). Form submissions are sent directly to your configured email inbox. Ensure that your form endpoint is specified in your `.env` file.

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 👨‍💻 Author

Srinivasarao Cherukupalli - AI Engineer
