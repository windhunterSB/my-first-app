import uuid
from fastapi import FastAPI
from pydantic import BaseModel
# 👇 1. 引入 CORS 中间件
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 👇 2. 配置 CORS
# 这段代码告诉服务器："允许任何人(origins=['*'])用任何方法(methods=['*'])来访问我"
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 在生产环境中，这里应该填具体的前端域名
    allow_credentials=True,
    allow_methods=["*"],  # 允许 GET, POST, OPTIONS 等所有方法
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    email: str

@app.post("/api/login")
async def login(request: LoginRequest):
    print(f"收到前端登录请求: {request.email}")
    
    mock_uuid = f"server_{uuid.uuid4()}"
    
    return {
        "msg": "Login successful",
        "user": {
            "email": request.email,
            "uuid": mock_uuid
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


# 启动命令提示：
# cd ./backend
# uvicorn main:app --reload --host 0.0.0.0 --port 8000
# or
# python main.py