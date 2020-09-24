import React from "react";
import { Typography } from "@material-ui/core";
import style from "./Table.module.css";
const Table = ({ countries }) => {
  return (
      <table>
        <tbody>
          {countries.map(({ country, cases }) => (
            <tr key={country}>
              <td>
                <Typography variant="subtitle2">{country}</Typography>
              </td>
              <td>
                <Typography className={style.cases} variant="subtitle2">
                  {cases}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default Table;
