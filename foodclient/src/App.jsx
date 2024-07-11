import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Tags from "./components/Tags";
import Meals from "./components/Meals";
import Person from "./components/Person";

function App() {
  return (
    <Provider store={store}>
      <div className="App flex flex-col md:flex-row bg-gray-50 min-h-screen">
        <div className="flex-1 p-3 bg-white shadow-md rounded-lg m-3">
          <Tags />
          <Meals />
        </div>
        <div className="w-full md:w-[30vw] p-3 bg-white shadow-md rounded-lg m-3">
          <Person />
        </div>
      </div>
    </Provider>
  );
}

export default App;
