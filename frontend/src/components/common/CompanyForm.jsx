import { Box, TextField, Typography, Divider, useTheme, MenuItem } from "@mui/material";

export default function CompanyForm({ form, errors, handleCompanyInputChange }) {
    const theme = useTheme();
    
    const domainOptions = [
        { value: "IT", label: "IT" },
        { value: "Finance", label: "Finance" },
        { value: "Marketing", label: "Marketing" },
        { value: "HR", label: "HR" },
        { value: "Operations", label: "Operations" },
    ];
    const companySizeOptions = [
        { value: "less_than_50", label: "< 50" },
        { value: "50_100", label: "50 - 100" },
        { value: "100_500", label: "100 - 500" },
        { value: "greater_than_500", label: "> 500" },
    ];
    return (
        <section>
            <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="subtitle1" fontWeight={600}>
                    Add Company Details
                </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" gap={2} mb={2}>
                <TextField
                    label="Company Name"
                    name="name"
                    size="small"
                    fullWidth
                    required
                    value={form.company?.name || ""}
                    onChange={handleCompanyInputChange}
                    error={Boolean(errors.company?.name)}
                    helperText={errors.company?.name}
                />
                <TextField
                    label="Email"
                    name="email"
                    size="small"
                    fullWidth
                    value={form.company?.email || ""}
                    onChange={handleCompanyInputChange}
                    error={Boolean(errors.company?.email)}
                    helperText={errors.company?.email}
                />
            </Box>
            <Box display="flex" gap={2} mb={2}>
                <TextField
                    label="HR Representative Name"
                    name="emp_name"
                    size="small"
                    fullWidth
                    required
                    value={form.company?.emp_name || ""}
                    onChange={handleCompanyInputChange}
                    error={Boolean(errors.company?.emp_name)}
                    helperText={errors.company?.emp_name}
                />
                <TextField
                    label="HR Phone"
                    name="emp_contact"
                    size="small"
                    fullWidth
                    required
                    value={form.company?.emp_contact || ""}
                    onChange={handleCompanyInputChange}
                    error={Boolean(errors.company?.emp_contact)}
                    helperText={errors.company?.emp_contact}
                />
            </Box>
            <Box display="flex" gap={2} mb={2}>
                <TextField
                    label="Address"
                    name="address"
                    size="small"
                    fullWidth
                    required
                    value={form.company?.address || ""}
                    onChange={handleCompanyInputChange}
                    error={Boolean(errors.company?.address)}
                    helperText={errors.company?.address}
                />
                <TextField
                    label="Website"
                    name="website"
                    size="small"
                    fullWidth
                    value={form.company?.website || ""}
                    onChange={handleCompanyInputChange}
                    error={Boolean(errors.company?.website)}
                    helperText={errors.company?.website}
                />
            </Box>
            <Box display="flex" gap={2} mb={2}>
                <TextField
                    label="Domain IDs (comma-separated)"
                    name="domain"
                    size="small"
                    fullWidth
                    value={form.company?.domain || ""}
                    onChange={(e) => {
                        const val = e.target.value;
                        // keep as string in form; payload builder will parse
                        handleCompanyInputChange({ target: { name: 'domain', value: val } });
                    }}
                    helperText="Enter numeric IDs, e.g., 1,2,3"
                />
                <TextField
                    select
                    label="Company Size"
                    name="company_size"
                    size="small"
                    fullWidth
                    value={form.company?.company_size || ""}
                    onChange={handleCompanyInputChange}
                    error={Boolean(errors.company?.company_size)}
                    helperText={errors.company?.company_size}
                >
                    <MenuItem value="">Select Size</MenuItem>
                    {companySizeOptions.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                    ))}
                </TextField>
            </Box>
            <Box display="flex" gap={2} mb={2}>
                <TextField
                    label="State (ID)"
                    name="state_c"
                    size="small"
                    fullWidth
                    value={form.company?.state_c || ""}
                    onChange={handleCompanyInputChange}
                    error={Boolean(errors.company?.state_c)}
                    helperText={errors.company?.state_c}
                />
                <TextField
                    label="City (ID)"
                    name="city_c"
                    size="small"
                    fullWidth
                    value={form.company?.city_c || ""}
                    onChange={handleCompanyInputChange}
                    error={Boolean(errors.company?.city_c)}
                    helperText={errors.company?.city_c}
                />
            </Box>
            <Box mb={2}>
                <TextField
                    label="Description"
                    name="description"
                    size="small"
                    fullWidth
                    multiline
                    minRows={3}
                    value={form.company?.description || ""}
                    onChange={handleCompanyInputChange}
                    error={Boolean(errors.company?.description)}
                    helperText={errors.company?.description}
                />
            </Box>
        </section>
    );
}
