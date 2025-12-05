import "./globals.css";
import { Inter, JetBrains_Mono, Dancing_Script } from "next/font/google";
import Cursor from "../components/Cursor";
import DancingCat from "../components/DancingCat";
import ParticleBackground from "../components/ui/particle-background";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });

export const metadata = {
  title: "Bala Bhaskar | Systems Engineer",
  description: "High-Assurance Systems Portfolio",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${dancingScript.variable}`}>
      <body className="bg-background antialiased">
        {/* SVG filter for liquid glass effect (included once) */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
          <defs>
            <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012 0.012"
                numOctaves="2"
                seed="92"
                result="noise"
              />
              <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
              <feDisplacementMap in="SourceGraphic" in2="blurred" scale="85" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        {/* Only these two global items should be here */}
        <Cursor />
        <DancingCat />

        {/* Magnetic Particle Background */}
        <ParticleBackground />


        {/* This renders your page content (above the background) */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}