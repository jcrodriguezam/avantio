import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import elMundo from "../static/elmundo.png";
import elPais from "../static/elpais.jpg";

import { useDispatch, useSelector } from "react-redux";

const getTodayAsString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);

  return `${year}${month}${day}`;
};

export default function MultiActionAreaCard({ edit, data }) {
  const today = getTodayAsString();
  const { title, image, source, description, dateAsString, link } = data;
  return (
    <Card
      sx={{ maxWidth: 345, margin: "auto", border: "1px solid #e93b5633" }}
      elevation={10}
      style={{
        borderBottom: dateAsString === today ? "4px solid #e93b56" : "inherit",
      }}
    >
      <img
        src={source === "elMundo" ? elMundo : elPais}
        alt={source}
        style={{ maxHeight: "40px", height: "auto" }}
      />
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
          color="primary"
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
  );
}
