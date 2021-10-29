import * as React from "react";
import Card from "@mui/material/Card";
import {
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Slide,
  Box
} from "@mui/material/";

import elMundo from "../static/elmundo.png";
import elPais from "../static/elpais.jpg";
import Chip from '@mui/material/Chip';

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: "auto",
  },
  img: { maxHeight: "40px", height: "auto" },
  sourceTitle: { padding: ".7rem 1rem", fontWeight: 900 },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '1rem',
  }
}));

export default function Article({ edit, data, parentContainer }) {
  const classes = useStyles();

  const { 
    title,
    image,
    source,
    description,
    link,
    created,
  } = data;

  const isOld = new Date();
  isOld.setHours(isOld.getHours() - 1);
  const isNew = new Date(created) > isOld;
  return (
    <Slide direction="up" in={true} container={parentContainer.current}>
      <Card
        className={classes.card}
        elevation={10}
        style={{
          borderBottom: isNew ? "2px solid #e93b56" : "none",
        }}
      >
        <Box className={classes.cardHeader}>
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
                    <Box sx={{ flexGrow: 1 }} />
        {isNew ? (
          <Chip label="NUEVO" color="primary" size="small"/>
        ) : ''}
        </Box>
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
