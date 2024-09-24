import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from "../utils/motion";

const AIResults = ({results}) => {
  // Got to new line on periods and commas
  const formattedResults = results.split(/(?<=[,.])/).map((segment, index) => {
    return <p key={index}>{segment.trim()}</p>;
  });

  return (
    <motion.div 
      variants={fadeIn("right", "", 0, 2)}
      initial="hidden"
      animate='show'
      className="ai-results"
    >
      <h3>Your Personalized Masterpiece</h3>
      <div className="results-text">{formattedResults}</div>
    </motion.div>
  );
};

export default AIResults;
