"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function createProject(data) {
  const { userId, orgId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!orgId) {
    throw new Error("No Organization Selected");
  }

  const membershipList = await clerkClient.organizations.getOrganizationMembershipList({
    organizationId: orgId,
  });

  const userMembership = membershipList.data.find(
    (membership) => membership.publicUserData?.userId === userId
  );

  if (!userMembership || userMembership.role !== "org:admin") {
    throw new Error("Only organization admins can create projects");
  }

  const existingProject = await db.project.findFirst({
    where: {
      organizationId: orgId,
      key: data.key,
    },
  });

  if (existingProject) {
    throw new Error("A project with this key already exists in the organization.");
  }

  try {
    const project = await db.project.create({
      data: {
        name: data.name,
        key: data.key,
        description: data.description,
        organizationId: orgId,
      },
    });

    return project;
  } catch (error) {
    throw new Error("Error creating project: " + error.message);
  }
}

export async function getProjects(orgId) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const projects = await db.project.findMany({
    where: {
      organizationId: orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return projects;
}

export async function deleteProject(projectId) {
  const { userId, orgId, orgRole } = auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  if (orgRole !== "org:admin") {
    throw new Error("Only organization admin can delete projects");
  }

  const project = await db.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.organizationId !== orgId) {
    throw new Error("You do not have permissions to delete this project");
  }

  await db.project.delete({
    where: {
      id: projectId,
    },
  });

  return { success: true };
}

export async function getProject(projectId) {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const project = await db.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      sprints: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.organizationId !== orgId) {
    throw new Error("Project not found");
  }

  return project;
}
