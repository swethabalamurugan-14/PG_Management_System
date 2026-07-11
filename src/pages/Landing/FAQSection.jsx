import { useState } from 'react';
import { MdAdd, MdRemove } from 'react-icons/md';

const faqs = [
    { q: 'Is food included in the rent?', a: 'Food is optional and can be added as an add-on service. We offer fresh homemade breakfast, lunch, and dinner for a nominal fee of ₹1,500/month.' },
    { q: 'Is Wi-Fi available in all rooms?', a: 'Yes! High-speed Wi-Fi (100 Mbps) is available throughout the premises including all rooms, common areas, and study zones at no extra cost.' },
    { q: 'Are visitors allowed?', a: 'Yes, visitors are allowed between 9:00 AM and 9:00 PM. All visitors must register at the reception and get tenant approval before entry.' },
    { q: 'Is parking available?', a: 'Yes, we provide designated parking space for two-wheelers free of charge. Four-wheeler parking is available at ₹500/month.' },
    { q: 'How is rent paid?', a: 'Rent can be paid via UPI, bank transfer, or cash. Rent is due by the 5th of every month. A late fee of ₹200 is applicable after that.' },
    { q: 'Is there a security deposit?', a: 'Yes, a refundable security deposit of 2 months\' rent is required at the time of joining. It is fully refunded after checkout subject to no damages.' },
];

export default function FAQSection() {
    const [open, setOpen] = useState(null);

    return (
        <section className="section" id="faq">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="section-tag">FAQ</div>
                    <h2 className="section-heading">Frequently Asked Questions</h2>
                    <p className="section-subheading" style={{ margin: '0 auto' }}>
                        Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                    </p>
                </div>
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    {faqs.map((f, i) => (
                        <div key={i} className="faq-item">
                            <div className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                                <span>{f.q}</span>
                                {open === i ? <MdRemove size={20} color="var(--primary-500)" /> : <MdAdd size={20} color="var(--text-muted)" />}
                            </div>
                            <div className={`faq-answer${open === i ? ' open' : ''}`}>{f.a}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
