import React from "react";

import { Link, useLocation } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Todo({ todo, index, markTodo, removeTodo }) {

  const [isTodoDone, setIsTodoDone] = useState(false);
  const [applicId, setApplicId] = useState();

  useEffect(() => {

    const getApplicantId = async (applicationId) => {
      if(todo.text != "Upload student placement list.") {
        let res;
        try {
          res = await axios.get(`http://localhost:8080/application/${applicationId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } catch (error) {

      }
      console.log(res.data.applicantCandidate)
      setApplicId(res.data.applicantCandidate)

      getApplicantId(todo.appId)
    }}
}, [])


  return (
    <div className="todo">
      {todo.text == "Upload student placement list." ? <Link  to='/upload-excel' style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
        {todo.text}
      </Link>:<Link  to='/application-page-coordinator' state={applicId} style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
      {todo.text}
        </Link>}

      
      
      {todo.isDone ? <div style={{marginRight: -120}}>
        <Button
          disabled={true}
          variant="outline-success"
          onClick={() => markTodo(index)}
          style={{backgroundColor: "green", color: "black", border:"green"}}
        >
          ✓
        </Button>{" "}
      </div>:null}

      {!todo.isDone ? <div style={{marginRight: -120}}>
        <Button
          disabled={true}
          variant="outline-success"
          onClick={() => markTodo(index)}
          style={{backgroundColor: "yellow", color: "black", border:"yellow"}}
        >
          !
        </Button>{" "}
      </div>:null}
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return;
}

function TodoInside() {
  const [todos, setTodos] = React.useState([
    {
      text: "This is a sampe todo",
      isDone: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/tasks`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("succesful");
        console.log(res);
        setTodos(
          res.data.map((val) => {
            return {
              text: val.description,
              isDone: val.completed,
              appId: val.applicationId
            };
          })
        );
      } catch (error) {}
    };
    getTasks();
  }, []);

  return (
    <div
      className="todo-app"
      style={{
        overflowY: "scroll",
        maxHeight: 200,
        minHeight: 200,
        maxWidth: 500,
        minWidth: 500,
        position: "absolute",
      }}
    >
      <div className="container">
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card style={{ marginTop: 10, background: "#ebf1c1" }}>
              <Card.Body>
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoInside;
