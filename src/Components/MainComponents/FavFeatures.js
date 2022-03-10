import {
  addFavAction,
  removeFavAction,
  removeFavCityAction,
} from "../../Actions/FavoriteAction";
import { useDispatch } from "react-redux";
import { Grid, IconButton, makeStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  FavIcon: {
    color: "red",
  },
  text: {
    paddingRight: "10px",
    [theme.breakpoints.down(460)]: {
      display: "none",
    },
  },
}));

const FavFeatures = ({ id, city, isThisCityIsFav }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleFav = (e) => {
    dispatch(addFavAction(id, city));
  };

  const handleDEl = () => {
    dispatch(removeFavAction(id, city));
    dispatch(removeFavCityAction(id, city));
  };

  return (
    <Grid>
      {isThisCityIsFav ? (
        <IconButton
          className={classes.FavIcon}
          onClick={handleDEl}
          style={{ fontWeight: "700" }}
        >
          <FavoriteIcon />
        </IconButton>
      ) : (
        <IconButton
          // className={classes.FavIcon}
          onClick={handleFav}
          aria-label="FavoriteIcon"
        >
          <FavoriteIcon />
        </IconButton>
      )}
    </Grid>
  );
};

export default FavFeatures;
