// Describes every editable part of the website. The admin panel is generated from this file.
// To make something new editable: add the field here (and read it from useContent() in the component).

import pageContent, { PAGE_GROUPS } from '../data/pageContent.js';

const t = (key, label, o = {}) => ({ type: 'text', key, label, ...o });
const area = (key, label, o = {}) => ({ type: 'textarea', key, label, ...o });
const url = (key, label, o = {}) => ({ type: 'url', key, label, ...o });
const image = (key, label, o = {}) => ({ type: 'image', key, label, ...o });
const video = (key, label, o = {}) => ({ type: 'video', key, label, ...o });
const bool = (key, label, o = {}) => ({ type: 'bool', key, label, ...o });
const select = (key, label, options, o = {}) => ({ type: 'select', key, label, options, ...o });
const list = (key, label, fields, o = {}) => ({ type: 'list', key, label, fields, ...o });
const group = (key, label, fields, o = {}) => ({ type: 'group', key, label, fields, ...o });

const ICONS = [
  'fa-facebook-f', 'fa-twitter', 'fa-linkedin', 'fa-youtube', 'fa-instagram', 'fa-whatsapp',
  'fa-telegram', 'fa-pinterest', 'fa-snapchat-ghost', 'fa-github', 'fa-envelope', 'fa-phone', 'fa-globe',
];

const buttonList = (key = 'buttons', label = 'Buttons') =>
  list(key, label, [t('label', 'Button text'), url('href', 'Link')], { itemLabel: 'label', addLabel: 'Add button' });

const linkItems = (key, label) =>
  list(key, label, [t('label', 'Text'), url('href', 'Link'), bool('newTab', 'Open in new tab')], { itemLabel: 'label', addLabel: 'Add link' });

const sectionHeading = [t('title', 'Section heading'), t('linkLabel', '“Learn more” text (empty = hidden)'), url('linkHref', '“Learn more” link')];

/** Sidebar structure */
export const GROUPS = [
  { id: 'general', label: 'General' },
  { id: 'home', label: 'Home Page' },
  { id: 'school', label: 'School' },
  ...PAGE_GROUPS.map((g) => ({ id: g.id, label: g.label })),
  { id: 'newpages', label: 'New Pages' },
  { id: 'site', label: 'Site' },
];

/* ---------------------------------------------------------------- inner pages (content blocks) */
const BLOCK_TYPES = [
  { value: 'paragraph', label: 'Paragraph (text)' },
  { value: 'heading', label: 'Heading' },
  { value: 'list', label: 'Bullet list' },
  { value: 'stats', label: 'Numbers / stats' },
  { value: 'cards', label: 'Cards (grid)' },
  { value: 'steps', label: 'Numbered steps' },
  { value: 'faq', label: 'FAQ (questions & answers)' },
  { value: 'table', label: 'Table' },
  { value: 'quote', label: 'Quote' },
  { value: 'callout', label: 'Highlight box' },
  { value: 'image', label: 'Image' },
  { value: 'button', label: 'Button' },
];
const typeLabel = (v) => BLOCK_TYPES.find((b) => b.value === v)?.label.split(' (')[0] || v;
const is = (...types) => (b) => types.includes(b.type);

const blockPreview = (b) => {
  const raw = b.text || b.title || b.label || b.caption || b.q || '';
  const extra = b.bullets?.length ? `${b.bullets.length} items` : b.stats?.length ? `${b.stats.length} numbers` : b.cards?.length ? `${b.cards.length} cards`
    : b.steps?.length ? `${b.steps.length} steps` : b.faqs?.length ? `${b.faqs.length} questions` : b.rows?.length ? `${b.rows.length} rows` : '';
  return `${typeLabel(b.type)}: ${String(raw || extra).replace(/\s+/g, ' ').slice(0, 70)}`;
};

const BLOCK_FIELDS = [
  select('type', 'Block type', BLOCK_TYPES),
  select('level', 'Heading size', [{ value: 'h2', label: 'Big heading' }, { value: 'h3', label: 'Small heading' }], { showIf: is('heading') }),
  t('text', 'Heading text', { showIf: is('heading') }),
  area('text', 'Text (leave an empty line to start a new paragraph)', { rows: 7, showIf: is('paragraph') }),
  area('text', 'Quote text', { rows: 4, showIf: is('quote') }),
  t('author', 'Quote by', { showIf: is('quote') }),
  t('title', 'Box title (optional)', { showIf: is('callout') }),
  area('text', 'Box text', { rows: 4, showIf: is('callout') }),
  t('title', 'Small heading above (optional)', { showIf: is('cards', 'steps', 'faq', 'table') }),
  list('bullets', 'Bullet points', [t('text', 'Point')], { itemLabel: 'text', addLabel: 'Add point', showIf: is('list') }),
  list('stats', 'Numbers', [t('value', 'Number (e.g. 16000+)'), t('label', 'Label')], { itemLabel: 'label', addLabel: 'Add number', showIf: is('stats') }),
  list('cards', 'Cards', [t('title', 'Card title'), area('text', 'Card text', { rows: 3 }), image('img', 'Image (optional)'), url('href', 'Link (optional)'), t('linkLabel', 'Link text (default: Learn more)')], { itemLabel: 'title', addLabel: 'Add card', showIf: is('cards') }),
  list('steps', 'Steps', [t('title', 'Step title'), area('text', 'Step text', { rows: 3 })], { itemLabel: 'title', addLabel: 'Add step', showIf: is('steps') }),
  list('faqs', 'Questions', [t('q', 'Question'), area('a', 'Answer', { rows: 4 })], { itemLabel: 'q', addLabel: 'Add question', showIf: is('faq') }),
  t('col1', 'Column 1 heading', { showIf: is('table') }),
  t('col2', 'Column 2 heading', { showIf: is('table') }),
  t('col3', 'Column 3 heading (leave all empty to hide a column)', { showIf: is('table') }),
  list('rows', 'Rows', [t('c1', 'Column 1'), t('c2', 'Column 2'), t('c3', 'Column 3')], { itemLabel: 'c1', addLabel: 'Add row', showIf: is('table') }),
  image('img', 'Image', { showIf: is('image') }),
  t('caption', 'Caption (also used as alt text)', { showIf: is('image') }),
  t('label', 'Button text', { showIf: is('button') }),
  url('href', 'Button link', { showIf: is('button') }),
];

const BLOCKS_LIST = list('blocks', 'Page content (top to bottom)', BLOCK_FIELDS, { itemLabel: blockPreview, addLabel: 'Add content block', defaults: { type: 'paragraph' } });

const PAGE_BASE_FIELDS = [
  t('title', 'Page title (big heading + browser tab)'),
  area('intro', 'Short intro under the title', { rows: 3 }),
  image('heroImage', 'Header background image (optional)'),
  BLOCKS_LIST,
];
// ready-made pages: link can be changed too (navbar follows automatically when you Save)
const PAGE_FIELDS = [t('path', 'Page link (URL)', { placeholder: '/discover-jgu' }), ...PAGE_BASE_FIELDS];

const pageSections = PAGE_GROUPS.flatMap((g) =>
  g.ids.map((id) => ({
    id: `page-${id}`, pageId: id, group: g.id, icon: '📄', label: pageContent[id]?.title || id,
    path: pageContent[id]?.path,
    help: 'Edit the page text and add / remove / reorder content blocks. Page link badalne par Save karte hi Navbar Menu ka link bhi apne aap badal jata hai aur purana link naye par redirect hota hai - 404 nahi aayega. Press Save changes to publish. The page design (colours, fonts) is in the page\'s .module.css file.',
    fields: PAGE_FIELDS,
  }))
);

export const SECTIONS = [
  {
    id: 'settings', group: 'general', icon: '⚙️', label: 'Site Settings',
    help: 'Logo, favicon, page title, Apply Now button.',
    fields: [
      t('siteTitle', 'Home page title (browser tab / Google)'),
      area('siteDescription', 'Description (Google / SEO)', { rows: 3 }),
      image('logoWhite', 'Logo - white (shown on home page over the video)'),
      image('logoBlue', 'Logo - colour (shown on inner pages)'),
      t('logoAlt', 'Logo alt text'),
      t('favicon', 'Favicon URL (.ico / .png)', { placeholder: 'https://...' }),
      image('footerBg', 'Footer background image'),
      t('applyLabel', '“Apply Now” button text (empty = hide button)'),
      url('applyUrl', '“Apply Now” link'),
      bool('searchEnabled', 'Show search icon in navbar'),
    ],
  },
  {
    id: 'navMenu', group: 'general', icon: '🧭', label: 'Navbar Menu',
    help: 'Top menu. Add sub-items to make a dropdown. Link = page address like /about-us or a full https:// link. Kisi page ka link badalna ho to Pages -> us page -> Page link badlo (menu apne aap follow karega). Agar yahin link badlo to Save par us page ka link bhi badal jata hai. Bina page wala link 404 dega.',
    rootList: list('__root', 'Menu items', [
      t('label', 'Menu text'),
      t('path', 'Link', { placeholder: '/about-us  or  https://...' }),
      list('children', 'Dropdown items (optional)', [t('label', 'Text'), t('path', 'Link', { placeholder: '/admissions/phd' })], { itemLabel: 'label', addLabel: 'Add dropdown item' }),
    ], { itemLabel: 'label', addLabel: 'Add menu item', defaults: { label: 'New item', path: '/new-page', children: [] } }),
  },
  {
    id: 'footer', group: 'general', icon: '🔻', label: 'Footer',
    fields: [
      t('addressTitle', 'Address heading'),
      area('address', 'Address', { rows: 2 }),
      list('emailContacts', 'Email contacts', [t('text', 'Text'), t('email', 'Email')], { itemLabel: 'email', addLabel: 'Add email' }),
      t('mapLabel', '“Get Direction” button text (empty = hide)'),
      url('mapUrl', 'Google Maps link'),
      t('socialTitle', 'Social heading'),
      list('socialLinks', 'Social icons', [select('icon', 'Icon', ICONS), url('href', 'Link')], { itemLabel: 'icon', addLabel: 'Add social icon', defaults: { icon: 'fa-facebook-f', href: '' } }),
      t('informationTitle', '“Information” column heading'),
      linkItems('information', 'Information links'),
      t('quickLinksTitle', '“Quick Links” column heading'),
      linkItems('quickLinks', 'Quick links'),
      t('copyright', 'Copyright text'),
    ],
  },

  {
    id: 'homeOrder', group: 'home', icon: '🔀', label: 'Home Sections Order', key: 'home',
    help: 'Show / hide home page sections and change their order with the arrows.',
    fields: [list('sections', 'Home page sections', [bool('visible', 'Show this section')], { itemLabel: 'label', fixed: true })],
  },
  {
    id: 'hero', group: 'home', icon: '🎬', label: 'Hero (Video Banner)',
    help: 'The image shows first; the video fades in over it as soon as it is ready. If you leave the image empty and the video is on Cloudinary, the first frame of the video is used automatically.',
    fields: [
      video('video', 'Background video (Cloudinary)'),
      image('poster', 'Cover image shown while the video loads'),
      list('slides', 'Text on the banner', [
        t('eyebrow', 'Small top line'),
        t('line1', 'Big title - line 1'),
        t('line2', 'Big title - line 2'),
        t('tagline', 'Tagline'),
        buttonList(),
      ], { itemLabel: 'line1', addLabel: 'Add slide' }),
    ],
  },
  {
    id: 'bannerSlides', group: 'home', icon: '🖼️', label: 'Announcement Banners',
    help: 'Auto-sliding wide banners under the hero (recommended size 2300 × 838).',
    rootList: list('__root', 'Banners', [image('img', 'Banner image'), t('alt', 'Alt text'), url('href', 'Link when clicked (optional)')], { itemLabel: 'alt', addLabel: 'Add banner', bulkImageKey: 'img' }),
  },
  {
    id: 'findDegree', group: 'home', icon: '🔎', label: 'Find a Degree',
    fields: [
      t('title', 'Heading'), url('action', 'Search goes to (URL)'), t('selectLabel', 'Dropdown placeholder'),
      t('placeholder', 'Search box placeholder'), t('buttonLabel', 'Button text'),
      list('options', 'Dropdown options', [t('label', 'Text'), t('value', 'Value')], { itemLabel: 'label', addLabel: 'Add option' }),
    ],
  },
  {
    id: 'programmes', group: 'home', icon: '🎓', label: 'View Our Programmes',
    fields: [
      t('title', 'Heading'),
      list('items', 'Programme cards', [t('title', 'Title'), area('text', 'Short text (optional)', { rows: 3 }), url('href', 'Link')], { itemLabel: 'title', addLabel: 'Add programme' }),
      t('applyLabel', '“Apply” button text'), url('applyHref', '“Apply” link'), area('applyText', '“Apply” description', { rows: 3 }),
      t('knowLabel', '“Know more” button text'), url('knowHref', '“Know more” link'), area('knowText', '“Know more” description', { rows: 3 }),
    ],
  },
  {
    id: 'tour', group: 'home', icon: '📍', label: 'Schedule a Tour + QR',
    fields: [
      bool('enabled', 'Show this box'), t('buttonLabel', 'Button text'), url('formUrl', 'Registration form link'),
      t('orText', '“or scan” text'), t('qrTitle', 'QR heading'), image('qrImg', 'QR code image'), t('qrText', 'Text under QR'),
      t('label', 'Small label'), area('text', 'Description', { rows: 4 }),
    ],
  },
  {
    id: 'about', group: 'home', icon: 'ℹ️', label: 'About Our University',
    fields: [
      t('title', 'Heading'), area('intro', 'Intro paragraph (bold)', { rows: 6 }), area('body', 'Second paragraph', { rows: 4 }),
      list('slides', 'Slider', [
        image('img', 'Image'), t('alt', 'Alt text'), t('sub', 'Small heading'), t('title', 'Title'),
        bool('inlineButtons', 'Use small buttons'), buttonList(),
      ], { itemLabel: 'title', addLabel: 'Add slide', bulkImageKey: 'img' }),
    ],
  },
  {
    id: 'why', group: 'home', icon: '⭐', label: 'Why JGU (3 boxes)',
    fields: [
      image('image', 'Default image (used when a box has no image)'),
      list('items', 'Boxes', [t('no', 'Number'), t('title', 'Title'), area('text', 'Text', { rows: 4 }), image('img', 'Own image (optional)')], { itemLabel: 'title', addLabel: 'Add box' }),
    ],
  },
  {
    id: 'glance', group: 'home', icon: '📊', label: 'University at a Glance',
    fields: [t('title', 'Heading'), list('stats', 'Numbers', [t('value', 'Number'), t('label', 'Label')], { itemLabel: 'label', addLabel: 'Add number' })],
  },
  {
    id: 'rankings', group: 'home', icon: '🏆', label: 'Rankings & Recognitions',
    fields: [t('title', 'Heading'), list('items', 'Logos / images', [image('img', 'Image')], { itemLabel: () => 'Image', addLabel: 'Add image', bulkImageKey: 'img' })],
  },
  {
    id: 'faculty', group: 'home', icon: '👩‍🏫', label: 'Our Faculty',
    fields: [...sectionHeading, list('items', 'Faculty', [image('img', 'Photo'), t('name', 'Name'), area('role', 'Designation', { rows: 3 }), url('href', 'Profile link')], { itemLabel: 'name', addLabel: 'Add faculty', bulkImageKey: 'img' })],
  },
  {
    id: 'research', group: 'home', icon: '🔬', label: 'Research & Publications',
    fields: [...sectionHeading, list('items', 'Items', [image('img', 'Image'), t('title', 'Title'), url('href', 'Link')], { itemLabel: 'title', addLabel: 'Add item', bulkImageKey: 'img' })],
  },
  {
    id: 'news', group: 'home', icon: '📰', label: 'Latest News & Events',
    fields: [...sectionHeading, list('items', 'News', [image('img', 'Image'), t('title', 'Title'), t('day', 'Day (e.g. 26)'), t('month', 'Month (e.g. Feb)'), url('href', 'Link')], { itemLabel: 'title', addLabel: 'Add news', bulkImageKey: 'img' })],
  },
  {
    id: 'students', group: 'home', icon: '🎒', label: 'Students Corner',
    fields: [...sectionHeading, t('buttonLabel', 'Card button text'), list('items', 'Cards', [image('img', 'Image'), t('title', 'Title'), url('href', 'Link')], { itemLabel: 'title', addLabel: 'Add card' })],
  },
  {
    id: 'alumni', group: 'home', icon: '🎖️', label: 'Alumni',
    fields: [...sectionHeading, list('items', 'Alumni', [image('img', 'Photo'), t('name', 'Name'), url('href', 'Profile link'), url('video', 'YouTube video link (optional - shows play button)')], { itemLabel: 'name', addLabel: 'Add alumnus', bulkImageKey: 'img' })],
  },

  {
    id: 'classes', group: 'school', icon: '🏫', label: 'Classes (Play Group - 12)',
    help: 'Every class has its own details page (/classes/class-5 ...). Open a class to edit strength, sections, subjects, streams, faculty, fees and events. The "Link name" (slug) is used in the web address - change it only if you also change the Navbar link.',
    fields: [
      t('title', 'Section heading'),
      area('intro', 'Intro text', { rows: 3 }),
      t('board', 'Board (e.g. UP Board (UPMSP))'),
      t('session', 'Session (e.g. 2026–27)'),
      t('placeholder', 'Dropdown placeholder'),
      t('admissionNote', 'Admission note (shown on /classes)'),
      list('items', 'Classes', [
        t('name', 'Class name (e.g. Class 5)'),
        t('slug', 'Link name (e.g. class-5)', { placeholder: 'class-5' }),
        t('stage', 'Stage / group (e.g. Primary)'),
        t('ages', 'Age group'),
        t('board', 'Board'),
        t('medium', 'Medium'),
        t('strength', 'Total strength (students)'),
        t('sections', 'Sections (e.g. 2 (A, B))'),
        t('studentsPerSection', 'Students per section'),
        t('classTeacher', 'Class teacher'),
        t('timing', 'School timing'),
        area('about', 'About this class', { rows: 4 }),
        list('highlights', 'Highlights', [t('text', 'Point')], { itemLabel: 'text', addLabel: 'Add highlight' }),
        list('subjects', 'Subjects', [t('name', 'Subject'), t('note', 'Note (optional)')], { itemLabel: 'name', addLabel: 'Add subject' }),
        list('streams', 'Streams (Class 11 / 12 only)', [t('name', 'Stream (e.g. Science (PCM))'), area('subjects', 'Subjects in this stream', { rows: 2 })], { itemLabel: 'name', addLabel: 'Add stream' }),
        list('faculty', 'Faculty', [t('name', 'Teacher name'), t('role', 'Role / subject'), t('qualification', 'Qualification')], { itemLabel: 'name', addLabel: 'Add teacher' }),
        list('fees', 'Fees', [t('label', 'Fee name'), t('amount', 'Amount (e.g. ₹ 500 / month)'), t('note', 'Note (optional)')], { itemLabel: 'label', addLabel: 'Add fee' }),
        t('feeNote', 'Fee note (shown under the fee table)'),
        list('events', 'Events', [t('title', 'Event'), t('month', 'Month / date'), area('text', 'Short description', { rows: 2 })], { itemLabel: 'title', addLabel: 'Add event' }),
      ], {
        itemLabel: 'name', addLabel: 'Add class',
        defaults: { name: 'New Class', slug: 'new-class', stage: 'Primary', ages: '', board: 'UP Board (UPMSP)', medium: 'Hindi & English', strength: '', sections: '', studentsPerSection: '', classTeacher: '', timing: '', about: '', highlights: [], subjects: [], streams: [], faculty: [], fees: [], feeNote: '', events: [] },
      }),
    ],
  },

  ...pageSections,
  {
    id: 'customPages', group: 'newpages', icon: '➕', label: 'Create New Pages',
    help: 'Create a brand-new page without touching code. Set a link like /scholarships, add content blocks, Save - then add the same link in Navbar Menu. Pages made here use the About Us design.',
    rootList: list('__root', 'New pages', [t('path', 'Page link', { placeholder: '/scholarships' }), ...PAGE_BASE_FIELDS], {
      itemLabel: 'title', addLabel: 'Add new page', defaults: { path: '/new-page', title: 'New page', intro: '', heroImage: '', blocks: [] },
    }),
  },

  { id: 'media', group: 'site', icon: '☁️', label: 'Media Library (Cloudinary)', special: 'media' },
  { id: 'tools', group: 'site', icon: '🧰', label: 'Backup & Tools', special: 'tools' },
];

export const sectionKey = (s) => s.key || s.id;
