# Basic Server Setup — AWS VM

## Overview
In this module, I learned how to work with a remote cloud server.
I created an AWS EC2 virtual machine, accessed it securely using SSH,
configured the server environment, transferred files, and hosted a
simple website with HTTPS using Caddy.

---

## Cloud VM Setup
- Cloud provider: AWS Free Tier
- OS: Ubuntu 22.04 LTS
- Instance type: Free-tier eligible
- Public IP:
  3.94.95.115

---

## SSH Access
- Used SSH key-based authentication
- Connected using:
  ssh -i ~/.ssh/harsh-key.pem ubuntu@3.94.95.115

- Verified login and system information

---

## Non-root User Configuration
- Created non-root user: harsh
- Granted sudo privileges
- Copied SSH keys to new user
- Logged in as harsh for daily work

Why:
Avoid using root to improve server security.

---

## Installed Tools
Installed and verified:
- Git
- Node.js & npm
- curl
- jq
- htop

Verified using:
git --version
node -v
npm -v
curl --version
jq --version
htop --version

---

## Server Folder Structure
Created:
~/work
~/notes
~/bin

Added test file:
AWS server setup completed

---

## File Transfer
Transferred files from local machine using scp:
scp -i ~/.ssh/harsh-key.pem test-scp.txt harsh@3.94.95.115:~/work/

Verified successful transfer on server.

---

## DNS Setup
DNS provider: DuckDNS
Subdomain:
harshtiwariserver.duckdns.org

Mapped domain to server IP.
Verified using:
ping harshtiwariserver.duckdns.org
dig harshtiwariserver.duckdns.org

---

## Web Hosting with Caddy
Created simple site:
~/work/simple-site/index.html

Started HTTP server:
caddy file-server --root ~/work/simple-site --listen :8080

---

## HTTPS with Caddy
Used reverse proxy with automatic HTTPS:
sudo caddy reverse-proxy \
  --from harshtiwariserver.duckdns.org \
  --to localhost:8080

Caddy automatically obtained TLS certificates from Let’s Encrypt.

Verified using:
curl -vk https://harshtiwariserver.duckdns.org

Final output:
Welcome to Harsh Tiwari's AWS Server
HTTPS powered by Caddy

---

## Key Learnings
- How cloud VMs work
- SSH key-based authentication
- Importance of non-root users
- File transfer with scp
- DNS domain to IP mapping
- Understanding open ports
- Hosting HTTPS sites using Caddy
- Real-world debugging of TLS, DNS, and 502 errors

---

✅ Module completed successfully
