package UDP;
import java.net.*;
import java.util.*;

public class UDPServerCalc {
    public static void main(String[] args) {
        try {
            DatagramSocket ds = new DatagramSocket(6000);
            byte[] receive = new byte[1024];

            System.out.println("Trig Calculator Server Running...");

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
            System.out.println(e);
        }
    }
}
