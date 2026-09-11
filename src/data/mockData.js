export const initialProjectsData = [
  {
    id: 'proj-1',
    name: 'clario-core-api',
    description: 'High-throughput analytics ingestion pipeline',
    framework: 'Node.js',
    environment: 'Production',
    region: 'us-east-1',
    status: 'Active',
    uptime: '99.99%',
    latency: '34ms',
    requests: '14.2M / day',
    branch: 'main',
    commit: 'a4f91e2',
    updatedAt: '12m ago'
  },
  {
    id: 'proj-2',
    name: 'billing-engine-v2',
    description: 'Stripe webhook processor and invoice generator',
    framework: 'Go',
    environment: 'Production',
    region: 'us-east-1',
    status: 'Active',
    uptime: '100%',
    latency: '18ms',
    requests: '2.1M / day',
    branch: 'main',
    commit: '7b80c3d',
    updatedAt: '1h ago'
  }
];

export const initialApiKeys = [
  {
    id: 'key-1',
    name: 'Production Ingestion Key',
    prefix: 'sk_live_9f83',
    fullKey: 'sk_live_9f83a2e104cb883901bcf5a',
    created: '12 days ago',
    lastUsed: '2m ago',
    environment: 'Production',
    role: 'Full Access'
  },
  {
    id: 'key-2',
    name: 'Staging Test Key',
    prefix: 'sk_test_7a12',
    fullKey: 'sk_test_7a120cb2184ff931bc893a',
    created: '3 weeks ago',
    lastUsed: '1d ago',
    environment: 'Development',
    role: 'Read Only'
  }
];

export const mockBillingData = {
  currentPlan: 'pro',
  billingCycle: 'monthly',
  nextBillingDate: 'Oct 01, 2026',
  paymentMethod: {
    brand: 'Visa',
    last4: '4242',
    expiry: '12/28'
  },
  usage: {
    eventsIngested: 1420000,
    eventsLimit: 2000000,
    teamMembers: 4,
    teamLimit: 10
  }
};
