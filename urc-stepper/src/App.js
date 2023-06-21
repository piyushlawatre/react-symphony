import { useState } from "react";
import "./App.css";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const [author, setAuthor] = useState({ name: "Jonas" });

  function handlePrevious() {
    if (step > 1) {
      // setStep(step - 1); This is not the correct approch
      setStep((currentStep) => currentStep - 1);

      setAuthor((currentAuthor) => ({ ...currentAuthor, name: "Anit Jonas" }));
    }
  }

  function handleNext() {
    if (step < 3) {
      // If we setting the state twice it won't update
      // setStep(step + 1);
      // setStep(step + 1);

      // Correct way
      // setStep((currentStep) => currentStep + 1);
      setStep((currentStep) => currentStep + 1);
    }
  }

  return (
    <>
      <button
        className="close"
        onClick={() => setIsOpen((currentIsOpenValue) => !currentIsOpenValue)}
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
          <p className="message">{messages[step - 1]}</p>
          <p className="message">
            <i>{author.name}</i>
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}