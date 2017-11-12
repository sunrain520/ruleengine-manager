package com.xiaoniu.dataplatform.ruleengine.entity;

import java.util.Date;

public class ScoreCardDegree {
    private Integer fAutoId;

    private String fAppId;

    private String fRuleId;

    private Integer fRuleItemId;

    private String fDegree;

    private Double fLeftInterval;

    private Double fRightInterval;

    private Integer fPeriod;

    private Double fCoefficient;

    private Double fCreditLimit;

    private Date fCreateTime;

    private String fCreateUser;

    private Date fUpdateTime;

    private String fUpdateUser;

    private String fRemark;

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

    public String getfRuleId() {
        return fRuleId;
    }

    public void setfRuleId(String fRuleId) {
        this.fRuleId = fRuleId == null ? null : fRuleId.trim();
    }

    public Integer getfRuleItemId() {
        return fRuleItemId;
    }

    public void setfRuleItemId(Integer fRuleItemId) {
        this.fRuleItemId = fRuleItemId;
    }

    public String getfDegree() {
        return fDegree;
    }

    public void setfDegree(String fDegree) {
        this.fDegree = fDegree == null ? null : fDegree.trim();
    }

    public Double getfLeftInterval() {
        return fLeftInterval;
    }

    public void setfLeftInterval(Double fLeftInterval) {
        this.fLeftInterval = fLeftInterval;
    }

    public Double getfRightInterval() {
        return fRightInterval;
    }

    public void setfRightInterval(Double fRightInterval) {
        this.fRightInterval = fRightInterval;
    }

    public Integer getfPeriod() {
        return fPeriod;
    }

    public void setfPeriod(Integer fPeriod) {
        this.fPeriod = fPeriod;
    }

    public Double getfCoefficient() {
        return fCoefficient;
    }

    public void setfCoefficient(Double fCoefficient) {
        this.fCoefficient = fCoefficient;
    }

    public Double getfCreditLimit() {
        return fCreditLimit;
    }

    public void setfCreditLimit(Double fCreditLimit) {
        this.fCreditLimit = fCreditLimit;
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

    public String getfRemark() {
        return fRemark;
    }

    public void setfRemark(String fRemark) {
        this.fRemark = fRemark == null ? null : fRemark.trim();
    }
}