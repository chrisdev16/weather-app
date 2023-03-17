import { CardContent, Typography } from "@mui/material";
import moment from "moment";

const WeatherCard = ({ weatherData }) => {
    return (
        <>
            <CardContent>
                <Typography sx={{ fontSize: 30, color: "#000", fontWeight: "bold" }}>
                    {weatherData.name}
                </Typography>
                <hr></hr>
                <Typography sx={{ fontSize: 30, color: "#000", fontWeight: "bold" }}>
                    {weatherData.weather[0].description.charAt(0).toUpperCase() +
                        weatherData.weather[0].description.slice(1)}
                </Typography>
                <Typography sx={{ fontSize: 25, color: "#000", fontWeight: "normal" }}>
                    Temperature: {Math.round(weatherData.main.temp)} &deg;C
                </Typography>
                <Typography sx={{ fontSize: 25, color: "#000", fontWeight: "normal" }}>
                    Humidity: {weatherData.main.humidity} %
                </Typography>
                <Typography sx={{ fontSize: 25, color: "#000", fontWeight: "normal" }}>
                    Sunrise:{" "}
                    {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-GB")}
                </Typography>
                <Typography sx={{ fontSize: 25, color: "#000", fontWeight: "normal" }}>
                    Sunset:{" "}
                    {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-GB")}
                </Typography>
                <Typography sx={{ fontSize: 25, color: "#000", fontWeight: "normal" }}>
                    Day: {moment().locale(false).format("dddd")}
                </Typography>
                <Typography sx={{ fontSize: 25, color: "#000", fontWeight: "normal" }}>
                    Date: {moment().locale("el").format("LL")}
                </Typography>
                <Typography sx={{ fontSize: 25, color: "#000", fontWeight: "normal" }}>
                    Hour: {moment().format('HH:mm')}
                </Typography>
            </CardContent>
        </>
    );
};

export default WeatherCard;
