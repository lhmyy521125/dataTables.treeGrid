# 插件介绍
针对DataTables写的树形表格插件（[什么是DataTables? 可以点击访问官网了解](https://datatables.net/)）
在原DataTables基础上可以快速实现树形表格的渲染：
1、支持自定义展开/收缩 图标
2、支持自定义缩进距离
3、N层子集展开父级收缩 子集统一收缩；

**[插件地址：https://github.com/lhmyy521125/dataTables.treeGrid](https://github.com/lhmyy521125/dataTables.treeGrid)**
# 更新日志
2020-4-16：千呼万唤始出来,很多朋友再CSDN博客上反馈了插件的一些问题，博主的公司因为已经很少用dataTable（都使用VUE啦）所以很少去弄这款插件了，今天呢总算抽时间完善了这款插件，更新内容如下：
- 1、解决dataTable reload() / draw() 时树形失效问题
- 2、采用新的初始化方式，可以外部调用 expandAll() / collapseAll() 方法
```javascript
//@example
      var table = $('#example').dataTable( { ... } );
      var tree = new $.fn.dataTable.treeGrid( table );
      tree.expandAll();
      tree.collapseAll();
```
- 3、更新后更容易对插件进行扩展，可以自定义自己需要实现的功能，参考expandAll() / collapseAll() 自己定义自己的方法，处理不同的需求

2019-5-8：很多朋友在博客私信说要一份DEMO，今天上传了DEMO样例仅供大家参考；注意要在WEB容器运行

2019-4-11：新增expandAll配置属性，true默认展开，false不展开不配置默认false

2018-10-11：当多层数据时，第一个子集未展开，第二个子集展开，点击父级收缩会出现死循环问题解决；

2018-10-11：多层子集收缩的时候会导致第二级以下的展开不会删除问题；解决方案采用递归方式改写收缩方法


# 真实系统展现效果
![展现效果图](https://img-blog.csdnimg.cn/2019011717185479.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xobXl5NTIxMTI1,size_16,color_FFFFFF,t_70)
# DEMO参考
GitHub上DEMO的 运行效果，感兴趣的可以自行下载运行体验~~
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200416152057214.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xobXl5NTIxMTI1,size_16,color_FFFFFF,t_70)
# 使用方法

```
//注意自行下载 dataTables  
<script src='您的资源目录/jquery.js'></script>
<script src='您的资源目录/jquery.dataTables.min.js'></script>
//引入我们写的dataTables  Tree 插件
<script src='您的资源目录/dataTables.treeGrid.js'></script>
```

# DataTable 渲染JSON数据格式

```
// JSON对象数据应包含一个属性“children”作为子集
{
"data": 
    [
        {
            "name": "lhmyy521125",
            ...
            "children": [
                {
                    "name": "hello",
                    ...
                }
            ]
        }
    ]
}  
```
# HTML数据格式（以DEMO截图代码为例）

```
 <!-- DEMO样例仅供大家参考；
      注意要在WEB容器运行 如：IIS、Nginx、Tomcat等 否则AJAX会以 file:// 请求出现错误；
 -->
 <table class="table table-striped table-bordered table-hover" id="treetable">
	<thead>
		<tr>
			<th></th>
			<th>部门名称</th>
			<th>英文名称</th>
			<th>负责人</th>
			<th>部门电话</th>
			<th>部门地址</th>
			<th>主要职能</th>
		</tr>
	</thead>
	<tbody></tbody>
  </table>

  <script type="text/javascript">
    var dataTable;
    var tree;
   $(function () {
        dataTable = $('#treetable').DataTable({
            /**
             l - Length changing 改变每页显示多少条数据的控件
             f - Filtering input 即时搜索框控件
             t - The Table 表格本身
             i - Information 表格相关信息控件
             p - Pagination 分页控件
             r - pRocessing 加载等待显示信息
             **/
            "dom": "tr",
            "ordering": false, //禁用排序
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "json/data.json",
                // "async": false
            },
            "columns": [
                {
                    className: 'treegrid-control',
                    data: function (item) {
                        if (item.children != null && item.children.length > 0) {
                            return '<span> + </span>';
                        }
                        return '';
                    }
                },
                {"data": "name"},
                {"data": "nameEn"},
                {"data": "headMan"},
                {"data": "tel"},
                {"data": "address"},
                {"data": "functions"}
            ],
            "columnDefs": [
                {
                    "defaultContent": "",
                    "targets": "_all"
                }
            ]
        });
        /** 采用对象构建插件，方便我们调用插件内部方法 **/
       tree = new $.fn.dataTable.TreeGrid(dataTable,{
           left: 15,
           expandAll: true,
           expandIcon: '<span>++</span>',
           collapseIcon: '<span>--</span>'
       });
    });


function expandAll(){
    tree.expandAll();
}

function collapseAll(){
    tree.collapseAll();
}

function reload(){
	dataTable.ajax.reload();
}

function draw(){
	dataTable.draw(false);
}
</script>

<div>
<button class="btn btn-primary" type="button" onclick="expandAll()">expandAll()</button>
<button class="btn btn-primary" type="button" onclick="collapseAll()">collapseAll()</button>
<button class="btn btn-primary" type="button" onclick="reload()">reload()</button>
<button class="btn btn-primary" type="button" onclick="draw()">draw()</button>
</div>

 </body>
</html>

```

如果该插件帮助到您，别忘记了点个  **star** 对我的支持~
