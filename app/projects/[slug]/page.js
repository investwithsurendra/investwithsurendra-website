import { PROJECTS, getProject } from "@/lib/projects";
import ProjectClient from "./ProjectClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.name} \u2014 Invest With Surendra`,
    description: project.overview.slice(0, 160),
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return notFound();
  return <ProjectClient project={project} />;
}
