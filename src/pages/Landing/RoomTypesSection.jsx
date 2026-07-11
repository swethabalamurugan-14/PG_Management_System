import { useState } from 'react';
import Modal, { ModalBody } from '../../components/Modal';
import { MdBed, MdPeople, MdCheckCircle } from 'react-icons/md';

const rooms = [
    {
        id: 1, name: 'Single Sharing', rent: 8000, availableBeds: 3, capacity: 1,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
        facilities: ['Wi-Fi', 'AC', 'Attached Bath', 'Study Table', 'Wardrobe'],
        desc: 'A private room with all essential amenities tailored for solo professionals or students who value personal space.',
    },
    {
        id: 2, name: 'Double Sharing', rent: 5500, availableBeds: 6, capacity: 2,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80',
        facilities: ['Wi-Fi', 'Fan', 'Common Bath', 'Study Table', 'Locker'],
        desc: 'Comfortable shared rooms for two, designed to balance privacy and social living at an affordable cost.',
    },
    {
        id: 3, name: 'Triple Sharing', rent: 4000, availableBeds: 9, capacity: 3,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
        facilities: ['Wi-Fi', 'Fan', 'Common Bath', 'Bunk Beds', 'Locker'],
        desc: 'Budget-friendly triple rooms perfect for students looking for an affordable, community-driven living experience.',
    },
];

export default function RoomTypesSection() {
    const [selected, setSelected] = useState(null);

    return (
        <section className="section" id="rooms" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="section-tag">Room Types</div>
                    <h2 className="section-heading">Choose Your Perfect Space</h2>
                    <p className="section-subheading" style={{ margin: '0 auto' }}>
                        We offer a variety of room options to fit every budget and lifestyle, all well-maintained and fully furnished.
                    </p>
                </div>

                <div className="room-grid">
                    {rooms.map(r => (
                        <div key={r.id} className="room-card">
                            <div className="room-card-img">
                                <img src={r.image} alt={r.name} />
                            </div>
                            <div className="room-card-body">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                    <h4>{r.name}</h4>
                                    <div className="room-price">₹{r.rent.toLocaleString()}<span>/mo</span></div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        <MdBed size={16} /> {r.availableBeds} Beds Available
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        <MdPeople size={16} /> Capacity: {r.capacity}
                                    </div>
                                </div>
                                <div className="room-features">
                                    {r.facilities.map(f => (
                                        <span key={f} className="badge badge-primary">{f}</span>
                                    ))}
                                </div>
                                <button className="btn btn-outline btn-sm" style={{ marginTop: '0.75rem', width: '100%' }} onClick={() => setSelected(r)}>
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Room Detail Modal */}
            <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name} size="lg">
                <ModalBody>
                    {selected && (
                        <div>
                            <img src={selected.image} alt={selected.name} style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 10, marginBottom: '1rem' }} />
                            <p style={{ marginBottom: '1rem' }}>{selected.desc}</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
                                    <div style={{ fontWeight: 800, color: 'var(--primary-500)', fontSize: '1.2rem' }}>₹{selected.rent.toLocaleString()}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Per Month</div>
                                </div>
                                <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
                                    <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{selected.availableBeds}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Available Beds</div>
                                </div>
                                <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
                                    <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{selected.capacity}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Capacity</div>
                                </div>
                            </div>
                            <h5 style={{ marginBottom: '0.75rem' }}>Included Facilities</h5>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {selected.facilities.map(f => (
                                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        <MdCheckCircle size={16} color="var(--success)" />{f}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </ModalBody>
            </Modal>
        </section>
    );
}
