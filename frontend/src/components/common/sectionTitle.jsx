import React from "react";
// import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import {Typography} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
function SectionTitle({icon, title,  link}){
    console.log(icon);
    console.log(title);
    console.log(link);
    return (
        <>
            <div style={{ display: 'flex', justifyContent:'space-between', alignItems: 'right'}}>
                <Typography variant="h5" gutterBottom>{icon} {title} </Typography>
                <Button component={Link} to={link} endIcon={<ArrowForwardIosIcon/>} variant="outlined" style={{ textTransform: 'none' }}> View More</Button>
            </div>
        </>
    )
}

SectionTitle.propTypes = {
    icon: PropTypes.element.isRequired, // Icon component
    title: PropTypes.string.isRequired, // Title string
    link: PropTypes.string.isRequired, // URL string
};

export default SectionTitle;