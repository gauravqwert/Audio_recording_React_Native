import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {

  const [recording,setRecording] = React.useState();

  async function startRecording() {
    try{
      console.log("Requesting Submission..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS :true,
        playsInSilentModeIOS :true,
      });
      console.log('Start Recording...');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
      await recording.startAsync();
      setRecording(recording);
      console.log("Recording Started");
    }
    catch(err){
      console.log("Failed to start recording",err);
    }
  }

  async function stopRecording(){
    console.log("Stopping Recording ...");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording Stopped and stored at ', uri);
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop recording' : 'Start recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
