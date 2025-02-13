import { Text, View } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";

export default function TabTwoScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Tab Two</Text>
      <View style={{ marginVertical: 30, height: 1, width: "80%" }} />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}
