import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Container, Typography, useTheme } from "@mui/material";
import axiosInstance from "../../api/axiosInstance";
import JobForm from "../../components/common/JobForm";
import JobFiltersForm from "../../components/common/JobFiltersForm";

export default function ManagerEditJob() {
    const { job_id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    const [form, setForm] = useState({ job: {} });
    const [errors, setErrors] = useState({ job: {}, error: null });
    const [success, setSuccess] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [companyName, setCompanyName] = useState("");

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
                url = payload && typeof payload === "object" ? payload.next : null;
                guard += 1;
            }
            const unique = new Map();
            acc.forEach((c) => {
                const id = c.id ?? c.pk;
                const name = c.name;
                if (id && name && !unique.has(id)) unique.set(id, { id, name });
            });
            const all = Array.from(unique.values()).sort((a, b) => a.name.localeCompare(b.name));
            setCompanies(all);
        } catch (_) {
            // ignore silently
        }
    };

    // fetch job details
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const url = `admin/manager/jobs/${job_id}/`;
                const { data } = await axiosInstance.get(url);
                
                setCompanyName(data.company || "");
                const parseDate = (iso) => {
                    if (!iso) return "";
                    try {
                        
                        return String(iso).slice(0, 10);
                    } catch {
                        return "";
                    }
                };
                setForm({
                    job: {
                        designation: data.designation || "",
                        description: data.description || "",
                        requirements: data.requirements || "",
                        key_job_responsibilities: data.key_job_responsibilities || "",
                        num_vacancies: data.num_vacancies ?? "",
                        salary_range_min: data.salary_range_min ?? "",
                        salary_range_max: data.salary_range_max ?? "",
                        domain: data.domain ?? "",
                        last_app_date: parseDate(data.last_app_date),
                        job_status: data.job_status ?? 0,
                        
                        company: "",
                    },
                    eligibility: {
                        
                    },
                });
            } catch (error) {
                setErrors({ job: {}, error: "Failed to fetch job details" });
            }
        };
        fetchJob();
    }, [job_id]);

        // load companies
        useEffect(() => {
            reloadCompanies();
        }, []);

    
    useEffect(() => {
        if (!companyName || companies.length === 0) return;
        const match = companies.find((c) => c.name === companyName);
        if (match) {
            setForm((prev) => ({ ...prev, job: { ...prev.job, company: String(match.id) } }));
        }
    }, [companies, companyName]);

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
                const url = `admin/manager/jobs/edit/${job_id}/`;
            const raw = form.job || {};
            const toInt = (v) => {
                const n = Number(v);
                return Number.isFinite(n) ? n : undefined;
            };
                const payload = {};
                if (raw.designation) payload.designation = raw.designation;
                if (raw.description) payload.description = raw.description;
                if (raw.requirements) payload.requirements = raw.requirements;
                if (raw.key_job_responsibilities) payload.key_job_responsibilities = raw.key_job_responsibilities;
                if (raw.num_vacancies !== undefined && raw.num_vacancies !== "") payload.num_vacancies = toInt(raw.num_vacancies);
                if (raw.salary_range_min !== undefined && raw.salary_range_min !== "") payload.salary_range_min = toInt(raw.salary_range_min);
                if (raw.salary_range_max !== undefined && raw.salary_range_max !== "") payload.salary_range_max = toInt(raw.salary_range_max);

                if (raw.company && /^\d+$/.test(String(raw.company))) payload.company = Number(raw.company);

                // domain
                if (raw.domain !== undefined) {
                    const dn = toInt(raw.domain);
                    if (dn !== undefined) payload.domain = dn;
                }

                if (raw.last_app_date) payload.last_app_date = `${raw.last_app_date}T00:00:00Z`;
                if (raw.job_status !== undefined) payload.job_status = raw.job_status;

                await axiosInstance.patch(url, payload);
            setSuccess("Job updated successfully!");
            setErrors({ job: {}, error: null });
            navigate("/manager/jobs", { state: { updated: "job" } });
        } catch (error) {
            const server = error.response?.data;
            if (server && typeof server === "object") {
                const normalized = {};
                Object.entries(server).forEach(([k, v]) => {
                    if (Array.isArray(v)) normalized[k] = v[0];
                    else if (typeof v === "string") normalized[k] = v;
                    else if (v && typeof v === "object") normalized[k] = JSON.stringify(v);
                });
                setErrors({ job: normalized, error: normalized.detail || null });
            } else {
                setErrors({ job: {}, error: "Failed to update job" });
            }
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" mb={2}>Edit Job (Manager)</Typography>
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
                        <JobFiltersForm form={form} errors={errors} setForm={setForm} />
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
    );
}
