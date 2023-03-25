import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
const MainPage = () => {
  const [text, setText] = useState();
  const { userId } = useContext(AuthContext);
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTodo = useCallback(async () => {
    try {
      await axios
        .get("/api/todo", {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            userId: userId,
          },
        })
        .then((res) => setTodo(res.data));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [userId]);

  const createTodo = useCallback(
    async (e) => {
      if (!text) return null;
      try {
        await axios
          .post(
            "/api/todo/add",
            { text, userId },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            setTodo([...todo], res.data);
            setText("");
            getTodo();
          });
      } catch (error) {
        console.log(error);
      }
    },
    [text, todo, userId, getTodo, setTodo]
  );

  const deleteTodo = useCallback(
    async (id) => {
      try {
        await axios
          .delete(
            `/api/todo/delete/${id}`,
            { id: id },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then(() => getTodo());
      } catch (error) {
        console.log(error);
      }
    },
    [getTodo]
  );

  const completedTodo = useCallback(
    async (id) => {
      try {
        await axios.put(`/api/todo/complated/${id}`, { id: id }, {
              headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
              setTodo([...todo], res.data);
              getTodo();
            });
      } catch (error) {
        console.log(error);
      }
    },
    [getTodo, todo]
  );
  const importantTodo = useCallback(
    async (id) => {
      try {
        await axios
          .put(
            `/api/todo/important/${id}`,
            { id: id },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            setTodo([...todo], res.data);
            getTodo();
          });
      } catch (error) {
        console.log(error);
      }
    },
    [getTodo, todo, setTodo]
  );

  useEffect(() => {
    getTodo();
  }, [getTodo]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="container">
        <div className="main-page">
          <h4>Добавить задачу:</h4>
          <form
            className="form form-login"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="text"
                  id="text"
                  value={text}
                  name=" input"
                  className="validate"
                  onChange={(e) => setText(e.target.value)}
                />
                <label htmlFor="> input">Задача:</label>
              </div>
            </div>
            <div className="row">
              <button
                className="waves-effect waves-light btn blue"
                onClick={createTodo}
              >
                {" "}
                Добавить
              </button>
            </div>
          </form>
          <h3>Активные задачи:</h3>
          <div className="todos">
            {todo.map((task, index) => {
                let cls = ['row flex todos-item '];
                if (task.completed) {
                  cls.push("completed");
                } 
                if (task.important) {
                  cls.push("important");
                }
                return (
                  <div key={index} className={cls.join(" ")}>
                    <div className="col todos-num">{index + 1}</div>
                    <div className="col todos-text completed">{task.text}</div>
                    <div className="col todos-buttons">
                      <i
                        onClick={() => completedTodo(task._id)}
                        className="material-icons blue-text"
                      >
                        check{" "}
                      </i>
                      <i
                        onClick={() => importantTodo(task._id)}
                        className="material-icons orange-text"
                      >
                        warning
                      </i>
                      <i
                        onClick={() => deleteTodo(task._id)}
                        className="material-icons red-text"
                      >
                        delete
                      </i>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
