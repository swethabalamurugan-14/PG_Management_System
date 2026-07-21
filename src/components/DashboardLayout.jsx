import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BottomNav from './BottomNav';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout({ children, title }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user } = useAuth();

    // Only show BottomNav for admin role on mobile
    const isAdmin = user?.role === 'admin';

    return (
        <div className="dashboard-layout">
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />
            <div className={`dashboard-main${collapsed ? ' collapsed' : ''}`}>
                <Topbar
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    setMobileOpen={setMobileOpen}
                    title={title}
                />
                <div className="dashboard-content">
                    {children}
                </div>
            </div>
            {/* Bottom nav renders only on mobile via CSS (display:none on desktop) */}
            {isAdmin && <BottomNav />}
        </div>
    );
}
