package UDP;

import java.net.*;

public class UDPClientHello {
    public static void main(String[] args) {
        try {
            DatagramSocket ds = new DatagramSocket();
            InetAddress ip = InetAddress.getByName("localhost");

            String msg = "Hello from Client!";
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
            System.out.println(e);
        }
    }
}

