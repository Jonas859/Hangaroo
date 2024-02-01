  const words = {
      easy: [
          { question: 'What is the capital of France', answer: 'PARIS' },
          { question: 'Who wrote Pride and Prejudice', answer: 'JANE AUSTEN' },
          { question: 'Largest planet in our solar system', answer: 'JUPITER' },
          { question: 'When was the United Nations founded', answer: 'POST WORLD WAR TWO' },
          { question: 'Chemical symbol for gold', answer: 'AU' },
          { question: 'Who painted the Mona Lisa', answer: 'DA VINCI' },
          { question: 'Tallest mountain in the world', answer: 'EVEREST' },
          { question: 'Author of Harry Potter', answer: 'JK ROWLING' },
          { question: 'Currency of Japan', answer: 'YEN' },
          { question: 'Distance between Earth and Sun', answer: 'NINETY THREE MILLION MILES' }
      ],
      difficult: [
          { question: 'What does HTML stand for', answer: 'HYPER TEXT MARKUP LANGUAGE' },
          { question: 'What is polymorphism in OOP', answer: 'MANY FORMS' },
          { question: 'Difference between a process and a thread', answer: 'INSTANCE VS PATH OF EXECUTION' },
          { question: 'Time complexity of binary search', answer: 'O LOG N' },
          { question: 'How does a relational database manage relationships', answer: 'FOREIGN KEYS' },
          { question: 'Purpose of a finally block', answer: 'EXECUTE IMPORTANT CODE' },
          { question: 'Concept of inheritance in OOP', answer: 'ACQUIRING PROPERTIES' },
          { question: 'Difference between == and === in JavaScript', answer: 'EQUALITY VS STRICT EQUALITY' },
          { question: 'How does garbage collection work in Java', answer: 'DELETES UNUSED OBJECTS' },
          { question: 'Difference between TCP and UDP', answer: 'CONNECTION ORIENTED VS CONNECTIONLESS' }
      ],
      expert: [
          { question: 'What is a closure in programming', answer: 'FUNCTION WITH ITS ENVIRONMENT' },
          { question: 'Concept of dynamic programming', answer: 'SOLVING SUBPROBLEMS' },
          { question: 'What is the CAP theorem', answer: 'CONSISTENCY AVAILABILITY PARTITION TOLERANCE' },
          { question: 'How does the B tree work', answer: 'SELF BALANCING SORTED DATA' },
          { question: 'Concept of lazy evaluation', answer: 'DELAYING EVALUATION' },
          { question: 'Role of a mutex', answer: 'SYNCHRONIZES ACCESS' },
          { question: 'How does MapReduce work', answer: 'PARALLEL DISTRIBUTED ALGORITHM' },
          { question: 'What is the SOLID principle', answer: 'DESIGN PRINCIPLES' },
          { question: 'How does public key cryptography work', answer: 'PAIRS OF KEYS' },
          { question: 'What is type inference', answer: 'AUTOMATIC TYPE DETECTION' }
      ],
      
    };
    
    let currentCategory = 'easy';
    let currentQuestionIndex = 0;
    let currentQuestion = words[currentCategory][currentQuestionIndex];
    let incorrectGuesses = 0;
    let score = 0;
    
    const questionElement = document.getElementById('question');
    const clueElement = document.getElementById('clue');
    const wordDisplayElement = document.getElementById('word-display');
    const keyboardContainer = document.getElementById('keyboard-container');
    const pointsElement = document.getElementById('points');
    const clueButton = document.getElementById('clue-button');
    const messageContainer = document.getElementById('message-container');
    const incorrectGuessesContainer = document.getElementById('incorrect-guesses');
    const backgroundMusic = document.getElementById('background-music');
  const guessContainers = Array.from(incorrectGuessesContainer.children);

    
    displayQuestion();
    
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const keyButton = document.createElement('div');
      keyButton.classList.add('key');
      keyButton.textContent = letter;
      keyButton.addEventListener('click', () => {
        handleGuess(letter);
        hideMessage();
      });
      keyboardContainer.appendChild(keyButton);
    }
    
    function displayQuestion() {
      currentQuestion = words[currentCategory][currentQuestionIndex];
      questionElement.textContent = `${currentCategory.toUpperCase()}: ${currentQuestion.question}`;
    
      // Initialize the word display with underscores and spaces
      const initialDisplay = currentQuestion.answer
        .split('')
        .map(char => (char === ' ' ? ' ' : '_'))
        .join('');
      wordDisplayElement.innerHTML = initialDisplay;
    
      // Recreate keyboard buttons
      keyboardContainer.innerHTML = '';
      for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const keyButton = document.createElement('div');
        keyButton.classList.add('key');
        keyButton.textContent = letter;
        keyButton.addEventListener('click', () => handleGuess(letter));
        keyboardContainer.appendChild(keyButton);
      }
    
      const categoryButtonsArray = Array.from(categoryButtons.children);
      categoryButtonsArray.forEach(button => {
        button.disabled = false;
      });
    }
    
    
    
    function updateWordDisplay(letter) {
      const wordArray = wordDisplayElement.textContent.split('');
      for (let i = 0; i < currentQuestion.answer.length; i++) {
        if (currentQuestion.answer[i] === letter || currentQuestion.answer[i] === ' ') {
          wordArray[i] = currentQuestion.answer[i];
        }
      }
      wordDisplayElement.textContent = wordArray.join('');
    }
    function nextQuestion() {
      currentQuestionIndex++;
      if (currentQuestionIndex < words[currentCategory].length) {
        displayQuestion();
      } else {
        if (currentCategory === 'easy') {
          currentCategory = 'difficult';
        } else if (currentCategory === 'difficult') {
          currentCategory = 'expert';
        } else {
          endGame();
          return;
        }
        currentQuestionIndex = 0;
        displayQuestion();
      }
    }

    const MAX_CLUES = 100;
    function useClue() {
    if (currentQuestionIndex < words[currentCategory].length && score >= 25) {
      const unrevealedIndex = wordDisplayElement.textContent.indexOf('_');
      
      if (unrevealedIndex !== -1) {
        const clue = currentQuestion.answer.charAt(unrevealedIndex);
        clueElement.textContent = `Clue: ${clue}`;
        score -= 25;
        pointsElement.textContent = score;

        clueElement.addEventListener('click', clearClue);
      } else {
        messageContainer.textContent = "All letters are already revealed!";
      }

      if (score >= 25 && incorrectGuesses < MAX_CLUES) {
        clueButton.disabled = false;
      }
    } else {
      messageContainer.textContent = "You don't have enough points ";
    }
  }
    
    function clearClue() {
      clueElement.textContent = '';
      clueElement.removeEventListener('click', clearClue);
    }

    function displayMessage(message) {
      messageContainer.textContent = message;
    }
    
    function hideMessage() {
      messageContainer.textContent = '';
    }
    
    function endGame() {
      const gameOverModal = document.getElementById('game-over-modal');
      const finalScoreElement = document.getElementById('final-score');
      
      finalScoreElement.textContent = score;
      gameOverModal.style.display = 'block';
    }
    

    function handleGuess(letter) {
      if (currentQuestion.answer.includes(letter)) {
        updateWordDisplay(letter);
        if (clueElement.textContent === `Clue: ${letter}`) {
          clearClue();
        }
      } else {
        incorrectGuesses++;
        if (incorrectGuesses <= 3) {
          updateIncorrectGuesses();
        }
        if (incorrectGuesses === 3) {
          endGame();
          return;
        }
        hideMessage();

      }
    
      if (wordDisplayElement.textContent === currentQuestion.answer) {
        score += 100;
        pointsElement.textContent = score;
        nextQuestion();
      }
    }
    
    function updateIncorrectGuesses() {
      guessContainers[incorrectGuesses - 1].textContent = 'X';
      guessContainers[incorrectGuesses - 1].classList.add('wrong');
    }
    
    function restartGame() {
      const gameOverModal = document.getElementById('game-over-modal');
    
      gameOverModal.style.display = 'none';
    
      currentCategory = 'easy';
      currentQuestionIndex = 0;
      incorrectGuesses = 0;
      score = 0;
    
      guessContainers.forEach(container => {
        container.textContent = '';
        container.classList.remove('wrong');
      });
    
      displayQuestion();
    }
    
    function closeGameOverModal() {
      const gameOverModal = document.getElementById('game-over-modal');
      gameOverModal.style.display = 'none';
    }

    function useButtonClue(clueType) {
      if (currentQuestionIndex < words[currentCategory].length && score >= 25) {
        const unrevealedIndex = wordDisplayElement.textContent.indexOf('_');
        
        if (unrevealedIndex !== -1) {
          let clue;
          if (clueType === 'vowel') {
            clue = findVowelClue();
          } else if (clueType === 'consonant') {
            clue = findConsonantClue();
          }
    
          if (clue !== '') {
            clueElement.textContent = `Clue: ${clue}`;
            score -= 25;
            pointsElement.textContent = score;
    
            clueElement.addEventListener('click', clearClue);
          } else {
            messageContainer.textContent = `No ${clueType}s remaining in the word!`;
          }
        } else {
          messageContainer.textContent = "All letters are already revealed!";
        }
    
        if (score >= 25 && incorrectGuesses < MAX_CLUES) {
          clueButton.disabled = false;
        }
      } else {
        messageContainer.textContent = "You don't have enough points!";
      }
    }
    
    function findVowelClue() {
      const unrevealedIndex = wordDisplayElement.textContent.indexOf('_');
      for (let i = 0; i < currentQuestion.answer.length; i++) {
          const currentChar = currentQuestion.answer[i].toUpperCase();
          if (currentChar !== ' ' && 'AEIOU'.includes(currentChar) && currentQuestion.answer.includes(currentChar, unrevealedIndex) && wordDisplayElement.textContent[i] === '_') {
              return currentChar;
          }
      }
      return '';
  }

  function findConsonantClue() {
      const unrevealedIndex = wordDisplayElement.textContent.indexOf('_');
      for (let i = 0; i < currentQuestion.answer.length; i++) {
          const currentChar = currentQuestion.answer[i].toUpperCase();
          if (currentChar !== ' ' && !'AEIOU'.includes(currentChar) && currentQuestion.answer.includes(currentChar, unrevealedIndex) && wordDisplayElement.textContent[i] === '_') {
              return currentChar;
          }
      }
      return '';
  }

    function findDifferentVowel(existingVowel) {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const unrevealedIndex = wordDisplayElement.textContent.indexOf('_');
    for (let i = 0; i < vowels.length; i++) {
      if (vowels[i] !== existingVowel && currentQuestion.answer.includes(vowels[i], unrevealedIndex)) {
        return vowels[i];
      }
    }
    return '';
  }

  function findDifferentConsonant(existingConsonant) {
    const unrevealedIndex = wordDisplayElement.textContent.indexOf('_');
    for (let i = 0; i < currentQuestion.answer.length; i++) {
      const currentChar = currentQuestion.answer[i].toUpperCase();
      if (currentChar !== ' ' && currentChar !== 'A' && currentChar !== 'E' && currentChar !== 'I' && currentChar !== 'O' && currentChar !== 'U' && currentChar !== existingConsonant) {
        return currentChar;
      }
    }
    return '';
  }


  // Play background music when the game starts
  backgroundMusic.play();

  // Add a function to toggle the background music on/off
  function toggleBackgroundMusic() {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
  }
s

  backgroundMusic.play();

  function toggleBackgroundMusic() {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
  }

  
