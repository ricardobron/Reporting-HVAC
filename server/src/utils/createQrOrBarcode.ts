import bwipjs, { ToBufferOptions } from 'bwip-js';

export const createBarCode = async (
  text: string,
  scale: number,
  height: number
): Promise<Buffer> => {
  const result = bwipjs.toBuffer({
    bcid: 'code128',
    text,
    scale,
    height,
  });
  return result;
};

type ILabelType = 'machine';

interface IQrCodeRequest {
  id: string;
  label_type: ILabelType;
}

export const createQrCode = async (
  data: IQrCodeRequest,
  options?: ToBufferOptions
) => {
  const text = JSON.stringify(data);
  const buffer = await bwipjs.toBuffer({
    ...options,
    bcid: 'qrcode',
    text,
  });
  return buffer;
};
