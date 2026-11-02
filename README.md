# Personal Motion & 3D Portfolio

An ultra-modern, award-winning-style personal portfolio website built with **React**, **Vite**, **GSAP**, **Lenis**, and **WebGL**, inspired by [roofstudio.tv](https://roofstudio.tv/work).

---

## 🚀 Quick Start

The development server is already configured and running. You can start it anytime with:

```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

To create an optimized production build:
```bash
npm run build
```

---

## 🎨 How to Customize Your Info & Work

Everything is centralized in a **single file** so you don't have to touch complex code:

📁 **[src/data/site.js](file:///Users/sattya/Desktop/portfolio/src/data/site.js)**

### 1. Update Your Name, Bio & Socials
Open `src/data/site.js` and edit the `profile` object:
- `firstName` & `lastName`: Your real name (used in the hero, preloader, footer, etc.)
- `initials`: Shown in the circular header logo (e.g. `'YN'`)
- `role`: Your title (e.g. `'Motion Designer & 3D Artist'`)
- `roles`: Words that cycle in the hero headline (e.g. `['Motion', '3D', 'Animation', 'Direction']`)
- `location` & `timezone`: Your city and timezone for the live header clock (e.g. `'Phnom Penh, KH'`, `'Asia/Phnom_Penh'`)
- `email`: Your email address for the contact form and click-to-copy button
- `available`: `true` for green pulsing dot / open for work, `false` for booked
- `bio` & `stats`: Paragraphs and experience numbers

### 2. Upload Your Work (Images & Videos)
Put your media files inside the **`public/`** folder:
```
public/
  work/
    project-1/
      cover.webp
      preview.mp4
      still-1.webp
      still-2.webp
```

Then in `src/data/site.js`, inside `projects`:
```javascript
{
  slug: 'my-project-title',
  title: 'My Project Title',
  client: 'Nike / Apple / Studio Name',
  year: 2026,
  disciplines: ['3D', 'Art Direction'],     // Matches filter tags
  industries: ['Fashion', 'Technology'],     // Matches industry filter
  color: '#c6ff3d',                         // Accent color on hover & cursor
  palette: ['#c6ff3d', '#7b5cff', '#0f0f12'], // WebGL shader reaction colors
  cover: '/work/project-1/cover.webp',      // Image path in public/
  video: '/work/project-1/preview.mp4',     // Video played on hover (optional)
  gallery: [
    '/work/project-1/still-1.webp',
    '/work/project-1/still-2.webp',
  ],
  summary: 'One punchy sentence describing the project.',
  description: 'Full story, challenges, and creative solutions.',
  credits: [
    ['Client', 'Nike'],
    ['Role', 'Lead 3D & Animation'],
    ['Tools', 'Cinema 4D, Octane, After Effects'],
  ],
}
```

> **Note on Generative Art:** If you haven't uploaded an image or video yet (`cover: ''`), the card automatically generates an animated CSS generative art piece matching that project's palette (`orb`, `rings`, `grid`, `blobs`, `stripes`, or `conic`) so your site always looks complete!

---

## ⚡ Features Included

- **WebGL Interactive Shader Background**: Smooth fluid noise that follows mouse movement and shifts color to match whatever project you hover over.
- **Custom Adaptive Cursor**: Tracks physics, squashes/stretches with velocity, and blooms into a colored disc with labels ("View", "Open", "Say hi") over interactive elements.
- **Roof Studio-style "Show Me" Filter Sentence**: Filter by Discipline and Industry with smooth dropdown menus and live counter.
- **Grid / List View Toggle**:
  - **Grid**: 2-column offset layout with scroll parallax.
  - **List**: High-density typography list with floating, tilting cursor-tracking preview cards.
- **Full-Screen Circular Wipe Menu**: Circular expansion with animated typography and live preview gradients.
- **3-Panel Liquid Page Transitions**: Seamless route changes with animated color sweeps.
- **Sticky Stacking Cards**: Selected works stack on top of each other with brightness and scale depth effects on scroll.
- **Horizontal Services Rail**: Smooth horizontal scrolling track pinned during scroll on desktop.
- **Live Local Time**: Accurately shows your timezone time in real time with active pulsing status dot.
- **Interactive Contact Page**: Chip selectors for project type and budget, floating-label fields, and mailto generation.
