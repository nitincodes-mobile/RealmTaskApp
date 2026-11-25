import React, { useState } from 'react';
import { Alert, Modal, Platform, ScrollView, View } from 'react-native';
import { useQuery, useRealm } from '@realm/react';
import Realm from 'realm';
import { Task, TaskPriority } from '../database/models/Task';
import TaskCard from '../components/TaskCard';

import {
  Container,
  PersonalWorkSpace,
  TopRow,
  HeaderContent,
  EyeBrow,
  Heading,
  HeadingDot,
  Avatar,
  AvatarText,
  SummaryCard,
  SummaryTop,
  SummaryLabel,
  SummaryTitle,
  ProgressBadge,
  ProgressBadgeText,
  ProgressTrack,
  ProgressFill,
  StatsRow,
  StatItem,
  StatNumber,
  StatLabel,
  StatDivider,
  SectionHeader,
  SectionTitle,
  ClearText,
  SearchBox,
  SearchIcon,
  SearchInput,
  ClearSearch,
  FilterRow,
  FilterChip,
  FilterText,
  TaskList,
  EmptyContainer,
  EmptyIcon,
  EmptyIconText,
  EmptyTitle,
  EmptySubtitle,
  AddButton,
  AddIcon,
  AddButtonText,
  ModalBackdrop,
  ModalSheet,
  ModalHandle,
  ModalHeader,
  ModalTitle,
  CloseButton,
  FieldLabel,
  FieldInput,
  NotesInput,
  PriorityRow,
  PriorityOption,
  PriorityOptionText,
  SaveButton,
  SaveButtonText,
  KeyboardWrapper,
} from './HomeScreen.styled';

type Filter = 'All' | 'Pending' | 'Completed';

const priorities: TaskPriority[] = ['Low', 'Medium', 'High'];

export default function HomeScreen() {
  const realm = useRealm();

  const tasks = useQuery(
    { type: Task, query: collection => collection.sorted('createdAt', true) },
    [],
  );

  const [filter, setFilter] = useState<Filter>('All');
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<Realm.BSON.ObjectId | null>(null);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Medium');

  const taskArray = Array.from(tasks);

  const completedCount = taskArray.filter(task => task.isCompleted).length;

  const pendingCount = taskArray.length - completedCount;

  const visibleTasks = taskArray.filter(task => {
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Pending' ? !task.isCompleted : task.isCompleted);

    const query = search.trim().toLowerCase();

    const matchesSearch =
      !query ||
      task.title.toLowerCase().includes(query) ||
      task.notes.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  const openCreate = () => {
    setEditingId(null);
    setTitle('');
    setNotes('');
    setPriority('Medium');
    setModalVisible(true);
  };

  const openEdit = (task: Task) => {
    setEditingId(task._id);
    setTitle(task.title);
    setNotes(task.notes);
    setPriority(task.priority);
    setModalVisible(true);
  };

  const saveTask = () => {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      Alert.alert('Task title required', 'Please enter a title for your task.');
      return;
    }

    const now = new Date();

    realm.write(() => {
      if (editingId) {
        const existing = realm.objectForPrimaryKey<Task>(Task, editingId);

        if (existing) {
          existing.title = cleanTitle;
          existing.notes = notes.trim();
          existing.priority = priority;
          existing.updatedAt = now;
        }
      } else {
        realm.create(Task, {
          _id: new Realm.BSON.ObjectId(),
          title: cleanTitle,
          notes: notes.trim(),
          priority,
          isCompleted: false,
          createdAt: now,
          updatedAt: now,
        });
      }
    });

    setModalVisible(false);
  };

  const toggleTask = (task: Task) => {
    realm.write(() => {
      task.isCompleted = !task.isCompleted;
      task.updatedAt = new Date();
    });
  };

  const deleteTask = (task: Task) => {
    Alert.alert(
      'Delete task?',
      `“${task.title}” will be permanently deleted.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => realm.write(() => realm.delete(task)),
        },
      ],
    );
  };

  const clearCompleted = () => {
    if (!completedCount) return;

    Alert.alert(
      'Clear completed tasks?',
      'This will permanently delete all completed tasks.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () =>
            realm.write(() => {
              realm.delete(tasks.filtered('isCompleted == true'));
            }),
        },
      ],
    );
  };
  const progress = taskArray.length ? completedCount / taskArray.length : 0;

  const closeModal = () => setModalVisible(false);

  return (
    <Container>
      <PersonalWorkSpace>
        <TopRow>
          <HeaderContent>
            <EyeBrow>YOUR PERSONAL WORKSPACE</EyeBrow>
            <Heading>
              My Tasks<HeadingDot>.</HeadingDot>
            </Heading>
          </HeaderContent>

          <Avatar>
            <AvatarText>N</AvatarText>
          </Avatar>
        </TopRow>

        <SummaryCard>
          <SummaryTop>
            <View>
              <SummaryLabel>YOUR PROGRESS</SummaryLabel>
              <SummaryTitle>
                {completedCount} of {taskArray.length} completed
              </SummaryTitle>
            </View>

            <ProgressBadge>
              <ProgressBadgeText>
                {Math.round(progress * 100)}%
              </ProgressBadgeText>
            </ProgressBadge>
          </SummaryTop>

          <ProgressTrack>
            <ProgressFill progress={progress} />
          </ProgressTrack>

          <StatsRow>
            <StatItem>
              <StatNumber>{pendingCount}</StatNumber>
              <StatLabel>Pending</StatLabel>
            </StatItem>

            <StatDivider />

            <StatItem>
              <StatNumber>{completedCount}</StatNumber>
              <StatLabel>Completed</StatLabel>
            </StatItem>

            <StatDivider />

            <StatItem>
              <StatNumber>{taskArray.length}</StatNumber>
              <StatLabel>Total tasks</StatLabel>
            </StatItem>
          </StatsRow>
        </SummaryCard>

        <SectionHeader>
          <SectionTitle>Tasks</SectionTitle>
          <ClearText onPress={clearCompleted}>Clear completed</ClearText>
        </SectionHeader>

        <SearchBox>
          <SearchIcon>⌕</SearchIcon>

          <SearchInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search your tasks..."
            placeholderTextColor="#A5AAB4"
            returnKeyType="search"
          />

          {!!search && (
            <ClearSearch onPress={() => setSearch('')}>×</ClearSearch>
          )}
        </SearchBox>

        <FilterRow>
          {(['All', 'Pending', 'Completed'] as Filter[]).map(item => {
            const active = filter === item;

            return (
              <FilterChip
                key={item}
                active={active}
                onPress={() => setFilter(item)}
              >
                <FilterText active={active}>{item}</FilterText>
              </FilterChip>
            );
          })}
        </FilterRow>

        <TaskList
          data={visibleTasks}
          keyExtractor={item => item._id.toHexString()}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onToggle={toggleTask}
              onEdit={openEdit}
              onDelete={deleteTask}
            />
          )}
          ListEmptyComponent={
            <EmptyContainer>
              <EmptyIcon>
                <EmptyIconText>✓</EmptyIconText>
              </EmptyIcon>

              <EmptyTitle>
                {search
                  ? 'No matching tasks'
                  : filter === 'Completed'
                  ? 'Nothing completed yet'
                  : 'Your list is clear'}
              </EmptyTitle>

              <EmptySubtitle>
                {search
                  ? 'Try another search term.'
                  : 'Add a task and it will appear here.'}
              </EmptySubtitle>
            </EmptyContainer>
          }
        />

        <AddButton onPress={openCreate}>
          <AddIcon>＋</AddIcon>
          <AddButtonText>Add new task</AddButtonText>
        </AddButton>
      </PersonalWorkSpace>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <KeyboardWrapper
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ModalBackdrop onPress={closeModal} />

          <ModalSheet>
            <ModalHandle />

            <ModalHeader>
              <ModalTitle>
                {editingId ? 'Edit task' : 'Create a task'}
              </ModalTitle>

              <CloseButton onPress={closeModal}>×</CloseButton>
            </ModalHeader>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <FieldLabel>TASK TITLE</FieldLabel>

              <FieldInput
                value={title}
                onChangeText={setTitle}
                placeholder="What do you need to do?"
                placeholderTextColor="#A5AAB4"
                maxLength={100}
                autoFocus
              />

              <FieldLabel>NOTES (OPTIONAL)</FieldLabel>

              <NotesInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Add a little more detail..."
                placeholderTextColor="#A5AAB4"
                multiline
                textAlignVertical="top"
                maxLength={500}
              />

              <FieldLabel>PRIORITY</FieldLabel>

              <PriorityRow>
                {priorities.map(item => {
                  const active = priority === item;

                  return (
                    <PriorityOption
                      key={item}
                      active={active}
                      onPress={() => setPriority(item)}
                    >
                      <PriorityOptionText active={active}>
                        {item}
                      </PriorityOptionText>
                    </PriorityOption>
                  );
                })}
              </PriorityRow>

              <SaveButton onPress={saveTask}>
                <SaveButtonText>
                  {editingId ? 'Save changes' : 'Create task'}
                </SaveButtonText>
              </SaveButton>
            </ScrollView>
          </ModalSheet>
        </KeyboardWrapper>
      </Modal>
    </Container>
  );
}
