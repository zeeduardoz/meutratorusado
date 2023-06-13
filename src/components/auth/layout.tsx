import Head from 'next/head'

import { Cookies } from '@components/utils/cookies'

interface Data {
  children: JSX.Element
  title: string
}

export function Layout(props: Data) {
  return (
    <>
      <Head>
        <title>{props.title} - Meu Trator Usado</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700;900&display=swap"
          rel="stylesheet"
        />

        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <Cookies />

      <div className="flex h-screen w-screen">
        <div className="bg-header bg-cover hidden w-8/12 lg:block" />
        <a href="/" className="hidden absolute lg:block">
          <img
            src="/logo.png"
            alt="Logo"
            className="bg-secondary rounded-br p-5 w-1/2"
          />
        </a>
        <div className="bg-primary h-screen overflow-y-auto overscroll-y-auto 2xl:w-4/12 w-full lg:w-1/2">
          {props.children}
        </div>
      </div>
    </>
  )
}
