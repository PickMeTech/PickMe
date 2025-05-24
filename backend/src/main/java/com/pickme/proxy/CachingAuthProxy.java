package com.pickme.proxy;

import com.pickme.logging.Loggable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.logging.LogLevel;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class CachingAuthProxy {

    private static final long TTL = 10 * 60 * 1000;
    private final Map<String, CachedResponse> cache = new ConcurrentHashMap<>();
    private final RestTemplate restTemplate = new RestTemplate();
    private static final Logger log = LoggerFactory.getLogger(CachingAuthProxy.class);

    @Loggable(level = LogLevel.INFO, logResult = false)
    public String get(String url){
        long now = System.currentTimeMillis();
        return getCachedOrFetch(url, now);
    }

    private String getCachedOrFetch(String url, long now){
        CachedResponse cached = cache.get(url);
        if (isValid(cached, now)){
            log.info("[Cache]: Used cached response for url: {}", url);
            return cached.response();
        }

        log.info("[Cache]: {}. Fetching fresh data: {}",
                (cached == null ? "No cache" : "Expired"), url);

        String freshResponse = restTemplate.getForObject(url, String.class);
        cache.put(url, new CachedResponse(freshResponse, now));

        log.info("[Proxy]: From the Google API: {}", url);
        return freshResponse;
    }

    private boolean isValid(CachedResponse cached, long now){
        if (cached == null) {
            return false;
        }
        long age = now - cached.timestamp();
        return age < TTL;
    }

    private record CachedResponse(String response, long timestamp) {}

    @Scheduled(fixedRate = TTL)
    public void removeExpiredCache(){
        long now = System.currentTimeMillis();
        AtomicInteger removedCount = new AtomicInteger(0);
        int initialSize = cache.size();

        cache.entrySet().removeIf(entry -> {
            CachedResponse cached = entry.getValue();
            long age = now - cached.timestamp();
            boolean isExpired = age >= TTL;
            if (isExpired) {
                log.info("[Cache]: Expired cache removed for url: {}", entry.getKey());
                removedCount.incrementAndGet();
            }
            return isExpired;
        });

        int finalSize = cache.size();
        log.info("[Cache]: Cleanup done. Removed: {}, before: {}, after: {}", removedCount.get(), initialSize, finalSize);
    }
}
