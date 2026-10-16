import { lazy } from 'react';

/**
 * ALL PAGES OF THE WEBSITE (except Home and /admin) ARE LISTED HERE.
 *
 * Navbar ke items Admin Panel -> Navbar Menu se aate hain, lekin page ka content + design
 * code me hota hai. Rule simple hai:
 *
 *   NEW PAGE:   1) src/pages/<Folder>/<Name>.jsx  +  <Name>.module.css  banao
 *                  (kisi bhi purane page ki folder copy karke naam badal do)
 *               2) neeche ek line add karo:   page('/url-path', () => import('./<Folder>/<Name>.jsx')),
 *               3) Admin -> Navbar Menu me wahi url-path wala item add karo.
 *
 *   DELETE:     Admin se navbar item hata do, phir yahan ki line + page ki files delete kar do.
 *
 * Page ka URL badalna ho to Admin -> Pages -> page -> "Page link" (code change nahi chahiye);
 * purana URL apne aap naye URL par redirect ho jata hai.
 * Jis URL ki line yahan nahi hai aur jo Admin me kisi page ka link nahi hai, wo 404 dikhata hai.
 */
const page = (path, load) => ({ path, Component: lazy(load) });

const pageRoutes = [
  page('/discover-jgu', () => import('./DiscoverJGU/DiscoverJGU.jsx')), // Discover JGU
  page('/study-at-jgu', () => import('./StudyAtJGU/StudyAtJGU.jsx')), // Study at JGU
  page('/admissions', () => import('./Admissions/Admissions.jsx')), // Admissions
  page('/research-publications', () => import('./ResearchPublications/ResearchPublications.jsx')), // Research & Publications
  page('/campus-life', () => import('./CampusLife/CampusLife.jsx')), // Campus Life
  page('/career-employability', () => import('./CareerEmployability/CareerEmployability.jsx')), // Career & Employability
  page('/about-us', () => import('./AboutUs/AboutUs.jsx')), // About Us
];

/** page id (as in content.pageContent) -> component. id = path without the first "/" and with "/" replaced by "-" */
export const pageId = (path) => path.replace(/^\//, '').replace(/\//g, '-');
export const pageComponents = Object.fromEntries(pageRoutes.map((r) => [pageId(r.path), r.Component]));

export default pageRoutes;
