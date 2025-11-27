package TCP;

import java.io.*;
import java.net.*;

public class MultiTCPServer {

    public static void main(String[] args) {

        // Start Hello Server on port 5000
        new Thread(() -> startHelloServer()).start();

        // Start File Server on port 6000
        new Thread(() -> startFileServer()).start();
    }

    // HELLO SERVER (Port 5000)
    public static void startHelloServer() {
        try {
            ServerSocket ss = new ServerSocket(5000);
            System.out.println("Hello Server running on port 5000...");

            Socket s = ss.accept();
            System.out.println("Client connected to Hello Server");

            BufferedReader br = new BufferedReader(new InputStreamReader(s.getInputStream()));
            PrintWriter pw = new PrintWriter(s.getOutputStream(), true);

            String msg = br.readLine();
            System.out.println("Client says: " + msg);

            pw.println("Hello from Server!");

            s.close();
            ss.close();
        } catch (Exception e) {
            System.out.println("Error in Hello Server: " + e);
        }
    }

    // FILE SERVER (Port 6000)
    public static void startFileServer() {
        try {
            ServerSocket ss = new ServerSocket(6000);
            System.out.println("File Server running on port 6000...");

            Socket s = ss.accept();
            System.out.println("Client connected to File Server");

            FileInputStream fis = new FileInputStream("TCP/sample.txt");
            BufferedInputStream bis = new BufferedInputStream(fis);
            OutputStream os = s.getOutputStream();

            byte[] buffer = new byte[4096];
            int bytesRead;

            while ((bytesRead = bis.read(buffer)) != -1) {
                os.write(buffer, 0, bytesRead);
            }

            os.flush();
            bis.close();
            s.close();
            ss.close();

            System.out.println("File sent successfully.");
        } catch (Exception e) {
            System.out.println("Error in File Server: " + e);
        }
    }
}
