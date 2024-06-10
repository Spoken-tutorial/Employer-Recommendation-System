import React from "react";
import { AppBar } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const StickyAppBar = ({appBarTitle, cancelBtnText, cancelLink, buttonsData }) => {

    console.log(buttonsData);
    return (
        <>
           <AppBar position="sticky" sx={{mb:6, backgroundColor: "#002648"}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{appBarTitle}</Typography>
                    <Button component={Link}  to={cancelLink} variant="contained" sx={{backgroundColor: "grey", mr: 1.5, mt: 1.5, mb: 1.5}} >{cancelBtnText}</Button>
                    {
                        buttonsData.map((item, index) => (
                            <Button key={index} variant="contained" color={item.color} sx={{ mr: 1.5,mt: 1.5, mb: 1.5 }} onClick={item.onClickHandler}>{item.btnText}</Button>
                        ))
                    }
                </Toolbar>
            </AppBar>  
        </>
    )

}

StickyAppBar.propTypes = {
    appBarTitle: PropTypes.string.isRequired,
    cancelBtnText: PropTypes.string,
    cancelLink: PropTypes.Link,
    buttonsData: PropTypes.array
}

// StickyAppBar.defaultProps = {
//     cancelBtnText: "Cancel"
// }

export default StickyAppBar;