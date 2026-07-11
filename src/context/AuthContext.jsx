import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const USERS = [
    { id: 'admin', username: 'admin', password: 'admin123', role: 'admin', name: 'Super Admin', email: 'admin@pgmanager.com', avatar: 'A' },
    { id: 'staff', username: 'staff', password: 'staff123', role: 'staff', name: 'Rajan Kumar', email: 'staff@pgmanager.com', avatar: 'R' },
    { id: 'tenant', username: 'tenant', password: 'tenant123', role: 'tenant', name: 'Arjun Sharma', email: 'arjun@email.com', avatar: 'A', tenantId: 'T001' },
];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try { return JSON.parse(localStorage.getItem('pg-user')); } catch { return null; }
    });
    const [loading, setLoading] = useState(false);

    const login = async (username, password) => {
        setLoading(true);
        await new Promise(r => setTimeout(r, 800)); // simulate API
        const found = USERS.find(u => u.username === username && u.password === password);
        setLoading(false);
        if (found) {
            const { password: _, ...safeUser } = found;
            setUser(safeUser);
            localStorage.setItem('pg-user', JSON.stringify(safeUser));
            return { success: true, role: found.role };
        }
        return { success: false, message: 'Invalid username or password' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('pg-user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
