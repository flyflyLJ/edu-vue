import request from '@/utils/request'
export default {
  //1 课程列表（条件查询分页）
  //current当前页 limit每页记录数 teacherQuery条件对象
  getCourseListPage(current,limit,courseQuery) {
    return request({
      url: `/eduService/course/pageCourseCondition/${current}/${limit}`,
      method: 'post',
      //teacherQuery条件对象，后端使用RequestBody获取数据
      //data表示把对象转换json进行传递到接口里面
      data: courseQuery
    })
  },
  //删除课程
  deleteCourseId(id) {
    return request({
      url: `/eduService/course/delete/${id}`,
      method: 'delete'
    })
  },
  // 添加课程信息
  addCourseInfo(courseInfo) {
    return request({
      url: `/eduService/course/addCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  //查询所有讲师
  getListTeacher() {
    return request({
      url: `/teacher/findAll`,
      method: 'get',
    })
  },
  //根据课程id查询课程信息
  getCourseInfoById(courseId) {
    return request({
      url: `/eduService/course/getCourseInfo/${courseId}`,
      method: 'get',
    })
  },
  //修改课程信息
  updateCourseInfo(courseInfo) {
    return request({
      url: `/eduService/course/updateCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  //修改课程信息
  getPublishCourseInfo(id) {
    return request({
      url: `/eduService/course/getPublishCourseInfo/${id}`,
      method: 'get'
    })
  },

  //发布课程信息
  publishCourse(id) {
    return request({
      url: `/eduService/course/publishCourse/${id}`,
      method: 'post'
    })
  },
}
