package com.xiaoniu.dataplatform.ruleengine.manager;

import java.util.List;

import com.xiaoniu.dataplatform.ruleengine.entity.WhiteList;
import com.xiaoniu.dataplatform.ruleengine.entity.WhiteListKey;

/**
 * Created by tanhui on 2016/11/9.
 */
public interface WhiteListManager {
    int saveWhiteList(WhiteList record);

    List<WhiteList> queryWhiteListByPage(String tableName, String appId, String idNum, String name, String mobile, int pageNum, int pageSize);

    Integer queryWhiteListCount(String tableName, String appId, String idNum, String name, String mobile);

	int deleteWhiteList(WhiteListKey key);
}
