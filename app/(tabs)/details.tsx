import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router'; // 用于配置顶部导航栏标题

// 引入我们刚才定义的类型 (虽然这里暂时只用假数据，但保持好习惯)
import { StockNote } from '@/constants/types';

export default function DetailsScreen() {
  const { symbol } = useLocalSearchParams();
  
  // --- 状态管理 (React Hooks) ---
  // 这类似于 C++ 类中的成员变量，但改变它们会触发界面“重绘”
  
  // 1. 笔记输入框的内容
  const [inputText, setInputText] = useState('');
  
  // 2. 笔记列表数据 (暂时存在本地内存中)
  const [notes, setNotes] = useState<StockNote[]>([]);

  // --- 逻辑函数 ---
  
  // 添加笔记的函数
  const handleAddNote = () => {
    if (!inputText.trim()) return; // 如果是空的就不处理

    const newNote: StockNote = {
      id: Date.now().toString(), // 用时间戳做临时 ID
      date: new Date().toLocaleDateString(),
      content: inputText,
    };

    // 更新笔记列表：创建一个新数组，包含旧笔记 + 新笔记
    setNotes([newNote, ...notes]); 
    setInputText(''); // 清空输入框
  };

  return (
    <>
      {/* 动态设置页面标题 */}
      <Stack.Screen options={{ title: symbol as string }} />

      <ScrollView style={styles.container}>
        {/* === 板块 1: GPT 智能分析 === */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🤖 GPT 智能分析</Text>
          <View style={styles.aiCard}>
            <Text style={styles.aiText}>
              这里将显示 GPT 对 {symbol} 过去几个月的走势分析和重大事件总结。
              (目前尚未接入 API，这是占位文字)
            </Text>
          </View>
        </View>

        {/* === 板块 2: 我的复盘笔记 === */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 我的复盘笔记</Text>
          
          {/* 输入区域 */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="记录当下的交易想法..."
              value={inputText}
              onChangeText={setInputText} // 当文字改变时，更新 inputText 变量
              multiline
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
              <Text style={styles.addButtonText}>记录</Text>
            </TouchableOpacity>
          </View>

          {/* 笔记列表展示区域 */}
          <View style={styles.notesList}>
            {notes.length === 0 ? (
              <Text style={styles.emptyText}>暂无笔记，写点什么吧...</Text>
            ) : (
              notes.map((note) => (
                <View key={note.id} style={styles.noteItem}>
                  <Text style={styles.noteDate}>{note.date}</Text>
                  <Text style={styles.noteContent}>{note.content}</Text>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

// 样式定义
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  // AI 卡片样式
  aiCard: {
    backgroundColor: '#e3f2fd', // 浅蓝色背景
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  aiText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#0d47a1',
  },
  // 笔记输入区样式
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 50,
  },
  addButton: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // 笔记列表样式
  notesList: {
    gap: 10,
  },
  noteItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF', // 左侧加个蓝条装饰
  },
  noteDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  noteContent: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});