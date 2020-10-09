import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { prettyPrintStat } from "../../util";
import style from "./InfoCard.module.css";
const InfoCard = ({ title, cases, active, isRed,  total, ...props }) => {
  return (
    <Card className={active ? style.infoCardSelected :style.infoCard}
    onClick={props.onClick}
    >
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <Typography className={!isRed ? style.infoCardCasesGreen :style.infoCardCases} variant='h6'>{prettyPrintStat(cases)}</Typography>
        <Typography className={style.infoCardTotal}>{prettyPrintStat(total)} Total</Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
