import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MusicSection from '@/components/MusicSection';
import ShowsSection from '@/components/ShowsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <MusicSection />
      <ShowsSection />
      <ContactSection />
    </main>
  );
};

export default Index;
