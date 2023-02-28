"use client"

import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { ButtonHTMLAttributes, ComponentPropsWithoutRef, ReactComponentElement, ReactNode, useEffect, useRef } from "react";

type AsButton = {
    asChild?: false
} & ComponentPropsWithoutRef<"button">

type AsSlot = {
    asChild?: true
}

type ButtonPropsType = {
    variant?: "primary" | "ghost" | "danger" | "simple";
    size?: "xs" | "sm" | "md" | "lg";
    wFull?: boolean;
    hFull?: boolean;
    height?: number | "full";
    children: ReactNode
} & ButtonHTMLAttributes<unknown> & (AsButton | AsSlot)

export default function Button({wFull, children, size = "md", variant = "primary", asChild = false, hFull, className, ...rest}: ButtonPropsType) {
    const Component = asChild ? Slot : "button"

    return (
        <Component
            className={clsx(`${className && className} relative select-none overflow-hidden flex items-center text-center justify-center gap-2 rounded-lg font-medium text-base w-fit focus:outline focus:outline-4 transition-all delay-75`, 
            wFull === true && "w-full",
            hFull === true && "h-auto",
            variant === "primary" && "outline-primary/30 bg-primary text-white ring-1 ring-inset ring-black/10 hover:brightness-95 active:brightness-90 shadow-md",
            variant === "ghost" && "outline-primary/30 bg-primary/5 backdrop-blur-2xl text-primary hover:bg-primary/10 hover:shadow-sm ring-primary/10 ring-0 active:ring-inset active:ring-1 active:ring-primary/10 focus:ring-primary/25 focus:ring-2 transition-all delay-150",
            variant === "danger" && "bg-danger text-white ring-1 ring-inset ring-black/10 hover:brightness-95 active:brightness-90 shadow-md outline-danger/30",
            variant === "simple" && "text-gray-700 font-medium text-sm outline-gray-500/30 bg-white hover:bg-gray-100 active:bg-gray-300 rounded-lg border border-gray-600 shadow-sm shadow-black/10",
            size === "xs" && "px-2 py-[6px]",
            size === "sm" && "px-5 py-3",
            size === "md" && "px-8 py-4",
            size === "lg" && "px-10 py-5"
            )}
            {...rest}
        >
            {children}
        </Component>
    )
}