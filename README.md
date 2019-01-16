# dataTables.treeGrid
DataTables.treeGrid.js Repair Edition

# 修正问题：
1、当多层数据时，第一个子集未展开，第二个子集展开，点击父级收缩会出现死循环；

2、多层子集收缩的时候会导致第二级以下的展开不会删除问题；解决方案采用递归方式改写 ==getChildrenCollapseIndexs== 方法
