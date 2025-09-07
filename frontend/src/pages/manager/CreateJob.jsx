import { Box, Button, Card, CardContent, Container, Typography, useTheme } from "@mui/material";
import JobForm from "../../components/common/JobForm";
import JobFiltersForm from "../../components/common/JobFiltersForm";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function ManagerCreateJob() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [form, setForm] = useState({ job: {} });
    const [errors, setErrors] = useState({ job: {}, error: null });
    const [success, setSuccess] = useState(null);
    const [companies, setCompanies] = useState([]);

    // load companies for dropdown
    const reloadCompanies = async () => {
        try {
            const acc = [];
            let url = "admin/manager/companies"; 
            let guard = 0; 
            while (url && guard < 100) {
                const resp = await axiosInstance.get(url);
                const payload = resp?.data;
                const chunk = Array.isArray(payload)
                    ? payload
                    : Array.isArray(payload?.results)
                    ? payload.results
                    : Array.isArray(payload?.companies)
                    ? payload.companies
                    : Array.isArray(payload?.data)
                    ? payload.data
                    : [];
                acc.push(...chunk);
                url = payload && typeof payload === 'object' ? payload.next : null; 
                guard += 1;
            }
            // dedupe and map
            const unique = new Map();
            acc.forEach((c) => {
                const id = c.id ?? c.pk;
                const name = c.name;
                if (id && name && !unique.has(id)) unique.set(id, { id, name });
            });
            const all = Array.from(unique.values()).sort((a, b) => a.name.localeCompare(b.name));
            setCompanies(all);
        } catch (_) {
            
        }
    };

    useEffect(() => {
        reloadCompanies();
    }, []);

    // input change for job fields
    const handleJobInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            job: {
                ...prev.job,
                [name]: value,
            },
        }));
    };

    // filters
    const handleFiltersInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            filters: {
                ...prev.filters,
                [name]: value,
            },
        }));
    };

    // ReactQuill changes for job fields
    const handleQuillChange = (value, field) => {
        setForm((prev) => ({
            ...prev,
            job: {
                ...prev.job,
                [field]: value,
            },
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "admin/manager/jobs/add";
            // build the payload
            const raw = form.job || {};
            const toInt = (v) => {
                const n = Number(v);
                return Number.isFinite(n) ? n : undefined;
            };
            // company selection from dropdown
            const resolvedCompanyId = /^\d+$/.test(String(raw.company ?? '').trim()) ? Number(String(raw.company).trim()) : undefined;

            const payload = {};
            if (raw.designation) payload.designation = raw.designation;
            if (raw.description) payload.description = raw.description;
            if (raw.requirements) payload.requirements = raw.requirements;
            if (raw.key_job_responsibilities) payload.key_job_responsibilities = raw.key_job_responsibilities;
            if (raw.num_vacancies !== undefined && raw.num_vacancies !== "") payload.num_vacancies = toInt(raw.num_vacancies);
            if (raw.salary_range_min !== undefined && raw.salary_range_min !== "") payload.salary_range_min = toInt(raw.salary_range_min);
            if (raw.salary_range_max !== undefined && raw.salary_range_max !== "") payload.salary_range_max = toInt(raw.salary_range_max);
            if (resolvedCompanyId) payload.company = resolvedCompanyId;
            
            if (raw.domain !== undefined) {
                const dn = toInt(raw.domain);
                payload.domain = dn !== undefined ? dn : null;
            } else {
                payload.domain = null;
            }
            if (raw.last_app_date) payload.last_app_date = `${raw.last_app_date}T00:00:00Z`;
            payload.job_status = raw.job_status ?? 0;


            if (!payload.company) payload.company = null;

            await axiosInstance.post(url, payload);
            setSuccess("Job created successfully!");
            setErrors({ job: {}, error: null });

            // redirect to jobs list and trigger snackbar
            navigate("/manager/jobs", { state: { created: "job" } });
        } catch (error) {
            const server = error.response?.data;
            if (server && typeof server === 'object') {
                const normalized = {};
                Object.entries(server).forEach(([k, v]) => {
                    if (Array.isArray(v)) normalized[k] = v[0];
                    else if (typeof v === 'string') normalized[k] = v;
                    else if (v && typeof v === 'object') normalized[k] = JSON.stringify(v);
                });
                setErrors({ job: normalized, error: normalized.detail || null });
            } else {
                setErrors({ job: {}, error: "Failed to create job" });
            }
        }
    };

    return (
    <>
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" mb={2}>Add Job (Manager)</Typography>
            <form onSubmit={handleFormSubmit}>
        <Card sx={{ mb: 4, borderLeft: `6px solid ${theme.palette.info.main}` }}>
                    <CardContent>
                        <JobForm
                            form={form}
                            errors={errors}
                handleJobInputChange={handleJobInputChange}
                handleQuillChange={handleQuillChange}
                    showCompany
                    companyOptions={companies}
                onCompanyOpen={reloadCompanies}
                        />
                    </CardContent>
                </Card>
                <Card sx={{ mb: 4, borderLeft: `6px solid ${theme.palette.success.main}` }}>
                    <CardContent>
            <JobFiltersForm
        form={form}
        errors={errors}
        setForm={setForm}
        handleFiltersInputChange={handleFiltersInputChange}
            />
                    </CardContent>
                </Card>
                                <Box display="flex" justifyContent="center" mt={4} gap={2}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="small"
                                            onClick={() => setForm((p) => ({ ...p, job: { ...p.job, job_status: 0 } }))}
                                            sx={{ px: 6, py: 1.5, fontWeight: 600, fontSize: "1.1rem", background: theme.palette.primary.main, "&:hover": { background: theme.palette.primary.dark } }}
                                        >
                                            Save Job as Draft
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="small"
                                            onClick={() => setForm((p) => ({ ...p, job: { ...p.job, job_status: 1 } }))}
                                            sx={{ px: 6, py: 1.2, fontWeight: 500, fontSize: "0.8rem", background: theme.palette.primary.main, "&:hover": { background: theme.palette.primary.dark } }}
                                        >
                                            Submit Job
                                        </Button>
                                </Box>
            </form>
            {success && <Typography color="success.main">{success}</Typography>}
            {errors.error && <Typography color="error">{errors.error}</Typography>}
        </Container>
    </>
    );
}
