package com.xiaoniu.dataplatform.ruleengine.manager;

import com.xiaoniu.dataplatform.ruleengine.entity.RawData;

import java.util.List;

/**
 * Created by tanhui on 2016/11/10.
 */
public interface RawDataManager {
    List<RawData> queryRawDatasByPage(String tableName, String appId, String reqId, String ruleId, String interfaceName, int pageNum, int pageSize);

    Integer queryRawDatasCount(String tableName, String appId, String reqId, String ruleId, String interfaceName);
}
