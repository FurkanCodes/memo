
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImgs = [
  {"src": "/imgs/1.jpg", matched: false},
  {"src": "/imgs/2.jpg", matched: false},
  {"src": "/imgs/3.jpg", matched: false},
  {"src": "/imgs/4.jpg", matched: false},
  {"src": "/imgs/5.jpg", matched: false},
];


function App() {


  const [cards, setCards] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //how to shuffle cards?

  const shuffleCard = () => {
    const shuffledCards = [...cardImgs, ...cardImgs]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setScore(0)
  }

   // handling a choice 

    const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

    }

    useEffect(() => {
   
      if(choiceTwo && choiceOne) {
        if(choiceOne.src === choiceTwo.src) {
          setDisabled(true);
          setCards(prevCards => {
            return prevCards.map(card => {
              if (card.src === choiceOne.src) {
                const newScore = score + 1
                if (newScore > bestScore) setBestScore(newScore)
                setScore(newScore)
                return {...card, matched: true}
              } else {
                return card
              }
            })
          })
          resetTurn()
      } else {
        
        setTimeout(() => resetTurn(), 1000)
      }
      }
   
    }, [choiceOne, choiceTwo, bestScore, score] )

      const resetTurn = () => {
        setChoiceTwo(null)
        setChoiceOne(null)
        setScore(0)
        setDisabled(false);
       
      }

      useEffect(() => {
        shuffleCard()
      }, [])
  return (
    <div className="App">
        <h1> Memory Game </h1>
        <button onClick={shuffleCard}>New Game</button>
            <div className='score'>
                <p> Best score: {bestScore} </p> 
                <p> Current score: {score} </p>
            </div>

      <div className='card-grid'>
        {cards.map(card => (
            <SingleCard
             key={card.id} 
             card={card}
             handleChoice={handleChoice}
             flipped={card === choiceOne || card === choiceTwo || card.matched}
             disabled={disabled}
             />        
      ))}
      </div>
   
    </div>
  );
}

export default App;
