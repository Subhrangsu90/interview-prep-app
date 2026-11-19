export interface SyllabusTemplate {
  name: string;
  description?: string;
  modules: { name: string; topics: string[] }[];
}

/** Default Angular-focused syllabus, created for every new user. Fully editable in the app. */
export const defaultSyllabus: SyllabusTemplate[] = [
  {
    name: 'Web basics',
    modules: [
      {
        name: 'HTML',
        topics: [
          'Semantic tags',
          'Forms and validation',
          'Accessibility (ARIA)',
          'SEO basics',
          'Meta tags',
        ],
      },
      {
        name: 'CSS',
        topics: [
          'Box model',
          'Specificity',
          'Flexbox',
          'Grid',
          'Positioning',
          'Responsive design',
          'Animations',
          'BEM',
          'SCSS',
        ],
      },
      {
        name: 'Browser and web',
        topics: [
          'Rendering pipeline',
          'Critical rendering path',
          'Storage (cookies, local, session)',
          'CORS',
          'HTTP/HTTPS',
          'Caching',
          'Web security (XSS, CSRF)',
        ],
      },
    ],
  },
  {
    name: 'JavaScript',
    modules: [
      {
        name: 'Core JS',
        topics: [
          'Types and coercion',
          'Scope',
          'Hoisting',
          'Closures',
          'this',
          'Prototypes',
          'ES6+ features',
        ],
      },
      {
        name: 'Async JS',
        topics: [
          'Event loop',
          'Microtasks vs macrotasks',
          'Promises',
          'async/await',
          'Debounce and throttle',
        ],
      },
      {
        name: 'TypeScript',
        topics: [
          'Types vs interfaces',
          'Generics',
          'Utility types',
          'Narrowing',
          'Decorators',
          'tsconfig',
        ],
      },
    ],
  },
  {
    name: 'Angular',
    modules: [
      {
        name: 'Angular core',
        topics: [
          'Components',
          'Templates',
          'Control flow',
          'Data binding',
          'Lifecycle hooks',
          'Directives',
          'Pipes',
          'Dependency injection',
        ],
      },
      {
        name: 'Reactivity',
        topics: [
          'Signals',
          'computed',
          'effect',
          'linkedSignal',
          'resource',
          'RxJS operators',
          'Subjects',
          'Signals vs RxJS',
        ],
      },
      {
        name: 'Angular advanced',
        topics: [
          'Change detection',
          'OnPush',
          'Zoneless',
          'Routing and guards',
          'Lazy loading',
          'Forms (reactive, typed, signal)',
          'HttpClient and interceptors',
          'NgRx / signal store',
          'SSR and hydration',
          'Performance',
          'Testing',
        ],
      },
    ],
  },
  {
    name: 'Backend',
    modules: [
      {
        name: 'Node.js and Express',
        topics: [
          'Node event loop',
          'Streams',
          'Modules',
          'Express middleware',
          'Routing',
          'Error handling',
          'Auth (JWT, sessions)',
          'REST design',
          'Validation',
        ],
      },
      {
        name: 'Databases',
        topics: [
          'SQL joins',
          'Indexes',
          'Transactions',
          'Normalisation',
          'PostgreSQL',
          'ORMs (Drizzle)',
          'NoSQL basics',
          'Redis caching',
        ],
      },
    ],
  },
  {
    name: 'DevOps',
    modules: [
      {
        name: 'Docker and CI/CD',
        topics: [
          'Dockerfile',
          'Images vs containers',
          'Compose',
          'Multi-stage builds',
          'GitHub Actions',
          'Environments',
          'Deployment',
        ],
      },
      {
        name: 'System design',
        topics: [
          'Frontend system design',
          'Scalability',
          'Caching layers',
          'CDNs',
          'Load balancing',
          'Micro-frontends',
        ],
      },
    ],
  },
  {
    name: 'AI',
    modules: [
      {
        name: 'AI for developers',
        topics: [
          'LLM basics',
          'Prompting',
          'Tokens and cost',
          'Structured output',
          'Embeddings',
          'RAG',
          'Vector databases',
          'AI in frontend apps',
        ],
      },
    ],
  },
  {
    name: 'Soft skills',
    modules: [
      {
        name: 'Behavioral',
        topics: [
          'STAR answers',
          'Project walkthrough',
          'Conflict',
          'Ownership',
          'Why this company',
        ],
      },
    ],
  },
];
