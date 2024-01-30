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
### A2: Cryptographic Failures: Crypto Basics
**Base64:** Bas64 encoding is not cryptography, but it has similarities with cryptography. The first assignment is to decode a Base64 encoded string used for Basic authentication. Next, this lesson considers other types of encoding: URL encoding (e.g., replacing spaces with "%20"), HTML encoding, UUEncode, XOR encoding. Hashing is discussed, as a means for identifying data alteration.
