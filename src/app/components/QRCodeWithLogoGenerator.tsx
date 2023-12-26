"use client";

"use client";
import React, { useState, useRef, ChangeEvent } from 'react';
import QRCode from 'qrcode.react';
import { Input, Button, InputNumber, Radio, Checkbox } from 'antd';

const QRCodeWithLogoGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState<any>('');
  const [size, setSize] = useState<any>(128);
  const [level, setLevel] = useState<any>('H');
  const [bgColor, setBgColor] = useState<any>('#FFFFFF');
  const [fgColor, setFgColor] = useState<any>('#000000');
  const [logoURL, setLogoURL] = useState<any>('');
  const [logoHeight, setLogoHeight] = useState<any>(30);
  const [logoWidth, setLogoWidth] = useState<any>(30);
  const qrCodeRef = useRef<HTMLDivElement>(null);
const [includeMargin, setIncludeMargin] = useState(false);

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

   const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoURL(e.target?.result || '');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black my-24 py-8">
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
        <label className="block text-lg text-white">
          <span className="text-white text-xl">Logo:</span>
          <input className="mt-1 block w-full" type="file" accept="image/*" onChange={handleLogoUpload} />
          <small className="text-gray-500">Faça upload de uma imagem de logotipo que será colocada no centro do código QR.</small>
        </label>
        <label className="block text-lg text-white">
          <span className="text-white text-xl">Largura do Logo:</span>
          <InputNumber className="mt-1 block w-full" min={1} max={1000} defaultValue={30} onChange={value => setLogoWidth(value || 30)} />
          <small className="text-gray-500">Defina a largura do logotipo. A largura padrão é 30.</small>
        </label>
        <label className="block text-lg text-white">
          <span className="text-white text-xl">Altura do Logo:</span>
          <InputNumber className="mt-1 block w-full" min={1} max={1000} defaultValue={30} onChange={value => setLogoHeight(value || 30)} />
          <small className="text-gray-500">Defina a altura do logotipo. A altura padrão é 30.</small>
          <br></br>
          <small className="text-gray-500">Cuidado para que o logo não ocupe uma area significante do QR Code e o torne impossivel de ler.</small>
        </label>
        <label className="block text-lg text-white">
          <span className="text-white text-xl">Incluir Margem:</span>
          <Radio.Group className="mt-1 block w-full" onChange={e => setIncludeMargin(e.target.value)} value={includeMargin}>
            <Radio value={true} className="text-white text-xl">Incluir</Radio>
            <Radio value={false} className="text-white text-xl">Não Incluir</Radio>
          </Radio.Group>
          <small className="text-gray-500">Selecione se deseja incluir uma margem no código QR.</small>
        </label>
        <div ref={qrCodeRef} className="flex justify-center w-full">
          <QRCode value={inputValue} includeMargin={includeMargin} size={size} level={level} bgColor={bgColor} fgColor={fgColor} imageSettings={{ src: logoURL, height: logoHeight, width: logoWidth, excavate: true }} />
        </div>
        <Button className="mt-1 block w-full h-24 text-4xl" type="primary" onClick={downloadQRCode}>Baixar Código QR</Button>
      </div>
    </div>
  );
};

export default QRCodeWithLogoGenerator;