import { IBlog } from "@/app/types/blog";
import Image from "next/image";

export default async function Page({ params }: { params: Promise <{id: string }>} ){
    const id = (await params).id
    const res = await fetch (
        `https://slinkybuilding-us.backendless.app/api/data/blogs/${id}?loadRelation=author`
    );
    const blog: IBlog = await res.json();
    return(
        <div>
            <div className="pt-10">
                <h1 className="text-center text-3xl font-bold">
                    {blog.title}
                </h1>
            </div>
            <div className="relative h-[200px] w-[200px] overflow-hidden items-center">
                <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    priority
                    className="w-full h-auto rounded-lg object-cover items-center"
                 />
            </div>
            <div className="">
                <p className="text-center">
                    {blog.content}
                </p>
            </div>
        </div>  
    )
}