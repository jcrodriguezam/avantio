import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";

import elMundo from "../static/elmundo.png";
import elPais from "../static/elpais.jpg";

import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: "auto",
  },
  img: { maxHeight: "40px", height: "auto" },
  sourceTitle: { padding: ".7rem 1rem", fontWeight: 900 },
}));

const getTodayAsString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);

  return `${year}${month}${day}`;
};

export default function Article({ edit, data, parentContainer }) {
  const classes = useStyles();

  const today = getTodayAsString();
  const { title, image, source, description, dateAsString, link } = data;

  return (
    <Slide direction="up" in={true} container={parentContainer.current}>
      <Card
        className={classes.card}
        elevation={10}
        style={{
          borderBottom: dateAsString === today ? "2px solid #e93b56" : "none",
        }}
      >
        {source && (source === "el Mundo" || source === "el Pais") ? (
          <img
            src={source === "el Mundo" ? elMundo : elPais}
            alt={source}
            className={classes.img}
          />
        ) : (
          <Typography
            variant="text"
            className={classes.sourceTitle}
            component="div"
          >
            {source.toUpperCase()}
          </Typography>
        )}
        <CardActionArea
          onClick={() => {
            window.open(link, "_blank");
          }}
        >
          {image ? (
            <CardMedia component="img" height="140" image={image} alt={title} />
          ) : (
            ""
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            {description ? (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            ) : (
              ""
            )}
          </CardContent>
        </CardActionArea>
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button
            size="small"
            color="secondary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              edit({ ...data });
            }}
          >
            Editar
          </Button>
        </CardActions>
      </Card>
    </Slide>
  );
}
