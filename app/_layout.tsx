import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { SessionProvider, useSession } from '@/ctx/ctx'; // 👈 注意：这里假设你之前建立的是 ctx/ctx.tsx

// 1. 创建一个内部组件，专门负责路由逻辑和渲染 Stack
function MainLayout() {
  const { session, isLoading } = useSession();
  const segments = useSegments();
  const router = useRouter();
  const colorScheme = useColorScheme();

  // 路由保护逻辑
  useEffect(() => {
    if (isLoading) return;

    // segments[0] 表示当前路由的第一段，比如 '(tabs)' 或 'login'
    const inAuthGroup = segments[0] === '(tabs)';
    
    if (!session && inAuthGroup) {
      // 没登录，却想去主页 -> 踢回登录页
      router.replace('/login');
    } else if (session && segments[0] === 'login') {
      // 已登录，却在登录页 -> 踢去主页
      router.replace('/(tabs)');
    }
  }, [session, isLoading, segments]);

  // 如果正在加载 session 信息，什么都不显示，避免闪屏
  if (isLoading) {
    return null; 
  }

  // 渲染应用的主导航结构
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

// 2. RootLayout 只负责包裹 SessionProvider
export default function RootLayout() {
  return (
    <SessionProvider>
      <MainLayout />
    </SessionProvider>
  );
}