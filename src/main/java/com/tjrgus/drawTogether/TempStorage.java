package com.tjrgus.drawTogether;

import com.tjrgus.drawTogether.DTO.DrawMessageDTO;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Repository
public class TempStorage {

    private final Map<String, List<DrawMessageDTO>> storage = new ConcurrentHashMap<>();

    // 데이터 저장
    public void save(String key, DrawMessageDTO value) {
        List<DrawMessageDTO> news = this.find(key);
        if(news != null)
        {
            news.add(value);
            storage.put(key, news);
        }
        else{
            this.make(key,value);
        }
    }
    public void make(String key, DrawMessageDTO value){
        List<DrawMessageDTO> news = new ArrayList<DrawMessageDTO>();
        news.add(value);
        storage.put(key, news);
    }
    // 데이터 조회
    public List<DrawMessageDTO> find(String key) {
        return storage.get(key);
    }
    //데이터 존재유무
    public boolean exists(String key) {
        return storage.containsKey(key);
    }
    // 데이터 삭제
    public void remove(String key) {
        storage.remove(key);
    }

    // 전체 초기화
    public void clear() {
        storage.clear();
    }
}
