// app/login.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { AuthService } from '@/services/auth';
import { useSession } from '@/ctx/ctx'; // 引入 Hook

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useSession(); // 获取全局的 signIn 方法

  const handleLogin = async () => {
    if (!email.includes('@')) {
      Alert.alert('提示', '请输入有效的邮箱地址');
      return;
    }

    setLoading(true);
    try {
      // 调用 Context 里的 signIn，它会自动更新全局状态
      // RootLayout 里的 useEffect 监听到状态变化，会自动跳转，所以这里不需要写 router.replace
      await signIn(email); 
    } catch (error) {
      Alert.alert('错误', '登录失败');
      setLoading(false);
    }
    // 注意：不用在这里 setLoading(false)，因为如果成功跳转了，组件就卸载了
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>StockNote 📈</Text>
        <Text style={styles.subtitle}>极简的股票复盘工具</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>邮箱登录/注册</Text>
        <TextInput
          style={styles.input}
          placeholder="name@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>进入 App</Text>
          )}
        </TouchableOpacity>
        
        <Text style={styles.hint}>
          若是新邮箱将自动创建账号，老用户则直接登录。
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    height: 50,
    backgroundColor: '#0a7ea4',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hint: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 8,
  }
});