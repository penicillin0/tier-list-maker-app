import React from "react";
import { Text, View } from "react-native";

import { ExternalLink } from "./ExternalLink";

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
      >
        <ExternalLink
          style={{ paddingVertical: 15 }}
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
        >
          <Text style={{ textAlign: "center" }}>
            Tap here if your app doesn't automatically update after making
            changes
          </Text>
        </ExternalLink>
      </View>
    </View>
  );
}
