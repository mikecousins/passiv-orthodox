import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import AuthProvider from './providers/AuthProvider';
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
  axios.defaults.baseURL = 'https://api.passiv.com/api/v1/';
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
