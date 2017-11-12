package com.xiaoniu.dataplatform.ruleengine.entity;

public class CityInfo {

    private String fAppId;

    private Integer fCityCode;

    private String fCityName;

    private String fCityNameAbbreviate;

    private Integer fProvinceCode;

    private String fProvinceName;

    private Integer fAdministrationLevel;

    private String fClassification;

    public Integer getfCityCode() {
        return fCityCode;
    }

    public void setfCityCode(Integer fCityCode) {
        this.fCityCode = fCityCode;
    }

    public String getfCityName() {
        return fCityName;
    }

    public void setfCityName(String fCityName) {
        this.fCityName = fCityName == null ? null : fCityName.trim();
    }

    public String getfCityNameAbbreviate() {
        return fCityNameAbbreviate;
    }

    public void setfCityNameAbbreviate(String fCityNameAbbreviate) {
        this.fCityNameAbbreviate = fCityNameAbbreviate == null ? null : fCityNameAbbreviate.trim();
    }

    public Integer getfProvinceCode() {
        return fProvinceCode;
    }

    public void setfProvinceCode(Integer fProvinceCode) {
        this.fProvinceCode = fProvinceCode;
    }

    public String getfProvinceName() {
        return fProvinceName;
    }

    public void setfProvinceName(String fProvinceName) {
        this.fProvinceName = fProvinceName == null ? null : fProvinceName.trim();
    }

    public Integer getfAdministrationLevel() {
        return fAdministrationLevel;
    }

    public void setfAdministrationLevel(Integer fAdministrationLevel) {
        this.fAdministrationLevel = fAdministrationLevel;
    }

    public String getfClassification() {
        return fClassification;
    }

    public void setfClassification(String fClassification) {
        this.fClassification = fClassification;
    }

    public String getfAppId() {
        return fAppId;
    }

    public void setfAppId(String fAppId) {
        this.fAppId = fAppId;
    }


}