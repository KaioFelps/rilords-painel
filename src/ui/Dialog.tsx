"use client"

import * as PrimitiveDialog from "@radix-ui/react-dialog"
import { ReactNode, useState } from "react"

type DialogPropsType = {
    children: ReactNode;
    content: ReactNode;
    open?: boolean;
}

export default function Dialog({ children, content, open = false }: DialogPropsType) {

    return (
        <PrimitiveDialog.Root open={open}>
            <PrimitiveDialog.Trigger>
                {children}
            </PrimitiveDialog.Trigger>

            <PrimitiveDialog.Portal>
                <PrimitiveDialog.Overlay
                    className="w-screen h-screen fixed top-0 left-0 block backdrop-blur-sm bg-black/20"
                />

                <PrimitiveDialog.Content
                    className=
                    "fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 outline-none"
                >
                    {content}
                </PrimitiveDialog.Content>
            </PrimitiveDialog.Portal>
        </PrimitiveDialog.Root>
    )
}

export const CloseButton = PrimitiveDialog.Close