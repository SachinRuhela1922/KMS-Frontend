import { page, H2, H3, P, UL, STATS, CARDS, STEPS, FAQ, TABLE, QUOTE, CALL, BTN } from './_helpers.js';

// Starter / sample text - verify fees, dates and eligibility with official JGU information before publishing.
const APPLY = 'https://admissions.jgu.edu.in';

const admissions = {
  'admissions': page(
    '/admissions',
    'Admissions',
    'Everything you need to know about applying to JGU — programmes, eligibility, process and support.',
    [
      H2('Start your journey at JGU'),
      P('JGU welcomes applications from motivated students across India and the world. Admission is based on a holistic review of academic record, entrance scores where applicable, written work, interviews and extracurricular achievements. Each programme has its own requirements, which are published every admission cycle on the admissions portal.'),
      CARDS('Choose your programme type', [
        ['Undergraduate', 'Three- to five-year bachelor\'s degrees with interdisciplinary foundations.', '/admissions/undergraduate', 'View details'],
        ['Postgraduate', 'Master\'s programmes for advanced study and professional practice.', '/admissions/postgraduate', 'View details'],
        ['Ph.D.', 'Doctoral research programmes supervised by experienced faculty.', '/admissions/phd', 'View details'],
        ['Online', 'Flexible online degrees for working professionals and distance learners.', '/admissions/online', 'View details'],
        ['Blended', 'A mix of online and on-campus learning.', '/admissions/blended', 'View details'],
        ['International Students', 'Guidance and support for applicants from outside India.', '/admissions/international-students', 'View details'],
      ]),
      H2('How to apply'),
      STEPS('Application process (general)', [
        ['Explore programmes', 'Review programme pages, curriculum details and eligibility on the website.'],
        ['Register on the admissions portal', 'Create an account with your email and mobile number.'],
        ['Complete the application form', 'Fill in personal, academic and programme preference details.'],
        ['Upload documents', 'Submit scanned copies of mark sheets, identity proof, photographs and other required documents.'],
        ['Pay the application fee', 'Pay online using the secure payment gateway, where applicable.'],
        ['Entrance / interview / written test', 'Appear for any programme-specific assessments as scheduled.'],
        ['Receive the decision', 'Check your portal and email for admission offers, scholarships and next steps.'],
        ['Confirm your seat', 'Accept the offer and pay the admission fee within the stated deadline.'],
      ]),
      TABLE('Documents usually required', ['Document', 'Applies to', 'Notes'], [
        ['Class 10 and Class 12 mark sheets', 'Undergraduate', 'Provisional results are accepted if final results are awaited'],
        ['Bachelor\'s degree transcripts', 'Postgraduate, Ph.D.', 'Final-year students may apply with latest semester results'],
        ['Identity proof', 'All', 'Passport, Aadhaar, driving licence or other government-issued ID'],
        ['Statement of purpose', 'Postgraduate, Ph.D.', 'Usually 500–1000 words'],
        ['Passport-size photograph', 'All', 'Recent colour photograph'],
        ['Entrance score card', 'Where applicable', 'LSAT-India, CUET, GMAT, GRE or JGU\'s own tests, depending on the programme'],
      ]),
      CALL('Important', 'Dates, fees, eligibility and seat availability change every year. Please always confirm the latest details on the official admissions portal before applying.'),
      H2('Scholarships and financial aid'),
      P('JGU offers a range of scholarships based on merit, need and special achievement. Applicants may be considered automatically at the time of admission, while some scholarships require a separate application. Education loans from partner banks are also available.'),
      UL('Merit-based scholarships for high academic performance', 'Need-based financial aid for deserving students', 'Sports, arts and leadership awards', 'Special support for students from under-represented backgrounds', 'Fee instalment options'),
      FAQ('Admissions FAQs', [
        ['When do applications open?', 'Application windows open in phases for each intake. Check the admissions portal for the latest schedule.'],
        ['Is there an entrance exam?', 'Some programmes require national or university-level entrance tests; others are based on academic records and interviews.'],
        ['Can I apply to more than one programme?', 'Yes. You may list multiple preferences in the application form, subject to programme rules.'],
        ['Whom do I contact for help?', 'Write to admissions@jgu.edu.in or use the contact details in the footer.'],
      ]),
      BTN('Apply Now', APPLY),
    ]
  ),

  'admissions-undergraduate': page(
    '/admissions/undergraduate',
    'Undergraduate',
    'Begin your university journey with a broad, interdisciplinary foundation and a clear path to your chosen specialisation.',
    [
      H2('Undergraduate programmes'),
      P('JGU undergraduate degrees combine disciplinary depth with the freedom to explore. Students graduate with strong analytical, writing and leadership skills and are prepared for careers or higher study across the world.'),
      P('Programmes are offered across law, business, liberal arts, international affairs, journalism, psychology, design, architecture, economics, finance, environment and more. Many programmes allow students to add a minor or an honours specialisation.'),
      STATS(['3–5 yrs', 'Typical duration (varies by programme)'], ['100+', 'Programmes across levels'], ['Credit-based', 'Flexible curriculum'], ['Global', 'Exchange opportunities']),
      H3('Who can apply'),
      P('Candidates who have completed (or are appearing for) their Class 12 examination from a recognised board are eligible. Programme-specific requirements, minimum marks and subject combinations are listed on the application portal.'),
      H3('What you get'),
      UL('Interdisciplinary curriculum with choice of minors', 'Internships and experiential learning', 'Study-abroad and exchange opportunities', 'Scholarships for merit and need', 'Mentoring, career support and an active alumni network'),
      CARDS('Popular fields of study', [
        ['Law', 'Integrated law degrees that combine legal studies with another discipline.'],
        ['Business', 'Management, finance, marketing, analytics and entrepreneurship.'],
        ['Liberal Arts', 'Humanities and social sciences with a flexible major-minor structure.'],
        ['International Affairs', 'Politics, diplomacy, security and global governance.'],
        ['Journalism & Media', 'News, digital content, film and communication studies.'],
        ['Psychology', 'Evidence-based study of mind, behaviour and wellbeing.'],
        ['Design & Architecture', 'Studio-based programmes in design, architecture and visual arts.'],
        ['Economics & Finance', 'Quantitative training for careers in economics, banking and finance.'],
      ]),
      STEPS('How to apply', [
        ['Choose a programme', 'Compare options and read the curriculum.'],
        ['Register online', 'Create an account on the admissions portal.'],
        ['Submit the application', 'Fill in the form and upload documents.'],
        ['Appear for assessment', 'Entrance test, written task or interview, if required.'],
        ['Receive your offer', 'Accept the offer and secure your seat.'],
      ]),
      FAQ('Undergraduate FAQs', [
        ['Can I switch majors?', 'In most programmes, yes, within the limits set by the academic regulations.'],
        ['Is there a gap-year policy?', 'Applicants with a gap year may apply, subject to programme rules.'],
        ['Are hostels compulsory?', 'Undergraduate students are normally expected to live on campus; exceptions are listed in the admission rules.'],
      ]),
      BTN('Apply for Undergraduate', APPLY),
    ]
  ),

  'admissions-postgraduate': page(
    '/admissions/postgraduate',
    'Postgraduate',
    'Advance your expertise with specialised master\'s programmes taught by leading scholars and practitioners.',
    [
      H2('Postgraduate programmes'),
      P('JGU postgraduate programmes provide advanced, specialised training for careers in law, business, public policy, international affairs, media, psychology, finance, design and the humanities. They combine rigorous coursework with research, internships and projects.'),
      P('Programmes typically run for one to two years and are taught by faculty who are active researchers and practitioners. Students benefit from small classes, seminars, workshops and guest sessions with industry and policy experts.'),
      H3('Eligibility'),
      P('Applicants must hold a bachelor\'s degree from a recognised university with the minimum marks specified for the programme. Final-year students may apply provisionally. Some programmes require entrance scores, work experience or a portfolio.'),
      TABLE('Typical postgraduate options (indicative)', ['Area', 'Duration', 'Highlights'], [
        ['Law (LL.M.)', '1 year', 'Specialisations, research paper, clinics and moots'],
        ['Business (MBA and specialised master\'s)', '1–2 years', 'Consulting projects, internships, global electives'],
        ['Public Policy & International Affairs', '2 years', 'Policy labs, fieldwork, study visits'],
        ['Liberal Arts & Humanities', '2 years', 'Dissertation, interdisciplinary seminars'],
        ['Psychology & Counselling', '2 years', 'Supervised practicum and case studies'],
        ['Media & Communication', '2 years', 'Studio projects and newsroom practice'],
      ]),
      CARDS('Why choose JGU for your master\'s', [
        ['Expert faculty', 'Learn from scholars and practitioners with national and international experience.'],
        ['Industry-linked', 'Live projects, internships and guest lectures from leading organisations.'],
        ['Research opportunities', 'Work with faculty on funded projects and publish your findings.'],
        ['Global exposure', 'Exchange programmes and summer schools with partner universities.'],
      ]),
      STEPS('Application process', [
        ['Register and apply', 'Complete the online application with academic details.'],
        ['Submit your statement of purpose', 'Explain your interests, goals and reasons for choosing the programme.'],
        ['Entrance / interview', 'Attend the selection process for your chosen programme.'],
        ['Admission offer', 'Receive and accept your offer to confirm your seat.'],
      ]),
      FAQ('Postgraduate FAQs', [
        ['Do I need work experience?', 'Some programmes prefer work experience; many accept fresh graduates.'],
        ['Are scholarships available?', 'Yes. Merit and need-based scholarships are available for eligible candidates.'],
        ['Can I do an internship during the programme?', 'Yes. Internships and projects are part of most programmes.'],
      ]),
      BTN('Apply for Postgraduate', APPLY),
    ]
  ),

  'admissions-phd': page(
    '/admissions/phd',
    'Ph.D.',
    'Pursue original research and contribute new knowledge in a supportive, interdisciplinary doctoral community.',
    [
      H2('Doctoral programmes at JGU'),
      P('JGU Ph.D. programmes are for scholars who wish to ask important questions and produce original, rigorous research. Candidates are admitted in disciplines such as law, economics, management, international affairs, public policy, sociology, literature, psychology, environment and more.'),
      P('Each scholar works under the guidance of an experienced supervisor and a doctoral committee. Coursework, seminars, publications and teaching or research assistantships form part of the doctoral training.'),
      STATS(['3–5 yrs', 'Typical duration (varies)'], ['Full-time & part-time', 'Modes (subject to rules)'], ['Fellowships', 'Available for eligible scholars']),
      H3('Eligibility'),
      UL('A master\'s degree (or equivalent) with the minimum marks required by the discipline', 'A clear research interest aligned with faculty expertise', 'Qualifying national-level test scores where applicable', 'A research proposal and statement of purpose'),
      STEPS('Admission process', [
        ['Identify your research area', 'Review faculty profiles and ongoing research.'],
        ['Prepare a research proposal', 'Present your research question, methods and expected contribution.'],
        ['Apply online', 'Submit the application, documents and proposal.'],
        ['Written test and interview', 'Take part in the selection stages specified for your discipline.'],
        ['Offer and registration', 'Accept the offer, complete registration and meet your supervisor.'],
      ]),
      CARDS('Support for doctoral scholars', [
        ['Research training', 'Courses on research methods, ethics, academic writing and publishing.'],
        ['Funding', 'Fellowships, assistantships and travel grants for eligible scholars.'],
        ['Community', 'Workshops, reading groups and colloquia that bring scholars together.'],
        ['Library & databases', 'Access to major journals, archives and datasets.'],
      ]),
      FAQ('Ph.D. FAQs', [
        ['Can I pursue a Ph.D. while working?', 'Part-time options may be available in some disciplines. Check the Office of Doctoral Studies for guidelines.'],
        ['How long does a Ph.D. take?', 'Most scholars take between three and five years depending on the discipline and research topic.'],
        ['Is a fellowship guaranteed?', 'Fellowships are limited and awarded on merit and availability.'],
      ]),
      BTN('Apply for Ph.D.', APPLY),
    ]
  ),

  'admissions-online': page(
    '/admissions/online',
    'Online',
    'Flexible, high-quality online programmes designed for working professionals and learners anywhere.',
    [
      H2('Learn from anywhere'),
      P('JGU online programmes bring the university\'s academic quality to learners who cannot attend a full-time on-campus course. Programmes use a modern learning platform with live classes, recorded lectures, discussion forums, assignments and regular assessments.'),
      CARDS('Why study online at JGU', [
        ['Flexible schedule', 'Study at your own pace alongside work and personal commitments.'],
        ['Expert faculty', 'Learn from the same faculty who teach on campus.'],
        ['Interactive learning', 'Live sessions, case studies, peer discussion and projects.'],
        ['Career support', 'Webinars, mentoring and networking for online learners.'],
        ['Recognised degrees', 'Programmes run under applicable regulatory approvals.'],
        ['Digital library', 'Access to e-books, journals and research databases.'],
      ]),
      STEPS('How online learning works', [
        ['Onboarding', 'Get an orientation to the platform, faculty and learning resources.'],
        ['Weekly learning', 'Watch lectures, attend live sessions and complete activities.'],
        ['Assignments & assessments', 'Submit coursework and appear for online examinations.'],
        ['Support', 'Reach academic mentors and the student support team whenever needed.'],
        ['Graduation', 'Complete all requirements and receive your degree.'],
      ]),
      H3('Eligibility'),
      P('Eligibility depends on the programme. Undergraduate online programmes generally require Class 12 completion, while postgraduate programmes require a recognised bachelor\'s degree. Work experience may be preferred for some master\'s programmes.'),
      FAQ('Online programme FAQs', [
        ['Are online degrees valid?', 'Online programmes are offered under the approvals applicable to the university. Please verify current approval details on the admissions portal.'],
        ['Do I need to visit campus?', 'Most activities are online, though some programmes may include optional campus immersions.'],
        ['What technology do I need?', 'A computer or tablet with a reliable internet connection is sufficient.'],
        ['How are exams conducted?', 'Examinations are conducted online or at designated centres as specified for each programme.'],
      ]),
      CALL('Contact the online admissions team', 'For online admission queries write to admissionsonline@jgu.edu.in.'),
      BTN('Apply for Online Programmes', APPLY),
    ]
  ),

  'admissions-blended': page(
    '/admissions/blended',
    'Blended',
    'Combine the flexibility of online learning with the richness of on-campus experiences.',
    [
      H2('The best of both worlds'),
      P('Blended programmes combine online learning with short, intensive on-campus sessions. Learners study most content online and then come to campus for workshops, labs, networking and assessments.'),
      P('This model suits working professionals and students who want an immersive experience without relocating full-time.'),
      TABLE('How blended learning is organised (indicative)', ['Component', 'Mode', 'What happens'], [
        ['Core lectures', 'Online', 'Recorded and live sessions on the learning platform'],
        ['Discussions and projects', 'Online', 'Group work, forums and mentor feedback'],
        ['Campus immersion', 'On campus', 'Workshops, labs, networking and project presentations'],
        ['Assessments', 'Online / on campus', 'As specified by each programme'],
      ]),
      CARDS('Benefits', [
        ['Flexibility', 'Continue working while you study.'],
        ['Campus experience', 'Meet faculty and classmates in person during immersions.'],
        ['Peer network', 'Build a professional network across industries.'],
        ['Hands-on learning', 'Use campus labs, studios and facilities for practical sessions.'],
      ]),
      STEPS('Admission steps', [
        ['Check eligibility', 'Review programme requirements.'],
        ['Apply online', 'Submit the application and documents.'],
        ['Interview or test', 'Participate in the selection process where applicable.'],
        ['Join the programme', 'Accept the offer and complete orientation.'],
      ]),
      FAQ('Blended programme FAQs', [
        ['How often will I need to be on campus?', 'The schedule varies by programme. Most blended programmes have a few short campus sessions in a year.'],
        ['Is accommodation available during immersions?', 'Hostel or guest housing may be arranged during campus sessions, subject to availability.'],
      ]),
      BTN('Apply for Blended Programmes', APPLY),
    ]
  ),

  'admissions-international-academy': page(
    '/admissions/international-academy',
    'JGU International Academy',
    'Preparatory, pathway and exchange programmes that connect learners with a global education.',
    [
      H2('About the International Academy'),
      P('The JGU International Academy offers pathway programmes, language and academic-skills support, and exchange opportunities for students who wish to study with a global perspective. It acts as a bridge between secondary education and university study, and between JGU and partner institutions abroad.'),
      CARDS('What the Academy offers', [
        ['Foundation programmes', 'Academic preparation for students entering university-level study.'],
        ['English and academic skills', 'Courses in writing, reading, speaking and critical thinking.'],
        ['Exchange and study abroad', 'Semester exchanges and summer schools with partner universities.'],
        ['Joint and dual programmes', 'Programmes designed in partnership with international institutions.'],
        ['Cultural orientation', 'Support for students adjusting to a new academic and cultural setting.'],
      ]),
      STEPS('Pathway to a JGU degree', [
        ['Apply to the Academy', 'Submit your application and academic records.'],
        ['Complete preparatory courses', 'Build the skills needed for degree-level study.'],
        ['Progress to a degree programme', 'Move into a JGU programme upon meeting progression requirements.'],
      ]),
      UL('Small classes and personalised academic support', 'Experienced teachers and mentors', 'Opportunities to join clubs, sports and cultural activities', 'Guidance on visas, travel and accommodation for international participants'),
      FAQ('International Academy FAQs', [
        ['Who can apply?', 'Students who have completed secondary education and want to prepare for university study in India or abroad.'],
        ['Is the Academy only for international students?', 'No. Indian and international students can both apply.'],
      ]),
      BTN('Enquire now', 'https://jgu.edu.in/contact-us'),
    ]
  ),

  'admissions-international-students': page(
    '/admissions/international-students',
    'International Students',
    'A welcoming community and dedicated support for students coming to JGU from across the world.',
    [
      H2('Welcome to JGU'),
      P('JGU is home to students from many countries. The International Office supports applicants from the first enquiry through arrival, orientation and graduation, helping students settle into life in India and succeed in their studies.'),
      STEPS('Admission process for international applicants', [
        ['Choose a programme', 'Check eligibility and equivalence of your qualifications.'],
        ['Submit an online application', 'Upload transcripts, passport copy, statement of purpose and English proficiency evidence where required.'],
        ['Receive an offer letter', 'Successful candidates receive an official letter of admission.'],
        ['Apply for a student visa', 'Use the offer letter to apply at the Indian mission in your country.'],
        ['Plan your arrival', 'The International Office will share arrival guidance and orientation dates.'],
      ]),
      TABLE('Typical requirements', ['Requirement', 'Details', 'Notes'], [
        ['Academic qualification', 'Secondary school or bachelor\'s degree, depending on the programme', 'Equivalence is assessed by the admissions team'],
        ['English proficiency', 'IELTS, TOEFL or equivalent, where required', 'Waivers may apply for English-medium education'],
        ['Passport', 'Valid for the duration of study', 'Needed for visa application'],
        ['Statement of purpose', 'A short essay on your goals', 'For most postgraduate programmes'],
      ]),
      CARDS('Support services', [
        ['Airport pickup & orientation', 'Assistance on arrival and a detailed orientation to campus and city life.'],
        ['Accommodation', 'On-campus housing options with international-student friendly facilities.'],
        ['Visa & FRRO guidance', 'Help with registration and documentation requirements.'],
        ['Buddy programme', 'Current students help newcomers settle in.'],
        ['Cultural events', 'Festivals, food fairs and activities celebrating cultural diversity.'],
        ['Health & insurance', 'Information on healthcare and insurance options.'],
      ]),
      CALL('Immigration and visa rules', 'Visa and immigration rules are decided by the Government of India and may change. Always check the latest requirements with the Indian mission in your country.'),
      FAQ('International student FAQs', [
        ['Can I work while studying?', 'Rules on work depend on your visa category. Please consult the International Office.'],
        ['Is food available for different dietary needs?', 'The campus dining facilities offer a variety of options. See the Food and Dining page for details.'],
        ['Who can I contact?', 'Write to admissions@jgu.edu.in with your questions.'],
      ]),
      BTN('Apply as an International Student', APPLY),
    ]
  ),

  'admissions-doctoral-studies': page(
    '/admissions/doctoral-studies',
    'Office of Doctoral Studies',
    'Supporting research scholars from admission to thesis submission and beyond.',
    [
      H2('About the Office of Doctoral Studies'),
      P('The Office of Doctoral Studies coordinates Ph.D. admissions, registration, coursework, research monitoring and thesis submission across the university. It ensures that doctoral training meets high standards of quality, ethics and academic integrity.'),
      CARDS('What the Office does', [
        ['Admissions', 'Manages Ph.D. admission cycles, selection tests and interviews.'],
        ['Registration & records', 'Maintains scholar records, progress reports and timelines.'],
        ['Training', 'Coordinates coursework, research methods training and workshops.'],
        ['Evaluation', 'Organises doctoral committee meetings, pre-submission seminars and viva voce examinations.'],
        ['Fellowships & funding', 'Supports scholars in applying for research funding and travel grants.'],
        ['Research integrity', 'Promotes ethical research and plagiarism checks.'],
      ]),
      STEPS('Stages of a Ph.D.', [
        ['Admission & registration', 'Selection, allocation of supervisor and formal registration.'],
        ['Coursework', 'Mandatory courses on research methodology and subject-specific topics.'],
        ['Research proposal approval', 'Presentation of the proposal to the doctoral committee.'],
        ['Research & periodic review', 'Regular progress reports and committee reviews.'],
        ['Thesis submission', 'Submission of the thesis after pre-submission presentation and plagiarism check.'],
        ['Viva voce & award', 'Open defence and final award of the degree.'],
      ]),
      TABLE('Important documents and forms (sample list)', ['Document', 'Purpose', 'When'], [
        ['Research proposal form', 'Approval of the research topic', 'After coursework'],
        ['Progress report', 'Record of research progress', 'Every semester'],
        ['Pre-submission presentation form', 'Permission to submit the thesis', 'Before thesis submission'],
        ['Thesis submission form', 'Formal submission of the thesis', 'At the time of submission'],
      ]),
      FAQ('Doctoral studies FAQs', [
        ['Where can I find the Ph.D. regulations?', 'The latest regulations are shared with scholars at registration and are available from the Office of Doctoral Studies.'],
        ['Can I change my supervisor?', 'Changes may be considered in exceptional circumstances with approval from the relevant committees.'],
      ]),
      CALL('Contact', 'For Ph.D. admission queries write to phd.admissions@jgu.edu.in.'),
      BTN('Ph.D. admissions', '/admissions/phd'),
    ]
  ),
};

export default admissions;
