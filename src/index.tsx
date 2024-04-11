import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import rootReducer from "./actionsAndReducers/reducers";

const firebaseConfig = {
  apiKey: "AIzaSyAtb35SkrhTQBe8L38vTQMgQMx310MDgvI",
  authDomain: "vuejsfirebase-war.firebaseapp.com",
  databaseURL: "https://vuejsfirebase-war-default-rtdb.firebaseio.com",
  projectId: "vuejsfirebase-war",
  storageBucket: "vuejsfirebase-war.appspot.com",
  messagingSenderId: "1034177961377",
  appId: "1:1034177961377:web:2e28a40306130353f23fe0",
};

const store = configureStore({
  reducer: rootReducer,
});

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

export { db };
