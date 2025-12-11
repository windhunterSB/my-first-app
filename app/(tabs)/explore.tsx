import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useSession } from '@/ctx/ctx'; // 1. 引入我們的全局 Session Hook

// 1. 定义简单的数据结构 (暂时用假数据)
const myHoldings = [
  { id: '1', symbol: 'NVDA', name: 'Apple Inc.', price: '180.50' },
  { id: '2', symbol: 'MSFT', name: 'AMD', price: '420.00' },
  { id: '3', symbol: 'TSLA', name: 'GOOGL', price: '175.30' },
];

export default function HomeScreen() {
  const { signOut } = useSession(); // 2. 獲取登出方法

  return (
    <View style={styles.container}>
      {/* 3. 在標題旁邊加一個臨時的登出按鈕 */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>觀察列表 👀</Text>
        <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
          <Text style={styles.signOutText}>登出</Text>
        </TouchableOpacity>
      </View>
      
      {/* ... (FlatList 部分保持不變) ... */}
      <FlatList
        data={myHoldings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.stockItem}>
            <View>
              <Text style={styles.symbol}>{item.symbol}</Text>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}



// 3. 样式表 (CSS-in-JS)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  // 修改標題區域樣式，讓它橫向排列
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  // 新增登出按鈕樣式
  signOutButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stockItem: {
    flexDirection: 'row', // 横向布局
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    color: 'gray',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: 'orange', // 修改为橙色
  },
});