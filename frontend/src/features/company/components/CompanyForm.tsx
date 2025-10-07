import RHFTextField from '@shared/RHF/RHFTextField'
import RHFAutocomplete from '@shared/RHF/RHFAutocomplete';
import { Stack } from '@mui/material'

export default function CompanyForm({
  domains, states
}: { domains: string[]; states: { code: string; name: string }[] }) {
  return (
    <Stack spacing={2}>
      <RHFTextField name="company.name" label="Company Name" fullWidth />
      <RHFTextField name="company.website" label="Website" placeholder="https://example.com" fullWidth />
      <RHFAutocomplete
        name="company.domain"
        label="Domain"
        options={domains}
        fullWidth
      />
      <RHFAutocomplete
        name="company.state"
        label="State"
        options={states.map((s) => ({ label: s.name, value: s.name }))}
        fullWidth
      />
      <RHFTextField name="company.city" label="City" fullWidth />
      <RHFTextField name="company.address" label="Address" multiline rows={3} fullWidth />
    </Stack>
  )
}
