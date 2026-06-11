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
  thumbnail: string;
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
    // {
    //   title: "Covid-19 Status",
    //   description:
    //     "COVID-19 Status is a free and open-source Android app that provides real-time COVID-19 statistics across India and worldwide, featuring a clean, fast, and responsive user interface.",
    //   techStack: ["Java", "XML", "Firebase", "Rest APIs"],
    //   link: "https://project.vipuljha.com/covid",
    //   github: "https://github.com/Coders-Of-XDA-OT/covid19-status-android",
    //   thumbnail: "/images/projects/covid.webp",
    // },
    // {
    //   title: "ElectraBlue Kernel",
    //   description:
    //     "ElectraBlue is a flash-and-forget custom kernel for supported Android devices, built to deliver a stable, smooth, and battery-efficient experience with thoughtful customization options using apps like Kernel Adiutor.",
    //   techStack: ["Linux", "C", "Makefile", "Bash"],
    //   link: "https://xdaforums.com/t/kernel-mido-oreo-pie-electrablue-kernel-21-0-july-06-redmi-note-4.3655651",
    //   github: "https://github.com/lordarcadius/electrablue_mido",
    //   thumbnail: "/images/projects/eb.webp",
    // },
    // {
    //   title: "Portfolio Website",
    //   description:
    //     "A previous version of my personal portfolio website showcasing my projects, work experience, and resume before launching the further iterations built in more modern tech stack.",
    //   techStack: ["HTML", "CSS", "Bootstrap", "JQuery"],
    //   link: "https://project.vipuljha.com/website",
    //   github: "https://github.com/lordarcadius/website",
    //   thumbnail: "/images/projects/portfolio.webp",
    // },
    // {
    //   title: "ABS Tweaks",
    //   description:
    //     "ABS Tweaks (Arkaynine Boost Script) is a collection of shell-based performance optimizations for Android devices, designed to improve speed and battery life. It has been downloaded over 200,000 times.",
    //   techStack: ["Shell", "BusyBox", "Terminal Emulator", "SuperSU"],
    //   link: "https://xdaforums.com/t/tweak-mod-arm-x86-project-dark-booster-abs-tweaks-v5-0-2-3-6-0-23-01-2016.3120404",
    //   github: "https://github.com/lordarcadius/ABS-Tweaks",
    //   thumbnail: "/images/projects/abs.webp",
    // },
    // {
    //   title: "Lenovo SNAPit Camera",
    //   description:
    //     "Lenovo SNAPit Camera was one of the most feature-rich OEM camera apps of its time, offering a wide range of unique capabilities. I successfully ported it to run on nearly all supported Android devices back then.",
    //   techStack: ["Java", "XML", "Libs", "Smali", "Apktool"],
    //   link: "https://xdaforums.com/t/app-port-6-0-lenovo-snapit-camera-5-8-53-for-all-devices.3608065/",
    //   github: "",
    //   thumbnail: "/images/projects/snapit.webp",
    // },
    // {
    //   title: "CyanogenOS Apps",
    //   description:
    //     "CyanogenOS 12.1 included exclusive apps such as the updated theme engine and a Truecaller-integrated dialer. I successfully ported these features to work on CyanogenMod 13 and CyanogenMod13-based ROMs.",
    //   techStack: ["Java", "Libs", "Updater Script", "Apktool"],
    //   link: "https://xdaforums.com/t/c-apps-v2-unofficial-6-0-x-cyanogen-os-capps-v2-for-cm13-and-cm13-based-roms.3254865/",
    //   github: "",
    //   thumbnail: "/images/projects/capps.webp",
    // },
  ],
  url: "https://www.stanislovtrotcuk.com",
};
