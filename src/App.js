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
  const center = { lat: 34.80746, lng: -40.4796 };
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState([]);
  const [mapCenter, setMapCenter] = useState(center);
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("cases");

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
    await getCountryInfo(e.target.value).then((data)=>{
      setCountryInfo(data)
      if (typeof data.countryInfo !== "undefined") {
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      }
      else if(country ==='worldwide')
      setMapCenter([34.80746, -40.4796])
      setMapZoom(3)
    });
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
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Cases"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          />
          <InfoCard
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />
          <InfoCard
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />
        </div>
        <Map center={mapCenter} zoom={mapZoom} countries={countries} casesType={casesType}/>
      </div>
      <Card className={style.app_right}>
        <CardContent>
          <Typography>Live cases by Country</Typography>
          <Table countries={sortData(countries)} />
          <Typography>Worldwide new {casesType}</Typography>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
