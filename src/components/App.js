import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from  "./QuestionList";

function App() {
  const[ questions, setQuestions ] = useState([]);
  const [page, setPage] = useState("List");
  
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((res) => res.json())
    .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
  setQuestions([...questions, newQuestion]);
}

function handleDeleteQuestion(id) {
 fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions(questions.filter((q) => q.id !== id));
  });
}

function handleUpdateQuestion(updatedQuestion) {
fetch(`http://localhost:4000/questions/${updatedQuestion.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      correctIndex: updatedQuestion.correctIndex
    })
  })
    .then((r) => r.json())
    .then((data) => {
      const updated = questions.map((q) =>
        q.id === data.id ? data : q
      );
      setQuestions(updated);
    });
  }
    
return (
  <main>
    <AdminNavBar onChangePage={setPage} />
    {page === "Form" ? (
      <QuestionForm onAddQuestion={handleAddQuestion} />
    ) : (
      <QuestionList
        questions={questions}
        onDeleteQuestion={handleDeleteQuestion}
        onUpdateQuestion={handleUpdateQuestion}
      />
    )}
  </main>
);
}

export default App;