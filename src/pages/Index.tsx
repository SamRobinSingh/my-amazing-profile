import { Navbar, FooterSection } from "@/components/NavFooter";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import PublicationsSection from "@/components/PublicationsSection";
import AwardsSection from "@/components/AwardsSection";
import ContactSection from "@/components/ContactSection";
import FloatingRobot from "@/components/FloatingRobot";
import AnimatedBackground from "@/components/AnimatedBackground";
import SectionReveal from "@/components/SectionReveal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-500 relative">
      <AnimatedBackground />
      <Navbar />
      <FloatingRobot />
      <HeroSection />
      <SectionReveal>
        <AboutSection />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <SkillsSection />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <ExperienceSection />
      </SectionReveal>
      <SectionReveal>
        <ProjectsSection />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <PublicationsSection />
      </SectionReveal>
      <SectionReveal>
        <AwardsSection />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <ContactSection />
      </SectionReveal>
      <FooterSection />
    </div>
  );
};

export default Index;
