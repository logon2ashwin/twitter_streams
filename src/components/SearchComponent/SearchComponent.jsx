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
        <input type="text" name="searchPhrase" id="searchPhrase" placeholder="Enter Your Keyword" ref={searchRef} />
        <AiOutlineSearch className="search-icon" onClick={()=> updateSearchPhrase()}/>
      </motion.div>
      <motion.div className="tweets-icon">
        <AiFillTwitterCircle className="twitter-icon" onClick={() => updateLatestTweets()} />
        { tweets.length ? <motion.span className="tweets-count" >{tweets.length}</motion.span> : null}
      </motion.div>
    </motion.div>
  )
}

export default SearchComponent;