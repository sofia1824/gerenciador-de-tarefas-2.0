import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pickImage, takePhoto } from '../../services/media';

const PROFILE_KEY = '@campusgo_profile_pic';

export default function ProfileScreen() {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(PROFILE_KEY).then((saved) => {
      if (saved) setImageUri(saved);
    });
  }, []);

  const saveImage = async (uri) => {
    if (uri) {
      setImageUri(uri);
      await AsyncStorage.setItem(PROFILE_KEY, uri);
    }
  };

  const handlePick = async () => {
    const uri = await pickImage();
    await saveImage(uri);
  };

  const handleTake = async () => {
    const uri = await takePhoto();
    await saveImage(uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.placeholder]}>
          <Text style={{ color: '#aaa' }}>Sem Foto</Text>
        </View>
      )}

      <View style={styles.buttonRow}>
        <Button title="Galeria" onPress={handlePick} />
        <Button title="Câmera" onPress={handleTake} color="#2e7d32" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  placeholder: { backgroundColor: '#e1e1e1', justifyContent: 'center', alignItems: 'center' },
  buttonRow: { flexDirection: 'row', gap: 15 },
});