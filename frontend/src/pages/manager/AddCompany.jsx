import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import CompanyForm from "../../components/common/CompanyForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosManager from "../../api/axiosManager";
import PageHeader from "../../components/common/PageHeader";

export default function ManagerAddCompany() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [form, setForm] = useState({ company: {} });
    const [errors, setErrors] = useState({ company: {} });
    const [success, setSuccess] = useState(null);

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
        // basic client-side validation for required fields
        const c = form.company || {};
        const clientErrors = { company: {} };
        if (!c.name?.trim()) clientErrors.company.name = "Company name is required";
        if (!c.emp_name?.trim()) clientErrors.company.emp_name = "HR representative name is required";
        if (!c.address?.trim()) clientErrors.company.address = "Address is required";
        // match phone to backend regex
        let phoneRaw = (c.emp_contact || '').toString().trim();
        const digitsOnly = phoneRaw.replace(/\D/g, '');
        if (!(digitsOnly.length >= 9 && digitsOnly.length <= 15)) {
            clientErrors.company.emp_contact = "Enter a valid phone number (9 to 15 digits)";
        }
        // show client errors and stop
        if (Object.keys(clientErrors.company).length) {
            setErrors(clientErrors);
            return;
        }
        try {
            const url = "admin/manager/companies/add";
            // CompanySerializer expects flat fields; map only known values
            const phone = digitsOnly; // normalized numeric string that satisfies regex

            const payload = {
                name: c.name,
                emp_name: c.emp_name,
                emp_contact: phone,
                state_c: c.state_c ? Number(c.state_c) : null,
                city_c: c.city_c ? Number(c.city_c) : null,
                address: c.address,
                email: c.email,
                description: c.description,
                website: c.website,
                // domain: expects list of IDs; leaving out for now unless provided as array of numbers
            };
            // only send company_size if chosen; otherwise let model default apply
            if (c.company_size) payload.company_size = c.company_size;
            if (typeof c.domain === 'string') {
                const arr = c.domain.split(',').map((v) => Number(v.trim())).filter((n) => Number.isFinite(n));
                if (arr.length) payload.domain = arr;
            } else if (Array.isArray(c.domain)) {
                payload.domain = c.domain.filter((v) => Number.isFinite(Number(v))).map((v) => Number(v));
            }
            await axiosManager.post(url, payload);
            setSuccess("Company added successfully!");
            setErrors({ company: {} });
            navigate("/manager/companies", { state: { created: "company" } });
        } catch (error) {
            
            const server = error.response?.data;
            if (server && typeof server === 'object') {
                const normalized = {};
                Object.entries(server).forEach(([k, v]) => {
                    if (Array.isArray(v)) normalized[k] = v[0];
                    else if (typeof v === 'string') normalized[k] = v;
                    else if (v && typeof v === 'object') normalized[k] = JSON.stringify(v);
                });
                setErrors({ company: normalized, error: server.detail || null });
            } else {
                setErrors({ company: {}, error: "Failed to add company" });
            }
        }
    };

    return (
        <Container >
            <PageHeader title="Add Company" />
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
                    <Button type="submit" variant="contained" size="small" sx={{ px: 6, py: 1.5, fontWeight: 600, fontSize: "1.1rem", background: theme.palette.primary.main, "&:hover": { background: theme.palette.primary.dark } }}>Add Company</Button>
                </Box>
            </form>
            {success && <Typography color="success.main">{success}</Typography>}
            {errors.error && <Typography color="error">{errors.error}</Typography>}
        </Container>
    );
}
