import React, { useEffect, useState } from "react";
import { sortData } from "./utils";
import InfoBox from "./InfoCard";
import Table from "./Table";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Card, CardContent } from "@mui/material";
import "./Chart.css";
import LineGraph from "./linegraph";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import geoData from "./data.json";
import { scaleQuantize } from "d3-scale";
const colorScale = scaleQuantize()
  .domain([0, 1000000])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618",
  ]);

const Chart = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/countries"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    console.log(url);
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  const handleMouseEnter = (geo, d) => {
    console.log("d", geo);
    setContent(d?.country || "");
  };

  const handleMouseLeave = () => {
    setContent("");
  };
  console.log("content", content);
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide </MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo?.todayCases}
            total={countryInfo?.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo?.todayRecovered}
            total={countryInfo?.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo?.todayDeaths}
            total={countryInfo?.deaths}
          />
        </div>
        <h3>Worldwide new cases</h3>
        <LineGraph />
        <>
          <ComposableMap>
            <Geographies geography={geoData}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const d =
                    data &&
                    data.find(
                      (country) =>
                        country?.countryInfo?.iso2 ===
                        geo?.properties["Alpha-2"]
                    );
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      stroke="#C3C7CB"
                      strokeWidth={0.5}
                      onMouseEnter={(event) => handleMouseEnter(geo, d)}
                      onMouseLeave={(event) => handleMouseLeave()}
                      fill={d ? colorScale(d.cases) : "#F5F4F6"}
                    />
                  );
                })
              }
            </Geographies>
            {content && (
              <div
                className="sagar"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "white",
                  padding: "0.5rem",
                  zIndex: 100,
                }}
              >
                {content}
              </div>
            )}
          </ComposableMap>
        </>
      </div>
      <Card className="app__right"  sx={{height:"calc(100vh - 120px)",overflowY:"auto"}}>
        <CardContent>
          <h3>Live case by Country</h3>
          <Table countries={tableData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Chart;
