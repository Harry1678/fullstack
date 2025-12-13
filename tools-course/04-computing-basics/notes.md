Computing Basics Notes
1. Users & Identity

. whoami → shows current user

. echo $HOME → shows home directory

. Helps understand permissions and ownership

2. Processes

 .ps aux → lists all running processes

. ps aux | grep python → filters processes

. A process = a running program on the system

3. File Permissions

. ls -l → view permissions (r, w, x)

. chmod +x file → make executable

.chmod -x file → remove execute permission

4. Shell Script Basics

. touch hello.sh → create file

. Add script using nano

. chmod +x hello.sh → make executable

./hello.sh → run script

5. Starting a Local Server

. python3 -m http.server 8000

. Server listens on a port
 
. Open in browser: http://localhost:8000

6.Finding & Killing Processes

. lsof -i :8000 → find which process uses port

. kill <pid> → stop that process

. Fixes “address already in use” errors

7. Port Conflict Example

. Starting server on used port → error

. Find PID using lsof

. Kill process

. Restart server successfully

8. Mini Server Investigation

. Start server on port 5000

. Find PID & user

. Test in browser

. Kill it

. Restart on 7000

9. Why sudo is Dangerous

. Gives root-level access

. Wrong command can break OS

. Use only when required
