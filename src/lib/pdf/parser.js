import pdfParse from "pdf-parse";

/**
 * Extract text from a PDF file (Buffer or Blob).
 * @param {Buffer|ArrayBuffer} data - PDF data
 * @returns {Promise<string>} Extracted text
 */
export async function extractPDFText(data) {
  const buffer = Buffer.from(data);
  const result = await pdfParse(buffer);
  return result.text;
}