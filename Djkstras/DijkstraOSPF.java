package Djkstras;

import java.util.*;

public class DijkstraOSPF {

    static final int INF = 9999;

    public static void dijkstra(int[][] graph, int src) {

        int V = graph.length;

        // Distance array (initially infinity)
        int[] dist = new int[V];
        Arrays.fill(dist, INF);

        // Min-heap storing {distance, node}
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);

        // Distance of source = 0
        dist[src] = 0;
        pq.add(new int[] { 0, src });

        boolean[] visited = new boolean[V];

        while (!pq.isEmpty()) {

            // Extract node with minimum distance
            int[] cur = pq.poll();
            int d = cur[0];
            int u = cur[1];

            // Skip if already visited (outdated entry)
            if (visited[u])
                continue;
            visited[u] = true;

            // Check all neighbors in adjacency matrix
            for (int v = 0; v < V; v++) {

                // If edge exists and relaxation possible
                if (graph[u][v] != 0 && d + graph[u][v] < dist[v]) {

                    dist[v] = d + graph[u][v];

                    // Push new distance into heap
                    pq.add(new int[] { dist[v], v });
                }
            }
        }

        printResult(dist, src);
    }

    private static void printResult(int[] dist, int src) {
        System.out.println("Shortest paths from Router " + src + ":");
        for (int i = 0; i < dist.length; i++) {
            System.out.println(src + " -> " + i + "  Distance = " + dist[i]);
        }
    }

    public static void main(String[] args) {

        int graph[][] = {
                { 0, 2, 4, 0, 0 },
                { 2, 0, 1, 7, 0 },
                { 4, 1, 0, 3, 5 },
                { 0, 7, 3, 0, 2 },
                { 0, 0, 5, 2, 0 }
        };

        int sourceRouter = 0;
        dijkstra(graph, sourceRouter);
    }
}
