import { StyleSheet, Text, View, FlatList } from 'react-native';

// 1. 定义简单的数据结构 (暂时用假数据)
const myHoldings = [
  { id: '1', symbol: 'NVDA', name: 'Apple Inc.', price: '180.50' },
  { id: '2', symbol: 'MSFT', name: 'AMD', price: '420.00' },
  { id: '3', symbol: 'TSLA', name: 'GOOGL', price: '175.30' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>观察列表 👀</Text>
      
      {/* 2. 使用 FlatList 渲染列表 */}
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
    paddingTop: 50, // 避开顶部的刘海屏区域
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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