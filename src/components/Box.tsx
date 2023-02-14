'use client'

import clsx from "clsx";
import { ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot"

type BoxPropsType = {
    children: ReactNode
    size: "sm" | "md" | "lg"
    asChild: boolean;
}

export default function Box({children, size, asChild = false}: BoxPropsType) {
    const Component = asChild ? Slot : "div"

    return (
        <Component
            className={clsx(
                "rounded-3xl bg-white shadow-primary/25 shadow-lg",
                size === "lg" && "p-12",
                size === "md" && "p-8",
                size === "sm" && "p-6"
            )}
        >
            {children}
        </Component>
    )
}