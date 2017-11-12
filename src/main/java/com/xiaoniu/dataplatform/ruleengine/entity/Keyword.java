package com.xiaoniu.dataplatform.ruleengine.entity;

import java.util.Date;

public class Keyword {
    private Integer fAutoId;

    private String fAppId;

    private String fType;

    private String fKeywordList;

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

    public String getfType() {
        return fType;
    }

    public void setfType(String fType) {
        this.fType = fType == null ? null : fType.trim();
    }

    public String getfKeywordList() {
        return fKeywordList;
    }

    public void setfKeywordList(String fKeywordList) {
        this.fKeywordList = fKeywordList == null ? null : fKeywordList.trim();
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