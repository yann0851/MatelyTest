import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Tasks from './components/Tasks';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState({});
  const [nextId, setNextId] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  const handleAddTask = () => {
    if (task) {
      const newTask = { id: nextId, name: task };
      setTaskItems([...taskItems, newTask]);
      setCheckedTasks(prevState => ({
        ...prevState,
        [task]: false,
      }));
      setTask('');
      setNextId(nextId + 1);
    }
  };

  const handleCheckboxChange = (taskName) => {
    setCheckedTasks(prevState => ({
      ...prevState,
      [taskName]: !prevState[taskName],
    }));
  };

  const handleDeleteTask = (rowMap, idToDelete) => {
    if (rowMap[idToDelete]) {
      rowMap[idToDelete].closeRow();
    }
    setTaskItems(prevItems => prevItems.filter(item => item.id !== idToDelete));
  };

  const filteredTaskItems = () => {
    return taskItems.filter(item => {
      if (filterType === 'completed' && !checkedTasks[item.name]) return false;
      if (filterType === 'inProgress' && checkedTasks[item.name]) return false;
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
  };

  const toggleFilterType = () => {
    setFilterType(prevType => {
      if (prevType === 'all') return 'completed';
      if (prevType === 'completed') return 'inProgress';
      return 'all';
    });
  };

  const getFilterIcon = () => {
    if (filterType === 'all') return 'list';
    if (filterType === 'completed') return 'check';
    return 'clock-o';
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Liste des tâches :</Text>
        <View style={styles.iconsContainer}>
          {!searchBarVisible && (
            <>
              <TouchableOpacity onPress={() => setSearchBarVisible(true)}>
                <Icon name="search" size={24} color="white" paddingRight={10}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleFilterType}>
                <Icon name={getFilterIcon()} size={24} color="white" />
              </TouchableOpacity>
            </>
          )}
        </View>

        {searchBarVisible && (
          <View style={styles.searchTaskWrapper}>
            <TextInput
              style={styles.input}
              placeholder={'Recherche une tâche'}
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity onPress={() => setSearchBarVisible(false)} style={styles.addWrapper}>
              <Icon name="times" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        <SwipeListView
          data={filteredTaskItems()}
          renderItem={(data, rowMap) => (
            <View style={styles.align}>
              <Tasks
                nomTache={data.item.name}
                isChecked={checkedTasks[data.item.name] || false}
                onCheckboxChange={() => handleCheckboxChange(data.item.name)}
              />
            </View>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}></View>
          )}
          rightOpenValue={-500}
          leftOpenValue={500}
          onRowOpen={(rowKey, rowMap) => {
            const idToDelete = taskItems.find(item => item.id.toString() === rowKey).id;
            handleDeleteTask(rowMap, idToDelete);
          }}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <View style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Ajoute une tâche'}
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  searchTaskWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchWrapper:{
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  loupeButton: {
    fontSize: 24,
    padding: 10,
    marginTop: 20,
  },
  closeSearch: {
    fontSize: 16,
    color: 'grey',
    padding: 10,
  },
  align:{
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'yellow'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 30,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
