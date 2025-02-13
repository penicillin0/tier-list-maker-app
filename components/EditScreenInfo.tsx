import React from "react";
import { Text, View } from "react-native";

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View>
      <View style={{ alignItems: "center", marginHorizontal: 50 }}>
        <Text style={{ fontSize: 17, lineHeight: 24, textAlign: "center" }}>
          Open up the code for this screen:
        </Text>

        <View
          style={{
            borderRadius: 3,
            paddingHorizontal: 4,
            marginVertical: 7,
          }}
        >
          <Text>{path}</Text>
        </View>

        <Text style={{ fontSize: 17, lineHeight: 24, textAlign: "center" }}>
          Change any of the text, save the file, and your app will automatically
          update.
        </Text>
      </View>

      <View
        style={{ marginTop: 15, marginHorizontal: 20, alignItems: "center" }}
      ></View>
    </View>
  );
}
