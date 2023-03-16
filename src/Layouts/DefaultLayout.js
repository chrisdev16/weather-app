import { Container, CssBaseline } from "@mui/material";

const DefaultLayout = (props) => {
    return (
        <>
            <CssBaseline />
            <Container disableGutters maxWidth={false}>
                <h1
                    style={{
                        color: "#FFF",
                        margin: 0,
                        paddingTop: "2vh",
                        textAlign: "center",
                    }}
                >
                    Weather Summary App
                </h1>
                {props.children}
            </Container>
        </>
    );
};

export default DefaultLayout;
