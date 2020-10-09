import axios from "axios";

const countryListURL = "https://disease.sh/v3/covid-19/countries";
// const countryInfoURL = `https://disease.sh/v3/covid-19/countries/${query}`
const worldWideURL = "https://disease.sh/v3/covid-19/all"


export const getCountries = async () =>
  await axios.get(countryListURL).then((response) => {
    // const modifiedData = response.data.map((data) => ({
    //   name: data.country,
    //   value: data.countryInfo.iso2,
    // }));

    // return modifiedData;
    return response.data
  });



  export const getCountryInfo = async (query) =>{
      const url = (query==="worldwide") ? worldWideURL : `https://disease.sh/v3/covid-19/countries/${query}`;
      return await axios.get(url).then((response)=>{
         return (response.data)
      })
  }

  export const getChartInfo = async (casesType)=>{
    const url = "https://disease.sh/v3/covid-19/historical/all?lastdays=120";
    return await axios.get(url).then((response)=>{
      const data = response.data
      console.log(data)
      return buildChartData(data, casesType)
    })
  }

  const buildChartData = (data, casesType="cases")=>{
    const chartData = [];
    let lastDataPoint;
    for(let date in data[casesType] ){
        if(lastDataPoint){
           const newDataPoint = {
            x: date,
            y: data[casesType][date] - lastDataPoint,
           }
           chartData.push(newDataPoint)
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData
}