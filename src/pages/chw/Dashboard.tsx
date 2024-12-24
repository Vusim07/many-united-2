import { Routes, Route } from 'react-router-dom';
import CHWLayout from '@/components/layouts/CHWLayout';
import Home from './Home';
import Schedule from '@/components/chw/Schedule';
import VisitDetails from './VisitDetails';
import { SettingsPage } from '@/pages/settings/SettingsPage';

export default function CHWDashboard() {
  return (
    <CHWLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/visits/:id" element={<VisitDetails />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </CHWLayout>
  );
}