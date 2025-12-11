import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // 1. 引入工具

export default function DetailsScreen() {
  // 2. 获取上一页传过来的 symbol 参数
  const { symbol } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {/* 3. 动态显示股票代码 */}
      <Text style={styles.title}>{symbol} 详情页</Text>
      <Text style={styles.subtitle}>
        我们正在查看 {symbol} 的数据
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
});