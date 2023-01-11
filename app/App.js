import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Task from './components/Task';



export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    fetch('https://jimstasks.ue.r.appspot.com/ins/'+ task)
    .then((response) => {
      if (response.status === 200) {
        console.log('success');
      } else {
        console.log('error');
      }
      console.log('restarted');
      fetch("https://jimstasks.ue.r.appspot.com/api").then(
        response => response.json()
    ).then(
        data => {
          setBackendData(data)
        }
    )

    })
    .catch((error) => {
      console.log('network: ' + error);
    })

  }

  const completeTask = (item) => {
    fetch('https://jimstasks.ue.r.appspot.com/del/'+ item.detail)
    .then((response) => {
      if (response.status === 200) {
        console.log('success');
      } else {
        console.log('error');
      }
      console.log('restarted');
      fetch("https://jimstasks.ue.r.appspot.com/api").then(
        response => response.json()
    ).then(
        data => {
          setBackendData(data)
        }
    )

    })
    .catch((error) => {
      console.log('network: ' + error);
    })
  }

  const [backendData, setBackendData] = useState([{}])
  
  useEffect(() => {
    fetch("https://jimstasks.ue.r.appspot.com/api").then(
      response => response.json()
  ).then(
      data => {
        setBackendData(data)
      }
  )
  }, [])

  return (
    <View style={styles.container}>

      {/* Today's tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>To-Do, todo todo todo!</Text>
        <View style={styles.items}>
          {
            backendData.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => completeTask(item)}>
                  <Task text={item.detail} />
                </TouchableOpacity>
              ) 
            })
          }
        </View>
      </View>

      {/* write tasks */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}>
          <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>!!!</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-round',
    alignItems: 'center',
  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 60,
    width: 250, 
  },

  addWrapper: {
    width: 60,
    height: 60,
    marginLeft: 20,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },

  addText: {
    alighItems: 'right',
  },

});
