from enum import Enum
from functools import lru_cache
from pydantic import Field
from pydantic_settings import BaseSettings


class EnvironmentEnum(str, Enum):
    DEVELOPMENT = "DEVELOPMENT"
    PRODUCTION = "PRODUCTION"


class Settings(BaseSettings):
    # Environment settings
    DEBUG: bool = Field(
        default=False, validation_alias="DEBUG", alias_priority=2)
    RELOAD: bool = Field(
        default=False, validation_alias="RELOAD", alias_priority=2)
    ENVIRONMENT: str = Field(default=EnvironmentEnum.DEVELOPMENT,
                             validation_alias="ENVIRONMENT", alias_priority=2)

    # POSTGRES DATABASE
    POSTGRES_USER: str = Field(
        default="", validation_alias="POSTGRES_USER", alias_priority=2)
    POSTGRES_PASSWORD: str = Field(
        default="", validation_alias="POSTGRES_PASSWORD", alias_priority=2)
    POSTGRES_HOST: str = Field(
        default="", validation_alias="POSTGRES_HOST", alias_priority=2)
    POSTGRES_PORT: str = Field(
        default="", validation_alias="POSTGRES_PORT", alias_priority=2)
    POSTGRES_DB: str = Field(
        default="", validation_alias="POSTGRES_DB", alias_priority=2)

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"


@lru_cache
def get_settings():
    return Settings()
