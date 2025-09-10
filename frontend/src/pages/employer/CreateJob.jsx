import { Box, Button, Card, CardContent, Container } from "@mui/material";
import { useTheme } from "@mui/material";
import JobForm from "../../components/common/JobForm";
import { useState } from "react";
import JobFiltersForm from "../../components/common/JobFiltersForm";

export default function CreateJob(){
    const theme = useTheme();
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    const handleFormSubmit = async (e) => {
    console.log("form");
    console.log(form);

    e.preventDefault();
    try {
      
    } catch (error) {
     
    }
  };

    return (
         <Container sx={{mt: 4}}>
            <form onSubmit={handleFormSubmit} mb={6}>
                <Card sx={{ mb: 4, borderLeft: `6px solid ${theme.palette.info.main}` }}>
                    <CardContent>
                        <JobForm form={form} errors={errors}/>
                    </CardContent>
                </Card>

                <Card sx={{ mb: 4, borderLeft: `6px solid ${theme.palette.success.main}` }}>
                    <CardContent>
                        <JobFiltersForm form={form} errors={errors} setForm={setForm}/>
                    </CardContent>
                </Card>

                
               <Box display="flex" justifyContent="center" mt={4} gap={2}>
                    <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{
                        px: 6,
                        py: 1.2,
                        fontWeight: 500,
                        fontSize: "0.8rem",
                        background: theme.palette.primary.main,
                        "&:hover": {
                        background: theme.palette.primary.dark,
                        },
                    }}
                    >
                    Save Job as Draft
                    </Button>

                    <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{
                        px: 6,
                        py: 1.2,
                        fontWeight: 500,
                        fontSize: "0.8rem",
                        background: theme.palette.primary.main,
                        "&:hover": {
                        background: theme.palette.primary.dark,
                        },
                    }}
                    >
                    Submit Job For Approval
                    </Button>
                </Box>
            </form>
         </Container>
    )
}