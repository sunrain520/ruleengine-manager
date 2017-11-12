package com.xiaoniu.dataplatform.ruleengine.utils;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.xiaoniu.dataplatform.ruleengine.service.impl.RuleSetServiceImpl;

/** 
 * @author  zhengjiajun
 * @date 2017年11月9日
 */
public class ServiceUtil {

	private static final Logger LOGGER = LoggerFactory.getLogger(RuleSetServiceImpl.class);
	
	/**
	 * 返回400错误
	 * @return
	 */
	public static final <T> RuleEngineResponse<T> returnError400() {
		return new RuleEngineResponse<T>(RuleEngineErrorCode.C400);
	}
	
	/**
	 * 请求列表数据
	 * @param params
	 * @param startIndex
	 * @param pageSize
	 * @param entityClass
	 * @param mapperClass
	 * @return
	 */
	public static final <T, U> RuleEngineResponse<PageResult<T>> queryDataByPage(Map<String, Object> params, int startIndex, int pageSize, Class<T> entityClass, Class<U> mapperClass) {
		RuleEngineResponse<PageResult<T>> resp = new RuleEngineResponse<PageResult<T>>(RuleEngineErrorCode.C200);
        try {
        	// 获取mapper
        	U realMapper = getRealMapper(entityClass, mapperClass);
        	// 获取需要调用的方法
        	Method queryDataCountMethod = getMapperMethod(entityClass, mapperClass, "query", "Count", Map.class);
        	Method queryDatasByPageMethod = getMapperMethod(entityClass, mapperClass, "query", "sByPage", Map.class);
        	
        	int pageNum = PageUtil.getPageNum(startIndex, pageSize);

            PageResult<T> pageResult = new PageResult<T>();
            List<T> dataList = new ArrayList<T>();
            // 获取数据数量
            int totalCount = Integer.valueOf(queryDataCountMethod.invoke(realMapper, params).toString());
            if (totalCount > 0) {
            	params.put("pageNum",pageNum);
                params.put("pageSize",pageSize);
                // 请求数据
                dataList = (List<T>)queryDatasByPageMethod.invoke(realMapper, params);
            }
            // 设进返回体
            pageResult.setData(dataList);
            pageResult.setTotal(totalCount);
            resp.setData(pageResult);
        } catch (Exception e) {
        	LOGGER.error("queryDataByPage fail,reason:{}", e);
            resp = new RuleEngineResponse<PageResult<T>>(RuleEngineErrorCode.C500);
        }
        return resp;
	}
	
	/**
	 * 通过id请求数据
	 * @param id
	 * @param entityClass
	 * @param mapperClass
	 * @return
	 */
	public static final <T, U> RuleEngineResponse<T> queryDataById(Object id, Class<T> entityClass, Class<U> mapperClass) {
		RuleEngineResponse<T> resp = new RuleEngineResponse<T>(RuleEngineErrorCode.C200);
		try {
			// 获取mapper
			U realMapper = getRealMapper(entityClass, mapperClass);
			// 获取查询方法
			Method selectByPrimaryKey = null;
			if (id instanceof Integer) {
				selectByPrimaryKey = getMapperMethod(entityClass, mapperClass, "selectByPrimaryKey", Integer.class);
			} else {
				selectByPrimaryKey = getMapperMethod(entityClass, mapperClass, "selectByPrimaryKey", String.class);
			}
			// 请求查询方法
			T data = (T)selectByPrimaryKey.invoke(realMapper, id);
			resp.setData(data);
		} catch (Exception e) {
			resp = new RuleEngineResponse<T>(RuleEngineErrorCode.C500);
            LOGGER.error("queryDataById fail,reason:{}", e);
		}
		return resp;
	}
	
	/**
	 * 通过id更新数据
	 * @param src
	 * @param entityClass
	 * @param mapperClass
	 * @return
	 */
	public static final <T, U> RuleEngineResponse<T> updateDataById(Object src, Class<T> entityClass, Class<U> mapperClass) {
		RuleEngineResponse<T> resp = new RuleEngineResponse<T>(RuleEngineErrorCode.C200);
        try {
        	// 获取mapper
			U realMapper = getRealMapper(entityClass, mapperClass);
			// 获取更新方法
			Method updateByPrimaryKeySelective = getMapperMethod(entityClass, mapperClass, "updateByPrimaryKeySelective", entityClass);
			// 请求更新方法
            updateByPrimaryKeySelective.invoke(realMapper, src);
            resp.setData((T)src);
        } catch (Exception e) {
            resp = new RuleEngineResponse<T>(RuleEngineErrorCode.C500);
            LOGGER.error("updateDataById fail,reason:{}", e);
        }
        return resp;
	}
	
	/**
	 * 插入数据
	 * @param src
	 * @param entityClass
	 * @param mapperClass
	 * @return
	 */
	public static final <T, U> RuleEngineResponse<T> insertData(Object src, Class<T> entityClass, Class<U> mapperClass) {
		RuleEngineResponse<T> resp = new RuleEngineResponse<T>(RuleEngineErrorCode.C200);
        try {
        	// 获取mapper
			U realMapper = getRealMapper(entityClass, mapperClass);
			// 获取插入方法
			Method insert = getMapperMethod(entityClass, mapperClass, "insert", entityClass);
			// 请求插入方法
			insert.invoke(realMapper, src);
            resp.setData((T)src);
        } catch (Exception e) {
            resp = new RuleEngineResponse<T>(RuleEngineErrorCode.C500);
            LOGGER.error("insertData fail,reason:{}", e);
        }
        return resp;
	}
	
	/**
	 * 通过id删除数据
	 * @param id
	 * @param entityClass
	 * @param mapperClass
	 * @return
	 */
	public static final <T, U> RuleEngineResponse<T> deleteData(Object id, Class<T> entityClass, Class<U> mapperClass) {
		RuleEngineResponse<T> resp = new RuleEngineResponse<T>(RuleEngineErrorCode.C200);
        try {
        	// 获取mapper
			U realMapper = getRealMapper(entityClass, mapperClass);
			// 获取删除方法
			Method deleteByPrimaryKey = null;
			if (id instanceof Integer) {
				deleteByPrimaryKey = getMapperMethod(entityClass, mapperClass, "deleteByPrimaryKey", Integer.class);
			} else {
				deleteByPrimaryKey = getMapperMethod(entityClass, mapperClass, "deleteByPrimaryKey", String.class);
			}
			// 请求删除方法
			deleteByPrimaryKey.invoke(realMapper, id);
        } catch (Exception e) {
            resp = new RuleEngineResponse<T>(RuleEngineErrorCode.C500);
            LOGGER.error("deleteData fail,reason:{}", e);
        }
        return resp;
	}
	
	/**
	 * 获取mapper，mybatis采用代理，转换时使用接口类强转
	 * @param entityClass
	 * @param mapperClass
	 * @return
	 */
	private static <T, U> U getRealMapper(Class<T> entityClass, Class<U> mapperClass) {
		String mapperName = new StringBuffer().append(firstCharLowerCase(entityClass.getSimpleName())).append("Mapper").toString();
		Object mapper = SpringContextUtil.getBean(mapperName);
    	U realMapper = (U)mapper;
    	return realMapper;
	}
	
	/**
	 * 获取查库的方法，方法名需要拼装，必须如“methodHead”+ entityClassName + “methodTail”样式
	 * @param entityClass
	 * @param mapperClass
	 * @param methodHead
	 * @param methodTail
	 * @param argTypes
	 * @return
	 * @throws NoSuchMethodException
	 * @throws SecurityException
	 */
	private static <T, U> Method getMapperMethod(Class<T> entityClass, Class<U> mapperClass, String methodHead, String methodTail, Class<?>... argTypes) 
			throws NoSuchMethodException, SecurityException {
		String methodName = new StringBuffer().append(methodHead).append(entityClass.getSimpleName()).append(methodTail).toString();
		return mapperClass.getMethod(methodName, argTypes);
	}
	
	/**
	 * 获取查库的方法，已知方法名
	 * @param entityClass
	 * @param mapperClass
	 * @param methodName
	 * @param argTypes
	 * @return
	 * @throws NoSuchMethodException
	 * @throws SecurityException
	 */
	private static <T, U> Method getMapperMethod(Class<T> entityClass, Class<U> mapperClass, String methodName, Class<?>... argTypes) 
			throws NoSuchMethodException, SecurityException {
		return mapperClass.getMethod(methodName, argTypes);
	}
	
	/**
	 * 首字母大写
	 * @param name
	 * @return
	 */
	private static String firstCharUpperCase(String name) {
        char[] cs=name.toCharArray();
        cs[0]-=32;
        return String.valueOf(cs);
    }
	
	/**
	 * 首字母小写
	 * @param name
	 * @return
	 */
	private static String firstCharLowerCase(String name) {
        char[] cs=name.toCharArray();
        cs[0]+=32;
        return String.valueOf(cs);
    }
}
