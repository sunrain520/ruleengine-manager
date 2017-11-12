package com.xiaoniu.dataplatform.ruleengine.utils;

import com.xiaoniu.dataplatform.utils.MD5;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 
 * @author rendongfu
 * @date 2016-10-08
 * @description 各种分表的方式
 */
public class SpiltTableUtil {

    public static Long getIdIndex(String idNum) {
        String idMd5 = MD5.encode(idNum);
        idMd5 = idMd5.substring(0, 8);
        Long idIndex = Long.parseLong(idMd5, 16);
        return idIndex;
    }
    /**
     * 身份证号的md5值的高8位转化成十进制长整型，再模10。达到分布均匀
     * @param tablePrefix 表名前缀
     * @param idNum 身份证号
     * @return
     */
    public static IdSplitElement spiltById(String tablePrefix, String idNum) {
        IdSplitElement element = new IdSplitElement();
        Long idIndex = getIdIndex(idNum);
        element.setIdNum(idNum);
        element.setIdIndex(idIndex);
        element.setTableName(tablePrefix+(idIndex%10));
        return  element;
    }
    
    
    public static String spiltByDate(String tablePrefix, Date date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy_MM");
        return tablePrefix + format.format(date);
    }
}
