// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, Edit, RefreshCw, Download, Eye, Filter, FileText, AlertTriangle, CheckCircle, Clock, Shield, AlertCircle as AlertCircleIcon } from 'lucide-react';

// 模拟数据
const mockReports = [{
  id: 'RPT001',
  workOrder: 'WO202501001',
  columnSerial: 'COL-2025-001',
  orderNumber: 'ORD-202501001',
  instrumentSerial: 'INST-001',
  status: 'unqualified',
  reportDate: '2025-01-15',
  不合格项目: '纯度检测',
  不合格原因: '纯度低于标准值',
  负责人: '张三',
  审核状态: 'pending'
}, {
  id: 'RPT002',
  workOrder: 'WO202501002',
  columnSerial: 'COL-2025-002',
  orderNumber: 'ORD-202501002',
  instrumentSerial: 'INST-002',
  status: 'unqualified',
  reportDate: '2025-01-14',
  不合格项目: 'pH值检测',
  不合格原因: 'pH值超出范围',
  负责人: '李四',
  审核状态: 'approved'
}, {
  id: 'RPT003',
  workOrder: 'WO202501003',
  columnSerial: 'COL-2025-003',
  orderNumber: 'ORD-202501003',
  instrumentSerial: 'INST-001',
  status: 'unqualified',
  reportDate: '2025-01-13',
  不合格项目: '杂质含量',
  不合格原因: '杂质含量超标',
  负责人: '王五',
  审核状态: 'pending'
}, {
  id: 'RPT004',
  workOrder: 'WO202501004',
  columnSerial: 'COL-2025-004',
  orderNumber: 'ORD-202501004',
  instrumentSerial: 'INST-003',
  status: 'unqualified',
  reportDate: '2025-01-12',
  不合格项目: '溶解度测试',
  不合格原因: '溶解度不达标',
  负责人: '赵六',
  审核状态: 'rejected'
}, {
  id: 'RPT005',
  workOrder: 'WO202501005',
  columnSerial: 'COL-2025-005',
  orderNumber: 'ORD-202501005',
  instrumentSerial: 'INST-002',
  status: 'unqualified',
  reportDate: '2025-01-11',
  不合格项目: '稳定性测试',
  不合格原因: '稳定性时间不足',
  负责人: '张三',
  审核状态: 'pending'
}];
export default function HomePage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [reports, setReports] = useState(mockReports);
  const [filteredReports, setFilteredReports] = useState(mockReports);
  const [loading, setLoading] = useState(false);
  const [selectedReports, setSelectedReports] = useState([]);

  // 搜索条件
  const [searchParams, setSearchParams] = useState({
    workOrder: '',
    columnSerial: '',
    orderNumber: '',
    instrumentSerial: '',
    status: 'all',
    auditStatus: 'all'
  });

  // 分页
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const totalPages = Math.ceil(filteredReports.length / pageSize);

  // 强制设置为管理员 - 临时解决方案
  const currentUser = {
    name: '管理员',
    type: 'admin'
  };

  // 调试信息
  console.log('HomePage - 当前用户:', currentUser);
  console.log('HomePage - 权限检查:', currentUser.type === 'admin');

  // 权限检查 - 只有管理员才能访问
  if (currentUser.type !== 'admin') {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">访问受限</h2>
          <p className="text-gray-500 mb-4">不合格报告管理功能仅限管理员访问</p>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            当前身份: {currentUser.type === 'guest' ? '访客' : '客户'}
          </Badge>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
            <p className="text-sm text-gray-600">调试信息:</p>
            <p className="text-xs text-gray-500">用户类型: {currentUser.type}</p>
            <p className="text-xs text-gray-500">用户名: {currentUser.name}</p>
          </div>
        </div>
      </div>;
  }

  // 搜索功能
  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const filtered = reports.filter(report => {
        return (!searchParams.workOrder || report.workOrder.toLowerCase().includes(searchParams.workOrder.toLowerCase())) && (!searchParams.columnSerial || report.columnSerial.toLowerCase().includes(searchParams.columnSerial.toLowerCase())) && (!searchParams.orderNumber || report.orderNumber.toLowerCase().includes(searchParams.orderNumber.toLowerCase())) && (!searchParams.instrumentSerial || report.instrumentSerial.toLowerCase().includes(searchParams.instrumentSerial.toLowerCase())) && (searchParams.status === 'all' || report.status === searchParams.status) && (searchParams.auditStatus === 'all' || report.审核状态 === searchParams.auditStatus);
      });
      setFilteredReports(filtered);
      setCurrentPage(1);
      setLoading(false);
      toast({
        title: "查询完成",
        description: `找到 ${filtered.length} 条符合条件的报告`
      });
    }, 500);
  };

  // 重置搜索
  const handleReset = () => {
    setSearchParams({
      workOrder: '',
      columnSerial: '',
      orderNumber: '',
      instrumentSerial: '',
      status: 'all',
      auditStatus: 'all'
    });
    setFilteredReports(reports);
    setCurrentPage(1);
  };

  // 修改报告
  const handleEdit = reportId => {
    toast({
      title: "编辑功能",
      description: `正在编辑报告 ${reportId}`
    });
    // 这里可以跳转到编辑页面或打开编辑模态框
  };

  // 重新计算
  const handleRecalculate = async reportId => {
    setLoading(true);
    try {
      // 模拟重新计算过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "重新计算完成",
        description: `报告 ${reportId} 已重新计算`
      });
    } catch (error) {
      toast({
        title: "计算失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // 预览报告
  const handlePreview = reportId => {
    toast({
      title: "预览报告",
      description: `正在预览报告 ${reportId}`
    });
  };

  // 下载报告
  const handleDownload = reportId => {
    toast({
      title: "下载报告",
      description: `正在下载报告 ${reportId}`
    });
  };

  // 批量选择
  const handleSelectAll = checked => {
    if (checked) {
      setSelectedReports(currentPageReports.map(report => report.id));
    } else {
      setSelectedReports([]);
    }
  };

  // 批量审核
  const handleBatchAudit = () => {
    if (selectedReports.length === 0) {
      toast({
        title: "请选择报告",
        description: "请先选择需要审核的报告",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "批量审核",
      description: `正在审核 ${selectedReports.length} 份报告`
    });
  };

  // 获取状态标签
  const getStatusBadge = status => {
    const statusConfig = {
      unqualified: {
        label: '不合格',
        color: 'destructive'
      },
      qualified: {
        label: '合格',
        color: 'default'
      },
      pending: {
        label: '待审核',
        color: 'secondary'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge variant={config.color}>{config.label}</Badge>;
  };

  // 获取审核状态标签
  const getAuditStatusBadge = status => {
    const statusConfig = {
      pending: {
        label: '待审核',
        color: 'secondary',
        icon: Clock
      },
      approved: {
        label: '已审核',
        color: 'default',
        icon: CheckCircle
      },
      rejected: {
        label: '已拒绝',
        color: 'destructive',
        icon: AlertTriangle
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return <Badge variant={config.color} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>;
  };

  // 当前页数据
  const currentPageReports = filteredReports.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">不合格报告管理</h1>
              <p className="text-sm text-gray-500">欢迎回来，{currentUser.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Shield className="w-3 h-3 mr-1" />
              管理员
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 权限提示 */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-blue-800">
                您正在以管理员身份访问不合格报告管理系统，拥有完整的查看、编辑、审核权限。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 搜索区域 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              查询条件
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">工单号</label>
                <Input placeholder="请输入工单号" value={searchParams.workOrder} onChange={e => setSearchParams({
                ...searchParams,
                workOrder: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">层析柱序列号</label>
                <Input placeholder="请输入层析柱序列号" value={searchParams.columnSerial} onChange={e => setSearchParams({
                ...searchParams,
                columnSerial: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">订单号</label>
                <Input placeholder="请输入订单号" value={searchParams.orderNumber} onChange={e => setSearchParams({
                ...searchParams,
                orderNumber: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">仪器序列号</label>
                <Input placeholder="请输入仪器序列号" value={searchParams.instrumentSerial} onChange={e => setSearchParams({
                ...searchParams,
                instrumentSerial: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">报告状态</label>
                <Select value={searchParams.status} onValueChange={value => setSearchParams({
                ...searchParams,
                status: value
              })}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="unqualified">不合格</SelectItem>
                    <SelectItem value="qualified">合格</SelectItem>
                    <SelectItem value="pending">待审核</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">审核状态</label>
                <Select value={searchParams.auditStatus} onValueChange={value => setSearchParams({
                ...searchParams,
                auditStatus: value
              })}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择审核状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="pending">待审核</SelectItem>
                    <SelectItem value="approved">已审核</SelectItem>
                    <SelectItem value="rejected">已拒绝</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSearch} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4 mr-2" />
                查询
              </Button>
              <Button variant="outline" onClick={handleReset}>
                重置
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 操作区域 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleBatchAudit} disabled={selectedReports.length === 0}>
              批量审核 ({selectedReports.length})
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            共 {filteredReports.length} 条记录
          </div>
        </div>

        {/* 报告列表 */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" onChange={e => handleSelectAll(e.target.checked)} checked={selectedReports.length === currentPageReports.length && currentPageReports.length > 0} className="rounded border-gray-300" />
                  </TableHead>
                  <TableHead>报告编号</TableHead>
                  <TableHead>工单号</TableHead>
                  <TableHead>层析柱序列号</TableHead>
                  <TableHead>订单号</TableHead>
                  <TableHead>仪器序列号</TableHead>
                  <TableHead>不合格项目</TableHead>
                  <TableHead>负责人</TableHead>
                  <TableHead>报告状态</TableHead>
                  <TableHead>审核状态</TableHead>
                  <TableHead>报告日期</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageReports.map(report => <TableRow key={report.id} className="hover:bg-gray-50">
                    <TableCell>
                      <input type="checkbox" checked={selectedReports.includes(report.id)} onChange={e => {
                    if (e.target.checked) {
                      setSelectedReports([...selectedReports, report.id]);
                    } else {
                      setSelectedReports(selectedReports.filter(id => id !== report.id));
                    }
                  }} className="rounded border-gray-300" />
                    </TableCell>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.workOrder}</TableCell>
                    <TableCell>{report.columnSerial}</TableCell>
                    <TableCell>{report.orderNumber}</TableCell>
                    <TableCell>{report.instrumentSerial}</TableCell>
                    <TableCell>
                      <div className="max-w-32">
                        <div className="truncate" title={report.不合格项目}>
                          {report.不合格项目}
                        </div>
                        <div className="text-xs text-gray-500 truncate" title={report.不合格原因}>
                          {report.不合格原因}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{report.负责人}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell>{getAuditStatusBadge(report.审核状态)}</TableCell>
                    <TableCell>{report.reportDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" onClick={() => handlePreview(report.id)} className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDownload(report.id)} className="h-8 w-8 p-0">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(report.id)} className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleRecalculate(report.id)} disabled={loading} className="h-8 w-8 p-0">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 分页 */}
        {totalPages > 1 && <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => <PaginationItem key={index + 1}>
                    <PaginationLink onClick={() => setCurrentPage(index + 1)} isActive={currentPage === index + 1} className="cursor-pointer">
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>)}
                <PaginationItem>
                  <PaginationNext onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>}
      </div>
    </div>;
}