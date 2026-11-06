import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function TasksScreen() {
  const router = useRouter();

  const handleVibrate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleGetLocation = async () => {
    const place = await getCurrentPlace();
    if (place) {
      Alert.alert('Sua Localização', place.label);
    }
  };

  const handleSchedule = () => {
    scheduleReminder('Lembrete de Estudo', 5);
    Alert.alert('Lembrete', 'Notificação agendada para daqui a 5 segundos!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Ver Tarefa 1" onPress={() => router.push('/task/1')} />
        <Button title="Criar Nova Tarefa (Modal)" onPress={() => router.push('/new-task')} />
        <Button title="Vibrar Celular" onPress={handleVibrate} color="#841584" />
        <Button title="Obter Localização" onPress={handleGetLocation} color="#2e7d32" />
        <Button title="Agendar Lembrete (5s)" onPress={handleSchedule} color="#d32f2f" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  buttonContainer: { gap: 12 },
});