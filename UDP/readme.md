✅ README 2 — UDP PROJECT (Hello + Trigonometry Calculator)

Save this as:

README_UDP.md

📌 UDP Socket Programming – README

This project contains a merged UDP Server and merged UDP Client that perform:

Hello Message

Trigonometric Calculator (sin, cos, tan)

Both services run in parallel using threads.

🚀 Folder Structure
CNT-Exam/
 └── UDP/
      MultiUDPServer.java
      MultiUDPClient.java

🛠 How to Compile

Run from CNT-Exam directory:

javac UDP\*.java

🟦 How to Run the UDP Server

Open Terminal 1:

cd "D:\5th sem\CNT\CNT-Exam"
java UDP.MultiUDPServer


Expected output:

UDP Hello Server running on port 5000...
UDP Calculator Server running on port 6000...

🟩 How to Run the UDP Client

Open Terminal 2:

cd "D:\5th sem\CNT\CNT-Exam"
java UDP.MultiUDPClient


Client menu:

Choose UDP Operation:
1. Hello Message
2. Trigonometry Calculator

📌 Features
✔ Option 1 → UDP Hello

Client sends greeting → Server replies.

✔ Option 2 → UDP Calculator

Client sends:

sin 30
cos 45
tan 60


Server returns the calculated value.

🎉 UDP Program Successfully Runs in Two Terminals

Terminal 1 → Server

Terminal 2 → Client