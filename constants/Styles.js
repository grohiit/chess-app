import { StyleSheet } from 'react-native'

// Simple styles without color scheme dependency
export default function createStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: 24,
      textAlign: 'center',
    },
    text: {
      fontSize: 16,
      color: '#000000',
      marginBottom: 8,
      textAlign: 'center',
    },
    card: {
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
      padding: 16,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      alignSelf: 'center',
      width: 'auto',
    },
    boardContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#333',
      borderRadius: 4,
      padding: 8,
      backgroundColor: '#f0d9b5',
    },
    button: {
      backgroundColor: '#2f95dc',
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
      marginVertical: 8,
      minWidth: 120,
    },
    buttonText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 8,
      padding: 12,
      marginVertical: 8,
      color: '#000000',
      backgroundColor: '#ffffff',
      textAlign: 'center',
    },
    pickerContainer: {
      borderWidth: 2,
      borderColor: '#2f95dc',
      borderRadius: 8,
      backgroundColor: '#ffffff',
      marginVertical: 8,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    separator: {
      height: 1,
      backgroundColor: '#e0e0e0',
      marginVertical: 16,
      width: '80%',
      alignSelf: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    controlPanel: {
      alignItems: 'center',
      width: '100%',
      maxWidth: 320,
      marginTop: 16,
    },
    // Debug section styles
    debugSection: {
      padding: 10,
      width: '100%',
      marginTop: 16,
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    debugRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    debugLabel: {
      fontWeight: 'bold',
      marginRight: 10,
      minWidth: 100,
    },
    debugValue: {
      flex: 1,
    },
    debugButtons: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    // Help section styles
    helpSection: {
      padding: 10,
      width: '100%',
      marginTop: 16,
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
    },
    helpItem: {
      marginBottom: 10,
    },
    helpText: {
      fontSize: 16,
      color: '#333',
    },
  })
}

export const Colors = {
  primary: '#007AFF',
  secondary: '#FF3B30',
  background: '#F2F2F7',
  white: '#FFFFFF',
  text: '#000000',
  border: '#C7C7CC',
  lightSquare: '#F0D9B5',
  darkSquare: '#B58863',
}
