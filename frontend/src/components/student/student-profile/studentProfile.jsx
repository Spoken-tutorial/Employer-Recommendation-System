import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormGroup from "@mui/material/FormGroup";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddProjectModal from "./addProjectModal";
import UpdateProjectModal from "./updateProjectModal";
import TestScores from "./testScores";
import EducationalDetails from "./educationalDetails";
import MultipleSelectInput from "../../common/MultipleSelectInput";
import AlertBox from "../../common/alertBox";
import CKEditorBox from "../../common/CKEditor";

//for score table
function StudentProfile() {
  const skillsList = [
    { id: 1, name: "Frontend" },
    { id: 1, name: "Backend" },
    { id: 1, name: "Graphics/Animation" },
    { id: 1, name: "Content Writing" },
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

  const [skillName, setSkillName] = React.useState([]);

  //for projects
  const [projects, setProjects] = useState([]);
  const [projectEdit, setProjectEdit] = useState(false);
  const [about, setAbout] = React.useState("");
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
      id="student-profile"
    >
      {/* page title and divider */}
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
      <AlertBox
        alertMessage={" Spoken Tutorial Test Scores"}
        alertType={"info"}
        style={{ mt: "2rem", width: { xs: "100%", md: "73%" } }}
      ></AlertBox>
      {/* table */}
      <TestScores />

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
          mt: "-1rem",
          display: "flex",
          flexDirection: { xs: "column", md: "column" },
          justifyContent: "flex-start",
          width: { xs: "100%", md: "73%" },
        }}
      >
        <CKEditorBox
          label="About Yourself"
          data={about}
          setData={setAbout}
        ></CKEditorBox>
      </Box>
      {/* mcq box1 */}
      <Box
        sx={{
          mt: "-0.5rem",
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
        sx={{ width: { xs: "100%", md: "44.5rem", lg: "51rem" }, mt: "2rem" }}
      >
        <MultipleSelectInput
          value={skillName}
          setValue={setSkillName}
          options={skillsList}
          id="studentSkills"
          label="Skills"
          size="medium"
        ></MultipleSelectInput>
      </Box>

      {/* Add project box */}
      <AlertBox
        alertMessage={"Project Work & Experience (Max 5 projects can be added)"}
        alertType={"info"}
        style={{ mt: "2rem", width: { xs: "100%", md: "73%" } }}
      ></AlertBox>
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
        <AlertBox
          alertMessage={"Upload only (.pdf) file"}
          alertType={"info"}
          style={{ mt: "0rem", width: { xs: "100%", md: "100%" } }}
        ></AlertBox>

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
      <EducationalDetails />
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
