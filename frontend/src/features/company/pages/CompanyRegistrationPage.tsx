// src/features/company/pages/CompanyRegistrationPage.tsx
import { useMemo, useState } from 'react'
import {
  Box, Button, Step, StepLabel, Stepper, Stack, Typography, Paper, Divider
} from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import CompanyForm from '../components/CompanyForm'
import EmployerForm from '../components/EmployerForm'
import JobForm from '../components/JobForm'

import { useCompanyRegStore } from '../store'
import {
  companySchema, employerSchema, jobSchema,
  registrationSchema, type RegistrationPayload
} from '../schema'
import { useMetaOptions } from '../queries'
import { useRegisterCompany } from '../mutations'

const steps = ['Company details', 'Employer details', 'Job details (optional)']

type FormShape = RegistrationPayload

export default function CompanyRegistrationPage() {
  const { step, setStep, jobSkipped, setCompany, setEmployer, setJob, skipJob, reset } =
    useCompanyRegStore()

  const { data: options, isLoading: loadingMeta } = useMetaOptions()
  const registerCompany = useRegisterCompany()

  const methods = useForm<FormShape>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      company: { name: '', website: '', domain: '' },
      employer: { first_name: '', last_name: '', email: '', phone: '' },
      job: { title: '', description: ''}
    },
    mode: 'onTouched'
  })

  const [submitted, setSubmitted] = useState<null | { success: boolean; withJob: boolean }>(null)

  // Per-step validators (so we can validate one step at a time)
  const stepValidators = useMemo(
    () => [
      () => companySchema.safeParse(methods.getValues().company).success,
      () => employerSchema.safeParse(methods.getValues().employer).success,
      () => jobSchema.safeParse(methods.getValues().job).success
    ],
    [methods]
  )

  const onNext = async () => {
    // validate current step only
    const ok = await methods.trigger(step === 0 ? 'company' : step === 1 ? 'employer' : 'job')
    if (!ok) return

    // save partials to store (optional, but nice if you leave the page and return)
    const v = methods.getValues()
    if (step === 0) setCompany(v.company)
    if (step === 1) setEmployer(v.employer)
    if (step === 2) setJob(v.job!)

    setStep(step + 1)
  }

  const onBack = () => setStep(Math.max(step - 1, 0))

  const onSkipJob = () => {
    skipJob()
    // submit company + employer without job
    handleSubmit(false)
  }

  const handleSubmit = async (includeJob: boolean) => {
    const v = methods.getValues()
    const payload: RegistrationPayload = {
      company: v.company,
      employer: v.employer,
      job: includeJob ? v.job : undefined
    }
    try {
      await registerCompany.mutateAsync(payload)
      setSubmitted({ success: true, withJob: !!includeJob })
      reset()
    } catch (e) {
      setSubmitted({ success: false, withJob: !!includeJob })
    }
  }

  const onSubmitFinal = () => handleSubmit(true)

  // success screens
  if (submitted?.success) {
    return (
      <Paper sx={{ p: 4 }}>
        {submitted.withJob ? (
          <>
            <Typography variant="h5" gutterBottom>
              ✅ Registration + Job submitted!
            </Typography>
            <Typography>
              Your job will be <b>public after admin approval</b>. A verification link has been sent to
              the employer’s email. Please verify your account.
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              ✅ Company registration complete!
            </Typography>
            <Typography>
              We’ve emailed a <b>verification link</b>. After login, you can add job details anytime.
            </Typography>
          </>
        )}
        <Divider sx={{ my: 3 }} />
        <Button variant="contained" onClick={() => setSubmitted(null)}>
          New Registration
        </Button>
      </Paper>
    )
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Company Registration</Typography>

      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <FormProvider {...methods}>
        <Paper sx={{ p: 3 }}>
          {loadingMeta ? (
            <Typography>Loading options…</Typography>
          ) : (
            <>
              {step === 0 && (
                <CompanyForm
                  domains={options?.domains ?? ['Software','EdTech','Finance']}
                  states={options?.states ?? [{ code: 'MH', name: 'Maharashtra' }, { code: 'DL', name: 'Delhi' }]}
                />
              )}
              {step === 1 && <EmployerForm />}
              {step === 2 && <JobForm />}
            </>
          )}

          <Stack direction="row" spacing={2} sx={{ mt: 3 }} justifyContent="space-between">
            <Box>
              <Button disabled={step === 0} onClick={onBack}>Back</Button>
            </Box>

            <Box>
              {step < 2 && (
                <Button variant="contained" onClick={onNext}>
                  Next
                </Button>
              )}

              {step === 2 && (
                <>
                  <Button onClick={onSkipJob} sx={{ mr: 1 }}>
                    Skip & Finish
                  </Button>
                  <Button
                    variant="contained"
                    onClick={async () => {
                      const ok = await methods.trigger('job')
                      if (ok) onSubmitFinal()
                    }}
                    disabled={registerCompany.isPending}
                  >
                    Submit All
                  </Button>
                </>
              )}
            </Box>
          </Stack>
        </Paper>
      </FormProvider>

      {registerCompany.isError && (
        <Typography color="error">Something went wrong. Please try again.</Typography>
      )}
    </Stack>
  )
}
