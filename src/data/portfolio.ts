export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  logo?: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
  images: string[];
}

export interface PortfolioData {
  name: string;
  role: string;
  about: string;
  profileImage: string;
  blogUrl?: string;
  social: SocialLink[];
  skills: {
    // mobile: string[];
    libraries: string[];
    web: string[];
    tools: string[];
    aiServices: string[];
  };
  experience: Experience[];
  projects: Project[];
  url: string;
}

export const portfolioData: PortfolioData = {
  name: "Stanislav Trotcyuk",
  role: "Full-Stack Developer",
  about:
    "I’m a Web Developer with 4+ years of experience creating high-quality web applications. My expertise spans React, Next.js, Tailwind CSS, and modern web architecture, with additional experience in Node.js and Express for backend development. I’ve also worked extensively with databases and APIs, giving me a strong foundation across both software and system-level development.",
  profileImage: "/images/profile.webp",
  blogUrl: "https://medium.com/@trotzuk.stanislav",
  social: [
    {
      platform: "GitHub",
      url: "https://github.com/TrocyukS96",
      icon: "Github",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/resam2171",
      icon: "Linkedin",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/stanislavtrotsyuk/",
      icon: "Instagram",
    },
    {
      platform: "Medium",
      url: "https://medium.com/@trotzuk.stanislav",
      icon: "BookText", // Using BookText as a generic icon for Medium if branded one is missing
    },
  ],
  skills: {
    aiServices: [
      "YandexGPT",
      "Gemini",
      "CursorAI",
      "DeepSeek",
    ],
    libraries: [
      "React Router",
      "Tanstack Query",
      "RTK Query",
      "Zustand",
      "Zod",
      "ShadCN",
      "React Hook Form",
      "React Icons",
      "React Toastify",
    ],
    web: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Nest.js",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Nginx",
    ],
    tools: ["Git", "VS Code", "IntelliJ IDEA", "Postman", "Insomnia"],
  },
  experience: [
    {
      company: "ITWEBS",
      role: "Full-Stack Developer",
      period: "Jun 2025 - May 2026",
      description: [
        "Participated in the design of the client-side application architecture.",
        "Participated in the selection of libraries for the Next.js client application.",
        "Performed backend tasks in Nest.js: product modules, shopping cart, and payment system integrations.",
        "Integrated Swagger for server API documentation.",
        "Optimized file storage on the server and delivery to the client.",
        "Configured Nginx web server for correct production operation.",
        "Implemented AI solutions from Yandex (YandexGPT / Yandex AI).",
      ],
    },
    {
      company: "1M Solutions",
      role: "Frontend Developer",
      period: "Apr 2023 - Jun 2025",
      description: [
        "Developed a React SPA with PWA functionality as part of a Scrum team.",
        "Built and refined a UI kit based on Ant Design with custom JavaScript animations.",
        "Actively participated in Scrum ceremonies: planning, dailies, and sprint demos.",
        "Contributed to application architecture decisions and key technical choices.",
        "Mentored new frontend developers and helped them integrate into the workflow.",
        "Participated in updating the corporate frontend code convention.",
        "Contributed to refining an existing CRM system for bank employees built on React.",
      ],
    },
    {
      company: "InLog",
      role: "Frontend Developer",
      period: "Jan 2022 - Mar 2023",
      description: [
        "Developed a LIS (LIMS) application for an oil company using React, TypeScript, and Redux.",
        "Participated in building the application architecture.",
        "Rewrote the state manager from Redux Thunk to RTK Query.",
        "Developed a UI kit based on ShadCN.",
        "Wrote REST requests to interact with the server.",
        "Covered critical business features with Jest tests.",
        "Independently developed a dashboard and table builder for the website.",
        "Configured CI/CD pipelines and Nginx with SSL certificates using Certbot.",
      ],
    },
  ],
  projects: [
    {
      title: "Truck Accessories & Modular Cargo Platform",
      description:
        "Developed and launched a modern digital platform for 147pacific.com. Built with Next.js and Tailwind CSS for optimal performance and responsive UI. Integrated [CMS Name] for dynamic content management and [Payment System] for secure transactions. Managed the full project lifecycle, maintaining clear client communication from initial concept to production deployment.",
      techStack: ["Next.js", "Payload CMS", "Saleor", "Tailwind CSS", "TypeScript"],
      link: "https://www.147pacific.com",
      images: ["/images/projects/147pacific/slide-1.webp","/images/projects/147pacific/slide-2.webp","/images/projects/147pacific/slide-3.webp","/images/projects/147pacific/slide-4.webp","/images/projects/147pacific/slide-5.webp"],
    },
    {
      title: "Hecosvc: Auto Tools Hub",
      description:
        "I independently developed and launched hecosvc.com, a comprehensive platform for auto tools and garage equipment. Built with Next.js and styled using Tailwind CSS, the site features a highly responsive and performant frontend. I integrated Payload CMS to provide the client with a flexible, custom content management system for their knowledge base, and implemented Saleor for secure, scalable payment processing. Beyond development, I managed the entire project lifecycle, acting as the primary point of contact and maintaining direct communication with the client from initial requirements gathering all the way to production deployment.",
      techStack: ["Next.js", "Payload CMS", "Saleor", "Tailwind CSS", "TypeScript"],
      link: "https://storefront-production-f7ed.up.railway.app/en",
      images: ["/images/projects/hecosvc/slide-1.webp","/images/projects/hecosvc/slide-2.webp","/images/projects/hecosvc/slide-3.webp","/images/projects/hecosvc/slide-4.webp"],
    },
    {
      title: "Gaming platform for Warcraft III: The Frozen Throne",
      description:
        "Modern platform for playing Warcraft III: The Frozen Throne online, featuring an improved PvPGN server, real-time multiplayer, tournaments, and a focus on developing the classic DotA map.",
      techStack: ["Next.js", "TypeScript", "HTML", "Tailwind CSS", "ShadCN", "Zustand", "Zod"],
      link: "https://w3league.net/en",
      github: "",
      images: ["/images/projects/w3league/slide-1.webp","/images/projects/w3league/slide-2.webp","/images/projects/w3league/slide-3.webp","/images/projects/w3league/slide-4.webp"],
    },
    {
      title: "MindHaven: Mental Wellness Hub",
      description:
        "A web application designed to help users offload mental clutter, track daily tasks, and build sustainable habits. Features include journaling, goal-setting (e.g., meditation streaks), event tracking, and a rewards system that gamifies personal growth. Built with Next.js and Tailwind CSS for a fast, responsive experience. I managed the full project lifecycle, from initial concept to production deployment.",
      techStack: ["Next.js", "TypeScript", "HTML", "Tailwind CSS", "ShadCN", "Zustand", "Zod"],
      link: "https://w3league.net/en",
      github: "",
      images: ["/images/projects/mind-haven/slide-1.webp","/images/projects/mind-haven/slide-2.webp","/images/projects/mind-haven/slide-3.webp","/images/projects/mind-haven/slide-4.webp"],
    },
    {
      title: "LIMS application for an oil company",
      description:
        "LIMS application for an oil company. I used React, TypeScript, Tailwind CSS, ShadCN/ui for the components and RTK Query for the data fetching.",
      techStack: ["React", "TypeScript", "Tailwind CSS", "ShadCN/ui", "RTK Query"],
      link: "https://in-log-livid.vercel.app",
      github: "https://github.com/TrocyukS96/inLog",
      images: ["/images/projects/inlog/slide-1.webp","/images/projects/inlog/slide-2.webp","/images/projects/inlog/slide-3.webp"],
    },
    {
      title: "VTB Online: Digital Banking Platform",
      description:
        "VTB Online — Digital Banking Platform for Retail Clients. A full-scale internet banking platform serving over 600,000 clients in Belarus. The system enables secure payments via the national ERIP system, instant card-to-card and phone-number transfers, currency conversion, and remote management of cards, deposits, and loans. Built with a focus on reliability and 24/7 availability. I managed the entire project lifecycle, from initial client communication to production launch.",
      techStack: ["React.js", "TypeScript", "HTML", "React Query", "tailwind"],
      link: "https://online.vtb.by",
      github: "",
      images: ["/images/projects/vtb/slide-1.webp","/images/projects/vtb/slide-2.webp","/images/projects/vtb/slide-3.webp",],
    },
    {
      title: "Landing page for a therapy and wellness practice",
      description:
        "Landing page for ThriveTalk, a therapy and whole-life care practice. I used Next.js, TypeScript, React, and CSS for this project.",
      techStack: ["Next.js", "TypeScript", "React", "HTML", "CSS"],
      link: "https://thrive-talks-project.vercel.app/",
      github: "https://github.com/TrocyukS96/ThriveTalks-project",
      images: ["/images/projects/thrive/slide-1.webp","/images/projects/thrive/slide-2.webp","/images/projects/thrive/slide-3.webp","/images/projects/thrive/slide-4.webp"],
    },
    {
      title: "Landing page for the IT-company",
      description:
        "Landing page for the IT-company. I used Next.js, TypeScript, HTML, CSS, and React swiper for this project.",
      techStack: ["Next.js", "TypeScript", "HTML", "CSS", "React swiper"],
      link: "https://utouch.dev/",
      github: "https://github.com/TrocyukS96/utouch",
      images: ["/images/projects/utouch.webp"],
    },

    {
      title: "Fitness landing page",
      description:
        "Fitness landing page. I used Next.js, TypeScript, HTML, CSS, and React swiper for this project.",
      techStack: ["Next.js", "TypeScript", "HTML", "CSS", "React swiper"],
      link: "https://fitness-landing-pi.vercel.app/",
      github: "https://github.com/TrocyukS96/fitness-landing",
      images: ["/images/projects/polovtsev/slide-1.webp","/images/projects/polovtsev/slide-2.webp","/images/projects/polovtsev/slide-3.webp","/images/projects/polovtsev/slide-4.webp"],
    },
    {
      title: "Saas landing page",
      description:
        "Landing page for a platform that provides a saas solution for businesses. I created this project using Next.js, tailwind css and shadcn/ui for the components.",
      techStack: ["Next.js", "Tailwind CSS", "ShadCN"],
      link: "https://saas-landing-roan-seven.vercel.app/",
      github: "https://github.com/TrocyukS96/saas-landing",
      images: ["/images/projects/saas.webp"],
    },


  ],
  url: "https://www.stanislovtrotcuk.com",
};
