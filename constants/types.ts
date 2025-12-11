// constants/types.ts

// 类似于 C++ 的 struct 定义
export interface StockNote {
    id: string;
    date: string;
    content: string;
  }
  
  export interface Stock {
    id: string;
    symbol: string;
    name: string;
    price: string;
    //这是我们新增的字段，用于存储 GPT 分析和用户笔记
    aiAnalysis?: string; // "?" 表示这个字段是可选的 (Optional)
    userNotes?: StockNote[]; 
  }