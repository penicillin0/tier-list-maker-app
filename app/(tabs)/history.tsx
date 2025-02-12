import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#1a1a1a',
        padding: 16,
      }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#fff',
          marginBottom: 16,
        }}>
        履歴
      </Text>
      <Text
        style={{
          color: '#888',
          textAlign: 'center',
          marginTop: 32,
        }}>
        保存されたティア表はありません
      </Text>
    </SafeAreaView>
  );
}