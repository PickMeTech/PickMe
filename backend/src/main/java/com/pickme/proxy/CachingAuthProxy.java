package com.pickme.proxy;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
public class CachingAuthProxy {

    private static final long TTL = 10 * 60 * 1000;
    private final Map<String, CachedResponse> cache = new HashMap<>();
    private final RestTemplate restTemplate = new RestTemplate();

    public String get(String url){
        CachedResponse cached = cache.get(url);
        long now = System.currentTimeMillis();

        if(cached != null && (now - cached.timestamp()) < TTL){
            System.out.println("From the cache: " + url);
            return cached.response;
        }

        String response = restTemplate.getForObject(url, String.class);
        cache.put(url, new CachedResponse(response, now));
        System.out.println("From the Google API: " + url);
        return response;
    }

    private record CachedResponse(String response, long timestamp) {}
}
