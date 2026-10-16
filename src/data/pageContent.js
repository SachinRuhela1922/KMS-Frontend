// Content of every inner page (everything except Home). Edited from Admin Panel -> "Pages".
// Each page = { path, title, intro, heroImage, blocks: [ ...content blocks... ] }
import general from './pages/general.js';
import admissions from './pages/admissions.js';
import campus from './pages/campus.js';

const pageContent = { ...general, ...admissions, ...campus };

/** Sidebar grouping used by the Admin Panel */
export const PAGE_GROUPS = [
  { id: 'pages-main', label: 'Pages - Main', ids: ['discover-jgu', 'study-at-jgu', 'research-publications', 'career-employability', 'about-us'] },
  {
    id: 'pages-admissions', label: 'Pages - Admissions',
    ids: ['admissions', 'admissions-undergraduate', 'admissions-postgraduate', 'admissions-phd', 'admissions-online', 'admissions-blended', 'admissions-international-academy', 'admissions-international-students', 'admissions-doctoral-studies'],
  },
  {
    id: 'pages-campus', label: 'Pages - Campus Life',
    ids: ['campus-life', 'campus-life-food-and-dining', 'campus-life-sports-academy', 'campus-life-health', 'campus-life-global-library', 'campus-life-student-affairs', 'campus-life-student-housing', 'campus-life-arts-and-culture', 'campus-life-community-engagement', 'campus-life-student-life'],
  },
];

export default pageContent;
