import theme  from "./theme";

// Reusable sx snippets (for any MUI Box, Button, etc.)
export const sxTokens = {
    card: {
        p: 2,
        borderRadius: theme.shape.borderRadius,
    },
    header: {
        fontWeight: 700,
        color: 'primary.main',
    },
    mutedText: {
        color: 'text.secondary',
    },
};

export const tableStyles = {
     headCells: {
        style: {
            fontWeight: 700,
            fontSize: "1rem",
            background: theme.palette.primary.light,
            // color: theme.palette.primary.darkText,
            color: "green",
        },
    },
    rows: {
        style: {
            fontSize: "1rem",
            minHeight: "56px",
        },
    },
    cells: {
        style: {
        paddingTop: '12px',
        paddingBottom: '12px',
        },
  },
};

export const buttonStyles = {
  primary: {
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius,
    bgcolor: 'primary.main',
    color: 'common.white',
    '&:hover': { bgcolor: 'primary.dark' },
  },
  secondary: {
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius,
    bgcolor: 'secondary.main',
    color: 'common.white',
    '&:hover': { bgcolor: 'secondary.dark' },
  },
};