import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Share,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as StoreReview from 'expo-store-review';
import * as MailComposer from 'expo-mail-composer';

const SUPPORT_EMAIL = 'support@example.com';
const APP_STORE_URL = 'https://apps.apple.com/app/yourappid';
const PRIVACY_POLICY_URL = 'https://example.com/privacy';
const TERMS_URL = 'https://example.com/terms';

export default function SettingsScreen() {
  const handleRate = async () => {
    if (await StoreReview.hasAction()) {
      await StoreReview.requestReview();
    } else {
      Linking.openURL(APP_STORE_URL);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `素晴らしいティア表作成アプリを見てください！\n${APP_STORE_URL}`,
      });
    } catch (error) {
      Alert.alert('エラー', 'アプリの共有に失敗しました。');
    }
  };

  const handleContact = async () => {
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      await MailComposer.composeAsync({
        recipients: [SUPPORT_EMAIL],
        subject: 'ティア表作成アプリ サポート',
      });
    } else {
      Linking.openURL(`mailto:${SUPPORT_EMAIL}`);
    }
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    onPress: () => void
  ) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
      }}
      onPress={onPress}>
      <Ionicons
        name={icon as any}
        size={24}
        color="#fff"
        style={{ marginRight: 16 }}
      />
      <Text style={{ flex: 1, color: '#fff', fontSize: 16 }}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#666" />
    </TouchableOpacity>
  );

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
          marginBottom: 24,
        }}>
        設定
      </Text>
      <View
        style={{
          backgroundColor: '#333',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
        {renderSettingItem('star-outline', 'アプリを評価', handleRate)}
        {renderSettingItem('share-outline', 'アプリを共有', handleShare)}
        {renderSettingItem('mail-outline', 'お問い合わせ', handleContact)}
        {renderSettingItem(
          'document-text-outline',
          '利用規約',
          () => Linking.openURL(TERMS_URL)
        )}
        {renderSettingItem(
          'shield-outline',
          'プライバシーポリシー',
          () => Linking.openURL(PRIVACY_POLICY_URL)
        )}
      </View>
    </SafeAreaView>
  );
}