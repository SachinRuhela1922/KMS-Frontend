// ─────────────────────────────────────────────────────────────────────────────
//  K.M.S Inter College — hardcoded site data (contact, menu, footer).
//  Sample values: change phone / email / address here and it updates everywhere.
// ─────────────────────────────────────────────────────────────────────────────
export const SCHOOL = {
  name: 'K.M.S Inter College',
  tagline: 'Where Knowledge Meets Excellence',
  motto: 'तमसो मा ज्योतिर्गमय',
  board: 'UP Board (UPMSP)',
  session: '2026–27',
  phone: '+91 98765 43210',
  phoneRaw: '919876543210', // for WhatsApp / tel: links (country code + number, no spaces)
  email: 'info@kmsintercollege.in',
  admissionEmail: 'admissions@kmsintercollege.in',
  address: 'K.M.S Inter College, Main Road, Uttar Pradesh, India',
  officeHours: 'Mon – Sat, 9:00 AM – 2:00 PM',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=K.M.S+Inter+College',
  social: [
    { icon: 'fa-facebook-f', href: 'https://www.facebook.com/' },
    { icon: 'fa-instagram', href: 'https://www.instagram.com/' },
    { icon: 'fa-youtube', href: 'https://www.youtube.com/' },
    { icon: 'fa-whatsapp', href: 'https://wa.me/919876543210' },
  ],
};

export const SETTINGS = {
  siteTitle: 'K.M.S Inter College | Play Group to Class 12 | UP Board',
  siteDescription:
    'K.M.S Inter College – UP Board school from Play Group to Class 12. Explore classes, faculty, streams (Science, Commerce, Arts), fees, facilities and events. Admissions open.',
  logoAlt: 'K.M.S Inter College',
  applyLabel: 'Admission Open',
  applyUrl: '/admissions',
};

export const HERO_BUTTONS = [
  { label: 'Admissions', href: '/admissions' },
  { label: 'Our Classes', href: '/classes' },
  { label: 'Contact Us', href: '/contact-us' },
];

export const NAV_MENU = [
  {
    label: 'About Us', path: '/about-us',
    children: [
      { label: 'Our Story', path: '/about-us' },
      { label: 'Faculty', path: '/faculty' },
      { label: 'Achievements', path: '/achievements' },
    ],
  },
  { label: 'Classes', path: '/classes', children: [] },
  { label: 'Academics', path: '/academics', children: [] },
  {
    label: 'Admissions', path: '/admissions',
    children: [
      { label: 'Admission Process', path: '/admissions' },
      { label: 'Fee Structure', path: '/admissions/fee-structure' },
      { label: 'Rules & Uniform', path: '/admissions/rules' },
    ],
  },
  {
    label: 'Campus Life', path: '/campus-life',
    children: [
      { label: 'Overview', path: '/campus-life' },
      { label: 'Sports & Games', path: '/campus-life/sports' },
      { label: 'Library & Labs', path: '/campus-life/library-labs' },
      { label: 'Transport & Safety', path: '/campus-life/transport-safety' },
      { label: 'Events & Celebrations', path: '/campus-life/events' },
    ],
  },
  { label: 'Contact Us', path: '/contact-us', children: [] },
];

export const FOOTER = {
  addressTitle: 'Visit Us',
  address: SCHOOL.address,
  emailContacts: [
    { text: 'Admission queries', email: SCHOOL.admissionEmail },
    { text: 'General enquiries', email: SCHOOL.email },
  ],
  mapLabel: 'Get Directions',
  mapUrl: SCHOOL.mapUrl,
  socialTitle: 'Follow Us',
  socialLinks: SCHOOL.social,
  informationTitle: 'Information',
  information: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Admissions', href: '/admissions' },
    { label: 'Fee Structure', href: '/admissions/fee-structure' },
    { label: 'Rules & Uniform', href: '/admissions/rules' },
    { label: 'Contact Us', href: '/contact-us' },
  ],
  quickLinksTitle: 'Quick Links',
  quickLinks: [
    { label: 'Classes (Play Group – 12)', href: '/classes' },
    { label: 'Academics', href: '/academics' },
    { label: 'Faculty', href: '/faculty' },
    { label: 'Achievements', href: '/achievements' },
    { label: 'Sports & Games', href: '/campus-life/sports' },
    { label: 'Library & Labs', href: '/campus-life/library-labs' },
    { label: 'Transport & Safety', href: '/campus-life/transport-safety' },
    { label: 'Events & Celebrations', href: '/campus-life/events' },
  ],
  copyright: `© ${new Date().getFullYear()} ${SCHOOL.name}. All rights reserved.`,
};
