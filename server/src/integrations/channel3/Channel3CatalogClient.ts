import { CATALOG_SNAPSHOT_ITEMS, CatalogProduct } from './catalogSnapshotData.js';
import { TelemetryBroadcaster } from '../../services/TelemetryBroadcaster.js';

export interface Channel3SearchOptions {
  query?: string;
  category?: string;
  limit?: number;
}

export class Channel3CatalogClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = process.env.CHANNEL3_API_KEY || 'PAYPAL-HACKATHON-2026';
    this.baseUrl = process.env.CHANNEL3_API_URL || 'https://api.channel3.ai/v1';
  }

  public async searchProducts(options: Channel3SearchOptions = {}): Promise<CatalogProduct[]> {
    const startTime = performance.now();
    const query = options.query?.toLowerCase() || '';
    const limit = options.limit || 10;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const endpoint = `${this.baseUrl}/products/search?q=${encodeURIComponent(query)}&limit=${limit}`;
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const liveData = (await response.json()) as { items: CatalogProduct[] };
        const duration = Math.round(performance.now() - startTime);

        await TelemetryBroadcaster.recordAndBroadcast({
          source: 'CHANNEL3_API',
          operation: 'SEARCH_PRODUCTS_LIVE',
          httpStatus: response.status,
          latencyMs: duration,
          requestPayload: { query, limit },
          responsePayload: { count: liveData.items?.length || 0, origin: 'LIVE_API' },
        });

        return liveData.items;
      }
    } catch {
      // Automatic Circuit Breaker: Fallback to verified local snapshot
    }

    return this.fallbackSnapshotSearch(query, limit, startTime);
  }

  private async fallbackSnapshotSearch(
    query: string,
    limit: number,
    startTime: number
  ): Promise<CatalogProduct[]> {
    const matched = CATALOG_SNAPSHOT_ITEMS.filter((item) => {
      if (!query) return true;
      return (
        item.title.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }).slice(0, limit);

    const duration = Math.round(performance.now() - startTime);

    await TelemetryBroadcaster.recordAndBroadcast({
      source: 'CHANNEL3_API',
      operation: 'SEARCH_PRODUCTS_SNAPSHOT_CACHE',
      httpStatus: 200,
      latencyMs: duration,
      requestPayload: { query, limit },
      responsePayload: { count: matched.length, origin: 'CIRCUIT_BREAKER_SNAPSHOT' },
    });

    return matched;
  }
}
