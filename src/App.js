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
import InfoCard from "./components/InfoCard/InfoCard";
import Table from "./components/Table/Table";
import style from "./App.module.css";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState("");

  useEffect(()=>{
    const getWorldWideInfo =  async () =>{
        setCountryInfo(await getCountryInfo(country))
    }
    getWorldWideInfo()
  }, [country])
  useEffect(() => {
    const getCountryList = async () => {
      setCountries(await getCountries());
    };
    getCountryList();
  }, [setCountries]);

  const onChangeCountry = async (e) => {
    setCountry(e.target.value)
    setCountryInfo(await getCountryInfo(e.target.value))
  }

  return (
    <div className={style.app}>
      <div className={style.app_left}>
      <div className={style.app_header}>
        <Typography variant="h4">COVID-19 Tracker</Typography>
        <FormControl>
          <Select default="worldwide" variant="outlined" onChange={onChangeCountry} value={country}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((data)=>
                <MenuItem key={data.country} value={data.countryInfo.iso2}>{data.country}</MenuItem>)
            }
          </Select>
        </FormControl>
      </div>
        <div className={style.app_stats}>
        <InfoCard title="Cases" total={countryInfo.cases} cases={countryInfo.todayCases}/>
        <InfoCard title="Deaths" total={countryInfo.recovered} cases={countryInfo.todayRecovered}/>
        <InfoCard title="Recovered" total={countryInfo.deaths} cases={countryInfo.todayDeaths}/>
        </div>
      </div>
      <Card className={style.app_right}>
      <CardContent>
      <Typography>Live cases by Country</Typography>
      <Table countries={countries}/>
      <Typography>Worldwide new cases</Typography>
      </CardContent>
      </Card>
    </div>
  );
};

export default App;
