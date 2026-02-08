import 'react-native-get-random-values';
import AppNavigator from './src/navigation/AppNavigator';
import { v4 as uuidv4 } from 'uuid';
import { AppRegistry } from 'react-native';
import MainApp from './App';

export default function App() {
  return <AppNavigator />;
}