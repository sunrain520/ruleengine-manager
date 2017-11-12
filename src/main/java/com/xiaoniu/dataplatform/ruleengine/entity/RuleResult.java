package com.xiaoniu.dataplatform.ruleengine.entity;

import java.util.Date;

public class RuleResult {
    private Integer fAutoId;

    private String fAppId;

    private String fReqId;

    private String fRuleId;

    private Integer fRuleItemId;

    private String fIdNum;

    private Integer fCostTime;

    private Byte fRuleResult;

    private Double fRuleScore;

    private Integer fVersion;

    private String fRemark;

    private Date fCreateTime;

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

    public String getfReqId() {
        return fReqId;
    }

    public void setfReqId(String fReqId) {
        this.fReqId = fReqId == null ? null : fReqId.trim();
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

    public String getfIdNum() {
        return fIdNum;
    }

    public void setfIdNum(String fIdNum) {
        this.fIdNum = fIdNum == null ? null : fIdNum.trim();
    }

    public Integer getfCostTime() {
        return fCostTime;
    }

    public void setfCostTime(Integer fCostTime) {
        this.fCostTime = fCostTime;
    }

    public Byte getfRuleResult() {
        return fRuleResult;
    }

    public void setfRuleResult(Byte fRuleResult) {
        this.fRuleResult = fRuleResult;
    }

    public Double getfRuleScore() {
        return fRuleScore;
    }

    public void setfRuleScore(Double fRuleScore) {
        this.fRuleScore = fRuleScore;
    }

    public Integer getfVersion() {
        return fVersion;
    }

    public void setfVersion(Integer fVersion) {
        this.fVersion = fVersion;
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
}