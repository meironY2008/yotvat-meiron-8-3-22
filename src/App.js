import { HashRouter as Router, Route, Switch } from "react-router-dom";
import FavoritePage from "./Pages/FavoritePage";
import Main from "./Pages/Main";
import Header from "./Components/Header/Header";
// import Main from "./Pages/Main";
import React, { useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  rootApp: {
    backgroundColor: " rgb(120, 34, 21)",
    background:
      "linear-gradient(107deg,rgba(230, 226, 165, 1) 6%,rgba(236, 243, 245, 0.8211659663865546) 98%)",
  },
  darkRoot: {
    zIndex: "0",
    backgroundColor: "rgb(106, 112, 113)",
    background:
      "radial-gradient(circle,rgba(106, 112, 113, 1) 1%,rgba(160, 173, 177, 1) 62%,rgba(101, 105, 106, 0.8211659663865546) 98%)",
  },
}));
const Theme = {
  palette: {
    primary: {
      main: "#106532",
      backgroundColor: "#d5f5e5",
    },
    secondary: {
      main: "#222222",
      backgroundColor: "#dd2c00",
    },
  },
};

function App() {
  const [searchCurrentLoaction, setSearchCurrentLoaction] = useState(true);
  const ThemeReducer = useSelector((state) => state.ThemeReducer);
  const { themeState } = ThemeReducer;
  const classes = useStyles();
  const theme = createTheme(Theme);

  return (
    <div className={classes.rootApp}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid
          className={
            themeState === "primary" ? classes.rootApp : classes.darkRoot
          }
        >
          <Router>
            <Header setSearchCurrentLoaction={setSearchCurrentLoaction} />
            <Switch>
              <Route exact path="/">
                <Main
                  setSearchCurrentLoaction={setSearchCurrentLoaction}
                  searchCurrentLoaction={searchCurrentLoaction}
                />
              </Route>
              <Route path="/home/" exact>
                <Main
                  setSearchCurrentLoaction={setSearchCurrentLoaction}
                  searchCurrentLoaction={searchCurrentLoaction}
                />
              </Route>
              <Route path="/favorite/">
                <FavoritePage
                  setSearchCurrentLoaction={setSearchCurrentLoaction}
                />
              </Route>
              <Route path="/city" exact>
                <Main
                  setSearchCurrentLoaction={setSearchCurrentLoaction}
                  searchCurrentLoaction={searchCurrentLoaction}
                />
              </Route>
            </Switch>
          </Router>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
