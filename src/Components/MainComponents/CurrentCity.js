import { Box, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { primary, secondary } from "../../Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    display: "flex",
    padding: "12px",
    gap: "5px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    gridGap: theme.spacing(3),

    [theme.breakpoints.down(650)]: {
      gridGap: theme.spacing(1),
    },
  },
  gridItem: {
    appbarpalette: {
      "&.MuiPaper-elevation1": {
        backgroundColor: primary.backGroundColor,
      },
      "&.MuiPaper-root": {
        backgroundColor: secondary.backGroundColor,
      },
    },
  },
}));

const CurrentCity = ({ cityName, current, color, label }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography style={{ color: color, fontWeight: "700" }}>
        {cityName}
      </Typography>

      <Typography style={{ color: color, fontWeight: "700" }}>
        {current} <span>{label} </span>
      </Typography>
    </Box>
  );
};

export default CurrentCity;
