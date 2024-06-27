import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@ToDoList';

export default function ToDoListScreen(){
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const loadTasks = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      setTasks(data ? JSON.parse(data) : []);
    } catch (error) {
      console.error(error);
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
      saveTasks([...tasks, { text: newTask, completed: false }]);
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.listItem}>
      <Text style={[styles.text, item.completed && styles.completedText]}>{item.text}</Text>
      <TouchableOpacity onPress={() => deleteTask(index)} style={styles.deleteButton}>
        <Image style={{height:20, width:20, marginTop:3}} source={"../../assets/delete.png"}></Image>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a task..."
        value={newTask}
        onChangeText={setNewTask}
      />
      <TouchableOpacity onPress={addTask} style={styles.addButton}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:25
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e9eff0',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight:'bold',
    marginLeft:8
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#ccc',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor:'#e9eff0',
    height:25,
    borderRadius:14
  },
  addButton: {
    backgroundColor: '#fbdddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width:90,
    borderRadius:14,
    alignItems:'center',
    alignSelf:'center'
  },
  addText: {
    color: 'black',
    fontSize: 16,
    fontWeight:'bold'
  },
  deleteButton: {
    height:23, width:20, marginRight:8
  },
});

