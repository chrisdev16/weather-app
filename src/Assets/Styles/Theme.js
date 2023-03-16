import { createTheme } from "@mui/material";

const myTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: "#313131",
                },
            },
        },
    },
});

export default createTheme(myTheme);
