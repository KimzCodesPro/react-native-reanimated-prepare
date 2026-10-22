import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const LikeButton = () => {
  const scale = useSharedValue(1);

  const heartAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.get() }],
    };
  });

  const handlePress = () => {
    scale.set(withSpring(scale.get() > 1 ? 1 : 1.5));
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={heartAnimation}></Animated.View>
    </Pressable>
  );
};

export default LikeButton;
