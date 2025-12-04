"use client";
import { FlowButton } from "./FlowButton";

export default function Contact() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-8 pt-12 text-center" id="contact">
      {/* Updated Header */}
      <h1 className="mb-8 text-2xl sm:text-3xl md:text-4xl font-bold text-[#00145C] transition-colors duration-500 hover:text-[#70D7FF]">
        Wanna know more or <span className="font-semibold text-cyan-900 transition-all duration-300 hover:text-[#863FF3] hover:drop-shadow-[0_0_8px_rgba(134,63,243,0.8)] cursor-crosshair">any doubts?</span>
      </h1>

      {/* Join Team Plasmas Button - Centered */}
      <div className="mb-10 flex justify-center">
        <a
          href="https://forms.gle/SCosRwWz23wsNMNUA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FlowButton text="Join Team Plasmas to Build Systems" />
        </a>
      </div>

      <div className="flex flex-col items-center gap-6 font-mono text-sm">

        {/* Email */}
        <a
          href="mailto:kindaexample@gmail.com"
          className="group flex items-center gap-2 text-[#00145C] transition-colors hover:text-[#70D7FF]"
        >
          <span className="font-semibold text-cyan-900 transition-all duration-300 group-hover:text-[#863FF3] group-hover:drop-shadow-[0_0_8px_rgba(134,63,243,0.8)]">&gt; EMAIL ::</span>
          kindaexample@gmail.com
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/mintmojito-lite"
          target="_blank"
          className="group flex items-center gap-2 text-[#00145C] transition-colors hover:text-[#70D7FF]"
        >
          <span className="font-semibold text-cyan-900 transition-all duration-300 group-hover:text-[#863FF3] group-hover:drop-shadow-[0_0_8px_rgba(134,63,243,0.8)]">&gt; GITHUB ::</span>
          mintmojito-lite
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/bhaskar915"
          target="_blank"
          className="group flex items-center gap-2 text-[#00145C] transition-colors hover:text-[#70D7FF]"
        >
          <span className="font-semibold text-cyan-900 transition-all duration-300 group-hover:text-[#863FF3] group-hover:drop-shadow-[0_0_8px_rgba(134,63,243,0.8)]">&gt; LINKEDIN ::</span>
          bhaskar915
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/mint.mojito_"
          target="_blank"
          className="group flex items-center gap-2 text-[#00145C] transition-colors hover:text-[#70D7FF]"
        >
          <span className="font-semibold text-cyan-900 transition-all duration-300 group-hover:text-[#863FF3] group-hover:drop-shadow-[0_0_8px_rgba(134,63,243,0.8)]">&gt; INSTAGRAM ::</span>
          @mint.mojito_
        </a>

        {/* Mobile / Pi Joke */}
        <div className="group flex items-center gap-2 text-[#00145C] transition-colors hover:text-[#70D7FF] cursor-help">
          <span className="font-semibold text-cyan-900 transition-all duration-300 group-hover:text-[#863FF3] group-hover:drop-shadow-[0_0_8px_rgba(134,63,243,0.8)]">&gt; MOBILE ::</span>
          <span title="Good luck finding the end of Pi!">Last 10 digits of π</span>
        </div>
      </div>

      <div className="mt-20 text-[10px] text-[#222]">

      </div>
    </section>
  );
}