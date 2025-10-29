// zod
import { domain } from 'node_modules/zod/v4/core/regexes.cjs';
import { z } from 'zod';

// Helper function to convert empty strings to undefined
const emptyToUndefined = (val: string) => (val === '' ? undefined : val);

// Company Details
export const companySchema = z.object({
    name: z.string().min(2, 'Company name must be at least 2 characters'),
    website: z.preprocess(
        emptyToUndefined,
        z.string().url('Please enter a valid URL').optional()
    ),
    domain: z.string().min(1, 'Please select a domain'), // e.g., "Software", "Edu"
})

export type CompanyForm = z.infer<typeof companySchema>

// Employer Details
export const employerSchema = z.object({
    first_name: z.string().min(2, 'First name must be at least 2 characters'),
    last_name: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(8, 'Phone number must be at least 8 digits')
})

export type EmployerForm = z.infer<typeof employerSchema>

// Job Details
export const jobSchema = z.object({
    title: z.string().min(2, 'Job title must be at least 2 characters'),
    description: z.string().min(10, 'Job description must be at least 10 characters'),
})

export type JobForm = z.infer<typeof jobSchema>

// full payload the backend can accept in one go:
export const registrationSchema = z.object({
    company: companySchema,
    employer: employerSchema,
    job: jobSchema.optional() // present if not skipped
})

export type RegistrationPayload = z.infer<typeof registrationSchema>

// Admin Company Addition (simplified, just company details)
export const adminCompanySchema = z.object({
    name: z.string().min(5, 'Must be at least 5 characters'),
    website: z.string().url('Please enter a valid URL'),
    domain: z.string().min(1, 'Please select a domain'),
    state: z.string().min(1, 'Please select a state'),
    city: z.string().min(2, 'City name must be at least 2 characters'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
})

export type AdminCompanyForm = z.infer<typeof adminCompanySchema>