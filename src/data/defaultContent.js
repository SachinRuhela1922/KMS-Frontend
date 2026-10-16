// Default (fallback) content of the whole website.
// - The server seeds the very first content.json from this file.
// - The frontend uses it as a fallback if the API is not reachable.
// After that, everything is edited from the Admin Panel (/admin).
import bannerSlides from './bannerSlides.js';
import aboutSlides from './aboutSlides.js';
import alumni from './alumni.js';
import faculty from './faculty.js';
import news from './news.js';
import rankings from './rankings.js';
import research from './research.js';
import footerLinks from './footerLinks.js';
import navMenu from './navMenu.js';
import pageContent from './pageContent.js';
import classes from './classes.js';

const SITE = 'https://jgu.edu.in';

const defaultContent = {
  settings: {
    siteTitle: 'K.M.S Inter College | Play Group to Class 12 | UP Board',
    siteDescription: 'K.M.S Inter College - UP Board school from Play Group to Class 12. Explore classes, faculty, subjects, streams (Science, Commerce, Arts), fees and events. Admissions open.',
    logoAlt: 'K.M.S Inter College',
    logoBlue: `${SITE}/front/assets/img/blue-logo.webp`,
    logoWhite: `${SITE}/front/assets/img/logo-white.webp`,
    favicon: `${SITE}/front/assets/img/favicon.ico`,
    footerBg: `${SITE}/front/assets/img/footer.webp`,
    applyLabel: 'Admission Open',
    applyUrl: '/classes',
    searchEnabled: true,
  },

  home: {
    sections: [
      { id: 'hero', label: 'Hero Banner (video)', visible: true },
      { id: 'bannerSlider', label: 'Announcement Banner Slider', visible: true },
      { id: 'classes', label: 'Our Classes (Play Group - Class 12)', visible: true },
      { id: 'findDegree', label: 'Find a Degree', visible: true },
      { id: 'programmes', label: 'View Our Programmes', visible: true },
      { id: 'about', label: 'About Our University', visible: true },
      { id: 'why', label: 'Why JGU (3 features)', visible: true },
      { id: 'glance', label: 'University at a Glance', visible: true },
      { id: 'rankings', label: 'Rankings & Recognitions', visible: true },
      { id: 'faculty', label: 'Our Faculty', visible: true },
      { id: 'research', label: 'Research & Publications', visible: true },
      { id: 'news', label: 'Latest News & Events', visible: true },
      { id: 'students', label: 'Students Corner', visible: true },
      { id: 'alumni', label: 'Alumni', visible: true },
    ],
  },

  hero: {
    video: `${SITE}/front/assets/video/jgu-video.mp4`,
    poster: '',
    slides: [
      {
        eyebrow: 'Institution of Eminence',
        line1: 'O.P. Jindal',
        line2: 'Global University',
        tagline: 'A Private University Promoting Public Service',
        buttons: [
          { label: 'Our Programmes', href: 'https://jgu.edu.in/admissions' },
          { label: 'Contact Us', href: 'https://jgu.edu.in//contact-us' },
        ],
      },
    ],
  },

  bannerSlides: bannerSlides.map((b) => ({ img: b.src, alt: b.alt || '', href: b.href || '' })),

  findDegree: {
    title: 'Find a Degree',
    action: 'https://jgu.edu.in/courses',
    placeholder: 'Search by keyword or #',
    selectLabel: 'Select Programme',
    buttonLabel: 'Explore Now',
    options: [
      { value: 'undergraduate', label: 'Undergraduate' },
      { value: 'postgraduate', label: 'Postgraduate' },
      { value: 'blended', label: 'Blended' },
      { value: 'online', label: 'Online' },
      { value: 'doctoral', label: 'Doctoral' },
      { value: 'non-residential', label: 'Non-Residential' },
    ],
  },

  programmes: {
    title: 'View Our Programmes',
    items: [
      { title: 'Undergraduate', href: 'https://jgu.edu.in/admissions?programme=undergraduate', text: '' },
      { title: 'Postgraduate', href: 'https://jgu.edu.in/admissions?programme=postgraduate', text: 'JIBS graduate programmes blend interdisciplinary learning, practical experience, and research to develop future-ready professionals.' },
      { title: 'Blended', href: 'https://jgu.edu.in/admissions?programme=blended', text: '' },
      { title: 'Online', href: 'https://jgu.edu.in/admissions?programme=online', text: 'JGU offers a holistic education founded on interdisciplinarity, global exposure and experiential learning' },
      { title: 'Doctoral', href: 'https://jgu.edu.in/admissions?programme=doctoral', text: 'JIBS doctoral programmes foster advanced research, interdisciplinary inquiry, and practical impact to cultivate thought leaders and innovators.' },
      { title: 'Non-Residential', href: 'https://jgu.edu.in/admissions?programme=non-residential', text: 'JGU offers a holistic education founded on interdisciplinarity, global exposure and experiential learning' },
    ],
    applyLabel: 'Apply Now',
    applyHref: 'https://jgu.edu.in/admissions',
    applyText: 'Please complete the form, and we will handle the subsequent steps. Our intuitive online application form is designed to guide you seamlessly.',
    knowLabel: 'Know More',
    knowHref: 'https://jgu.edu.in/contact-us',
    knowText: 'Click to learn more about our programmes. For further details, select ‘Contact Us’. An admissions representative will reach out to assist you.',
  },

  tour: {
    enabled: true,
    buttonLabel: 'Schedule a Tour',
    formUrl: 'https://forms.cloud.microsoft/pages/responsepage.aspx?id=nZvnx-nsM0GHQ7bK0mxXTzMrp0v1AMJFnuYsF5oJt_VUQzlKOUJKODFMU1hUSkI4VzhWUjJBV05TSy4u&route=shorturl',
    orText: 'or scan to register',
    qrTitle: 'Scan to Register',
    qrImg: `${SITE}/storage/1720/QR.webp`,
    qrText: 'Use your phone camera — no app needed',
    label: 'CAMPUS VISIT',
    text: 'You are welcome to visit us, and we will gladly organise a campus tour for you. This will provide an opportunity to explore the campus, programmes, and facilities in detail. An admissions representative will contact you once your schedule is ready.',
  },

  about: {
    title: 'About Our University',
    intro: "O.P. Jindal Global University offers programmes in diverse fields such as Law, Business, Liberal Arts, Psychology, Economics, Media, Journalism, Architecture, Design, Banking, Finance, Environment, Public Policy, Public Health, Languages, and International Relations. Our courses are designed to meet students' academic and professional needs through interdisciplinary learning and practical application, preparing them for the global workforce. Over the past decade, JGU has become an international institution, attracting faculty and students from around the world and forming partnerships with leading global universities to provide a rich learning environment.",
    body: "Our faculty consists of experienced professionals and scholars committed to delivering high-quality education that fosters critical thinking, ethical leadership, and social responsibility. Through our innovative curriculum and modern infrastructure, we aim to develop well-rounded individuals ready to contribute meaningfully to society and their fields.",
    slides: aboutSlides.map((s) => ({
      img: s.img,
      alt: s.alt || '',
      sub: s.sub || '',
      title: s.title || '',
      inlineButtons: !!s.inlineButtons,
      buttons: (s.buttons || []).map((b) => ({ label: b.label, href: b.href })),
    })),
  },

  why: {
    image: `${SITE}/front/assets/img/slider/image__2.jpg`,
    items: [
      { no: '01', title: 'Interdisciplinary Approach', img: '', text: 'Our institution provides a well-rounded education that goes beyond conventional constraints, equipping students for an ever-changing global landscape with its interdisciplinary course structure.' },
      { no: '02', title: 'Global Exposure', img: '', text: 'We offer students a range of global exposure and opportunities to study abroad, interact with international students, and take part in cultural exchange programmes fostering a multicultural perspective.' },
      { no: '03', title: 'Experiential Learning', img: '', text: 'O.P. Jindal Global University offers hands-on learning opportunities through internships, community service, research projects, and other experiential activities that allow students to apply their knowledge and skills.' },
    ],
  },

  glance: {
    title: 'O.P. Jindal Global University at a Glance',
    stats: [
      { value: '16000+', label: 'Students' },
      { value: '1100+', label: 'University Faculty & Staff' },
      { value: '620+', label: 'Collaborations with International Universities' },
      { value: '22400+', label: 'Alumni Network' },
      { value: '10730+', label: 'Publications' },
    ],
  },

  rankings: {
    title: 'Rankings & Recognitions',
    items: rankings.map((src) => ({ img: src })),
  },

  faculty: {
    title: 'Our Faculty',
    linkLabel: 'Learn More',
    linkHref: 'https://jgu.edu.in/faculties',
    items: faculty.map((f) => ({ img: f.img, name: f.name, role: f.role, href: f.href })),
  },

  research: {
    title: 'Research & Publications',
    linkLabel: 'Learn More',
    linkHref: 'https://jgu.edu.in/research',
    items: research.map((r) => ({ img: r.img, title: r.title, href: r.href })),
  },

  news: {
    title: 'Latest News & Events',
    linkLabel: 'Learn More',
    linkHref: 'https://jgu.edu.in/news',
    items: news.map((n) => ({ img: n.img, title: n.title, day: n.day, month: n.month, href: n.href })),
  },

  students: {
    title: 'Students Corner',
    linkLabel: 'Learn More',
    linkHref: 'https://jgu.edu.in/student-activity',
    buttonLabel: 'Read More',
    items: [
      { title: 'Clubs and Societies', img: 'https://jgu.edu.in//storage/316/conversions/Clubs-and-Societies-thumb-thumb.jpg', href: 'https://jgu.edu.in/student-activity?category=societies-and-club' },
      { title: 'Activities', img: 'https://jgu.edu.in//storage/268/conversions/Activities-thumb-thumb.jpg', href: 'https://jgu.edu.in/student-activity?category=activities' },
      { title: 'Achievements', img: 'https://jgu.edu.in//storage/269/conversions/Achievement-thumb-thumb.jpg', href: 'https://jgu.edu.in/student-activity?category=achievements' },
    ],
  },

  alumni: {
    title: 'Alumni',
    linkLabel: 'Learn More',
    linkHref: 'https://jgu.edu.in/alumni',
    items: alumni.map((a) => ({ img: a.img, name: a.name, href: a.href, video: a.video || '' })),
  },

  // Classes: Play Group -> Class 12 (Admin Panel -> School -> Classes)
  classes,

  // Inner pages (Discover JGU, Admissions, Campus Life ...) - edited in Admin Panel -> Pages
  pageContent,

  // Extra pages created from the Admin Panel (no code needed) - Admin -> New Pages
  customPages: [],

  navMenu: navMenu.map((m) => ({
    label: m.label,
    path: m.path,
    children: (m.children || []).map((c) => ({ label: c.label, path: c.path })),
  })),

  footer: {
    addressTitle: 'Campus Location',
    address: 'Sonipat Narela Road, Near Jagdishpur Village, Sonipat, Haryana 131001',
    emailContacts: [
      { text: 'For Admission related queries, write to:', email: 'admissions@jgu.edu.in' },
      { text: 'For Online Admission related queries, write to:', email: 'admissionsonline@jgu.edu.in' },
      { text: 'For Non-Residential Admission related queries, write to:', email: 'non-res.admissions@jgu.edu.in' },
      { text: 'For Ph.D. Admission related queries, write to:', email: 'phd.admissions@jgu.edu.in' },
      { text: 'For other general inquiries, write to:', email: 'info@jgu.edu.in' },
    ],
    mapLabel: 'Get Direction',
    mapUrl: 'https://www.google.co.in/maps/place/O.P.+Jindal+Global+University/@28.9110849,77.0919614,12.25z/data=!4m6!3m5!1s0x390daeffe1e6caed:0xf84c61ebc78fe3fd!8m2!3d28.9264157!4d77.0565769!16s%2Fm%2F0k2g5k6?entry=ttu',
    socialTitle: 'Social Links',
    socialLinks: [
      { icon: 'fa-facebook-f', href: 'https://www.facebook.com/JindalGlobalUNI' },
      { icon: 'fa-twitter', href: 'https://twitter.com/jindalglobaluni' },
      { icon: 'fa-linkedin', href: 'https://www.linkedin.com/school/jindalglobaluni' },
      { icon: 'fa-youtube', href: 'https://www.youtube.com/@jindalglobaluniversity' },
      { icon: 'fa-instagram', href: 'https://www.instagram.com/jindalglobaluni/' },
    ],
    informationTitle: 'Information',
    information: footerLinks.information.map((l) => ({ label: l.label, href: l.href, newTab: l.target === '_blank' })),
    quickLinksTitle: 'Quick Links',
    quickLinks: footerLinks.quickLinks.map((l) => ({ label: l.label, href: l.href, newTab: l.target === '_blank' })),
    copyright: 'Copyright © 2026 O.P. Jindal Global University . All rights reserved.',
  },
};

export default defaultContent;
