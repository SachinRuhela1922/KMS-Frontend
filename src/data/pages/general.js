import { page, H2, H3, P, UL, STATS, CARDS, STEPS, FAQ, TABLE, QUOTE, CALL, BTN } from './_helpers.js';

// NOTE: This is starter / sample text. Exact fees, dates, ranks and eligibility must be checked
// against official JGU information. Everything here can be edited from Admin Panel -> Pages.
const general = {
  'discover-jgu': page(
    '/discover-jgu',
    'Discover JGU',
    'Explore the story, vision and everyday life of a university built on the idea of a global education rooted in public service.',
    [
      H2('A university with a global outlook'),
      P('O.P. Jindal Global University (JGU) is a non-profit, multidisciplinary university located in Sonipat, Haryana. Since its founding it has set out to build an institution that combines academic rigour with a strong sense of social responsibility, and that prepares graduates to lead in India and across the world.'),
      P('JGU brings together students and faculty from many countries, disciplines and backgrounds. Classrooms are small and discussion-driven, programmes are designed to cross traditional boundaries, and every student is encouraged to pair what they learn in lectures with internships, research, community work and time abroad.'),
      STATS(['16000+', 'Students'], ['1100+', 'Faculty & Staff'], ['620+', 'International Collaborations'], ['22400+', 'Alumni Network'], ['10730+', 'Publications']),
      H2('Our vision and mission'),
      QUOTE('To promote global education that is relevant, interdisciplinary and rooted in public service, so that graduates can contribute meaningfully to society.', 'JGU vision (sample text)'),
      UL(
        'Provide teaching of the highest quality in an environment that values curiosity and debate',
        'Encourage original research that addresses real social, economic and policy challenges',
        'Build lasting partnerships with universities, industry and civil society across the world',
        'Serve the public interest through knowledge, advocacy and outreach',
        'Maintain a diverse, inclusive and safe community for every student and staff member'
      ),
      CARDS('What makes JGU different', [
        ['Interdisciplinary learning', 'Students are free to combine subjects, choose minors and explore areas outside their major, so that they graduate with a broader and more adaptable skill set.'],
        ['Global exposure', 'Exchange semesters, summer schools, visiting professors and joint programmes with partner universities give students an international perspective.'],
        ['Experiential learning', 'Moot courts, studios, labs, field work, internships and live projects turn classroom ideas into practical experience.'],
        ['Research culture', 'Faculty-led centres, journals, conferences and policy labs involve students in research from their first year.'],
        ['Small classes', 'A healthy student-faculty ratio means more attention, more feedback and more mentoring for every learner.'],
        ['Residential campus', 'A green, safe, fully residential campus where learning continues well beyond the classroom.'],
      ]),
      H2('Life at JGU'),
      P('Student life at JGU is as important as the curriculum. More than a hundred clubs, societies and student-run initiatives cover debating, theatre, music, entrepreneurship, sports, environment and community service. Orientation programmes, festivals, guest lectures and inter-university competitions keep the calendar full throughout the year.'),
      P('The campus offers modern classrooms, studios and labs, a well-stocked library, sports facilities, dining options, residential blocks and on-campus healthcare — all within walking distance of each other.'),
      CALL('Plan a campus visit', 'Nothing explains JGU better than seeing it. Schedule a campus tour to meet faculty, speak to current students and explore classrooms, hostels and facilities in person.'),
      FAQ('Frequently asked questions', [
        ['Is JGU a private or public university?', 'JGU is a private, non-profit university that works with a public-service mission. It is established under a state law and recognised by the relevant national regulators.'],
        ['Where is the campus located?', 'The campus is on Sonipat Narela Road, near Jagdishpur Village, Sonipat, Haryana 131001, close to Delhi-NCR.'],
        ['Can international students study at JGU?', 'Yes. JGU welcomes students from many countries. Please see the International Students page for the application process and support available.'],
        ['How do I get more information?', 'You can write to the admissions team, call the helpline or visit the campus. Contact details are available in the website footer.'],
      ]),
      BTN('Explore programmes', '/admissions'),
    ]
  ),

  'study-at-jgu': page(
    '/study-at-jgu',
    'Study at JGU',
    'Programmes, teaching style, academic support and the learning experience that shape a JGU degree.',
    [
      H2('Learning that goes beyond lectures'),
      P('Studying at JGU means being an active participant in your own education. Courses are built around discussion, writing, problem-solving and collaboration. Faculty act as mentors who challenge students to think independently and to connect ideas from different fields.'),
      P('Programmes follow a flexible, credit-based structure. In the early semesters students build a broad foundation; later they deepen their expertise in a major and may add a minor, an honours track or a research project.'),
      CARDS('Areas of study', [
        ['Law', 'Programmes in law, regulation, policy and justice with a strong focus on advocacy and clinical learning.'],
        ['Business & Management', 'Programmes in management, entrepreneurship, marketing, analytics and finance that combine theory with live projects.'],
        ['Liberal Arts & Humanities', 'Subjects such as literature, history, philosophy, sociology and languages taught in an interdisciplinary setting.'],
        ['International Affairs & Public Policy', 'Diplomacy, governance, development and public policy with exposure to global institutions.'],
        ['Journalism, Media & Communication', 'Reporting, storytelling, digital media and communication practice in a modern newsroom environment.'],
        ['Psychology, Environment & Sustainability', 'Evidence-based programmes in mental health, behaviour, climate and sustainable development.'],
        ['Architecture, Design & Art', 'Studio-based learning in architecture, design thinking, visual communication and the arts.'],
        ['Banking, Finance & Economics', 'Quantitative and applied programmes for careers in finance, markets and economic research.'],
      ]),
      H2('How a JGU course works'),
      STEPS('A typical learning journey', [
        ['Foundation semesters', 'Introductory courses across disciplines develop critical reading, writing, quantitative reasoning and communication skills.'],
        ['Choosing a major', 'Students declare a major after exploring subjects, with academic advisors helping them make informed choices.'],
        ['Minors and electives', 'A wide basket of electives and minors allows students to build unique combinations of knowledge.'],
        ['Experiential components', 'Internships, field work, studios, clinics and projects are built into the programme calendar.'],
        ['Capstone or research project', 'A final-year project or dissertation lets students apply what they have learned to a real problem.'],
      ]),
      H2('Academic support'),
      UL(
        'Academic advising and mentoring from the first semester',
        'Writing and communication support centres',
        'Peer tutoring and study groups',
        'Library research training and access to national and international databases',
        'Learning support and accessibility services for students who need them',
        'Dedicated placement and career guidance cells'
      ),
      TABLE('Learning methods at a glance', ['Method', 'What it involves', 'Where you will see it'], [
        ['Seminars', 'Small-group discussion of readings, cases and problems', 'Most undergraduate and postgraduate courses'],
        ['Studios & labs', 'Hands-on work with tools, materials and software', 'Design, architecture, media, psychology, sciences'],
        ['Moots & simulations', 'Role-based exercises such as courtrooms, negotiations and model assemblies', 'Law, international affairs, public policy'],
        ['Field work', 'Learning in communities, organisations and institutions outside the campus', 'Social sciences, public health, environment'],
        ['Projects & capstones', 'Independent or team-based investigation of a problem', 'Final year of most programmes'],
      ]),
      CALL('Study abroad', 'Students can spend a semester or a summer at one of JGU\'s partner universities. Credits earned abroad are usually transferable, subject to programme rules.'),
      FAQ('Common questions', [
        ['Can I change my major after joining?', 'In most undergraduate programmes students can change their major within the first year, subject to eligibility and availability. Speak to your academic advisor.'],
        ['What is the medium of instruction?', 'English is the medium of instruction for almost all programmes.'],
        ['Are there scholarships?', 'JGU offers a range of merit-based and need-based scholarships. Details are published each admission cycle on the admissions portal.'],
      ]),
      BTN('View admissions', '/admissions'),
    ]
  ),

  'research-publications': page(
    '/research-publications',
    'Research & Publications',
    'Faculty-led research, centres of excellence and scholarly publications that contribute to knowledge and public policy.',
    [
      H2('A culture of research'),
      P('Research is at the heart of JGU. Faculty members publish books, journal articles and policy papers, lead funded projects, and advise governments, courts and international organisations. Students are invited into this work through research assistantships, seminars, writing programmes and capstone projects.'),
      STATS(['10730+', 'Publications'], ['100+', 'Research Centres & Labs (sample)'], ['50+', 'Journals & Reviews (sample)'], ['620+', 'Global Collaborations']),
      H2('Research areas'),
      CARDS('Where our scholars work', [
        ['Law, Justice & Governance', 'Constitutional law, human rights, criminal justice, arbitration, technology law and legal education.'],
        ['Economics & Public Policy', 'Development economics, trade, public finance, health policy and regulatory studies.'],
        ['International Affairs', 'Foreign policy, security studies, multilateralism and regional cooperation.'],
        ['Society, Culture & Humanities', 'Literature, history, philosophy, gender studies, languages and cultural analysis.'],
        ['Business, Finance & Analytics', 'Corporate governance, behavioural finance, supply chains, marketing and data science.'],
        ['Environment & Sustainability', 'Climate policy, energy transition, urban sustainability and natural resource management.'],
        ['Health & Behavioural Sciences', 'Public health systems, mental health, counselling and behavioural interventions.'],
        ['Media, Design & Technology', 'Digital media, communication, design thinking and human-centred technology.'],
      ]),
      H2('Centres, journals and conferences'),
      P('Interdisciplinary centres provide a home for long-term research agendas, bring visiting scholars to campus and host workshops open to the wider community. Peer-reviewed journals and student-edited reviews give early-career researchers a place to publish. Annual conferences and symposia connect JGU scholars with colleagues from India and abroad.'),
      UL(
        'Dedicated research centres on law, policy, economics, health, media and sustainability',
        'Peer-reviewed journals edited by faculty and students',
        'Annual conferences, colloquia and public lecture series',
        'Working paper series and policy briefs',
        'Visiting fellowships for national and international scholars'
      ),
      H2('Research support for students'),
      STEPS('How students get involved', [
        ['Attend research seminars', 'Open talks and workshops introduce students to current questions and methods.'],
        ['Find a faculty mentor', 'Approach faculty whose work interests you and offer to assist with reading, data collection or editing.'],
        ['Join a research project', 'Assistantships and internships within centres provide paid or credit-bearing research experience.'],
        ['Write and publish', 'Submit your work to student journals, conferences and competitions with faculty guidance.'],
      ]),
      CALL('Research integrity', 'JGU expects all researchers to follow high standards of academic integrity, ethical review and proper citation. Training and policy documents are available to every student and faculty member.'),
      FAQ('Research FAQs', [
        ['Can undergraduates do research?', 'Yes. Many undergraduates assist faculty, present at conferences and publish in student journals.'],
        ['Where can I find publications by JGU faculty?', 'Faculty publication lists are available through the library database and individual faculty profile pages.'],
        ['How are research grants managed?', 'The research office supports faculty with proposal development, compliance and project administration.'],
      ]),
      BTN('Learn more about research', 'https://jgu.edu.in/research'),
    ]
  ),

  'career-employability': page(
    '/career-employability',
    'Career & Employability',
    'From the first semester to graduation and beyond, JGU prepares students for meaningful careers and lifelong learning.',
    [
      H2('Career readiness at every stage'),
      P('The Career Development Office works with students from the day they join. Workshops, mentoring, industry interactions and internships help students discover their strengths, build professional skills and make confident decisions about their futures.'),
      P('Employers from law firms, consulting companies, banks, media houses, technology firms, NGOs, think tanks and government bodies regularly visit campus to meet students, run workshops and recruit graduates.'),
      STATS(['90%+', 'Placement support for registered students (sample)'], ['400+', 'Recruiting organisations (sample)'], ['22400+', 'Alumni network'], ['100+', 'Internship partners (sample)']),
      STEPS('Your career journey at JGU', [
        ['Year 1 – Explore', 'Career discovery sessions, personality and interest profiling, and introductory workshops on CVs and communication.'],
        ['Year 2 – Build', 'Skill-building courses, first internships, club leadership roles and mentoring from alumni.'],
        ['Year 3 – Experience', 'Longer internships, live projects, industry visits and specialisation-linked training.'],
        ['Final year – Launch', 'Mock interviews, resume reviews, recruitment drives, higher-study guidance and entrepreneurship support.'],
      ]),
      CARDS('Services offered', [
        ['Career counselling', 'One-to-one sessions to clarify goals, compare options and plan next steps.'],
        ['Internships & projects', 'Access to a wide network of organisations that offer short- and long-term internships.'],
        ['Skills training', 'Workshops on communication, negotiation, data tools, interviewing and professional etiquette.'],
        ['Recruitment drives', 'On-campus and virtual recruitment events across sectors.'],
        ['Higher education guidance', 'Support with applications, statements of purpose and scholarships for study in India and abroad.'],
        ['Entrepreneurship support', 'Incubation, mentoring and access to networks for student start-ups.'],
      ]),
      TABLE('Career pathways by discipline (indicative)', ['Discipline', 'Typical career areas', 'Higher study options'], [
        ['Law', 'Litigation, corporate law firms, in-house counsel, public service, policy', 'LL.M., Ph.D., judicial services preparation'],
        ['Business & Finance', 'Consulting, banking, marketing, analytics, entrepreneurship', 'MBA, M.Sc. Finance, Ph.D.'],
        ['Liberal Arts & Humanities', 'Publishing, education, research, civil society, communications', 'M.A., M.Phil., Ph.D.'],
        ['International Affairs & Policy', 'Diplomacy, think tanks, international organisations, public policy', 'M.A. International Affairs, M.P.P.'],
        ['Media & Design', 'Journalism, content, design studios, advertising, film', 'M.A. Media, M.Des., M.Arch.'],
      ]),
      QUOTE('The internships and mentoring I received helped me understand what I wanted to do long before graduation.', 'JGU alumnus (sample testimonial)'),
      FAQ('Questions about careers', [
        ['Is placement guaranteed?', 'JGU provides extensive placement support, but offers depend on the student\'s performance, preparation and market conditions.'],
        ['Can I do an internship in every semester break?', 'Yes. Students are encouraged to complete multiple internships across different sectors.'],
        ['Do alumni help with careers?', 'Yes. The alumni network offers mentoring, referrals and talks for current students.'],
      ]),
      BTN('Meet our alumni', 'https://jgu.edu.in/alumni'),
    ]
  ),

  'about-us': page(
    '/about-us',
    'About Us',
    'Learn about the vision, values and leadership shaping O.P. Jindal Global University.',
    [
      H2('About O.P. Jindal Global University'),
      P('O.P. Jindal Global University is a non-profit, multidisciplinary university dedicated to excellence in teaching, research and public service. Established in Sonipat, Haryana, it has grown into an international institution with students, faculty and partners across the globe.'),
      P('JGU offers programmes across Law, Business, Liberal Arts, Psychology, Economics, Media, Journalism, Architecture, Design, Banking, Finance, Environment, Public Policy, Public Health, Languages and International Relations. Its courses are designed to meet students\' academic and professional needs through interdisciplinary learning and practical application.'),
      STATS(['16000+', 'Students'], ['1100+', 'Faculty & Staff'], ['620+', 'International Collaborations'], ['22400+', 'Alumni Network'], ['10730+', 'Publications']),
      H2('Our values'),
      UL(
        'Academic excellence and intellectual freedom',
        'Ethical leadership and social responsibility',
        'Diversity, inclusion and global engagement',
        'Public service through knowledge',
        'Integrity, transparency and accountability'
      ),
      H2('Leadership and governance'),
      P('The university is led by its Chancellor, Vice Chancellor and a team of deans, directors and administrators. Statutory bodies — including the Board of Management, Academic Council and Finance Committee — oversee academic standards, policies and financial management.'),
      CARDS('Governance structure (sample)', [
        ['Chancellor & Vice Chancellor', 'Provide strategic direction and academic leadership for the university.'],
        ['Deans & Directors', 'Lead individual schools, centres and academic departments.'],
        ['Academic Council', 'Approves curricula, assessment frameworks and academic regulations.'],
        ['Student Representatives', 'Participate in committees and consultations to bring student voices into decision-making.'],
      ]),
      H2('Milestones'),
      STEPS('Our journey so far', [
        ['Foundation', 'JGU was established with a vision of creating a world-class, research-oriented university in India.'],
        ['Growth of schools', 'New schools and programmes were launched across law, business, humanities, policy, media, design and more.'],
        ['Global partnerships', 'Hundreds of collaborations with leading universities were built to enable exchange and joint research.'],
        ['National recognition', 'The university earned recognition for quality in teaching, research and internationalisation.'],
      ]),
      QUOTE('A university should be a place where ideas are tested, communities are strengthened and young people are inspired to serve society.', 'University leadership (sample text)'),
      H2('Accreditations and recognitions'),
      P('JGU is recognised by the relevant national regulatory bodies and has received several national and international rankings and accreditations. Details of current rankings are shown on the home page and updated each year.'),
      H2('Contact us'),
      P('Sonipat Narela Road, Near Jagdishpur Village, Sonipat, Haryana 131001. For general enquiries, write to info@jgu.edu.in.'),
      BTN('Contact Us', 'https://jgu.edu.in/contact-us'),
    ]
  ),
};

export default general;
