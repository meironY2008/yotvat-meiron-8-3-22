import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { currentCity } from "../../Actions/CityAction";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "270px",
    display: "flex",
    flexDirection: "column",
    minHeight: "180px",
    fontSize: "1rem",
    minWidth: "140px",
    textAlign: "center",

    [theme.breakpoints.down(500)]: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      height: "100%",
    },
    [theme.breakpoints.down(350)]: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      alignItems: "center",
      height: "100%",
    },
  },
  title: {
    fontWeight: "bolder",
  },
  text: {
    marginTop: "40%",
    fontSize: "35px",
    // marginBottom: "auto",
  },
  textUnit: {
    marginTop: "40%",
    fontSize: "15px",
  },
  infoText: {
    marginTop: "auto",
    fontSize: "11px",
  },
  textWeatherDark: {
    color: "rgba(243, 226, 199, 1)",
  },
  textWeather: {
    color: "rgba(22, 26, 99, 1)",
  },
}));

const FavCard = ({ data, setSearchCurrentLoaction, color }) => {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  let temperature = data.data[0].Temperature.Metric.Value;
  temperature = temperature.toFixed(0);
  const handleClick = (id, keyword) => {
    dispatch(currentCity(id, keyword));
    setSearchCurrentLoaction(false);
    history.push("/city/");
  };
  return (
    <Grid className={classes.root}>
      <div onClick={() => handleClick(data.id, data.keyword)}>
        <Box className={classes.title}> {data.keyword} </Box>
        <Box className={classes.text}>
          {" "}
          <span
            className={color ? classes.textWeather : classes.textWeatherDark}
          >
            {temperature}
          </span>
          <span className={classes.textUnit}> &#8451; </span>
        </Box>
        <Box className={classes.infoText}> {data.data[0].WeatherText} </Box>
      </div>
    </Grid>
  );
};

export default FavCard;
