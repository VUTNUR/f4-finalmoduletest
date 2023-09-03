import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { searchWord, addToHistory } from '../redux/actions';
import { fetchWordDetails } from '../services/dictionaryService';
import Loader from './Loader';

const Home = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [wordDetails, setWordDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    // Clear previous word details
    setWordDetails(null);

    if (searchTerm.trim() === '') {
      return;
    }

    setIsLoading(true);

    // Dispatch the searchWord action with the search term
    dispatch(searchWord(searchTerm));

    // Fetch word details from the API
    fetchWordDetails(searchTerm)
      .then((data) => {
        // Assuming the first result is relevant
        setWordDetails(data[0]);
        setIsLoading(false);

        // Add the searched word to the history
        dispatch(addToHistory(searchTerm));
      })
      .catch((error) => {
        console.error('Error fetching word details:', error);
        setIsLoading(false);
      });
  };

  return (
    <div>
        <div className='inputSearchBar'>
        <input
        type="text"
        placeholder="Enter a word"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
        </div>

      {isLoading && <Loader />}

      {wordDetails && (
        <div className='detailView'>
          <h2>{wordDetails.word}</h2>
          {/* <h3>Phonetics:</h3> */}
          {wordDetails.phonetics.map((phonetic, index) => (
            <div key={index}>
              <p>{phonetic.text}</p>
              {phonetic.audio && <audio src={phonetic.audio} controls />}
            </div>
          ))}

          {/* <h3>Meanings:</h3> */}
          {wordDetails.meanings.map((meaning, index) => (
            <div key={index}>
              <h3> {meaning.partOfSpeech}</h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {meaning.definitions.map((definition, defIndex) => (
                  <li key={defIndex}>
                    <p> {definition.definition}</p>
                    {/* {definition.example && <p>Example: {definition.example}</p>} */}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
