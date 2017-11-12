package com.xiaoniu.dataplatform.ruleengine.entity;

import java.util.Date;

public class RejectList {
    private Integer fAutoId;

    private String fIdNum;

    private Long fIdIndex;

    private String fName;

    private String fMobile;

    private String fAppId;

    private String fReqId;

    private String fRuleId;

    private Integer fRuleItemId;

    private String fReason;

    private Date fCreateTime;

    private Date fUpdateTime;

    private Date fExpireDate;

    private Byte fState;

    private Byte fType;

    private Byte fSubType;

    private String tableName;

    public Integer getfAutoId() {
        return fAutoId;
    }

    public void setfAutoId(Integer fAutoId) {
        this.fAutoId = fAutoId;
    }

    public String getfIdNum() {
        return fIdNum;
    }

    public void setfIdNum(String fIdNum) {
        this.fIdNum = fIdNum == null ? null : fIdNum.trim();
    }

    public Long getfIdIndex() {
        return fIdIndex;
    }

    public void setfIdIndex(Long fIdIndex) {
        this.fIdIndex = fIdIndex;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName == null ? null : fName.trim();
    }

    public String getfMobile() {
        return fMobile;
    }

    public void setfMobile(String fMobile) {
        this.fMobile = fMobile == null ? null : fMobile.trim();
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

    public String getfReason() {
        return fReason;
    }

    public void setfReason(String fReason) {
        this.fReason = fReason == null ? null : fReason.trim();
    }

    public Date getfCreateTime() {
        return fCreateTime;
    }

    public void setfCreateTime(Date fCreateTime) {
        this.fCreateTime = fCreateTime;
    }

    public Date getfUpdateTime() {
        return fUpdateTime;
    }

    public void setfUpdateTime(Date fUpdateTime) {
        this.fUpdateTime = fUpdateTime;
    }

    public Date getfExpireDate() {
        return fExpireDate;
    }

    public void setfExpireDate(Date fExpireDate) {
        this.fExpireDate = fExpireDate;
    }

    public Byte getfState() {
        return fState;
    }

    public void setfState(Byte fState) {
        this.fState = fState;
    }

    public Byte getfType() {
        return fType;
    }

    public void setfType(Byte fType) {
        this.fType = fType;
    }

    public Byte getfSubType() {
        return fSubType;
    }

    public void setfSubType(Byte fSubType) {
        this.fSubType = fSubType;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }
}