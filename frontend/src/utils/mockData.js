// Mock data for the application
export const mockCompanies = [
  {
    id: 1,
    name: "Infosys Limited",
    logo: "/api/placeholder/150/100",
    description: "Global leader in next-generation digital services and consulting, helping clients navigate digital transformation.",
    industry: "Information Technology",
    location: "Bangalore, India",
    employees: "250,000+",
    website: "https://infosys.com",
    established: "1981"
  },
  {
    id: 2,
    name: "Tata Consultancy Services",
    logo: "/api/placeholder/150/100",
    description: "Leading global IT services, consulting and business solutions organization.",
    industry: "IT Services",
    location: "Mumbai, India",
    employees: "500,000+",
    website: "https://tcs.com",
    established: "1968"
  },
  {
    id: 3,
    name: "Wipro Technologies",
    logo: "/api/placeholder/150/100",
    description: "Leading technology services and consulting company focused on building innovative solutions.",
    industry: "Technology Services",
    location: "Bangalore, India",
    employees: "200,000+",
    website: "https://wipro.com",
    established: "1945"
  },
  {
    id: 4,
    name: "HCL Technologies",
    logo: "/api/placeholder/150/100",
    description: "Technology company that helps enterprises reimagine their businesses for the digital age.",
    industry: "Digital Technology",
    location: "Noida, India",
    employees: "150,000+",
    website: "https://hcltech.com",
    established: "1991"
  },
  {
    id: 5,
    name: "Tech Mahindra",
    logo: "/api/placeholder/150/100",
    description: "Specialized in digital transformation, consulting and business re-engineering services.",
    industry: "Digital Solutions",
    location: "Pune, India",
    employees: "125,000+",
    website: "https://techmahindra.com",
    established: "1986"
  },
  {
    id: 6,
    name: "Accenture India",
    logo: "/api/placeholder/150/100",
    description: "Global professional services company with leading capabilities in digital, cloud and security.",
    industry: "Professional Services",
    location: "Bangalore, India",
    employees: "200,000+",
    website: "https://accenture.com",
    established: "1989"
  }
];

export const mockEvents = [
  {
    id: 1,
    title: "Spoken Tutorial National Job Fair 2024",
    date: "2024-04-15",
    time: "9:00 AM - 6:00 PM",
    venue: "IIT Bombay, Mumbai",
    description: "Annual job fair connecting Spoken Tutorial certified students with leading companies across India. Over 100 companies participating.",
    image: "/api/placeholder/300/200",
    type: "Job Fair",
    status: "upcoming",
    registrations_open: true
  },
  {
    id: 2,
    title: "FOSS Career Guidance Workshop",
    date: "2024-03-28",
    time: "2:00 PM - 5:00 PM",
    venue: "Online via BigBlueButton",
    description: "Interactive session on building careers in Free and Open Source Software. Industry experts will share insights.",
    image: "/api/placeholder/300/200",
    type: "Workshop",
    status: "upcoming",
    registrations_open: true
  },
  {
    id: 3,
    title: "Python Programming Skills Assessment",
    date: "2024-04-05",
    time: "10:00 AM - 12:00 PM",
    venue: "Multiple Centers Across India",
    description: "National level assessment for Python programming skills with certificate validation for job applications.",
    image: "/api/placeholder/300/200",
    type: "Assessment",
    status: "upcoming",
    registrations_open: true
  },
  {
    id: 4,
    title: "Industry Connect Session - IT Sector",
    date: "2024-03-22",
    time: "3:00 PM - 5:00 PM",
    venue: "Hybrid (Online + Offline)",
    description: "Direct interaction with HR representatives from top IT companies. Resume review and interview tips included.",
    image: "/api/placeholder/300/200",
    type: "Networking",
    status: "completed",
    registrations_open: false
  }
];

export const mockGallery = [
  {
    id: 1,
    title: "Spoken Tutorial Job Fair 2023",
    image: "/api/placeholder/300/200",
    description: "Over 5,000 students participated in our annual job fair with 150+ companies",
    category: "Events",
    date: "2023-04-20"
  },
  {
    id: 2,
    title: "Python Workshop - IIT Bombay",
    image: "/api/placeholder/300/200",
    description: "Intensive Python programming workshop conducted at IIT Bombay campus",
    category: "Workshops",
    date: "2023-03-15"
  },
  {
    id: 3,
    title: "Student Success Stories",
    image: "/api/placeholder/300/200",
    description: "Alumni sharing their journey from Spoken Tutorial to successful careers",
    category: "Success Stories",
    date: "2023-05-10"
  },
  {
    id: 4,
    title: "Industry Partnership Meet",
    image: "/api/placeholder/300/200",
    description: "Meeting with industry partners to discuss collaboration opportunities",
    category: "Partnerships",
    date: "2023-02-28"
  },
  {
    id: 5,
    title: "FOSS Community Gathering",
    image: "/api/placeholder/300/200",
    description: "Annual gathering of Free and Open Source Software community members",
    category: "Community",
    date: "2023-06-15"
  },
  {
    id: 6,
    title: "Skill Assessment Centers",
    image: "/api/placeholder/300/200",
    description: "Students taking skill assessments at various centers across India",
    category: "Assessments",
    date: "2023-07-20"
  }
];

export const mockTestimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Developer",
    company: "Infosys Limited",
    testimonial: "Spoken Tutorial's comprehensive training in Python and web development helped me secure my dream job at Infosys. The job recommendation system perfectly matched my skills with the right opportunities.",
    image: "/api/placeholder/80/80",
    location: "Bangalore",
    course_completed: "Python, Django, JavaScript"
  },
  {
    id: 2,
    name: "Rahul Kumar",
    role: "Data Analyst",
    company: "TCS",
    testimonial: "The structured learning approach and industry-relevant curriculum at Spoken Tutorial gave me the confidence to excel in data analytics. I'm now working with one of India's top IT companies.",
    image: "/api/placeholder/80/80",
    location: "Mumbai",
    course_completed: "Python, Data Science, R Programming"
  },
  {
    id: 3,
    name: "Anjali Patel",
    role: "DevOps Engineer",
    company: "Wipro Technologies",
    testimonial: "From a complete beginner to a DevOps engineer - Spoken Tutorial made this transformation possible. The hands-on training and job placement support were exceptional.",
    image: "/api/placeholder/80/80",
    location: "Pune",
    course_completed: "Linux, Docker, Kubernetes"
  },
  {
    id: 4,
    name: "Arjun Reddy",
    role: "Full Stack Developer",
    company: "HCL Technologies",
    testimonial: "The free, high-quality education provided by Spoken Tutorial changed my life. I went from unemployment to becoming a full-stack developer at a leading tech company.",
    image: "/api/placeholder/80/80",
    location: "Hyderabad",
    course_completed: "HTML/CSS, JavaScript, React, Node.js"
  },
  {
    id: 5,
    name: "Meera Joshi",
    role: "Quality Assurance Engineer",
    company: "Tech Mahindra",
    testimonial: "The testing and automation courses helped me build a strong foundation in QA. The job recommendation system connected me with the perfect role that matches my interests.",
    image: "/api/placeholder/80/80",
    location: "Chennai",
    course_completed: "Software Testing, Selenium, Python"
  }
];