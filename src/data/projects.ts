export interface ProjectScreenshot {
  src: string;
  label: string;
  labelUk: string;
  alt: string;
  altUk: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  status?: string;
  featured?: boolean;
  icon: 'messages' | 'business' | 'bot' | 'scan';
  technologies: string[];
  features: string[];
  focus: { label: string; text: string };
  github: string | null;
  demo: string | null;
  screenshots: ProjectScreenshot[];
  relatedRepositories?: { name: string; url: string }[];
}

// Use real captures only. Missing files render labeled placeholders at build time.
// Update dimensions and bilingual alt text to match each supplied screenshot.
const screenshot = (
  file: string,
  label: string,
  labelUk: string,
  alt: string,
  altUk: string,
  width = 1440,
  height = 900,
): ProjectScreenshot => ({
  src: `images/projects/${file}`,
  label,
  labelUk,
  alt,
  altUk,
  width,
  height,
});
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
    github: 'https://github.com/ImpLeax/Spark',
    demo: null,
    screenshots: [
      screenshot(
        'dating-main.jpg',
        'Application overview',
        'Огляд застосунку',
        'Spark dating application landing page with a login form.',
        'Головна сторінка застосунку Spark із формою входу.',
        1063,
        524,
      ),
      screenshot(
        'dating-chat.jpg',
        'Real-time conversations',
        'Спілкування в реальному часі',
        'Spark real-time messaging interface.',
        'Інтерфейс обміну повідомленнями в реальному часі у Spark.',
        716,
        516,
      ),
      screenshot(
        'recomendations-list.jpg',
        'Recommended profiles',
        'Рекомендовані профілі',
        'Spark recommendation list showing a suggested profile.',
        'Список рекомендацій у Spark із запропонованим профілем.',
        542,
        818,
      ),
    ],
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
    github: 'https://github.com/ImpLeax/WorkFlowCRM',
    demo: null,
    screenshots: [
      screenshot(
        'crm-dashboard.jpg',
        'Business workspace',
        'Робочий простір бізнесу',
        'WorkFlowCRM business management workspace.',
        'Робочий простір управління бізнесом у WorkFlowCRM.',
        993,
        492,
      ),
      screenshot(
        'crm-deals.jpg',
        'Deal workflows',
        'Робота з угодами',
        'WorkFlowCRM deal management and statuses.',
        'Керування угодами та їхніми статусами у WorkFlowCRM.',
      ),
      screenshot(
        'crm-products.jpg',
        'Product management',
        'Керування товарами',
        'WorkFlowCRM product management interface.',
        'Інтерфейс керування товарами у WorkFlowCRM.',
      ),
    ],
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
    github: 'https://github.com/ImpLeax/FixMyRideBot',
    demo: null,
    relatedRepositories: [
      { name: 'AI-Assistant', url: 'https://github.com/ImpLeax/AI-Assistant' },
      { name: 'GateKeeperBot', url: 'https://github.com/ImpLeax/GateKeeperBot' },
    ],
    screenshots: [
      screenshot(
        'bot-main.jpg',
        'Bot interaction',
        'Взаємодія з ботом',
        'FixMyRideBot interface showing a real bot interaction.',
        'Інтерфейс FixMyRideBot із реальною взаємодією з ботом.',
        555,
        374,
      ),
      screenshot(
        'bot-admin.jpg',
        'Administration tools',
        'Інструменти адміністратора',
        'Bot administration tools.',
        'Інструменти адміністрування бота.',
      ),
    ],
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
    github: null, // Add a verified scraping repository URL when available.
    demo: null,
    screenshots: [],
  },
];
