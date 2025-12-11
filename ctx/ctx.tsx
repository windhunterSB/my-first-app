// ctx.tsx
import React, { useContext, createContext, type PropsWithChildren } from 'react';
// import { useStorageState } from './hooks/useStorageState'; // 我们稍后会用到这个自定义 Hook
import { AuthService, User } from '@/services/auth';

// 定义 Context 的内容格式
interface AuthContextType {
  signIn: (email: string) => Promise<void>;
  signOut: () => void;
  session?: string | null; // 这里简单存 uuid 或者直接存 User 对象 json
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: () => {},
  session: null,
  user: null,
  isLoading: false,
});

// 这个 Hook 让我们在任何页面都能方便地调用 signIn / signOut
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  // 我们需要一个简单的 Hook 来同步 AsyncStorage 和内存状态
  // 为了简化，这里我们直接用 React.useState，但在实际项目中通常会封装 useStorageState
  // 这里我们为了快速修复，直接结合 AuthService 使用
  
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // 初始化：App 启动时读取本地存储
  React.useEffect(() => {
    AuthService.getCurrentUser().then((u) => {
      setUser(u);
      setIsLoading(false);
    });
  }, []);

  const signIn = async (email: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await AuthService.loginOrRegister(email);
      setUser(loggedInUser); // 关键！更新内存中的状态，触发 React 重新渲染
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    AuthService.logout();
    setUser(null); // 关键！清空状态
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session: user?.uuid,
        user,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}