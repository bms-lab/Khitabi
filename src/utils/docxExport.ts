/**
 * Lazy-loaded Word (.docx) export with RTL / bidi paragraphs and Arabic styling.
 */

export interface ExportDocxOptions {
  title: string;
  recipient: string;
  salutation: string;
  subject: string;
  paragraphs: string[];
  closing: string;
  dateStr: string;
  senderName: string;
  senderTitle?: string;
  senderContact?: string;
  orgName?: string;
  logoDataUrl?: string;
}

export async function exportToDocx(options: ExportDocxOptions): Promise<void> {
  // Dynamically import docx package so it doesn't inflate initial bundle size
  const docx = await import('docx');
  const { Document, Packer, Paragraph, TextRun, AlignmentType } = docx;

  const fontName = 'Traditional Arabic';

  const docChildren: any[] = [];

  // Optional Organization Letterhead
  if (options.orgName) {
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        bidirectional: true,
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: options.orgName,
            bold: true,
            size: 32, // 16pt
            font: fontName,
            rightToLeft: true,
          }),
        ],
      })
    );
  }

  // Date line on top right
  if (options.dateStr) {
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.LEFT, // In RTL documents, date is often aligned to top-left or top-right
        bidirectional: true,
        spacing: { after: 240 },
        children: [
          new TextRun({
            text: `التاريخ: ${options.dateStr}`,
            size: 24, // 12pt
            font: fontName,
            rightToLeft: true,
          }),
        ],
      })
    );
  }

  // Recipient
  if (options.recipient) {
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        bidirectional: true,
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: options.recipient,
            bold: true,
            size: 28, // 14pt
            font: fontName,
            rightToLeft: true,
          }),
        ],
      })
    );
  }

  // Salutation
  if (options.salutation) {
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        bidirectional: true,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: options.salutation,
            size: 26, // 13pt
            font: fontName,
            rightToLeft: true,
          }),
        ],
      })
    );
  }

  // Subject line (if present)
  if (options.subject) {
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        bidirectional: true,
        spacing: { before: 120, after: 280 },
        children: [
          new TextRun({
            text: options.subject,
            bold: true,
            underline: {},
            size: 28, // 14pt
            font: fontName,
            rightToLeft: true,
          }),
        ],
      })
    );
  }

  // Body paragraphs
  options.paragraphs.forEach((pText) => {
    if (!pText.trim()) return;
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        bidirectional: true,
        spacing: { after: 240, line: 360 }, // 1.5 line spacing
        children: [
          new TextRun({
            text: pText,
            size: 28, // 14pt
            font: fontName,
            rightToLeft: true,
          }),
        ],
      })
    );
  });

  // Closing
  if (options.closing) {
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        bidirectional: true,
        spacing: { before: 240, after: 360 },
        children: [
          new TextRun({
            text: options.closing,
            bold: true,
            size: 28, // 14pt
            font: fontName,
            rightToLeft: true,
          }),
        ],
      })
    );
  }

  // Signature Block (Aligned to Left in RTL, which is the traditional end-of-page signature position)
  const sigChildren: any[] = [];
  if (options.senderTitle) {
    sigChildren.push(
      new Paragraph({
        alignment: AlignmentType.LEFT,
        bidirectional: true,
        spacing: { after: 80 },
        children: [
          new TextRun({
            text: options.senderTitle,
            size: 24,
            font: fontName,
            rightToLeft: true,
          }),
        ],
      })
    );
  }
  if (options.senderName) {
    sigChildren.push(
      new Paragraph({
        alignment: AlignmentType.LEFT,
        bidirectional: true,
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: options.senderName,
            bold: true,
            size: 26,
            font: fontName,
            rightToLeft: true,
          }),
        ],
      })
    );
  }
  if (options.senderContact) {
    sigChildren.push(
      new Paragraph({
        alignment: AlignmentType.LEFT,
        bidirectional: true,
        spacing: { after: 80 },
        children: [
          new TextRun({
            text: options.senderContact,
            size: 22,
            font: fontName,
            rightToLeft: true,
          }),
        ],
      })
    );
  }

  sigChildren.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      bidirectional: true,
      spacing: { before: 180 },
      children: [
        new TextRun({
          text: 'التوقيع: ...........................',
          size: 24,
          font: fontName,
          rightToLeft: true,
        }),
      ],
    })
  );

  docChildren.push(...sigChildren);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        children: docChildren,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = `${options.title.replace(/[\s/\\?%*:|"<>]/g, '_')}.docx`;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
