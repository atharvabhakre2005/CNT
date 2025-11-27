package UDP;

import java.net.*;
import java.util.*;

public class UDPClientCalc {
    public static void main(String[] args) {
        try {
            DatagramSocket ds = new DatagramSocket();
            InetAddress ip = InetAddress.getByName("localhost");

            Scanner sc = new Scanner(System.in);
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
            System.out.println(e);
        }
    }
}

