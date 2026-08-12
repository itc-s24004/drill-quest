import CategoryFilter from "@/app/search/_components/CategoryFilter";
import SearchBar from "../../SearchBar";
import { useState } from "react";
import { App_DB_Category } from "@/app/app.type";
import { app_api_request_get } from "@/app/api/app/app.api.type";
import { app_api_drill } from "@/app/api/app/drill/route";
import { User } from "lucide-react";
import Link from "next/link";
import { StateUpdateListener } from "@/app/_lib/client/update/state";



type HeaderProps = {
    categories?: App_DB_Category[] | undefined;
    query: app_api_request_get<app_api_drill, "searchDrills">;
    onUpdateQuery?(query: app_api_request_get<app_api_drill, "searchDrills">): void;
}


export function Header({categories, query, onUpdateQuery}: HeaderProps) {
    const [currentQuery, setCurrentQuery] = useState(query);


    StateUpdateListener({value: query, onUpdate() {
        setCurrentQuery(query);
    }});





    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState<number>();


  
    return (
        <div className="flex flex-col bg-white/90 gap-3 px-4 pb-3 pt-4">
            <div className="flex items-center gap-3">
                <Link href={"/profile"} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-50 cursor-pointer">
                    <User size={18} color="#6b7280" strokeWidth={1.8} />
                </Link>
                <div className="flex-1">
                    <SearchBar keywork={currentQuery.title ?? ""}
                        onChangeKeywork={(keyword) => {
                            setCurrentQuery({...currentQuery, title: keyword})
                        }}
                        onSubmit={() => {
                            onUpdateQuery?.(currentQuery);
                        }}/>
                </div>
            </div>
            {
                categories &&
                <CategoryFilter
                    categories={categories}
                    active={category}
                    onChange={setCategory}
                />
            }
        </div>
    )
}