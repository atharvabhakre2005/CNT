package TCP;

import java.io.*;
import java.net.*;

public class TCPFileClient {
    public static void main(String[] args) {
        try {
            Socket s = new Socket("localhost", 6000);

            InputStream is = s.getInputStream();
            FileOutputStream fos = new FileOutputStream("received.txt");
            BufferedOutputStream bos = new BufferedOutputStream(fos);

            byte[] buffer = new byte[4096];
            int bytesRead;

            while ((bytesRead = is.read(buffer)) != -1) {
                bos.write(buffer, 0, bytesRead);
            }

            bos.flush();
            bos.close();
            s.close();

            System.out.println("File received successfully.");
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}

