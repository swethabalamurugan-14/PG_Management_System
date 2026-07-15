import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { MdVisibility, MdVisibilityOff, MdDarkMode, MdSunny, MdArrowBack } from 'react-icons/md';
import { FaBuilding } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const { login, loading } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [showPw, setShowPw] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.username || !form.password) {
            toast.error('Please fill all fields');
            return;
        }
        const res = await login(form.username, form.password);
        if (res.success) {
            toast.success('Welcome back!');
            const routes = { admin: '/admin/dashboard', staff: '/staff/dashboard', tenant: '/tenant/dashboard' };
            navigate(routes[res.role]);
        } else {
            toast.error(res.message || 'Login failed');
        }
    };

    const demoCredentials = [
        { role: 'Admin', username: 'admin', pw: 'admin123', color: '#6366f1' },
        { role: 'Staff', username: 'staff', pw: 'staff123', color: '#10b981' },
        { role: 'Tenant', username: 'tenant', pw: 'tenant123', color: '#f59e0b' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
            {/* Top bar */}
            <div style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <div style={{ width: 36, height: 36, background: 'var(--gradient-primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FaBuilding size={16} color="#fff" />
                        </div>
                        PG<span style={{ color: 'var(--primary-500)' }}>Manager</span>
                    </a>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.35rem 0.75rem', cursor: 'pointer', transition: 'color 0.2s, border-color 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary-500)'; e.currentTarget.style.borderColor = 'var(--primary-500)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                    >
                        <MdArrowBack size={15} />
                        Back to Home
                    </button>
                </div>
                <button className="btn btn-icon btn-ghost" onClick={toggleTheme}>
                    {theme === 'light' ? <MdDarkMode size={20} /> : <MdSunny size={20} />}
                </button>
            </div>

            {/* Main */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
                <div style={{ width: '100%', maxWidth: 460 }}>
                    {/* Card */}
                    <div className="card" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-xl)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{ width: 64, height: 64, background: 'var(--gradient-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 8px 24px rgba(99,102,241,0.4)' }}>
                                <FaBuilding size={26} color="#fff" />
                            </div>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.4rem' }}>Welcome Back</h2>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Sign in to your PG Manager account</p>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                            <div className="form-group">
                                <label className="form-label">Username</label>
                                <input
                                    className="form-control"
                                    placeholder="Enter your username"
                                    value={form.username}
                                    onChange={e => setForm({ ...form, username: e.target.value })}
                                    autoComplete="username"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPw ? 'text' : 'password'}
                                        className="form-control"
                                        placeholder="Enter your password"
                                        value={form.password}
                                        onChange={e => setForm({ ...form, password: e.target.value })}
                                        autoComplete="current-password"
                                        style={{ paddingRight: '3rem' }}
                                    />
                                    <button type="button" onClick={() => setShowPw(p => !p)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        {showPw ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                                    <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                                    Remember me
                                </label>
                                <button type="button" className="btn btn-sm" style={{ color: 'var(--primary-500)', background: 'none', padding: 0, fontWeight: 600, fontSize: '0.85rem' }}>
                                    Forgot Password?
                                </button>
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={loading} style={{ justifyContent: 'center', marginTop: '0.5rem', height: 46 }}>
                                {loading ? <div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : 'Sign In'}
                            </button>
                        </form>

                        {/* Demo credentials */}
                        <div style={{ marginTop: '1.75rem', padding: '1.25rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>Demo Credentials</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {demoCredentials.map(d => (
                                    <button
                                        key={d.role}
                                        type="button"
                                        onClick={() => setForm({ username: d.username, password: d.pw })}
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius)', border: `1.5px solid ${d.color}20`, background: `${d.color}08`, cursor: 'pointer', textAlign: 'left' }}
                                    >
                                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: d.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>{d.role[0]}</div>
                                        <div>
                                            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: d.color }}>{d.role}</div>
                                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.username} / {d.pw}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
