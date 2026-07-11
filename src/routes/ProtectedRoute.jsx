import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Accepts `role` (single string) or `allowedRoles` (array)
export default function ProtectedRoute({ children, role, allowedRoles }) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

    const allowed = allowedRoles ?? (role ? [role] : null);
    if (allowed && !allowed.includes(user.role)) {
        // Redirect to role's own dashboard instead of /
        const home = { admin: '/admin/dashboard', staff: '/staff/dashboard', tenant: '/tenant/dashboard' };
        return <Navigate to={home[user.role] || '/'} replace />;
    }
    return children;
}
