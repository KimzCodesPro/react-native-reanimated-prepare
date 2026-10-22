import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressableButton = Animated.createAnimatedComponent(Pressable);

const PressableButton = ({ label }: { label: string }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.get() }],
      opacity: opacity.get(),
    };
  });

  return (
    <AnimatedPressableButton
      style={[animatedStyle, styles.button]}
      onPressIn={() => {
        scale.set(withTiming(0.95, { duration: 100 }));
        opacity.set(withTiming(0.6));
      }}
      onPressOut={() => {
        scale.set(withSpring(1, { mass: 1, stiffness: 600, damping: 30 }));
        opacity.set(withSpring(1));
      }}
    >
      <Text style={styles.label}>{label}</Text>
    </AnimatedPressableButton>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#2f80ed",
  },
  label: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default PressableButton;
