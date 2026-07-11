// src/data/mockData.js

export const mockRooms = [
  { id: 'R101', number: '101', floor: '1st', type: 'Single', capacity: 1, rent: 8000, status: 'Available', beds: [{ id: 'B101-1', status: 'Available', tenant: null }], images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500'], facilities: ['Wi-Fi', 'AC', 'Attached Bath'] },
  { id: 'R102', number: '102', floor: '1st', type: 'Double', capacity: 2, rent: 5500, status: 'Occupied', beds: [{ id: 'B102-1', status: 'Occupied', tenant: 'T001' }, { id: 'B102-2', status: 'Occupied', tenant: 'T002' }], images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500'], facilities: ['Wi-Fi', 'Fan', 'Common Bath'] },
  { id: 'R103', number: '103', floor: '1st', type: 'Triple', capacity: 3, rent: 4000, status: 'Partial', beds: [{ id: 'B103-1', status: 'Occupied', tenant: 'T003' }, { id: 'B103-2', status: 'Available', tenant: null }, { id: 'B103-3', status: 'Available', tenant: null }], images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500'], facilities: ['Wi-Fi', 'Fan', 'Common Bath'] },
  { id: 'R201', number: '201', floor: '2nd', type: 'Single', capacity: 1, rent: 9500, status: 'Available', beds: [{ id: 'B201-1', status: 'Available', tenant: null }], images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500'], facilities: ['Wi-Fi', 'AC', 'Attached Bath', 'Balcony'] },
  { id: 'R202', number: '202', floor: '2nd', type: 'Double', capacity: 2, rent: 6000, status: 'Partial', beds: [{ id: 'B202-1', status: 'Occupied', tenant: 'T004' }, { id: 'B202-2', status: 'Available', tenant: null }], images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500'], facilities: ['Wi-Fi', 'AC', 'Common Bath'] },
  { id: 'R203', number: '203', floor: '2nd', type: 'Triple', capacity: 3, rent: 4500, status: 'Available', beds: [{ id: 'B203-1', status: 'Available', tenant: null }, { id: 'B203-2', status: 'Available', tenant: null }, { id: 'B203-3', status: 'Available', tenant: null }], images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500'], facilities: ['Wi-Fi', 'Fan', 'Common Bath'] },
];

export const mockTenants = [
  { id: 'T001', name: 'Arjun Sharma', gender: 'Male', age: 24, phone: '9876543210', email: 'arjun@email.com', address: '12 MG Road, Bengaluru', emergency: '9876543999', aadhaar: '1234-5678-9012', occupation: 'IT Engineer', checkin: '2024-01-15', checkout: null, room: 'R102', bed: 'B102-1', rent: 5500, advance: 11000, photo: null, documents: [], status: 'Active' },
  { id: 'T002', name: 'Priya Patel', gender: 'Female', age: 22, phone: '9865432100', email: 'priya@email.com', address: '45 JP Nagar, Bengaluru', emergency: '9865432109', aadhaar: '2345-6789-0123', occupation: 'Student', checkin: '2024-02-01', checkout: null, room: 'R102', bed: 'B102-2', rent: 5500, advance: 11000, photo: null, documents: [], status: 'Active' },
  { id: 'T003', name: 'Rahul Verma', gender: 'Male', age: 27, phone: '9754321000', email: 'rahul@email.com', address: '78 HSR Layout, Bengaluru', emergency: '9754321099', aadhaar: '3456-7890-1234', occupation: 'Software Developer', checkin: '2024-01-20', checkout: null, room: 'R103', bed: 'B103-1', rent: 4000, advance: 8000, photo: null, documents: [], status: 'Active' },
  { id: 'T004', name: 'Sneha Reddy', gender: 'Female', age: 23, phone: '9643210009', email: 'sneha@email.com', address: '23 Koramangala, Bengaluru', emergency: '9643210099', aadhaar: '4567-8901-2345', occupation: 'Student', checkin: '2024-03-05', checkout: null, room: 'R202', bed: 'B202-1', rent: 6000, advance: 12000, photo: null, documents: [], status: 'Active' },
];

export const mockStaff = [
  { id: 'S001', name: 'Rajan Kumar', role: 'Security', phone: '9988776655', salary: 15000, shift: 'Night', attendance: 26, photo: null, email: 'rajan@pg.com', username: 'staff', password: 'staff123' },
  { id: 'S002', name: 'Meena Devi', role: 'Cleaner', phone: '9977665544', salary: 12000, shift: 'Morning', attendance: 28, photo: null, email: 'meena@pg.com', username: 'meena', password: 'meena123' },
  { id: 'S003', name: 'Suresh Cook', role: 'Cook', phone: '9966554433', salary: 18000, shift: 'Morning', attendance: 25, photo: null, email: 'suresh@pg.com', username: 'suresh', password: 'suresh123' },
  { id: 'S004', name: 'Ashok Manager', role: 'Manager', phone: '9955443322', salary: 25000, shift: 'Day', attendance: 30, photo: null, email: 'ashok@pg.com', username: 'ashok', password: 'ashok123' },
];

export const mockBookings = [
  { id: 'BK001', tenantId: 'T001', tenantName: 'Arjun Sharma', room: 'R102', bookingDate: '2024-01-10', advance: 11000, status: 'Confirmed', payment: 'Paid' },
  { id: 'BK002', tenantId: 'T002', tenantName: 'Priya Patel', room: 'R102', bookingDate: '2024-01-28', advance: 11000, status: 'Confirmed', payment: 'Paid' },
  { id: 'BK003', tenantId: 'T003', tenantName: 'Rahul Verma', room: 'R103', bookingDate: '2024-01-15', advance: 8000, status: 'Confirmed', payment: 'Paid' },
  { id: 'BK004', tenantId: 'T004', tenantName: 'Sneha Reddy', room: 'R202', bookingDate: '2024-03-01', advance: 12000, status: 'Confirmed', payment: 'Paid' },
];

export const mockPayments = [
  { id: 'P001', tenantId: 'T001', tenantName: 'Arjun Sharma', room: 'R102', month: 'June 2025', rent: 5500, electricity: 350, water: 100, food: 0, fine: 0, total: 5950, paid: 5950, pending: 0, status: 'Paid', date: '2025-06-05' },
  { id: 'P002', tenantId: 'T002', tenantName: 'Priya Patel', room: 'R102', month: 'June 2025', rent: 5500, electricity: 300, water: 100, food: 0, fine: 0, total: 5900, paid: 0, pending: 5900, status: 'Pending', date: null },
  { id: 'P003', tenantId: 'T003', tenantName: 'Rahul Verma', room: 'R103', month: 'June 2025', rent: 4000, electricity: 280, water: 100, food: 1500, fine: 0, total: 5880, paid: 5880, pending: 0, status: 'Paid', date: '2025-06-03' },
  { id: 'P004', tenantId: 'T004', tenantName: 'Sneha Reddy', room: 'R202', month: 'June 2025', rent: 6000, electricity: 400, water: 100, food: 0, fine: 200, total: 6700, paid: 6700, pending: 0, status: 'Paid', date: '2025-06-07' },
];

export const mockComplaints = [
  { id: 'C001', tenantId: 'T001', tenantName: 'Arjun Sharma', type: 'Electrical', description: 'Fan not working in room 102', image: null, status: 'In Progress', assignedTo: 'S004', date: '2025-06-10', resolvedDate: null },
  { id: 'C002', tenantId: 'T002', tenantName: 'Priya Patel', type: 'Plumbing', description: 'Water tap leaking in bathroom', image: null, status: 'Open', assignedTo: null, date: '2025-06-12', resolvedDate: null },
  { id: 'C003', tenantId: 'T003', tenantName: 'Rahul Verma', type: 'Cleanliness', description: 'Common area not cleaned', image: null, status: 'Resolved', assignedTo: 'S002', date: '2025-06-08', resolvedDate: '2025-06-09' },
];

export const mockVisitors = [
  { id: 'V001', name: 'Ramesh Sharma', phone: '9876540001', tenantId: 'T001', tenantName: 'Arjun Sharma', relation: 'Brother', purpose: 'Personal Visit', checkin: '2025-06-15 10:00', checkout: '2025-06-15 13:00', status: 'Approved' },
  { id: 'V002', name: 'Lakshmi Patel', phone: '9876540002', tenantId: 'T002', tenantName: 'Priya Patel', relation: 'Mother', purpose: 'Dropping Food', checkin: '2025-06-16 14:00', checkout: '2025-06-16 15:30', status: 'Pending' },
];

export const mockMaintenance = [
  { id: 'M001', type: 'Electrical', description: 'Replace ceiling fan in Room 101', status: 'Pending', assignedTo: null, date: '2025-06-10', completedDate: null, priority: 'High' },
  { id: 'M002', type: 'Plumbing', description: 'Fix leaking pipe in 2nd floor bathroom', status: 'Assigned', assignedTo: 'S004', date: '2025-06-11', completedDate: null, priority: 'Medium' },
  { id: 'M003', type: 'Furniture', description: 'Repair broken chair in Room 103', status: 'Completed', assignedTo: 'S002', date: '2025-06-05', completedDate: '2025-06-06', priority: 'Low' },
];

export const mockNotices = [
  { id: 'N001', title: 'Monthly Rent Reminder', category: 'Rent', content: 'All tenants must pay rent by 5th of every month. Late payment fine of ₹200 will be applicable.', date: '2025-06-01', author: 'Admin', priority: 'High' },
  { id: 'N002', title: 'Water Supply Shutdown', category: 'Maintenance', content: 'Water supply will be shut down on 20th June from 10 AM to 2 PM for maintenance work.', date: '2025-06-18', author: 'Admin', priority: 'Medium' },
  { id: 'N003', title: 'Independence Day Celebration', category: 'Event', content: 'All tenants are invited to celebrate Independence Day on 15th August at the common area.', date: '2025-08-10', author: 'Admin', priority: 'Low' },
];

export const mockNotifications = [
  { id: 'NF001', type: 'payment', title: 'Rent Due Reminder', message: 'Your rent of ₹5,500 is due for July 2025.', date: '2025-07-01', read: false, userId: 'T002' },
  { id: 'NF002', type: 'complaint', title: 'Complaint Update', message: 'Your complaint #C001 is now In Progress.', date: '2025-06-11', read: true, userId: 'T001' },
  { id: 'NF003', type: 'visitor', title: 'Visitor Request Approved', message: 'Visit request for Ramesh Sharma has been approved.', date: '2025-06-15', read: false, userId: 'T001' },
  { id: 'NF004', type: 'notice', title: 'New Notice Posted', message: 'Water supply shutdown notice has been posted.', date: '2025-06-18', read: false, userId: 'T001' },
];

export const mockAuditLogs = [
  { id: 'AL001', action: 'Login', user: 'admin', details: 'Admin logged in', timestamp: '2025-07-11 09:15:00', type: 'Auth' },
  { id: 'AL002', action: 'Room Allocation', user: 'admin', details: 'Bed B202-1 allocated to Sneha Reddy', timestamp: '2025-07-10 14:30:00', type: 'Room' },
  { id: 'AL003', action: 'Payment Update', user: 'admin', details: 'Payment P001 marked as Paid', timestamp: '2025-07-09 11:00:00', type: 'Payment' },
  { id: 'AL004', action: 'Complaint Update', user: 'staff', details: 'Complaint C001 marked In Progress', timestamp: '2025-07-11 10:45:00', type: 'Complaint' },
];

export const revenueData = [
  { month: 'Jan', revenue: 68000, expenses: 22000 },
  { month: 'Feb', revenue: 72000, expenses: 24000 },
  { month: 'Mar', revenue: 75000, expenses: 21000 },
  { month: 'Apr', revenue: 80000, expenses: 25000 },
  { month: 'May', revenue: 78000, expenses: 23000 },
  { month: 'Jun', revenue: 85000, expenses: 26000 },
];

export const occupancyData = [
  { name: 'Occupied', value: 7, color: '#6366f1' },
  { name: 'Available', value: 5, color: '#10b981' },
  { name: 'Reserved', value: 2, color: '#f59e0b' },
];

export const complaintData = [
  { month: 'Mar', open: 4, resolved: 8 },
  { month: 'Apr', open: 3, resolved: 10 },
  { month: 'May', open: 5, resolved: 7 },
  { month: 'Jun', open: 2, resolved: 9 },
];
