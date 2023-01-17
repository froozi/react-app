import { useState } from "react";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year} (${hours < 10 ? '0' + hours: hours}:${minutes < 10 ? '0' + minutes : minutes})`;
}

function App() {

  const [todos, setTodos] = useState([
    {
      id: 1,
      name: "Купить продукты",
      checked: false,
      date: new Date()
    },
    {
      id: 2,
      name: "Сходить на прием к врачу",
      checked: true,
      date: new Date()
    }
  ]);
  
  const [value, setValue] = useState("");

  const onChangeHandle = (event) => {
    setValue(event.target.value);
  }
  const onSubmitHandle = (event) => {
    event.preventDefault();

    setTodos([...todos, {
      id: Date.now(),
      name: value,
      checked: false,
      date: new Date()
    }]);

    setValue('');
  }

  const toggleChecked = (id) => {
    setTodos((prevState) => {
      prevState = [...prevState];

      prevState = prevState.map((todo) => {
        if (id === todo.id){
          return{
            ...todo,
            checked: !todo.checked
          };
        }
        return todo;
      })
      return prevState;
    });
  }

  const removeTodo = (id) => {
    setTodos((prevState) => {
      prevState = [...prevState];

      prevState = prevState.filter((todo) => todo.id !== id);

      return prevState;
    });

  }
  return (
    <div className="App">
      <div>
        <header>
          <h2 className="title">Добавить задачу</h2>
          <form onSubmit={(event) => onSubmitHandle(event)}>
            <input onChange={(event) => onChangeHandle(event)} value={value} type="text" placeholder="Например: купить продукты" />
          </form>
        </header>

        <div>
          {
            todos.map((todo) => {
              return(
                <div className="question">
                  <div className="todoInfo">
                    <h3 className="todoName">{todo.name}</h3>
                    <p>от {formatDate(todo.date)}</p>
                  </div>
                  <div className="todoButton">
                    <button
                      onClick={() => toggleChecked(todo.id)}
                    >{todo.checked ? "Not done" : "Done!"}
                    </button>
                    <button className="remove"  onClick={() => removeTodo(todo.id)}>Remove</button>
                  </div>
                </div>
              )
            })
          }
          
        </div>
      </div>
    </div>
  )
}

export default App;
