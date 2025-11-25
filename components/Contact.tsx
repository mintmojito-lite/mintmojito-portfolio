"use client";

export default function Contact() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-32 pt-20 text-center" id="contact">
      {/* Updated Header */}
      <h1 className="mb-8 text-2xl sm:text-3xl md:text-4xl font-bold text-[#333] transition-colors duration-500 hover:text-white">
        Wanna know more or <span className="text-cyan-900 transition-colors duration-500 hover:text-cyan-400">any doubts?</span>
      </h1>

      <div className="flex flex-col items-center gap-6 font-mono text-sm">
        
        {/* Email */}
        <a 
          href="mailto:kindaexample@gmail.com" 
          className="group flex items-center gap-2 text-[#444] transition-colors hover:text-white"
        >
          <span className="text-cyan-900 transition-colors group-hover:text-cyan-500">&gt; EMAIL ::</span>
          kindaexample@gmail.com
        </a>

        {/* GitHub */}
        <a 
          href="https://github.com/mintmojito-lite" 
          target="_blank"
          className="group flex items-center gap-2 text-[#444] transition-colors hover:text-white"
        >
          <span className="text-cyan-900 transition-colors group-hover:text-cyan-500">&gt; GITHUB ::</span>
          mintmojito-lite
        </a>

        {/* LinkedIn */}
        <a 
          href="https://www.linkedin.com/in/bhaskar915" 
          target="_blank"
          className="group flex items-center gap-2 text-[#444] transition-colors hover:text-white"
        >
          <span className="text-cyan-900 transition-colors group-hover:text-cyan-500">&gt; LINKEDIN ::</span>
          bhaskar915
        </a>

        {/* Instagram (Added) */}
        <a 
          href="https://instagram.com/mint.mojito_" 
          target="_blank"
          className="group flex items-center gap-2 text-[#444] transition-colors hover:text-white"
        >
          <span className="text-cyan-900 transition-colors group-hover:text-cyan-500">&gt; INSTAGRAM ::</span>
          @mint.mojito_
        </a>

        {/* Mobile / Pi Joke (Added) */}
        <div className="group flex items-center gap-2 text-[#444] transition-colors hover:text-white cursor-help">
          <span className="text-cyan-900 transition-colors group-hover:text-cyan-500">&gt; MOBILE ::</span>
          <span title="Good luck finding the end of Pi!">Last 10 digits of π</span>
        </div>
      </div>

      <div className="mt-20 text-[10px] text-[#222]">
        
      </div>
    </section>
  );
}