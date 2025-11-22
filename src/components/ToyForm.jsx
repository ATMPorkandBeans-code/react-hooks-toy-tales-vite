import { useState,React } from "react";

function ToyForm({addToy}) {
  const [toyForm, setToyForm] = useState({
    name: "",
    image:"",
  })

  const handleChange = e => {
    setToyForm(previousData => ({
      ...previousData,
      [e.target.name]: e.target.value 
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newToy={
      ...toyForm,
      likes: 0
    }

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(newToy)
    })
    .then(r => {
      if(!r.ok) {throw new Error("failed to create listing")}
      return r.json()
    })
    .then(newToy => {
      addToy(newToy)
      setToyForm({
        name: "",
      image:"",
      })
    })
    .catch(error => console.log(error.message))
  }
  
  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={toyForm.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={toyForm.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
