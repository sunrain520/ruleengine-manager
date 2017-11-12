package com.xiaoniu.dataplatform.ruleengine.manager;

import com.xiaoniu.dataplatform.ruleengine.entity.Keyword;

import java.util.List;

/**
 * Created by tanhui on 2016/11/3.
 */
public interface KeywordManager {

    List<Keyword> queryKeywordsByPage(String appId,String type, String keyword, int pageNum, int pageSize);

    Integer queryKeywordsCount(String appId,String type, String keyword);

    int updateKeyword(Keyword keyword);

    int addKeyword(Keyword keyword);

    int deleteKeyword(Integer fAutoId);
}
