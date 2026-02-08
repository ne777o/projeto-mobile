import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTaskStore } from '../store/taskStore';
import { MaterialIcons, Feather } from '@expo/vector-icons';

const THEME_COLOR = '#6C63FF'; // Roxo Moderno

export default function TaskListScreen() {
  const { tasks } = useTaskStore();
  const navigation = useNavigation<any>();

  // Ordenar: Pendentes primeiro
  const sortedTasks = [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));

  if (tasks.length === 0) {
    return (
      <View style={styles.center}>
        <Feather name="check-circle" size={80} color="#E0E0E0" />
        <Text style={styles.emptyTitle}>Tudo limpo!</Text>
        <Text style={styles.emptySubText}>Você não tem tarefas pendentes.</Text>
        
        <TouchableOpacity 
          style={styles.primaryButton} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('TaskForm')}
        >
          <Feather name="plus" size={20} color="#FFF" style={{marginRight: 8}} />
          <Text style={styles.primaryButtonText}>Nova Tarefa</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F8" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, Usuário 👋</Text>
          <Text style={styles.subGreeting}>Você tem {tasks.filter(t => !t.completed).length} tarefas pendentes</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <Feather name="user" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, item.completed && styles.cardCompleted]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
          >
            <View style={[styles.priorityStrip, { backgroundColor: item.completed ? '#CCC' : THEME_COLOR }]} />
            
            <View style={styles.cardContent}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text 
                  style={[styles.taskTitle, item.completed && styles.textCompleted]} 
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text style={styles.taskDate}>
                  <Feather name="calendar" size={12} /> {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                </Text>
              </View>
              
              {item.completed ? (
                 <Feather name="check-circle" size={24} color="#4CAF50" />
              ) : (
                 <Feather name="circle" size={24} color="#CCC" />
              )}
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        onPress={() => navigation.navigate('TaskForm')}
      >
        <Feather name="plus" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F4F6F8' },
  
  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 10 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' },
  subGreeting: { fontSize: 14, color: '#666', marginTop: 2 },
  profileBtn: { padding: 10, backgroundColor: '#FFF', borderRadius: 12, elevation: 2 },

  // Card
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 14,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2, // Android Shadow
    shadowColor: "#000", // iOS Shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  cardCompleted: { opacity: 0.7, backgroundColor: '#FAFAFA', borderColor: '#EEE' },
  
  priorityStrip: { width: 5, height: '100%' },
  
  cardContent: { flex: 1, padding: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  
  taskTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 4 },
  textCompleted: { textDecorationLine: 'line-through', color: '#999' },
  taskDate: { fontSize: 12, color: '#888' },

  // Empty State
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, backgroundColor: '#F4F6F8' },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginTop: 16 },
  emptySubText: { fontSize: 16, color: '#888', textAlign: 'center', marginBottom: 30, marginTop: 8 },

  // Buttons
  primaryButton: { 
    flexDirection: 'row', backgroundColor: THEME_COLOR, 
    paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12, alignItems: 'center',
    elevation: 4
  },
  primaryButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },

  // FAB
  fab: {
    position: 'absolute', bottom: 30, right: 25,
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: THEME_COLOR,
    justifyContent: 'center', alignItems: 'center',
    elevation: 10, shadowColor: THEME_COLOR, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 6
  }
});