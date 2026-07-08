export const skillsData = [
  {
    category: "Frontend",
    color: "#ec4899",
    colorClass: "text-[#ec4899]",
    bgClass: "bg-[#ec4899]/20",
    skills: ["Vue", "React", "Nuxt", "Next.js", "Tailwindcss", "Shadcn UI"],
  },
  {
    category: "Backend",
    color: "#06b6d4",
    colorClass: "text-[#06b6d4]",
    bgClass: "bg-[#06b6d4]/20",
    skills: ["Laravel", "Node.js", "Spring Boot", "NestJS", "Axum", "FastAPI"],
  },
  {
    category: "Mobile & others",
    color: "#a78bfa",
    colorClass: "text-[#a78bfa]",
    bgClass: "bg-[#a78bfa]/20",
    skills: [
      "Android (Kotlin)",
      "React Native",
      "Git",
      "Scrum & Kanban",
      "SDLC",
      "System design",
    ],
  },
  {
    category: "Languages",
    color: "#f59e0b",
    colorClass: "text-[#f59e0b]",
    bgClass: "bg-[#f59e0b]/20",
    skills: ["TypeScript", "PHP", "Python", "Rust", "Kotlin", "Java"],
  },
  {
    category: "DevOps",
    color: "#3b82f6",
    colorClass: "text-[#3b82f6]",
    bgClass: "bg-[#3b82f6]/20",
    skills: ["CI/CD", "Linux", "Docker", "Kubernetes", "AWS", "Google Cloud"],
  },
  {
    category: "Data tools & databases",
    color: "#f97316",
    colorClass: "text-[#f97316]",
    bgClass: "bg-[#f97316]/20",
    skills: [
      "Tableau",
      "Microsoft Power BI",
      "Redis",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
    ],
  },
];

export const experienceData = [
  {
    role: "Lead Developer",
    company: "KTC",
    location: "Douala, Cameroon",
    period: "2024 - Present",
    periodColor: "#7c3aed",
    periodBadgeClass: "text-[#7c3aed] border-[#7c3aed]/60 bg-[#7c3aed]/15",
    description:
      "Leading the development of web applications using React and NestJS, while coordinating a team of developers. Established CI/CD pipelines to improve deployment efficiency and implemented microservices architecture to enhance system scalability.",
    tags: [
      "React",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Microservices",
      "CI/CD",
    ],
  },
  {
    role: "Fullstack Developer",
    company: "Yemba Group",
    location: "Douala, Cameroon",
    period: "2023 - 2024",
    periodColor: "#f97316",
    periodBadgeClass: "text-[#f97316] border-[#f97316]/60 bg-[#f97316]/15",
    description:
      "Designed and developed an e-commerce platform and transit management solution. Integrated secure payment gateways and implemented route optimization algorithms. Created a responsive mobile app using React Native.",
    tags: ["Laravel", "Vue", "React Native", "PostgreSQL", "Docker"],
  },
  {
    role: "Mobile Developer",
    company: "Keree",
    location: "Douala, Cameroon",
    period: "2022 - 2023",
    periodColor: "#06b6d4",
    periodBadgeClass: "text-[#06b6d4] border-[#06b6d4]/60 bg-[#06b6d4]/15",
    description:
      "Built cross-platform mobile applications with React Native & Expo. Implemented real-time features with WebSockets and optimized app performance.",
    tags: ["React Native", "Expo", "TypeScript", "Node.js", "WebSockets"],
  },
];

export const educationData = [
  {
    degree: "Master of Engineering in Data Science & AI",
    school: "IUC Douala",
    location: "Douala, Cameroon",
    period: "2022 - 2025",
    periodColor: "#7c3aed",
    periodBadgeClass: "text-[#7c3aed] border-[#7c3aed]/60 bg-[#7c3aed]/15",
    description:
      "Advanced program focusing on building expertise in machine learning algorithms, neural networks, and AI applications. Developed skills in processing large datasets, creating predictive models, and implementing computer vision solutions.",
    tags: [
      "Machine learning",
      "Data science",
      "Data visualization",
      "Advanced databases",
      "Computer architecture",
    ],
  },
  {
    degree: "Bachelor of Science in Computer Science",
    school: "IUC Douala",
    location: "Douala, Cameroon",
    period: "2021 - 2022",
    periodColor: "#f97316",
    periodBadgeClass: "text-[#f97316] border-[#f97316]/60 bg-[#f97316]/15",
    description:
      "Comprehensive program covering core computer science concepts with emphasis on algorithm design and analysis. Studied advanced software architecture patterns and distributed computing principles.",
    tags: ["Algorithms", "Software Architecture", "Distributed Systems", "OOP"],
  },
];

export const professionalProjects = [
  {
    title: "Academy Twentyone",
    category: "Site/Blog & Events",
    categoryColor: "#7c3aed",
    categoryBadgeClass: "text-[#7c3aed] bg-[#7c3aed]/20",
    bgColor: "from-purple-600 to-violet-800",
    description:
      "Site/Blog for cameroonian billionaire Raoul Ruben Njionou's Academy Twenty One, for organizing events and presenting his company.",
    tags: ["Laravel", "PostgreSQL", "Redis"],
    link: "#",
  },
  {
    title: "Sekure",
    category: "Fintech Platform",
    categoryColor: "#06b6d4",
    categoryBadgeClass: "text-[#06b6d4] bg-[#06b6d4]/20",
    bgColor: "from-emerald-400 to-teal-600",
    description:
      "Website for a Cameroonian fintech app specializing in bill payments and virtual credit card issuance.",
    tags: ["Laravel", "Tailwindcss", "Shadcn UI", "Alpinejs"],
    link: "#",
  },
  {
    title: "Lamtrac",
    category: "ERP Platform",
    categoryColor: "#f97316",
    categoryBadgeClass: "text-[#f97316] bg-[#f97316]/20",
    bgColor: "from-orange-400 to-amber-600",
    description:
      "Platform for internal management of dealerships and customers for a tractor manufacturing company.",
    tags: ["Laravel", "React", "Redis", "PostgreSQL", "Docker"],
    link: "#",
  },
];

export const personalProjects = [
  {
    title: "MedApp",
    category: "Healthcare",
    categoryColor: "#10b981",
    categoryBadgeClass: "text-[#10b981] bg-[#10b981]/20",
    bgColor: "from-green-500 to-teal-700",
    description:
      "Medical appointment management system with Laravel REST API + React Native/Expo. Role-based access for patients and admins.",
    tags: ["Laravel", "React Native", "Expo", "SQLite", "Sanctum"],
    link: "#",
  },
  {
    title: "DevBlog",
    category: "Blog",
    categoryColor: "#3b82f6",
    categoryBadgeClass: "text-[#3b82f6] bg-[#3b82f6]/20",
    bgColor: "from-blue-500 to-indigo-700",
    description:
      "Personal technical blog built with Next.js and MDX, focused on web and mobile development in Africa.",
    tags: ["Next.js", "MDX", "Tailwind", "Vercel"],
    link: "#",
  },
];
