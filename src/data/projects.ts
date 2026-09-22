export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  status?: string;
  featured?: boolean;
  icon: 'messages' | 'business' | 'bot' | 'scan' | 'store';
  technologies: string[];
  features: string[];
  focus: { label: string; text: string };
  github: string | null;
  demo: string | null;
  screenshot: { src: string; alt: string; width: number; height: number } | null;
}

// Repository links and screenshots are intentionally unset until supplied.
// Only ByteMarket has a confirmed status. Add other statuses when verified.
export const projects: Project[] = [
  {
    id: 'realtime-app',
    number: '01',
    title: 'Real-Time Dating Web Application',
    category: 'Full-stack application',
    icon: 'messages',
    featured: true,
    description:
      'A dating application connecting user profiles, location-based discovery and real-time conversations. Built around a Django API and a React interface.',
    technologies: [
      'Python',
      'Django',
      'Django REST Framework',
      'PostgreSQL',
      'PostGIS',
      'Redis',
      'Django Channels',
      'WebSockets',
      'JWT',
      'React',
      'Tailwind CSS',
      'Docker',
    ],
    features: [
      'JWT authentication and user profiles',
      'Geolocation and location-based search with PostGIS',
      'Real-time chat using Django Channels, WebSockets and Redis',
      'REST API and Docker deployment',
    ],
    focus: {
      label: 'Technical focus',
      text: 'Real-time chat was one of the most challenging parts: bringing WebSocket communication into a Django application alongside its REST API.',
    },
    github: null,
    demo: null,
    screenshot: null,
  },
  {
    id: 'crm',
    number: '02',
    title: 'CRM / Business Management',
    category: 'Business application',
    icon: 'business',
    description:
      'A Django-based system for managing customers, sellers, suppliers, products and deals, with business rules behind the everyday workflows.',
    technologies: ['Python', 'Django', 'PostgreSQL / MySQL', 'JavaScript', 'HTML', 'CSS'],
    features: [
      'Customers, sellers, suppliers and products',
      'Deals, statuses and tasks',
      'Product availability, pricing and profit calculation',
      'Search, filtering and CSV import',
      'Business validation and backend workflows',
    ],
    focus: {
      label: 'Technical focus',
      text: 'Connecting related business data with validation and workflows that support the full lifecycle of a deal.',
    },
    github: null,
    demo: null,
    screenshot: null,
  },
  {
    id: 'bots',
    number: '03',
    title: 'Bots & Automation',
    category: 'Collection of practical projects',
    icon: 'bot',
    description:
      'Practical work with Telegram and Discord bots, asynchronous Python and third-party APIs to support useful automated interactions.',
    technologies: ['Python', 'aiogram', 'disnake', 'asyncio', 'APIs', 'Databases'],
    features: [
      'Telegram and Discord bot development',
      'Asynchronous Python and API integrations',
      'Database-backed bot workflows',
    ],
    focus: {
      label: 'Areas I can build',
      text: 'Commands, FSM/state management, admin tools, user management, notifications and background tasks. Individual examples can be added as separate case studies.',
    },
    github: null,
    demo: null,
    screenshot: null,
  },
  {
    id: 'scraping',
    number: '04',
    title: 'Web Scraping & Automation',
    category: 'Python tooling',
    icon: 'scan',
    description:
      'Python tools for collecting and processing website data, with browser automation for repetitive tasks and dynamic pages.',
    technologies: ['Python', 'Playwright', 'Selenium', 'BeautifulSoup', 'Requests', 'asyncio'],
    features: [
      'Browser automation',
      'Structured data extraction',
      'Filtering and data processing',
      'Repetitive browser task automation',
    ],
    focus: {
      label: 'Technical focus',
      text: 'Turning website content into structured data and connecting extraction with processing in a repeatable workflow.',
    },
    github: null,
    demo: null,
    screenshot: null,
  },
  {
    id: 'bytemarket',
    number: '05',
    title: 'ByteMarket',
    category: 'E-commerce pet project',
    icon: 'store',
    status: 'In Development',
    description:
      'An e-commerce website for computer peripherals. Currently in development, with the catalog, purchase flow and integrations on the roadmap.',
    technologies: [
      'Python',
      'Django',
      'Django REST Framework',
      'PostgreSQL',
      'HTML',
      'CSS',
      'JavaScript',
      'Docker',
    ],
    features: [
      'Product catalog, variants, filtering and search',
      'Shopping cart and checkout',
      'Authentication and user profiles',
      'Nova Poshta and payment integrations',
      'Orders and Django Admin',
    ],
    focus: {
      label: 'Development direction',
      text: 'Building a complete small web product, from the database and API to the storefront. The functionality listed here is planned, not a claim of completion.',
    },
    github: null,
    demo: null,
    screenshot: null,
  },
];
