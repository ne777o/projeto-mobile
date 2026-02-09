import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, 
  KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, Alert 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { v4 as uuid } from 'uuid';
import { useTaskStore } from '../store/taskStore';
import { taskSchema } from '../validators/taskSchema';
import { Feather } from '@expo/vector-icons';

export default function TaskFormScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { addTask, updateTask, tasks } = useTaskStore();

  const taskId = route.params?.taskId;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (taskId) {
      const existingTask = tasks.find((t) => t.id === taskId);
      if (existingTask) {
        setTitle(existingTask.title);
        setDescription(existingTask.description || '');
      }
    }
  }, [taskId]);

  const handleSubmit = () => {
    const data = { title, description };

    // Validação rápida para título vazio (mensagem clara para o usuário)
    if (!title || title.trim().length === 0) {
      setErrorMessage('Por favor, adicione um título para a tarefa');
      Alert.alert('Erro', 'Por favor, adicione um título para a tarefa');
      return;
    }

    const result = taskSchema.safeParse(data);

    if (!result.success) {
      setErrorMessage(result.error.issues[0].message);
      Alert.alert('Atenção', result.error.issues[0].message);
      return;
    }

    setErrorMessage('');

    if (taskId) {
      const existingTask = tasks.find(t => t.id === taskId)!;
      updateTask({ ...existingTask, title, description });
    } else {
      addTask({
        id: uuid(),
        title: data.title,
        description: data.description,
        completed: false,
        createdAt: new Date(),
      });
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Feather name="x" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{taskId ? 'Editar Hábito' : 'Novo Hábito'}</Text>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.saveText}>Salvar</Text>
          </TouchableOpacity>
        </View>

        {errorMessage && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.label}>O que você vai fazer?</Text>
          <TextInput 
            style={styles.titleInput} 
            value={title} 
            onChangeText={setTitle} 
            placeholder="Ex: Beber água"
            placeholderTextColor="#AAA"
            autoFocus={!taskId}
          />

          <View style={styles.divider} />

          <Text style={styles.label}>Detalhes (opcional)</Text>
          <TextInput 
            style={styles.descInput} 
            value={description} 
            onChangeText={setDescription} 
            multiline
            placeholder="Adicione notas, horários ou links..."
            placeholderTextColor="#AAA"
            textAlignVertical="top"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    paddingHorizontal: 20, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0'
  },
  closeBtn: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  saveText: { fontSize: 16, color: '#6C63FF', fontWeight: 'bold' },

  errorContainer: {
    backgroundColor: '#FFE5E5',
    borderLeftWidth: 4,
    borderLeftColor: '#FF4444',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 4,
  },
  errorText: {
    color: '#CC0000',
    fontSize: 14,
    fontWeight: '600',
  },

  label: { fontSize: 14, fontWeight: 'bold', color: '#999', marginBottom: 10, marginTop: 20, letterSpacing: 0.5 },
  
  titleInput: { 
    fontSize: 24, fontWeight: 'bold', color: '#333',
    paddingVertical: 10
  },
  
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 20 },
  
  descInput: { 
    fontSize: 18, color: '#555', lineHeight: 28,
    minHeight: 150
  }
});