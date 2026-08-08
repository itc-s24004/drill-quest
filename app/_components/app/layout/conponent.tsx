import React from "react"

type AppLayoutProps = {
    header?: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    onScrollEnd?(): void;
}

export function AppLayout({header, children, footer, onScrollEnd}: AppLayoutProps) {
    return (
        <div className="h-full overflow-y-auto px-4"
            onScroll={(ev) => {
                const {clientHeight, scrollTop, scrollHeight} = ev.currentTarget;
                if (clientHeight + scrollTop >= scrollHeight) onScrollEnd?.();
            }}
        >
            <div className="sticky top-0">
                {header}
            </div>
            {children}
            <div className="sticky bottom-0">
                {footer}
            </div>
        </div>
    )
}