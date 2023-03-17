import Weather from "./Components/Weather";
import DefaultLayout from "./Layouts/DefaultLayout";
import { LayoutContext } from "./Services/DefaultLayoutContext";
import { useState } from "react";

function App() {
  const [bgImage, setBgImage] = useState("#2E3336");

  return (
    <LayoutContext.Provider value={{ bgImage, setBgImage }}>
      <DefaultLayout>
        <Weather />
      </DefaultLayout>
    </LayoutContext.Provider>
  );
}

export default App;
