import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function RecipeItem({ imageUrl, title, desc, i }) {
  return (
    <Link to={`/detail/${i}`}>
      <Card style={{ minWidth: "20vw", maxWidth: "20vw" }}>
        <CardMedia
          style={{ height: 0, paddingTop: "56.25%" }}
          image={imageUrl}></CardMedia>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {desc}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
