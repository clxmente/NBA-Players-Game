import NavBar from '../components/NavBar';
import { useState } from "react"
import '../styles/globals.css';
import { CogIcon, CodeIcon } from "@heroicons/react/solid";

import Router from "next/router";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));

  return (
    <>
      <NavBar />
      {loading ? (
        <div className='flex justify-center h-screen items-center'>
          <CogIcon className='h-10 w-auto text-white animate-spin' />
          <h1 className='text-white mx-4 font-bold text-3xl'>Loading</h1>
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}

export default MyApp
