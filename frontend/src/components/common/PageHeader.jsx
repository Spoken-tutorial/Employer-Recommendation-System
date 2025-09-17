// PageHeader.jsx
import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function PageHeader({
  title,
  titleIcon,
  btnText,
  btnIcon,
  onBtnClick,
}) {
  const theme = useTheme();

  return (
    <>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={3}
                sx={{background: theme.palette.primary.main, color: 'white', borderRadius: 1, p: 1, mb: 2, px: 2, py: 1.2}}
                >
                {/* Title + optional icon */}
                <Box display="flex" alignItems="center" gap={1}>
                    {titleIcon && <span>{titleIcon}</span>}
                    <Typography
                    variant="subtitle"
                    sx={{ fontWeight: 600, color: 'white' }}
                    >
                    {title}
                    </Typography>
                </Box>

                {/* Optional button */}
                {btnText && (
                    <Button
                    // variant="contained"
                    color="primary"
                    startIcon={btnIcon}
                    onClick={onBtnClick}
                    sx={{ fontWeight: 600, letterSpacing: 1,  background: 'white', color: theme.palette.primary.main,boxShadow: 0 }}
                    size="small"
                    >
                    {btnText}
                    </Button>
                )}
            </Box>
            <Divider/>
    </>
  );
}
