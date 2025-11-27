package UDP;

import java.net.*;
import java.util.*;

public class MultiUDPClient {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Choose UDP Operation:");
        System.out.println("1. Hello Message");
        System.out.println("2. Trigonometry Calculator");
        System.out.print("Enter choice: ");
        int choice = sc.nextInt();

        if (choice == 1) {
            startHelloClient();
        } else if (choice == 2) {
            startCalcClient();
        } else {
            System.out.println("Invalid choice.");
        }
    }

    // ----------------------------------------
    // HELLO CLIENT (UDP)
    // ----------------------------------------
    public static void startHelloClient() {
        try {
            DatagramSocket ds = new DatagramSocket();
            InetAddress ip = InetAddress.getByName("localhost");

            String msg = "Hello from UDP Client!";
            byte[] sendData = msg.getBytes();

            DatagramPacket dp = new DatagramPacket(sendData, sendData.length, ip, 5000);
            ds.send(dp);

            byte[] receive = new byte[1024];
            DatagramPacket dpReceive = new DatagramPacket(receive, receive.length);

            ds.receive(dpReceive);

            String reply = new String(dpReceive.getData(), 0, dpReceive.getLength());
            System.out.println("Server says: " + reply);

            ds.close();
        } catch (Exception e) {
            System.out.println("Hello Client Error: " + e);
        }
    }

    // ----------------------------------------
    // CALCULATOR CLIENT (UDP)
    // ----------------------------------------
    public static void startCalcClient() {
        try {
            Scanner sc = new Scanner(System.in);

            DatagramSocket ds = new DatagramSocket();
            InetAddress ip = InetAddress.getByName("localhost");

            System.out.print("Enter function (sin/cos/tan): ");
            String func = sc.next();
            System.out.print("Enter angle in degrees: ");
            String angle = sc.next();

            String msg = func + " " + angle;
            byte[] send = msg.getBytes();

            DatagramPacket dp = new DatagramPacket(send, send.length, ip, 6000);
            ds.send(dp);

            byte[] receive = new byte[1024];
            DatagramPacket dpReceive = new DatagramPacket(receive, receive.length);

            ds.receive(dpReceive);

            String reply = new String(dpReceive.getData(), 0, dpReceive.getLength());
            System.out.println(reply);

            ds.close();
        } catch (Exception e) {
            System.out.println("Calc Client Error: " + e);
        }
    }
}
