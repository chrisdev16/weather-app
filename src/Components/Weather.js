import { useCallback, useEffect, useMemo, useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../Services/Utils";
import axios from "axios";
import { CircularProgress, Container, Grid } from "@mui/material";
import WeatherCard from "./WeatherCard";
import clouds from "../Assets/Images/storm-clouds.jpg";
import sunny from "../Assets/Images/sunny_background.jpg";
import rainy from "../Assets/Images/rainy_background.jpg";
import snow from "../Assets/Images/snow_background.jpg";
import Location from "./Location";

export default function Weather() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [weatherCondition, setWeatherCondition] = useState(null);

    useEffect(() => {
        getPosition();
    }, []);

    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            fetchData();
        }
        // eslint-disable-next-line
    }, [latitude, longitude]);

    const getPosition = () => {
        navigator.geolocation.watchPosition((position) => {
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
            })
            .catch((e) => {
                console.log(e);
                setIsLoading(false);
            });
    }, [latitude, longitude]);

    const backgroundStyle = useMemo(() => {
        switch (weatherCondition) {
            case "Clouds":
                return clouds;
            case "Sunny":
                return sunny;
            case "Rain":
                return rainy;
            case "Snow":
                return snow;
            default:
                return null;
        }
    }, [weatherCondition]);

    return (
        <>
            <Container
                maxWidth="false"
                disableGutters
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Grid
                    container
                    sx={{
                        backgroundImage: `url(${backgroundStyle})`,
                        backgroundSize: "cover",
                        width: "90%",
                        height: "80vh",
                        borderRadius: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <Grid
                        item
                        xs={8}
                        container
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            borderRadius: "30px",
                            backgroundColor: "#FFF",
                        }}
                    >
                        <Location />
                    </Grid>
                    <Grid
                        item
                        xs={8}
                        container
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            borderRadius: "30px",
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
