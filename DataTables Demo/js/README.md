# dataTables.treeGrid
DataTables.treeGrid.js Repair Edition ， 首先注意下载dataTables插件，注意下载dataTables插件，注意下载dataTables插件 重要的说三遍！
# 更新日志
2019-4-11：新增expandAll配置属性，true默认展开，false不展开不配置默认false

2018-10-11：当多层数据时，第一个子集未展开，第二个子集展开，点击父级收缩会出现死循环问题解决；

2018-10-11：多层子集收缩的时候会导致第二级以下的展开不会删除问题；解决方案采用递归方式改写收缩方法

# 使用方法
引入资源：


```
//注意自行下载 dataTables  
<script src='您的资源目录/jquery.js'></script>
<script src='您的资源目录/jquery.dataTables.min.js'></script>

//引入我们写的dataTables  Tree 插件
<script src='您的资源目录/dataTables.treeGrid.js'></script>

```

DataTables JSON 格式
JSON对象数据应包含一个属性“children”作为子集

```
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

DataTables 初始化

```
var dataTable = $("#editable").DataTable({
    "dom": "l", //布局显示
    "ordering": false, //禁用排序
    "lengthMenu": [10,20,30],
    "ajax": {
        "url": "dataJson.json", //请求得服务地址，返回JSON
    },
    'treeGrid': {
        'left': 15, // 图标的缩进像素
        'expandAll' : true, //是否默认展开 true 是
        'expandIcon': '<span><i class="fa fa-plus-square"></i></span>', //展开图标
        'collapseIcon': '<span><i class="fa fa-minus-square"></i></span>' //收缩图标
    }
    ...
})

```
# DEMO

以截图样例为
![image](http://www.toher.cn/UploadFiles/web_file/20190116234756.png)

```
<!--HTML table-->
<table class="table table-striped table-bordered table-hover" id="editable">
    <thead>
        <tr>
            <th width="4%"></th>
            <th width="15%">名称</th>
            <th>链接</th>
            <th width="8%">类型</th>
            <th>权限</th>
            <th width="8%">排序</th>
            <th width="8%">状态</th>
            <th width="20%">操作</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
```


```
//Javasctipt 
var dataTable;
 $(function () {
    dataTable = $("#editable").DataTable({
        "dom": "l",
        "ordering": false, //禁用排序
        "lengthMenu": [500],
        "ajax": {
            "url": ctx + "system/menu/dataJson",
        },
        'treeGrid': {
            'left': 15,
            'expandAll' : true,
            'expandIcon': '<span><i class="fa fa-plus-square"></i></span>',
            'collapseIcon': '<span><i class="fa fa-minus-square"></i></span>'
        },
        "columns": [
            {
                className: 'treegrid-control',
                data: function (item) {
                    if (item.children.length>0) {
                        return '<span><i class="fa fa-plus-square"></i></span>';
                    }
                    return '';
                }
            },
            {
                data:function(item){
                    return '<i class="'+item.menuIcon+'"></i> '+item.menuName;
                }
            },
            {"data": "menuUrl"},
            {
                data:function(item){
                    if(item.menuType==1){
                        return '<small class="label label-warning">目录</small>';
                    }else if(item.menuType==2){
                        return '<small class="label label-primary">菜单</small>';
                    }else{
                        return '<small class="label label-info">功能</small>';
                    }
                }
            },
            {"data": "permissionCode"},
            {
                data:function(item){
                    var html = '<input name="menuSort" type="text" value="'+item.menuSort+'" class="form-control sorts" style="width:70px;margin:0;padding:0;text-align:center;">';
                    html = html + '<input name="menuSortId" type="hidden" value="'+item.menuId+'">';
                    return html;
                }
            },
            {
                data:function(item){
                    if(item.menuStatus==true){
                        return "<button type='button' class='btn btn-primary btn-xs' onclick=\"updateStatus('" + item.menuId + "','false');\"><i class='fa fa-refresh'></i> 启用</button>";
                    }else{
                        return "<button type='button' class='btn btn-danger btn-xs' onclick=\"updateStatus('" + item.menuId + "','true');\"><i class='fa fa-refresh'></i> 禁用</button>";
                    }
                }
            },
            {
                data:function(item){
                    var html = "<a onclick=\"edit('" + item.menuId + "');\" class='btn btn-success btn-xs' ><i class='fa fa-edit'></i> 编辑</a> ";
                    html = html + "<a onclick=\"add('" + item.menuId + "');\" class='btn btn-primary btn-xs' ><i class='fa fa-plus'></i> 添加下级菜单</a> ";
                    html = html + "<a onclick=\"deleteObject('" + item.menuId + "');\" class='btn btn-danger btn-xs' ><i class='fa fa-trash-o'></i> 删除</a> ";
                    return html;
                }
            }
        ]
    });
});
```
