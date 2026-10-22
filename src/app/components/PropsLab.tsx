import { Button, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const PropsLab = () => {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const width = useSharedValue(64);
  const color = useSharedValue("#2f80ed"); // NEW: a color string

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.get(),
    transform: [{ scale: scale.get() }, { rotate: `${rotation.get()}deg` }],
    width: width.get(),
    backgroundColor: color.get(),
  }));

  const playAnimation = () => {
    const runBefore = scale.get() === 1;
    opacity.set(withTiming(runBefore ? 0.5 : 1));
    scale.set(withTiming(runBefore ? 1.5 : 1));
    rotation.set(withTiming(runBefore ? 180 : 0));
    width.set(withTiming(runBefore ? 160 : 64));
    color.set(withTiming(runBefore ? "#eb5757" : "#2f80ed"));
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button title="Play Animation" onPress={playAnimation} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: { height: 64, borderRadius: 12 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 100,
  },
});
export default PropsLab;
