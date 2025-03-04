import { z } from "zod"

export const projectSchema = z.object({
  name : z.string().min(1,"Project Name is required").max(100,"Project name must 100 characters or less"),
  key: z.string().min(2,"Project key must be atleast 2 characters").max(20, "Project key must be equal to or less than 20 characters"),
  description: z.string().max(100,"Project description should be less than or equal to 500 characters").optional()
})

export const sprintSchema = z.object({
  name : z.string().min(1,"Name is required"),
  startDate: z.date(),
  endDate : z.date()
}) 
