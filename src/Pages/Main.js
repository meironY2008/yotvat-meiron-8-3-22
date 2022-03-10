import {
  Box,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Switch,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import CurrentCity from "../Components/MainComponents/CurrentCity";
import { useEffect, useState } from "react";
import { CityAction, currentCity } from "../Actions/CityAction";
import { ForeCastAction } from "../Actions/ForeCastAction";
import ForeCastList from "../Components/MainComponents/ForeCastList";
import FavFeatures from "../Components/MainComponents/FavFeatures";
import Message from "../Components/Message";
import Clouds from "../clouds";
import { GeoAction } from "../Actions/GeopositionAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import { primary } from "../Colors";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";

const useStyles = makeStyles((theme) => ({
  grid: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    minHeight: "100vh",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "fit-content",
    justifyContent: "center",

    overflow: "hidden",
    [theme.breakpoints.down(700)]: {
      borderStyle: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },

  boxpalette: {
    "&.MuiBox-root-colorPrimary": {
      borderColor: "black",
    },
    "&.MuiBox-root-colorSecondary": {
      backgroundColor: "white",
    },
  },
  favBox: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down(700)]: {
      marginLeft: 0,
      marginBottom: "0",
    },
  },
  upper: {
    display: "flex",
    padding: "1rem",
    justifyContent: "space-between",
    zIndex: 3000,

    [theme.breakpoints.down(700)]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  currentCity: {
    marginLeft: "2rem",
    [theme.breakpoints.down(700)]: {
      marginLeft: "0",
    },
  },
  clouds: {
    [theme.breakpoints.down(700)]: {
      display: "none",
    },
  },
  switch: {
    marginLeft: "30px",
    width: "fit-content",
    padding: 0,
    [theme.breakpoints.down(700)]: {
      marginLeft: "0",
    },
  },
  headline: {
    paddingBottom: "10px",
    textAlign: "center",
  },
}));

const Main = ({ searchCurrentLoaction, setSearchCurrentLoaction }) => {
  const ThemeReducer = useSelector((state) => state.ThemeReducer);
  const { themeState } = ThemeReducer;

  const classes = useStyles();
  const dispatch = useDispatch();

  const GetCityReducer = useSelector((state) => state.GetCityReducer);
  const { getCityError, data } = GetCityReducer;

  const CurrentCityReducer = useSelector((state) => state.CurrentCityReducer);
  const { id, city } = CurrentCityReducer;

  const ForeCastReducer = useSelector((state) => state.ForeCastReducer);
  const { ForecastError, foreData, loadingforeCast } = ForeCastReducer;

  const FavoriteReducer = useSelector((state) => state.FavoriteReducer);
  const { favorites } = FavoriteReducer;

  const GeoReducer = useSelector((state) => state.GeoReducer);
  const { geoData } = GeoReducer;

  const [metric, setMetric] = useState(true);
  let isThisCityIsFav = false;

  if (favorites.some((item) => item.id === id)) {
    isThisCityIsFav = true;
  }
  useEffect(() => {
    if (window.location.href.indexOf("/city/") == -1 || searchCurrentLoaction) {
      if (geoData) dispatch(currentCity(geoData.Key, geoData.LocalizedName));
    }
  }, [geoData]);

  const searchMyLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      dispatch(GeoAction(position.coords.latitude, position.coords.longitude));
    });
  };

  useEffect(() => {
    searchMyLocation();
  }, []);
  useEffect(() => {
    if (searchCurrentLoaction) searchMyLocation();
  }, [searchCurrentLoaction]);

  useEffect(() => {
    dispatch(CityAction(id, city));
    dispatch(ForeCastAction(id, city, metric));
    setSearchCurrentLoaction(false);
  }, [id, CurrentCityReducer]);

  useEffect(() => {
    dispatch(ForeCastAction(id, city, metric));
  }, [metric]);
  let color;
  themeState === "primary" ? (color = primary.BlueColor) : (color = "black");
  return (
    <div>
      {getCityError ? (
        <Message variant="error" children={getCityError} />
      ) : ForecastError ? (
        <Message variant="error" children={ForecastError} />
      ) : (
        ""
      )}

      {/*  main grid */}

      <Grid container className={classes.grid} spacing={6}>
        <Grid className={classes.clouds}>
          <Clouds themeState={themeState} />
        </Grid>
        <Box
          className={classes.box}
          color={themeState}
          classes={{
            colorPrimary: classes.box.boxpalette,
            colorSecondary: classes.box.boxpalette,
          }}
        >
          {/* container for upper components */}
          <Grid container className={classes.upper}>
            <Grid
              className={classes.currentCity}
              style={{ display: "flex", flexDirection: "row" }}
              item
            >
              <Grid>
                <IconButton onClick={() => setSearchCurrentLoaction(true)}>
                  <LocationOnRoundedIcon
                    color={themeState == "primary" ? "primary" : "default"}
                  />
                </IconButton>
              </Grid>
              <FormControlLabel
                className={classes.switch}
                control={
                  <Switch
                    checked={metric}
                    onChange={() => setMetric(!metric)}
                    name="metric"
                    color={themeState == "primary" ? "primary" : "default"}
                  />
                }
                label={metric ? <span> &#8451; </span> : <span>&#8457;</span>}
              />
            </Grid>

            {/* add to fav grid item */}

            <Grid item className={classes.favBox}>
              <FavFeatures
                id={id}
                city={city}
                isThisCityIsFav={isThisCityIsFav}
                color={color}
              />
              {data && data.length > 0 ? (
                <CurrentCity
                  cityName={city}
                  current={
                    metric
                      ? data[0].Temperature.Metric.Value
                      : data[0].Temperature.Imperial.Value
                  }
                  color={color}
                  label={metric ? <span> &#8451; </span> : <span>&#8457;</span>}
                />
              ) : (
                <CircularProgress />
              )}
            </Grid>
          </Grid>

          <Grid
            item
            style={{
              gridGap: "3",
              justifyContent: "center",
              display: "flex",
            }}
          >
            {/*component that calls list of cards   */}
            {!loadingforeCast && foreData ? (
              <div>
                <ForeCastList
                  data={foreData.DailyForecasts}
                  loading={loadingforeCast}
                  themeState={themeState}
                />
                <Box className={classes.headline}>
                  {" "}
                  <Typography style={{ color: color, fontWeight: "700" }}>
                    {foreData.Headline.Text}{" "}
                  </Typography>
                </Box>
              </div>
            ) : ForecastError ? (
              <Message variant="error" children={ForecastError} />
            ) : (
              <CircularProgress />
            )}
          </Grid>
        </Box>
      </Grid>
    </div>
  );
};

export default Main;
