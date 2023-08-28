import { AuthProvider } from "context/AuthContext";
import { StrictMode } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <StrictMode>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </StrictMode>
  );
}

export default MyApp;
