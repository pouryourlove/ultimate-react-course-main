import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

//controlled element
//1.define a piece of state
//2. use that piece of state on the element we want to control (force the element to always take the value of this state variable)
//3. update that state variable. you do it with on change handler.
//with this forms are now in charge of react not dom element

//our from elements, by default, maintain their own state inside hte DOM(html element itself).
//it makes it hard to read their values and also leaves this state right here in the DOM
//In react, we usually like to keep all the state in just one central place.
//Inside the React application and not inside the DOM.
//In order to do that we use a technique controlled element.
//with this, React now has a control of these input fields and no longer the DOM.
