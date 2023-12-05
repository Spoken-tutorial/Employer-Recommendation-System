import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  testimonialList1,
  testimonialList2,
} from "../../constants/testimonials";
import TitleAndVideo from "./title&video";

function TestimonialsSection() {
  return (
    <>
      <Box sx={{ marginTop: "2rem", p: "1rem", marginBottom: "2rem" }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bolder",
            color: "#002648",
            fontSize: { xs: "2rem" },
          }}
        >
          Testimonials
        </Typography>
        <Divider
          sx={{
            backgroundColor: "#000000",
            mt: "0.3rem",
          }}
        ></Divider>

        {/* first event  */}
        <TitleAndVideo
          data={testimonialList1}
          defaultExpand={true}
        ></TitleAndVideo>
        {/* second event */}
        <TitleAndVideo
          data={testimonialList2}
          defaultExpand={false}
        ></TitleAndVideo>
        {/* third */}
        <TitleAndVideo
          data={testimonialList1}
          defaultExpand={false}
        ></TitleAndVideo>
      </Box>
    </>
  );
}

export default TestimonialsSection;
