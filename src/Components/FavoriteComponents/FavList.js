import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FavCard from "./FavCard";
import { FavCityAction } from "../../Actions/CityAction";

import { Slide } from "@material-ui/core";
import Message from "../Message";
import CircularProgerss from "@material-ui/core/CircularProgress";
import { secondary, primary } from "../../Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    display: "flex",
    padding: "12px",
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
  darkPaper: {
    background: "rgba(38, 42, 42, 0.16)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10.3px)",
    webkitBackdropFilter: "blur(10.3px)",
    border: " 1px solid rgba(38, 42, 42, 0.7)",
    // backgroundColor: secondary.backGroundColor,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: "100px",
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(2),
    overflow: "hidden",
    minWidth: "140px",
    width: "100%",
    [theme.breakpoints.down(470)]: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
    },
  },
  paper: {
    background: "rgba(151, 245, 248, 0.28)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(4.9px)",
    webkitBbackdropFilter: "blur(4.9px)",
    border: "1px solid rgba(151, 245, 248, 0.7)",
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#3f51b5",
    minHeight: "100px",
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(2),
    overflow: "hidden",
    minWidth: "140px",
    width: "100%",
    [theme.breakpoints.down(470)]: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
    },
  },
}));

const FavList = ({
  FavoriteData,
  loading,
  themeState,
  setSearchCurrentLoaction,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  let GetFavCityReducer = useSelector((state) => state.GetFavCityReducer);
  let { FavCityError, FavData } = GetFavCityReducer;
  const GetResult = () =>
    FavoriteData.forEach((item) => {
      dispatch(FavCityAction(item.id, item.keyword));
    });

  useEffect(() => {
    GetResult();
  }, []);

  let paperClass;

  if (themeState === "primary") {
    paperClass = true;
  } else {
    paperClass = false;
  }
  return (
    <>
      {loading ? (
        <CircularProgerss />
      ) : FavCityError ? (
        <div>
          <Message variant="error" children={FavCityError} />
        </div>
      ) : (
        <div className={classes.root}>
          <Grid container className={classes.container} spacing={2}>
            {FavData ? (
              FavData.map((item) => (
                <Grid key={item.id} item>
                  <Slide in={true} style={{ transitionDelay: "75ms" }}>
                    <Paper
                      id={item.data[0].HasPrecipitation}
                      className={paperClass ? classes.paper : classes.darkPaper}
                    >
                      <FavCard
                        data={item}
                        color={paperClass}
                        setSearchCurrentLoaction={setSearchCurrentLoaction}
                      />
                    </Paper>
                  </Slide>
                </Grid>
              ))
            ) : (
              <CircularProgerss />
            )}
          </Grid>
        </div>
      )}
    </>
  );
};

export default FavList;
