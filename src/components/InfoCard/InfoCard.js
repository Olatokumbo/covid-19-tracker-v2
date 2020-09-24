import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

const InfoCard = ({ title, cases, total }) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom color="textSecondary">{title}</Typography>
        <Typography>{cases}</Typography>
        <Typography color="textSecondary">{total} Total</Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
