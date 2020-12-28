To run the application, all you need to do is
1. docker run -p 3306:3306 --name shift-mysql-8 -d  isagarmandakki/shift-mysql:1.1
 (Wait for a few seconds until the mysql db starts fully. ~15 seconds)
2. docker run -p 3000:3000 -p 3001:3001 -d isagarmandakki/shift-mbti
3. Open localhost:3000

All test cases pass!

Description:
- This is a create-react-app application
- Also contains express server
- React app runs on 3000 port and express server runs on 3001 port. Both these servers run on the same container (Ideally each should have its own).
- The database has a separate container. The express server connects to this using internal docker link itself. Note: We need to run these images on the same machine.
- Please DM for any clarifications.
