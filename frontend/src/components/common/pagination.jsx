/* eslint-disable react/prop-types */
import React from "react";
import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";

function PagePagination({ baseUrl, count }) {
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    navigate(baseUrl + value);
  };

  return (
    <Box sx={{ mt: "4rem", display: "flex", justifyContent: "center" }}>
      <Pagination count={count} onChange={handleChange} />
    </Box>
  );
}

export default PagePagination;
