import { Prisma } from "@/app/_lib/server/generated/prisma/client";
import { Circle } from "lucide-react";

type App_ChoiceProps = Prisma.QuestionChoiceGetPayload<{
    select: {
        body: true;
    }
}> & {
    selected: boolean;
    onClick(): void;
}

export function App_Choice({body, selected, onClick}: App_ChoiceProps) {
    return (
        <button 
            onClick={onClick}
            className={
                "flex items-center gap-3 rounded-xl border px-[14px] py-3 text-left transition-colors cursor-pointer "
                + (selected ? "border-[#2F6F5E] bg-[#E7F2EE]" : "border-[#DADCE0] bg-white")
            }
        >
            <Circle
                size={28}
                stroke={"#DADCE0"}
                strokeWidth={2}
                fill={selected ? "#7cb4a5" : "#DADCE0"}
                className="shrink-0 transition-outline"
            />
            <span className="text-[13.5px] font-semibold text-[#202124]">
                {body}
            </span>
        </button>
    )
}