import { WorkOutline, CalendarToday, Numbers, BusinessCenter} from "@mui/icons-material";
import { Box, TextField, InputAdornment, Typography, MenuItem, Divider, useTheme} from "@mui/material";
import ReactQuill from "react-quill";

export default function JobForm({ form, errors, handleJobInputChange, handleQuillChange, showCompany = false, companyOptions = [], onCompanyOpen }){
    const theme = useTheme();

    return (
        <section>
             <Box display="flex" alignItems="center" mb={2}>
                <WorkOutline sx={{ color: theme.palette.info.main, mr: 1 }} />
                <Typography variant="subtitle1" fontWeight={600}>
                  Add Job Details
                </Typography>
              </Box>
             
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" gap={2} mb={2}>
                {showCompany && (
                  <TextField
                    select
                    label="Company"
                    name="company"
                    size="small"
                    fullWidth
                    required
                    value={form.job?.company ?? ""}
                    onChange={handleJobInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BusinessCenter sx={{ color: theme.palette.info.main }} />
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(errors.job?.company)}
                    helperText={errors.job?.company}
                    SelectProps={{ onOpen: onCompanyOpen }}
                  >
                    <MenuItem value="">Select Company</MenuItem>
                    {companyOptions.map((c) => (
                      <MenuItem key={c.id} value={String(c.id)}>{c.name}</MenuItem>
                    ))}
                  </TextField>
                )}
                <TextField
                  label="Job Designation"
                  name="designation"
                  size="small"
                  fullWidth
                  required
                  value={form.job?.designation}
                  onChange={handleJobInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkOutline sx={{ color: theme.palette.info.main }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.job?.designation)}
                  helperText={errors.job?.designation}
                />
                <TextField
                  select
                  label="Domain"
                  name="domain"
                  size="small"
                  fullWidth
                  required
                  value={form.job?.domain ?? ""}
                  onChange={handleJobInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessCenter sx={{ color: theme.palette.info.main }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.job?.domain)}
                  helperText={errors.job?.domain}
                >
                  <MenuItem value="">Select Domain</MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Operations">Operations</MenuItem>
                </TextField>
              </Box>
              <Box display="flex" gap={2} mb={2}>
                <TextField
                  label="Last Application Date"
                  name="last_app_date"
                  type="date"
                  size="small"
                  fullWidth
                  value={form.job?.last_app_date}
                  onChange={handleJobInputChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday sx={{ color: theme.palette.info.main }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.job?.last_app_date)}
                  helperText={errors.job?.last_app_date}
                />
                <TextField
                  label="Number of Vacancies"
                  name="num_vacancies"
                  type="number"
                  size="small"
                  fullWidth
                  value={form.job?.num_vacancies}
                  onChange={handleJobInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Numbers sx={{ color: theme.palette.info.main }} />
                      </InputAdornment>
                    ),
                    inputProps: { min: 1 },
                  }}
                  error={Boolean(errors.job?.num_vacancies)}
                  helperText={errors.job?.num_vacancies}
                />
                
              </Box>
              <Box display="flex" gap={2}>
               <TextField
                  label="Minimum Salary"
                  name="salary_range_min"
                  type="number"
                  size="small"
                  fullWidth
                  value={form.job?.salary_range_min}
                  onChange={handleJobInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Numbers sx={{ color: theme.palette.info.main }} />
                      </InputAdornment>
                    ),
                    inputProps: { min: 1 },
                  }}
                  error={Boolean(errors.job?.salary_range_min)}
                  helperText={errors.job?.salary_range_min}
                />
                <TextField
                  label="Maximum Salary"
                  name="salary_range_max"
                  type="number"
                  size="small"
                  fullWidth
                  value={form.job?.salary_range_max}
                  onChange={handleJobInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Numbers sx={{ color: theme.palette.info.main }} />
                      </InputAdornment>
                    ),
                    inputProps: { min: 1 },
                  }}
                  error={Boolean(errors.job?.salary_range_max)}
                  helperText={errors.job?.salary_range_max}
                />
                
              </Box>
              <Box mt={3} mb={2}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }} component="label">
                  Job Description
                </Typography>
                <ReactQuill
                  theme="snow"
                  value={form.job?.description}
                  onChange={(value) => handleQuillChange(value, "description")}
                  placeholder="Enter job description..."
                  style={{ marginBottom: 16 }}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }} component="label">
                  Job Requirements
                </Typography>
                <ReactQuill
                  theme="snow"
                  value={form.job?.requirements}
                  onChange={(value) => handleQuillChange(value, "requirements")}
                  placeholder="Enter job requirements..."
                  style={{ marginBottom: 16 }}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }} component="label">
                  Key Job Responsibilities
                </Typography>
                <ReactQuill
                  theme="snow"
                  value={form.job?.key_job_responsibilities}
                  onChange={(value) => handleQuillChange(value, "key_job_responsibilities")}
                  placeholder="Enter key job responsibilities..."
                  style={{ marginBottom: 8 }}
                />
              </Box>
        </section>
    )
}