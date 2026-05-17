import { LayoutDashboard, Calendar, BookOpen, Inbox, Settings, Users, Activity, MessageCircle, BarChart3, Star, User } from 'lucide-react';

export const STUDENT_NAV = [
  { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Sessions', path: '/dashboard/sessions', icon: Calendar },
  { label: 'Vault', path: '/dashboard/vault', icon: BookOpen },
  { label: 'Guidance', path: '/dashboard/guidance', icon: Inbox },
  { label: 'Account', path: '/dashboard/account', icon: Settings },
];

export const MENTOR_NAV = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Audits', path: '/dashboard/audits', icon: Activity },
  { label: 'Events', path: '/dashboard/events', icon: Calendar },
  { label: 'Mentees', path: '/dashboard/mentees', icon: Users },
  { label: 'Reviews', path: '/dashboard/reviews', icon: MessageCircle },
  { label: 'Accounts', path: '/dashboard/accounts', icon: User },
];
