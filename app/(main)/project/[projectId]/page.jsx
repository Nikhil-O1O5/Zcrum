import { getProject } from "@/action/projects";
import { notFound } from "next/navigation";
import SprintCreationForm from "../_components/create-sprint";
import SprintBoard from "../_components/sprint-board";


const ProjectPage = async({params}) => {
  const {projectId} = params;
  const project = await getProject(projectId);
  if(!project){
    notFound();
  } 
  return (
    <div className="container mx-auto">
      {/* sprint creation*/}
      <SprintCreationForm
        projectTitle={project.name} 
        projectId={projectId}
        projectKey={project.key}
        sprintKey={project.sprints?.length+1}
      />
      {/* Sprint Board */}
      {project.sprints.length > 0 ? (
        <SprintBoard sprints={project.sprints} projectId={projectId} orgId={project.organizationId} />
      ) : (
        <div>Create a Sprint from above button</div>
      )}
    </div>
  )
}

export default ProjectPage
