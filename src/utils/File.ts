import * as FileSystem from 'expo-file-system';

export const SaveFileFromUri = async (uri: string, newName: string) => {
  FileSystem.moveAsync({
    from: `file://${uri}`,
    to: `${FileSystem.documentDirectory}${newName}`
  })
}