"use client";
import { motion } from "framer-motion";
import DynamicAbout from "./DynamicAbout";
import LinkPopover from "./LinkPopover";

export default function About() {
  return (
    <section className="relative mx-auto max-w-2xl sm:max-w-3xl md:max-w-4xl px-8 py-12 md:py-16" id="about">

      <div className="space-y-16">

        <StealthParagraph>
          <DynamicAbout />.
        </StealthParagraph>

        <StealthParagraph>
          I've engineered <GlowSpan>some real systems</GlowSpan>.
          These span <GlowSpan>cybersecurity, AI pipelines, medical analytics, NLP</GlowSpan>, and trust-focused architectures.
          Check them below. If you want to see what actual engineering looks like, so let's skip the formalities and get to the real part.
        </StealthParagraph>

        <StealthParagraph>
          I genuinely love <LinkPopover message="View the recipes?" href="https://docs.google.com/document/d/1R9nFTt3zf15TIw5KCaEygXMChPo8FOdeWW5Q_u5BTkg/edit?usp=drivesdk">cooking</LinkPopover> not just as a hobby, but as something that feels fun, calming, and creative.
          When I'm not experimenting in the kitchen, you'll probably find me listening to <LinkPopover message="View playlist?" href="https://open.spotify.com/playlist/7vq0yqqEkTsQkxG4TbHZcZ?si=-tWf2fs3TqmDyn5ehOfnBw&pi=PRAhIRP9Sa2Be">The Creator</LinkPopover> or <LinkPopover message="View playlist?" href="https://open.spotify.com/playlist/5AaNQfh2DE9RIt9I6a0aHN?si=O0vQPFCqQLO2oDFGc7SRtg&pi=jRmUn0gSSmuKL">Chinmayi</LinkPopover>,
          or sitting with a sketchbook.
        </StealthParagraph>

        <StealthParagraph>
          Yeah, I know how to <GlowSpan>draw</GlowSpan> and I enjoy it more than I admit 🤓☝️
        </StealthParagraph>

      </div>

      <div className="mt-20 flex justify-end pr-6 font-mono text-[10px] text-[#222]">

      </div>

    </section>
  );
}

function StealthParagraph({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-2xl leading-relaxed text-[#00145C] transition-colors duration-500 hover:text-[#70D7FF] cursor-default"
    >
      {children}
    </motion.p>
  );
}

function GlowSpan({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-semibold text-cyan-900 transition-all duration-300 hover:text-[#863FF3] hover:drop-shadow-[0_0_8px_rgba(134,63,243,0.8)] cursor-crosshair">
      {children}
    </span>
  );
}