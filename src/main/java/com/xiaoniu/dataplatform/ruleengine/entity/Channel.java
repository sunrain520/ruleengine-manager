package com.xiaoniu.dataplatform.ruleengine.entity;

import java.util.Date;

public class Channel {
    private Integer fAutoId;

    private String fAppId;

    private String fChannelName;

    private String fChannelId;

    private Double fCoefficient;

    private Date fCreateTime;

    private String fCreateUser;

    private Date fUpdateTime;

    private String fUpdateUser;

    public Integer getfAutoId() {
        return fAutoId;
    }

    public void setfAutoId(Integer fAutoId) {
        this.fAutoId = fAutoId;
    }

    public String getfAppId() {
        return fAppId;
    }

    public void setfAppId(String fAppId) {
        this.fAppId = fAppId == null ? null : fAppId.trim();
    }

    public String getfChannelName() {
        return fChannelName;
    }

    public void setfChannelName(String fChannelName) {
        this.fChannelName = fChannelName == null ? null : fChannelName.trim();
    }

    public String getfChannelId() {
        return fChannelId;
    }

    public void setfChannelId(String fChannelId) {
        this.fChannelId = fChannelId == null ? null : fChannelId.trim();
    }

    public Double getfCoefficient() {
        return fCoefficient;
    }

    public void setfCoefficient(Double fCoefficient) {
        this.fCoefficient = fCoefficient;
    }

    public Date getfCreateTime() {
        return fCreateTime;
    }

    public void setfCreateTime(Date fCreateTime) {
        this.fCreateTime = fCreateTime;
    }

    public String getfCreateUser() {
        return fCreateUser;
    }

    public void setfCreateUser(String fCreateUser) {
        this.fCreateUser = fCreateUser == null ? null : fCreateUser.trim();
    }

    public Date getfUpdateTime() {
        return fUpdateTime;
    }

    public void setfUpdateTime(Date fUpdateTime) {
        this.fUpdateTime = fUpdateTime;
    }

    public String getfUpdateUser() {
        return fUpdateUser;
    }

    public void setfUpdateUser(String fUpdateUser) {
        this.fUpdateUser = fUpdateUser == null ? null : fUpdateUser.trim();
    }
}