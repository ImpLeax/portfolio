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
): ProjectScreenshot => ({
  src: `images/projects/${file}.webp`,
  label,
  labelUk,
  alt,
  altUk,
  width: 1440,
  height: 900,
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
        'dating-main',
        'Application overview',
        'Огляд застосунку',
        'Spark dating application interface with user profiles.',
        'Інтерфейс застосунку Spark із профілями користувачів.',
      ),
      screenshot(
        'dating-chat',
        'Real-time conversations',
        'Спілкування в реальному часі',
        'Spark real-time messaging interface.',
        'Інтерфейс обміну повідомленнями в реальному часі у Spark.',
      ),
      screenshot(
        'dating-discovery',
        'Location-based discovery',
        'Пошук за місцезнаходженням',
        'Spark location-based profile discovery interface.',
        'Інтерфейс пошуку профілів за місцезнаходженням у Spark.',
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
        'crm-dashboard',
        'Business workspace',
        'Робочий простір бізнесу',
        'WorkFlowCRM business management workspace.',
        'Робочий простір управління бізнесом у WorkFlowCRM.',
      ),
      screenshot(
        'crm-deals',
        'Deal workflows',
        'Робота з угодами',
        'WorkFlowCRM deal management and statuses.',
        'Керування угодами та їхніми статусами у WorkFlowCRM.',
      ),
      screenshot(
        'crm-products',
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
        'bot-main',
        'Bot interaction',
        'Взаємодія з ботом',
        'FixMyRideBot interface showing a real bot interaction.',
        'Інтерфейс FixMyRideBot із реальною взаємодією з ботом.',
      ),
      screenshot(
        'bot-admin',
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
    screenshots: [
      screenshot(
        'scraping-output',
        'Structured output',
        'Структуровані результати',
        'Real structured data extracted by the Python scraping tool.',
        'Реальні структуровані дані, зібрані інструментом вебскрапінгу на Python.',
      ),
      screenshot(
        'scraping-browser',
        'Browser workflow',
        'Робочий процес у браузері',
        'A real browser automation workflow.',
        'Реальний робочий процес автоматизації браузера.',
      ),
    ],
  },
];
