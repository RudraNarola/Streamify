
"use client";
import { Tv, KeySquare, MessageSquareText, UsersRound } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useCreatorCollapse } from '@/store/useCreatorCollapse';
import Link from 'next/link';



export default function Content() {
    const { collapse } = useCreatorCollapse();

    return (


        <div className={cn(collapse ? "mt-1" : "mt-1 lg:mt-6")}>
            {!collapse && (
                <div className="text-sm text-muted-foreground mb-4 max-lg:hidden">
                    Enjoy the new experience
                </div>
            )}

            {!collapse && (
                <div className='flex flex-col space-y-5'>


                    <Link href=''>
                        <div className='flex items-center space-x-3'>
                            <Tv size={30} />
                            <span className=" max-lg:hidden">
                                Stream
                            </span>
                        </div>
                    </Link>

                    <Link href=''>
                        <div className='flex items-center space-x-3'>
                            <KeySquare size={30} />
                            <span className='max-lg:hidden'>Keys</span>
                        </div>
                    </Link>

                    <Link href=''>
                        <div className='flex items-center space-x-3'>
                            <MessageSquareText size={30} />
                            <span className='max-lg:hidden' >Messages</span>
                        </div>
                    </Link>

                    <Link href=''>
                        <div className='flex items-center space-x-3'>
                            <UsersRound size={30} />
                            <span className='max-lg:hidden'>Users</span>
                        </div>
                    </Link>
                </div>
            )
            }
            {collapse && (
                <div className='flex flex-col space-y-5'>
                    <Link href=''>
                        <Tv size={30} />
                    </Link>
                    <Link href=''>
                        <KeySquare size={30} />
                    </Link>
                    <Link href=''>
                        <MessageSquareText size={30} />
                    </Link>
                    <Link href=''>
                        <UsersRound size={30} />
                    </Link>
                </div>
            )
            }
        </div>
    )
}