package TCP;

import java.io.*;
import java.net.*;
import java.util.Scanner;

public class MultiTCPClient {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Choose an option:");
        System.out.println("1. Hello Message");
        System.out.println("2. File Transfer");
        System.out.print("Enter choice: ");
        int choice = sc.nextInt();

        if (choice == 1) {
            startHelloClient();
        } else if (choice == 2) {
            startFileClient();
        } else {
            System.out.println("Invalid choice");
        }

        sc.close();
    }

    // HELLO CLIENT  
    public static void startHelloClient() {
        try {
            Socket s = new Socket("localhost", 5000);

            PrintWriter pw = new PrintWriter(s.getOutputStream(), true);
            BufferedReader br = new BufferedReader(new InputStreamReader(s.getInputStream()));

            pw.println("Hello from Client!");
            String reply = br.readLine();

            System.out.println("Server says: " + reply);

            s.close();
        } catch (Exception e) {
            System.out.println("Error in Hello Client: " + e);
        }
    }

    // FILE CLIENT
    public static void startFileClient() {
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
            System.out.println("Error in File Client: " + e);
        }
    }
}
