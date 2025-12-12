from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

# 定义枚举，让数据更规范
class ExperienceLevel(str, Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    EXPERT = "expert"

class UserProfile(BaseModel):
    # --- 基础信息 ---
    nickname: str
    email: str
    # 存哈希后的密码，千万别存明文！
    hashed_password: str 
    
    # --- 画像标签 ---
    gender: Optional[str] = None
    age_group: Optional[str] = None
    persona_tags: List[str] = []  # 例如 ["稳健", "科技迷"]
    
    # --- 投资偏好 (AI 分析的核心参数) ---
    investment_goal: Optional[str] = None       # 投资动机
    target_return_rate: Optional[float] = None  # 年化目标 (0.2 = 20%)
    max_drawdown_tolerance: Optional[float] = None # 最大回撤容忍度
    
    investment_horizon: Optional[str] = "medium_term" # 投资期限
    experience_level: ExperienceLevel = ExperienceLevel.BEGINNER # 经验等级

    # --- 系统字段 ---
    is_active: bool = True
