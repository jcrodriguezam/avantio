import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Fab } from "@mui/material";

import { makeStyles } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import logo from "../static/logo.png";
import NewFeed from "./NewFeed";

const useStyles = makeStyles((theme) => ({
  header: { background: "transparent!important" },
  toolbar: {
    maxWidth: "40px",
    height: "auto",
    margin: ".5rem",
  },
  mt1rem: { marginTop: "1rem" },
}));

export default function Header() {
  const classes = useStyles();
  const [newFeed, setNewFeed] = React.useState(false);
  const toggleNewFeed = (value) => {
    setNewFeed(value);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar elevation={0} position="fixed" className={classes.header}>
          <Toolbar variant="dense">
            <img src={logo} alt="logo" className={classes.toolbar} />
            <Typography variant="h6" color="inherit" component="div">
              Daily Trends
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Fab
              size="small"
              color="primary"
              className={classes.mt1rem}
              aria-label="Nuevo"
            >
              <AddIcon onClick={() => toggleNewFeed(true)} />
            </Fab>
          </Toolbar>
        </AppBar>
      </Box>
      <NewFeed open={newFeed} toggle={toggleNewFeed} />
    </>
  );
}
