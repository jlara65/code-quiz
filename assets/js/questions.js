/*var questionBank = [
    {
      question: "what is a question?",
      answersArray: [
                  { answer: "A question mark", correct: true},
                  { answer: "What?", correct: false},
                  { answer: "I am asking the same question.", correct: false},
                  { answer: "None of above", correct: false},]
      },
      {
        question: "How many languages is Javascript?",
        answersArray: [
                    { answer: "JS is languages of many", correct: false},
                    { answer: "JS is a language itself?", correct: true},
                    { answer: "Three", correct: false},
                    { answer: "2! Java is a language so is script. Combine together 2 languages.", correct: false},]
        },
        {
          question: "is HTML a programming language?",
          answersArray: [
                      { answer: "Pfft, HTML is not necessary to be named programming language!", correct: false},
                      { answer: "Yes!", correct: false},
                      { answer: "Maybe", correct: false},
                      { answer: "None of above", correct: true},]
          },
          {
            question: "Is Earth flat?",
            answersArray: [
                        { answer: "Yes", correct: true},
                        { answer: "No", correct: false},
                        { answer: "Earth has shape?", correct: false},
                        { answer: "None of above", correct: false},]
            },
          ];
                  
  function shuffleQB() {
    let questionBankClone = questionBank;
    for (let i = 0; i < questionBankClone.length; i++) {
  
      let answersArray = questionBankClone[i].answersArray;
      answersArray.sort(() => {
        return (Math.floor(Math.random() * 3) - 1);
      });
    }
    questionBankClone = questionBankClone.sort(() => {
      return (Math.floor(Math.random() * 3) -1);
    });
    return questionBankClone;
  }; */