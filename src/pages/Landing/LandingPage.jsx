import LandingNavbar from './LandingNavbar';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import FacilitiesSection from './FacilitiesSection';
import RoomTypesSection from './RoomTypesSection';
import GallerySection from './GallerySection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

export default function LandingPage() {
    return (
        <div>
            <LandingNavbar />
            <HeroSection />
            <AboutSection />
            <FacilitiesSection />
            <RoomTypesSection />
            <GallerySection />
            <TestimonialsSection />
            <FAQSection />
            <ContactSection />
            <Footer />
        </div>
    );
}
