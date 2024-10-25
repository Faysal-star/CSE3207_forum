# CSE 3207 Forum

> **KUET CSE: Applied Statistics and Queuing Theory Q&A Forum**

A web application built with Next.js, Shadcn/UI, and Aceternity UI, leveraging Google Sheets as a backend for data storage and form submission management. Apps Script is used for automatically process and filter form submissions, keeping only approved entries in the Google Sheet.

#### Live Link - [cse-3207-forum.vercel.app](https://cse-3207-forum.vercel.app/)

## Features

- **Student Q&A Submission Form**: A Google Form serves as the front-end input source, allowing users to submit Questions and Answers easily.
- **Automatic Approval System**: Google Apps Script and Trigger that checks each form submission and only retains approved Student's entries in the Google Sheet. Non-approved entries are automatically moved to rejected sheet and user gets a Rejection Email.
- **API Integration**: Data from the Google Sheet is accessible through the Google Sheets API.
- **UI Components**: Styled with Shadcn/UI and Aceternity UI for a consistent and user-friendly interface.

## Technology Used

- **Next.js**: Framework for building the web application, enabling server-side rendering and API integration.
- **Tailwind CSS**, **shadcn/ui** and **Aceternity UI**: Used for crafting the user interface, offering custom-designed components and styles.
- **Google Sheets**: Backend data storage for student-submitted information.
- **Google Forms**: Input source for student submissions.
- **Google Apps Script**: Script automation that filters and removes non-approved submissions from the Google Sheet.
- **Google Sheets API**: Facilitates access to the sheet’s data via the Next.js application, allowing data retrieval and updates.

## Sheet Automation

Google Sheets Trigger and Apps Script are used to automatically filter email submissions. Submissions from KUET CSE 20 students’ emails are approved automatically; otherwise, the submission is deleted from the main sheet and moved to a rejected sheet. For more details on the automation process, see the [lib/Approval_Script.gs](lib/Approval_Script.gs) file. The `onFormSubmit` function is set as the **Trigger for Approval**. Rejected submissions will receive an automated email notification.

---

## Getting Started

### Prerequisites

- **Google Cloud Account**: Required for enabling and managing the Google Sheets API.
- **Google Sheets and Google Form**: Make a Google Form, Link with Sheets and configure with Apps Script and triggers.
- **Next.js Environment**: Installed and configured with Tailwind CSS, shadcn/ui and Aceternity UI.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Faysal-star/CSE3207_forum.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Google Sheets API access in Google Cloud Console and store the credentials securely. GCP will provide a ```secrets.json``` file. Remove the line breaks and paste in the .env.local file. The .env should contain -
   ```plaintext
   SHEET_ID= YOUR_LINKED_SHEET_ID
   GOOGLE_CREDENTIALS= 'OBTAINED_FROM_GCP'
   ```
4. Run the app
   ```bash
   npm run dev
   ```
5. Configure Google Sheets and Google Apps Script as per the automation steps outlined.

<br/>

> If you have any questions or need help setting up your own forum, please don't hesitate to reach out to me.

## License

This project is licensed under the GNU Affero General Public License v3.0. See the [LICENSE](LICENSE) file for details.

## Attribution

If you modify this project, please include credit to the original author in any derivative work.



