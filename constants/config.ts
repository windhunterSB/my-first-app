// constants/config.ts

// 1. 定义你的环境配置
const ENV = {
    dev: {
      // 这里的 IP 记得换成你电脑的局域网 IP (真机调试) 或 10.0.2.2 (Android 模拟器)
      apiUrl: 'http://192.168.1.2:8000', 
    },
    prod: {
      // 暂时先留空，或者填一个占位符，等腾讯云部署好了再填
      apiUrl: 'https://api.your-tencent-cloud-app.com',
    },
  };
  
  // 2. 一个巧妙的“手动开关”
  // 默认为 __DEV__。如果你想在开发模式下临时测试生产环境接口，只需改为 false
  const USE_LOCAL_SERVER = true; 
  
  // 3. 导出最终的配置对象
  export const Config = {
    API_URL: USE_LOCAL_SERVER ? ENV.dev.apiUrl : ENV.prod.apiUrl,
  };
