import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import CheckBox from 'expo-checkbox';

const { width } = Dimensions.get('window');

const Tasks = ({ nomTache, isChecked, onCheckboxChange }) => {
  const cardStyle = isChecked 
    ? [styles.card, styles.cardChecked] 
    : styles.card;

  return (
    <View style={cardStyle}>
      <View style={styles.header}>
        <Text style={styles.taskName}>{nomTache}</Text>
        <CheckBox
          value={isChecked}
          onValueChange={onCheckboxChange}
          style={styles.checkbox}
        />
      </View>
    </View> 
  );
}

const styles = StyleSheet.create({
    card: {
        marginTop: 30,
        width: width * 0.85,
        backgroundColor: '#C0C0C0',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 4,
        padding: 16,
      },
      cardChecked: {
        backgroundColor: 'yellow',
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      taskName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      time: {
        fontSize: 18,
      },
      footer: {
        marginTop: 16,
      },
      parcelName: {
        fontSize: 16,
        color: '#333',
      },
});

export default Tasks