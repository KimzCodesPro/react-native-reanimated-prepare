import { ReactNode } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type PressableScaleProps = Omit<PressableProps, "style" | "children"> & {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PressableScale = ({
  children,
  style,
  onPressIn,
  onPressOut,
  ...props
}: PressableScaleProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.get() }],
    };
  });

  return (
    <AnimatedPressable
      {...props}
      style={[styles.container, animatedStyle]}
      onPressIn={(event) => {
        scale.set(withTiming(0.97, { duration: 100 }));
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        scale.set(withSpring(1));
        onPressOut?.(event);
      }}
    >
      {children}
    </AnimatedPressable>
  );
};

export default PressableScale;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 300,
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 10,
    justifyContent: "center",
  },
});
