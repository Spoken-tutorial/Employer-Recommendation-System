const API_BASE_URL = 'http://localhost:8000/api/common';

export async function getHomePage() {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    
    // Fallback to mock data if API fails
    return {
      past_events: [
        {
          name: "FOSSEE Job Fair 2024",
          formatted_start_date: "Jan 15, 2024",
          formatted_end_date: "Jan 17, 2024",
          description: "A comprehensive job fair organized by FOSSEE connecting skilled students with leading companies across various technology domains."
        },
        {
          name: "Python Programming Workshop",
          formatted_start_date: "Dec 10, 2023",
          formatted_end_date: "Dec 12, 2023",
          description: "Intensive 3-day workshop covering advanced Python programming concepts, data structures, and real-world applications."
        },
        {
          name: "Web Development Bootcamp",
          formatted_start_date: "Nov 20, 2023",
          formatted_end_date: "Nov 25, 2023",
          description: "Complete web development training covering HTML, CSS, JavaScript, and modern frameworks like React and Node.js."
        }
      ],
      companies: [
        {
          name: "TCS (Tata Consultancy Services)",
          description: "Leading global IT services, consulting and business solutions organization"
        },
        {
          name: "Infosys",
          description: "Global leader in next-generation digital services and consulting"
        },
        {
          name: "Wipro",
          description: "Leading technology services and consulting company"
        },
        {
          name: "Tech Mahindra",
          description: "Digital transformation, consulting and business re-engineering services"
        },
        {
          name: "HCL Technologies",
          description: "Global technology company providing IT services and solutions"
        },
        {
          name: "Accenture",
          description: "Global professional services company with capabilities in digital, cloud and security"
        }
      ],
      gallery_images: [
        {
          image: "",
          title: "Python Workshop Session",
          alt: "Students participating in Python programming workshop"
        },
        {
          image: "", 
          title: "FOSSEE Job Fair 2024",
          alt: "Job fair with students and recruiters"
        },
        {
          image: "",
          title: "Certificate Distribution",
          alt: "Students receiving certificates"
        },
        {
          image: "",
          title: "Technical Seminar",
          alt: "Technical presentation session"
        },
        {
          image: "",
          title: "Web Development Workshop",
          alt: "Web development training session"
        },
        {
          image: "",
          title: "Group Activities",
          alt: "Students working in groups"
        }
      ],
      testimonials: [
        {
          name: "Priya Sharma",
          about: "Software Engineer at TCS",
          desc: "The Spoken Tutorial platform provided me with comprehensive training in Python and web development. The job recommendation system helped me connect with TCS, and I successfully landed my dream job as a Software Engineer.",
          location: "", // Empty video URL as requested
          display_on_homepage: true,
          active: true
        },
        {
          name: "Rahul Kumar", 
          about: "Data Analyst at Infosys",
          desc: "Thanks to the structured learning modules and practical assignments on Spoken Tutorial, I developed strong programming skills. The platform's job portal connected me directly with Infosys recruiters.",
          location: "", // Empty video URL as requested
          display_on_homepage: true,
          active: true
        },
        {
          name: "Anjali Patel",
          about: "Full Stack Developer at Wipro", 
          desc: "The hands-on approach of Spoken Tutorial tutorials made complex concepts easy to understand. The job recommendation system matched my skills perfectly with opportunities at Wipro.",
          location: "", // Empty video URL as requested
          display_on_homepage: true,
          active: true
        },
        {
          name: "Vikash Singh",
          about: "Python Developer at Tech Mahindra",
          desc: "Spoken Tutorial's comprehensive curriculum and the job recommendation system created a seamless pathway from learning to employment. I'm now working as a Python Developer at Tech Mahindra.",
          location: "", // Empty video URL as requested
          display_on_homepage: true,
          active: true
        }
      ],
      upcoming_events: []
    };
  }
}