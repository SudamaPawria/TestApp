import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme, View, Button } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import ReactQuery from './src/reactQuery/ReactQuery';
import UseRefCount from './src/useRef/UseRefCount';
import UseRefFocus from './src/useRef/UseRefFocus';
import UseLayoutEffct from './src/useLayoutEffect/UseLayoutEffect';
import UseFocusEffect from './src/useEffect/UseFocusEffect';


function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showDemo, setShowDemo] = useState(true);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        {/* Toggle Demo visibility */}
        <Button title="Toggle Demo" onPress={() => setShowDemo(!showDemo)} />
        {/* Conditionally render the Demo component */}
        {showDemo && <UseLayoutEffct />}
        {/* The Counter component */}
       {/* <Dashboard/> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white, // Adjust as needed
    justifyContent: 'center', // Adjust layout
    alignItems: 'center', // Center items
  },
});

export default App;
