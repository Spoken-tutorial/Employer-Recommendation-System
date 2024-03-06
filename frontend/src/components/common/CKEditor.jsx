/* eslint-disable react/prop-types */
import React from "react";
import { Typography } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function CKEditorBox({ label, data, setData }) {
  return (
    <>
      <Typography
        gutterBottom
        sx={{ mt: "3rem", mb: "0.8rem", opacity: "60%" }}
      >
        {label}
      </Typography>
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onReady={() => {}}
        onChange={(event, editor) => {
          setData(editor.getData());
        }}
      />
    </>
  );
}

export default CKEditorBox;
