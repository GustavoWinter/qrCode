import QRCodeGenerator from "./components/QRCodeGenerator";
import QRCodeWithLogoGenerator from "./components/QRCodeWithLogoGenerator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 mt-24 mb-24">
      {/* <QRCodeGenerator /> */}
      <QRCodeWithLogoGenerator />
    </main>
  )
}
