# Portfolio Website - ML Engineer & MLOps Specialist

A modern, production-grade portfolio website showcasing the transition from Mechanical Engineering to Machine Learning Engineering and MLOps.

## 🎯 Overview

This portfolio demonstrates **Systems Thinking for Machine Learning** through four comprehensive project case studies, each highlighting different aspects of production ML engineering:

- **Real-Time Fraud Detection** - Speed & Reliability
- **Scalable Recommendation Engine** - Distributed Scale
- **Enterprise LLM & RAG Platform** - GenAI Systems
- **Computer Vision for Edge** - Optimization

## 🚀 Features

- **Premium Dark Theme** with glassmorphism effects
- **Responsive Design** optimized for all devices
- **Interactive Project Modals** with detailed STAR-R breakdowns
- **Smooth Animations** and micro-interactions
- **Rotating Taglines** showcasing key competencies
- **Comprehensive Curriculum** with 117 MLOps modules
- **SEO Optimized** with proper meta tags and semantic HTML

## 🛠️ Technology Stack

- **HTML5** - Semantic structure
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** - No framework dependencies
- **Google Fonts** - Inter & JetBrains Mono

## 📁 File Structure

```
My-website/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with animations
├── script.js           # Interactive functionality
└── README.md           # This file
```

## 🎨 Design Philosophy

The website follows modern web design principles:

- **Vibrant Color Palette** - Purple/pink gradients with cyan accents
- **Glassmorphism** - Frosted glass effects with backdrop blur
- **Micro-animations** - Smooth transitions and hover effects
- **Typography** - Professional Inter font with JetBrains Mono for code
- **Dark Mode First** - Premium dark theme optimized for readability

## 📝 Customization Guide

### 1. Personal Information

Update the following in `index.html`:

- **Line 8**: Update the `<title>` tag with your name
- **Line 22-24**: Update the logo text
- **Line 42-44**: Update your name in the hero section
- **Lines 270-280**: Update contact links (email, LinkedIn, GitHub)

### 2. Professional Photo

Replace the SVG placeholder in the About section (around line 220) with:

```html
<img src="your-photo.jpg" alt="Your Name" class="profile-photo">
```

Add this CSS to `styles.css`:

```css
.profile-photo {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--border-color);
}
```

### 3. Resume PDF

- Create a PDF version of your resume
- Save it as `resume.pdf` in the same directory
- The download button is already configured (line 56)

### 4. Project Details

All project data is in `script.js` starting at line 76. Customize the `projectData` object with your actual project details, metrics, and reflections.

### 5. Skills & Technologies

Update the skills section in `index.html` (lines 180-250) to match your actual technology stack.

### 6. Curriculum Modules

Customize the curriculum modules in `index.html` (lines 255-265) to reflect your actual learning path and certifications.

## 🌐 Deployment Options

### Option 1: GitHub Pages (Free)

1. Create a GitHub repository
2. Push all files to the repository
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Vercel (Free)

1. Create a Vercel account
2. Import your GitHub repository
3. Deploy with one click
4. Custom domain support included

### Option 3: Netlify (Free)

1. Create a Netlify account
2. Drag and drop your folder
3. Instant deployment
4. Custom domain support included

## 🎯 Custom Domain Setup

For a professional look, register a custom domain:

1. Register `yourname.com` (recommended: Namecheap, Google Domains)
2. Configure DNS settings in your hosting platform
3. Update all references in the code

## ✅ Pre-Launch Checklist

- [ ] Replace all placeholder text with your information
- [ ] Add your professional photo
- [ ] Upload your resume PDF
- [ ] Update all contact links
- [ ] Customize project details with your actual work
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Check loading speed (should be <2s)
- [ ] Validate HTML/CSS (W3C Validator)
- [ ] Test in multiple browsers

## 🔧 Local Development

Simply open `index.html` in your browser. No build process required!

For a local server (recommended):

```bash
# Python 3
python -m http.server 8000

# Node.js (if installed)
npx serve

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📊 Performance Tips

- Images should be optimized (use WebP format)
- Keep total page size under 2MB
- Lazy load images if adding many
- Minify CSS/JS for production (optional)

## 🎨 Color Customization

All colors are defined as CSS variables in `styles.css` (lines 10-30). Modify these to match your personal brand:

```css
--accent-purple: #667eea;  /* Primary brand color */
--accent-pink: #f093fb;    /* Secondary accent */
--accent-cyan: #4facfe;    /* Tertiary accent */
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This template is free to use for your personal portfolio. Attribution appreciated but not required.

## 🤝 Support

For questions or issues:
- Review the customization guide above
- Check browser console for JavaScript errors
- Validate HTML/CSS syntax

---

**Built with precision engineering principles** ⚙️

*Remember: Your portfolio is a technical proof-of-concept for your engineering mindset. Every element demonstrates your understanding of systems, reliability, and production-grade quality.*
