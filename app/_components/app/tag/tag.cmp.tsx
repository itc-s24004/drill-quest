import { App_ChildrenProp } from "@/app/app.type"

type AppTagProps = App_ChildrenProp & {
    onClick?(): void;
    type?: AppTagStyle | undefined
};

type AppTagStyle = "rounded" | "hash"



export function AppTag({ children, onClick, type = "rounded" }: AppTagProps) {
    return (
        type === "rounded" ?
        <span className="inline-block text-sm font-small duration-200 cursor-pointer text-blue-600 underline" onClick={onClick}>#{children}</span>
        :
        <span className="inline-block px-3 py-1 bg-blue-500 text-white text-sm font-small rounded-full hover:bg-blue-600 transition-colors duration-200 cursor-pointer" onClick={onClick}><span className="text-blue-600">#</span>{children}</span>
    );
}