import Weather from "./Components/Weather";
import { ThemeProvider } from "@mui/material";
import DefaultLayout from "./Layouts/DefaultLayout";
import theme from "./Assets/Styles/Theme";

function App() {
  return (
      <ThemeProvider theme={theme}>
        <DefaultLayout>
          <Weather />
        </DefaultLayout>
      </ThemeProvider>
  );
}

export default App;
