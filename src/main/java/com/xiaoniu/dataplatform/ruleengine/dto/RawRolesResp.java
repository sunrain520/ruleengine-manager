package com.xiaoniu.dataplatform.ruleengine.dto;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import java.io.Serializable;
import java.util.List;

/**
 * PMS角色列表返回
 * Created by tanhui on 2016/10/13.
 */
public class RawRolesResp implements Serializable{
    private static final long serialVersionUID = -6596477615268559920L;

    private String code;

    private List<RawRole> data;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<RawRole> getData() {
        return data;
    }

    public void setData(List<RawRole> data) {
        this.data = data;
    }
}
