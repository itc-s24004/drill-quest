import { App_ChildrenProp } from "@/app/app.type";
import { AppLayout } from "../layout/conponent";

type DrillViewProps = {
    title: string;
    description: string;
} & App_ChildrenProp & {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    onScrollEnd?(): void;
}

export function DrillView({title, description, header, children, footer, onScrollEnd}: DrillViewProps) {
    return (
        <AppLayout
            header={
                <div className="flex items-center justify-between border-b border-[#DADCE0] px-5 py-3">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">{title}</h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{description}</p>
                    </div>

                    {
                        header
                    }
                </div>
            }
            footer={
                footer
            }
            onScrollEnd={
                onScrollEnd
            }
        >

            <div className="h-[14px]" />
            {
                children
            }
        </AppLayout>
    )
}