import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTaskStore } from '../store/taskStore';
import { Feather, MaterialIcons } from '@expo/vector-icons';

export default function TaskDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { tasks, removeTask, updateTask } = useTaskStore();

  const task = tasks.find((t) => t.id === route.params?.taskId);

  if (!task) return null;

  const handleDelete = () => {
    // No web (localhost) o Alert.alert pode não exibir modal nativo.
    // Usamos window.confirm como fallback para confirmar a exclusão no navegador.
    if (Platform.OS === 'web') {
      const ok = window.confirm('Excluir Hábito\n\nEssa ação não pode ser desfeita.');
      if (ok) {
        removeTask(task.id);
        navigation.goBack();
      }
      return;
    }

    Alert.alert("Excluir Hábito", "Essa ação não pode ser desfeita.", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => { removeTask(task.id); navigation.goBack(); } }
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F6F8' }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header Simples */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalhes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TaskForm', { taskId: task.id })}>
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>
        </View>

        {/* Status Card */}
        <View style={styles.mainCard}>
          <View style={[styles.iconContainer, task.completed ? styles.bgGreen : styles.bgPurple]}>
            <Feather name={task.completed ? "check" : "clock"} size={32} color="#FFF" />
          </View>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <View style={[styles.statusTag, task.completed ? styles.tagGreen : styles.tagPurple]}>
            <Text style={[styles.tagText, task.completed ? styles.textGreen : styles.textPurple]}>
              {task.completed ? 'CONCLUÍDA' : 'EM ANDAMENTO'}
            </Text>
          </View>
        </View>

        {/* Descrição Card */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionLabel}>DESCRIÇÃO</Text>
          <Text style={styles.descriptionText}>
            {task.description || "Nenhuma descrição informada."}
          </Text>
        </View>

        {/* Metadata Card */}
        <View style={styles.infoCard}>
          <View style={styles.metaRow}>
            <Feather name="calendar" size={16} color="#666" />
            <Text style={styles.metaText}>Criado em {new Date(task.createdAt).toLocaleDateString('pt-BR')}</Text>
          </View>
        </View>

      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.actionBtn, styles.primaryAction, task.completed && styles.outlineAction]} 
          onPress={() => updateTask({ ...task, completed: !task.completed })}
        >
          <Text style={[styles.btnText, task.completed && styles.textOutline]}>
            {task.completed ? 'Reabrir Tarefa' : 'Concluir Tarefa'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Feather name="trash-2" size={24} color="#FF5252" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 100 },
  
  // Top Bar
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  backBtn: { padding: 8, marginLeft: -8 },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  editText: { fontSize: 16, color: '#6C63FF', fontWeight: 'bold' },

  // Main Card
  mainCard: { alignItems: 'center', marginBottom: 24 },
  iconContainer: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  bgGreen: { backgroundColor: '#4CAF50' },
  bgPurple: { backgroundColor: '#6C63FF' },
  
  taskTitle: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A', textAlign: 'center', marginBottom: 12 },
  
  statusTag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagGreen: { backgroundColor: '#E8F5E9' },
  tagPurple: { backgroundColor: '#EDE7F6' },
  tagText: { fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  textGreen: { color: '#2E7D32' },
  textPurple: { color: '#6C63FF' },

  // Info Cards
  infoCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, marginBottom: 16, elevation: 1 },
  sectionLabel: { fontSize: 12, fontWeight: 'bold', color: '#999', marginBottom: 8, letterSpacing: 1 },
  descriptionText: { fontSize: 16, color: '#444', lineHeight: 24 },
  
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  metaText: { marginLeft: 10, color: '#666', fontSize: 14 },

  // Footer
  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    backgroundColor: '#FFF', padding: 20, 
    flexDirection: 'row', alignItems: 'center', gap: 16,
    borderTopWidth: 1, borderTopColor: '#EEE'
  },
  actionBtn: { flex: 1, padding: 18, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  primaryAction: { backgroundColor: '#6C63FF' },
  outlineAction: { backgroundColor: '#FFF', borderWidth: 2, borderColor: '#6C63FF' },
  
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  textOutline: { color: '#6C63FF' },
  
  deleteBtn: { padding: 18, backgroundColor: '#FFEBEE', borderRadius: 12 }
});