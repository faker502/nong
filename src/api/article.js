import request from '@/utils/request';

// 获取新闻
export function getNewsApi(data) {
    return request({
        url: '/home/news',
        method: 'post',
        data: data
    })
}

// 获取新闻列表
export function getNewsListApi(data) {
    return request({
        url: '/home/newslist',
        method: 'post',
        data: data
    })
}

// 获取新闻
export function getNewsInfoApi(data) {
    return request({
        url: '/home/news',
        method: 'post',
        data: data
    })
}

// 获取新闻列表
export function getNewsContentApi(data) {
    return request({
        url: '/home/news/content',
        method: 'get',
        params: data
    })
}

// 获取常见问题列表
export function getQuestionsApi(data) {
    return request({
        url: '/home/questions',
        method: 'post',
        data: data
    })
}