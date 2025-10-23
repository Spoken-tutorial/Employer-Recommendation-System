// src/features/company/pages/AdminCompanyAddPage.tsx
import { useState } from 'react'
import {
  Box, Button, Stack, Typography, Paper, Divider
} from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import AdminCompanyForm from '../components/AdminCompanyForm'
import { adminCompanySchema, type AdminCompanyForm as AdminCompanyFormType } from '../schema'
import { useMetaOptions } from '../queries'
import { useAddCompany } from '../mutations'

export default function AdminCompanyAddPage() {
  const navigate = useNavigate()
  const { data: options, isLoading: loadingMeta } = useMetaOptions()
  const addCompany = useAddCompany()

  const methods = useForm<AdminCompanyFormType>({
    resolver: zodResolver(adminCompanySchema),
    defaultValues: {
      name: '',
      website: '',
      domain: '',
      state: '',
      city: '',
      address: ''
    },
    mode: 'onTouched'
  })

  const [submitted, setSubmitted] = useState<null | { success: boolean; companyId?: number }>(null)

  const onSubmit = async (data: AdminCompanyFormType) => {
    try {
      const result = await addCompany.mutateAsync(data)
      setSubmitted({ success: true, companyId: result.company_id })
    } catch (e) {
      setSubmitted({ success: false })
    }
  }

  // Success screen
  if (submitted?.success) {
    return (
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          ✅ Company added successfully!
        </Typography>
        <Typography>
          Company ID: <b>{submitted.companyId}</b>
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => navigate('/admin/companies')}>
            Back to Companies
          </Button>
          <Button variant="outlined" onClick={() => setSubmitted(null)}>
            Add Another
          </Button>
        </Stack>
      </Paper>
    )
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Add New Company</Typography>

      <FormProvider {...methods}>
        <Paper sx={{ p: 3 }}>
          {loadingMeta ? (
            <Typography>Loading options…</Typography>
          ) : (
            <AdminCompanyForm
              domains={options?.domains ?? ['Software', 'EdTech', 'Finance']}
              states={options?.states ?? [{ code: 'MH', name: 'Maharashtra' }, { code: 'DL', name: 'Delhi' }]}
            />
          )}

          <Stack direction="row" spacing={2} sx={{ mt: 3 }} justifyContent="space-between">
            <Button variant="outlined" onClick={() => navigate('/admin/companies')}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={methods.handleSubmit(onSubmit)}
              disabled={addCompany.isPending}
            >
              {addCompany.isPending ? 'Adding...' : 'Add Company'}
            </Button>
          </Stack>
        </Paper>
      </FormProvider>

      {addCompany.isError && (
        <Typography color="error">Something went wrong. Please try again.</Typography>
      )}
    </Stack>
  )
}
