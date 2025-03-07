import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/dist/types/server";


export async function createIssue(projectId,data) {
  const {userId, orgId} = auth();
  if(!userId || !orgId){
    throw new Error("Unauthorized");
  }
  let user = await db.user.find({where:{clerkUserId:userId}});

  const lastIssue = await db.issue.findFirst({
    where:{projectId,status : data.status},
    orderBy:{order : "desc"},
  })

  const newOrder = lastIssue ? lastIssue.order + 1 : 0;

  const issue = await db.issue.create({
    data : {
      title : data.title,
      description : data.description,
      status: data.status,
      priority: data.priority,
      projectId: projectId,
      sprintId: data.sprintId,
      reportedId: user.id,
      assigneeId: data.assigneeId || null,
      order: newOrder   
    },
    include : {
      assignee : true,
      reporter : true
    }
  })
  return issue;
}