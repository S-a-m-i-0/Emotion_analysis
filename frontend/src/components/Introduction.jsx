import { useState, useEffect } from "react";
import { styles } from '../styles';
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";

const Introduction = () => {
  const name = 'Leo.';
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;
  const intro = [
    "I've got a knack for turning your mood into a story, poem, or even a song. Whether you're feeling joyful, pensive, or somewhere in between, let's explore it together through creative writing. So, how are you feeling today?", 
    "Feeling happy, sad, or somewhere in between? Share your mood, and I'll craft a poem, story, or song that's uniquely you. How's your day going so far?", 
    "Let's transform your mood into a creative masterpiece. Tell me how you're feeling, and I'll whip up a story, song, or poem that fits your vibe. Ready to get started?"
  ]
  const [randomIntro, setRandomIntro] = useState(intro[Math.floor(Math.random() * intro.length)]);


  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta)

    return () => clearInterval(ticker);
  }, [text])

  const tick = () => {
    let updatedText = isDeleting ? name.substring(0, text.length - 1) : name.substring(0, text.length + 1);
    setText(updatedText);
    
    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2)
    }

    if (!isDeleting && updatedText === name) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setDelta(500);
    }
  }

  return (
    <>
      <motion.div
        variants={textVariant()}
        initial="hidden"
        animate="show"
      >
        <h1 className={`${styles.heroHeadText} text-white`}>Hey, I'm <span className='text-[#ffffff]'>{text}</span></h1>
      </motion.div>
      
      <motion.p
        variants={fadeIn("", "", 0.4, 2)}
        initial="hidden"
        animate="show"
        className={`${styles.heroSubText} text-white`}
      >
        {randomIntro}
      </motion.p>
    </>
    
  );
}

export default Introduction;
