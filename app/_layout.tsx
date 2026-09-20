import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // esconder o cabeçalho nativo 
        contentStyle: { backgroundColor: '#121212' }, 
      }}
    />
  );
}