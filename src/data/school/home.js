// Hardcoded content of the HOME page sections (src/components/home/*). Edit freely.

export const NOTICES = [
  'Admissions open for session 2026–27 — Play Group to Class 12',
  'Parent–Teacher Meeting on the first Saturday of every month',
  'Winter uniform is compulsory from 1 November',
  'Annual Sports Day registrations are open — meet your PT teacher',
  'Half-yearly exam date sheet will be put up on the notice board',
];

export const QUICK_LINKS = [
  { icon: 'fa-pencil', title: 'Apply for Admission', text: 'Simple 5-step process', href: '/admissions' },
  { icon: 'fa-graduation-cap', title: 'Explore Classes', text: 'Play Group to Class 12', href: '/classes' },
  { icon: 'fa-rupee', title: 'Fee Structure', text: 'Clear & transparent', href: '/admissions/fee-structure' },
  { icon: 'fa-phone', title: 'Talk to Us', text: 'We reply the same day', href: '/contact-us' },
];

export const ABOUT = {
  eyebrow: 'About Our School',
  title: 'A caring school with strong academics and good values',
  text: [
    'K.M.S Inter College follows the UP Board (UPMSP) syllabus from Play Group to Class 12. Our aim is simple: every child should learn well, grow in confidence and become a good human being.',
    'With experienced teachers, smart classrooms, labs, a library and a safe campus, we give children a balanced school life — studies, sports, art and character building together.',
  ],
  points: [
    'Hindi & English medium teaching',
    'Experienced, caring teachers',
    'Regular tests, revision & parent meetings',
    'Safe campus with CCTV and school transport',
  ],
  quote: 'Our job is not to fill a bucket, but to light a lamp. Every child here is given the time and the care to shine.',
  author: 'Principal, K.M.S Inter College',
};

// numbers in the stats band. `students` is taken automatically from the Classes data (sum of class strength)
export const STATS = [
  { key: 'students', value: 1400, suffix: '+', label: 'Happy Students', icon: 'fa-users' },
  { value: 60, suffix: '+', label: 'Qualified Teachers', icon: 'fa-pencil' },
  { value: 25, suffix: '+', label: 'Years of Excellence', icon: 'fa-star' },
  { value: 98, suffix: '%', label: 'Board Exam Results', icon: 'fa-trophy' },
];

export const WHY = [
  { icon: 'fa-book', title: 'UP Board Focused', text: 'Syllabus-aligned teaching with notes, practice and regular revision for every class.' },
  { icon: 'fa-users', title: 'Caring Teachers', text: 'Small sections and teachers who know every child by name and guide them personally.' },
  { icon: 'fa-laptop', title: 'Smart Classrooms', text: 'Digital boards and visual lessons that make tough topics easy to understand.' },
  { icon: 'fa-flask', title: 'Science & Computer Labs', text: 'Hands-on practicals in well-equipped Physics, Chemistry, Biology and Computer labs.' },
  { icon: 'fa-futbol-o', title: 'Sports & Activities', text: 'Cricket, football, kabaddi, yoga, art, music and dance — something for every child.' },
  { icon: 'fa-shield', title: 'Safe & Secure Campus', text: 'CCTV, trained staff, verified school transport and a first-aid room on campus.' },
];

export const FACILITIES = [
  { icon: 'fa-laptop', title: 'Smart Classes', text: 'Digital learning in every senior class' },
  { icon: 'fa-flask', title: 'Science Labs', text: 'Physics, Chemistry & Biology practicals' },
  { icon: 'fa-book', title: 'Library', text: 'Books, newspapers and a quiet reading hall' },
  { icon: 'fa-gamepad', title: 'Computer Lab', text: 'Basics to coding, class by class' },
  { icon: 'fa-futbol-o', title: 'Playground', text: 'Large ground for sports and assembly' },
  { icon: 'fa-bus', title: 'School Transport', text: 'Safe buses covering nearby areas' },
  { icon: 'fa-video-camera', title: 'CCTV Security', text: 'Full campus monitored all day' },
  { icon: 'fa-medkit', title: 'First-Aid Room', text: 'Basic medical care and health checks' },
];

export const TOPPERS = [
  { name: 'Aarav Sharma', cls: 'Class 12 · Science', score: '94.2%', note: 'School Topper 2025–26' },
  { name: 'Priya Verma', cls: 'Class 12 · Commerce', score: '92.6%', note: 'Commerce Topper' },
  { name: 'Mohd. Aman', cls: 'Class 10', score: '95.0%', note: 'High School Topper' },
  { name: 'Ananya Gupta', cls: 'Class 12 · Arts', score: '90.8%', note: 'Arts Topper' },
];

export const NEWS = [
  { day: '15', month: 'Oct', tag: 'Admissions', title: 'Admissions open for 2026–27', text: 'Registration is open for Play Group to Class 12. Visit the office or apply online.' },
  { day: '24', month: 'Oct', tag: 'Event', title: 'Science Exhibition', text: 'Students of Class 6–12 will show working models and experiments to parents.' },
  { day: '14', month: 'Nov', tag: 'Celebration', title: "Children's Day Programme", text: 'Songs, drama and games for our little ones, hosted by the senior students.' },
  { day: '05', month: 'Dec', tag: 'Exams', title: 'Half-Yearly Examinations', text: 'Exams for Class 1–12 begin. Date sheet will be shared through class teachers.' },
  { day: '20', month: 'Dec', tag: 'Event', title: 'Annual Day', text: 'A colourful evening of dance, music and prize distribution. Parents are invited.' },
  { day: '26', month: 'Jan', tag: 'National', title: 'Republic Day', text: 'Flag hoisting, march-past and cultural programme on the school ground.' },
];

export const TESTIMONIALS = [
  { name: 'Mrs. Sangeeta Singh', role: 'Parent of Class 5 student', text: 'My daughter has grown so confident here. Teachers give personal attention and always keep us updated about her progress.' },
  { name: 'Mr. Rajeev Kumar', role: 'Parent of Class 9 student', text: 'Regular tests and clear feedback helped my son improve in Maths and Science. The discipline in school is excellent.' },
  { name: 'Neha Tyagi', role: 'Alumna, Class of 2022', text: 'K.M.S gave me a strong base. My teachers pushed me to do my best, and I am thankful for the years I spent there.' },
];

export const ADMISSION_STEPS = [
  { title: 'Enquiry', text: 'Call, WhatsApp or visit the school office.' },
  { title: 'Registration', text: 'Fill the form and submit the documents.' },
  { title: 'Interaction', text: 'A short, friendly meeting with the child.' },
  { title: 'Confirmation', text: 'Pay the fee and get your admission slip.' },
];
