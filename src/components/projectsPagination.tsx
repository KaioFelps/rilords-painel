'use client'

import clsx from "clsx";
import useRouter from "next/router";
import { ArrowLeft, ArrowRight } from "phosphor-react";

type ProjectPaginationPropsType = {
    currentPage: number;
    totalPages: number;
}

export default function ProjectsPagination({ currentPage, totalPages }: ProjectPaginationPropsType) {
    function getPaginationProps() {
        const VISIBLE_BUTTONS = 5
        let maxLeft = currentPage - Math.floor(VISIBLE_BUTTONS / 2)
        let maxRight = currentPage + Math.floor(VISIBLE_BUTTONS / 2)
        let isFirstPageVisible = false
        let isLastPageVisisble = false
    
        if (maxLeft <= 1) {
            maxLeft = 1
            maxRight = VISIBLE_BUTTONS
    
            isFirstPageVisible = false
            isLastPageVisisble = true
        }
    
        if (maxRight >= totalPages) {
            maxLeft = totalPages - VISIBLE_BUTTONS + 1
            maxRight = totalPages
    
            isFirstPageVisible = true
            isLastPageVisisble = false
        }
    
        if (totalPages <= VISIBLE_BUTTONS) {
            maxLeft = 1
            maxRight = totalPages

            isFirstPageVisible = false
            isLastPageVisisble = false
        }
    
        const calculatedPages = []
    
        for (let page = maxLeft; page <= maxRight; ++page) {
            calculatedPages.push(page)
        }
    
        return {
            maxLeft,
            maxRight,
            isFirstPageVisible,
            isLastPageVisisble,
            calculatedPages
        }
    }
    
    const { isFirstPageVisible, isLastPageVisisble, maxLeft, maxRight, calculatedPages } = getPaginationProps()
    
    const navigationControllers = {
        next() {
            const nextPage = currentPage >= totalPages ? totalPages : currentPage + 1
            useRouter.push(`${useRouter.basePath}?page=${nextPage}`)
        },
        
        prev() {
            const prevPage = currentPage <= 1 ? 1 : currentPage - 1
            useRouter.push(`${useRouter.basePath}?page=${prevPage}`)
    
        },
    
        goTo(page: number) {
            if (page > totalPages) {
                useRouter.push(`${useRouter.basePath}?page=${totalPages}`)
                return;
            }

            if (page < 1) {
                useRouter.push(`${useRouter.basePath}?page=${1}`)
                return;
            }

            useRouter.push(`${useRouter.basePath}?page=${page}`)
        }
    }

    return (
        <>
            <button
                onClick={navigationControllers.prev}
                className="flex flex-row gap-6 items-center text-sm font-medium text-gray-700 hover:text-primary active:text-secondary transition-all delay-75"
            >
                <ArrowLeft size={16} weight="bold" />
                Página anterior
            </button>

            <div className="flex flex-row">
                {isFirstPageVisible && <>
                    <button
                        key={1}
                        onClick={() => {navigationControllers.goTo(1)}}
                        className={clsx("border-none bg-none relative text-lg py-[6px] px-[17px] outline-primary/40 outline-offset-0 focus:bg-primary/10 hover:bg-primary/5 transition-all delay-75", currentPage === 1 && "before:w-full before:bg-primary before:h-[2px] before:absolute before:-top-[2px] before:right-0")}
                    >
                        {1}
                    </button>
                    <span className={clsx("relative text-lg py-[6px] px-[17px]")}>...</span>
                </>}

                {calculatedPages.map((page: number) => {
                    return (
                        <button
                            key={page}
                            onClick={() => {navigationControllers.goTo(page)}}
                            className={clsx("border-none bg-none relative text-lg py-[6px] px-[17px] outline-primary/40 outline-offset-0 focus:bg-primary/10 hover:bg-primary/5 transition-all delay-75", currentPage === page && "before:w-full before:bg-primary before:h-[2px] before:absolute before:-top-[2px] before:right-0")}
                        >
                            {page}
                        </button>
                    )
                })}
                
                {isLastPageVisisble && <>
                    <span className={clsx("relative text-lg py-[6px] px-[17px]")}>...</span>
                    <button
                        key={totalPages}
                        onClick={() => {navigationControllers.goTo(totalPages)}}
                        className={clsx("border-none bg-none relative text-lg py-[6px] px-[17px] outline-primary/40 outline-offset-0 focus:bg-primary/10 hover:bg-primary/5 transition-all delay-75", currentPage === totalPages && "before:w-full before:bg-primary before:h-[2px] before:absolute before:-top-[2px] before:right-0")}
                    >
                        {totalPages}
                    </button>
                </>}
            </div>

            <button
                onClick={navigationControllers.next}
                className="flex flex-row gap-6 items-center text-sm font-medium text-gray-700 hover:text-primary active:text-secondary transition-all delay-75"
            >
                Página posterior
                <ArrowRight size={16} weight="bold" />
            </button>
        </>
    )
}