import React, { useState, useEffect, useRef } from 'react';

const CountdownTimer = () => {
  const [timeInput, setTimeInput] = useState('');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (time === 0) {
      stopTimer();
    }
  }, [time]);

  const handleInputChange = (e) => {
    setTimeInput(e.target.value);
  };

  const startTimer = () => {
    const inputSeconds = parseInt(timeInput, 10);
    if (isNaN(inputSeconds) || inputSeconds <= 0) {
      alert('Please enter a valid positive number for the time.');
      return;
    }
    setTime(inputSeconds);
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    setTimeInput('');
    setTime(0);
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const restartTimer = () => {
    resetTimer();
    startTimer();
  };

  return (
    <div style={styles.container}>
      <input
        type="number"
        value={timeInput}
        onChange={handleInputChange}
        placeholder="Enter time in seconds"
        style={styles.input}
      />
      <div style={styles.timerDisplay}>{formatTime(time)}</div>
      <div style={styles.buttonsContainer}>
        {!isRunning ? (
          <button style={styles.button} onClick={startTimer}>Start</button>
        ) : (
          <>
            <button style={styles.button} onClick={stopTimer}>Stop</button>
            <button style={styles.button} onClick={resetTimer}>Reset</button>
          </>
        )}
        <button style={styles.button} onClick={restartTimer}>Restart</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    border: '2px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    width: '300px',
    margin: '0 auto',
  },
  input: {
    marginBottom: '10px',
    padding: '5px',
    fontSize: '1rem',
  },
  timerDisplay: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: '0 10px',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    outline: 'none',
  },

};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default CountdownTimer;
