import { Button, I18nManager, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
const isRTL = I18nManager.isRTL;
const dir = isRTL ? -1 : 1;

const FirstBox = () => {
  const x = useSharedValue(0);

  const boxStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.get() * dir }],
    };
  });

  type GoType = "timing" | "spring";

  const go = (animation: GoType) => {
    const to = x.get() === 0 ? 150 : 0;
    x.set(animation === "spring" ? withSpring(to) : withTiming(to));
  };

  return (
    <View>
      <Animated.View style={[styles.box, boxStyles]} />
      <Button
        title="Timing"
        onPress={() => {
          go("timing");
        }}
      />
      <Button
        title="Spring"
        onPress={() => {
          go("spring");
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  box: { width: 64, height: 64, borderRadius: 12, backgroundColor: "#2f80ed" },
});
export default FirstBox;
