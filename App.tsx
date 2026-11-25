import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { RealmProvider } from '@realm/react';
import { Task } from './src/database/models/Task';
import HomeScreen from './src/screens/HomeScreen';
import styled from 'styled-components/native';

const DatabaseLoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #f6f7fb;
`;

const DatabaseLoadingText = styled.Text`
  margin-top: 12px;
  color: #777e8b;
`;

function DatabaseLoading() {
  return (
    <DatabaseLoadingContainer>
      <ActivityIndicator size="large" color="#635BEE" />
      <DatabaseLoadingText style={{ marginTop: 12, color: '#777E8B' }}>
        Opening local database...
      </DatabaseLoadingText>
    </DatabaseLoadingContainer>
  );
}

export default function App() {
  return (
    <RealmProvider schema={[Task]} schemaVersion={1} fallback={DatabaseLoading}>
      <HomeScreen />
    </RealmProvider>
  );
}
