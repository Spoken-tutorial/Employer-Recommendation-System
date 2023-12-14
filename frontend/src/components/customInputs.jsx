import { PropTypes } from "prop-types";
import InputLabel from "@mui/material/InputLabel";
export const CustomPhoneInput = (props) => {
  const { label, onChange } = props;
  const handleChange = (e) => {
    const { value } = e.target;
    if (/^(\+?[0-9]{6,12})$/.test(value)) {
      //   props.onChange(e);
      onChange(e);
    }
  };
  return (
    <>
      <InputLabel htmlFor="phone">{label}</InputLabel>
      <input onChange={handleChange} />
    </>
  );
};

CustomPhoneInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
