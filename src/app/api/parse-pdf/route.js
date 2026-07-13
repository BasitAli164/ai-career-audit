import { NextResponse } from 'next/server';
import PDFParser from 'pdf2json';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const pdfParser = new PDFParser();
    
    // Return a promise to handle async parsing
    const result = await new Promise((resolve, reject) => {
      pdfParser.on('pdfParser_dataError', (err) => {
        console.error('PDF parsing error:', err);
        reject(new Error('Failed to parse PDF'));
      });
      
      pdfParser.on('pdfParser_dataReady', (pdfData) => {
        let fullText = '';
        if (pdfData && pdfData.formImage && pdfData.formImage.Pages) {
          for (const page of pdfData.formImage.Pages) {
            if (page.Texts) {
              for (const text of page.Texts) {
                if (text.R && text.R[0] && text.R[0].T) {
                  // Decode URL-encoded text
                  fullText += decodeURIComponent(text.R[0].T) + ' ';
                }
              }
            }
            fullText += '\n';
          }
        }
        resolve(fullText.trim() || 'No text found in PDF');
      });
      
      pdfParser.parseBuffer(buffer);
    });
    
    return NextResponse.json({ text: result });
  } catch (error) {
    console.error('PDF parsing error:', error);
    return NextResponse.json(
      { error: 'Failed to parse PDF. Please ensure it is a valid PDF file.' },
      { status: 500 }
    );
  }
}