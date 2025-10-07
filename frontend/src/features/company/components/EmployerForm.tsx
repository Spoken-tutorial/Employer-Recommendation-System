// src/features/company/components/EmployerForm.tsx
import { TextField, Stack } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import type { EmployerForm } from '../schema'

export default function EmployerForm() {
  const { register, formState: { errors } } = useFormContext<{ employer: EmployerForm }>()

  return (
    <Stack spacing={2}>
      <TextField
        label="First name"
        {...register('employer.first_name')}
        error={!!errors.employer?.first_name}
        helperText={errors.employer?.first_name?.message}
      />
      <TextField
        label="Last name"
        {...register('employer.last_name')}
        error={!!errors.employer?.last_name}
        helperText={errors.employer?.last_name?.message}
      />
      <TextField
        label="Email"
        type="email"
        {...register('employer.email')}
        error={!!errors.employer?.email}
        helperText={errors.employer?.email?.message}
      />
      <TextField
        label="Phone"
        {...register('employer.phone')}
        error={!!errors.employer?.phone}
        helperText={errors.employer?.phone?.message}
      />
    </Stack>
  )
}
