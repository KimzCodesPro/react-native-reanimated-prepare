import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated"; // NEW: withDelay

const PAUSE = 300; // NEW: how long the triangle rests between two turns, in ms

const TriangleLoader = () => {
  const angle = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${angle.get()}deg` }],
  }));

  useEffect(() => {
    angle.set(
      withRepeat(
        withDelay(
          PAUSE,
          withTiming(360, { duration: 1000, easing: Easing.linear }),
        ), // NEW: wait, then turn
        -1,
      ),
    );
  }, [angle]);

  return (
    <View style={styles.center}>
      <Animated.View style={[styles.triangle, style]} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center", height: 120 },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderBottomWidth: 52,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#2196F3",
    transformOrigin: "50% 66.67%", // turn around the triangle's real center, not the box's center
  },
});

export default TriangleLoader;
