import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import TextareaAutosize from "@mui/core/TextareaAutosize";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";

import { useDispatch, useSelector } from "react-redux";

export default function EditDrawer({ open, toggle, data }) {
  console.log("data", open);
  const dispatch = useDispatch();

  // let newData = { ...open }
  React.useEffect(() => {
    setNewData(open);
  }, [open]);

  const [newData, setNewData] = React.useState(open);
  const undo = (value) => {
    setNewData(value);
  };

  const changeValue = (key, value) => {
    console.log("entramos", key, value);
    const newValue = { ...newData };
    newValue[key] = value;
    setNewData(newValue);
  };
  const list = (data) => (
    <Box sx={{ width: "auto" }} style={{ padding: "1rem" }} role="presentation">
      <Typography gutterBottom variant="h5" component="div">
        Editar Feed
      </Typography>
      <Box style={{ padding: "1rem" }}>
        <Card elevation={18} sx={{ maxWidth: "100%", marginBottom: "2rem" }}>
          {newData.image ? (
            <CardMedia
              component="img"
              height="auto"
              image={newData.image}
              alt={newData.title}
            />
          ) : (
            ""
          )}
          <CardActions>
            {newData.image ? (
              <Button size="small">modificar</Button>
            ) : (
              <Button size="small">Cargar imagen</Button>
            )}
          </CardActions>
        </Card>
        <TextField
          id="outlined"
          label="Título"
          value={newData.title}
          onChange={(e) => changeValue("title", e.target.value)}
          multiline
          maxRows={4}
          style={{ marginBottom: "1rem", width: "100%" }}
        />
        <TextField
          id="outlined"
          label="Descripción"
          value={newData.description}
          onChange={(e) => changeValue("description", e.target.value)}
          multiline
          maxRows={10}
          style={{ marginBottom: "1rem", width: "100%" }}
        />
        <TextField
          id="outlined"
          label="Periodico"
          value={newData.source}
          style={{ marginBottom: "1rem", width: "100%" }}
          onChange={(e) => changeValue("source", e.target.value)}
        />
      </Box>
      <Divider />
      <Button
        size="large"
        startIcon={<DeleteForeverRoundedIcon />}
        variant="contained"
        style={{ width: "100%", marginBottom: ".8rem" }}
        onClick={() => dispatch.feeds.updateFeed({ feed: { ...newData } })}
      >
        Guardar
      </Button>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          size="small"
          startIcon={<ReplayRoundedIcon />}
          onClick={() => undo(open)}
        >
          Deshacer cambios
        </Button>
        <Button
          size="small"
          color="error"
          startIcon={<DeleteForeverRoundedIcon />}
          onClick={() => {
            dispatch.feeds.deleteFeed({ feed: { ...newData } });
            toggle(false);
          }}
        >
          Eliminar feed
        </Button>
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          toggle(false);
        }}
      >
        {list(open)}
      </Drawer>
    </div>
  );
}
