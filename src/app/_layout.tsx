import { Stack } from "expo-router";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: true, // warns about misuse, like reading .value during render
});

export default function RootLayout() {
  return <Stack />;
}
