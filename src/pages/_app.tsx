import "../styles/global.css"
import "tailwindcss/tailwind.css"

import Footer from "../components/Footer";
import Header from "../components/Header";
import { AppProps } from "next/app";
import Head from "next/head";
import { Poppins, Roboto_Mono } from "@next/font/google";

export const poppins = Poppins({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    variable: "--poppins-next-font"
})

export const robotoMono = Roboto_Mono({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--roboto-mono-next-font"
})

export default function App({ Component, pageProps }: AppProps ) {
    const toastTypesBackgroundClasses = {
        success: "bg-green-600",
        error: "bg-danger",
        info: "bg-primary",
        warning: "bg-yellow-500",
        default: "bg-gray-300",
        dark: "bg-gray-800",
    } as {
        [key: string]: string
    }

    return (
        <>
            <Head>
                <title>Culords Admin</title>
            </Head>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    )
}