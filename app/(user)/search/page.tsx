import { redirect } from "next/navigation";
import { ResultsSkeleton, Results } from "./_components/results";
import { Suspense } from "react";


interface SearchPageProps {
    searchParams: {
        term?: string;

    }
}






const SearchPage = ({ searchParams }: SearchPageProps) => {

    if (!searchParams.term) {

        redirect("/");
    }


    return (
    
    <div className="h-full w-full p-8 max-w-screen-2xl mx-auto" >

<Suspense fallback ={<ResultsSkeleton/>}>
        <Results  term={searchParams.term}/>
    </Suspense>
    </div>
    )
}

export default SearchPage;
