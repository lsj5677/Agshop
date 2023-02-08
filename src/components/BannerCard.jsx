import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function BannerCard({ image, title, desc, link, rightCard }) {
  const cardVariants = {
    offscreen: {
      y: 200,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.article
      initial="offscreen"
      whileInView="onscreen"
      transition={{ delay: 0.4 }}
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div variants={cardVariants} className="sm:flex mb-10 sm:my-20">
        <div className={`${rightCard ? "order-2" : ""}`}>
          <motion.img src={`./images/${image}.jpeg`} alt={title} />
        </div>
        <div
          className={`${
            rightCard ? "text-right sm:-mr-10 sm:z-10" : "sm:-ml-10"
          } lg:pt-10`}
        >
          <motion.h2 className="text-3xl font-bold font-serif my-7 sm:my-10 md:text-4xl lg:text-5xl">
            {title}
          </motion.h2>
          <p className="text-lg">{desc}</p>
          <Link
            to={link}
            className="inline-block mt-10 bg-brown-light text-white py-2 px-4 box-border text-lg rounded-md cursor-pointer"
          >
            See Product
          </Link>
        </div>
      </motion.div>
    </motion.article>
  );
}
