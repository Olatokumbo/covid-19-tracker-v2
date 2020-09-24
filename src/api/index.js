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