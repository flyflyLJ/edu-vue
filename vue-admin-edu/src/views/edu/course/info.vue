<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="active" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-form label-width="120px">

      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>

       <!--所属分类 TODO -->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类" @change="subjectLevelOneChanged">

          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>

        </el-select>

         <!--二级分类-->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
      </el-form-item>


     <!--  课程讲师 TODO -->
       <!--课程讲师-->
      <el-form-item label="课程讲师">
        <el-select
          v-model="courseInfo.teacherId"
          placeholder="请选择">

          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>

        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>

      <!-- 课程简介 TODO -->
      <!--<el-form-item label="课程简介">
        <el-input v-model="courseInfo.description" placeholder=" "/>
      </el-form-item>-->
      <el-form-item label="课程简介">
        <Tinymce :height="300" v-model="courseInfo.description"/>
      </el-form-item>

      <!-- 课程封面 TODO 课程封面-->
      <el-form-item label="课程封面">

        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduOss/avatar'"
          class="avatar-uploader">
          <img :src="courseInfo.cover">
        </el-upload>

      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
      </el-form-item>
     <!-- <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>-->
      <el-form-item>
        <el-button  type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import course from '@/api/edu/course'
  import subject from '@/api/edu/subject'
  import Tinymce from '@/components/Tinymce'
  export default {
    components: {Tinymce},
    data() {
      return {
        active: 0,
        saveBtnDisabled:false,
        courseInfo:{
          title: '',
          subjectId: '',//二级分类id
          subjectParentId:'',//一级分类id
          teacherId: '',
          lessonNum: 0,
          description: '',
          cover: 'https://online-edu1.oss-cn-beijing.aliyuncs.com/touxiang.jpg',
          price: 0
        },
        BASE_API: 'http://localhost:8010', // 接口API地址
        teacherList:[],//封装所有的讲师
        subjectOneList:[],//一级分类
        subjectTwoList:[]//二级分类
      }
    },

    created() {
      if(this.$route.params && this.$route.params.id) { //判断路由上是否有参数
        this.courseId = this.$route.params.id
        this.getInfo()
      }else {
        this.getTeacherList()
        this.getOneSubject()
      }

    },
    methods: {
      //获取回传信息
      getInfo(){
        course.getCourseInfoById(this.courseId)
        .then(res=>{
          this.courseInfo = res.data.courseInfo
          //查询所有分类
          subject.getAllSubjectList()
          .then(res=>{
            this.subjectOneList = res.data.list
            //遍历将二级分类找出
            for (var i=0;i<this.subjectOneList.length;i++){
              var oneSubject = this.subjectOneList[i]
              if (this.courseInfo.subjectParentId === oneSubject.id){
                //获取一级分类的所有二级分类
                this.subjectTwoList = oneSubject.children
              }
            }
          })

        })
      },
      //上传封面成功调用的方法
      handleAvatarSuccess(res, file) {
        this.courseInfo.cover = res.data.url
      },
      //上传之前调用的方法
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      //点击某个一级分类，触发change，显示对应二级分类
      subjectLevelOneChanged(value){
        console.log(value)
        //遍历所有的分类，包含一级和二级
        for(var i=0;i<this.subjectOneList.length;i++){
          //得到每一个一级分类
          var oneSubject = this.subjectOneList[i]
          //判断：所有一级分类id 和 点击一级分类id是否一样
          if (value===oneSubject.id){
            //从一级分类获取里面所有的二级分类
            this.subjectTwoList = oneSubject.children;
            //把二级分类id值清空
            this.courseInfo.subjectId = ''
          }
        }
      },
      //查询所有二级分类
      getTwoSubject() {
        subject.getAllSubjectList()
          .then(response => {
            this.subjectTwoList = response.data.list
          })
      },
      //查询所有的一级分类
      getOneSubject() {
        subject.getAllSubjectList()
          .then(response => {
            this.subjectOneList = response.data.list
          })
      },
      //查询所有的讲师
      getTeacherList() {
        course.getListTeacher()
          .then(response => {
            console.log(response)
            this.teacherList = response.data.teachers
          })
      },
      addCourse(){
        course.addCourseInfo(this.courseInfo)
          .then(response => {
            //提示
            this.$message({
              type: 'success',
              message: '添加课程信息成功!'
            });
            //跳转到第二步
            this.$router.push({path:'/course/chapter/'+response.data.courseId})
          })
      },
      updateCourseInfo(){
        course.updateCourseInfo(this.courseInfo)
        .then(res =>{
          this.$message({
            type: 'success',
            message: '添加课程信息成功!'
          });
          //跳转到第二步
          this.$router.push({path:'/course/chapter/'+res.data.courseId})
        })
      },
      saveOrUpdate() {
        if (!this.courseId){
          this.addCourse()
        }else {
          this.updateCourseInfo()
        }
      }
    }
  }
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>
