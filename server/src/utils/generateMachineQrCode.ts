import PDFDocument from 'pdfkit';
import { format } from 'date-fns';
import { createQrCode } from './createQrOrBarcode';

export const generateMachineQrCode = async (data: {
  machine_id: string;
  company_name: string;
  machine_name: string;
}): Promise<PDFKit.PDFDocument> => {
  // ? largura:10,5 cms  (lagura do rolo corrido, altura selecionável)
  const pageH = 197.63779528;
  const pageW = 170.07874016;
  const orientation = 'landscape';
  const margins = { top: 10, left: 10, right: 10, bottom: 10, orientation };
  const font = 'Helvetica';
  const fontBold = 'Helvetica-Bold';
  const fsBig = 14;
  const fsMedium = 9;
  const fsSmall = 8;
  const imageH = 125;
  const imageW = 125;
  let topo = 5;
  const space = 15;
  const spaceSmall = 10;
  const leftSpace = 10;
  const size: number[] = [pageW, pageH];

  const qrCode = await createQrCode({
    id: data.machine_id || '',
    label_type: 'machine',
  });

  const pdfKitOptions: PDFKit.PDFDocumentOptions = { size, font, margins };
  const doc = new PDFDocument(pdfKitOptions);

  doc
    .font(fontBold)
    .fontSize(fsBig)
    .text(`${data.company_name}`, leftSpace, topo, {
      width: pageW,
      align: 'left',
    });

  topo += space * 1.2;

  doc
    .fontSize(fsMedium)
    .text(`Máquina - (${data.machine_name})`, leftSpace, topo, {
      width: pageW,
      align: 'left',
      lineBreak: true,
    });

  topo += space * 1.5;

  doc.image(qrCode, pageW / 2 - imageW / 2, topo, {
    width: imageW,
    height: imageH,
    align: 'center',
  });
  topo += imageH + spaceSmall;

  return doc;
};
