import React from "react";
import Main from "./components/Main";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reduxUtils/reducers/index";

const store = createStore(reducer);

export default App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};
