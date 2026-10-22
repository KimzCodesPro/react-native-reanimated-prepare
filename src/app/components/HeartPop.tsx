import { useRef } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const HeartPop = () => {
  const lastTap = useRef(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  const heartStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.get(),
      transform: [{ scale: scale.get() }],
    };
  });

  const heartPop = () => {
    scale.set(0.3);
    opacity.set(1);

    scale.set(withSpring(1));
    opacity.set(withTiming(0));
  };

  const handlePress = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      heartPop();
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  };

  return (
    <Pressable style={styles.photo} onPress={handlePress}>
      <Animated.Text style={[styles.heart, heartStyle]}>❤️</Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  photo: {
    height: 300,
    backgroundColor: "#c9b6ff",
    alignItems: "center",
    justifyContent: "center",
  },
  heart: { fontSize: 96 },
});

export default HeartPop;
