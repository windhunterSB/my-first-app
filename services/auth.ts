// services/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

// 定义用户类型
export interface User {
  email: string;
  uuid: string; // 这是关联后端数据的关键钥匙
}

const USER_STORAGE_KEY = 'current_user';

export const AuthService = {
  // 模拟登录/注册接口
  // 未来这里会替换成真实的 fetch('https://your-python-backend/api/login')
  loginOrRegister: async (email: string): Promise<User> => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 简单的模拟逻辑：
    // 实际项目中，这里应该把 email 发给后端，后端去数据库查，查不到就新建，查到了就返回 uuid
    console.log(`正在向服务端请求登录: ${email}`);
    
    // 这里我们暂时生成一个假的 UUID 给前端用
    const mockUuid = 'user_' + Math.random().toString(36).substring(7);
    
    const user: User = {
      email: email,
      uuid: mockUuid,
    };

    // 登录成功后，把用户信息存在本地，下次打开 App 就不用再登录了
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  // 获取当前登录的用户
  getCurrentUser: async (): Promise<User | null> => {
    const jsonValue = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  },

  // 退出登录
  logout: async () => {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  }
};