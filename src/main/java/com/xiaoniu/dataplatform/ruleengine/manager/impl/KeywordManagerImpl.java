package com.xiaoniu.dataplatform.ruleengine.manager.impl;


import com.xiaoniu.dataplatform.ruleengine.entity.Keyword;
import com.xiaoniu.dataplatform.ruleengine.manager.KeywordManager;
import com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine.KeywordMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 关键字仓储层
 * Created by tanhui on 2016/11/8.
 */
@Component
public class KeywordManagerImpl implements KeywordManager{

    @Autowired
    private KeywordMapper keywordMapper;


    @Override
    public List<Keyword> queryKeywordsByPage(String appId, String type, String keyword, int pageNum, int pageSize) {
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("appId",appId);
        map.put("type",type);
        map.put("keyword",keyword);
        map.put("pageNum",pageNum);
        map.put("pageSize",pageSize);
        return keywordMapper.queryKeywordsByPage(map);
    }

    @Override
    public Integer queryKeywordsCount(String appId, String type, String keyword) {
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("appId",appId);
        map.put("type",type);
        map.put("keyword",keyword);
        return keywordMapper.queryKeywordsCount(map);
    }

    @Override
    public int updateKeyword(Keyword keyword) {
        return keywordMapper.updateByPrimaryKeySelective(keyword);
    }

    @Override
    public int addKeyword(Keyword keyword) {
        return keywordMapper.insertSelective(keyword);
    }

    @Override
    public int deleteKeyword(Integer fAutoId) {
        return keywordMapper.deleteByPrimaryKey(fAutoId);
    }
}
