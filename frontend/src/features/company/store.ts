// src/features/company/store.ts
import { create } from 'zustand';
import type { CompanyForm, EmployerForm, JobForm } from './schema';

type CompanyRegState = {
  step: number // 0,1,2
  jobSkipped: boolean
  company?: CompanyForm
  employer?: EmployerForm
  job?: JobForm
  setStep: (n: number) => void
  setCompany: (c: CompanyForm) => void
  setEmployer: (e: EmployerForm) => void
  setJob: (j: JobForm) => void
  skipJob: () => void
  reset: () => void
}

export const useCompanyRegStore = create<CompanyRegState>((set) => ({
  step: 0,
  jobSkipped: false,
  setStep: (n: number) => set({ step: n }),
  setCompany: (company: CompanyForm) => set({ company }),
  setEmployer: (employer: EmployerForm) => set({ employer }),
  setJob: (job: JobForm) => set({ job, jobSkipped: false }),
  skipJob: () => set({ job: undefined, jobSkipped: true }),
  reset: () =>
    set({ step: 0, jobSkipped: false, company: undefined, employer: undefined, job: undefined })
}))
