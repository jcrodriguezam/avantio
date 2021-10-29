import * as React from "react";
import {
  TextField,
  Typography,
  Divider,
  Button,
  Box,
  Card,
  CardActions,
  CardMedia,
} from "@mui/material";

import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  closeButtonBox: {
    padding: "1rem",
    justifyContent: "flex-end",
    display: "flex",
  },
  closeButton: { cursor: "pointer" },
  mainBox: {
    margin: "0 auto",
    maxWidth: "800px",
    padding: "1rem",
  },
  imageCard: {
    maxWidth: "auto",
    margin: "auto",
    marginBottom: "2rem",
    backgroundColor: "transparent",
  },
  textField: { marginBottom: "1rem!important", width: "100%" },
  saveButton: { width: "100%", marginBottom: ".8rem!important" },
}));

export default function FeedData({ open, toggle, data, isEdit }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  React.useEffect(() => {
    setNewData(open);
  }, [open]);

  const [newData, setNewData] = React.useState(open);

  const undo = (value) => {
    setNewData(value);
  };

  const changeValue = (key, value) => {
    const newValue = { ...newData };
    newValue[key] = value;
    setNewData(newValue);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setNewData({ ...newData, image: base64 });
  };

  return (
    <>
      <Box className={classes.closeButtonBox}>
        <CloseRoundedIcon
          onClick={() => toggle(false)}
          className={classes.closeButton}
        />
      </Box>
      <Box className={classes.mainBox} role="presentation">
        <Box sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5">
            {isEdit ? "Editar Feed" : "Nuevo Feed"}
          </Typography>
        </Box>
        <Box>
          <Card elevation={0} className={classes.imageCard}>
            {newData.image ? (
              <CardMedia
                component="img"
                height="auto"
                width="auto"
                image={newData.image}
                alt={newData.title}
              />
            ) : (
              ""
            )}
            <CardActions>
              <Button
                component="label"
                size="small"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => handleFileUpload(e)}
              >
                Cargar imagen
                <input type="file" hidden />
              </Button>
            </CardActions>
          </Card>
          <TextField
            id="outlined"
            label="Título"
            value={newData.title}
            onChange={(e) => changeValue("title", e.target.value)}
            multiline
            maxRows={4}
            className={classes.textField}
          />
          <TextField
            id="outlined"
            label="Descripción"
            value={newData.description}
            onChange={(e) => changeValue("description", e.target.value)}
            multiline
            maxRows={10}
            className={classes.textField}
          />
          <TextField
            id="outlined"
            label="Periodico"
            value={newData.source}
            className={classes.textField}
            onChange={(e) => changeValue("source", e.target.value)}
          />
          <TextField
            id="outlined"
            label="Enlace URL"
            value={newData.link}
            className={classes.textField}
            onChange={(e) => changeValue("link", e.target.value)}
          />
        </Box>
        <Divider />
        <Button
          size="large"
          endIcon={<KeyboardArrowRightRoundedIcon />}
          variant="contained"
          color="primary"
          className={classes.saveButton}
          onClick={() => {
            if (isEdit) {
              dispatch.feeds.updateFeed({ feed: { ...newData } });
            } else {
              dispatch.feeds.addFeed({ feed: { ...newData } });
            }
            toggle(false);
          }}
        >
          {isEdit ? "Guardar" : "Crear nuevo feed"}
        </Button>
        {isEdit ? (
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              size="small"
              startIcon={<ReplayRoundedIcon />}
              color="tertiary"
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
        ) : (
          ""
        )}
      </Box>
    </>
  );
}
