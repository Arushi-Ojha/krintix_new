import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Monolithic Architecture",
    description:
      "Building scalable backend architecture requires more than basic frameworks. Legacy systems degrade as user volume increases, creating operational drag and limiting enterprise expansion.",
    imageUrl: import.meta.env.BASE_URL + "images/service1.png", 
  },
  {
    title: "Manual Workflow Dependencies",
    description:
      "Scaling fails when business process automation is ignored. Without AI integrations to handle repetitive tasks, teams lose capital to manual execution rather than strategic growth.",
    imageUrl: import.meta.env.BASE_URL + "images/service2.png",
  },
  {
    title: "Poor Conversion Rate Optimization",
    description:
      "Why are landing pages not converting? Often due to friction in the user journey. Conversion rate optimization improves the percentage of users who take action through precise, data-backed design.",
    imageUrl: import.meta.env.BASE_URL + "images/service3.png",
  },
  {
    title: "Fragmented Data Systems",
    description:
      "Without machine learning solutions to synthesize cross-channel data, executive decision-making relies on intuition rather than predictive analytics. Growth requires absolute empirical clarity.",
    imageUrl: import.meta.env.BASE_URL + "images/service4.png",
  },
];

function ServiceCard({ service, index }: { service: any; index: number }) {
  const titleVariants = {
    hidden: { opacity: 1, filter: "blur(0px)" },
    visible: { opacity: 0, filter: "blur(10px)" },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: "-35% 0px -35% 0px" }}
      className="relative rounded-2xl bg-[#0d1754] p-8 overflow-visible min-h-[220px] flex flex-col justify-center"
    >
      <motion.img
        variants={imageVariants}
        transition={{ duration: 0.4 }}
        src={service.imageUrl}
        alt={`${service.title} illustration`}
        className={`absolute left-0 pointer-events-none ${
          index === 3 ? "-top-16 w-56 h-auto md:w-64" : "-top-10 w-40 h-auto md:w-48"
        }`}
      />

      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Title overlaps the exact same space as description */}
        <motion.div
          variants={titleVariants}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center"
        >
          <h3 className="text-3xl md:text-4xl leading-tight font-bold text-yellow-300 tracking-tight pr-8 md:pr-16">
            {service.title}
          </h3>
        </motion.div>

        <motion.div
          variants={contentVariants}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="absolute inset-0 flex items-center"
        >
          <p className="text-white/90 leading-relaxed font-light text-[1.02rem]">
            {service.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ServicesOffered() {
  return (
    <section className="bg-gradient-to-b from-[#fbfbfb] to-white py-24 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight pb-2 text-[#0d1754]">
            Why Startups Fail to Scale Tech.
          </h2>
          <div className="mt-6 h-1 w-24 bg-gradient-to-r from-yellow-300 to-yellow-200 mx-auto rounded-full" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-12 lg:gap-y-20">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

