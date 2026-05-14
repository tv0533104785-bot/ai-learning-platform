from pydantic import BaseModel, Field, field_validator
import re


class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=20)
    phone: str = Field(min_length=10, max_length=10)

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str):
        if not value.strip():
            raise ValueError("Name cannot be empty")
        return value

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str):
        if not re.fullmatch(r"05\d{8}", value):
            raise ValueError("Phone must be a valid Israeli mobile number.")
        return value


class LoginRequest(BaseModel):
    phone: str = Field(min_length=10, max_length=10)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str):
        if not re.fullmatch(r"05\d{8}", value):
            raise ValueError("Phone must be valid Israeli mobile number.")
        return value


class TokenResponse(BaseModel):
    access_token: str
    token_type: str