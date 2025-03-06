import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

const _layout = () => {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching user data (replace with real authentication logic)
  useEffect(() => {
    // Example: Fetch user info (replace with AsyncStorage, API call, etc.)
    setTimeout(() => {
      const fetchedName = "momoko"; // Change to `null` to test going to index page
      setName(fetchedName);
      setLoading(false);
    }, 1000);
  }, []);

  // Automatically navigate if name is not null
  useEffect(() => {
    if (!loading && name == "ayako") {
      router.replace("/(tabs)/one"); // Navigate to tab layout
    }
    if (!loading && name == "momoko") {
      router.replace("/(group)/one"); // Navigate to tab layout
    }

    setLoading(true);
  }, [name]);

  // Show loading screen while checking user data
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Render navigation stack (only for index page)
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default _layout;
