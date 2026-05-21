import React from "react";
import fs from "fs";
import path from "path";

interface Experience {
  role: string;
  org: string;
  period: string;
  desc: string;
}

interface AboutData {
  bio: string[];
  gpa: string;
  skills: string[];
  experience: Experience[];
  certifications: string[];
}

function getAboutData(): AboutData {
  const filePath = path.join(process.cwd(), "content/about.json");
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

export default function About() {
  const data = getAboutData();

  return (
    <section id="about" className="py-20 border-t border-neutral-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-10">
          About
        </h2>

        <div className="grid sm:grid-cols-[1fr_1fr] gap-12">
          <div className="space-y-4">
            {data.bio.map((para, i) => (
              <p key={i} className="text-neutral-700 leading-relaxed">
                {para}
              </p>
            ))}
            <p className="text-neutral-500 text-sm">GPA: {data.gpa} / 10</p>
          </div>

          <div>
            <p className="text-sm font-medium text-neutral-950 mb-3">Skills</p>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s) => (
                <span
                  key={s}
                  className="text-xs text-neutral-600 bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-md"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-sm font-medium text-neutral-950 mb-6">Experience</p>
          <div className="space-y-6">
            {data.experience.map((e, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto] gap-4 items-start">
                <div>
                  <p className="text-sm font-medium text-neutral-950">
                    {e.role} —{" "}
                    <span className="text-neutral-600 font-normal">{e.org}</span>
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">{e.desc}</p>
                </div>
                <span className="text-xs text-neutral-400 font-mono whitespace-nowrap mt-0.5">
                  {e.period}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-neutral-100">
          <p className="text-sm font-medium text-neutral-950 mb-4">Certifications</p>
          <ul className="space-y-2">
            {data.certifications.map((c) => (
              <li key={c} className="text-sm text-neutral-500">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
