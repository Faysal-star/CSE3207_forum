const APPROVED_USERS_SHEET_NAME = 'CSE20';
const EMAIL_COLUMN = 'A';
const EMAIL_RESPONSE_COLUMN = 2;
const CSE20_EMAIL_PATTERN = /^[a-z]+2007\d{3}@stud\.kuet\.ac\.bd$/i;

function onFormSubmit(e) {
  try {
    var range = e.range;
    var sheet = range.getSheet();
    var row = range.getRow();
    var respondentEmail = sheet.getRange(row, EMAIL_RESPONSE_COLUMN).getValue();

    if (!respondentEmail) {
      Logger.log('No email found in submission');
      return;
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var approvedUsersSheet = ss.getSheetByName(APPROVED_USERS_SHEET_NAME);

    if (!approvedUsersSheet) {
      throw new Error('Could not find sheet named "' + APPROVED_USERS_SHEET_NAME + '"');
    }

    var approvedUsersRange = approvedUsersSheet.getRange(EMAIL_COLUMN + ':' + EMAIL_COLUMN);
    var approvedUsers = approvedUsersRange.getValues()
      .flat()
      .filter(String)
      .map(email => email.toLowerCase().trim());
      
    if (!CSE20_EMAIL_PATTERN.test(respondentEmail) && !approvedUsers.includes(respondentEmail.toLowerCase().trim())) {
      handleRejection(ss, sheet, row, respondentEmail, 'Email not in approved users list');
      return;
    }

    Logger.log('Accepted submission from authorized user: ' + respondentEmail);

  } catch (error) {
    Logger.log('Error in onFormSubmit: ' + error.toString());
  }
}

function handleRejection(ss, sheet, row, respondentEmail, reason) {
  var rejectedSheet = ss.getSheetByName('Rejected Responses');
  if (!rejectedSheet) {
    rejectedSheet = ss.insertSheet('Rejected Responses');
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues();
    rejectedSheet.getRange(1, 1, 1, headers[0].length).setValues(headers);
  }
  var responseData = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues();
  rejectedSheet.getRange(rejectedSheet.getLastRow() + 1, 1, 1, responseData[0].length).setValues(responseData);
  sheet.deleteRow(row);


  var emailSubject = 'Form Submission Rejected';
  var emailBody = `<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
        <h1 style="color: #D32F2F; font-size: 24px; margin-bottom: 20px;">
          Form Submission Rejected
        </h1>
        
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 15px;">
          Your response to the form was <strong>not accepted</strong> because you are not on the list of 
          <em>KUET CSE 2k20 Students</em>.
        </p>
        
        <div style="background-color: #F5F5F5; padding: 15px; border-left: 4px solid #2196F3; margin: 20px 0;">
          <p style="margin: 0; font-size: 16px;">
            Please <b>Contact me</b> or <b>Reply to this email</b> if you believe this is an error:
          </p>
          <a href="mailto:pi.faysal.mahmud@gmail.com" style="text-decoration: none;">
          <p style="margin: 10px 0 0 0; color: #1565C0; font-weight: bold;">
            Faysal Mahmud (KUET CSE20)
          </p>
          </a>
        </div>
        
        <div style="margin-top: 30px; font-size: 14px; color: #666;">
          <p style="margin: 0;">Best regards,</p>
          <p style="margin: 5px 0 0 0;"><strong>KUET CSE 2k20</strong></p>
        </div>
      </div>`;

  MailApp.sendEmail({
    to: respondentEmail,
    subject: emailSubject,
    htmlBody: emailBody,
    noReply: false
  });

  Logger.log('Rejected submission from unauthorized user: ' + respondentEmail + ' (Reason: ' + reason + ')');
  return;
}

function testEmailColumn() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  Logger.log('Column numbers and their headers:');
  headers.forEach((header, index) => {
    Logger.log(`Column ${index + 1}: ${header}`);
  });
}

function testEmailPattern() {
  var testEmails = [
    'mahmud2007123@stud.kuet.ac.bd',
    'mahmud2007999@stud.kuet.ac.bd',
    'mahmud2007001@stud.kuet.ac.bd',
    'mahmud2008123@stud.kuet.ac.bd',
    '2007123@stud.kuet.ac.bd',
    'm2007@stud.kuet.ac.bd',
    '20071234@stud.kuet.ac.bd',
    'mahmud@gmail.com'
  ];
  
  testEmails.forEach(email => {
    Logger.log(`Testing ${email}: ${CSE20_EMAIL_PATTERN.test(email)}`);
  });
}