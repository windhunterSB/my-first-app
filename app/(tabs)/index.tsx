import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

// 1. 定义简单的数据结构 (暂时用假数据)
const myHoldings = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: '180.50' },
  { id: '2', symbol: 'MSFT', name: 'Microsoft', price: '420.00' },
  { id: '3', symbol: 'TSLA', name: 'Tesla', price: '175.30' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>我的持仓 💰</Text>
      
      {/* 2. 使用 FlatList 渲染列表 */}
      <FlatList
        data={myHoldings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // 2. 使用 Link 包裹整行
          // asChild 表示 Link 的子组件来处理样式和点击，这在列表中很常用
          <Link href={{
            pathname: '/details',
            params: { symbol: item.symbol } // 👈 把股票代码传过去
          }} asChild>
            {/* TouchableOpacity 提供了点击时的透明度反馈效果 */}
            <TouchableOpacity style={styles.stockItem}>
              <View>
                <Text style={styles.symbol}>{item.symbol}</Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <Text style={styles.price}>${item.price}</Text>
            </TouchableOpacity>
          </Link>
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
  },
});