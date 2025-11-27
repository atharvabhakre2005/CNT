package TCP;

import java.io.*;
import java.net.*;

public class TCPFileServer {
    public static void main(String[] args) {
        try {
            ServerSocket ss = new ServerSocket(6000);
            System.out.println("Server ready...");

            Socket s = ss.accept();
            System.out.println("Client connected!");

            FileInputStream fis = new FileInputStream("sample.txt");
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
            System.out.println(e);
        }
    }
}
