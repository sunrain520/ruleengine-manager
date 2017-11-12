package com.xiaoniu.dataplatform.ruleengine.manager;

import com.xiaoniu.dataplatform.ruleengine.entity.Channel;

import java.util.List;

/**
 * Created by tanhui on 2016/11/8.
 */
public interface ChannelManager {
    List<Channel> queryChannelsByAppId(String appId,int pageNum,int pageSize);

    int queryChannelCount(String appId);

    int updateChannel(Channel channel);

    int saveChannel(Channel channel);
}
