import React from 'react';
// Use the public folder path directly for background images.

const KXstudios: React.FC = () => {
  return (
    <section className="p-4 md:p-8 bg-[#ffffff]">
      {/* 
        The anchor tag acts as the clickable container.
        'group' enables the hover states for child elements.
      */}
      <a
        href="https://www.kxstudios.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full h-80 md:h-96 rounded-3xl overflow-hidden group shadow-xl cursor-pointer"
      >
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url('/krintix_new/images/kx.png')` }}
        />

        {/* 
          Hover Gradient Overlay 
          Goes from dark at the bottom to transparent at the top.
          Hidden by default (opacity-0), fades in on hover (group-hover:opacity-100).
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />

        {/* Text Content - Positioned at the bottom (the darker side of the gradient) */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
          <span className="text-black text-xl md:text-2xl font-bold flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            See how our AI development company built a scalable SaaS platform generating $1M ARR 
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-2">
              &rarr;
            </span>
          </span>
        </div>
      </a>
    </section>
  );
};

export default KXstudios;