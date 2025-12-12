# Server Process Basics — Mini Investigation

## 1. Start a Simple Server
I started a Python HTTP server on port 5000:


The terminal showed that the server was running and listening on port 5000.

---

## 2. Find the Process Information
In another terminal, I checked which process was using port 5000:

lsof -i :5000


This showed:
- The **PID** (process ID)
- The **command** (python3)
- The **user** running it (harsh)

Example output:

python3 4123 harsh 3u IPv4 TCP *:5000 (LISTEN)


---

## 3. Verify the Server in the Browser
I opened:

http://localhost:5000


The page loaded successfully, confirming the server was running.

---

## 4. Stop the Server
To stop the server, I used:kill <PID>

After stopping it: i used lsof -i :5000


returned no output, meaning the port was free.

---

## 5. Restart on a New Port (7000)
I then started a server on a new port:
python3 -m http.server 7000


Testing in the browser: http://localhost:7000


The server responded correctly on the new port.

---

## Summary — What I Learned
- How to check which process is running using ps and lsof 
- How to identify what is using a port 
- How to kill a running process 
- How to start and restart servers 
- Why ports matter in real world applications like Node, Docker, FastAPI 
- Understanding how processes behave and how to manage them 









