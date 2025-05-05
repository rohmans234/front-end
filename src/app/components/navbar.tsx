import Link from "next/link";
import Wrapper from "./wrapper";
import Image from "next/image";
import { auth } from "@/app/lib/auth";
import Logout from "./logout";

export default async function Navbar() {
  const data = await auth();
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm">
      <Wrapper>
        <div className="h-[60px] flex items-center justify-between">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              alt="logo-blog"
              src={"/images/logo.png"}
              width={100}
              height={100}
              className="h-8 w-8"
              priority
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              PANDABLOG
            </span>
          </Link>
          {data ? (
            <div className="flex items-center gap-2 h-[30px]">
              <p>{data.user.name}</p>
              <Logout />
            </div>
          ) : (
            <div className="flex gap-2 h-[30px]">
              <Link
                href={"/login"}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800"
              >
                Login
              </Link>
              <Link
                href={"/register"}
                className="inline-flex items-center border px-3 py-2 text-sm font-medium text-center text-black bg-gray-300 rounded-lg hover:bg-gray-100"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </Wrapper>
    </div>
  );
}