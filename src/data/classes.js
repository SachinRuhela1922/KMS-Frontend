// Default data for the "Classes" system (Play Group -> Class 12, UP Board).
// !! SAMPLE VALUES !!  Strength, fees, teacher names and events below are placeholders.
// Replace them with the real KMS Inter College details from  Admin Panel -> School -> Classes.
// (This file only seeds the very first content.json; after that everything is edited from the Admin Panel.)

const STAGES = {
  pre: 'Pre-Primary',
  pri: 'Primary',
  upr: 'Upper Primary',
  sec: 'Secondary',
  srs: 'Senior Secondary',
};

const s = (name, note = '') => ({ name, note });
const e = (title, month, text) => ({ title, month, text });
const f = (label, amount, note = '') => ({ label, amount, note });
const b = (text) => ({ text });

const NAMES = [
  ['Mrs. Sunita Sharma', 'Mr. Rakesh Verma', 'Mrs. Anjali Gupta', 'Mr. Vikas Tyagi', 'Mrs. Pooja Saini', 'Mr. Amit Chauhan'],
  ['Mrs. Neha Singh', 'Mr. Deepak Kumar', 'Mrs. Rekha Rani', 'Mr. Sandeep Rana', 'Mrs. Kavita Jain', 'Mr. Manoj Pundir'],
  ['Mrs. Meena Kashyap', 'Mr. Sunil Panwar', 'Mrs. Shweta Mishra', 'Mr. Rohit Baliyan', 'Mrs. Seema Tomar', 'Mr. Naveen Kumar'],
];

// [slug, name, stage, ages, strength, monthly fee, admission fee, annual charges]
const CLASS_ROWS = [
  ['play-group', 'Play Group', 'pre', '2.5 – 3.5 yrs', 45, 350, 1000, 1500],
  ['nursery', 'Nursery', 'pre', '3.5 – 4.5 yrs', 60, 400, 1000, 1500],
  ['lkg', 'LKG', 'pre', '4.5 – 5.5 yrs', 65, 450, 1200, 1600],
  ['ukg', 'UKG', 'pre', '5.5 – 6.5 yrs', 70, 500, 1200, 1600],
  ['class-1', 'Class 1', 'pri', '6 – 7 yrs', 80, 550, 1500, 1800],
  ['class-2', 'Class 2', 'pri', '7 – 8 yrs', 80, 550, 1500, 1800],
  ['class-3', 'Class 3', 'pri', '8 – 9 yrs', 85, 600, 1500, 2000],
  ['class-4', 'Class 4', 'pri', '9 – 10 yrs', 85, 600, 1500, 2000],
  ['class-5', 'Class 5', 'pri', '10 – 11 yrs', 90, 650, 1500, 2000],
  ['class-6', 'Class 6', 'upr', '11 – 12 yrs', 100, 700, 2000, 2200],
  ['class-7', 'Class 7', 'upr', '12 – 13 yrs', 100, 700, 2000, 2200],
  ['class-8', 'Class 8', 'upr', '13 – 14 yrs', 95, 750, 2000, 2200],
  ['class-9', 'Class 9', 'sec', '14 – 15 yrs', 110, 850, 2500, 2500],
  ['class-10', 'Class 10', 'sec', '15 – 16 yrs', 105, 900, 2500, 2500],
  ['class-11', 'Class 11', 'srs', '16 – 17 yrs', 120, 1000, 3000, 3000],
  ['class-12', 'Class 12', 'srs', '17 – 18 yrs', 115, 1000, 3000, 3000],
];

const PRE_SUBJECTS = [
  s('English – Rhymes & Phonics', 'Letters, sounds, picture reading'),
  s('Hindi – Varnmala', 'Swar, vyanjan, simple words'),
  s('Numbers & Maths Readiness', 'Counting, shapes, patterns'),
  s('EVS / General Awareness', 'Family, animals, fruits, seasons'),
  s('Art & Craft', 'Colouring, clay, paper craft'),
  s('Story Time & Activities', 'Listening, speaking, group play'),
  s('Music, Dance & Play', 'Rhymes, rhythm, motor skills'),
];
const PRIMARY_SUBJECTS = (cls) => [
  s('Hindi', 'Vyakaran, kahani, kavita'),
  s('English', 'Reading, grammar, writing'),
  s('Mathematics', 'Numbers, tables, basic operations'),
  cls <= 2 ? s('EVS (Environmental Studies)', 'Our surroundings') : s('Science', 'Basic science concepts'),
  ...(cls >= 3 ? [s('Social Science', 'Our country, community, maps')] : []),
  s('General Knowledge'),
  s('Computer Basics'),
  s('Drawing / Art'),
  s('Moral Science & Physical Education'),
];
const UPPER_SUBJECTS = [
  s('Hindi'), s('English'), s('Mathematics'), s('Science'), s('Social Science', 'History, Civics, Geography'),
  s('Sanskrit'), s('Computer Science'), s('Drawing / Art'), s('Physical Education'),
];
const SECONDARY_SUBJECTS = [
  s('Hindi', 'Compulsory'), s('English', 'Compulsory'), s('Mathematics', 'Compulsory'), s('Science', 'Physics, Chemistry, Biology'),
  s('Social Science', 'History, Geography, Civics, Economics'),
  s('Elective (any one)', 'Sanskrit / Drawing / Home Science / Computer – as offered'),
  s('Physical Education & Computer', 'Internal assessment'),
];

const STREAMS_SRS = [
  { name: 'Science (PCM)', subjects: 'Physics, Chemistry, Mathematics + General Hindi + English' },
  { name: 'Science (PCB)', subjects: 'Physics, Chemistry, Biology + General Hindi + English' },
  { name: 'Commerce', subjects: 'Accountancy, Business Studies, Economics + General Hindi + English' },
  { name: 'Arts / Humanities', subjects: 'History, Civics (Political Science), Geography, Economics, Sociology, Hindi Literature – any combination as offered' },
];
const SRS_SUBJECTS = [
  s('General Hindi', 'Compulsory for all streams'),
  s('English', 'As offered'),
  s('Physics, Chemistry, Maths / Biology', 'Science stream (with practicals)'),
  s('Accountancy, Business Studies, Economics', 'Commerce stream'),
  s('History, Civics, Geography, Economics, Sociology', 'Arts stream'),
  s('Physical Education & Project Work', 'Internal assessment'),
];

const COMMON_EVENTS = [
  e('Independence Day', 'August', 'Flag hoisting, march-past and cultural programme.'),
  e('Teachers’ Day', 'September', 'Students honour their teachers with a special programme.'),
  e('Republic Day', 'January', 'Flag hoisting, patriotic songs and speeches.'),
  e('Parent–Teacher Meeting', 'Every term', 'Progress discussion with parents.'),
];
const eventsFor = (stage, slug) => {
  if (stage === 'pre') {
    return [
      e('Orientation Day', 'April', 'Welcome for new students and parents.'),
      e('Fancy Dress & Rhymes Day', 'August', 'Little ones dress up and recite rhymes.'),
      e('Children’s Day', 'November', 'Games, treats and fun activities.'),
      e('Annual Function', 'December', 'Dance, drama and songs on stage.'),
      ...(slug === 'ukg' ? [e('Graduation Day', 'March', 'Farewell to UKG and welcome to Class 1.')] : []),
      ...COMMON_EVENTS.slice(0, 2),
    ];
  }
  if (stage === 'pri') {
    return [
      e('Art & Craft Fair', 'August', 'Display of student art and craft work.'),
      e('Spelling Bee & Quiz', 'September', 'Inter-section English / GK competition.'),
      e('Annual Sports Day', 'November', 'Races, relay and team games.'),
      e('Children’s Day', 'November', 'Special programme and activities.'),
      e('Annual Function', 'December', 'Cultural programme and prize distribution.'),
      ...COMMON_EVENTS,
    ];
  }
  if (stage === 'upr') {
    return [
      e('Inter-House Debate & Declamation', 'August', 'Hindi and English speaking competitions.'),
      e('Maths & Science Exhibition', 'October', 'Working models and charts by students.'),
      e('Annual Sports Day', 'November', 'Athletics and team sports.'),
      e('Annual Function', 'December', 'Cultural programme and awards.'),
      ...COMMON_EVENTS,
    ];
  }
  if (stage === 'sec') {
    return slug === 'class-10'
      ? [
        e('Pre-Board Examination', 'December – January', 'Full-syllabus practice tests.'),
        e('Career Guidance Session', 'October', 'Stream selection guidance for Class 11.'),
        e('UP Board High School Exam', 'February – March', 'As per UPMSP time-table.'),
        e('Farewell Party', 'February', 'Farewell by Class 9 students.'),
        ...COMMON_EVENTS,
      ]
      : [
        e('Science Exhibition', 'October', 'Experiments and working models.'),
        e('Annual Sports Day', 'November', 'Athletics and team sports.'),
        e('Half-Yearly Examination', 'September', 'Written test and internal assessment.'),
        e('Annual Function', 'December', 'Cultural programme and awards.'),
        ...COMMON_EVENTS,
      ];
  }
  return slug === 'class-12'
    ? [
      e('Pre-Board Examination', 'December – January', 'Full-syllabus practice tests.'),
      e('Practical Examinations', 'January – February', 'As scheduled by UPMSP.'),
      e('Farewell Party', 'February', 'Farewell by Class 11 students.'),
      e('UP Board Intermediate Exam', 'February – March', 'As per UPMSP time-table.'),
      e('Career Counselling', 'October', 'Guidance on college, entrance exams and careers.'),
      ...COMMON_EVENTS,
    ]
    : [
      e('Stream Orientation', 'April', 'Subject choice guidance for Science, Commerce and Arts.'),
      e('Science / Commerce / Arts Fest', 'October', 'Stream-wise exhibitions and competitions.'),
      e('Annual Sports Day', 'November', 'Athletics and team sports.'),
      e('Annual Function', 'December', 'Cultural programme and awards.'),
      ...COMMON_EVENTS,
    ];
};

const subjectsFor = (stage, num) => {
  if (stage === 'pre') return PRE_SUBJECTS;
  if (stage === 'pri') return PRIMARY_SUBJECTS(num);
  if (stage === 'upr') return UPPER_SUBJECTS;
  if (stage === 'sec') return SECONDARY_SUBJECTS;
  return SRS_SUBJECTS;
};

const qualFor = (stage) =>
  ({ pre: 'NTT / D.El.Ed.', pri: 'B.A., B.Ed.', upr: 'M.A. / M.Sc., B.Ed.', sec: 'M.A. / M.Sc., B.Ed.', srs: 'M.A. / M.Sc., B.Ed. (PGT)' }[stage]);

const buildClass = ([slug, name, stage, ages, strength, monthly, admission, annual], idx) => {
  const num = Number(slug.replace('class-', '')) || 0;
  const subjects = subjectsFor(stage, num);
  const pool = NAMES[idx % NAMES.length];
  const qual = qualFor(stage);
  const sectionCount = Math.max(1, Math.ceil(strength / 40));
  const letters = 'ABCDEF'.slice(0, sectionCount).split('').join(', ');
  const faculty = [
    { name: pool[0], role: `Class Teacher – ${name}`, qualification: qual },
    ...subjects.slice(0, 5).map((sub, i) => ({
      name: pool[(i + 1) % pool.length],
      role: `${sub.name.split(/[–,(]/)[0].trim()} Teacher`,
      qualification: qual,
    })),
  ];
  const isSrs = stage === 'srs';
  return {
    slug,
    name,
    stage: STAGES[stage],
    ages,
    board: 'UP Board (UPMSP)',
    medium: 'Hindi & English',
    strength: String(strength),
    sections: `${sectionCount} (${letters})`,
    studentsPerSection: `~${Math.ceil(strength / sectionCount)}`,
    classTeacher: pool[0],
    timing: stage === 'pre' ? '8:00 AM – 12:00 PM' : '8:00 AM – 2:00 PM',
    about: isSrs
      ? `${name} at K.M.S Inter College follows the UP Board (UPMSP) Intermediate syllabus. Students choose a stream – Science, Commerce or Arts – and prepare for the board examination with regular tests, practicals and career guidance.`
      : stage === 'sec'
        ? `${name} follows the UP Board (UPMSP) High School syllabus. The focus is on strong basics in every subject, regular revision tests and preparation for the board examination.`
        : stage === 'pre'
          ? `${name} is designed for learning through play. Children build language, number sense, motor skills and good habits in a safe, caring and joyful classroom.`
          : `${name} follows the UP Board syllabus with a balance of academics, activities and values, so that every child learns with understanding and confidence.`,
    highlights: [
      b('UP Board (UPMSP) aligned syllabus'),
      b(stage === 'pre' ? 'Activity-based, play-way learning' : 'Regular tests and revision'),
      b('Caring, qualified teachers'),
      b(isSrs ? 'Career guidance and practicals' : 'Sports, art and co-curricular activities'),
    ],
    subjects,
    streams: isSrs ? STREAMS_SRS : [],
    faculty,
    fees: [
      f('Admission fee', `₹ ${admission.toLocaleString('en-IN')}`, 'One time, at admission'),
      f('Tuition fee', `₹ ${monthly.toLocaleString('en-IN')} / month`, isSrs ? 'Science stream; Commerce / Arts may differ' : ''),
      f('Annual charges', `₹ ${annual.toLocaleString('en-IN')} / year`, 'Activities, sports, development'),
      f('Examination fee', stage === 'sec' || isSrs ? '₹ 600 / year' : '₹ 300 / year', 'Includes board form charges where applicable'),
      ...(stage === 'upr' || stage === 'sec' || isSrs ? [f('Computer / Lab fee', isSrs ? '₹ 800 / year' : '₹ 500 / year')] : []),
      f('Transport (optional)', 'As per distance', 'School bus / van'),
    ],
    feeNote: 'Sample fee structure – please contact the school office for the latest fees and concessions.',
    events: eventsFor(stage, slug),
  };
};

export const classesIntro = {
  title: 'Our Classes',
  intro: 'K.M.S Inter College offers education from Play Group to Class 12 following the UP Board (UPMSP) syllabus. Select a class to see its strength, faculty, subjects, streams, fees and events.',
  board: 'UP Board (UPMSP)',
  session: '2026–27',
  placeholder: 'Select your class',
  admissionNote: 'Admissions open for all classes – Play Group to Class 12.',
};

const classes = { ...classesIntro, items: CLASS_ROWS.map(buildClass) };
export default classes;
