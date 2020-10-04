import React, { useEffect, useState } from "react";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import { getCountries, getCountryInfo } from "./api/index";
import { sortData } from "./util";
import InfoCard from "./components/InfoCard/InfoCard";
import Table from "./components/Table/Table";
import LineGraph from "./components/LineGraph/LineGraph";
import Map from "./components/Map/Map";
import style from "./App.module.css";
import "leaflet/dist/leaflet.css";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    const getWorldWideInfo = async () => {
      setCountryInfo(await getCountryInfo(country));
    };
    getWorldWideInfo();
  }, [country]);
  useEffect(() => {
    const getCountryList = async () => {
      setCountries(await getCountries());
    };
    getCountryList();
  }, [setCountries]);

  const onChangeCountry = async (e) => {
    setCountry(e.target.value);
    setCountryInfo(await getCountryInfo(e.target.value));
  };

  return (
    <div className={style.app}>
      <div className={style.app_left}>
        <div className={style.app_header}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            COVID-19 Tracker
          </Typography>
          <FormControl>
            <Select
              default="worldwide"
              variant="outlined"
              onChange={onChangeCountry}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((data) => (
                <MenuItem key={data.country} value={data.countryInfo.iso2}>
                  {data.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={style.app_stats}>
          <InfoCard
            title="Cases"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          />
          <InfoCard
            title="Deaths"
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />
          <InfoCard
            title="Recovered"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />
        </div>
        <Map center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className={style.app_right}>
        <CardContent>
          <Typography>Live cases by Country</Typography>
          <Table countries={sortData(countries)} />
          <Typography>Worldwide new cases</Typography>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
