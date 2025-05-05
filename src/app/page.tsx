import Image from "next/image";
import { IBlog } from "./types/blog";
import Link from "next/link";

export default async function Home() {
  const res = await fetch(
    "https://slinkybuilding-us.backendless.app/api/data/blogs?loadRelation=author",
    { cache: "no-store" }
  );
  const data: IBlog[] = await res.json();

  return (
    <div className="grid w-full py-4 px-28 max-sm:px-5 gap-2 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      {data.map((blog, idx) => (
        <div key={idx}>
          {/* Thumbnail */}
          <div className="relative h-[200px] w-full overflow-hidden">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              priority
              className="object-cover hover:scale-110"
            />
          </div>

          {/* Judul */}
          <div className="p-4 pb-0">
            <h2 className="text-md font-bold text-gray-900">
              {blog.title}
            </h2>
          </div>

          {/* Kategori */}
          <div className="px-4 pb-2">
            <p className="text-sm text-gray-700">{blog.category}</p>
          </div>

          {/* Baris: Profile + Konten tambahan */}
          <div className="flex items-start gap-3 px-4 pb-4">
            {/* Profile author */}
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="Author"
                fill
                priority
                className="object-cover rounded-full"
              />
            </div>

            {/* Konten tambahan */}
            <div className="flex-1 text-xs text-gray-600 break-all">
              {blog.thumbnail}
            </div>
          </div>
          <Link href={`/blog/${blog.objectId}`} className="inline-flex items-center px-3 py-2 text-sm text-white bg-amber-700 rounded-lg ml-30">
          Read more
          </Link>
        </div>
      ))}
    </div>
  );
}
