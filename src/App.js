import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  width: 300px;
  margin-right: 10px;
  font-size: 1em;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 1em;
  cursor: pointer;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 10px;
  margin: 10px 0;
  background-color: ${({ completed }) => (completed ? "#d3d3d3" : "#f9f9f9")};
  border: 1px solid #ccc;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CompleteButton = styled.button`
  background-color: #000;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
  margin-left: 5px;
`;

const EditButton = styled.button`
  background-color: #ccc;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
`;

const DeleteButton = styled.button`
  background-color: #ff6347;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
`;

const EditInput = styled.input`
  padding: 5px;
  font-size: 1em;
  width: 80%;
`;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if (storedTodos && storedTodos.length > 0) {
          setTodos(storedTodos);
        } else {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/todos?_limit=5"
          );
          setTodos(response.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      console.log("todo useEffect");
      console.log(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };

    setTodos([...todos, newTask]);
    setNewTodo("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const completeTodo = (id) => {
    console.log(id);
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, currentTitle) => {
    setEditTodoId(id);
    setEditTitle(currentTitle);
  };

  const saveEdit = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editTitle } : todo
    );
    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditTitle("");
  };

  return (
    <Container>
      <Title>To-Do List</Title>
      <InputWrapper>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="할 일을 추가해주세요!"
        />
        <Button onClick={addTodo}>Add</Button>
      </InputWrapper>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            completed={todo.completed}
            // onClick={() => toggleComplete(todo.id)}
          >
            {editTodoId === todo.id ? (
              <EditInput
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              todo.title
            )}
            <ButtonWrap>
              {editTodoId === todo.id ? (
                <EditButton onClick={() => saveEdit(todo.id)}>Save</EditButton>
              ) : (
                <EditButton
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditing(todo.id, todo.title);
                  }}
                >
                  Edit
                </EditButton>
              )}
              <CompleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  completeTodo(todo.id);
                }}
              >
                Complete
              </CompleteButton>
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTodo(todo.id);
                }}
              >
                Delete
              </DeleteButton>
            </ButtonWrap>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
