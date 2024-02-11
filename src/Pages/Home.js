import React, { useContext } from 'react';

import { AuthContext } from '../AuthContext';
function Home () {
    const authContext = useContext(AuthContext);
    const currentUser = authContext.currentUser;
    
  return (
    <div className=' p-3'>
      <h1>Hello {currentUser ? currentUser.name : 'Guest'}</h1>
    </div>
  )
}

export default Home;