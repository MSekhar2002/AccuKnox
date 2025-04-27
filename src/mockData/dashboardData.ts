import { Widget, Category } from '../types';

// Mock widgets data
export const initialWidgets: Record<string, Widget> = {
  'widget-1': { 
    id: 'widget-1', 
    title: 'Cloud Accounts', 
    type: 'donut',
    data: {
      connected: 2,
      notConnected: 2,
      total: 4
    }
  },
  'widget-2': { 
    id: 'widget-2', 
    title: 'Cloud Account Risk Assessment', 
    type: 'donut',
    data: {
      passed: 7753,
      failed: 1689,
      warning: 681,
      notAvailable: 36,
      total: 9659
    }
  },
  'widget-3': { 
    id: 'widget-3', 
    title: 'Top 5 Namespace Specific Alerts', 
    type: 'bar',
    data: null
  },
  'widget-4': { 
    id: 'widget-4', 
    title: 'Workload Alerts', 
    type: 'line',
    data: null
  },
  'widget-5': { 
    id: 'widget-5', 
    title: 'Image Risk Assessment', 
    type: 'gauge',
    data: {
      critical: 9,
      high: 150,
      total: 1470,
      vulnerabilities: true
    }
  },
  'widget-6': { 
    id: 'widget-6', 
    title: 'Image Security Issues', 
    type: 'gauge',
    data: {
      critical: 2,
      high: 2,
      total: 2,
      images: true
    }
  },
  'widget-7': { 
    id: 'widget-7', 
    title: 'Ticket Summary', 
    type: 'donut',
    data: {
      open: 24,
      inProgress: 18,
      resolved: 42,
      closed: 16,
      total: 100
    }
  },
  'widget-8': { 
    id: 'widget-8', 
    title: 'Open Tickets', 
    type: 'donut',
    data: {
      critical: 5,
      high: 8,
      medium: 7,
      low: 4,
      total: 24
    }
  },
  'widget-9': { 
    id: 'widget-9', 
    title: 'Ticket Resolution Time', 
    type: 'bar',
    data: null
  },
  'widget-10': { 
    id: 'widget-10', 
    title: 'Tickets by Category', 
    type: 'bar',
    data: null
  }
};

// Initial categories
export const initialCategories: Category[] = [
  {
    id: 'category-1',
    name: 'CSPM Executive Dashboard',
    widgets: ['widget-1', 'widget-2'],
    type: 'CSPM'
  },
  {
    id: 'category-2',
    name: 'CWPP Dashboard',
    widgets: ['widget-3', 'widget-4'],
    type: 'CWPP'
  },
  {
    id: 'category-3',
    name: 'Registry Scan',
    widgets: ['widget-5', 'widget-6'],
    type: 'Image'
  },
  {
    id: 'category-4',
    name: 'Ticket Management',
    widgets: ['widget-7', 'widget-8', 'widget-9', 'widget-10'],
    type: 'Ticket'
  }
];

// JSON structure for dynamic widget management
export const dashboardConfig = {
  categories: [
    {
      id: 'category-1',
      name: 'CSPM Executive Dashboard',
      description: 'Cloud Security Posture Management dashboard with key metrics',
      widgets: [
        {
          id: 'widget-1',
          title: 'Cloud Accounts',
          type: 'donut',
          data: {
            connected: 2,
            notConnected: 2,
            total: 4
          }
        },
        {
          id: 'widget-2',
          title: 'Cloud Account Risk Assessment',
          type: 'donut',
          data: {
            passed: 7753,
            failed: 1689,
            warning: 681,
            notAvailable: 36,
            total: 9659
          }
        }
      ]
    },
    {
      id: 'category-2',
      name: 'CWPP Dashboard',
      description: 'Cloud Workload Protection Platform metrics and alerts',
      widgets: [
        {
          id: 'widget-3',
          title: 'Top 5 Namespace Specific Alerts',
          type: 'bar',
          data: null
        },
        {
          id: 'widget-4',
          title: 'Workload Alerts',
          type: 'line',
          data: null
        }
      ]
    },
    {
      id: 'category-3',
      name: 'Registry Scan',
      description: 'Image scanning results and vulnerability assessments',
      widgets: [
        {
          id: 'widget-5',
          title: 'Image Risk Assessment',
          type: 'gauge',
          data: {
            critical: 9,
            high: 150,
            total: 1470,
            vulnerabilities: true
          }
        },
        {
          id: 'widget-6',
          title: 'Image Security Issues',
          type: 'gauge',
          data: {
            critical: 2,
            high: 2,
            total: 2,
            images: true
          }
        }
      ]
    },
    {
      id: 'category-4',
      name: 'Ticket Management',
      description: 'Track and manage security and compliance tickets',
      widgets: [
        {
          id: 'widget-7',
          title: 'Ticket Summary',
          type: 'donut',
          data: {
            open: 24,
            inProgress: 18,
            resolved: 42,
            closed: 16,
            total: 100
          }
        },
        {
          id: 'widget-8',
          title: 'Open Tickets',
          type: 'donut',
          data: {
            critical: 5,
            high: 8,
            medium: 7,
            low: 4,
            total: 24
          }
        },
        {
          id: 'widget-9',
          title: 'Ticket Resolution Time',
          type: 'bar',
          data: null
        },
        {
          id: 'widget-10',
          title: 'Tickets by Category',
          type: 'bar',
          data: null
        }
      ]
    }
  ],
  widgetTypes: [
    {
      type: 'donut',
      name: 'Donut Chart',
      description: 'Visual representation of data as segments of a circle'
    },
    {
      type: 'gauge',
      name: 'Gauge Chart',
      description: 'Displays a value within a range using a dial or gauge'
    },
    {
      type: 'bar',
      name: 'Bar Chart',
      description: 'Represents data as horizontal or vertical bars'
    },
    {
      type: 'line',
      name: 'Line Chart',
      description: 'Shows data trends over time with connected points'
    }
  ]
}; 