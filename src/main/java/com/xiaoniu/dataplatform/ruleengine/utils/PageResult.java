package com.xiaoniu.dataplatform.ruleengine.utils;

import com.alibaba.fastjson.JSON;

import java.io.Serializable;
import java.util.List;

/**
 * 统一分页返回结果
 * Created by tanhui on 2016/11/1.
 */
public class PageResult<T> implements Serializable{
    private static final long serialVersionUID = -7657746041907395544L;

    private int total;

    private List<T> data;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public String toString() {
        return JSON.toJSONString(this);
    }
}
