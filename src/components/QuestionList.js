import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion}) {


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((q) => (
          <QuestionItem
          key={q.id}
          question={q}
          onUpdate={onUpdateQuestion}
          onDelete={onDeleteQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
