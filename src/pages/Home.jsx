import { Fragment } from 'react';
import HeroBanner from '../components/home/HeroBanner.jsx';
import BannerSlider from '../components/home/BannerSlider.jsx';
import ClassesSection from '../components/home/ClassesSection.jsx';
import FindDegree from '../components/home/FindDegree.jsx';
import Programmes from '../components/home/Programmes.jsx';
import AboutUniversity from '../components/home/AboutUniversity.jsx';
import WhyJGU from '../components/home/WhyJGU.jsx';
import Glance from '../components/home/Glance.jsx';
import Rankings from '../components/home/Rankings.jsx';
import Faculty from '../components/home/Faculty.jsx';
import Research from '../components/home/Research.jsx';
import News from '../components/home/News.jsx';
import StudentsCorner from '../components/home/StudentsCorner.jsx';
import Alumni from '../components/home/Alumni.jsx';
import JourneySection from '../components/home/JourneySection.jsx';
import DaySection from '../components/home/Daysection.jsx';
import { useContent } from '../context/ContentContext.jsx';

// Extra sections: har entry ka matlab "is section ke BAAD ye dikhao"
const EXTRA = {
  students: [JourneySection],
  glance: [DaySection],
};

const SECTIONS = {
  hero: HeroBanner,
  bannerSlider: BannerSlider,
  classes: ClassesSection,
  findDegree: FindDegree,
  programmes: Programmes,
  about: AboutUniversity,
  why: WhyJGU,
  glance: Glance,
  rankings: Rankings,
  faculty: Faculty,
  research: Research,
  news: News,
  students: StudentsCorner,
  alumni: Alumni,
};

// Home page: sections are rendered in the order (and visibility) set in Admin Panel -> Home Sections
export default function Home() {
  const { home } = useContent();
  return (
    <>
      {(home.sections || []).map((s) => {
        const Section = SECTIONS[s.id];
        return (
          <Fragment key={s.id}>
            {Section && s.visible !== false ? <Section /> : null}
            {(EXTRA[s.id] || []).map((Extra, i) => <Extra key={i} />)}
          </Fragment>
        );
      })}
    </>
  );
}