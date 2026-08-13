import { Prisma } from "@/app/_lib/server/generated/prisma/client";
import { App_ChildrenProp } from "@/app/app.type";

type App_QuestionProps = Prisma.QuestionGetPayload<{
    select: {
        body: true;
    }
}> & App_ChildrenProp;

export function App_Question({body, children}: App_QuestionProps) {
    return (
        <div className="pb-6 mb-6 border-b border-[#DADCE0]">
            <div className="my-2 text-[14px] text-[#202124] whitespace-pre-line">
                {body}
            </div>

            <div className="mb-2 text-[11px] font-bold tracking-[0.5px] text-[#2F6F5E]">
                選択肢
            </div>
            <div className="flex flex-col gap-2.5">
                {children}
            </div>
        </div>
    )
}

