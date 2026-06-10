import React from "react";
import fs from "fs";
import path from "path";
import ProjectList from "./ProjectList";

function getProjects() {
  const filePath = path.join(process.cwd(), "content/projects.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export default function Projects() {
  const projects = getProjects();

  return (
    <section id="projects" className="py-20 border-t border-neutral-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-10">
          Projects
        </h2>
        <ProjectList projects={projects} />
      </div>
    </section>
  );
}
