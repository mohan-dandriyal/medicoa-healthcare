
export const DecorativebackgroundTopLeft = ({ className }: { className: string }) => {
    return <div
        aria-hidden="true"
        className={`pointer-events-none -z-1 sm:block hidden absolute -left-30 -top-60 h-[300px] w-[300px] rounded-full bg-[#E6F8EF]/50 ${className}`}
    />
}

export const DecorativebackgroundTopRight = ({ className }: { className: string }) => {
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none sm:block hidden absolute -right-30 -top-60 h-[300px] w-[300px] rounded-full bg-[#E6F8EF]/50 ${className}`}
        />
    )
}

export const DecorativebackgroundBottomLeft = ({ className }: { className: string }) => {
    return <div
        aria-hidden="true"
        className={` pointer-events-none sm:block hidden absolute -left-32 -bottom-62 h-[300px] w-[350px] rounded-full bg-[#E6F8EF] ${className}`}
    />
}

export const DecorativebackgroundBottomRight = ({ className }: { className: string }) => {
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none sm:block hidden absolute -right-32 -bottom-62 h-[300px] w-[350px] rounded-full bg-[#E6F8EF] ${className}`}
        />
    )
}