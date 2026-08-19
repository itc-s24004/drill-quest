import CategoryFilter from "@/app/search/_components/CategoryFilter";
import SearchBar from "../../SearchBar";
import { useState } from "react";
import { App_DB_Category, App_DB_Tag } from "@/app/app.type";
import { app_api_request_get } from "@/app/api/app/app.api.type";
import { app_api_drill } from "@/app/api/app/drill/route";
import { User } from "lucide-react";
import Link from "next/link";
import { StateUpdateListener } from "@/app/_lib/client/update/state";
import { App_API_Client } from "@/app/api/app/client";
import { AppTag } from "../tag/tag.cmp";



type HeaderProps = {
    categories?: App_DB_Category[] | undefined;
    query: app_api_request_get<app_api_drill, "searchDrills">;
    tags: App_DB_Tag[];
    onUpdateQuery?(query: app_api_request_get<app_api_drill, "searchDrills">): void;
}


export function Header({categories, query, tags: _tags, onUpdateQuery}: HeaderProps) {
    const [update, setUpdate] = useState(0);
    
    const [currentQuery, setCurrentQuery] = useState(query);


    StateUpdateListener({value: query, onUpdate() {
        setCurrentQuery(query);
        setUpdate(c => c+1);
    }});

    const [tags, setTags] = useState(_tags);
    
    StateUpdateListener({value: _tags, onUpdate() {
        setTags(_tags);
        setUpdate(c => c+1);
    }})





    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState<number>();


    const [S_Tags, setS_Tags] = useState<App_DB_Tag[]>([]);


    function StateUpdate(call: () => void) {
        setUpdate(c => {
            if (c !== update) return c;
            call();
            return c+1;
        })
    }


    function getInputTagName(input: string) {
        return input.match(/(?:^|\s)[^\s]*$/)?.[0].trimStart();
    }
    

  
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <Link href={"/profile"} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--background-sub)] cursor-pointer">
                    <User size={18} color="#6b7280" strokeWidth={1.8} />
                </Link>
                <div className="flex-1 relative">
                    <SearchBar keywork={currentQuery.title ?? ""} tags={tags}
                        onChangeKeywork={(keyword) => {
                            const tagName = getInputTagName(keyword);
                            if (tagName !== undefined && tagName.length > 2 ) {
                                App_API_Client.tag.searchTags(tagName).then(res => {
                                    if (res?.success) {
                                        StateUpdate(() => {
                                            setS_Tags(res.data);
                                            console.log(res.data)
                                        })
                                    }
                                });
                            } else {
                                setUpdate(c => {
                                    if (c !== update) return c;
                                    setS_Tags([]);
                                    return c+1;
                                })
                            }
                            
                            setCurrentQuery({...currentQuery, title: keyword})
                        }}
                        onSubmit={() => {
                            onUpdateQuery?.({...currentQuery, categoryId: category, tagIds: tags.map(tag => tag.id)});
                        }}
                        onClickTag={(tag) => {
                            setTags(current => current.filter(t => t.id !== tag.id))
                        }}
                    />
                    {S_Tags.length > 0 && (
                        <div className="absolute left-0 right-0 mt-2 max-h-56 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg z-50">
                            <div className="border-b border-gray-100 px-3 py-2 text-xs font-medium text-gray-500">
                                タグ検索結果
                            </div>
                            <div className="divide-y divide-gray-100">
                                {S_Tags.map((tag, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        className="flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            setTags((current) => {
                                                if (current.some(t => t.id === tag.id)) return current;
                                                return [...current, tag]
                                            });
                                            setCurrentQuery((q) => {
                                                const title = q.title;
                                                if (!title) return q;
                                                const tag = getInputTagName(title);
                                                if (!tag) return q;
                                                return {...q, title: title.slice(0, title.length - tag.length)}
                                            })
                                            setS_Tags([]);
                                        }}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-500">
                                                #
                                            </span>
                                            <span className="text-sm font-medium text-gray-800">
                                                {tag.name}
                                            </span>
                                        </span>
                                        <span className="text-xs text-gray-400">追加</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {
                categories &&
                <CategoryFilter
                    categories={categories}
                    active={category}
                    onChange={(id) => {
                        setCategory(category === id ? undefined : id);
                    }}
                />
            }
        </div>
    )
}