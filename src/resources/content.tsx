import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Furkan",
  lastName: "Tosun",
  name: `Furkan Tosun`,
  role: "Computer Engineering Student",
  avatar: "/images/pp.png",
  email: "furkantosun0716@outlook.com",
  location: "Europe/Istanbul", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna' (Bursa uses same timezone)
  languages: ["English · B2"],
  city: "Bursa, Türkiye",
  resume: "/FurkanTosun.pdf",
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/furkantosun1607",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/tosun-furkan/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/furkan.gfb",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/api/og/generate?title=Furkan%20Tosun%20%7C%20Infrastructure%20%26%20Software",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: "Furkan Tosun, a fourth-year Computer Engineering student at Akdeniz University. IT infrastructure, enterprise networking, full-stack development, and AI automation.",
  headline: <>Connecting infrastructure.<br />Building useful software.</>,
  featured: {
    display: true,
    title: <>SutasGPT · Internal IT knowledge prototype</>,
    href: "/work/sutasgpt-it-knowledge-prototype",
  },
  subline: (
    <>
      I'm Furkan, a fourth-year Computer Engineering student at Akdeniz University.
      My internships at Sütaş and Sarıtay Bilişim connect hands-on enterprise IT
      experience with full-stack development and AI-powered automation.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from Bursa/Türkiye`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm a fourth-year Computer Engineering student at Akdeniz University,
        expecting to graduate in 2027. My experience spans enterprise networking,
        IT infrastructure, technical automation, and full-stack software development.
        At Sütaş, I worked with Cisco networks, network access control, and IT
        documentation. At Sarıtay Bilişim, I worked on Sociact with ASP.NET Core
        and Angular. I now continue Sociact as my graduation project, with a
        React and NestJS codebase. I'm interested in IT system support,
        network administration, and enterprise infrastructure operations.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Experience",
    experiences: [
      {
        company: "Sütaş",
        timeframe: "Aug 2026 - Sep 2026",
        role: "Information Technology Intern · Bursa, Türkiye",
        achievements: [
          <>
            Supported enterprise IT operations, network connectivity, and infrastructure troubleshooting.
          </>,
          <>
            Contributed to Cisco network configuration, VLAN segmentation, wireless network optimization, and connectivity management.
          </>,
          <>Participated in NAC operations using IEEE 802.1X and MAC Authentication Bypass (MAB) for device authentication and network access.</>,
          <>Developed Excel VBA tools for hardware maintenance tracking, infrastructure inventory, and technical documentation.</>,
          <>Designed SutasGPT, an internal IT knowledge management prototype using LLMWiki, RAG concepts, and Streamlit.</>,
        ],
        images: [],
      },
      {
        company: "Sarıtay Bilişim",
        timeframe: "Jun 2026 - Aug 2026",
        role: "Software Engineering Intern · Antalya, Türkiye",
        achievements: [
          <>
            Worked on Sociact, an AI-powered social media management platform, using ASP.NET Core and Angular during the internship. I continue the platform as my graduation project at Akdeniz University.
          </>,
          <>
            Implemented backend application logic and connected frontend components to RESTful APIs.
          </>,
          <>Integrated content generation with LangChain and MCP, using an Obsidian-based LLMWiki for brand-specific context.</>,
          <>Worked with GitLab CI/CD pipelines for build, testing, and deployment across Development, Staging, and Production.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Akdeniz University",
        description: <>B.S. in Computer Engineering · Fourth year · Expected graduation: 2027 · Antalya, Türkiye. Graduation project: Sociact, an AI-powered social media content generation and management platform.</>,
      },
      {
        name: "Akdeniz University · School of Foreign Languages",
        description: <>English Preparatory Program · Sep 2022 - Jun 2023.</>,
      },
    ],
  },
  certifications: {
    display: true,
    title: "Certifications & Training",
    items: [
      "Red Hat Academy: System Administration I (RH124)",
      "Microsoft Certified: Azure Fundamentals",
      "Cisco: Introduction to Cybersecurity",
      "Postman Student Expert: API Fundamentals, Testing and Documentation",
      "Akbank Machine Learning Bootcamp",
      "Akbank Python Yeni Nesil Bootcamp",
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Networking & Infrastructure",
        description: (
          <>TCP/IP, Cisco networking, VLANs, DNS, DHCP, WLAN, network troubleshooting, NAC, IEEE 802.1X, and MAB.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Systems & Cloud",
        description: (
          <>Linux (RHEL, Ubuntu), system administration, Azure Virtual Machines, Azure App Service, Microsoft Entra ID, and virtualization.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "IT Support & Automation",
        description: (
          <>Hardware inventory management, infrastructure documentation, Excel VBA, PowerShell, and Bash.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Software Development",
        description: (
          <>C#, Python, Java, TypeScript, JavaScript, ASP.NET Core, Angular, React, NestJS, Spring Boot, and RESTful APIs.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "DevOps & Databases",
        description: <>Docker, Git, GitLab CI/CD, Azure DevOps, PostgreSQL, and MySQL.</>,
      },
      {
        title: "AI & Integration",
        description: <>LangChain, LangGraph, MCP, RAG, LLM integration, and Streamlit.</>,
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: "My Projects",
  description: `Selected projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/bıydan.jpeg",
      alt: "Bıydan",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/elespit.jpeg",
      alt: "Elespit",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpeg",
      alt: "Gallery image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-1.jpeg",
      alt: "Gallery image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/kedi.jpeg",
      alt: "Kedi",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/MANZARA.jpeg",
      alt: "Manzara",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
