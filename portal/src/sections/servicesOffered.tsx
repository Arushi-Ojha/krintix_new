import React from 'react';

const services = [
  {
    title: 'Dynamic Infrastructure Topologies',
    description:
      'Engineering resilient, high-availability matrices that autonomously adapt to fluctuating enterprise loads. We systematically decouple legacy constraints to deploy frictionless, future-proof operational frameworks that scale without structural degradation.',
    // Add your transparent image filenames here
    imageUrl: '/images/service1.png', 
  },
  {
    title: 'Autonomous Cognitive Workflows',
    description:
      'Integrating self-optimizing neural logic into your core business operations. We transform static, manual bottlenecks into predictive, hyper-efficient automated delivery mechanisms utilizing bespoke machine learning integrations.',
    imageUrl: '/images/service2.png',
  },
  {
    title: 'Quantitative Market Penetration',
    description:
      'Executing algorithmic growth vectors driven by real-time behavioral telemetry. We leverage deep data synthetics to orchestrate high-fidelity acquisition funnels, ensuring hyper-targeted institutional expansion with zero-waste capital allocation.',
    imageUrl: '/images/service3.png',
  },
  {
    title: 'Telemetry & Signal Extraction',
    description:
      'Distilling chaotic data lakes into high-contrast institutional alpha. We architect bidirectional telemetry pipelines that eradicate organizational blind spots, empowering executive decision-making through absolute empirical clarity.',
    imageUrl: '/images/service4.png',
  },
];

export default function ServicesOffered() {
  return (
    <section className="bg-gradient-to-b from-[#fbfbfb] to-white py-24 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight pb-2 text-[#0d1754]">
            Architecting Scale. Synthesizing Growth.
          </h2>
          <div className="mt-6 h-1 w-24 bg-gradient-to-r from-yellow-300 to-yellow-200 mx-auto rounded-full" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-12 lg:gap-y-20">
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="group relative rounded-2xl bg-[#0d1754] p-8 transition-all duration-300 hover:bg-[#0d1754]/95 hover:shadow-md hover:z-10 overflow-visible"
              >
                {/* Absolute image: hidden by default, appears on hover where heading hides */}
                <img
                  src={service.imageUrl}
                  alt={`${service.title} illustration`}
                  className={`absolute left-0 pointer-events-none opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 ${index === 3 ? '-top-16 w-56 h-auto md:w-64' : '-top-10 w-40 h-auto md:w-48'}`}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Title kept inside the card (navy and yellow with black stroke for yellow) */}
                  <div className="mb-2 relative z-40">
                    <h3 className="text-3xl md:text-4xl leading-tight font-bold text-yellow-300 tracking-tight pr-8 md:pr-16 transition-opacity duration-200 opacity-100 group-hover:opacity-0">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-white/90 leading-relaxed font-light text-[1.02rem] relative z-40 transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto mt-2">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}