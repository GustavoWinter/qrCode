import QRCodeGenerator from "./components/QRCodeGenerator";
import QRCodeWithLogoGenerator from "./components/QRCodeWithLogoGenerator";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between px-24 my-12">
      <QRCodeWithLogoGenerator />
    </main>
  )
}
