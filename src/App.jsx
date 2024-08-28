import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store/store";
import Login from "./components/login/login";
import GameScreen from "./components/game-screen/GameScreen";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NotFound from "./components/not-found/NotFound";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/game/:roomID/:userName" element={<GameScreen />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
