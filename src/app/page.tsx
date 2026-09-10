import { HeroSection } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { ExperienceSection } from "@/components/sections/Experience";
import { ProjectsSection } from "@/components/sections/Projects";
import { ContactSection } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <HeroSection />
      
      <section className="relative overflow-hidden py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
        />

        <div className="container relative mx-auto px-4 xl:px-24">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 xl:gap-20">
            <div id="experience" className="flex-1 lg:max-w-[52%]">
              <ExperienceSection />
            </div>
            <div id="skills" className="flex-1">
              <TechStack />
            </div>
          </div>
        </div>
      </section>

      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
