import { TaskActivity } from '../types';

const mockTasks: TaskActivity[] = [
  {
    id: '1',
    user_id: 'user1',
    category: 'personal_branding',
    title: 'Update LinkedIn Profile',
    description: 'Complete your LinkedIn profile with new headline and banner',
    status: 'completed',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    user_id: 'user1',
    category: 'networking',
    title: 'Attend 2 Networking Events',
    description: 'Join at least 2 networking events this month',
    status: 'in_progress',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    user_id: 'user1',
    category: 'certifications',
    title: 'Complete AWS Certification',
    description: 'Study and pass the AWS Solutions Architect exam',
    status: 'pending',
    created_at: new Date().toISOString()
  }
];

export const taskService = {
  async fetchAll(): Promise<{ data: TaskActivity[]; error: string | null }> {
    return { data: mockTasks, error: null };
  },

  async insert(activity: Omit<TaskActivity, 'id' | 'created_at'>): Promise<{ data: TaskActivity; error: string | null }> {
    const newTask: TaskActivity = {
      ...activity,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    mockTasks.push(newTask);
    return { data: newTask, error: null };
  },

  async updateStatus(id: string, status: string, response?: string): Promise<{ error: string | null }> {
    const task = mockTasks.find(t => t.id === id);
    if (task) {
      task.status = status;
      if (response) task.admin_response = response;
    }
    return { error: null };
  }
};