import RHFTextField from '@shared/RHF/RHFTextField'
import RHFAutocomplete from '@shared/RHF/RHFAutocomplete';
import { Stack } from '@mui/material'

export default function AdminCompanyForm({
  domains, states
}: { domains: string[]; states: { code: string; name: string }[] }) {
  return (
    <Stack spacing={2}>
      <RHFTextField name="name" label="Company Name" fullWidth autoFocus />
      <RHFTextField name="website" label="Website" placeholder="https://example.com" fullWidth />
      <RHFAutocomplete
        name="domain"
        label="Domain"
        options={domains}
        fullWidth
      />
      <RHFAutocomplete
        name="state"
        label="State"
        options={states.map((s) => ({ label: s.name, value: s.name }))}
        fullWidth
      />
      <RHFTextField name="city" label="City" fullWidth />
      <RHFTextField name="address" label="Address" multiline rows={3} fullWidth />
    </Stack>
  )
}
