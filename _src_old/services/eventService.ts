import { NetworkEvent } from '../types';

const mockEvents: NetworkEvent[] = [
  {
    id: '1',
    title: 'Tech Meetup',
    description: 'Networking event for tech professionals',
    date: '2026-07-01',
    time: '18:00',
    location: 'Downtown Conference Center',
    attendees: ['user1', 'user2'],
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Career Workshop',
    description: 'Learn how to land your dream job',
    date: '2026-07-15',
    time: '10:00',
    location: 'Online',
    attendees: ['user1'],
    created_at: new Date().toISOString()
  }
];

export const eventService = {
  async fetchAll(): Promise<{ data: NetworkEvent[]; error: string | null }> {
    return { data: mockEvents, error: null };
  },

  async createEvent(event: Omit<NetworkEvent, 'id' | 'created_at'>): Promise<{ data: NetworkEvent; error: string | null }> {
    const newEvent: NetworkEvent = {
      ...event,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    mockEvents.push(newEvent);
    return { data: newEvent, error: null };
  },

  async delete(id: string): Promise<{ error: string | null }> {
    const index = mockEvents.findIndex(e => e.id === id);
    if (index > -1) {
      mockEvents.splice(index, 1);
    }
    return { error: null };
  },

  async updateAttendees(id: string, attendees: string[]): Promise<{ error: string | null }> {
    const event = mockEvents.find(e => e.id === id);
    if (event) {
      event.attendees = attendees;
    }
    return { error: null };
  },

  async getById(id: string): Promise<{ data: NetworkEvent | null; error: string | null }> {
    const event = mockEvents.find(e => e.id === id);
    return { data: event || null, error: null };
  }
};