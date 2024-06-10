import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
// import { TextField } from "@mui/material";
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
const CKEditorField = ({ value, onChange, name }) => {
    // const CKEditorField = ({ label, value, onChange, name }) => {

    const [ editorValue, setEditorValue ] = useState(value);

    useEffect(()=>{
        setEditorValue(value);
    }, [value]);

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorValue(data);
        if (onChange){
            onChange(name, data);
        }
    };

    return (
        <Box>
            {/* <TextField
                label={label}
                variant="outlined"
                value={editorValue}
                multiline
                fullWidth
                InputProps={{
                    readOnly: true, // Make TextField read-only
                }}
            /> */}
             <CKEditor
                editor={ClassicEditor}
                data={editorValue}
                onChange={handleEditorChange}
      />
        </Box>
    );
};

CKEditorField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    
  };

  export default CKEditorField;