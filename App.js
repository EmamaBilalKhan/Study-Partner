import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ToDoListScreen from './src/screens/ToDoListScreen';
import FocusScreen from './src/screens/FocusScreen';
import QueryScreen from './src/screens/QueryScreen';
import StudyPartner from './src/screens/StudyPartner'
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StudyPartner" component={StudyPartner} />
        <Stack.Screen name="QueryScreen" component={QueryScreen} />
        <Stack.Screen name="FocusScreen" component={FocusScreen} />
        <Stack.Screen name="ToDoListScreen" component={ToDoListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


