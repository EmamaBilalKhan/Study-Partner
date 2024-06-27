import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Countdown from 'react-native-countdown-component';

export default function FocusScreen() {
  const [isPaused, setIsPaused] = useState(true); 
  const [isWorking, setIsWorking] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [cycle, setCycle] = useState(0);
  const Technique = "Pomodoro Technique:\n1. Select a single task to focus on.\n2. Set a timer for 25 min and work continuously\n    until the timer goes off.\n3. Take a productive 5 min. break-walk around, get a snack, relax.\n4. Repeat steps 4 rounds.\n5. Take a longer 30 min. break.\n    Restart and keep going. You got this!";
  const workTime = 1500; // 25 minutes
  const shortBreakTime = 300; // 5 minutes
  const longBreakTime = 1800; // 30 minutes

  const handleTimerComplete = () => {
    if (isWorking) {
      setIsWorking(false);
      if (cycle < 3) {
        setIsBreak(true);
      } else {
        setCycle(0);
      }
    } else {
      setIsWorking(true);
      setIsBreak(false);
      setCycle((prevCycle) => prevCycle + 1);
    }
  };

  const handleStart = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsPaused(true);
  };

  const remainingSessions = 4 -cycle; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isWorking ? 'Focus Time' : isBreak ? 'Short Break' : 'Long Break'}
      </Text>
      <Countdown
        until={isPaused ? workTime : isWorking ? workTime : cycle < 3 ? shortBreakTime : longBreakTime}
        size={60}
        onFinish={handleTimerComplete}
        digitStyle={{ backgroundColor: '#fbdddd' }}
        digitTxtStyle={{ color: 'black' }}
        timeToShow={['M', 'S']}
        timeLabels={{ m: 'Min', s: 'Sec' }}
        running={!isPaused} 
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.Button} onPress={handleStart} disabled={!isPaused}><Text style={styles.ButtonText}>Start</Text></TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={handleStop}><Text style={styles.ButtonText}>Stop</Text></TouchableOpacity>
      </View>
      {remainingSessions > 0 && ( 
        <Text style={styles.sessionsText}>
          Remaining Focus Sessions: {remainingSessions}
        </Text>
      )}
      <Text style={{marginTop:20}}>
      {Technique}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 25,
    color: '#333',
    fontWeight:'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  sessionsText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  Button:{
    backgroundColor:"black",
    marginHorizontal:15,
    width: 100,
    height: 30,
    borderRadius:5,
    marginTop:10,
    alignItems:'center'
  },
  ButtonText:{
    color: 'white', 
    fontSize: 15,
    paddingTop:3,
    fontWeight:'bold'
    
  }
});