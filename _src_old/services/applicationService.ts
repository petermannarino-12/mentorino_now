import { Application } from '../types';

const mockApplications: Application[] = [
  {
    id: '1',
    user_email: 'john@example.com',
    mentor_type: 'career',
    status: 'approved',
    name: 'John Doe',
    goal: 'Career transition to tech',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    user_email: 'jane@example.com',
    mentor_type: 'education',
    status: 'pending',
    name: 'Jane Smith',
    goal: 'Get into grad school',
    created_at: new Date().toISOString()
  }
];

export const applicationService = {
  async fetchAll(): Promise<{ data: Application[]; error: string | null }> {
    return { data: mockApplications, error: null };
  },

  async fetchByEmail(email: string): Promise<{ data: Application | null; error: string | null }> {
    const app = mockApplications.find(a => a.user_email === email);
    return { data: app || null, error: null };
  },

  async insert(app: Omit<Application, 'id' | 'created_at'>): Promise<{ data: Application; error: string | null }> {
    const newApp: Application = {
      ...app,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    mockApplications.push(newApp);
    return { data: newApp, error: null };
  },

  async updateStatus(id: string, status: string): Promise<{ data: Application | null; error: string | null }> {
    const app = mockApplications.find(a => a.id === id);
    if (app) {
      app.status = status;
      return { data: app, error: null };
    }
    return { data: null, error: 'Application not found' };
  },

  async delete(id: string): Promise<{ error: string | null }> {
    const index = mockApplications.findIndex(a => a.id === id);
    if (index > -1) {
      mockApplications.splice(index, 1);
    }
    return { error: null };
  }
};