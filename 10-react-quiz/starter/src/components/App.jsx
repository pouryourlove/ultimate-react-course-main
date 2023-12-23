import { useEffect, useReducer } from "react";
import Header from "./Header";
import Text from "./Text";
import Loader from "./Loader";
import Error from "./Error";
import StarScreen from "./StarScreen";
import Question from "./Question";


function App() {
  const initialState = {
    questions: [],

    //'loading','error','ready','active','finished'
    status: "loading",
    index: 0,
  };
  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "dataFailed":
        return {
          ...state,
          status: "error",
        };
      case "start":
        return {
          ...state, 
          status: "active"}  

      default:
        throw new Error("Action unknown");
    }
  }

  const [{questions,status,index}, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Text>{status === 'loading'&&<Loader/>}
      {status === 'error'&&<Error/>}
      {status === 'ready'&&<StarScreen numQuestions={numQuestions} dispatch={dispatch}/>}
      {status === "active" && <Question question={questions[index]}/>}
      </Text>
    </div>
  );
}

export default App;
