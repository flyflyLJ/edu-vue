import request from '../utils/request'

export default {
  //获取讲师分页列表
  pageTeacherPage(current,limit) {
    return request({
      url: `/eduService/indexFront/pageTeacher/${current}/${limit}`,
      method: 'post'
    })
  },
  //获取讲师信息
  getTeacherInfo(id) {
    return request({
      url: `/eduService/indexFront/getCourseInfo/${id}`,
      method: 'get'
    })
  }
}
