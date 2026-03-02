# Wiser Enterprise Ltd. Official Website

A professional B2B website for Wiser Enterprise Ltd., a leading ODM/OEM manufacturer specializing in knitwear and accessories.

## 🚀 Live Preview

The development server is running at: **http://localhost:5173/**

## 📋 Project Overview

This website showcases Wiser Enterprise's:
- Company history and capabilities (established 2006)
- Global manufacturing footprint (China & Southeast Asia)
- International certifications (PVH, SGS, WRAP)
- Client success stories and case studies
- Contact form for business inquiries

## 🛠️ Tech Stack

- **Frontend Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router
- **Icons**: Lucide React
- **Form Handling**: Formspree (to be configured)
- **Deployment**: Vercel (recommended)

## 🎨 Design System

### Colors
- **Primary**: Navy Blue (#102a43)
- **Accent**: Bronze (#a88e72)
- **Background**: Slate-50 (#f8fafc)

### Typography
- **Font Family**: Inter, system-ui
- **Style**: Minimalist, professional, international

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 TODO: Content Updates

### 1. Replace Placeholder Images
Add your actual images to these locations:
- Factory photos: `/public/images/factories/`
- Product photos: `/public/images/products/`
- Client logos: `/public/logos/`

### 2. Configure Formspree
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Replace `YOUR_FORMSPREE_ID` in `src/pages/Contact.jsx` with your actual Form ID

### 3. Update Company Data
Edit `src/data/companyData.js` to update:
- Contact information
- Case studies details
- Additional certifications
- More client logos

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Vercel will automatically detect and deploy the React app

## 📧 Contact Form Setup

To enable the contact form:

1. **Create Formspree Account**:
   - Go to https://formspree.io
   - Sign up for a free account
   - Create a new form

2. **Get Your Form ID**:
   - Your form URL will look like: `https://formspree.io/f/your-form-id`
   - Copy the form ID

3. **Update Contact Page**:
   - Open `src/pages/Contact.jsx`
   - Replace `YOUR_FORMSPREE_ID` with your actual Form ID

## 📞 Support

For questions or updates:
- Email: Yifan@Wisor.co

---

**Built with ❤️ for Wiser Enterprise Ltd.**
