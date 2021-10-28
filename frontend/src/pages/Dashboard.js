import * as React from "react";
import { makeStyles } from "@material-ui/core";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { useDispatch, useSelector } from "react-redux";

import Article from "../components/Article";
import Edit from "../components/Edit";

const useStyles = makeStyles((theme) => ({
  main: {
    margin: "5rem 2rem",
    maxWidth: "auto",
    overflow: "hidden",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [edit, setEdit] = React.useState(false);
  const [currentArticle, setArticle] = React.useState(false);
  const toggleEdit = (value) => {
    console.log("cambiamos el edit", value);
    setEdit(value);
  };
  const setCurrentArticle = (value) => {
    setArticle(value);
  };
  const newData = useSelector((state) => state.feeds.data) || [];
  console.log("despues", newData);
  React.useEffect(() => {
    dispatch.feeds.loadData();
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className={classes.main}>
        <Masonry columns={{ xs: 1, md: 3 }} spacing={2} defaultSpacing={2}>
          {newData?.map((article) => (
            <Article
              data={article}
              edit={toggleEdit}
              setCurrentArticle={setCurrentArticle}
            />
          ))}
        </Masonry>
      </Box>
      <Edit open={edit} toggle={toggleEdit} data={currentArticle} />
    </>
  );
};

export default Dashboard;
