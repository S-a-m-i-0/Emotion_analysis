import React, { useState } from 'react';
import AIResults from './AIResults';
import sendIcon from '../assets/send.png'; 
import { CircularProgress } from '@mui/material';
import { Stars } from 'lucide-react';
import { styles } from '../styles';
import { motion } from 'framer-motion';
import { fadeIn } from "../utils/motion";

const ChatBox = () => {
  const [showResults, setShowResults] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState('');

  const handleClick = () => {
    if (userInput.trim() !== '') {
      setShowResults(false);
      setLoading(true);

      fetch (
        'http://localhost:3000/run-model', 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: userInput }),
        }
      )
      .then(response => response.json())
      .then(data => {
        setResults(data.message);
        setLoading(false);
        setShowResults(true);
      })
      .catch(error => {
        setResults(error);
        setLoading(false);
        setShowResults(true);
      });
    }
  };
  

  return (
    <div className="chat-container">
      <motion.div
        variants={fadeIn("right", "", 0.5, 1)}
        initial='hidden'
        animate='show'
        className="chat-box-wrapper"
      >
        <div className="chat-box">
          <input
              type="text"
              className="chat-input"
              placeholder="What's up?"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
          />
          <button className="send-button" onClick={handleClick} disabled={loading}>
            { loading ? <CircularProgress size={24} color='white'/> : <img src={sendIcon} alt="Send" className="send-icon" /> }
          </button>
        </div>
      </motion.div>
      { loading && 
        <motion.div 
          variants={fadeIn("", "", 0, 1)}
          initial='hidden'
          animate='show'
          className='loading-message'
        >
          <Stars className="text-white w-8 h-8 mr-2 animate-pulse" />
          <h3 className={`${styles.sectionSubText} animate-pulse`}>Generating masterpiece...</h3>
        </motion.div>
      }
      { showResults && <AIResults results={results} /> }

    </div>

  );
};

export default ChatBox;
