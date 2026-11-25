import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Task } from '../database/models/Task';

type Props = {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

const priorityColors = { Low: '#329B76', Medium: '#D28A25', High: '#D65B5B' };

export default function TaskCard({ task, onToggle, onEdit, onDelete }: Props) {
  return (
    <View style={[styles.card, task.isCompleted && styles.completedCard]}>
      <Pressable
        onPress={() => onToggle(task)}
        style={styles.checkArea}
        hitSlop={8}
      >
        <View style={[styles.checkbox, task.isCompleted && styles.checked]}>
          {task.isCompleted ? <Text style={styles.checkmark}>✓</Text> : null}
        </View>
      </Pressable>
      <Pressable style={styles.content} onPress={() => onEdit(task)}>
        <Text
          style={[styles.title, task.isCompleted && styles.doneTitle]}
          numberOfLines={2}
        >
          {task.title}
        </Text>
        {!!task.notes && (
          <Text style={styles.notes} numberOfLines={2}>
            {task.notes}
          </Text>
        )}
        <View style={styles.metaRow}>
          <View
            style={[
              styles.priorityDot,
              { backgroundColor: priorityColors[task.priority] },
            ]}
          />
          <Text style={styles.priorityText}>{task.priority} priority</Text>
          <Text style={styles.dateText}>
            · {task.createdAt.toLocaleDateString()}
          </Text>
        </View>
      </Pressable>
      <Pressable onPress={() => onEdit(task)} style={styles.action} hitSlop={8}>
        <Text style={styles.actionText}>✎</Text>
      </Pressable>
      <Pressable
        onPress={() => onDelete(task)}
        style={styles.action}
        hitSlop={8}
      >
        <Text style={[styles.actionText, styles.deleteText]}>×</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 15,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: '#EEF0F3',
  },
  completedCard: { backgroundColor: '#FAFBFC' },
  checkArea: { paddingRight: 12, paddingVertical: 8 },
  checkbox: {
    width: 23,
    height: 23,
    borderRadius: 8,
    borderWidth: 1.7,
    borderColor: '#C8CDD5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: { backgroundColor: '#635BEE', borderColor: '#635BEE' },
  checkmark: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  content: { flex: 1 },
  title: { fontSize: 15, fontWeight: '700', color: '#202431' },
  doneTitle: { color: '#9AA0AA', textDecorationLine: 'line-through' },
  notes: { fontSize: 12, lineHeight: 18, color: '#858B98', marginTop: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 9 },
  priorityDot: { width: 7, height: 7, borderRadius: 4, marginRight: 6 },
  priorityText: { fontSize: 11, color: '#777E8B', fontWeight: '600' },
  dateText: { fontSize: 11, color: '#A0A5AE', marginLeft: 6 },
  action: { paddingHorizontal: 7, paddingVertical: 8 },
  actionText: { fontSize: 20, color: '#8C91A0' },
  deleteText: { fontSize: 25, color: '#D16A6A' },
});
