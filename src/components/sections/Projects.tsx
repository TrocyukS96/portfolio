"use client";

import { portfolioData } from '@/data/portfolio';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';

export function ProjectsSection() {
  return (
    <section id="projects" className="pt-10 pb-20">
      <div className="container mx-auto px-4 xl:px-24">
        <SectionHeading title="Featured Projects" subtitle="Some things I've built" center={false} />
        
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
