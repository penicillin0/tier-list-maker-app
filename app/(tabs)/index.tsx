import React, { useState, useCallback } from 'react';
import { Image, Alert } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, View, XStack, YStack } from 'tamagui';
import { Save, Plus } from '@tamagui/lucide-icons';
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { useRef } from 'react';

type TierItem = {
  id: string;
  imageUri: string;
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
};

const TIERS = ['S', 'A', 'B', 'C', 'D'] as const;
const TIER_COLORS = {
  S: '#ff4444',
  A: '#ff9933',
  B: '#ffcc33',
  C: '#99cc33',
  D: '#3399ff',
};

export default function TierListScreen() {
  const [items, setItems] = useState<TierItem[]>([]);
  const viewRef = useRef<View>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('権限が必要です', '写真へのアクセスを許可してください。');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 100, height: 100 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );

      setItems((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          imageUri: manipResult.uri,
          tier: 'D',
        },
      ]);
    }
  };

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<TierItem>) => {
      return (
        <ScaleDecorator>
          <TouchableOpacity
            onLongPress={drag}
            disabled={isActive}
            style={[
              styles.itemContainer,
              { backgroundColor: isActive ? '#666' : 'transparent' },
            ]}>
            <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                setItems((prev) => prev.filter((i) => i.id !== item.id));
              }}>
              <Ionicons name="close-circle" size={24} color="#ff4444" />
            </TouchableOpacity>
          </TouchableOpacity>
        </ScaleDecorator>
      );
    },
    []
  );

  const exportTierList = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('権限が必要です', '画像の保存を許可してください。');
        return;
      }

      const result = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(result);
      Alert.alert('保存完了', 'ティア表を写真に保存しました！');
    } catch (error) {
      Alert.alert('エラー', 'ティア表の保存に失敗しました。');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <View ref={viewRef} style={{ flex: 1, padding: 16 }}>
        <YStack space="$4">
          {TIERS.map((tier) => (
            <XStack key={tier} space="$4" alignItems="center">
              <YStack
                width={70}
                height={70}
                borderRadius="$4"
                backgroundColor={TIER_COLORS[tier]}
                justifyContent="center"
                alignItems="center">
                <Text
                  fontSize={32}
                  fontWeight="bold"
                  color="white"
                  textShadowColor="rgba(0, 0, 0, 0.75)"
                  textShadowOffset={{ width: 1, height: 1 }}
                  textShadowRadius={2}>
                  {tier}
                </Text>
              </YStack>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#333',
                  borderRadius: 8,
                  padding: 8,
                  height: 100,
                }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ height: '100%' }}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    paddingRight: 8,
                    alignItems: 'center',
                    height: '100%',
                  }}>
                  {items
                    .filter((item) => item.tier === tier)
                    .map((item) => (
                      <View
                        key={item.id}
                        style={{
                          width: 70,
                          height: 70,
                          marginRight: 8,
                          borderRadius: 8,
                          overflow: 'hidden',
                          position: 'relative',
                        }}>
                        <Image
                          source={{ uri: item.imageUri }}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 8,
                          }}
                        />
                      </View>
                    ))}
                </ScrollView>
              </View>
            </XStack>
          ))}
        </YStack>
      </View>

      <XStack
        backgroundColor="$gray8"
        borderTopWidth={1}
        borderTopColor="$gray7"
        padding="$4"
        justifyContent="space-around">
        <Button
          size="$4"
          theme="blue"
          backgroundColor="$blue8"
          icon={Save}
          onPress={exportTierList}>
          保存する
        </Button>
        <Button
          size="$4"
          theme="orange"
          backgroundColor="$orange8"
          icon={Plus}
          onPress={pickImage}>
          アイテム追加
        </Button>
      </XStack>
    </SafeAreaView>
  );
}