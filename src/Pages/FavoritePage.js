import { Grid, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import FavList from "../Components/FavoriteComponents/FavList";
import Clouds from "../clouds";

const useStyles = makeStyles((theme) => ({
  grid: {
    display: "flex",
    flexDirection: "column",
    padding: "30px",
    justifyContent: "space-around",
    alignItems: "center",
    flexGrow: 1,
    minHeight: "95vh",
  },
}));

const FavoritePage = ({ setSearchCurrentLoaction }) => {
  const FavoriteReducer = useSelector((state) => state.FavoriteReducer);
  const { favorites, loading } = FavoriteReducer;

  const ThemeReducer = useSelector((state) => state.ThemeReducer);
  const { themeState } = ThemeReducer;

  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.grid} spacing={3}>
        <Grid className={classes.clouds}>
          <Clouds themeState={themeState} />
        </Grid>
        <Grid>
          <FavList
            FavoriteData={favorites}
            themeState={themeState}
            loading={loading}
            setSearchCurrentLoaction={setSearchCurrentLoaction}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default FavoritePage;
