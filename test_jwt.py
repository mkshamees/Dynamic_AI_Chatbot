from backend.app.auth.jwt_handler import (
    create_access_token,
    verify_access_token,
)

token = create_access_token(
    {
        "sub": "student@example.com"
    }
)

print("Generated Token:")
print(token)

print("\nDecoded Payload:")
print(
    verify_access_token(
        token + "abc"
    )
)