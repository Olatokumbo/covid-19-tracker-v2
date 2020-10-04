import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

const InfoCard = ({ title, cases, total }) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom color="textSecondary">{title}</Typography>
        <Typography style={{fontWeight: "bold"}} variant='h6'>{cases}</Typography>
        <Typography color="textSecondary" variant='body2'>{total} Total</Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
