package com.pickme.proxy;

import com.pickme.logging.Loggable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.logging.LogLevel;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
public class CachingAuthProxy {

    private static final long TTL = 10 * 60 * 1000;
    private final Map<String, CachedResponse> cache = new HashMap<>();
    private final RestTemplate restTemplate = new RestTemplate();
    private static final Logger log = LoggerFactory.getLogger(CachingAuthProxy.class);

    @Loggable(level = LogLevel.INFO, logResult = false)
    public String get(String url){
        CachedResponse cached = cache.get(url);
        long now = System.currentTimeMillis();

        if(cached != null) {
            long age = now - cached.timestamp();
            if (age < TTL) {
                log.info("[Cache]: Used cached response for url: {}", url);
                return cached.response();
            } else {
                log.info("[Cache]: Expired. Fetching fresh data: {}", url);
            }
        } else {
            log.info("[Cache]: No cache. Fetching data: {}", url);
        }

        String response = restTemplate.getForObject(url, String.class);
        cache.put(url, new CachedResponse(response, now));
        log.info("From the Google API: {}", url);
        return response;
    }

    private record CachedResponse(String response, long timestamp) {}

    public void clearCache() {
        cache.clear();
        log.info("[Cache]: Cache cleared");
    }
}
