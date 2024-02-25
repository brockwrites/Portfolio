# File: crypto_demo.py
import hashlib
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP

def hash_message(message):
    # Using SHA-256 for hashing
    hashed_message = hashlib.sha256(message.encode()).hexdigest()
    return hashed_message

def generate_key_pair():
    # Generating an RSA key pair
    key = RSA.generate(2048)
    private_key = key.export_key()
    public_key = key.publickey().export_key()
    return private_key, public_key

def encrypt_message(message, public_key):
    # Encrypting a message using RSA public key
    key = RSA.import_key(public_key)
    cipher = PKCS1_OAEP.new(key)
    encrypted_message = cipher.encrypt(message.encode())
    return encrypted_message

def decrypt_message(encrypted_message, private_key):
    # Decrypting a message using RSA private key
    key = RSA.import_key(private_key)
    cipher = PKCS1_OAEP.new(key)
    decrypted_message = cipher.decrypt(encrypted_message).decode()
    return decrypted_message

def main():
    # Example message to be hashed and encrypted
    message_to_hash = "Hello, cryptography!"
    private_key, public_key = generate_key_pair()

    # Hash the message
    hashed_message = hash_message(message_to_hash)

    # Encrypt the hashed message using RSA public key
    encrypted_message = encrypt_message(hashed_message, public_key)

    # Decrypt the message using RSA private key
    decrypted_message = decrypt_message(encrypted_message, private_key)

    # Display the results
    print(f"Original Message: {message_to_hash}")
    print(f"Hashed Message: {hashed_message}")
    print(f"Encrypted Message: {encrypted_message}")
    print(f"Decrypted Message: {decrypted_message}")

if __name__ == "__main__":
    main()
