import Link from "next/link";
import getSheetData from "@/lib/googleSheets";
import { ModeToggle } from "@/components/ModeToggle";
import Pagination from "@/components/Pagination";
import { MoveLeft, MoveRight } from "lucide-react";

export const metadata = {
  title: "Questions",
};

interface SearchParams {
  page?: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const page = parseInt(searchParams.page ?? "1") || 1;
  const postsPerPage = 10;
  const data = await getSheetData("A", "H");

  const reversedRows = (data ?? []).slice(1);

  const rows = reversedRows.reverse();

  const posts = rows.map((row, index) => ({
    id: rows.length - index + 1,
    timestamp: row[0],
    email: row[1],
    question1: row[2],
    answer1: row[3],
    question2: row[4],
    answer2: row[5],
    roll1: row[6],
    roll2: row[7],
  }));

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginatedPosts = posts.slice(start, end);

  return (
    <div className="flex flex-col items-center justify-center w-[98vw] pb-4 overflow-hidden">
      <div className="relative flex items-center justify-between w-full mt-5 max-w-[800px]">
        <Link href="/" className="ml-5">
          <MoveLeft size={20} />
        </Link>
        <h1 className="text-4xl">Questions</h1>
        <div className="mr-5">
          <ModeToggle />
        </div>
      </div>

      {paginatedPosts.map((post) => (
        <div
          key={post.id}
          className="m-5 border rounded-lg shadow-lg border-slate-300 dark:border-slate-800 w-[90vw] max-w-[800px] overflow-hidden"
        >
          <div className="p-5">
            <h2 className="font-semibold">Question 1</h2>
            <p className="mb-5 text-sm text-muted-foreground">
              {post.question1}
            </p>
            <h2 className="font-semibold">Question 2</h2>
            <p className="text-sm text-muted-foreground">{post.question2}</p>
          </div>
          <div className="p-5 pt-1 text-xs md:text-sm text-slate-500 flex justify-between items-center">
            <div>
              <p>
                Posted By: {post.roll1}, {post.roll2}
              </p>
              <p>Timestamp: {post.timestamp}</p>
            </div>
            <Link
              href={`/posts/${post.id}`}
              className="flex items-center text-slate-800 dark:text-slate-200 "
            >
              <span className="mr-1">View Answer</span>
              <MoveRight size={20} />
            </Link>
          </div>
        </div>
      ))}

      <div>
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
