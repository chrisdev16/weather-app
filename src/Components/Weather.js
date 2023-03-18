import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../Services/Utils";
import axios from "axios";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";
import WeatherCard from "./WeatherCard";
import clouds from "../Assets/Images/storm-clouds.jpg";
import sunny from "../Assets/Images/sunny_background.jpg";
import rainy from "../Assets/Images/rainy_background.jpg";
import snow from "../Assets/Images/snow_background.jpg";
import clear from "../Assets/Images/clear_sky_background.jpg";
import mist from "../Assets/Images/mist_background.jpg";
import Location from "./Location";
import { LayoutContext } from "../Services/DefaultLayoutContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Weather() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [userLocationName, setUserLocationName] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);

  const { setBgImage } = useContext(LayoutContext);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [latitude, longitude]);

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };

  const fetchData = useCallback(async () => {
    const URL = `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`;
    setIsLoading(true);
    await axios
      .get(URL)
      .then((response) => {
        const res = response.data;
        setData(res);
        console.log(res);
        setIsLoading(false);
        setWeatherCondition(res.weather[0].main);
        setUserLocationName(res.name);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, [latitude, longitude]);

  const backgroundStyle = useMemo(() => {
    switch (weatherCondition) {
      case "Clouds": {
        setBgImage(clouds);
        return clouds;
      }
      case "Sunny": {
        setBgImage(sunny);
        return sunny;
      }
      case "Rain": {
        setBgImage(rainy);
        return rainy;
      }
      case "Snow": {
        setBgImage(snow);
        return snow;
      }
      case "Clear": {
        setBgImage(clear);
        return clear;
      }
      default: {
        setBgImage(mist);
        return mist;
      }
    }
  }, [weatherCondition, setBgImage]);

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ width: "60%" }}>
        <Grid
          container
          direction={"column"}
          sx={{
            backgroundImage: `url(${backgroundStyle})`,
            backgroundSize: "cover",
            borderRadius: "30px",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <Grid
            container
            sx={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Grid
              item
              sx={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "10px",
                backgroundColor: "#FFF",
                marginBottom: "30px",
              }}
            >
              <Location
                setLat={setLatitude}
                setLng={setLongitude}
                userLocationName={userLocationName}
              />
            </Grid>

            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "10px",
                marginBottom: "30px",
                overflow: "hidden",
                marginLeft: "40px",
              }}
            >
              {alertVisible && (
                <Alert
                  variant="filled"
                  severity="success"
                  onClose={() => setAlertVisible(false)}
                >
                  User's Location Coordinates Added!
                </Alert>
              )}
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "10px",
                backgroundColor: "#FFF",
                marginBottom: "30px",
                overflow: "hidden",
                marginLeft: "40px",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setAlertVisible(true);
                  getPosition();
                }}
                startIcon={<LocationOnIcon />}
                sx={{ height: "6vh", borderRadius: "10px" }}
              >
                Click for User's Location
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              borderRadius: "30px",
              width: "50%",
              minWidth: "320px",
              opacity: "0.5",
              backgroundColor: "#FFF",
            }}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              <WeatherCard weatherData={data} />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
