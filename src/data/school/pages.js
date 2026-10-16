// Hardcoded content of every inner page. Same block types as before:
// heading, paragraph, list, stats, cards, steps, faq, table, quote, callout, button
// Cards can have an `icon` (Font Awesome 4 class) and `href`.
const h = (text, level = 'h2') => ({ type: 'heading', text, level });
const p = (text) => ({ type: 'paragraph', text });
const ul = (...items) => ({ type: 'list', bullets: items.map((text) => ({ text })) });
const stats = (...rows) => ({ type: 'stats', stats: rows.map(([value, label]) => ({ value, label })) });
const cards = (title, list) => ({ type: 'cards', title, cards: list });
const steps = (title, list) => ({ type: 'steps', title, steps: list.map(([t, text]) => ({ title: t, text })) });
const faq = (title, list) => ({ type: 'faq', title, faqs: list.map(([q, a]) => ({ q, a })) });
const table = (title, cols, rows) => ({ type: 'table', title, col1: cols[0], col2: cols[1], col3: cols[2] || '', rows: rows.map(([c1, c2, c3]) => ({ c1, c2, c3 })) });
const quote = (text, author) => ({ type: 'quote', text, author });
const callout = (title, text) => ({ type: 'callout', title, text });
const btn = (label, href) => ({ type: 'button', label, href });
const page = (path, title, intro, blocks) => ({ path, title, intro, published: true, showTitle: true, blocks });

const pages = {
  'about-us': page('/about-us', 'About Us',
    'A UP Board school that cares for studies, character and the future of every child.', [
    h('Welcome to K.M.S Inter College'),
    p('K.M.S Inter College is a co-educational school offering classes from Play Group to Class 12 under the UP Board (UPMSP). For more than two decades we have helped children learn with understanding, speak with confidence and behave with kindness.'),
    p('We believe a good school is one where children are happy to come, teachers are happy to teach and parents are happy with the progress. That is the school we work to be, every single day.'),
    stats(['25+', 'Years of Excellence'], ['60+', 'Qualified Teachers'], ['16', 'Classes (Play – 12)'], ['3', 'Streams in Class 11–12']),
    cards('Vision, Mission & Values', [
      { icon: 'fa-lightbulb-o', title: 'Our Vision', text: 'To be a trusted school where every child gets quality education and grows into a responsible citizen.' },
      { icon: 'fa-bullhorn', title: 'Our Mission', text: 'To give strong academics, discipline and life skills through caring teachers and a safe, joyful campus.' },
      { icon: 'fa-heartbeat', title: 'Our Values', text: 'Respect, honesty, hard work, teamwork and service to others guide everything we do.' },
    ]),
    quote('A school is not only a place to read books. It is a place where children learn how to think, how to behave and how to dream.', 'Principal, K.M.S Inter College'),
    h('What makes us different'),
    ul('Teaching in Hindi and English so every child understands clearly',
       'Regular tests, revision classes and monthly parent–teacher meetings',
       'Focus on discipline, values and good habits along with marks',
       'Sports, art, music and activities for all-round growth',
       'Safe campus with CCTV, trained staff and verified transport'),
    callout('Admissions Open 2026–27', 'Play Group to Class 12 — limited seats. Visit the school office or contact us today.'),
    btn('Apply Now', '/admissions'),
  ]),

  academics: page('/academics', 'Academics',
    'UP Board curriculum, taught step by step — with regular practice, tests and personal attention.', [
    h('Our approach to learning'),
    p('We follow the UP Board (UPMSP) syllabus. Teachers plan every chapter with clear aims, classroom activities, homework and revision so that children learn concepts, not just answers.'),
    cards('Stages of schooling', [
      { icon: 'fa-child', title: 'Pre-Primary (Play – UKG)', text: 'Learning through play, rhymes, stories, colours and numbers. Gentle start, happy habits.' },
      { icon: 'fa-pencil', title: 'Primary (1 – 5)', text: 'Strong basics in Hindi, English, Maths and EVS with art, games and reading time.' },
      { icon: 'fa-book', title: 'Upper Primary (6 – 8)', text: 'Science, Social Science, Sanskrit and Computers. Projects and experiments begin.' },
      { icon: 'fa-graduation-cap', title: 'Secondary (9 – 10)', text: 'Board-oriented teaching, weekly tests and doubt classes for the High School exam.' },
      { icon: 'fa-university', title: 'Senior Secondary (11 – 12)', text: 'Science, Commerce and Arts streams with practicals, guidance and career counselling.' },
    ]),
    cards('Streams in Class 11 – 12', [
      { icon: 'fa-flask', title: 'Science (PCM / PCB)', text: 'Physics, Chemistry with Mathematics or Biology, plus English and Hindi. Lab practicals every week.' },
      { icon: 'fa-line-chart', title: 'Commerce', text: 'Accountancy, Business Studies and Economics — a solid base for B.Com, CA and business studies.' },
      { icon: 'fa-balance-scale', title: 'Arts / Humanities', text: 'History, Civics, Geography, Economics, Sociology and Hindi Literature for civil services and teaching paths.' },
    ]),
    table('Assessment calendar', ['Assessment', 'Month', 'Classes'], [
      ['Unit Test 1', 'July', 'Class 1 – 12'],
      ['Half-Yearly Exam', 'December', 'Class 1 – 12'],
      ['Unit Test 2', 'February', 'Class 1 – 9, 11'],
      ['Annual / Board Exam', 'March', 'All classes (Board for 10 & 12)'],
    ]),
    callout('Extra support', 'Weak in a subject? Our teachers run remedial and doubt-clearing classes after school at no extra charge.'),
    btn('Explore Classes', '/classes'),
  ]),

  admissions: page('/admissions', 'Admissions',
    'Admissions are open for 2026–27. The process is simple, and our office team will help you at every step.', [
    callout('Session 2026–27', 'Registration is open for Play Group to Class 12. Seats are limited in every class — apply early.'),
    steps('How to apply', [
      ['Enquiry', 'Call or WhatsApp us, or visit the school office during working hours to collect the form.'],
      ['Registration', 'Fill in the admission form and submit it with the required documents.'],
      ['Interaction', 'A short, friendly interaction with the child (a simple written test from Class 1 onwards).'],
      ['Result & counselling', 'We share the result and guide you about class, subjects and stream.'],
      ['Fee & confirmation', 'Pay the admission fee and receive your admission slip. You are ready to join!'],
    ]),
    h('Documents required'),
    ul('Birth certificate (for Play Group to Class 5)',
       'Transfer Certificate (TC) from the previous school (Class 2 onwards)',
       'Previous year report card / mark sheet',
       'Aadhaar card of the child and parent',
       '4 recent passport-size photographs',
       'Address proof of parent / guardian'),
    table('Minimum age for admission', ['Class', 'Age (as on 1 April)', 'Note'], [
      ['Play Group', '2.5 years', 'Interaction only'],
      ['Nursery', '3.5 years', 'Interaction only'],
      ['LKG / UKG', '4.5 / 5.5 years', 'Interaction only'],
      ['Class 1', '6 years', 'Simple oral & written assessment'],
      ['Class 2 – 12', 'As per previous class', 'TC and report card required'],
    ]),
    faq('Frequently asked questions', [
      ['Which board does the school follow?', 'We follow the UP Board (UPMSP) syllabus from Play Group to Class 12.'],
      ['What is the medium of teaching?', 'Hindi and English. Children are taught in a way they understand and are encouraged to speak English.'],
      ['Can I get admission in the middle of the session?', 'Yes, if seats are available in the class. Please contact the office with the previous report card.'],
      ['Is school transport available?', 'Yes. Our buses cover nearby areas. Route and charges are shared by the transport in-charge.'],
      ['Are there any concessions?', 'Yes — sibling and merit concessions are available. See the Fee Structure page for details.'],
      ['Which streams are offered in Class 11?', 'Science (PCM / PCB), Commerce and Arts / Humanities.'],
    ]),
    btn('Contact Admission Office', '/contact-us'),
  ]),

  'admissions-fee-structure': page('/admissions/fee-structure', 'Fee Structure',
    'Clear and fair fees with no hidden charges. Class-wise amounts are on each class page.', [
    p('Our fee has a few simple parts. The exact amount depends on the class, so please open your child\'s class page for the full class-wise break-up.'),
    cards('What the fee includes', [
      { icon: 'fa-id-card', title: 'Admission Fee', text: 'One-time fee paid when the child joins the school. Not repeated every year.' },
      { icon: 'fa-book', title: 'Tuition Fee', text: 'Monthly fee for teaching, tests, notes and regular classroom support.' },
      { icon: 'fa-star', title: 'Annual Charges', text: 'Yearly charges for activities, sports, events, library and development.' },
      { icon: 'fa-file-text-o', title: 'Examination Fee', text: 'Yearly examination fee, including board form charges where applicable.' },
    ]),
    h('Payment'),
    ul('Tuition fee is paid monthly, by the 10th of each month',
       'Pay at the school office (cash / UPI / cheque) and collect your receipt',
       'A small late fee applies after the due date',
       'Transport fee, if taken, is paid separately with the monthly fee'),
    callout('Concessions', 'Sibling concession for the second and later child, and merit concession for school toppers. Ask the office for details.'),
    btn('View Class-wise Fees', '/classes'),
  ]),

  'admissions-rules': page('/admissions/rules', 'Rules & Uniform',
    'Simple rules that keep our school safe, disciplined and happy for everyone.', [
    table('School timings', ['Stage', 'Timing', 'Days'], [
      ['Play Group – UKG', '8:00 AM – 12:00 PM', 'Mon – Sat'],
      ['Class 1 – 8', '8:00 AM – 1:30 PM', 'Mon – Sat'],
      ['Class 9 – 12', '8:00 AM – 2:00 PM', 'Mon – Sat'],
    ]),
    cards('School uniform', [
      { icon: 'fa-smile-o', title: 'Summer', text: 'School shirt / kurta, trousers / skirt as per class, black shoes, white socks, school tie and belt.' },
      { icon: 'fa-leaf', title: 'Winter', text: 'School sweater or blazer in the school colour (maroon). Compulsory from 1 November.' },
      { icon: 'fa-futbol-o', title: 'Sports day (PT)', text: 'White T-shirt, track pants and white canvas shoes on the days of PT / games.' },
    ]),
    h('Rules for students'),
    ul('Reach school before the assembly bell. Late-comers need a note from parents.',
       'Minimum 75% attendance is needed to sit in exams',
       'Always carry the school diary and ID card',
       'Mobile phones, sharp objects and expensive items are not allowed in school',
       'Respect teachers, staff and classmates; bullying is not tolerated',
       'Keep the classroom and campus clean'),
    callout('For parents', 'Please check the school diary daily, attend the monthly Parent–Teacher Meeting and inform the class teacher about any leave in advance.'),
  ]),

  'campus-life': page('/campus-life', 'Campus Life',
    'Learning does not stop at the classroom door. Our campus is full of activity, friendship and fun.', [
    p('At K.M.S, we want children to enjoy school. Along with studies, they play, sing, draw, speak on stage and learn to work as a team — that is how confidence is built.'),
    cards('Explore campus life', [
      { icon: 'fa-futbol-o', title: 'Sports & Games', text: 'Cricket, football, kabaddi, athletics, yoga and indoor games.', href: '/campus-life/sports', linkLabel: 'See sports' },
      { icon: 'fa-flask', title: 'Library & Labs', text: 'A well-stocked library, science labs and a computer lab.', href: '/campus-life/library-labs', linkLabel: 'See facilities' },
      { icon: 'fa-bus', title: 'Transport & Safety', text: 'Verified buses, CCTV and a caring, safe environment.', href: '/campus-life/transport-safety', linkLabel: 'Know more' },
      { icon: 'fa-calendar', title: 'Events & Celebrations', text: 'Annual Day, Sports Day, science exhibition and national festivals.', href: '/campus-life/events', linkLabel: 'View calendar' },
    ]),
    h('Clubs & activities'),
    ul('Art & craft and drawing', 'Music, dance and drama', 'Quiz, debate and elocution', 'Science and maths club', 'Yoga and morning assembly', 'Scouts & community service'),
  ]),

  'campus-life-sports': page('/campus-life/sports', 'Sports & Games',
    'Healthy body, sharp mind. Every child gets daily play time with trained coaches.', [
    p('Sports teach discipline, teamwork and the courage to try again. Our large playground and trained PT teachers help children stay fit and enjoy games.'),
    cards('Games we play', [
      { icon: 'fa-futbol-o', title: 'Football & Cricket', text: 'Inter-house matches and coaching for school teams.' },
      { icon: 'fa-trophy', title: 'Athletics', text: 'Races, relay, long jump and shot put for all age groups.' },
      { icon: 'fa-heartbeat', title: 'Yoga & Fitness', text: 'Morning yoga, stretching and basic fitness for all classes.' },
      { icon: 'fa-gamepad', title: 'Indoor Games', text: 'Chess, carrom and table tennis in the activity room.' },
    ]),
    stats(['8+', 'Sports offered'], ['4', 'Houses for competition'], ['1', 'Annual Sports Day'], ['100%', 'Children take part']),
    callout('Annual Sports Day', 'Held every February. Parents are welcome to cheer for their children and watch the march-past and prize distribution.'),
  ]),

  'campus-life-library-labs': page('/campus-life/library-labs', 'Library & Labs',
    'Books, experiments and computers — learning by seeing, doing and reading.', [
    cards('Our facilities', [
      { icon: 'fa-book', title: 'Library', text: 'Story books, reference books, newspapers and magazines in Hindi and English with a quiet reading hall.' },
      { icon: 'fa-flask', title: 'Physics & Chemistry Lab', text: 'Apparatus and safety equipment so every student can do board-syllabus practicals.' },
      { icon: 'fa-leaf', title: 'Biology Lab', text: 'Models, charts and microscopes to understand life science clearly.' },
      { icon: 'fa-laptop', title: 'Computer Lab', text: 'Computers for every class, from basic typing to simple programming.' },
      { icon: 'fa-video-camera', title: 'Smart Classes', text: 'Digital boards with videos and animations for easier understanding.' },
    ]),
    stats(['10,000+', 'Books'], ['4', 'Science & computer labs'], ['40+', 'Computers'], ['6', 'Smart classrooms']),
    callout('Library hours', 'Open during school hours. Students can borrow two books at a time for one week.'),
  ]),

  'campus-life-transport-safety': page('/campus-life/transport-safety', 'Transport & Safety',
    'Your child\'s safety comes first — in the bus, in the classroom and on the playground.', [
    cards('Safety at K.M.S', [
      { icon: 'fa-bus', title: 'School Transport', text: 'Well-maintained buses with trained drivers and a lady attendant on every route.' },
      { icon: 'fa-video-camera', title: 'CCTV Monitoring', text: 'Cameras cover classrooms corridors, ground and gate throughout the day.' },
      { icon: 'fa-medkit', title: 'First-Aid Room', text: 'Basic medical care, regular health check-ups and quick help in an emergency.' },
      { icon: 'fa-lock', title: 'Gate Security', text: 'Children are handed over only to authorised parents / guardians with a gate pass.' },
    ]),
    h('Our safety promise'),
    ul('Trained staff for fire safety and first aid',
       'Regular fire drills and safety awareness classes',
       'Strict action against bullying and misbehaviour',
       'Parents are informed immediately in case of any problem'),
    callout('Transport enquiry', 'For routes, timings and charges, please call the school office or the transport in-charge.'),
    btn('Contact Us', '/contact-us'),
  ]),

  'campus-life-events': page('/campus-life/events', 'Events & Celebrations',
    'Festivals, competitions and programmes that create memories for a lifetime.', [
    table('Yearly calendar', ['Month', 'Event', 'Details'], [
      ['April', 'New Session & Orientation', 'Welcome to new students and parents'],
      ['August', 'Independence Day', 'Flag hoisting, songs and speeches'],
      ['September', "Teachers' Day", 'Programme by senior students'],
      ['October', 'Science Exhibition', 'Working models and experiments'],
      ['November', "Children's Day", 'Games, fun and cultural programme'],
      ['December', 'Annual Day', 'Dance, music, drama & prize distribution'],
      ['January', 'Republic Day', 'March-past and cultural programme'],
      ['February', 'Annual Sports Day', 'Races, team games and medals'],
    ]),
    callout('Parents are always welcome', 'We invite parents to our major events. Dates are shared through the school diary and class teachers.'),
  ]),

  achievements: page('/achievements', 'Achievements',
    'Our students work hard — and the results show. Proud moments from our school.', [
    stats(['98%', 'Board result'], ['120+', 'Students above 80%'], ['40+', 'Sports medals'], ['15+', 'Competition awards']),
    table('Our toppers (2025–26)', ['Student', 'Class', 'Score'], [
      ['Aarav Sharma', 'Class 12 · Science', '94.2%'],
      ['Mohd. Aman', 'Class 10', '95.0%'],
      ['Priya Verma', 'Class 12 · Commerce', '92.6%'],
      ['Ananya Gupta', 'Class 12 · Arts', '90.8%'],
    ]),
    cards('Beyond marks', [
      { icon: 'fa-trophy', title: 'Sports', text: 'District-level wins in football, kabaddi and athletics.' },
      { icon: 'fa-paint-brush', title: 'Art & Culture', text: 'Prizes in painting, singing and dance competitions.' },
      { icon: 'fa-lightbulb-o', title: 'Science & Quiz', text: 'Awards in science exhibitions and inter-school quizzes.' },
    ]),
    quote('Marks matter, but character matters more. We celebrate every child who works hard and does better than yesterday.', 'Principal'),
  ]),

  faculty: page('/faculty', 'Our Faculty',
    'Qualified, experienced and caring teachers who guide every child with patience.', [
    p('Our teachers hold the required degrees (B.Ed. / D.El.Ed. / M.Sc. / M.A. and more) and attend training workshops every year to stay updated with the best teaching methods.'),
    cards('School leadership', [
      { icon: 'fa-user-circle', title: 'Dr. R. K. Sharma', text: 'Principal · M.A., M.Ed., Ph.D. · 25+ years of teaching and administration.' },
      { icon: 'fa-user-circle', title: 'Mrs. Meena Agarwal', text: 'Vice Principal · M.Sc., B.Ed. · Head of Science & Mathematics.' },
      { icon: 'fa-user-circle', title: 'Mr. Anil Tyagi', text: 'Academic Coordinator · M.A., B.Ed. · Exams, timetable & discipline.' },
      { icon: 'fa-user-circle', title: 'Mrs. Sunita Sharma', text: 'Head, Pre-Primary · NTT, D.El.Ed. · 15 years with early learners.' },
    ]),
    stats(['60+', 'Teachers'], ['100%', 'Trained & qualified'], ['1 : 30', 'Teacher–student ratio'], ['15+', 'Years average experience']),
    callout('Class teachers', 'Each class has a class teacher who is your first point of contact. You can see class-wise faculty on the Classes page.'),
    btn('See Class-wise Faculty', '/classes'),
  ]),

  'contact-us': page('/contact-us', 'Contact Us',
    'Questions about admission, fees or transport? We are happy to help.', []),
};

export default pages;
