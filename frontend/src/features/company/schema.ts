// zod
import { domain } from 'node_modules/zod/v4/core/regexes.cjs';
import { z } from 'zod';

// Company Details
export const companySchema = z.object({
    name: z.string().min(2, 'Required'),
    website: z.url('Invalid URL').optional().or(z.literal('')),
    domain: z.string().min(1, 'Required'), // e.g., "Software", "Edu"
})

export type CompanyForm = z.infer<typeof companySchema>

// Employer Details
export const employerSchema = z.object({
    first_name: z.string().min(2, 'Required'),
    last_name: z.string().min(2, 'Required'),
    email: z.email('Invalid Email'),
    phone: z.string().min(8, 'Invalid Phone')
})

export type EmployerForm = z.infer<typeof employerSchema>

// Job Details
export const jobSchema = z.object({
    title: z.string().min(2, 'Required'),
    description: z.string().min(10, 'Required'),
})

export type JobForm = z.infer<typeof jobSchema>

// full payload the backend can accept in one go:
export const registrationSchema = z.object({
    company: companySchema,
    employer: employerSchema,
    job: jobSchema.optional() // present if not skipped
})

export type RegistrationPayload = z.infer<typeof registrationSchema>