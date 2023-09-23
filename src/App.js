import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ClientLayout } from "./components/LayOuts";
import  publicRoutes  from "./routes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ClientLayout />}>
                    {publicRoutes?.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.component}
                        />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
