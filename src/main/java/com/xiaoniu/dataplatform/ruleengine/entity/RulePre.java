package com.xiaoniu.dataplatform.ruleengine.entity;

import java.util.Date;

public class RulePre {
    private String fRuleVariable;

    private String fPreClass;

    private String fRemark;

    private Date fCreateTime;

    private String fCreateUser;

    private Date fUpdateTime;

    private String fUpdateUser;

    public String getfRuleVariable() {
        return fRuleVariable;
    }

    public void setfRuleVariable(String fRuleVariable) {
        this.fRuleVariable = fRuleVariable == null ? null : fRuleVariable.trim();
    }

    public String getfPreClass() {
        return fPreClass;
    }

    public void setfPreClass(String fPreClass) {
        this.fPreClass = fPreClass == null ? null : fPreClass.trim();
    }

    public String getfRemark() {
        return fRemark;
    }

    public void setfRemark(String fRemark) {
        this.fRemark = fRemark == null ? null : fRemark.trim();
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