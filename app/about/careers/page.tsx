import { Metadata } from 'next';
import CareersClient from '@/components/careers/CareersClient';

export const metadata: Metadata = {
  title: 'Careers | StaffSchedule.io',
  description: 'Join StaffSchedule.io and help us build the future of workforce AI. Explore open roles, our culture, and premium benefits.',
  openGraph: {
    title: 'Careers at StaffSchedule.io',
    description: 'Help us empower the next 100 million desks. Discover open roles and our mission-driven culture.',
    type: 'website',
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
