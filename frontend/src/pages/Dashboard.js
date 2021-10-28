import * as React from "react";
import { makeStyles } from "@material-ui/core";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import { useDispatch, useSelector } from "react-redux";

import Article from "../components/Article";
import Edit from "../components/EditFeed";

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
  const boxRef = React.useRef(null);

  const toggleEdit = (value) => {
    setEdit(value);
  };

  const setCurrentArticle = (value) => {
    setArticle(value);
  };

  const newData = useSelector((state) => state.feeds.data) || [];
  React.useEffect(() => {
    dispatch.feeds.loadData();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className={classes.main} ref={boxRef}>
        <Masonry columns={{ xs: 1, md: 3 }} spacing={2} defaultSpacing={2}>
          {newData?.map((article, index) => (
            <Article
              key={index}
              data={article}
              edit={toggleEdit}
              setCurrentArticle={setCurrentArticle}
              parentContainer={boxRef}
            />
          ))}
        </Masonry>
      </Box>
      <Edit open={edit} toggle={toggleEdit} />
    </>
  );
};

export default Dashboard;
