import { Booking } from '../types';

const mockBookings: Booking[] = [
  {
    id: '1',
    user_id: 'user1',
    date: '2026-06-15',
    time: '10:00',
    status: 'confirmed',
    notes: 'Career advice session',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    user_id: 'user2',
    date: '2026-06-20',
    time: '14:00',
    status: 'pending',
    notes: 'Resume review',
    created_at: new Date().toISOString()
  }
];

export const bookingService = {
  async fetchAll(): Promise<{ data: Booking[]; error: string | null }> {
    return { data: mockBookings, error: null };
  },

  async insert(booking: Omit<Booking, 'id' | 'created_at'>): Promise<{ data: Booking; error: string | null }> {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    mockBookings.push(newBooking);
    return { data: newBooking, error: null };
  }
};