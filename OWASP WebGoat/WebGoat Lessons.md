_Helpful Tools:_ https://savesubs.com/
## Broken Access Control
These lessons pertain to web app (AppSec) access failures.
### A1: Hijack a session
[Video 1](https://www.youtube.com/watch?v=YO8rsCMVUyY) & [Video 2](https://www.youtube.com/watch?v=R5YPRhM5GyE)
Hijack a session by guessing the session cookie. Demonstrates using ***Burp > Sequencer*** tool to capture tokens and find anomalies. Also demonstrates using ***Burp > Intruder*** tool to find the login request and test different tokens.
### A1: Insecure Direct Object References  
[Video 1](https://www.youtube.com/watch?v=8fMFLqbd0-Y) & [Walkthrough](https://hackmd.io/@DaLaw2/ByD70wAM2#Insecure-Direct-Object-References)
Covers authenticating as a regular user, but then gaining access to data from other user accounts. Uses Burp Repeater, Proxy, & Intruder (with 'numbers' payload).
### A1: Missing Function Level Access Control
[Video 1](https://www.youtube.com/watch?v=C-MTbhfXbgg) Page HTML (viewed in Chrome DevTools, for example) could hide elements that make a web app susceptible to hacking. These elements might be links to administrative functions. By modifying requests (Burp Repeater) and revising based on responses, you can gather useful information for hacking.
### A1: Spoofing an Authentication Cookie
[Video](https://www.youtube.com/watch?v=-n4OmhUN3vA) Like previous lessons, this one requires intercepting a login request. In Burp Suite, we send this login request to "Repeater" and find an authentication cookie. On review, we see the cookie is Base64 encoded. So, we run it through a Base64 decoder, which reveals hex values. We decode the hex values to find the username, spelled backwards. We then encode our own username, create a cookie value, and use "Repeater" to authenticate.
## Crytographic Failures
[Video](https://www.youtube.com/watch?v=9lQJa4zHRYM&t=626s)
This section covers encoding, hashing, encryption, digital signing, keystores, security defaults, and post-quantum crypto. That's a lot!
### A2: Crypto Basics
**Base64:** Base64 encoding is not cryptography, but it has similarities with cryptography. The first assignment is to decode a Base64 encoded string used for Basic authentication. Next, this lesson considers other types of encoding: URL encoding (e.g., replacing spaces with "%20"), HTML encoding, UUEncode, XOR encoding. Hashing is discussed, as a means for identifying data alteration.

**Hashing:** Hashing is irreversible and used for data integrity. It is not to be used for passwords, as the hashes themselves can be stored in a dictionary that cross-references the plain-text origin of the hash. Salted hashes can be more effective for this purpose, as random characters are added, making it difficult for an attacker to have a complete dictionary to cross-reference. For reference: SHA256 hashes are longer than MD5. MD5 produces a 128-bit output, and SHA256 produces a 256-bit output.

**Symmetric & Asymmetric Encryption:** Asymmetric encryption uses a pair of public and private keys for data encryption and decryption, where the public key is widely shared, but only the private key can decrypt messages. Symmetric encryption, on the other hand, uses a single shared key for both encryption and decryption, and this key must be kept confidential between the communicating parties.

**HTTPS:** HTTPS uses both symmetric and asymmetric keys. It leverages an asymmetric key exchange process so that a symmetric key can be shared between browser and webserver.

**Determine a Signature from a Private Key:** WebGoat wants us to determine the modulus of an RSA key as a hex string, and then calculate a signature for that hex string using the key. For this exercise, I spin up a Linux virtual maching to create a BASH script to determine the values.

**What is a Keystore? What is a Truststore?** Truststore is used for the storage of certificates from the trusted Certificate Authority (CA), which is used in the verification of the certificate provided by the server in an SSL connection. A Keystore is used to store the private key and own identity certificate to be identified for verification.
