import getSheetData from "@/lib/googleSheets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import ImageModalCard from "@/components/ImageModalCard";

export const metadata = {
  title: "Answer"
};

function transformDriveLink(driveLink: string) {
  const fileIdMatch = driveLink.match(/id=(.+)$/);
  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  return driveLink;
}

async function fetchBlogData(id: string) {
  try {
    const start = "A" + id;
    const end = "H" + id;
    const response = await getSheetData(start, end);

    // Data
    if (response && response.length > 0) {
      const [
        timestamps,
        email,
        question1,
        answer1,
        question2,
        answer2,
        roll1,
        roll2,
      ] = response[0];

      // console.log(response.data.values[0]);
      // console.log('Data fetched successfully:', { title, content });
      const ans1 = transformDriveLink(answer1);
      const ans2 = transformDriveLink(answer2);
      return {
        timestamps,
        email,
        question1,
        answer1,
        ans1,
        question2,
        answer2,
        ans2,
        roll1,
        roll2,
      };
    } else {
      console.log("No data found for the given range");
      return { title: "No Title", content: "No Content" };
    }
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return { title: "Error", content: (error as Error).message };
  }
}

interface BlogParams {
  params: {
    id: string;
  };
}

export default async function Blog({ params }: BlogParams) {
  const { id } = params;
  const {
    timestamps,
    email,
    question1,
    answer1,
    ans1,
    question2,
    answer2,
    ans2,
    roll1,
    roll2,
  } = await fetchBlogData(id);

  return (
    <div className="flex flex-col justify-center items-center mt-5 w-[99vw]">
      <div className="max-w-[95%] w-[400px] md:w-[900px]">
        <Link href="/posts">
          <Button variant="outline" className="mb-5">
            <MoveLeft size={18} />
            <span className="ml-2">Back</span>
          </Button>
        </Link>
        <Tabs defaultValue="q1" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="q1">Question 1</TabsTrigger>
            <TabsTrigger value="q2">Question 2</TabsTrigger>
          </TabsList>
          <TabsContent value="q1">
            <ImageModalCard
                question={question1}
                ans={ans1 || ""}
                answer={answer1}
                />
          </TabsContent>
          <TabsContent value="q2">
            <ImageModalCard
                question={question2}
                ans={ans2 || ""}
                answer={answer2}
                />
          </TabsContent>
        </Tabs>
        <div className="w-full mt-5 border rounded-md px-5 py-3 text-muted-foreground">
            <p>
              Posted By: {roll1}, {roll2}
            </p>
            <p>Email: {email}</p>
            <p>Timestamps: {timestamps} </p>
        </div>
      </div>
    </div>
  );
}
