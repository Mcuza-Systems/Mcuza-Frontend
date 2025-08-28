# MCUZA - AI-Powered Electronics Development Platform

![MCUZA Platform](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) ![Shadcn/UI](https://img.shields.io/badge/Shadcn_UI-000000)

MCUZA is a comprehensive AI-powered electronics development platform that helps engineers, hobbyists, and students build electronics projects faster and smarter. From embedded systems to FPGA workflows, MCUZA provides intelligent tools for rapid prototyping and development.

## 🚀 Features

### Core Products
- **Embedded Systems Tools**
  - Intelligent Drivers Generator
  - Smart HAL Synthesizer
  - Intelligent Protocol Generator
  - Firmware Snippet Generator
  - Porting Firmware for MCUs

- **Edge AI Solutions**
  - Smart Model Compression
  - EdgeAI Model Validator

- **FPGA Workflows**
  - HDL Code Generation & Optimization
  - BitStream Generation
  - Test Bench Automation

### Flagship Feature: Rapid Prototyping
**"One Prompt. Rapid Prototyping. Redefined."**
- Auto-generated production-ready firmware
- Complete Bill of Materials (BoM) with real-time pricing
- Professional-grade schematics
- From concept to prototype in minutes

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 🏁 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mcuza-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── pricing/           # Pricing page  
│   ├── rapid-prototyping/ # Rapid prototyping page
│   ├── signup/            # User registration
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage
├── components/            # Reusable components
│   ├── ui/               # Shadcn/UI components
│   ├── Header.tsx        # Main navigation
│   └── Footer.tsx        # Site footer
└── lib/                  # Utilities and helpers
    └── utils.ts          # Common utilities
```

## 🎨 Design System

The platform uses a modern, professional design system built on:

- **Typography**: Inter font family
- **Colors**: Zinc-based color palette with custom primary/secondary colors
- **Components**: Shadcn/UI for consistent, accessible components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Automatic system preference detection

## 📱 Pages & Features

### Homepage (`/`)
- Hero section with compelling value proposition
- Feature showcase with interactive tabs
- Product suite overview
- Testimonials and social proof
- Pricing preview
- Call-to-action sections

### Rapid Prototyping (`/rapid-prototyping`)
- Interactive demo with textarea input
- Step-by-step process explanation
- Sample project examples
- Feature benefits
- Output previews (firmware, schematics, BoM)

### About (`/about`)
- Company mission and vision
- Team member profiles
- Core values and milestones
- Technology highlights
- Platform statistics

### Pricing (`/pricing`)
- Three-tier pricing structure (Hobbyist, Professional, Enterprise)
- Feature comparison table
- Frequently asked questions
- Enterprise contact options

### Signup (`/signup`)
- User registration form
- Social login options (GitHub, Google)
- Feature benefits overview
- Terms and privacy links

## 🎯 Key Features Implemented

### ✅ Responsive Design
- Mobile-first responsive layout
- Optimized for all screen sizes
- Touch-friendly interactions

### ✅ Modern UI/UX
- Clean, professional design
- Smooth animations and transitions
- Intuitive navigation
- Accessible components

### ✅ Performance Optimized
- Next.js 15 with App Router
- Optimized images and fonts
- Minimal bundle size
- Fast loading times

### ✅ SEO Ready
- Semantic HTML structure
- Meta tags and descriptions
- Open Graph tags
- Structured markup ready

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

The platform is ready to deploy to:
- Vercel (recommended for Next.js)
- Netlify
- Railway
- Any Node.js hosting provider

## 🔧 Customization

### Adding New Pages
1. Create new directory in `src/app/`
2. Add `page.tsx` file
3. Update navigation in `Header.tsx`

### Modifying Styles
- Edit Tailwind configuration in `tailwind.config.ts`
- Update global styles in `src/app/globals.css`
- Customize component styles using Tailwind classes

### Adding Components
- Create new components in `src/components/`
- Use Shadcn/UI for consistent styling
- Follow existing patterns for props and structure

## 📊 Performance

The platform is optimized for:
- **Core Web Vitals**: Excellent scores across all metrics
- **Bundle Size**: Minimal JavaScript for fast loading
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO**: Perfect structure for search engines

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## 📄 License

This project is proprietary software for MCUZA platform.

## 📞 Support

For support and inquiries:
- Email: support@mcuza.com
- Website: https://mcuza.com
- Documentation: https://docs.mcuza.com

---

**Built with ❤️ for the electronics community**
