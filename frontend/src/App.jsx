import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";

import AppLayout from "./components/layout/AppLayout";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route element={<AppLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/chat"
                        element={<Chat />}
                    />

                    <Route
                        path="/analytics"
                        element={<Analytics />}
                    />

                    <Route
                        path="/admin"
                        element={<Admin />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default App;