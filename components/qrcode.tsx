import React, { useEffect, useRef, useState } from 'react';

import QRCodeStyling, {
  Options as QRCodeStylingOptions,
} from 'qr-code-styling';
import { baseUrl } from '@/lib/utils';

const qrOptions: QRCodeStylingOptions = {
  width: 300,
  height: 300,
  dotsOptions: {
    color: '#4267b2',
    type: 'rounded',
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 20,
  },
};

const useQRCodeStyling = (
  options: QRCodeStylingOptions
): QRCodeStyling | null => {
  if (typeof window !== 'undefined') {
    const QRCodeStylingLib = require('qr-code-styling');
    const qrCodeStyling: QRCodeStyling = new QRCodeStylingLib(options);
    return qrCodeStyling;
  }
  return null;
};

const QrCode = ({
  channelId,
  peerId,
}: {
  channelId: string;
  peerId: string;
}) => {
  const qrCode = useQRCodeStyling(qrOptions);
  const ref = useRef<any>(null);

  useEffect(() => {
    qrCode?.append(ref.current);
  }, [ref, qrCode]);

  useEffect(() => {
    qrCode?.update({
      data: `${baseUrl()}/channel/${channelId}?from=${peerId}`,
    });
  }, [qrCode, channelId, peerId]);

  return (
    <div className='m-3 my-5 flex justify-center items-center'>
      <div ref={ref} />
    </div>
  );
};

export default QrCode;
