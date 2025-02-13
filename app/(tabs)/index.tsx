import { Text, View } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";

export default function TabOneScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Tab One</Text>
      <View style={{ marginVertical: 30, height: 1, width: "80%" }} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}
