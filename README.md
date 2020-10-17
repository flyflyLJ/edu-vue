# edu-vue在线教育平台前台
## vue-admin-edu 管理员后台
--------------------

### 使用vue-admin-template模板
管理员后台主要基于vue-admin-template模板的基础上进行开发
**开发日志**
- 2020-10-12

主要完成了：
1.讲师模块的后台功能
vue-admin-edu\src\views\edu\teacher——list：分页展示视图及条件查询

vue-admin-edu\src\views\edu\teacher——save：修改及添加视图

主要遇到问题，前后端跨域问题：解决后端controller接口添加@CrossOrigin注解，或者配置跨域配置类

初接触这个后台管理框架的一些其他问题，如一直不能登录进入：解决后端传的code是2000，前端判断值是20000，导致被拦截

- 2020-10-13

主要完成了：
1、讲师模块头像上传到阿里云对象存储oss服务器的界面

2、课程管理模块的上传excel添加课程功能

3、课程分级显示功能

vue-admin-edu\src\views\edu\subject——list：课程分级显示页面

vue-admin-edu\src\views\edu\subject——save：程管理模块的上传excel添加课程页面

主要遇到问题：

启动的昨天的服务和今天新开发的oss服务，两个端口（8001/8002）通过nginx配置访问分配（请求转发），配置过程由于9001端口号被占用，导致数据无法传送，nginx无法启动，一开始以为跨域问题，
后面经过不断查询资料，改了nginx的访问端口后解决

文件上传：由于前端和后端接口的一个单词不同，导致404，查了半天，后面看后台代码才发现
建议：后端接口最好复制粘贴到前端中


- 2020-10-14
1、课程信息分步上传功能的课程信息部分

2、课程信息章节上传部分

vue-admin-edu\src\views\edu\course——info：课程信息分步上传的首页（集成了图片上传及Tinymce富文本编辑器）
vue-admin-edu\src\views\edu\course——chapter：分步上传信息第二步（目前完成了章节信息的树形展示，章节信息的增删改查）

- 2020-10-15

1、完成了分步上传的所有功能和步骤（确认上传、课程发布、视频删除、小节删除，视频删除等功能）

2、完成了课程信息列表及模糊查询功能

vue-admin-edu\src\views\edu\course——publish:课程信息发布
vue-admin-edu\src\views\edu\course——list：课程信息展示列表及分类查询功能（还需要修改，页面比较丑）

- 2020-10-16

1、使用nuxt框架作为系统前台

2、首页完成

问题：swiper的使用，及轮播图展示问题（目前轮播图无法展示）

- 2020-10-17

- 2020-10-16

1、使用nuxt框架作为系统前台

2、首页完成

问题：swiper的使用，及轮播图展示问题（目前轮播图无法展示）

- 2020-10-17