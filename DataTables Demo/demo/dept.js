<script type="text/javascript">
    var dataTable;
    $(function () {

        dataTable = $('#editable').on('preXhr.dt', function (e, settings, data) {
            layer.load(1);
        }).on('xhr.dt', function (e, settings, json, xhr) {
            layer.closeAll('loading');
        }).DataTable({
            /**
             l - Length changing 改变每页显示多少条数据的控件
             f - Filtering input 即时搜索框控件
             t - The Table 表格本身
             i - Information 表格相关信息控件
             p - Pagination 分页控件
             r - pRocessing 加载等待显示信息
             **/
            "dom": "lpt",
            "lengthMenu": [500],
            "ordering": false, //禁用排序
            "processing": true,
            "serverSide": true,
            "ajax": {url: "data.json"},
            "scrollX": true,
            "autoWidth": true,
            "columns": [
                {"data": "deptId"},
                {"data": "name"},
                {"data": "nameEn"},
                {"data": "deptCode"},
                {"data": "headMan"},
                {"data": "tel"},
                {"data": "address"},
                {"data": "functions"},
                {"data": "status"},
                {"data": "createBy"},
                {"data": "createTime"},
                {"data": "deptId"}
            ],
            "columnDefs": [
                {
                    "defaultContent": "",
                    "targets": "_all"
                },
                {
                    "targets": 0, "render": function (data, type, row, meta) {
                        var html = "<input type=\"checkbox\" value=\"" + row.deptId + "\" class=\"i-checks\" name=\"deptIds\">";
                        return html;
                    }
                },
                {"targets": 8, "render": function (data, type, row, meta) {
                        if (row.status === true) {
                            return "<button type='button' class='btn btn-primary btn-xs' onclick=\"updateStatus('" + row.deptId + "','false');\"><i class='fa fa-refresh'></i> 启用</button>";
                        } else {
                            return "<button type='button' class='btn btn-danger btn-xs' onclick=\"updateStatus('" + row.deptId + "','true');\"><i class='fa fa-refresh'></i> 禁用</button>";
                        }
                    }
                },
                {
                    "targets": 11, "render": function (data, type, row, meta) {
                        var html = "<a onclick=\"edit('" + row.deptId + "');\" class='btn btn-success btn-xs' ><i class='fa fa-edit'></i> 编辑</a> ";
                        html = html + "<a onclick=\"deleteObject('" + row.deptId + "');\" class='btn btn-danger btn-xs' ><i class='fa fa-trash'></i> 删除</a> ";
                        return html;
                    }
                }
            ]
        });

        new $.fn.dataTable.FixedColumns(dataTable,{
            "iLeftColumns":2,
            "iRightColumns":1,
            "drawCallback": function(){
				//这里我注释了因为Icheck相关初始化方法我已经再其它文件定义了 


                //重绘Icheck
                //iCheckInitFunction();
                //重新设置全选事件
                //TableiCheck(".DTFC_Cloned thead tr th input.i-checks", ".DTFC_Cloned tbody tr td input.i-checks");
            }
        });
    });

</script>