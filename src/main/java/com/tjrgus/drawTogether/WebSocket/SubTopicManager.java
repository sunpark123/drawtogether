package com.tjrgus.drawTogether.WebSocket;

import com.tjrgus.drawTogether.Controller.ChatController;
import com.tjrgus.drawTogether.Service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.nio.file.Paths;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

@Component
public class SubTopicManager {

    @Autowired
    private ChatService chatService;

    // key: 토픽, value: 세션ID Set
    private final ConcurrentHashMap<String, CopyOnWriteArraySet<String>> subscriptions = new ConcurrentHashMap<>();

    // 구독 추가
    public void addSubscription(String topic, String sessionId) {
        subscriptions.computeIfAbsent(topic, k -> new CopyOnWriteArraySet<>()).add(sessionId);
    }

    // 구독 제거
    public void removeSubscription(String topic, String sessionId) {
        CopyOnWriteArraySet<String> set = subscriptions.get(topic);
        if (set != null) {
            set.remove(sessionId);
            if (set.isEmpty()) {
                subscriptions.remove(topic);
                String lastPart = Paths.get(topic).getFileName().toString();
                chatService.removeLists(lastPart);
            }
        }
    }

    // 특정 토픽 현재 구독자 수 확인
    public int getSubscriberCount(String topic) {
        CopyOnWriteArraySet<String> set = subscriptions.get(topic);
        return set == null ? 0 : set.size();
    }
    public Set<String> getAllTopics() {
        return subscriptions.keySet();
    }

}
