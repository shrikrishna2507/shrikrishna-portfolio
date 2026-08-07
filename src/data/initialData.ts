import { ProfileData } from '../types';

export const initialProfileData: ProfileData = {
  name: 'Shri Krishna S Bhat',
  title: 'Computer Science Engineering Student & Full-Stack Developer',
  role: 'B.E. Computer Science & Engineering @ MITE',
  tagline: 'Computer Science Engineering student at MITE with strong fundamentals in Web Development, Database Management, Computer Vision, and Algorithmic Problem Solving.',
  cgpa: '9.05 CGPA (Till 6th Sem, No Backlogs)',
  email: 'shrikrishnas2005@gmail.com',
  collegeEmail: '4mt23cs194@mite.ac.in',
  phone: '+91 8088076150',
  location: 'Udupi, Karnataka, India',
  linkedin: 'https://linkedin.com/in/shri-krishna-bhat-160a20293',
  naukri: 'https://www.naukri.com',
  github: 'https://github.com/shrikrishna2507',
  leetcode: 'https://leetcode.com/u/WFQaA74uiB/',
  bio: 'Enthusiastic and detail-oriented Computer Science Engineering student with strong skills in web development, database management, and programming. Eager to leverage technical expertise to contribute to innovative software engineering projects.',
  profilePic: '/profile_suit.jpg',
  skills: {
    languages: ['C', 'Java', 'Python', 'SQL'],
    webDev: ['React.js', 'Node.js', 'Express.js', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    databases: ['MySQL', 'MongoDB'],
    mlAi: ['Computer Vision', 'OpenCV', 'Machine Learning'],
    tools: ['Git', 'GitHub', 'VS Code', 'Arduino IDE', 'Linux', 'Windows'],
    softSkills: ['Problem Solving', 'Teamwork', 'Communication', 'Time Management']
  },
  projects: [
    {
      id: 'proj-1',
      title: 'Brand-Specific Apparel Fit Prediction & Virtual Try-On',
      subtitle: 'ML & Computer Vision Platform',
      description: 'Developing a machine learning model to predict apparel fit based on brand-specific sizing charts and user measurement inputs, integrated with a 2D virtual try-on module using computer vision to display customized garment overlays on user avatars.',
      tech: ['Python', 'Computer Vision', 'Machine Learning', 'OpenCV'],
      team: 'Team Project',
      status: 'In Progress',
      date: 'Dec 2024 – Present',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com/shrikrishna2507/Brand-Specific-Apparel-Fit-Prediction-and-Avatar-Based-Virtual-Try-On',
    },
    {
      id: 'proj-2',
      title: 'MITE Flix – Movie Management System',
      subtitle: 'Full-Stack Movie & Recommendation Platform',
      description: 'Built a full-stack movie web application enabling users to search, view details, rate movies, and manage personalized watchlists. Implemented secure authentication using JWT with role-based access control and engineered a dynamic recommendation feature based on user ratings and genres.',
      tech: ['React.js', 'Express.js', 'MySQL', 'Node.js', 'JWT'],
      team: 'Team Project',
      status: 'Completed',
      date: 'Dec 2024',
      image: '/assets/miteflix_cover.jpg',
      githubUrl: 'https://github.com/shrikrishna2507/Mite-Flix_DBMS_Project',
    },
    {
      id: 'proj-3',
      title: 'The Chocoway – E-Commerce Chocolates Platform',
      subtitle: 'Full-Stack E-Commerce Application',
      description: 'Developed a full-stack e-commerce web platform for artisanal chocolates featuring interactive product showcases, automated cart management, order workflow, and responsive user experience.',
      tech: ['React.js', 'Node.js', 'Express.js', 'JavaScript', 'CSS3'],
      team: 'Individual Project',
      status: 'Completed',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com/shrikrishna2507/the_chocoway',
    },
    {
      id: 'proj-4',
      title: 'Tic-Tac-Toe Algorithmic Game',
      subtitle: 'Python Interactive Game Engine',
      description: 'Interactive two-player Tic-Tac-Toe game engine built in Python implementing optimal state evaluation, turn tracking, win/draw condition evaluation, and score metrics.',
      tech: ['Python', 'Algorithmic Logic', 'Git'],
      team: 'Individual Project',
      status: 'Completed',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com/shrikrishna2507/tic-tac-toe',
    },
    {
      id: 'proj-5',
      title: 'Vehicle-Wale (Vehicle Details Web App)',
      subtitle: 'Responsive Multi-Page Vehicle Platform',
      description: 'Developed a responsive multi-page web platform showcasing comprehensive technical specifications, user reviews, and pricing details for cars, bikes, buses, and lorries with category, brand, and fuel type filtering.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      team: 'Team Project',
      status: 'Completed',
      date: 'Apr 2024',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com/shrikrishna2507/Vehicle-classification-Auto-Tech-',
    },
    {
      id: 'proj-6',
      title: 'GardenFresh – Farm-to-Home Marketplace',
      subtitle: 'Hyperlocal E-Commerce Platform',
      description: 'Full-stack marketplace directly connecting local agricultural growers with urban consumers, enabling direct listing, inventory updates, and order placement.',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      team: 'Individual Project',
      status: 'Completed',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com/shrikrishna2507/GardenFresh',
    },
    {
      id: 'proj-7',
      title: 'Smart Irrigation System Using Soil Moisture Sensor',
      subtitle: 'IoT & Microcontroller Automated System',
      description: 'Designed an automated IoT-based irrigation system using Arduino and soil moisture sensors to optimize water usage, programming microcontrollers to trigger water pumps dynamically based on real-time soil hydration thresholds.',
      tech: ['Arduino IDE', 'Embedded C', 'Sensors'],
      team: 'Team Project',
      status: 'Completed',
      date: 'Mar 2024',
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com/shrikrishna2507/Smart-Irrigation-System',
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'NPTEL Certification – Data Mining',
      issuer: 'NPTEL',
      date: 'Jan 2025 – Mar 2025',
      score: '73% (Elite Status)',
      image: '/assets/certs/NPTEL-DATA_MINING.png',
      details: 'Comprehensive 8-week course covering pattern mining, data warehousing, classification algorithms, and clustering techniques.'
    },
    {
      id: 'cert-2',
      title: 'Cloud Computing Fundamentals',
      issuer: 'Infosys Springboard',
      date: 'April 2025',
      image: '/assets/certs/cloud_computing_fundamentals.png',
      details: 'Certified in cloud architecture concepts, virtualization, deployment models (IaaS/PaaS/SaaS), and cloud infrastructure fundamentals.'
    },
    {
      id: 'cert-3',
      title: 'Introduction to Cloud Computing',
      issuer: 'Infosys Springboard',
      date: 'April 2025',
      image: '/assets/certs/introduction_to_could_computing.png',
      details: 'Cloud computing overview, multi-cloud architectures, service models, and virtualized container environments.'
    },
    {
      id: 'cert-4',
      title: 'RPA Developer Foundation (v2021.10)',
      issuer: 'UiPath Diploma',
      date: 'Nov 2024',
      image: '/assets/certs/RPA_Developer_Foundation_v2021.10_Shri_krishna_s_en-US_diploma.png',
      details: 'Certified in Robotic Process Automation, workflow orchestration, automation selectors, and data extraction.'
    },
    {
      id: 'cert-5',
      title: 'Introduction to R Programming',
      issuer: 'Infosys Springboard',
      date: 'Feb 2025',
      image: '/assets/certs/Introduction_to_R_programming.png',
      details: 'Data manipulation, statistical graphics, vectorization, and data frames in R.'
    },
    {
      id: 'cert-6',
      title: 'Statistics of R Programming',
      issuer: 'Infosys Springboard',
      date: 'Feb 2025',
      image: '/assets/certs/Statistics_of_R_Programming.png',
      details: 'Statistical analysis, hypothesis testing, regression modeling, and statistical computing in R.'
    },
    {
      id: 'cert-7',
      title: 'Developing Data Driven Product - Backend',
      issuer: 'Technical Workshop',
      date: '2024',
      image: '/assets/certs/Developing_Data_Driven_Product-Backend.png',
      details: 'Specialized training on data-driven product backend architectures and REST API development.'
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Rajya Puraskar (Governor’s Award in Scouting)',
      category: 'Scouting',
      rank: 'Governor Awardee',
      description: 'Awarded the prestigious Rajya Puraskar (Governor’s Award in Scouting), recognized for outstanding leadership, community service, and outdoor skills in Bharat Scouts and Guides.',
      year: '2023',
      image: '/assets/certs/RP-2.jpeg',
      secondaryImage: '/assets/certs/RP-1.jpeg'
    },
    {
      id: 'ach-3',
      title: 'Junior Grade Examination in Classical Tabla',
      category: 'Music & Arts',
      rank: 'Rank 9th (Udupi District Level)',
      description: 'Completed the Junior Grade Examination in Classical Tabla with Distinction, securing Udupi District Rank 9th.',
      year: '2023',
      image: '/assets/certs/Tabla.jpeg'
    },
    {
      id: 'ach-4',
      title: 'Dakshina Bharat Hindi Prachar Sabha - Prathama Examination',
      category: 'Language',
      rank: 'Distinction',
      description: 'Successfully completed Prathama examination conducted by Dakshina Bharat Hindi Prachar Sabha with distinction.',
      year: '2022',
      image: '/assets/certs/PRATHAMIC.jpeg'
    },
    {
      id: 'ach-5',
      title: 'Dakshina Bharat Hindi Prachar Sabha - Madhyama Examination',
      category: 'Language',
      rank: 'Distinction',
      description: 'Successfully completed Madhyama examination conducted by Dakshina Bharat Hindi Prachar Sabha with distinction.',
      year: '2022',
      image: '/assets/certs/MADHYAMIC.jpeg'
    },
    {
      id: 'ach-6',
      title: 'Active Co-Curricular & Technical Participant',
      category: 'Hackathon',
      rank: 'Participant',
      description: 'Active participant in technical workshops, coding contests, and hackathons conducted at Mangalore Institute of Technology and Engineering (MITE).',
      year: '2023 - Present'
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.E. in Computer Science & Engineering',
      institution: 'Mangalore Institute of Technology and Engineering (MITE), Moodabidri',
      years: '2023 – 2027 (Expected)',
      score: 'CGPA: 9.05 (Till 6th Sem)',
      highlights: [
        'Consistently maintaining high academic excellence with a 9.05 CGPA till 6th semester with zero backlogs.',
        'Core coursework: Data Structures & Algorithms, Object-Oriented Programming, DBMS, Computer Networks, Software Engineering.',
        'Active participant in departmental hackathons, workshops, and coding challenges.'
      ]
    },
    {
      id: 'edu-2',
      degree: 'Pre-University Course (PCMB)',
      institution: 'Poornaprajna PU College, Udupi',
      years: '2021 – 2023',
      score: '90.16%',
      highlights: [
        'Physics, Chemistry, Mathematics, and Biology (PCMB) stream.',
        'Scored 90.16% in Karnataka State PU Board Examination.'
      ]
    },
    {
      id: 'edu-3',
      degree: 'Secondary School Leaving Certificate (SSLC)',
      institution: 'T.A. Pai English Medium High School, Udupi',
      years: '2021',
      score: '90.72%',
      highlights: [
        'Scored 90.72% in Karnataka State SSLC Board Examination.',
        'Earned the Governor\'s Rajya Puraskar Award in Scouting.'
      ]
    }
  ],
  hobbies: [
    {
      id: 'hob-1',
      title: 'Automotive Research & Vehicle Exploring',
      category: 'Engineering & Exploration',
      description: 'Passionate about researching technical specifications, engine architectures, new vehicle innovations, vintage cars, bikes, and commercial lorries.',
      iconName: 'Car'
    },
    {
      id: 'hob-2',
      title: 'Carnatic Fusion Rock, Metal & Classical Music',
      category: 'Arts & Music',
      description: 'Junior Grade Classical Tabla (Udupi District Rank 9th Distinction). Passionate about playing rhythm patterns on Tabla and listening to Carnatic Progressive Rock, Fusion Rock & Metal bands (such as Agam and Pineapple Express).',
      iconName: 'Music'
    },
    {
      id: 'hob-3',
      title: 'Culinary Arts & Cooking',
      category: 'Lifestyle & Creativity',
      description: 'Love cooking, experimenting with new culinary recipes, and preparing food for family and friends.',
      iconName: 'Utensils'
    },
    {
      id: 'hob-4',
      title: 'Gardening & Agriculture',
      category: 'Nature & Environment',
      description: 'Plant cultivation, green living, agricultural exploring, and garden maintenance.',
      iconName: 'Sprout'
    },
    {
      id: 'hob-5',
      title: 'Scouting & Traveling',
      category: 'Outdoor & Adventure',
      description: 'Rajya Puraskar Governor Scout awardee. Enjoy outdoor exploration, trekking, and traveling to new places.',
      iconName: 'Compass'
    }
  ],
  leetcodeStats: {
    totalSolved: 75,
    easy: 38,
    medium: 31,
    hard: 6,
    submissions: 135,
    streakDays: 50
  }
};
