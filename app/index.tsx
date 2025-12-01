import React, { useRef } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LANGUAGES = [
  { key: "en", label: "English", colors: ["#667EEA", "#764BA2"] },
  { key: "hi", label: "Hindi", colors: ["#F6D365", "#FDA085"] },
  { key: "mr", label: "Marathi", colors: ["#84FAB0", "#8FD3F4"] },
  { key: "gu", label: "Gujarati", colors: ["#FBD786", "#f7797d"] },
  { key: "bn", label: "Bengali", colors: ["#FF9A9E", "#FAD0C4"] },
];

export default function LanguageButtonsScreen({ onSelectLanguage = () => {} }) {
  const renderItem = ({ item }) => (
    <LanguageButton item={item} onPress={onSelectLanguage} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose language</Text>

      <FlatList
        data={LANGUAGES}
        renderItem={renderItem}
        keyExtractor={(i) => i.key}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />

      <Text style={styles.hint}>Tap a language to continue</Text>
    </View>
  );
}

function LanguageButton({ item, onPress }) {
  // Animated press feedback
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 0.97,
      duration: 120,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 160,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => onPress(item.key, item.label);

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale }] }]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.92 }]}
      >
        <LinearGradient
          colors={item.colors}
          style={styles.gradient}
          start={[0, 0]}
          end={[1, 1]}
        >
          <View style={styles.inner}>
            <Text style={styles.langLabel}>{item.label}</Text>
            <View style={styles.pill}>
              <Text style={styles.pillText}>Select</Text>
            </View>
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: "#E6EEF8",
    fontWeight: "700",
    marginBottom: 18,
  },
  hint: {
    textAlign: "center",
    color: "#9FB3D8",
    marginTop: 18,
    fontSize: 13,
  },
  grid: {
    paddingBottom: 40,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardWrapper: {
    flex: 1,
    marginHorizontal: 6,
  },
  card: {
    borderRadius: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    overflow: "hidden",
  },
  gradient: {
    padding: 18,
    borderRadius: 16,
  },
  inner: {
    minHeight: 110,
    justifyContent: "space-between",
  },
  langLabel: {
    color: "#06202A",
    fontSize: 18,
    fontWeight: "800",
  },
  pill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0,0,0,0.08)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  pillText: {
    fontSize: 12,
    color: "#051422",
    fontWeight: "700",
  },
});
