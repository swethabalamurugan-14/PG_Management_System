export default function StatCard({ icon, label, value, color = '#6366f1', trend }) {
    return (
        <div className="stat-card">
            <div className="stat-icon" style={{ background: `${color}18`, color }}>
                {icon}
            </div>
            <div>
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
                {trend && (
                    <div style={{ fontSize: '0.72rem', marginTop: '0.25rem', color: trend > 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
                        {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}% from last month
                    </div>
                )}
            </div>
        </div>
    );
}
