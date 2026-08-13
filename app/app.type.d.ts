import { Prisma } from "./_lib/server/generated/prisma/client";




export type App_ChildrenProp = {
    children?: React.ReactNode;
}





export type App_DB_User = Prisma.UserGetPayload<{
    select: {
        id;
        name;
        email;
        createdAt;
        updatedAt;
    }
}>





export type App_DB_User_Details = Prisma.UserGetPayload<{
    select: {
        id;
        name;
        email;
        createdAt;
        updatedAt;

        setting;
    }
}>




/**
 * ドリル一覧ページ用
 */
export type App_DB_User_Details_Drill_List = Prisma.UserGetPayload<{
    select: {
        id;
        name;
        email;
        createdAt;

        drills: {
            select: {
                id;
                title;
                description;
                drillTag: {
                    select: {
                        id;
                        tag: {
                            select: {
                                id;
                                name;
                            }
                        }
                    }
                };
                share: {
                    select: {
                        createdAt;
                        group: {
                            select: {
                                id;
                                name;
                            }
                        }
                    }
                }
            }
        }
    }
}>




export type App_DB_Drill = Prisma.DrillGetPayload<{
    select: {
        id;
        title;
        description;
        drillTag: {
            select: {
                id;
                tag: {
                    select: {
                        id;
                        name;
                    }
                }
            }
        };
        _count: {
            select: {
                bookmark;
            }
        }
    }
}>






type App_DB_Category = Prisma.CategoryGetPayload<{
    select: {
        id: true;
        name: true;
    }
}>






type App_DB_Drill_ = Prisma.DrillGetPayload<{
    select: {
        id: true;
        title: true;
        description: true;
        drillTag: {
            select: {
                id: true;
                tag: {
                    select: {
                        id: true;
                        name: true;
                    }
                }
            }
        };
        _count: {
            select: {
                bookmark: true;
            }
        };
        bookmark: {
            where: {
                user: {
                    id: true;
                }
            };
            select: {
                id: true;
            }
        }
    }
}>



type App_DB_Drill_Answer_Detail = Prisma.DrillGetPayload<{
    select: {
        id: true;
        title: true;
        description: true;
        drillTag: {
            select: {
                id: true;
                tag: {
                    select: {
                        id: true;
                        name: true;
                    }
                }
            }
        };
        questions: {
            select: {
                id: true;
                body: true;
                sortIndex: true;
                choices: {
                    select: {
                        id: true;
                        body: true;
                    }
                }
            }
        };
        bookmark: {
            where: {
                user: {
                    id: true;
                }
            };
            select: {
                id: true;
            }
        };
        _count: {
            select: {
                bookmark: true;
            }
        }
    }
}>;




type App_DB_Drill_Detail = Prisma.DrillGetPayload<{
    select: {
        id: true;
        title: true;
        description: true;
        drillTag: {
            select: {
                id: true;
                tag: {
                    select: {
                        id: true;
                        name: true;
                    }
                }
            }
        };
        questions: {
            select: {
                id: true;
                body: true;
                sortIndex: true;
                choices: {
                    select: {
                        id: true;
                        body: true;
                        isCorrect: true;
                    }
                }
            }
        };
        bookmark: {
            where: {
                user: {
                    id: true;
                }
            };
            select: {
                id: true;
            }
        }
    }
}>;


type App_DB_Bookmark = Prisma.BookmarkGetPayload<{
    select: {
        id: true;
    }
}>




type App_DB_Result_Detail = Prisma.ResultGetPayload<{
    select: {
        createdAt: true,
        drill: {
            select: {
                id: true;
                title: true,
                description: true,
                questions: {
                    select: {
                        body: true,
                        choices: {
                            select: {
                                body: true,
                                isCorrect: true
                            }
                        },
                        resultQuestions: {
                            select: {
                                isCorrect: true
                            }
                        }
                    }
                }
            }
        }
    }
}>