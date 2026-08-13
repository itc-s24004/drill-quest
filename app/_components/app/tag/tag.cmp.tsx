import { App_ChildrenProp } from "@/app/app.type"

type AppTagProps = App_ChildrenProp & {
    onClick?(): void;
};

export function AppTag({ children, onClick }: AppTagProps) {
    return (
        <span className="inline-block px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-colors duration-200 cursor-pointer" onClick={onClick}>{children}</span>
    );
}