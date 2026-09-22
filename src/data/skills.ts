export const skills = [
  {
    name: 'Backend',
    note: 'My primary toolkit',
    icon: 'server',
    primary: true,
    items: ['Python', 'Django', 'Django REST Framework', 'REST API', 'asyncio', 'aiohttp'],
  },
  {
    name: 'Databases',
    note: 'Storage & caching',
    icon: 'database',
    items: ['PostgreSQL', 'MySQL', 'Redis', 'PostGIS'],
  },
  {
    name: 'Automation',
    note: 'Data & browser workflows',
    icon: 'workflow',
    items: ['Playwright', 'Selenium', 'BeautifulSoup', 'Requests'],
  },
  {
    name: 'Bots',
    note: 'Conversational tools',
    icon: 'bot',
    items: ['aiogram', 'disnake', 'Telegram', 'Discord'],
  },
  {
    name: 'Tools & deployment',
    note: 'Development to delivery',
    icon: 'terminal',
    items: ['Git', 'Docker', 'Docker Compose', 'Linux', 'Postman'],
  },
  {
    name: 'Frontend',
    note: 'Supporting skill set',
    icon: 'panels',
    items: ['HTML', 'CSS', 'JavaScript', 'React (basic)', 'Tailwind CSS'],
  },
] as const;
