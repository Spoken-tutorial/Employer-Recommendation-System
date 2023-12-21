import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddProjectModal from "./addProjectModal";
import UpdateProjectModal from "./updateProjectModal";
//for score table
function StudentProfile() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("C", 40.0, "Feb. 12, 2020, 5:58 a.m."),
    createData("Cpp", 80.32, "Feb. 12, 2020, 9:03 a.m."),
    createData("Python 3.4.3", 66.0, "May. 5, 2021, 08:15 a.m."),
    createData("RDBMS PostgreSQL", 70.0, "Aug. 11, 2021, 12:28 p.m."),
    createData("PHP and MYSQL", 44.46, "Oct. 8, 2021, 7:53 a.m."),
  ];

  //for multi select skills
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const skillsList = [
    "Frontend",
    "Backend",
    "Graphics/Animation",
    "Content Writing",
  ];
  //for upload button
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  function getStyles(name, skillName, theme) {
    return {
      fontWeight:
        skillName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();
  const [skillName, setSkillName] = React.useState([]);

  const handleSkillChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkillName(
      // On autofill we get a stringified value.
      // eslint-disable-next-line prettier/prettier
      typeof value === "string" ? value.split(",") : value
    );
  };
  //for projects
  const [projects, setProjects] = useState([]);
  const [projectEdit, setProjectEdit] = useState(false);
  const [projectEditIndex, setProjectEditIndex] = useState(-1);

  const handleProjectDelete = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };
  const handleProjectEdit = (index) => {
    setProjectEditIndex(index);
    setProjectEdit(true);
  };
  return (
    <Box
      sx={{ marginTop: "2rem", p: "1rem", marginBottom: "2rem" }}
      id="events"
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: "bolder",
          color: "#002648",
          fontSize: { xs: "2rem" },
        }}
      >
        Student Profile
      </Typography>
      <Divider
        sx={{
          backgroundColor: "#000000",
          mt: "0.3rem",
        }}
      ></Divider>
      {/* name email box */}
      <Box
        sx={{
          mt: "2rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "flex-start",
          width: { xs: "100%", md: "73%" },
        }}
      >
        <TextField
          id="studentName"
          label="Name"
          variant="outlined"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value="Namrata Badge"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
            width: { xs: "auto", md: "24rem" },
          }}
        />
        <TextField
          id="studentEmail"
          label="Email"
          variant="outlined"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value="namratabadgr2000@gmail.com"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
            ml: { xs: 0, md: "3rem" },
            mt: { xs: "2rem", md: 0 },
            width: { xs: "auto", md: "24rem" },
          }}
        />
      </Box>
      {/* table alert */}
      <Alert
        severity="info"
        sx={{ mt: "2rem", width: { xs: "100%", md: "73%" } }}
      >
        Spoken Tutorial Test Scores
      </Alert>
      {/* table */}
      <TableContainer
        component={Paper}
        sx={{ mt: "0.5rem", width: { xs: "100%", md: "73%" } }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Foss</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Grade</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Test Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.calories}</TableCell>
                <TableCell align="left">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* phone alternate email box */}
      <Box
        sx={{
          mt: "2.5rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "flex-start",
          width: { xs: "100%", md: "73%" },
        }}
      >
        <TextField
          id="studentPhone"
          label="Phone"
          variant="outlined"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value="7865467876"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
            width: { xs: "auto", md: "24rem" },
          }}
        />
        <TextField
          id="studentAlternateEmail"
          label="Alternate Email"
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
            ml: { xs: 0, md: "3rem" },
            mt: { xs: "2rem", md: 0 },
            width: { xs: "auto", md: "24rem" },
          }}
        />
      </Box>
      {/* address box */}
      <Box
        sx={{
          mt: "2rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "flex-start",
          width: { xs: "100%", md: "73%" },
        }}
      >
        <TextField
          id="studentAddress"
          label="Address"
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          value="123, ABC Street, XYZ Nagar, New Delhi, Delhi, 110001, India"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
          }}
        />
      </Box>
      {/* aboutyourself box */}
      <Box
        sx={{
          mt: "2rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "flex-start",
          width: { xs: "100%", md: "73%" },
        }}
      >
        <TextField
          id="studentAbout"
          label="About Yourself"
          variant="outlined"
          size="small"
          fullWidth
          multiline
          rows={4}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
          }}
        />
      </Box>
      {/* mcq box1 */}
      <Box
        sx={{
          mt: "2rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "flex-start",
          width: { xs: "100%", md: "73%" },
        }}
      >
        <FormControl>
          <FormLabel
            htmlFor="studentJoinImmediately"
            sx={{
              "&.Mui-focused": {
                color: "#002648",
              },
            }}
          >
            If offered a job, will you be able to join immediately?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="yes"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#002648",
                    },
                  }}
                />
              }
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#002648",
                    },
                  }}
                />
              }
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {/* mcq box2 */}
      <Box
        sx={{
          mt: "2rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "flex-start",
          width: { xs: "100%", md: "73%" },
        }}
      >
        <FormControl>
          <FormLabel
            htmlFor="studentJoinImmediately"
            sx={{
              "&.Mui-focused": {
                color: "#002648",
              },
            }}
          >
            Are you interested for an internship?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="studentJoinImmediately"
          >
            <FormControlLabel
              value="yes"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#002648",
                    },
                  }}
                />
              }
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#002648",
                    },
                  }}
                />
              }
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {/* check box */}
      <Box
        sx={{
          mt: "2rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "flex-start",
          width: { xs: "100%", md: "73%" },
        }}
      >
        <FormControl>
          <FormLabel
            htmlFor="studentJoinImmediately"
            sx={{
              "&.Mui-focused": {
                color: "#002648",
              },
            }}
          >
            Are you willing to relocate based on job requirement?
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="No"
              sx={{
                "& .Mui-checked": {
                  color: "#002648!important",
                },
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Within the state"
              sx={{
                "& .Mui-checked": {
                  color: "#002648!important",
                },
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Anywhere in India"
              sx={{
                "& .Mui-checked": {
                  color: "#002648!important",
                },
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Overseas"
              sx={{
                "& .Mui-checked": {
                  color: "#002648!important",
                },
              }}
            />
          </FormGroup>
        </FormControl>
      </Box>
      {/* multiselect skills box */}
      <Box
        sx={{
          mt: "2rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "flex-start",
          width: { xs: "100%", md: "73%" },
        }}
      >
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="studentSkills">Skills</InputLabel>
          <Select
            labelId="studentSkills"
            id="studentSkillsSelect"
            multiple
            value={skillName}
            onChange={handleSkillChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    sx={{ backgroundColor: "#002648", color: "#ffffff" }}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {skillsList.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, skillName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* Add project box */}
      <Alert
        severity="info"
        sx={{ mt: "2rem", width: { xs: "100%", md: "73%" } }}
      >
        Project Work & Experience (Max 5 projects can be added)
      </Alert>

      <AddProjectModal
        projects={projects}
        setProjects={setProjects}
      ></AddProjectModal>
      {projectEdit == true ? (
        <UpdateProjectModal
          projects={projects}
          setProjects={setProjects}
          index={projectEditIndex}
          show={projectEdit}
          setProjectEdit={setProjectEdit}
        ></UpdateProjectModal>
      ) : null}
      <Box sx={{ mt: "1rem", width: { xs: "100%", md: "73%" } }}>
        {projects.map((project, index) => (
          <>
            <Chip
              sx={{
                color: "#ffffff",
                backgroundColor: "#002648",
                p: "1",

                mr: "0.5rem",
                mt: "0.5rem",
                mb: "0.5rem",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "#002648",
                },
              }}
              size="small"
              key={index}
              label={project.url}
              onClick={() => {
                handleProjectEdit(index);
              }}
              onDelete={() => {
                handleProjectDelete(index);
              }}
              deleteIcon={
                <DeleteIcon
                  sx={{
                    color: "#ffffff!important",
                    "&:hover": {
                      scale: "1.1",
                    },
                  }}
                ></DeleteIcon>
              }
            />
          </>
        ))}
      </Box>

      {/* certification box */}
      <Box
        sx={{
          mt: "2rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "flex-start",
          width: { xs: "100%", md: "73%" },
        }}
      >
        <TextField
          id="studentCertification"
          label="Certifications"
          variant="outlined"
          size="small"
          fullWidth
          multiline
          rows={2}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
          }}
        />
      </Box>

      {/* linkedIn github box */}
      <Box
        sx={{
          mt: "2.5rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "flex-start",
          width: { xs: "100%", md: "73%" },
        }}
      >
        <TextField
          id="studentLinkedin"
          label="LinkedIn"
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
            width: { xs: "auto", md: "24rem" },
          }}
        />
        <TextField
          id="studentGithub"
          label="Github"
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#002648",
              },
            },
            "& label.Mui-focused": {
              color: "#002648",
            },
            ml: { xs: 0, md: "3rem" },
            mt: { xs: "2rem", md: 0 },
            width: { xs: "auto", md: "24rem" },
          }}
        />
      </Box>
      {/* cover letter and resume box */}
      <Box
        sx={{
          mt: "2.5rem",
          display: "flex",
          flexDirection: { xs: "column", md: "column" },
          justifyContent: "flex-start",
          width: { xs: "100%", md: "73%" },
        }}
      >
        <Alert
          severity="info"
          sx={{ mt: "0rem", width: { xs: "100%", md: "100%" } }}
        >
          Upload only (.pdf) file
        </Alert>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mb: "1rem",
            mt: "0.5rem",
          }}
        >
          <FormLabel
            htmlFor="studentJoinImmediately"
            sx={{
              "&.Mui-focused": {
                color: "#002648",
              },
            }}
          >
            Cover Letter
          </FormLabel>
          <Button
            component="label"
            variant="outlined"
            size="small"
            startIcon={<CloudUploadIcon />}
            sx={{
              color: "#054C77",
              borderColor: "#054C77",
              width: "6rem",
              mt: "0.5rem",
            }}
          >
            Upload
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormLabel
            htmlFor="studentJoinImmediately"
            sx={{
              "&.Mui-focused": {
                color: "#002648",
              },
            }}
          >
            Resume
          </FormLabel>
          <Button
            component="label"
            variant="outlined"
            size="small"
            startIcon={<CloudUploadIcon />}
            sx={{
              color: "#054C77",
              borderColor: "#054C77",
              width: "6rem",
              mt: "0.5rem",
            }}
          >
            Upload
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box>
      </Box>
      {/* Education details box */}
      <Box
        sx={{
          mt: "2.5rem",
          display: "flex",
          flexDirection: { xs: "column", md: "column" },
          justifyContent: "flex-start",
          width: { xs: "100%", md: "73%" },
        }}
      >
        <Alert
          severity="info"
          sx={{ mt: "0rem", width: { xs: "100%", md: "100%" } }}
        >
          Educational Details
        </Alert>
        {/* institute name & type */}
        <Box
          sx={{
            mt: "1rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <TextField
            id="studentInstituteName"
            label="Institute Name"
            variant="outlined"
            size="small"
            InputProps={{
              readOnly: true,
            }}
            value="Lorem Ipsum"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#002648",
                },
              },
              "& label.Mui-focused": {
                color: "#002648",
              },
              width: { xs: "auto", md: "24rem" },
            }}
          />
          <TextField
            id="studentInstituteType"
            label="Institute Type"
            variant="outlined"
            size="small"
            InputProps={{
              readOnly: true,
            }}
            value="Lorem Ipsum"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#002648",
                },
              },
              "& label.Mui-focused": {
                color: "#002648",
              },
              ml: { xs: 0, md: "3rem" },
              mt: { xs: "2rem", md: 0 },
              width: { xs: "auto", md: "24rem" },
            }}
          />
        </Box>
        {/* universityName & Degree */}
        <Box
          sx={{
            mt: "2.5rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <TextField
            id="studentUniversityName"
            label="University Name"
            variant="outlined"
            size="small"
            InputProps={{
              readOnly: true,
            }}
            value="Indian Institute of Technology"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#002648",
                },
              },
              "& label.Mui-focused": {
                color: "#002648",
              },
              width: { xs: "auto", md: "24rem" },
            }}
          />
          <TextField
            id="studentDegree"
            label="Degree"
            variant="outlined"
            size="small"
            InputProps={{
              readOnly: true,
            }}
            value="B.Tech"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#002648",
                },
              },
              "& label.Mui-focused": {
                color: "#002648",
              },
              ml: { xs: 0, md: "3rem" },
              mt: { xs: "2rem", md: 0 },
              width: { xs: "auto", md: "24rem" },
            }}
          />
        </Box>
        {/* admission year, state & city */}
        <Box
          sx={{
            mt: "2.5rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <TextField
            id="studentAdmissionYear"
            label="Admission Year"
            variant="outlined"
            size="small"
            InputProps={{
              readOnly: true,
            }}
            value="2021"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#002648",
                },
              },
              "& label.Mui-focused": {
                color: "#002648",
              },
              width: { xs: "auto", md: "24rem" },
            }}
          />
          <TextField
            id="studentState"
            label="State"
            variant="outlined"
            size="small"
            InputProps={{
              readOnly: true,
            }}
            value="Tamil Nadu"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#002648",
                },
              },
              "& label.Mui-focused": {
                color: "#002648",
              },
              ml: { xs: 0, md: "3rem" },
              mt: { xs: "2rem", md: 0 },
              width: { xs: "auto", md: "24rem" },
            }}
          />
          <TextField
            id="studentCity"
            label="City"
            variant="outlined"
            size="small"
            InputProps={{
              readOnly: true,
            }}
            value="Chennai"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#002648",
                },
              },
              "& label.Mui-focused": {
                color: "#002648",
              },
              ml: { xs: 0, md: "3rem" },
              mt: { xs: "2rem", md: 0 },
              width: { xs: "auto", md: "24rem" },
            }}
          />
        </Box>
      </Box>
      {/* update button */}
      <Button
        size="small"
        variant="contained"
        sx={{
          backgroundColor: "#054C77",
          color: "#ffffff",
          mt: "1.5rem",
          p: 1,

          fontSize: {
            xs: "0.7rem",
          },
          "&:hover": {
            color: "#ffffff",
            backgroundColor: "#002648",
          },
        }}
      >
        Update Profile
      </Button>
    </Box>
  );
}

export default StudentProfile;
