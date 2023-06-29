import { useEffect, useState } from "react";

const Game = () => {
  const colors = ["green", "yellow", "red", "blue"];
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [round, setRound] = useState(1);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // Funciones del juego
  const init = () => {
    setSequence([getRandomColor()]);
  };
  const chooseColor = (color) => {
    setUserSequence((prevUserSequence) => [...prevUserSequence, color]);
  };
  const addColor = () => {
    setSequence((prevSequence) => [...prevSequence, getRandomColor()]);
    setRound((prevRound) => prevRound + 1);
    setUserSequence([]);
  };
  const reset = () => {
    setSequence([]);
    setUserSequence([]);
    setRound(0);
  };

  useEffect(() => {
    if (sequence.length === 0) {
      init();
      return;
    }

    // No hay movimientos
    if (userSequence.length === 0) return;

    for (let i = 0; i < userSequence.length; i++) {
      if (sequence[i] !== userSequence[i]) {
        // Mala secuencia
        reset();
        addColor();
        return;
      }
    }

    if (sequence.length !== userSequence.length) return;

    // Son iguales
    addColor();
  }, [userSequence]);

  console.log("game", sequence);
  console.log("user", userSequence);
  console.log("round", round);

  const renderedPanels = colors.map((color) => (
    <div key={color} className="game__panel" onClick={() => chooseColor(color)}>
      {color}
    </div>
  ));

  return (
    <div className="game">
      <h1>.env variable: {import.meta.env.VITE_SECRET}</h1>
      {renderedPanels}
    </div>
  );
};

export default Game;
