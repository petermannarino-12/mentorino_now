import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { applicationService } from '../services/applicationService';
import { bookingService } from '../services/bookingService';
import { eventService } from '../services/eventService';
import { taskService } from '../services/taskService';
import { Application, Booking, NetworkEvent, TaskActivity } from '../types';

export const useUserDashboardData = () => {
  const { user } = useAuth();
  const [application, setApplication] = useState<Application | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [taskActivities, setTaskActivities] = useState<TaskActivity[]>([]);
  const [events, setEvents] = useState<NetworkEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [appsRes, bookingsRes, tasksRes, eventsRes] = await Promise.all([
        applicationService.fetchAll(),
        bookingService.fetchAll(),
        taskService.fetchAll(),
        eventService.fetchAll()
      ]);
      
      if (user) {
        const userApp = appsRes.data.find(a => a.user_email === user.email);
        setApplication(userApp || null);
      }
      
      setBookings(bookingsRes.data);
      setTaskActivities(tasksRes.data);
      setEvents(eventsRes.data);
      setIsLoading(false);
    };
    
    loadData();
  }, [user]);

  return { currentUser: user, application, bookings, taskActivities, events, isLoading };
};

export const useAddApplicationMutation = () => {
  const { user } = useAuth();
  const [isPending, setIsPending] = useState(false);
  
  const mutateAsync = async (app: Application) => {
    setIsPending(true);
    const result = await applicationService.insert({
      ...app,
      user_email: user?.email || app.user_email || '',
    });
    setIsPending(false);
    return result;
  };

  return { mutateAsync, isPending };
};

export const useAddBookingMutation = () => {
  const [isPending, setIsPending] = useState(false);
  
  const mutateAsync = async (booking: Booking) => {
    setIsPending(true);
    const result = await bookingService.insert(booking);
    setIsPending(false);
    return result;
  };

  return { mutateAsync, isPending };
};

export const useAddTaskMutation = () => {
  const [isPending, setIsPending] = useState(false);
  
  const mutateAsync = async (data: { activity: Omit<TaskActivity, 'id' | 'user_id' | 'user_name' | 'status' | 'created_at'>; userId: string; userName: string }) => {
    setIsPending(true);
    const result = await taskService.insert({
      ...data.activity,
      user_id: data.userId,
      user_name: data.userName,
      status: 'pending',
    });
    setIsPending(false);
    return result;
  };

  return { mutateAsync, isPending };
};

export const useUpdateTaskStatusMutation = () => {
  const [isPending, setIsPending] = useState(false);
  
  const mutateAsync = async (data: { id: string; status: string }) => {
    setIsPending(true);
    const result = await taskService.updateStatus(data.id, data.status);
    setIsPending(false);
    return result;
  };

  return { mutateAsync, isPending };
};

export const useAttendEventMutation = () => {
  const [isPending, setIsPending] = useState(false);
  
  const mutateAsync = async (data: { eventId: string; userId: string }) => {
    setIsPending(true);
    const eventsRes = await eventService.getById(data.eventId);
    if (eventsRes.data) {
      const attendees = [...eventsRes.data.attendees, data.userId];
      await eventService.updateAttendees(data.eventId, attendees);
    }
    setIsPending(false);
    return { error: null };
  };

  return { mutateAsync, isPending };
};

export const useMentorDashboardData = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [events, setEvents] = useState<NetworkEvent[]>([]);
  const [taskActivities, setTaskActivities] = useState<TaskActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [appsRes, bookingsRes, tasksRes, eventsRes] = await Promise.all([
        applicationService.fetchAll(),
        bookingService.fetchAll(),
        taskService.fetchAll(),
        eventService.fetchAll()
      ]);
      
      setApplications(appsRes.data);
      setBookings(bookingsRes.data);
      setTaskActivities(tasksRes.data);
      setEvents(eventsRes.data);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  return { applications, bookings, events, taskActivities, isLoading };
};

export const useMentorDashboardActions = () => {
  const updateApplicationStatus = async (id: string, status: string) => {
    await applicationService.updateStatus(id, status);
  };
  
  const updateTaskStatus = async (id: string, status: string, response?: string) => {
    await taskService.updateStatus(id, status, response);
  };

  return { updateApplicationStatus, updateTaskStatus };
};

export const useMentorDashboard = () => {
  return useMentorDashboardData();
};