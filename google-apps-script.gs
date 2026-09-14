/**
 * Publishes approved Google Form responses as testimonial JSON.
 *
 * Expected sheet headers:
 * Full Name, Designation, LinkedIn Profile Link, Comment, Approved
 */
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) {
    return jsonResponse([]);
  }

  const normalize = value => value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  const headers = values.shift().map(normalize);
  const findColumn = (...names) => names
    .map(normalize)
    .map(name => headers.indexOf(name))
    .find(index => index >= 0);
  const nameIndex = findColumn('full name', 'name');
  const roleIndex = findColumn('designation', 'role', 'designation / role');
  const quoteIndex = findColumn('comment', 'your testimonial', 'testimonial', 'feedback');
  const approvedIndex = findColumn('approved', 'approval', 'approved status');

  if ([nameIndex, roleIndex, quoteIndex, approvedIndex].some(index => index === undefined)) {
    throw new Error('Required headers are missing from the response sheet.');
  }

  const testimonials = values
    .filter(row => row[approvedIndex].trim().toLowerCase() === 'yes')
    .map(row => ({
      name: row[nameIndex].trim(),
      role: row[roleIndex].trim(),
      quote: row[quoteIndex].trim()
    }))
    .filter(testimonial => testimonial.name && testimonial.quote);

  return jsonResponse(testimonials);
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
