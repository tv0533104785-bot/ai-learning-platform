class AppException(Exception):

    status_code = 400
    error_type = "APPLICATION_ERROR"
    detail = "Application error"

    def __init__(self, detail: str | None = None):

        if detail:
            self.detail = detail

class UserAlreadyExists(AppException):

    status_code = 409
    error_type = "USER_ALREADY_EXISTS"
    detail = "User already exists"

class UserNotFound(AppException):

    status_code = 404
    error_type = "USER_NOT_FOUND"
    detail = "User not found"

class InvalidToken(AppException):

    status_code = 401
    error_type = "INVALID_TOKEN"
    detail = "Invalid token"

class AdminUnauthorized(AppException):

    status_code = 403
    error_type = "ADMIN_UNAUTHORIZED"
    detail = "Admin access required"

class CategoryNotFound(AppException):

    status_code = 404
    error_type = "CATEGORY_NOT_FOUND"
    detail = "Category not found"

class PromptNotFound(AppException):

    status_code = 404
    error_type = "PROMPT_NOT_FOUND"
    detail = "Prompt not found"