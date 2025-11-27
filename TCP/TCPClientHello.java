package TCP;

import java.io.*;
import java.net.*;

public class TCPClientHello {
    public static void main(String[] args) {
        try {
            Socket s = new Socket("localhost", 5000);

            BufferedReader br = new BufferedReader(
                    new InputStreamReader(s.getInputStream()));

            PrintWriter pw = new PrintWriter(s.getOutputStream(), true);

            pw.println("Hello from Client!");

            String reply = br.readLine();
            System.out.println("Server says: " + reply);

            s.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
