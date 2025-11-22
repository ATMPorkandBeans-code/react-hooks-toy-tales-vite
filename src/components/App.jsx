import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else return response.json();
      })
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const addToy = (newToy) => {
    setToys((previousToys) => [...previousToys, newToy]);
  };

  const deleteToy = (id) => {
    setToys((previousToys) => previousToys.filter((toy) => toy.id !== id));
  };

  const updateToy = (updatedToy) => {
    setToys((previousToys) =>
      previousToys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  };

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} deleteToy={deleteToy} updateToy={updateToy} />
    </>
  );
}

export default App;
