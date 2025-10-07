// src/features/company/components/JobForm.tsx
import { Controller, useFormContext } from 'react-hook-form'
import { TextField, Stack, Chip, Box } from '@mui/material'
import type { JobForm } from '../schema'

export default function JobForm() {
  const { register, control, formState: { errors } } = useFormContext<{ job: JobForm }>()

  return (
    <Stack spacing={2}>
      <TextField
        label="Job Title"
        {...register('job.title')}
        error={!!errors.job?.title}
        helperText={errors.job?.title?.message}
      />
     
      <TextField
        label="Description"
        multiline rows={4}
        {...register('job.description')}
        error={!!errors.job?.description}
        helperText={errors.job?.description?.message}
      />
      {/* Simple skills CSV input -> array */}
      <Box>
        {/* preview chips */}
        {/* If using value from controller above */}
      </Box>
    </Stack>
  )
}
