"use client";
import React, { useState, useRef, ChangeEvent } from 'react';
import QRCode from 'qrcode.react';
import { Input, Button, InputNumber, Radio } from 'antd';

const QRCodeGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState<any>('');
  const [size, setSize] = useState<any>(128);
  const [level, setLevel] = useState<any>('H');
  const [bgColor, setBgColor] = useState<any>('#FFFFFF');
  const [fgColor, setFgColor] = useState<any>('#000000');
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string | number>>) => (event: ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value || '');
  };

  const downloadQRCode = () => {
    const canvas = qrCodeRef.current?.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qrcode.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="space-y-4">
        <label className="block text-lg text-white">
          <span className="text-white text-xl">URL para Codificar:</span>
          <Input className="mt-1 block w-full" placeholder="Insira a URL" value={inputValue} onChange={handleChange(setInputValue)} />
          <small className="text-gray-500">Insira a URL que você deseja codificar no código QR.</small>
        </label>
        <label className="block text-lg text-white">
          <span className="text-white text-xl">Tamanho do Código QR:</span>
          <InputNumber className="mt-1 block w-full" min={1} max={1000} defaultValue={128} onChange={value => setSize(value || 128)} />
          <small className="text-gray-500">Defina o tamanho do código QR. O tamanho padrão é 128.</small>
        </label>
        <label className="block text-lg text-white">
          <span className="text-white text-xl">Nível de Correção de Erro:</span>
          <Radio.Group className="mt-1 block w-full" onChange={e => setLevel(e.target.value)} value={level}>
            <Radio.Button value="L">L</Radio.Button>
            <Radio.Button value="M">M</Radio.Button>
            <Radio.Button value="Q">Q</Radio.Button>
            <Radio.Button value="H">H</Radio.Button>
          </Radio.Group>
          <small className="text-gray-500">Selecione o nível de correção de erro para o código QR. Níveis mais altos oferecem mais correção de erro ao custo de complexidade do código QR.</small>
          <small className="text-gray-500">Para impressoes opte pela correção de alto nivel H. Isso evitará problemas de impressao como distorção</small>
        </label>
        <label className="block text-lg text-white">
          <span className="text-white text-xl">Cor de Fundo:</span>
          <Input className="mt-1 block w-full" type="color" value={bgColor} onChange={handleChange(setBgColor)} />
          <small className="text-gray-500">Selecione a cor de fundo para o código QR.</small>
        </label>
        <label className="block text-lg text-white">
          <span className="text-white text-xl">Cor de Frente:</span>
          <Input className="mt-1 block w-full" type="color" value={fgColor} onChange={handleChange(setFgColor)} />
          <small className="text-gray-500">Selecione a cor de frente para o código QR.</small>
        </label>
        <div ref={qrCodeRef} className="flex justify-center w-full">
          <QRCode value={inputValue} size={size} level={level} bgColor={bgColor} fgColor={fgColor} />
        </div>
        <Button className="mt-1 block w-full h-24 text-4xl" type="primary" onClick={downloadQRCode}>Baixar Código QR</Button>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
