import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { NotificationContextProvider } from "./NotificationContext";
import { UserContextProvider } from "./UserContext";
import { BrowserRouter as Router } from "react-router-dom"

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
        <QueryClientProvider client={queryClient}>
            <NotificationContextProvider>
                <UserContextProvider>
                    <App />
                </UserContextProvider>
            </NotificationContextProvider>
        </QueryClientProvider>
    </Router>
);
