package com.xiaoniu.dataplatform.ruleengine.manager;

import com.xiaoniu.dataplatform.ruleengine.entity.OperateLog;

import java.util.List;

/**
 * Created by tanhui on 2016/11/16.
 */
public interface OperateLogManager {

    List<OperateLog> queryOperateLogsByPage(String appId, String module, String operator, int pageNum, int pageSize);

    Integer queryOperateLogsCount(String appId, String module, String operator);

    int saveOperateLog(OperateLog record);
}
