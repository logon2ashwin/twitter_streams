import React, { createRef } from 'react';
import { search, updateNewTweets } from "store/actions";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { AiOutlineSearch, AiFillTwitterCircle } from "react-icons/ai";

import "./SearchComponent.scss"

const variants = {
  initialPosition: { 
    y: -250,
    opacity: 0
  },
  finalPosition: { 
    y: 5,
    opacity: 1
  },
}

const SearchComponent = () =>  {
  const searchRef = createRef();
  const dispatch = useDispatch();
  const tweets = useSelector(store => store.tweets);

  const updateSearchPhrase = () => {
    dispatch(search(searchRef.current.value));
  };

  const updateLatestTweets = () => {
    dispatch(updateNewTweets());
  };

  return (
    <motion.div className="search-container" 
      variants={variants}
      transition={{ ease: "easeOut", duration: 0.5 }}
      initial="initialPosition"
      animate="finalPosition"
    >
      <motion.div className="search-box">
        <input type="text" name="searchPhrase" id="searchPhrase" placeholder="Enter Your Keyword" ref={searchRef} onKeyDown={event => event.keyCode===13 ? updateSearchPhrase() : null} />
        <AiOutlineSearch className="search-icon" onClick={()=> updateSearchPhrase()}/>
      </motion.div>
      <motion.div className="tweets-icon">
        <AiFillTwitterCircle className="twitter-icon" onClick={() => tweets.length && updateLatestTweets()} />
        { tweets.length ? <motion.span className="tweets-count" >{tweets.length}</motion.span> : null}
        { tweets.length ? 
          <motion.button 
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            whileHover={{ scale: 1.1, transition: { yoyo:Infinity, duration: 0.3 } }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          onClick={() => tweets.length && updateLatestTweets()}
          className="load-tweets">Load More</motion.button> 
        : null}
      </motion.div>
    </motion.div>
  )
}

export default SearchComponent;
