import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  bg: {
    minHeight: "100vh",
    backgroundColor: "black",
    backgroundPosition: "top center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("sm")]: {
      height: "80vh",
    },
    alignItems:'center',
    justifyContent:'center',
    display:'flex'
  },
}));

const RouteError = () => {
    const classes = useStyles();
  return (
    <Box className={classes.bg}>
      <Typography
        component="h1"
        fontWeight={900}
        sx={{
          textShadow: "5px 5px 42px rgba(255,255,255, 0.7)",
          fontSize: { xs: 32, lg: 42 },
        }}
      >
        Error Routing 404
      </Typography>
    </Box>
  );
};

export default RouteError;
