import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import AuthProvider from "./providers/AuthProvider";
import styles from "./styles/app.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function App() {
  const queryClient = new QueryClient();
  axios.defaults.baseURL = "https://api.passiv.com/api/v1/";
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="bg-gray-900 h-screen text-gray-300 flex flex-col">
          <div className="flex-1" />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <Outlet />
              </AuthProvider>
            </QueryClientProvider>
          </div>
          <div className="flex-1" />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
