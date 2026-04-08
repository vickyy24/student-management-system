import React, { useState } from 'react';

function NameSwitcher() {
    
  // 1. Define state with default value
  const [name, setName] = useState('Default Name');

  // 2. Click handler function
  const handleChangeName = () => {
    setName('New Changed Name'); // Update state, causing re-render
  };

  return (
    <div>
      <h1>{name}</h1>
     
      <button onClick={handleChangeName}>Change Name</button>
    </div>
  );
}

export default NameSwitcher;