// ------------------
// IMPORT STATEMENTS
// ------------------

import { useState, useEffect } from "react";
import "./App.css";

// ------------------
// FUNCTION DECLARATION
// ------------------

function App() {
  // ------------------
  // STATE VARIABLES
  // ------------------

  const [animals, setAnimals] = useState(null);

  // ------------------
  // HELPER FUNCTIONS
  // ------------------

  const getAllAnimals = async () => {
    const response = await fetch("/api/get-all-animals");
    const data = await response.json();
    console.log(data);
    setAnimals(data);
  };


  // We're using this function for the delete button in the HTML.
  const deleteOneAnimal = async (id) => {
    try {
      // We feed the fetch the endpoint in a literal with a dynamic id.
      const response = await fetch(`/api/delete-one-animal/${id}`, {
        // Because the helper function in the API is a POST request.
        method: "POST",
        // Headers are metadata a packet is sent with to tell the recipient how to handle the data.
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Simple catch error handling
    } catch (error) {
      console.error(`Error: ${error}`);
    }

    // Refreshes the list on the webpage
    getAllAnimals();
  };

  // ------------------
  // EFFECTS
  // ------------------

  useEffect(() => {
    getAllAnimals();
  }, []);

  // ------------------
  // RENDERING JSX TO THE SCREEN
  // ------------------

  return (
    <>
      <h1>🐾 Full-Stack Animals App 🐾</h1>
      <div className="card">
        <h2>All Animals</h2>
        <div className="animals">
          {animals?.map((animal) => (
            <div className="animal" key={animal.id}>
              <h2>{animal.name}</h2>
              <p>Id: {animal.id}</p>
              <p>Category: {animal.category}</p>
              <p>Lives in: {animal.lives_in}</p>
              <p>Can fly: {animal.can_fly ? "True ✅" : "False ❌"}</p>
              <button onClick={() => {
                deleteOneAnimal(animal.id)
              }}>Delete Animal 🥹</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ------------------
// EXPORT STATEMENT
// ------------------

export default App;
