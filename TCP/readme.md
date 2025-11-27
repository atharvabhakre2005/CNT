✅ README 1 — TCP PROJECT (Hello + File Transfer)

Save this as:

README_TCP.md

📌 TCP Socket Programming – README

This project contains a merged TCP Server and merged TCP Client that perform:

Hello Message Communication

File Transfer

Both services run simultaneously using multithreading.

🚀 Folder Structure
CNT-Exam/
 └── TCP/
      MultiTCPServer.java
      MultiTCPClient.java
      sample.txt


sample.txt → File to be sent from server to client

received.txt → File received by client

🛠 How to Compile

Open terminal in the CNT-Exam folder:

javac TCP\*.java

🟦 How to Run the TCP Server

Open Terminal 1:

cd "D:\5th sem\CNT\CNT-Exam"
java TCP.MultiTCPServer


Expected output:

Hello Server running on port 5000...
File Server running on port 6000...

🟩 How to Run the TCP Client

Open Terminal 2:

cd "D:\5th sem\CNT\CNT-Exam"
java TCP.MultiTCPClient


Client menu:

Choose an option:
1. Hello Message
2. File Transfer
Enter choice:

📌 Features
✔ Option 1 → TCP Hello Message

Client ↔ Server exchange simple text messages.

✔ Option 2 → TCP File Transfer

Server sends sample.txt → Client receives received.txt.

🎉 TCP Program Successfully Runs in Two Terminals

Terminal 1 → Server

Terminal 2 → Client