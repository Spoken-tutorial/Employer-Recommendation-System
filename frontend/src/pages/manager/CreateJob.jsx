import { Box, Button, Card, CardContent, Container, Typography, useTheme } from "@mui/material";
import JobForm from "../../components/common/JobForm";
import JobFiltersForm from "../../components/common/JobFiltersForm";
import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function ManagerCreateJob() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [form, setForm] = useState({ job: {} });
    const [errors, setErrors] = useState({ job: {}, error: null });
    const [success, setSuccess] = useState(null);

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

    // for filters 
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
            // build the needed payload
            const raw = form.job || {};
            const toInt = (v) => {
                const n = Number(v);
                return Number.isFinite(n) ? n : undefined;
            };
            const extractId = (obj) => {
                const cands = [obj?.id, obj?.pk, obj?.company_id, obj?.slug];
                for (const c of cands) {
                    const n = Number(c);
                    if (Number.isFinite(n)) return n;
                }
                return undefined;
            };
            const getList = (payload) => {
                if (Array.isArray(payload)) return payload;
                if (Array.isArray(payload?.results)) return payload.results;
                if (Array.isArray(payload?.data)) return payload.data;
                if (Array.isArray(payload?.companies)) return payload.companies;
                return [];
            };


            let resolvedCompanyId;
            if (raw.company !== undefined && raw.company !== null && String(raw.company).trim() !== "") {
                const compStr = String(raw.company).trim();
                if (/^\d+$/.test(compStr)) {
                    resolvedCompanyId = Number(compStr);
                } else {
                    try {
                        const listResp = await axiosInstance.get("admin/manager/companies");
                        const companies = getList(listResp.data);
                        const match = companies.find((c) => (c.name || "").toLowerCase().trim() === compStr.toLowerCase());
                        if (match) {
                            const idLike = extractId(match);
                            if (Number.isFinite(idLike)) resolvedCompanyId = idLike;
                        } else {
                            // Auto-create company with minimal valid defaults
                            const createPayload = {
                                name: compStr,
                                emp_name: compStr, 
                                emp_contact: "1234567890", 
                                address: "Address not provided",

                            };
                            try {
                                const createResp = await axiosInstance.post("admin/manager/companies/add", createPayload);
                                let newId = extractId(createResp.data || {});
                                if (!Number.isFinite(newId)) {
                                    // fallback
                                    try {
                                        const afterResp = await axiosInstance.get("admin/manager/companies");
                                        const list = getList(afterResp.data);
                                        const created = list.find((c) => (c.name || "").toLowerCase().trim() === compStr.toLowerCase());
                                        const idLike = extractId(created || {});
                                        if (Number.isFinite(idLike)) newId = idLike;
                                    } catch (_) {
                                        
                                    }
                                }
                                if (Number.isFinite(newId)) {
                                    resolvedCompanyId = newId;
                                }
                            } catch (createErr) {
                                // surface company creation errors to the form
                                const server = createErr.response?.data;
                                const msg = typeof server === 'object' ? (server.detail || Object.values(server)[0]) : 'Failed to create company';
                                setErrors((prev) => ({ ...prev, job: { ...prev.job, company: String(msg) } }));
                                return;
                            }
                        }
                    } catch (lookupErr) {
                        
                    }
                }
            }


            if (resolvedCompanyId) {
                setErrors((prev) => ({ ...prev, job: { ...prev.job, company: undefined } }));
                setForm((prev) => ({ ...prev, job: { ...prev.job, company: String(resolvedCompanyId) } }));
            }

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
            // redirect to jobs list and trigger success snackbar
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
                        />
                    </CardContent>
                </Card>
                <Card sx={{ mb: 4, borderLeft: `6px solid ${theme.palette.success.main}` }}>
                    <CardContent>
                        <JobFiltersForm
                form={form}
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
