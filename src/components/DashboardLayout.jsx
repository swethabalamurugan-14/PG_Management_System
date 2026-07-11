import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout({ children, title }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

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
        </div>
    );
}
