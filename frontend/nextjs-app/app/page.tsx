import { Suspense } from "react";

import { AllPosts } from "@/app/components/Posts";
import { sanityFetch } from "@/sanity/lib/live";
import { getHomePageQuery } from "@/sanity/lib/queries";

export default async function Page() {
  const [{ data: page }] = await Promise.all([
    sanityFetch({ query: getHomePageQuery }),
  ]);
  return (
    <>
      <div
        className="bg-gradient-to-r from-red-900 from-0% via-black via-40%  relative"
        style={{
          backgroundImage: `url(${page?.heroBanner})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-gradient-to-b from-black w-full h-40 absolute top-0"></div>
        <div className="bg-gradient-to-t from-black w-full h-40 absolute bottom-0"></div>
        <div className="container relative h-full">
          <div className="mx-auto max-w-2xl py-20 lg:max-w-4xl lg:px-12 text-center">
            <div className="flex flex-col gap-4 items-center">
              <div className=" text-md leading-6 prose uppercase text-white">
                {page?.subtitle}
              </div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white">
                <span className="text-red-500 ">
                  {page?.title?.split(" ")[0]}
                </span>{" "}
                <span className="text-[#fff] ">
                  {page?.title?.split(" ").slice(1).join(" ")}
                </span>
              </h1>
            </div>
            <div className="mt-6 space-y-6 prose sm:prose-lg md:prose-xl lg:prose-2xl text-white">
              <p>{page?.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-black">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>{await AllPosts()}</Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
