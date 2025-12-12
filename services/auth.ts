import AsyncStorage from '@react-native-async-storage/async-storage';
import { Config } from '@/constants/config'; // 👈 確保你已經創建了 constants/config.ts

// 定義用戶類型
export interface User {
  email: string;
  uuid: string; // 這是關聯後端數據的關鍵鑰匙
}

const USER_STORAGE_KEY = 'current_user';

export const AuthService = {
  // 登錄/註冊接口：從 Python 後端獲取用戶數據
  loginOrRegister: async (email: string): Promise<User> => {
    
    console.log(`正在向服務端請求登錄: ${email}`);

    try {
      // 👇 使用 Config.API_URL 拼接完整的接口地址
      // 這樣無論是開發環境(localhost/10.0.2.2)還是生產環境，這裡都不用改
      const response = await fetch(`${Config.API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 對應後端 Pydantic 定義的 class LoginRequest(BaseModel): email: str
        body: JSON.stringify({ email: email }), 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 👇 解析後端返回的 JSON
      const data = await response.json();
      console.log('後端返回:', data);

      // 我們的後端返回結構是 { msg: "...", user: { email: "...", uuid: "..." } }
      // 所以我們要取 data.user
      const user: User = data.user;

      // 登錄成功後，把用戶信息存在本地，下次打開 App 就不用再登錄了
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      return user;

    } catch (error) {
      console.error('登錄請求失敗:', error);
      throw error; // 拋出異常，讓 UI 層（LoginScreen）去處理，比如停止轉圈圈或顯示錯誤
    }
  },

  // 獲取當前登錄的用戶（從本地緩存讀取，用於 App 啟動時恢復狀態）
  getCurrentUser: async (): Promise<User | null> => {
    const jsonValue = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  },

  // 退出登錄
  logout: async () => {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  }
};