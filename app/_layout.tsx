import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { ActivityIndicator, Text, View } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'G-Bold': require('@/assets/fonts/GowunBatang/GowunBatang-Bold.ttf'),
    'G-Regular': require('@/assets/fonts/GowunBatang/GowunBatang-Regular.ttf'),
    'P-Bold': require('@/assets/fonts/Poppins/Poppins-Bold.ttf'),
    'P-Regular': require('@/assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Semi-Bold': require('@/assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Light': require('@/assets/fonts/Poppins/Poppins-Light.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{color:'#f81414', fontFamily:'P-Bold', fontSize:18}}>Please wait for a moment</Text>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerTitle: 'EATOFY', headerTitleAlign: 'center', headerTitleStyle: {
          color: '#f81414',
          fontFamily: 'G-Bold'
        }
      }} />

      <Stack.Screen name="MainPage" options={{
        headerTitle: 'EATOFY', headerTitleAlign: 'center', headerBackVisible: false, headerTitleStyle: {
          color: '#f81414',
          fontFamily: 'G-Bold'
        }
      }} />

      <Stack.Screen name="Dishes" options={{
        headerTitle: 'EATOFY', headerTitleAlign: 'center', headerBackVisible: false, headerTitleStyle: {
          color: '#f81414',
          fontFamily: 'G-Bold'
        }
      }} />
    </Stack>
  );
}
