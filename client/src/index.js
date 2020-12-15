import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "./reduxStuff/reducers/rootreducer"

export const UserContext = React.createContext()
const contextData = {
  name: 'Frederic',
  age: 30
}
const store = createStore(rootReducer, composeWithDevTools())


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <UserContext.Provider value={contextData}>
        <App />
      </UserContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
