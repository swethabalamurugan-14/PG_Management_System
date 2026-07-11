import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './routes/ProtectedRoute';

// Auth
import LoginPage from './pages/Auth/LoginPage';

// Landing
import LandingPage from './pages/Landing/LandingPage';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import RoomManagement from './pages/Admin/RoomManagement';
import BedManagement from './pages/Admin/BedManagement';
import TenantManagement from './pages/Admin/TenantManagement';
import StaffManagement from './pages/Admin/StaffManagement';
import BookingManagement from './pages/Admin/BookingManagement';
import PaymentManagement from './pages/Admin/PaymentManagement';
import ComplaintManagement from './pages/Admin/ComplaintManagement';
import VisitorManagement from './pages/Admin/VisitorManagement';
import Maintenance from './pages/Admin/Maintenance';
import NoticeBoard from './pages/Admin/NoticeBoard';
import Notifications from './pages/Admin/Notifications';
import Reports from './pages/Admin/Reports';
import AuditLogs from './pages/Admin/AuditLogs';
import Profile from './pages/Admin/Profile';
import Settings from './pages/Admin/Settings';

// Staff Pages
import StaffDashboard from './pages/Staff/StaffDashboard';

// Tenant Pages
import TenantDashboard from './pages/Tenant/TenantDashboard';

export default function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { background: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' } }} />
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin */}
        <Route path="/admin" element={<ProtectedRoute role="admin"><Navigate to="/admin/dashboard" replace /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/rooms" element={<ProtectedRoute role="admin"><RoomManagement /></ProtectedRoute>} />
        <Route path="/admin/beds" element={<ProtectedRoute role="admin"><BedManagement /></ProtectedRoute>} />
        <Route path="/admin/tenants" element={<ProtectedRoute role="admin"><TenantManagement /></ProtectedRoute>} />
        <Route path="/admin/staff" element={<ProtectedRoute role="admin"><StaffManagement /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute role="admin"><BookingManagement /></ProtectedRoute>} />
        <Route path="/admin/payments" element={<ProtectedRoute role="admin"><PaymentManagement /></ProtectedRoute>} />
        <Route path="/admin/complaints" element={<ProtectedRoute role="admin"><ComplaintManagement /></ProtectedRoute>} />
        <Route path="/admin/visitors" element={<ProtectedRoute role="admin"><VisitorManagement /></ProtectedRoute>} />
        <Route path="/admin/maintenance" element={<ProtectedRoute role="admin"><Maintenance /></ProtectedRoute>} />
        <Route path="/admin/notices" element={<ProtectedRoute role="admin"><NoticeBoard /></ProtectedRoute>} />
        <Route path="/admin/notifications" element={<ProtectedRoute role="admin"><Notifications /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute role="admin"><Reports /></ProtectedRoute>} />
        <Route path="/admin/audit" element={<ProtectedRoute role="admin"><AuditLogs /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute role="admin"><Profile /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute role="admin"><Settings /></ProtectedRoute>} />

        {/* Staff */}
        <Route path="/staff" element={<ProtectedRoute role="staff"><Navigate to="/staff/dashboard" replace /></ProtectedRoute>} />
        <Route path="/staff/dashboard" element={<ProtectedRoute role="staff"><StaffDashboard /></ProtectedRoute>} />
        <Route path="/staff/complaints" element={<ProtectedRoute role="staff"><ComplaintManagement /></ProtectedRoute>} />
        <Route path="/staff/maintenance" element={<ProtectedRoute role="staff"><Maintenance /></ProtectedRoute>} />
        <Route path="/staff/visitors" element={<ProtectedRoute role="staff"><VisitorManagement /></ProtectedRoute>} />
        <Route path="/staff/notifications" element={<ProtectedRoute role="staff"><Notifications /></ProtectedRoute>} />
        <Route path="/staff/profile" element={<ProtectedRoute role="staff"><Profile /></ProtectedRoute>} />

        {/* Tenant */}
        <Route path="/tenant" element={<ProtectedRoute role="tenant"><Navigate to="/tenant/dashboard" replace /></ProtectedRoute>} />
        <Route path="/tenant/dashboard" element={<ProtectedRoute role="tenant"><TenantDashboard /></ProtectedRoute>} />
        <Route path="/tenant/notices" element={<ProtectedRoute role="tenant"><NoticeBoard /></ProtectedRoute>} />
        <Route path="/tenant/notifications" element={<ProtectedRoute role="tenant"><Notifications /></ProtectedRoute>} />
        <Route path="/tenant/profile" element={<ProtectedRoute role="tenant"><Profile /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
