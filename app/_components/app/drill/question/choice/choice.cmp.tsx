import { Prisma } from "@/app/_lib/server/generated/prisma/client";
import { App_ChildrenProp } from "@/app/app.type";
import { Circle } from "lucide-react";

type App_ChoiceProps = Prisma.QuestionChoiceGetPayload<{
    select: {
        body: true;
    }
}> & {
    selected: boolean | undefined;
    onClick(): void;
} & App_ChildrenProp;

export function App_Choice({body, selected, onClick, children}: App_ChoiceProps) {
    return (
        <button 
            onClick={onClick}
            className={
                "flex items-center gap-3 rounded-xl border px-[14px] py-3 text-left transition-colors cursor-pointer bg-[var(--background)] "
                + (selected ? "border-[#60A5FA]" : "border-[var(--text-color-sub)]")
            }
        >
            {
                selected !== undefined &&
                <Circle
                    size={28}
                    stroke={"--background-over"}
                    strokeWidth={2}
                    fill={selected ? "#60A5FA" : "#DADCE0"}
                    className="shrink-0 transition-outline"
                />
            }
            <span className="text-[13.5px] font-semibold text-[--text-color] flex-1 flex items-center">
                {children ?? body}
            </span>
        </button>
    )
}