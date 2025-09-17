import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Container, Typography, useTheme } from "@mui/material";
import axiosManager from "../../api/axiosManager";
import CompanyForm from "../../components/common/CompanyForm";
import PageHeader from "../../components/common/PageHeader";

export default function ManagerCompanyDetail() {
    const { company_id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    const [form, setForm] = useState({ company: {} });
    const [errors, setErrors] = useState({ company: {}, error: null });
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const url = `admin/manager/companies/${company_id}/`;
                const { data } = await axiosManager.get(url);

                const toIdList = (v) => {
                    if (!v) return "";
                    
                    if (Array.isArray(v)) {
                        const ids = v.map((x) => {
                            if (typeof x === "number") return x;
                            if (typeof x === "string" && /^\d+$/.test(x)) return Number(x);
                            if (x && (x.id || x.pk)) return Number(x.id ?? x.pk);
                            return undefined;
                        }).filter((n) => Number.isFinite(n));
                        return ids.join(",");
                    }
                    if (typeof v === "string") return v; 
                    if (typeof v === "number") return String(v);
                    return "";
                };

                setForm({
                    company: {
                        name: data.name || "",
                        email: data.email || "",
                        emp_name: data.emp_name || "",
                        emp_contact: data.emp_contact || "",
                        address: data.address || "",
                        website: data.website || "",
                        description: data.description || "",
                        company_size: data.company_size || "",
                        state_c: data.state_c ?? "",
                        city_c: data.city_c ?? "",
                        domain: toIdList(data.domain),
                    },
                });
                setErrors({ company: {}, error: null });
            } catch (error) {
                setErrors({ company: {}, error: "Failed to fetch company details" });
            }
            setLoading(false);
        };
        fetchCompany();
    }, [company_id]);

    const handleCompanyInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            company: {
                ...prev.company,
                [name]: value,
            },
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const c = form.company || {};
        // client-side validation 
        const clientErrors = { company: {} };
        if (!c.name?.trim()) clientErrors.company.name = "Company name is required";
        if (!c.emp_name?.trim()) clientErrors.company.emp_name = "HR representative name is required";
        if (!c.address?.trim()) clientErrors.company.address = "Address is required";

        const digitsOnly = (c.emp_contact || "").toString().replace(/\D/g, "");
        if (!(digitsOnly.length >= 9 && digitsOnly.length <= 15)) {
            clientErrors.company.emp_contact = "Enter a valid phone number (9 to 15 digits)";
        }
        if (Object.keys(clientErrors.company).length) {
            setErrors(clientErrors);
            return;
        }
        try {
            const url = `admin/manager/companies/edit/${company_id}/`;
            const payload = {};
            const assign = (k, v) => {
                if (v !== undefined && v !== null && String(v).trim() !== "") payload[k] = v;
            };
            assign("name", c.name);
            assign("email", c.email);
            assign("emp_name", c.emp_name);
            assign("emp_contact", digitsOnly);
            assign("address", c.address);
            assign("website", c.website);
            assign("description", c.description);
            if (c.company_size) payload.company_size = c.company_size;
            if (c.state_c !== undefined && c.state_c !== "") payload.state_c = Number(c.state_c);
            if (c.city_c !== undefined && c.city_c !== "") payload.city_c = Number(c.city_c);
            if (typeof c.domain === "string") {
                const arr = c.domain
                    .split(",")
                    .map((v) => Number(v.trim()))
                    .filter((n) => Number.isFinite(n));
                if (arr.length) payload.domain = arr;
            } else if (Array.isArray(c.domain)) {
                const arr = c.domain
                    .map((v) => Number(v))
                    .filter((n) => Number.isFinite(n));
                if (arr.length) payload.domain = arr;
            }

            await axiosManager.patch(url, payload);
            setSuccess("Company updated successfully!");
            setErrors({ company: {}, error: null });
            navigate("/manager/companies", { state: { updated: "company" } });
        } catch (error) {
            const server = error.response?.data;
            if (server && typeof server === "object") {
                const normalized = {};
                Object.entries(server).forEach(([k, v]) => {
                    if (Array.isArray(v)) normalized[k] = v[0];
                    else if (typeof v === "string") normalized[k] = v;
                    else if (v && typeof v === "object") normalized[k] = JSON.stringify(v);
                });
                setErrors({ company: normalized, error: server.detail || null });
            } else {
                setErrors({ company: {}, error: "Failed to update company" });
            }
        }
    };

    return (
        <Container>
            <PageHeader title="Edit Company" />
            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <form onSubmit={handleFormSubmit}>
                    <Card sx={{ mb: 4, borderLeft: `6px solid ${theme.palette.info.main}` }}>
                        <CardContent>
                            <CompanyForm
                                form={form}
                                errors={errors}
                                handleCompanyInputChange={handleCompanyInputChange}
                            />
                        </CardContent>
                    </Card>
                    <Box display="flex" justifyContent="center" mt={4} gap={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="small"
                            sx={{ px: 6, py: 1.5, fontWeight: 600, fontSize: "1.1rem", background: theme.palette.primary.main, "&:hover": { background: theme.palette.primary.dark } }}
                        >
                            Update Company
                        </Button>
                    </Box>
                </form>
            )}
            {success && <Typography color="success.main">{success}</Typography>}
            {errors.error && <Typography color="error">{errors.error}</Typography>}
        </Container>
    );
}
