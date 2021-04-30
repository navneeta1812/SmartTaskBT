import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Mtmain';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const MTmain = () => {
  return(
    <div>
      <label for="search"></label>
      <input type="search" id="search" placeholder="Search Issue Id/Task Id" /> <FontAwesomeIcon icon={faSearch} id="search" />
    </div>

  );
}

export default MTmain;