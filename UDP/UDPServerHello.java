package UDP;

import java.net.*;

public class UDPServerHello {
    public static void main(String[] args) {
        try {
            DatagramSocket ds = new DatagramSocket(5000);
            byte[] receive = new byte[1024];

            DatagramPacket dp = new DatagramPacket(receive, receive.length);
            System.out.println("Server waiting...");

            ds.receive(dp);

            String msg = new String(dp.getData(), 0, dp.getLength());
            System.out.println("Client says: " + msg);

            String reply = "Hello from Server!";
            byte[] sendData = reply.getBytes();

            InetAddress ip = dp.getAddress();
            int port = dp.getPort();

            DatagramPacket dpSend = new DatagramPacket(sendData, sendData.length, ip, port);
            ds.send(dpSend);

            ds.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}

