import { useState } from "react";

 
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];


export default function App() {
  const [step, setStep] = useState(1)
  const [isOpen,setIsOpen] = useState(true)
 

  function handlePrevious(){
    if(step >1)
    setStep((current) => current - 1)
  }

  function handleNext(){
    if(step<3)
    setStep((current) => current + 1)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen((current) => !current)}
        className="close"
      >
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              <span>✌</span> Previous
            </Button>

            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next <span>👏</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}


function StepMessage({step, children}) {
  return (
    <div className="message">
      <h3> Step {step}</h3>
      {children}
    </div>
  );
}

//We're making resuable buttons
function Button({textColor, bgColor, onClick, children}){
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

//what if we could simply pass the content right into the button 
// pass simply some jsx into the component and then the component use that jsx and display it?
//children prop is a prop that each react component automatically receives 
// the value of the children prop is exactly what is between opening and the closing tag of the component
//props.children is an empty hole that can be filled by any JSX the component receives as children
//the children prop allow us to pass JSX into an eleemnt(besides regular props)
//it's an essential tool to make reusable and configurable components(esp component content)
//really useful for generic components that don't know their content before being used. (e.g.modal)

