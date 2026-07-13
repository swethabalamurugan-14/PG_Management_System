import { useState } from 'react';
import {
    MdWifi, MdRestaurant, MdLocalLaundryService, MdCleaningServices,
    MdDirectionsCar, MdVideocam, MdSecurity, MdFlashOn,
    MdWaterDrop, MdAcUnit, MdFitnessCenter, MdMenuBook,
    MdExpandMore, MdExpandLess,
} from 'react-icons/md';

const facilities = [
    {
        icon: MdWifi,
        label: 'Wi-Fi',
        description: 'High-speed broadband internet available 24/7 in all rooms and common areas, ensuring seamless connectivity for work and entertainment.',
    },
    {
        icon: MdRestaurant,
        label: 'Food',
        description: 'Breakfast, Lunch, and Dinner are provided three times a day with hygienic and nutritious meals prepared by experienced cooks.',
    },
    {
        icon: MdLocalLaundryService,
        label: 'Laundry',
        description: 'Fully equipped washing machines and dryers available daily for tenant use, keeping your clothes fresh and clean with ease.',
    },
    {
        icon: MdCleaningServices,
        label: 'Housekeeping',
        description: 'Professional daily cleaning service covers all rooms and common areas, maintaining a tidy and hygienic environment at all times.',
    },
    {
        icon: MdDirectionsCar,
        label: 'Parking',
        description: 'Secure, covered parking space available for two-wheelers and four-wheelers within the premises, monitored by CCTV.',
    },
    {
        icon: MdVideocam,
        label: 'CCTV',
        description: 'Round-the-clock HD video surveillance covering all entry points, corridors, and common areas to ensure maximum security.',
    },
    {
        icon: MdSecurity,
        label: 'Security',
        description: 'Trained security personnel on duty 24/7 at the entrance and premises to ensure the safety of all residents.',
    },
    {
        icon: MdFlashOn,
        label: 'Power Backup',
        description: 'Uninterrupted power supply via generator ensures all rooms and common areas remain fully powered even during outages.',
    },
    {
        icon: MdWaterDrop,
        label: 'RO Water',
        description: 'Purified and filtered RO drinking water available at multiple stations across the PG, ensuring access to safe and clean water.',
    },
    {
        icon: MdAcUnit,
        label: 'AC Rooms',
        description: 'Premium air-conditioned rooms with modern climate control to keep you comfortable in all seasons throughout the year.',
    },
    {
        icon: MdFitnessCenter,
        label: 'Gym',
        description: 'Fully equipped fitness centre with modern exercise equipment — free access for all residents to keep you healthy and active.',
    },
    {
        icon: MdMenuBook,
        label: 'Study Area',
        description: 'Quiet, well-lit dedicated study room designed for focused work, reading, and learning — perfect for students and professionals alike.',
    },
];

export default function FacilitiesSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (idx) => {
        setOpenIndex(prev => (prev === idx ? null : idx));
    };

    return (
        <section className="section" id="facilities">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="section-tag">Facilities</div>
                    <h2 className="section-heading">Everything You Need to Thrive</h2>
                    <p className="section-subheading" style={{ margin: '0 auto' }}>
                        We provide all the modern amenities to make your living experience comfortable, productive, and enjoyable.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 820, margin: '0 auto' }}>
                    {facilities.map((facility, idx) => {
                        const Icon = facility.icon;
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={facility.label}
                                className="card"
                                style={{
                                    overflow: 'hidden',
                                    border: isOpen ? '1.5px solid var(--primary-400)' : '1.5px solid var(--border)',
                                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                                    boxShadow: isOpen ? '0 4px 20px rgba(99,102,241,0.12)' : undefined,
                                }}
                            >
                                {/* Header */}
                                <button
                                    onClick={() => handleToggle(idx)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '1.1rem 1.5rem',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--text-primary)',
                                        gap: '1rem',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                        <div style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 10,
                                            background: isOpen ? 'var(--gradient-primary)' : 'var(--bg-secondary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            transition: 'background 0.25s ease',
                                        }}>
                                            <Icon size={20} color={isOpen ? '#fff' : 'var(--primary-400)'} />
                                        </div>
                                        <span style={{ fontWeight: 600, fontSize: '1rem' }}>{facility.label}</span>
                                    </div>
                                    <div style={{ color: 'var(--text-muted)', flexShrink: 0, transition: 'transform 0.25s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                        <MdExpandMore size={22} />
                                    </div>
                                </button>

                                {/* Body */}
                                <div style={{
                                    maxHeight: isOpen ? 120 : 0,
                                    overflow: 'hidden',
                                    transition: 'max-height 0.35s ease',
                                }}>
                                    <p style={{
                                        margin: 0,
                                        padding: '0 1.5rem 1.25rem 4.4rem',
                                        fontSize: '0.9rem',
                                        color: 'var(--text-secondary)',
                                        lineHeight: 1.7,
                                    }}>
                                        {facility.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
