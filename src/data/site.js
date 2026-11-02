/* ==========================================================================
   SITE CONTENT — edit everything in this file to make the portfolio yours.
   --------------------------------------------------------------------------
   • Put your media files inside /public/work/<anything>.jpg|.png|.webp|.mp4
     and reference them like:  cover: '/work/my-project/cover.jpg'
   • If a project has no `cover`, a generative animated artwork is shown
     (pick a style with `art`: 'orb' | 'rings' | 'grid' | 'stripes' | 'blobs' | 'conic').
   • `video` (optional) plays on hover over the card, and as the project hero.
   ========================================================================== */

export const profile = {
  firstName: 'Sot',
  lastName: 'Noreaksattya',
  // What people call you — used for the big name moments (preloader, footer, about)
  nickname: 'Sattya',
  // Short brand mark shown in the header
  initials: 'SN',
  role: 'Software Engineer',
  // Words that rotate in the home hero ("building ___")
  roles: ['Frontend', 'Backend', 'UX/UI', 'Next.js', 'C / C++', 'MySQL'],
  location: 'Phnom Penh, KH',
  timezone: 'Asia/Phnom_Penh',
  email: 'lilsyaz2004@gmail.com',
  phone: '',
  available: true,
  intro:
    'Software engineer who designs and builds digital products end to end — from pixel-perfect interfaces in React & Next.js to robust backend systems with Express, C++, MySQL, and Docker.',
  bio: [
    "I'm Sattya — a software engineer who lives where clean design meets robust engineering. I architect user interfaces in Figma, bring them to life with React and Next.js, and build solid backends with Express, MySQL, C/C++, and Docker.",
    'With a strong foundation in Object-Oriented Programming (OOP) and full-stack development, I focus on building software that is fast, maintainable, and delightful to use.',
  ],
  portrait: '', // e.g. '/me.jpg'  (leave empty for a generative portrait)
  resume: '', // e.g. '/resume.pdf'
  stats: [
    { value: 3, suffix: '+', label: 'Years writing code' },
    { value: 20, suffix: '+', label: 'Projects shipped' },
    { value: 13, suffix: '', label: 'Core technologies' },
    { value: 100, suffix: '%', label: 'Pixel & code precision' },
  ],
  services: [
    {
      title: 'Frontend Development',
      text: 'Responsive, accessible, and fast web applications using JavaScript, React, Next.js, HTML5, and CSS3.',
    },
    {
      title: 'Backend & Systems',
      text: 'RESTful APIs with Express.js, low-level programming in C and C++, and solid Object-Oriented (OOP) architectures.',
    },
    {
      title: 'Database & Environment',
      text: 'Relational database schema design in MySQL, local development with MAMP, and containerization using Docker.',
    },
    {
      title: 'UX/UI & Product Design',
      text: 'End-to-end design from user flows to high-fidelity clickable prototypes and design systems in Figma.',
    },
  ],
  // All core technologies requested by user
  stack: [
    'JavaScript',
    'React',
    'Next.js',
    'HTML5',
    'CSS3',
    'Express.js',
    'C',
    'C++',
    'OOP',
    'Docker',
    'Figma',
    'MySQL',
    'MAMP',
    'Vercel',
    'GitHub',
    'Jira',
    'Telegram',
  ],
  tagline: 'Designing & engineering for the web',
}

// Categorized technologies for structured showcase
export const techCategories = [
  {
    category: 'Frontend Development',
    icon: '01',
    summary: 'Modern reactive interfaces, SSR/SSG web applications, and responsive layout styling.',
    skills: ['JavaScript (ES6+)', 'React', 'Next.js', 'HTML5', 'CSS3'],
  },
  {
    category: 'Backend & Systems',
    icon: '02',
    summary: 'Server APIs, data structures, algorithm logic, and low-level memory & systems programming.',
    skills: ['Express.js', 'C', 'C++', 'OOP (Object-Oriented Programming)'],
  },
  {
    category: 'Database & Environment',
    icon: '03',
    summary: 'Relational data modeling, query optimization, local server stacks, and containerized workflows.',
    skills: ['MySQL', 'MAMP', 'Docker'],
  },
  {
    category: 'UX/UI & Product Design',
    icon: '04',
    summary: 'User research, wireframing, component-driven design systems, and rapid prototyping.',
    skills: ['Figma', 'UI/UX Design', 'Wireframing', 'Design Systems'],
  },
  {
    category: 'Deployment & Cloud Hosting',
    icon: '05',
    summary: 'Continuous deployment, production serverless builds, and cloud release automation.',
    skills: ['Vercel', 'GitHub Pages / Actions', 'Docker'],
  },
  {
    category: 'Team Collaboration & Agile',
    icon: '06',
    summary: 'Git version control, agile project management, sprint issue tracking, and real-time team communication.',
    skills: ['GitHub', 'Jira', 'Telegram', 'Agile / Scrum'],
  },
]

export const socials = [
  { label: 'GitHub', url: 'https://github.com/Lilsyaz45' },
  { label: 'LinkedIn', url: 'https://linkedin.com/' },
  { label: 'Telegram', url: 'https://t.me/' },
  { label: 'Email', url: 'mailto:lilsyaz2004@gmail.com' },
]

// Filter groups shown on the Work page. Each project lists matching values.
export const disciplines = ['Full-stack', 'Frontend', 'Backend', 'Database', 'UX/UI']
export const industries = ['Education', 'Gaming & EdTech', 'Entertainment', 'Food & Hospitality', 'Agency & Tech', 'Web App']

export const projects = [
  {
    slug: 'zinko',
    title: 'Zinko Games',
    client: 'Full-Stack Gamified Platform',
    year: 2025,
    link: 'https://zinko.games',
    disciplines: ['Full-stack', 'Frontend', 'Backend', 'Database', 'UX/UI'],
    industries: ['Education', 'Gaming & EdTech', 'Web App'],
    color: '#6c5ce7',
    palette: ['#6c5ce7', '#00cec9', '#0d0826'],
    art: 'rings',
    ratio: 0.52,
    featured: true,
    flagship: true,
    cover: '/work/zinko/cover.jpg',
    video: '',
    summary: 'Flagship full-stack multiplayer quiz platform turning classrooms into high-energy cosmic games — live in production at zinko.games.',
    description:
      'Zinko is my flagship full-stack web application designed and engineered end-to-end. It features a complete architecture across all layers: bespoke UI/UX design and cosmic space illustrations crafted in Figma, a high-performance reactive frontend in React, real-time matchmaking game server in Express.js with WebSocket sync, and a normalized MySQL relational database managed with MAMP and Docker. Teachers can host live rooms, author custom quizzes, and view analytics while students compete live on cosmic leaderboards.',
    credits: [
      ['Live Platform', 'https://zinko.games'],
      ['Project Scope', 'Full-stack (Frontend, Backend, Database, UX/UI)'],
      ['Frontend', 'React, Next.js, Modern JavaScript, CSS3'],
      ['Backend & Realtime', 'Express.js, Node.js, WebSockets (Live Lobbies & Matchmaking)'],
      ['Database', 'MySQL (Relational Question Banks, Sessions, User Scores)'],
      ['Infra & Environment', 'Docker, MAMP, Vercel'],
      ['UI/UX Design', 'Figma (Design System, Space Characters, Prototyping)'],
    ],
    gallery: [
      '/work/zinko/cover.jpg',
    ],
  },
  {
    slug: 'naekwatch',
    title: 'NAEKWATCH',
    client: 'Cinema & Streaming Platform',
    year: 2026,
    disciplines: ['Frontend', 'UX/UI'],
    industries: ['Entertainment', 'Web App'],
    color: '#ff3b30',
    palette: ['#ff3b30', '#ff6b4a', '#0f0a0c'],
    art: 'grid',
    ratio: 0.62,
    featured: true,
    cover: '/work/naekwatch/cover.jpg',
    video: '',
    summary: 'A cinema streaming platform featuring multi-device responsive design, instant search, and bilingual Khmer-English navigation.',
    description:
      'NAEKWATCH is an on-demand video streaming platform designed for movie lovers. The experience delivers responsive layouts optimized from 27-inch desktop monitors down to mobile viewports. Key features include an interactive search modal with live auto-complete, curated watchlists, movie trailer previews, and bilingual support.',
    credits: [
      ['Platform', 'Web / Multi-device'],
      ['Role', 'UX/UI Design & Frontend Development'],
      ['Stack', 'React, Next.js, CSS3, JavaScript, Figma'],
    ],
    gallery: [
      '/work/naekwatch/screen.jpg',
      '/work/naekwatch/cover.jpg',
    ],
  },
  {
    slug: 'mojo-steak',
    title: 'MOJO Steakhouse',
    client: 'Culinary & Fine Dining',
    year: 2025,
    disciplines: ['Frontend', 'UX/UI'],
    industries: ['Food & Hospitality', 'Web App'],
    color: '#d49b43',
    palette: ['#d49b43', '#f5e1b5', '#1a1309'],
    art: 'orb',
    ratio: 0.52,
    featured: true,
    cover: '/work/mojo-steak/cover.jpg',
    video: '',
    summary: 'An editorial culinary web experience with typography-led layout, interactive reservations, and refined aesthetics.',
    description:
      'MOJO Steakhouse is a fine-dining web application crafted with bold editorial typography, expansive negative space, and mouth-watering photography. The interface guides visitors through curated steak menus, chef stories, wine pairings, and a streamlined reservation booking system.',
    credits: [
      ['Platform', 'Web App'],
      ['Role', 'UI/UX Design & Frontend Development'],
      ['Stack', 'HTML5, CSS3, JavaScript, Figma'],
    ],
    gallery: [
      '/work/mojo-steak/cover.jpg',
    ],
  },
  {
    slug: 'web-mojo',
    title: 'WEB.MOJO Studio',
    client: 'Digital Agency & Solutions',
    year: 2024,
    disciplines: ['Frontend', 'UX/UI'],
    industries: ['Agency & Tech', 'Web App'],
    color: '#a29bfe',
    palette: ['#a29bfe', '#74b9ff', '#0d0d1e'],
    art: 'blobs',
    ratio: 0.52,
    featured: true,
    cover: '/work/web-mojo/cover.jpg',
    video: '',
    summary: 'A full-service digital agency web app showcasing product design, frontend development, and branding solutions for high-growth ventures.',
    description:
      'WEB.MOJO delivers end-to-end digital solutions for high-growth startups. Designed with dark-mode elegance, modular service tags (Web Development, Web Design, Poster Design), isometric vector graphics, and a streamlined client inquiry funnel.',
    credits: [
      ['Platform', 'Web App'],
      ['Role', 'UI/UX Design & Frontend Development'],
      ['Stack', 'React, Next.js, CSS3, Figma'],
    ],
    gallery: [
      '/work/web-mojo/cover.jpg',
    ],
  },
  {
    slug: 'engine-simulator',
    title: 'Core Engine Simulator',
    client: 'System Engineering',
    year: 2024,
    disciplines: ['Backend'],
    industries: ['Education'],
    color: '#ff5a1f',
    palette: ['#ff5a1f', '#f2efe9', '#121212'],
    art: 'stripes',
    ratio: 0.65,
    featured: false,
    cover: '',
    video: '',
    summary: 'High-performance simulation engine utilizing OOP, custom memory allocation, and data structures.',
    description: 'System software exploring object-oriented programming (OOP), memory management, and algorithmic optimizations.',
    credits: [
      ['Type', 'Systems Project'],
      ['Role', 'Systems Programming'],
      ['Stack', 'C++, C, OOP, Algorithms'],
    ],
    gallery: [],
  },
  {
    slug: 'portal-mamp',
    title: 'MAMP Relational Portal',
    client: 'Database Architecture',
    year: 2023,
    disciplines: ['Full-stack', 'Backend'],
    industries: ['Web App'],
    color: '#3dffb5',
    palette: ['#3dffb5', '#ffb23d', '#0b2224'],
    art: 'conic',
    ratio: 0.65,
    featured: false,
    cover: '',
    video: '',
    summary: 'A full-stack web portal managing relational records with a local database environment.',
    description: 'Database-driven management portal leveraging MySQL schemas, local MAMP runtime environment, and dynamic server-rendered records.',
    credits: [
      ['Type', 'Full-stack System'],
      ['Role', 'Full-stack Development'],
      ['Stack', 'JavaScript, HTML5, CSS3, MySQL, MAMP'],
    ],
    gallery: [],
  },
]
