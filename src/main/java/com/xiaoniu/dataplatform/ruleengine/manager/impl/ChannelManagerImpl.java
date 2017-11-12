package com.xiaoniu.dataplatform.ruleengine.manager.impl;

import com.xiaoniu.dataplatform.ruleengine.entity.Channel;
import com.xiaoniu.dataplatform.ruleengine.manager.ChannelManager;
import com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine.ChannelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by tanhui on 2016/11/8.
 */
@Component
public class ChannelManagerImpl implements ChannelManager {

    @Autowired
    private ChannelMapper channelMapper;

    @Override
    public List<Channel> queryChannelsByAppId(String appId,int pageNum,int pageSize) {
        return channelMapper.queryChannelsByAppId(appId,pageNum,pageSize);
    }

    @Override
    public int queryChannelCount(String appId) {
        return channelMapper.queryChannelCount(appId);
    }

    @Override
    public int updateChannel(Channel channel) {
        return channelMapper.updateByPrimaryKeySelective(channel);
    }

    @Override
    public int saveChannel(Channel channel) {
        return channelMapper.insertSelective(channel);
    }
}
