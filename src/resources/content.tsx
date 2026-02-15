import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Furkan",
  lastName: "Tosun",
  name: `Furkan Tosun`,
  role: "CSE Student at Akdeniz University",
  avatar: "/images/pp.png",
  email: "furkantosun0716@outlook.com",
  location: "Europe/Istanbul", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna' (Bursa uses same timezone)
  languages: ["English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
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
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Learning, building, and sharing my journey in computer science</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      I'm Furkan, a CSE student at Akdeniz University, exploring web development,
      algorithms, and modern JavaScript. This is where I share some of my projects
      and experiments as I grow as a developer.
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
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Furkan is a multidisciplinary developer based in Turkey, focused on building secure, scalable cloud applications and AI-driven automation systems. He bridges the gap between robust backend architecture and modern identity management, turning complex security requirements into seamless user experiences.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Key Projects",
    experiences: [
      {
        company: "TSN Media",
        timeframe: "2026 - Present",
        role: "Founder & Lead Developer",
        achievements: [
          <>
            Designed an autonomous news aggregation system using Python and Google Gemini AI, reducing content curation time by 99%.
          </>,
          <>
            Implemented a multi-channel distribution network that synthesizes global news into personalized audio and text briefings.
          </>,
        ],
        images: [],
      },
      {
        company: "Secure Cloud Identity Integration",
        timeframe: "2025",
        role: "Cloud Security Engineer",
        achievements: [
          <>
            Built a secure Single Page Application (SPA) on Azure, implementing Microsoft Entra External ID (CIAM) for enterprise-grade authentication.
          </>,
          <>
            Secured sensitive data flows using OAuth 2.0 and OIDC standards, eliminating hardcoded credentials.
          </>,
        ],
        images: [],
      },
      {
        company: "Full-Stack E-Commerce Platform",
        timeframe: "2024",
        role: "Full-Stack Developer",
        achievements: [
          <>
            Developed a modular, multi-vendor e-commerce architecture using Angular and Spring Boot 3.
          </>,
          <>
            Integrated Stripe payment gateways and JWT security, creating a scalable solution for real-time order processing.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Akdeniz University",
        description: <>Computer Science Engineering (Senior).</>,
      },
      {
        name: "Red Hat Academy",
        description: <>System Administration I (RH124) - High proficiency in Linux enterprise management.</>,
      },
      {
        name: "Postman Student Expert",
        description: <>Certified in API fundamentals, testing, and documentation.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Java & Spring Boot",
        description: (
          <>Building robust, secure backend APIs with microservices architecture.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Azure & Cloud Security",
        description: (
          <>Deploying secure apps using Azure App Service and Entra ID (CIAM).</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Linux & DevOps",
        description: (
          <>Red Hat Certified system administration and automated deployment workflows.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Python & AI",
        description: (
          <>Automating workflows and integrating LLMs (Gemini) into production apps.</>
        ),
        tags: [],
        images: [],
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
