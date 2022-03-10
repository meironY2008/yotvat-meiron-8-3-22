import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentCity } from "../../Actions/CityAction";
import { SearchAction } from "../../Actions/SearchAction";
import Message from "../Message";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    // transition: theme.transitions.create("width"),
    // width: "100%",
    "&:invalid": {
      border: "red solid 2px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "35vh",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    lineHeight: "1.6",
    justifyContent: "center",
  },
  search: {
    position: "relative",
    border: "2px groove rgba(28,110,164,0.15)",
    // borderRadius: '40px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  autocomplete: {
    backgroundColor: "#d0e0c0",
    padding: "2px 5px 2px 0px",
    // listsstyle
    minWidth: "100%",
    position: "absolute",
    top: "100%",
    left: "0",
    border: "1px solid #b6c1ce",
    borderRadius: "0px 0px 5px 5px",
    margin: "0",
    boxSizing: "border-box",
    maxHeight: "150px",
    overflowY: "auto",
    zIndex: "0",
    display: "flex",
    flexDirection: "column",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 5px grey",
      borderRadius: 15,
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#028a0f",
      borderRadius: 15,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#12ca3f",
    },
  },
  autoItem: {
    boxSizing: "border-box",
    margin: 0,
    borderBottom: "1px solid #808080",
    color: "#028a0f",
    cursor: "pointer",
    "&:hover": {
      background: "#028a0f",
      color: "#d0e0c0",
    },
  },
  input: {
    "&:invalid": {
      border: "red solid 2px",
    },
  },
}));

const SearchBox = () => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState();
  const [visibile, setVisible] = useState(false);
  const dispatch = useDispatch();

  const {
    control,
    register,
    formState: { errors },
  } = useForm({
    mode: "all",
    rules: { required: true },
  });
  const SearchReducer = useSelector((state) => state.SearchReducer);
  const { SearchError, data } = SearchReducer;

  function onlyLettersAndSpaces(str) {
    return /^[A-Za-z\s]*$/.test(str);
  }

  const dispatchSearch = useCallback(() => {
    if (keyword && onlyLettersAndSpaces(keyword)) {
      dispatch(SearchAction(keyword));
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [keyword]);

  useEffect(() => {
    dispatchSearch();
  }, [keyword, dispatchSearch]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleClick = (e) => {
    setKeyword(e);

    dispatch(currentCity(data[0].Key, e));
    setKeyword(null);
    setVisible(false);
  };

  return (
    <div className={classes.search}>
      {SearchError ? <Message variant="error" children={SearchError} /> : ""}
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>

      <Controller
        name={"search"}
        control={control}
        render={({ search }) => (
          <InputBase
            {...search}
            placeholder="Search for a city..."
            value={keyword}
            name="search"
            autoComplete="off"
            inputProps={{
              className: classes.input,
              // pattern: '/^[a-zA-Z]+$/',
            }}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            {...register("search", {
              pattern: {
                value: /^[a-zA-Z_]+[ a-zA-Z_]*$/,
                message: "Only English letters is allowed",
              },
            })}
            onChange={handleChange}
          />
        )}
      />

      {keyword != "" &&
      data &&
      data.length &&
      data.length > 0 &&
      visibile === true ? (
        <ul className={classes.autocomplete}>
          {data.map((item, index) => (
            <p
              onClick={() => handleClick(item.LocalizedName)}
              key={item.key}
              className={classes.autoItem}
            >
              {item.LocalizedName}
            </p>
          ))}
        </ul>
      ) : (
        ""
      )}
      <ErrorMessage errors={errors} name="search" />
    </div>
  );
};

export default SearchBox;
