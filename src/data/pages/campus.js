import { page, H2, H3, P, UL, STATS, CARDS, STEPS, FAQ, TABLE, QUOTE, CALL, BTN } from './_helpers.js';

// Starter / sample text - verify timings, facilities and contact details with the relevant JGU office.
const campus = {
  'campus-life': page(
    '/campus-life',
    'Campus Life',
    'A vibrant, residential campus where learning, friendship and personal growth go hand in hand.',
    [
      H2('More than a campus'),
      P('Life at JGU extends far beyond the classroom. The residential campus brings together students from across India and the world, creating a lively community where ideas are shared, friendships are formed and new interests are discovered every day.'),
      P('From early-morning sports practice to late-night debates, from art exhibitions to community service drives, the campus offers something for everyone. The Student Affairs team, student councils and hundreds of volunteers work together to keep the calendar full and the community inclusive.'),
      STATS(['100+', 'Clubs & societies (sample)'], ['24x7', 'Campus security & support (sample)'], ['1', 'Green residential campus']),
      CARDS('Explore campus life', [
        ['Food and Dining', 'Cafeterias, food courts and menus for every taste.', '/campus-life/food-and-dining', 'Read more'],
        ['Sports Academy', 'Courts, fields, coaching and tournaments.', '/campus-life/sports-academy', 'Read more'],
        ['Health', 'On-campus medical care and wellness support.', '/campus-life/health', 'Read more'],
        ['Global Library', 'Books, journals, databases and quiet study spaces.', '/campus-life/global-library', 'Read more'],
        ['Student Affairs', 'Clubs, events, leadership and student services.', '/campus-life/student-affairs', 'Read more'],
        ['Student Housing', 'Comfortable, safe residential blocks.', '/campus-life/student-housing', 'Read more'],
        ['Arts & Culture', 'Music, theatre, dance, film and visual arts.', '/campus-life/arts-and-culture', 'Read more'],
        ['Community Engagement', 'Volunteering and outreach in nearby communities.', '/campus-life/community-engagement', 'Read more'],
        ['Student Life & Cultural Engagement', 'Festivals, traditions and cultural exchange.', '/campus-life/student-life', 'Read more'],
      ]),
      H2('A typical week on campus'),
      TABLE('Sample schedule', ['Time', 'Activity', 'Where'], [
        ['Morning', 'Classes, seminars and labs', 'Academic blocks'],
        ['Afternoon', 'Library study, club meetings, workshops', 'Library, student centre'],
        ['Evening', 'Sports practice, rehearsals, community service', 'Grounds, auditoriums'],
        ['Night', 'Group study, film screenings, hostel events', 'Hostels, common rooms'],
      ]),
      QUOTE('The campus feels like a small world — you meet people from everywhere and learn as much outside class as inside it.', 'JGU student (sample testimonial)'),
      BTN('Schedule a campus visit', 'https://jgu.edu.in/contact-us'),
    ]
  ),

  'campus-life-food-and-dining': page(
    '/campus-life/food-and-dining',
    'Food and Dining',
    'Fresh, varied and affordable food options for every taste and dietary need.',
    [
      H2('Dining on campus'),
      P('The campus offers a range of dining options, including central messes, cafeterias, snack counters and food courts. Menus are planned to provide balanced meals, regional variety and choices for different dietary preferences.'),
      CARDS('Where to eat', [
        ['Residential messes', 'Daily breakfast, lunch, snacks and dinner served in hostel dining halls.'],
        ['Central cafeteria', 'Open through the day with hot meals, sandwiches, beverages and desserts.'],
        ['Food court', 'A mix of cuisines — North Indian, South Indian, Chinese, continental and fast food.'],
        ['Coffee corners', 'Cosy spots for coffee, tea and light bites between classes.'],
      ]),
      H3('Dietary needs'),
      UL('Vegetarian and non-vegetarian options available', 'Jain and other dietary requirements can be accommodated on request', 'Regular menu reviews with student feedback', 'Nutritionist guidance for balanced meal planning'),
      TABLE('Sample meal timings (may change)', ['Meal', 'Timing', 'Notes'], [
        ['Breakfast', '7:30 am – 9:30 am', 'Hot and cold options'],
        ['Lunch', '12:30 pm – 2:30 pm', 'Thali, salad bar and a rotating special'],
        ['Snacks', '4:30 pm – 6:00 pm', 'Tea, coffee and light snacks'],
        ['Dinner', '7:30 pm – 9:30 pm', 'Multi-cuisine menu'],
      ]),
      CALL('Food safety and hygiene', 'Kitchens follow food-safety guidelines, regular cleaning schedules and periodic inspections. Students can share feedback or concerns with the Food Committee at any time.'),
      FAQ('Dining FAQs', [
        ['Is a meal plan compulsory?', 'Students living in hostels are generally enrolled in a meal plan. Day scholars may buy meals separately.'],
        ['Can I give feedback on the menu?', 'Yes. Student representatives sit on the Food Committee and meet regularly.'],
      ]),
      BTN('Back to Campus Life', '/campus-life'),
    ]
  ),

  'campus-life-sports-academy': page(
    '/campus-life/sports-academy',
    'Sports Academy',
    'Train, compete and stay active with professional coaching and world-class facilities.',
    [
      H2('A culture of sport and fitness'),
      P('The JGU Sports Academy encourages every student to stay active, whether they are beginners or national-level athletes. Professional coaches, modern facilities and a busy calendar of intra- and inter-university tournaments make sport an integral part of student life.'),
      CARDS('Facilities', [
        ['Outdoor courts & fields', 'Cricket, football, basketball, volleyball and tennis facilities.'],
        ['Indoor sports complex', 'Badminton, table tennis, squash and indoor games.'],
        ['Gymnasium', 'Cardio and strength equipment with trained instructors.'],
        ['Swimming pool', 'Lap swimming and coaching sessions (sample).'],
        ['Athletics track', 'Running, jumping and throwing events with coaching support.'],
        ['Yoga & wellness studio', 'Classes in yoga, meditation and fitness.'],
      ]),
      H3('Programmes'),
      UL('Coaching camps for major sports', 'Sports scholarships for talented athletes', 'Intra-university leagues and annual sports festival', 'Participation in inter-university and national competitions', 'Fitness assessments and personalised training plans'),
      STEPS('How to join', [
        ['Register with the Sports Office', 'Share your sport, level and availability.'],
        ['Attend trials', 'Coaches assess skills and place you in suitable training groups.'],
        ['Train and compete', 'Join regular practice and represent JGU in tournaments.'],
      ]),
      FAQ('Sports FAQs', [
        ['Do I need prior experience?', 'No. The Academy welcomes beginners and offers entry-level coaching.'],
        ['Are there scholarships for athletes?', 'Sports scholarships may be available for talented players. Check the admissions portal for details.'],
      ]),
      BTN('Back to Campus Life', '/campus-life'),
    ]
  ),

  'campus-life-health': page(
    '/campus-life/health',
    'Health',
    'On-campus healthcare, counselling and wellness services to keep students safe, healthy and supported.',
    [
      H2('Health and wellbeing'),
      P('The university provides on-campus health services to support students\' physical and mental wellbeing. A medical centre staffed by qualified professionals offers consultations, first aid, routine care and referral to hospitals when needed.'),
      CARDS('Services', [
        ['Medical centre', 'Day-time consultations, basic treatment and first aid.'],
        ['Emergency response', 'Ambulance access and tie-ups with nearby hospitals.'],
        ['Counselling', 'Confidential support for stress, anxiety, relationships and academic concerns.'],
        ['Wellness programmes', 'Workshops on nutrition, sleep, fitness, mindfulness and healthy habits.'],
        ['Health insurance information', 'Guidance on insurance options for students.'],
        ['Preventive care', 'Health camps, vaccination drives and awareness campaigns.'],
      ]),
      H3('Mental health support'),
      P('Student wellbeing is a priority. Trained counsellors provide one-to-one sessions in a confidential and non-judgemental environment. Peer-support groups and awareness campaigns help reduce stigma and encourage students to seek help early.'),
      CALL('In an emergency', 'In a medical emergency contact campus security or the medical centre immediately. Emergency numbers are displayed across the campus and in hostels.'),
      FAQ('Health FAQs', [
        ['Is counselling free?', 'Counselling services are available to enrolled students through the university. Please confirm current arrangements with the Counselling Centre.'],
        ['What if I need a specialist?', 'The medical centre can refer students to partner hospitals and specialists.'],
      ]),
      BTN('Back to Campus Life', '/campus-life'),
    ]
  ),

  'campus-life-global-library': page(
    '/campus-life/global-library',
    'Global Library',
    'A world of knowledge at your fingertips — books, journals, databases and inspiring study spaces.',
    [
      H2('The heart of the campus'),
      P('The Global Library is a hub for learning and research. It holds an extensive collection of books, journals, reports and multimedia resources, along with subscriptions to major national and international databases. Comfortable reading halls, group-study rooms and quiet zones make it easy to focus or collaborate.'),
      STATS(['Lakhs', 'Print & e-resources (sample)'], ['1000s', 'Journals & databases (sample)'], ['Extended', 'Hours during exams (sample)']),
      CARDS('What you will find', [
        ['Books & reference', 'Core textbooks, reference works and recreational reading.'],
        ['E-resources', 'Online journals, e-books, case studies and legal and financial databases.'],
        ['Study spaces', 'Silent reading halls, discussion rooms and individual carrels.'],
        ['Research support', 'Librarians guide students on literature searches, citation and plagiarism tools.'],
        ['Special collections', 'Archives, rare materials and thematic collections.'],
        ['Digital access', 'Remote access to e-resources from anywhere.'],
      ]),
      TABLE('Library services', ['Service', 'Who can use it', 'How'], [
        ['Borrowing', 'Students, faculty and staff', 'Library card at the circulation desk'],
        ['Inter-library loan', 'Students and faculty', 'Request through the librarian'],
        ['Research workshops', 'All students', 'Register via the library portal'],
        ['Printing & scanning', 'Students', 'Library print counter'],
      ]),
      FAQ('Library FAQs', [
        ['How many books can I borrow?', 'Limits depend on your programme and category. Check the library rules.'],
        ['Can I access e-resources from home?', 'Yes, using your university login through the library portal.'],
      ]),
      BTN('Back to Campus Life', '/campus-life'),
    ]
  ),

  'campus-life-student-affairs': page(
    '/campus-life/student-affairs',
    'Student Affairs',
    'Supporting students beyond the classroom through leadership, clubs, events and services.',
    [
      H2('About Student Affairs'),
      P('The Office of Student Affairs works to enrich the student experience. It supports student organisations, organises orientation programmes, helps students resolve concerns and builds an inclusive and safe community.'),
      CARDS('What we do', [
        ['Clubs & societies', 'Support for student-run clubs across academics, culture, sports, technology, social causes and more.'],
        ['Student governance', 'Student councils and committees that represent student voices.'],
        ['Events & festivals', 'Orientation, cultural fests, guest talks and leadership summits.'],
        ['Grievance redressal', 'Fair and confidential channels to raise concerns.'],
        ['Inclusion & diversity', 'Programmes promoting equity, accessibility and respect for all.'],
        ['Leadership development', 'Workshops and mentoring for emerging student leaders.'],
      ]),
      STEPS('Start a new club', [
        ['Find like-minded students', 'Gather a founding group with a shared interest.'],
        ['Write a proposal', 'Describe goals, activities and a faculty advisor.'],
        ['Seek approval', 'Submit the proposal to Student Affairs.'],
        ['Launch', 'Recruit members, plan events and begin activities.'],
      ]),
      UL('Student code of conduct and anti-ragging policy', 'Committees on gender sensitisation and inclusion', 'Support for students with disabilities', 'Orientation for new and international students'),
      FAQ('Student affairs FAQs', [
        ['How can I join a club?', 'Clubs recruit at the start of each semester. Look for announcements and club fairs.'],
        ['Where do I report a concern?', 'Contact the Student Affairs office or use the official grievance channels.'],
      ]),
      BTN('Back to Campus Life', '/campus-life'),
    ]
  ),

  'campus-life-student-housing': page(
    '/campus-life/student-housing',
    'Student Housing',
    'Safe, comfortable and community-oriented residential spaces on campus.',
    [
      H2('Living on campus'),
      P('JGU is a residential university, and on-campus housing is an important part of the learning experience. Hostels are designed to be safe, comfortable and conducive to study, with common areas that encourage students to relax and socialise.'),
      CARDS('Housing features', [
        ['Room options', 'Single, double and shared rooms depending on the block and programme.'],
        ['Furnishing', 'Beds, study tables, wardrobes and storage provided in rooms.'],
        ['Common spaces', 'Lounges, study rooms, recreation areas and laundry facilities.'],
        ['Wi-Fi', 'Campus-wide wireless internet access.'],
        ['Security', 'Round-the-clock security, CCTV and controlled entry (sample).'],
        ['Warden support', 'Resident wardens and staff available for assistance.'],
      ]),
      TABLE('Typical hostel rules', ['Topic', 'Guideline', 'Notes'], [
        ['Visitors', 'Allowed in designated areas at set times', 'Register at the front desk'],
        ['Timings', 'Entry and exit times apply', 'Different for different blocks'],
        ['Conduct', 'Respect for roommates and shared spaces', 'Zero tolerance for harassment and ragging'],
        ['Maintenance', 'Report issues to the hostel office', 'Resolved on a priority basis'],
      ]),
      STEPS('How to apply for housing', [
        ['Confirm admission', 'Accept your offer and pay the admission fees.'],
        ['Fill the housing form', 'Share preferences and special requirements.'],
        ['Receive allotment', 'Room allotments are communicated before the semester begins.'],
        ['Check in', 'Complete the formalities and move in.'],
      ]),
      FAQ('Housing FAQs', [
        ['Can I choose my roommate?', 'Preferences may be considered but cannot be guaranteed.'],
        ['What should I bring?', 'Bedding, personal items and any required stationery. A packing guide is shared before arrival.'],
      ]),
      BTN('Back to Campus Life', '/campus-life'),
    ]
  ),

  'campus-life-arts-and-culture': page(
    '/campus-life/arts-and-culture',
    'Arts & Culture',
    'Celebrate creativity through music, theatre, dance, film, literature and the visual arts.',
    [
      H2('A creative community'),
      P('Arts and culture are woven into daily life at JGU. Student societies, studios and performance spaces nurture creativity across disciplines. Whether you want to act, play an instrument, curate an exhibition or make films, there is a community for you.'),
      CARDS('Creative societies', [
        ['Music', 'Bands, choirs, classical and contemporary ensembles.'],
        ['Theatre', 'Stage plays, street theatre and improv.'],
        ['Dance', 'Classical, folk and contemporary dance groups.'],
        ['Film & photography', 'Film-making, screenings and photo walks.'],
        ['Literature & debate', 'Poetry circles, creative writing, debates and literary festivals.'],
        ['Visual arts', 'Painting, sketching, installations and exhibitions.'],
      ]),
      H3('Annual events'),
      UL('Cultural fest featuring performances and competitions', 'Literary festival with writers and poets', 'Film festival and screenings', 'Art exhibitions and open studios', 'Inter-university competitions and collaborations'),
      QUOTE('Art helps us understand each other. On campus, it is where different cultures meet.', 'Student coordinator (sample)'),
      FAQ('Arts & culture FAQs', [
        ['Do I need experience to join?', 'No. Societies welcome beginners and offer workshops.'],
        ['Can I perform at events?', 'Yes. Auditions are held for major events and everyone is encouraged to participate.'],
      ]),
      BTN('Back to Campus Life', '/campus-life'),
    ]
  ),

  'campus-life-community-engagement': page(
    '/campus-life/community-engagement',
    'Community Engagement',
    'Learning by serving — connecting students with communities, causes and real-world challenges.',
    [
      H2('Education for public service'),
      P('Community engagement is central to JGU\'s identity as a university committed to public service. Students and faculty work with neighbouring villages, schools, NGOs and government bodies on projects in education, health, legal aid, environment, livelihoods and civic participation.'),
      CARDS('Ways to get involved', [
        ['Volunteering', 'Join drives for education, health camps, blood donation and environmental clean-ups.'],
        ['Legal aid', 'Law students provide legal awareness and assistance under faculty supervision.'],
        ['Teaching & mentoring', 'Support local school students with tutoring and career guidance.'],
        ['Sustainability projects', 'Tree plantation, waste management and water conservation initiatives.'],
        ['Social entrepreneurship', 'Develop solutions for community problems with mentoring and seed support.'],
        ['Field placements', 'Credit-bearing projects with NGOs and public institutions.'],
      ]),
      STEPS('How a project works', [
        ['Identify a need', 'Work with community partners to understand priorities.'],
        ['Plan with mentors', 'Design activities with faculty and partner organisations.'],
        ['Implement', 'Carry out the project over a defined period.'],
        ['Reflect and report', 'Document outcomes, share lessons and measure impact.'],
      ]),
      STATS(['1000s', 'Volunteer hours each year (sample)'], ['Multiple', 'Community partners (sample)']),
      FAQ('Community engagement FAQs', [
        ['Is community service compulsory?', 'Many programmes include community engagement as a credit requirement. Participation beyond that is voluntary.'],
        ['How do I start?', 'Contact the community engagement office or a student society working on a cause you care about.'],
      ]),
      BTN('Back to Campus Life', '/campus-life'),
    ]
  ),

  'campus-life-student-life': page(
    '/campus-life/student-life',
    'Student Life & Cultural Engagement',
    'A diverse community that celebrates festivals, traditions and ideas from around the world.',
    [
      H2('A global community on one campus'),
      P('Students at JGU come from many states and countries, bringing languages, cuisines, traditions and perspectives that enrich everyday life. Cultural engagement programmes help students learn from each other and build respect for diversity.'),
      CARDS('Cultural engagement', [
        ['Festivals', 'Diwali, Eid, Christmas, Holi, Onam, Lohri and many more celebrated together.'],
        ['International days', 'Food fairs, performances and exhibitions showcasing different cultures.'],
        ['Language circles', 'Conversation groups to practise and learn new languages.'],
        ['Speaker series', 'Writers, artists and leaders share their stories.'],
        ['Orientation & buddy programmes', 'Help new students feel at home from the first day.'],
        ['Student exchange', 'Meet visiting students from partner universities.'],
      ]),
      H3('Student voices'),
      QUOTE('I came to JGU for my degree, but I have also learnt about so many cultures without leaving campus.', 'International student (sample testimonial)'),
      UL('Welcoming events for new students each semester', 'Interfaith and inclusion initiatives', 'Student-led awareness campaigns', 'Support for first-generation learners'),
      FAQ('Student life FAQs', [
        ['Can I organise a cultural event?', 'Yes. Student clubs and groups can propose events to Student Affairs.'],
        ['Are there events for international students?', 'Yes. The International Office and student groups organise regular events.'],
      ]),
      BTN('Back to Campus Life', '/campus-life'),
    ]
  ),
};

export default campus;
