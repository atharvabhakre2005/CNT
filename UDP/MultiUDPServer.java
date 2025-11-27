package UDP;

import java.net.*;
import java.util.*;

public class MultiUDPServer {
    public static void main(String[] args) {

        // Start Hello Server on port 5000
        new Thread(() -> startHelloServer()).start();

        // Start Calculator Server on port 6000
        new Thread(() -> startCalcServer()).start();
    }

    // ----------------------------------------
    // HELLO SERVER  (UDP Port 5000)
    // ----------------------------------------
    public static void startHelloServer() {
        try {
            DatagramSocket ds = new DatagramSocket(5000);
            System.out.println("UDP Hello Server running on port 5000...");

            byte[] receive = new byte[1024];
            DatagramPacket dp = new DatagramPacket(receive, receive.length);

            ds.receive(dp);

            String msg = new String(dp.getData(), 0, dp.getLength());
            System.out.println("Client says: " + msg);

            String reply = "Hello from UDP Server!";
            byte[] sendData = reply.getBytes();

            InetAddress ip = dp.getAddress();
            int port = dp.getPort();

            DatagramPacket dpSend = new DatagramPacket(sendData, sendData.length, ip, port);
            ds.send(dpSend);

            ds.close();
        } catch (Exception e) {
            System.out.println("Hello Server Error: " + e);
        }
    }

    // ----------------------------------------
    // CALCULATOR SERVER (UDP Port 6000)
    // ----------------------------------------
    public static void startCalcServer() {
        try {
            DatagramSocket ds = new DatagramSocket(6000);
            System.out.println("UDP Calculator Server running on port 6000...");

            byte[] receive = new byte[1024];
            DatagramPacket dp = new DatagramPacket(receive, receive.length);

            ds.receive(dp);

            String input = new String(dp.getData(), 0, dp.getLength());
            String[] parts = input.split(" ");

            String func = parts[0];
            double value = Double.parseDouble(parts[1]);
            double result = 0;

            switch (func) {
                case "sin": result = Math.sin(Math.toRadians(value)); break;
                case "cos": result = Math.cos(Math.toRadians(value)); break;
                case "tan": result = Math.tan(Math.toRadians(value)); break;
                default: result = Double.NaN;
            }

            String reply = "Result = " + result;
            byte[] send = reply.getBytes();

            InetAddress ip = dp.getAddress();
            int port = dp.getPort();

            DatagramPacket dpSend = new DatagramPacket(send, send.length, ip, port);
            ds.send(dpSend);

            ds.close();
        } catch (Exception e) {
            System.out.println("Calc Server Error: " + e);
        }
    }
}
