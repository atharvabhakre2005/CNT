import java.util.*;

public class DijkstraOSPF {

    static final int INF = 9999;

    public static void dijkstra(int[][] graph, int src) {

        int V = graph.length;
        int dist[] = new int[V];
        boolean visited[] = new boolean[V];

        for (int i = 0; i < V; i++) {
            dist[i] = INF;
            visited[i] = false;
        }

        dist[src] = 0;

        for (int count = 0; count < V - 1; count++) {

            int u = minDistance(dist, visited);
            visited[u] = true;

            for (int v = 0; v < V; v++) {
                if (!visited[v] &&
                    graph[u][v] != 0 &&
                    dist[u] != INF &&
                    dist[u] + graph[u][v] < dist[v]) {

                    dist[v] = dist[u] + graph[u][v];
                }
            }
        }

        printResult(dist, src);
    }

    private static int minDistance(int[] dist, boolean[] visited) {
        int min = INF, minIndex = -1;

        for (int v = 0; v < dist.length; v++) {
            if (!visited[v] && dist[v] <= min) {
                min = dist[v];
                minIndex = v;
            }
        }
        return minIndex;
    }

    private static void printResult(int[] dist, int src) {
        System.out.println("Shortest paths from Router " + src + ":");
        for (int i = 0; i < dist.length; i++) {
            System.out.println(src + " - " + i + "  Distance = " + dist[i]);
        }
    }

    public static void main(String[] args) {
        int graph[][] = {
            {0, 2, 4, 0, 0},
            {2, 0, 1, 7, 0},
            {4, 1, 0, 3, 5},
            {0, 7, 3, 0, 2},
            {0, 0, 5, 2, 0}
        };

        int sourceRouter = 0;
        dijkstra(graph, sourceRouter);
    }
}
