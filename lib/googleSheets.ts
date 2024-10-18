import { google } from 'googleapis';

async function getSheetData(st : string , ed : string) {
    const auth = await google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    const range = `Form Responses 1!${st}:${ed}`;

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range
    });

    const rows = response.data.values;
    return rows;
}

export default getSheetData;