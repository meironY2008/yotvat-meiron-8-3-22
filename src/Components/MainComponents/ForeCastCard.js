import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "270px",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    // alignItems: "center",
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
    // marginBottom: "auto",
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

const ForeCastCard = ({ data, themeState }) => {
  function dayOfWeekAsString(dayIndex) {
    return (
      [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ][dayIndex] || ""
    );
  }

  const classes = useStyles();
  let date = new Date(data.Date);
  let index = date.getDay();
  let day = dayOfWeekAsString(index);
  let temperature =
    (data.Temperature.Minimum.Value + data.Temperature.Maximum.Value) / 2;
  temperature = temperature.toFixed(0);
  let unit = data.Temperature.Minimum.Unit;
  let unitText;
  if (unit === "C") {
    unitText = <span> &#8451; </span>;
  } else {
    unitText = <span>&#8457;</span>;
  }
  return (
    <Grid className={classes.root}>
      <Box className={classes.title}>{day}</Box>
      <Box className={classes.text}>
        <span
          className={
            themeState == "primary"
              ? classes.textWeather
              : classes.textWeatherDark
          }
        >
          {temperature}
        </span>
        <span className={classes.textUnit}>{unitText}</span>
      </Box>
      <Box className={classes.infoText}>
        {data.Day.ShortPhrase.split(";")[0]}
      </Box>
    </Grid>
  );
};

export default ForeCastCard;
