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
    variant?: "primary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    wFull?: boolean;
    height?: number | "full";
    children: ReactNode
} & ButtonHTMLAttributes<unknown> & (AsButton | AsSlot)

export default function Button({wFull, children, size = "md", variant = "primary", asChild = false, ...rest}: ButtonPropsType) {
    const Component = asChild ? Slot : "button"

    return (
        <Component
            className={clsx("relative select-none overflow-hidden ripple-button flex align-center gap-2 rounded-lg font-medium text-base shadow-md focus:outline-none", 
            wFull && "w-full",
            variant === "primary" && "bg-primary text-white ring-1 ring-inset ring-black/10 hover:brightness-95 active:brightness-90",
            variant === "ghost" && "bg-primary/5 backdrop-blur-2xl text-primary hover:bg-primary/10",
            variant === "danger" && "bg-danger text-white ring-1 ring-inset ring-black/10 hover:brightness-95 active:brightness-90",
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