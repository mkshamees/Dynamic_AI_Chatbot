from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt

from app.config.settings import settings

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

print("\n========== JWT SETTINGS ==========")
print("SECRET_KEY :", repr(SECRET_KEY))
print("ALGORITHM  :", repr(ALGORITHM))
print("EXPIRE MIN :", ACCESS_TOKEN_EXPIRE_MINUTES)
print("=================================\n")


def create_access_token(data: dict):
    """
    Create JWT Access Token
    """

    to_encode = data.copy()

    now = datetime.now(timezone.utc)

    expire = now + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    print("\n========== TOKEN CREATION ==========")
    print("Current UTC Time :", now)
    print("Expiry UTC Time  :", expire)
    print("Minutes          :", ACCESS_TOKEN_EXPIRE_MINUTES)
    print("====================================")

    to_encode.update({
        "exp": expire
    })

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )

    print("\nTOKEN CREATED")
    print(token)
    print("====================================\n")

    return token


def verify_access_token(token: str):
    """
    Verify JWT Access Token
    """

    try:

        print("\n========== VERIFY TOKEN ==========")
        print("Current UTC Time :", datetime.now(timezone.utc))
        print("Received Token   :", token)

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        print("\nTOKEN VALID")
        print("Decoded Payload :", payload)
        print("==================================\n")

        return payload

    except JWTError as e:

        print("\n========== JWT ERROR ==========")
        print("Current UTC Time :", datetime.now(timezone.utc))
        print("Error            :", str(e))
        print("================================\n")

        return None