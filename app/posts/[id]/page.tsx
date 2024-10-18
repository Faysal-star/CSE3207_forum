import { google } from 'googleapis';
import Image from 'next/image'
import getSheetData from '@/lib/googleSheets';

function transformDriveLink(driveLink : string) {
    const fileIdMatch = driveLink.match(/id=(.+)$/);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    return driveLink;
}


async function fetchBlogData(id : string) {
    try {
        
        const start = 'A'+id;
        const end = 'H'+id;
        const response = await getSheetData(start, end);

        // Data
        if (response && response.length > 0) {
            const [timestamps, email , question1, answer1, question2, answer2, roll1, roll2] = response[0];

            // console.log(response.data.values[0]);
            // console.log('Data fetched successfully:', { title, content });
            const ans1 = transformDriveLink(answer1);
            const ans2 = transformDriveLink(answer2);
            return {timestamps, email , question1, answer1, ans1, question2, answer2, ans2, roll1, roll2}
        } else {
            console.log('No data found for the given range');
            return { title: 'No Title', content: 'No Content' };
        }
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        return { title: 'Error', content: error.message };
    }
}

interface BlogParams {
    params: {
        id: string;
    };
}

export default async function Blog({ params }: BlogParams) {
    const { id } = params;
    const {timestamps, email , question1, answer1, ans1, question2, answer2, ans2, roll1, roll2} = await fetchBlogData(id);

    return (
        <article>
            <h2>Blog</h2>
            <h1>{timestamps}</h1>
            <h1>{email}</h1>
            <h1>{question1}</h1>
            <Image 
             src={ans1}
             width={500}
             height={500}
             alt={answer1} />
            <h1>{question2}</h1>
            <Image 
             src={ans2}
             width={500}
             height={500}
             alt={answer2} />
             <h1>{roll1}</h1>
             <h1>{roll2}</h1>
        </article>
    )
}