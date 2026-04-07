// Mock Data for GigSphere

export const currentUser = {
  id: 'u1',
  name: 'Alex Johnson',
  role: 'client', // or 'freelancer'
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  rating: 4.9,
  completedJobs: 12,
};

export const categories = [
  { id: 'c1', name: 'Web Development', icon: 'Code', count: 1250 },
  { id: 'c2', name: 'UI/UX Design', icon: 'PenTool', count: 840 },
  { id: 'c3', name: 'AI & Machine Learning', icon: 'Cpu', count: 420 },
  { id: 'c4', name: 'Writing & Translation', icon: 'FileText', count: 1100 },
];

export const gigs = [
  {
    id: 'g1',
    title: 'Full-stack Next.js developer for SaaS MVP',
    client: { name: 'TechNova', rating: 4.8 },
    budget: '$3,000 - $5,000',
    type: 'Fixed Price',
    skills: ['Next.js', 'React', 'Node.js', 'Tailwind'],
    description: 'We are looking for an experienced full-stack developer to build the MVP for our new AI-powered SaaS product. The platform will help content creators generate video scripts.',
    status: 'open',
    postedAt: '2 hours ago',
    deadline: '2023-12-01',
    proposalsCount: 14,
  },
  {
    id: 'g2',
    title: 'Senior UI/UX Designer for Fintech App Redesign',
    client: { name: 'FinanceFlow', rating: 5.0 },
    budget: '$50/hr',
    type: 'Hourly',
    skills: ['Figma', 'Prototyping', 'User Research'],
    description: 'Need a premium redesign of our existing fintech mobile application. Must have strong understanding of modern aesthetics and clear user flows.',
    status: 'in progress',
    postedAt: '1 day ago',
    deadline: '2023-11-15',
    proposalsCount: 32,
  },
  {
    id: 'g3',
    title: 'Machine Learning Engineer for Recommendation System',
    client: { name: 'ShopSmart', rating: 4.5 },
    budget: '$8,000',
    type: 'Fixed Price',
    skills: ['Python', 'TensorFlow', 'AWS'],
    description: 'Looking to integrate a collaborative filtering recommendation engine into our ecommerce platform to increase average order value.',
    status: 'open',
    postedAt: '3 hours ago',
    deadline: '2024-01-10',
    proposalsCount: 8,
  },
];

export const proposals = [
  {
    id: 'p1',
    gigId: 'g1',
    freelancer: {
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
      rating: 4.9,
      completedJobs: 45,
    },
    bidAmount: '$4,500',
    coverLetter: 'I have built over 10 SaaS MVPs using the exact tech stack you requested...',
    aiRank: 'Top Match', // 'Top Match', 'Good Fit', 'Average'
    status: 'pending', // pending, accepted, rejected
  },
  {
    id: 'p2',
    gigId: 'g1',
    freelancer: {
      name: 'Marcus Dubois',
      avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
      rating: 4.7,
      completedJobs: 18,
    },
    bidAmount: '$3,800',
    coverLetter: 'Hello! Im very interested in this project and have strong Next.js skills...',
    aiRank: 'Good Fit',
    status: 'pending',
  },
];

export const messages = [
  { id: 'm1', senderId: 'user-id', text: 'Hi Sarah, loved your proposal!', timestamp: '10:00 AM', isMine: true },
  { id: 'm2', senderId: 'sarah-id', text: 'Thanks! Let me know if you want to hop on a quick call.', timestamp: '10:02 AM', isMine: false },
  { id: 'm3', senderId: 'user-id', text: 'Sure, does 2 PM EST work for you?', timestamp: '10:05 AM', isMine: true },
];

export const adminStats = {
  totalUsers: 14205,
  totalGigs: 3840,
  revenue: '$142,500',
};
