package com.xiaoniu.dataplatform.ruleengine.utils;

/** 
 * @author  zhengjiajun
 * @date 2017年11月7日
 */
public class PageUtil {

	public static int getPageNum(int startIndex, int pageSize) {
		 int pageNum = startIndex / pageSize + 1;
         if (pageNum < 1) {
             pageNum = 1;
         }
         if (pageSize > 100) {
             pageSize = 100;
         }
         pageNum = (pageNum - 1) * pageSize;
         return pageNum;
	}
}
