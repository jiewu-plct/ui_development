Changes：
1. 修改了token失效时间的判断。
2. 修改了Home页面和management相关的路由逻辑的判断以及Sidebar代码。
3. 没有做sidebar的disable功能
4. 修改了面包屑数据获取的函数
5. 删除了devicemanagement的tab-click事件
6. 将Add Device按钮移到右上角

Problems：
1. 点击面包屑无法更新sidebar的选中标签
2. 在table中，axios函数里config类型不兼容且找不到合适的类型，暂用any

注意：
1. ControlDevice以及DeviceManagement的代码绝大多数都直接从原工程复制过来，仅增加了部分类型注解以及函数定义
2. 因为常用居中，css类flex-center写在style.css中供全局使用