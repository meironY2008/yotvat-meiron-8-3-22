import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { primary, secondary } from "../../Colors";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import SearchBox from "../MainComponents/SearchBox";
import { ThemeAction } from "../../Actions/ThemeAction";
import SettingsBrightnessIcon from "@material-ui/icons/SettingsBrightness";
const useStyles = makeStyles((theme) => ({
  root: {
    // height: "100px",
    // flexGrow: 1,
    display: "flex",
    appbarpalette: {
      "&.MuiAppBar-colorPrimary": {
        backgroundColor: primary.backGroundColor,
      },
      "&.MuiAppBar-colorSecondary": {
        backgroundColor: secondary.backGroundColor,
      },
    },
  },

  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  right: {
    display: "flex",
    justifyContent: "flex-end",
    flexGrow: 1,
    lineHeight: 1.6,
    alignItems: "center",
  },
  fav: {
    display: "block",
    color: "white",
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
  },
  homeIcon: {
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    color: primary.whiteColor,
    fontSize: "35px",
    justifyContent: "center",
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    "&.homeIcon-heightPrimary": {
      height: "#100%",
      fontSize: "large",
      color: "primary",
    },
    "&.homeIcon-heightSecondary": {
      height: "#100%",
    },
  },
  search: {
    position: "relative",

    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(11),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  // inputInput: {
  //   padding: theme.spacing(1, 1, 1, 0),
  //   paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  //   transition: theme.transitions.create("width"),
  //   width: "100%",
  //   [theme.breakpoints.up("sm")]: {
  //     width: "12ch",
  //     "&:focus": {
  //       width: "20ch",
  //     },
  //   },
  // },
}));

export default function SearchAppBar({ setSearchCurrentLoaction }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [themeSelected, setThemeSelected] = useState("secondary");
  const ThemeReducer = useSelector((state) => state.ThemeReducer);
  const { themeState } = ThemeReducer;
  const changeTheme = () => {
    if (themeSelected === "primary") setThemeSelected("secondary");
    else setThemeSelected("primary");

    dispatch(ThemeAction(themeSelected));
  };

  return (
    <div className={classes.root}>
      <AppBar
        color={themeState}
        classes={{
          colorPrimary: classes.appbarpalette,
          colorSecondary: classes.appbarpalette,
        }}
        position="static"
      >
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Weather Assignment
          </Typography>

          <div className={classes.right}>
            <SearchBox />
            <Link
              style={{ textDecoration: "none" }}
              to={"/favorite"}
              onClick={() => setSearchCurrentLoaction(true)}
            >
              <IconButton>
                <FavoriteIcon style={{ color: primary.whiteColor }} />
              </IconButton>
            </Link>

            <Link style={{ textDecoration: "none" }} to={"/"}>
              <IconButton>
                <HomeIcon style={{ color: primary.whiteColor }} />
              </IconButton>
            </Link>
            <IconButton
              color="inherit"
              onClick={() => {
                changeTheme();
              }}
            >
              <SettingsBrightnessIcon fontSize="large" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
