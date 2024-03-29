import { Head, Html, Main, NextScript } from "next/document";
import { poppins, robotoMono } from "./_app"

export default function Document() {
    return (
        <Html className={`${poppins.className} ${robotoMono.variable}`} lang="pt-br">
            <Head>
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body className="font-sans">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}