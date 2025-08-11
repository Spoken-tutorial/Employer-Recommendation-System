import { Box, Paper, Typography, Divider, Grid, Link, List, ListItem, ListItemIcon, ListItemText, Avatar } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import PersonIcon from "@mui/icons-material/Person";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupIcon from "@mui/icons-material/Group";
import { useTheme } from "@mui/material/styles";

// Dummy data
const company = {
  name: "TechCorp",
  domain: "techcorp.com",
  website: "https://www.techcorp.com",
  addedBy: {
    name: "Alice Smith",
    email: "alice@techcorp.com",
    contact: "+91-9876543210",
  },
  addedOn: "2024-07-01",
  approvedOn: "2024-07-05",
  approvedBy: "Admin User",
  totalJobs: 12,
  team: [
    { name: "Bob Johnson", email: "bob@techcorp.com", contact: "+91-9123456780" },
    { name: "Carol Lee", email: "carol@techcorp.com", contact: "+91-9988776655" },
  ],
};

export default function CompanyDetail() {
  const theme = useTheme();

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <BusinessIcon sx={{ color: theme.palette.primary.main }} /> {company.name}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
              <LanguageIcon sx={{ color: theme.palette.info.main, mr: 1, verticalAlign: "middle" }} />
              Domain: <span></span>
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, ml: 4 }}>
              {company.domain}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
              <LanguageIcon sx={{ color: theme.palette.info.main, mr: 1, verticalAlign: "middle" }} />
              Website:
            </Typography>
            <Link href={company.website} target="_blank" rel="noopener" sx={{ mb: 1, ml: 4, display: "flex", alignItems: "center", gap: 1 }}>
              {company.website}
            </Link>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
              <PersonIcon sx={{ color: theme.palette.secondary.main, mr: 1, verticalAlign: "middle" }} />
              Added By:
            </Typography>
            <Box sx={{ ml: 4 }}>
              <Typography variant="body1">{company.addedBy.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <EmailOutlinedIcon sx={{ color: theme.palette.info.main }} fontSize="small" /> {company.addedBy.email}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <PhoneIcon sx={{ color: theme.palette.success.main }} fontSize="small" /> {company.addedBy.contact}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
              <CalendarTodayIcon sx={{ color: theme.palette.warning.main, mr: 1, verticalAlign: "middle" }} />
              Added On:
            </Typography>
            <Typography variant="body2" sx={{ ml: 4 }}>
              {company.addedOn}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
              <CheckCircleIcon sx={{ color: theme.palette.success.main, mr: 1, verticalAlign: "middle" }} />
              Approved On:
            </Typography>
            <Typography variant="body2" sx={{ ml: 4 }}>
              {company.approvedOn}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
              <PersonIcon sx={{ color: theme.palette.primary.main, mr: 1, verticalAlign: "middle" }} />
              Approved By:
            </Typography>
            <Typography variant="body2" sx={{ ml: 4 }}>
              {company.approvedBy}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
              <BusinessIcon sx={{ color: theme.palette.primary.main, mr: 1, verticalAlign: "middle" }} />
              Total Jobs Added:
            </Typography>
            <Typography variant="body1" sx={{ ml: 4 }}>
              {company.totalJobs}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <GroupIcon sx={{ color: theme.palette.secondary.main }} /> Team Members
        </Typography>
        <List dense>
          {company.team.map((member, idx) => (
            <ListItem key={idx} sx={{ pl: 0 }}>
              <ListItemIcon>
                <Avatar sx={{ width: 28, height: 28, bgcolor: theme.palette.info.light }}>
                  <PersonIcon sx={{ color: theme.palette.info.dark }} fontSize="small" />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1">{member.name}</Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <EmailOutlinedIcon sx={{ color: theme.palette.info.main }} fontSize="small" /> {member.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <PhoneIcon sx={{ color: theme.palette.success.main }} fontSize="small" /> {member.contact}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}