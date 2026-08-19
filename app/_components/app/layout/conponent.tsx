import React from "react"

type AppLayoutProps = {
    header?: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    onScrollEnd?(): void;
}

export function AppLayout({header, children, footer, onScrollEnd}: AppLayoutProps) {
    return (
        <div
            className="flex flex-col h-full overflow-y-auto app_scroll bg-[var(--background)]"
            onScroll={(ev) => {
                const {clientHeight, scrollTop, scrollHeight} = ev.currentTarget;
                if (Math.ceil(clientHeight + scrollTop) >= Math.floor(scrollHeight)) onScrollEnd?.();
            }}
        >
            {
                header &&
                <div className="sticky top-0 bg-[var(--background-over)] backdrop-blur-xs p-4">
                    {header}
                </div>
            }
            <div className="mx-4 flex flex-col m-4">
                {children}
            </div>
            <div className="flex-1" />
            {
                footer &&
                <div className="sticky bottom-0">
                    {footer}
                </div>
            }
        </div>
    )
}