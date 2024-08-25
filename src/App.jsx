import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store/store";
import Login from "./components/login/login";
import GameScreen from "./components/game-screen/GameScreen";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/game/:roomId/:userName" element={<GameScreen />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
