import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleChangeCorrectAnswer(e) {
    const newIndex = parseInt(e.target.value, 10);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        onUpdate(updatedQuestion); 
      });
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      onDelete(id); 
    });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          aria-label="Correct Answer"
          value={correctIndex.toString()}
          onChange={handleChangeCorrectAnswer}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;