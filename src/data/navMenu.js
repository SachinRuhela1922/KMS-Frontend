// Navbar data (fallback). Live navbar Admin Panel -> Navbar Menu se aata hai.
// Menu item ka PAGE code me hota hai: src/pages/ (route: src/pages/routes.jsx).
// Dropdown chahiye to item me children: [{ label, path }] add karo.
const navMenu = [
  {
    "label": "Classes",
    "path": "/classes",
    "children": [
      { "label": "Play Group", "path": "/classes/play-group" },
      { "label": "Nursery", "path": "/classes/nursery" },
      { "label": "LKG", "path": "/classes/lkg" },
      { "label": "UKG", "path": "/classes/ukg" },
      { "label": "Class 1", "path": "/classes/class-1" },
      { "label": "Class 2", "path": "/classes/class-2" },
      { "label": "Class 3", "path": "/classes/class-3" },
      { "label": "Class 4", "path": "/classes/class-4" },
      { "label": "Class 5", "path": "/classes/class-5" },
      { "label": "Class 6", "path": "/classes/class-6" },
      { "label": "Class 7", "path": "/classes/class-7" },
      { "label": "Class 8", "path": "/classes/class-8" },
      { "label": "Class 9", "path": "/classes/class-9" },
      { "label": "Class 10", "path": "/classes/class-10" },
      { "label": "Class 11", "path": "/classes/class-11" },
      { "label": "Class 12", "path": "/classes/class-12" }
    ]
  },
  {
    "label": "Discover JGU",
    "path": "/discover-jgu"
  },
  {
    "label": "Study at JGU",
    "path": "/study-at-jgu"
  },
  {
    "label": "Admissions",
    "path": "/admissions",
    "children": [
      {
        "label": "Undergraduate",
        "path": "/admissions/undergraduate"
      },
      {
        "label": "Postgraduate",
        "path": "/admissions/postgraduate"
      },
      {
        "label": "Ph.D.",
        "path": "/admissions/phd"
      },
      {
        "label": "Online",
        "path": "/admissions/online"
      },
      {
        "label": "Blended",
        "path": "/admissions/blended"
      },
      {
        "label": "JGU International Academy",
        "path": "/admissions/international-academy"
      },
      {
        "label": "International Students",
        "path": "/admissions/international-students"
      },
      {
        "label": "Office of Doctoral Studies",
        "path": "/admissions/doctoral-studies"
      }
    ]
  },
  {
    "label": "Research & Publications",
    "path": "/research-publications"
  },
  {
    "label": "Campus Life",
    "path": "/campus-life",
    "children": [
      {
        "label": "Food and Dining",
        "path": "/campus-life/food-and-dining"
      },
      {
        "label": "Sports Academy",
        "path": "/campus-life/sports-academy"
      },
      {
        "label": "Health",
        "path": "/campus-life/health"
      },
      {
        "label": "Global Library",
        "path": "/campus-life/global-library"
      },
      {
        "label": "Student Affairs",
        "path": "/campus-life/student-affairs"
      },
      {
        "label": "Student Housing",
        "path": "/campus-life/student-housing"
      },
      {
        "label": "Arts & Culture",
        "path": "/campus-life/arts-and-culture"
      },
      {
        "label": "Community Engagement",
        "path": "/campus-life/community-engagement"
      },
      {
        "label": "Student Life & Cultural Engagement",
        "path": "/campus-life/student-life"
      }
    ]
  },
  {
    "label": "Career & Employability",
    "path": "/career-employability"
  },
  {
    "label": "About Us",
    "path": "/about-us"
  }
];

export default navMenu;
