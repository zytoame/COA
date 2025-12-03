// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, Edit, RefreshCw, Download, Eye, Filter, FileText, AlertTriangle, CheckCircle, Clock, Shield, User, Calendar, PenTool, Loader2 } from 'lucide-react';

// 模拟合格报告数据（只有合格的层析柱才会生成报告）
const mockQualifiedReports = [{
  id: 'RPT-Q001',
  workOrder: 'WO202501001',
  columnSerial: 'COL-2025-001',
  orderNumber: 'ORD-202501001',
  instrumentSerial: 'INST-001',
  reportType: 'quality',
  status: 'qualified',
  reportDate: '2025-01-15',
  检测项目: '纯度检测',
  检测结果: '合格',
  负责人: '张三',
  审核状态: 'approved',
  fileSize: '2.3MB',
  reportName: '质量检测报告_20250115'
}, {
  id: 'RPT-Q002',
  workOrder: 'WO202501002',
  columnSerial: 'COL-2025-002',
  orderNumber: 'ORD-202501002',
  instrumentSerial: 'INST-002',
  reportType: 'stability',
  status: 'qualified',
  reportDate: '2025-01-14',
  检测项目: '稳定性测试',
  检测结果: '合格',
  负责人: '李四',
  审核状态: 'approved',
  fileSize: '1.8MB',
  reportName: '稳定性测试报告_20250114'
}, {
  id: 'RPT-Q003',
  workOrder: 'WO202501003',
  columnSerial: 'COL-2025-003',
  orderNumber: 'ORD-202501003',
  instrumentSerial: 'INST-001',
  reportType: 'purity',
  status: 'qualified',
  reportDate: '2025-01-13',
  检测项目: '纯度分析',
  检测结果: '合格',
  负责人: '王五',
  审核状态: 'approved',
  fileSize: '2.1MB',
  reportName: '纯度分析报告_20250113'
}];

// 模拟不合格报告数据（管理员专用）
const mockUnqualifiedReports = [{
  id: 'RPT-U001',
  workOrder: 'WO202501004',
  columnSerial: 'COL-2025-004',
  orderNumber: 'ORD-202501004',
  instrumentSerial: 'INST-003',
  status: 'unqualified',
  reportDate: '2025-01-12',
  不合格项目: '溶解度测试',
  不合格原因: '溶解度不达标',
  负责人: '赵六',
  审核状态: 'pending'
}, {
  id: 'RPT-U002',
  workOrder: 'WO202501005',
  columnSerial: 'COL-2025-005',
  orderNumber: 'ORD-202501005',
  instrumentSerial: 'INST-002',
  status: 'unqualified',
  reportDate: '2025-01-11',
  不合格项目: 'pH值检测',
  不合格原因: 'pH值超出范围',
  负责人: '张三',
  审核状态: 'pending'
}];

// 模拟待审核层析柱数据（管理员专用）
const mockPendingColumns = [{
  id: 'COL-001',
  workOrder: 'WO202501006',
  columnSerial: 'COL-2025-006',
  orderNumber: 'ORD-202501006',
  instrumentSerial: 'INST-001',
  columnName: 'Protein A Column',
  testType: '纯度检测',
  testDate: '2025-01-15',
  testResult: '不合格',
  不合格原因: '纯度低于标准值',
  operator: '张三',
  submitTime: '2025-01-15 14:30:00',
  priority: 'high'
}];
export default function MainPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // 当前用户信息
  const currentUser = {
    name: '管理员',
    type: 'admin'
  };

  // 管理员状态
  const [activeTab, setActiveTab] = useState('reports'); // reports, query, audit
  const [unqualifiedReports, setUnqualifiedReports] = useState(mockUnqualifiedReports);
  const [filteredUnqualifiedReports, setFilteredUnqualifiedReports] = useState(mockUnqualifiedReports);
  const [pendingColumns, setPendingColumns] = useState(mockPendingColumns);
  const [filteredPendingColumns, setFilteredPendingColumns] = useState(mockPendingColumns);
  const [selectedReports, setSelectedReports] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [signing, setSigning] = useState(false);
  const [auditComment, setAuditComment] = useState('');
  const [auditAction, setAuditAction] = useState('approve');

  // 客户状态
  const [qualifiedReports, setQualifiedReports] = useState(mockQualifiedReports);
  const [filteredQualifiedReports, setFilteredQualifiedReports] = useState(mockQualifiedReports);
  const [generating, setGenerating] = useState(false);

  // 搜索条件 - 管理员
  const [adminSearchParams, setAdminSearchParams] = useState({
    workOrder: '',
    columnSerial: '',
    orderNumber: '',
    instrumentSerial: '',
    status: 'all',
    auditStatus: 'all'
  });

  // 搜索条件 - 客户
  const [customerSearchParams, setCustomerSearchParams] = useState({
    workOrder: '',
    columnSerial: '',
    orderNumber: '',
    instrumentSerial: '',
    reportType: 'all',
    dateRange: 'all'
  });

  // 待审核搜索条件
  const [auditSearchParams, setAuditSearchParams] = useState({
    workOrder: '',
    columnSerial: '',
    orderNumber: '',
    instrumentSerial: '',
    testType: 'all',
    priority: 'all'
  });

  // 分页
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // 管理员搜索功能
  const handleAdminSearch = () => {
    setLoading(true);
    setTimeout(() => {
      if (activeTab === 'reports') {
        const filtered = unqualifiedReports.filter(report => {
          return (!adminSearchParams.workOrder || report.workOrder.toLowerCase().includes(adminSearchParams.workOrder.toLowerCase())) && (!adminSearchParams.columnSerial || report.columnSerial.toLowerCase().includes(adminSearchParams.columnSerial.toLowerCase())) && (!adminSearchParams.orderNumber || report.orderNumber.toLowerCase().includes(adminSearchParams.orderNumber.toLowerCase())) && (!adminSearchParams.instrumentSerial || report.instrumentSerial.toLowerCase().includes(adminSearchParams.instrumentSerial.toLowerCase())) && (adminSearchParams.status === 'all' || report.status === adminSearchParams.status) && (adminSearchParams.auditStatus === 'all' || report.审核状态 === adminSearchParams.auditStatus);
        });
        setFilteredUnqualifiedReports(filtered);
      } else if (activeTab === 'audit') {
        const filtered = pendingColumns.filter(column => {
          return (!auditSearchParams.workOrder || column.workOrder.toLowerCase().includes(auditSearchParams.workOrder.toLowerCase())) && (!auditSearchParams.columnSerial || column.columnSerial.toLowerCase().includes(auditSearchParams.columnSerial.toLowerCase())) && (!auditSearchParams.orderNumber || column.orderNumber.toLowerCase().includes(auditSearchParams.orderNumber.toLowerCase())) && (!auditSearchParams.instrumentSerial || column.instrumentSerial.toLowerCase().includes(auditSearchParams.instrumentSerial.toLowerCase())) && (auditSearchParams.testType === 'all' || column.testType === auditSearchParams.testType) && (auditSearchParams.priority === 'all' || column.priority === auditSearchParams.priority);
        });
        setFilteredPendingColumns(filtered);
      }
      setCurrentPage(1);
      setLoading(false);
      toast({
        title: "查询完成",
        description: `找到 ${activeTab === 'reports' ? filteredUnqualifiedReports.length : filteredPendingColumns.length} 条记录`
      });
    }, 500);
  };

  // 客户搜索功能
  const handleCustomerSearch = () => {
    const filtered = qualifiedReports.filter(report => {
      return (!customerSearchParams.workOrder || report.workOrder.toLowerCase().includes(customerSearchParams.workOrder.toLowerCase())) && (!customerSearchParams.columnSerial || report.columnSerial.toLowerCase().includes(customerSearchParams.columnSerial.toLowerCase())) && (!customerSearchParams.orderNumber || report.orderNumber.toLowerCase().includes(customerSearchParams.orderNumber.toLowerCase())) && (!customerSearchParams.instrumentSerial || report.instrumentSerial.toLowerCase().includes(customerSearchParams.instrumentSerial.toLowerCase())) && (customerSearchParams.reportType === 'all' || report.reportType === customerSearchParams.reportType);
    });
    setFilteredQualifiedReports(filtered);
    toast({
      title: "查询完成",
      description: `找到 ${filtered.length} 条合格报告`
    });
  };

  // 生成报告（客户功能）
  const handleGenerateReport = async () => {
    if (!customerSearchParams.workOrder && !customerSearchParams.columnSerial && !customerSearchParams.orderNumber && !customerSearchParams.instrumentSerial) {
      toast({
        title: "查询条件不足",
        description: "请至少输入一个查询条件",
        variant: "destructive"
      });
      return;
    }
    setGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const newReport = {
        id: `RPT-Q-${Date.now()}`,
        workOrder: customerSearchParams.workOrder || 'WO' + Date.now(),
        columnSerial: customerSearchParams.columnSerial || 'COL-' + Date.now(),
        orderNumber: customerSearchParams.orderNumber || 'ORD-' + Date.now(),
        instrumentSerial: customerSearchParams.instrumentSerial || 'INST-' + Math.floor(Math.random() * 1000),
        reportType: customerSearchParams.reportType === 'all' ? 'quality' : customerSearchParams.reportType,
        status: 'qualified',
        reportDate: new Date().toISOString().slice(0, 10),
        检测项目: getReportTypeName(customerSearchParams.reportType),
        检测结果: '合格',
        负责人: '系统',
        审核状态: 'approved',
        fileSize: (Math.random() * 3 + 0.5).toFixed(1) + 'MB',
        reportName: `${getReportTypeName(customerSearchParams.reportType)}报告_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`
      };
      setQualifiedReports([newReport, ...qualifiedReports]);
      setFilteredQualifiedReports([newReport, ...filteredQualifiedReports]);
      toast({
        title: "报告生成成功",
        description: `报告 ${newReport.id} 已生成`
      });
    } catch (error) {
      toast({
        title: "报告生成失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
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

  // 获取报告类型名称
  const getReportTypeName = type => {
    const typeMap = {
      quality: '质量检测',
      stability: '稳定性测试',
      purity: '纯度分析',
      all: '综合'
    };
    return typeMap[type] || '质量检测';
  };

  // 获取状态标签
  const getStatusBadge = status => {
    const statusConfig = {
      qualified: {
        label: '合格',
        color: 'default'
      },
      unqualified: {
        label: '不合格',
        color: 'destructive'
      },
      pending: {
        label: '待审核',
        color: 'secondary'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge variant={config.color}>{config.label}</Badge>;
  };

  // 获取优先级标签
  const getPriorityBadge = priority => {
    const priorityConfig = {
      high: {
        label: '高',
        color: 'destructive'
      },
      medium: {
        label: '中',
        color: 'secondary'
      },
      low: {
        label: '低',
        color: 'outline'
      }
    };
    const config = priorityConfig[priority] || priorityConfig.medium;
    return <Badge variant={config.color}>{config.label}</Badge>;
  };

  // 签名板功能
  const startDrawing = e => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };
  const draw = e => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // 批量审核
  const handleBatchAudit = () => {
    if (selectedColumns.length === 0) {
      toast({
        title: "请选择待审核项目",
        description: "请先选择需要审核的层析柱",
        variant: "destructive"
      });
      return;
    }
    setShowSignaturePad(true);
  };

  // 确认审核
  const confirmAudit = async () => {
    const canvas = canvasRef.current;
    if (isCanvasEmpty(canvas)) {
      toast({
        title: "请签名",
        description: "请在签名板上签名确认",
        variant: "destructive"
      });
      return;
    }
    setSigning(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const updatedColumns = pendingColumns.filter(column => !selectedColumns.includes(column.id));
      setPendingColumns(updatedColumns);
      setFilteredPendingColumns(updatedColumns);
      setSelectedColumns([]);
      toast({
        title: "审核完成",
        description: `已${auditAction === 'approve' ? '通过' : '拒绝'} ${selectedColumns.length} 个层析柱的审核`
      });
      setShowSignaturePad(false);
      clearSignature();
      setAuditComment('');
    } catch (error) {
      toast({
        title: "审核失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSigning(false);
    }
  };

  // 检查画布是否为空
  const isCanvasEmpty = canvas => {
    const ctx = canvas.getContext('2d');
    const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let i = 3; i < pixelData.length; i += 4) {
      if (pixelData[i] !== 0) return false;
    }
    return true;
  };

  // 当前页数据
  const getCurrentPageData = () => {
    let data = [];
    if (currentUser.type === 'admin') {
      if (activeTab === 'reports') {
        data = filteredUnqualifiedReports;
      } else if (activeTab === 'audit') {
        data = filteredPendingColumns;
      }
    } else {
      data = filteredQualifiedReports;
    }
    return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  };
  const totalPages = Math.ceil(currentUser.type === 'admin' ? activeTab === 'reports' ? filteredUnqualifiedReports.length : filteredPendingColumns.length : filteredQualifiedReports.length / pageSize);

  // 管理员界面
  if (currentUser.type === 'admin') {
    return <div style={style} className="min-h-screen bg-gray-50">
        {/* 顶部导航 */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">报告管理系统</h1>
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

        {/* 标签页导航 */}
        <div className="bg-white border-b border-gray-200 px-6">
          <div className="flex space-x-8">
            <button onClick={() => setActiveTab('reports')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reports' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              不合格报告管理
            </button>
            <button onClick={() => setActiveTab('query')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'query' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              查询报告
            </button>
            <button onClick={() => setActiveTab('audit')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'audit' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              批量审核签字
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* 不合格报告管理 */}
          {activeTab === 'reports' && <div>
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
                      <Input placeholder="请输入工单号" value={adminSearchParams.workOrder} onChange={e => setAdminSearchParams({
                    ...adminSearchParams,
                    workOrder: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">层析柱序列号</label>
                      <Input placeholder="请输入层析柱序列号" value={adminSearchParams.columnSerial} onChange={e => setAdminSearchParams({
                    ...adminSearchParams,
                    columnSerial: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">订单号</label>
                      <Input placeholder="请输入订单号" value={adminSearchParams.orderNumber} onChange={e => setAdminSearchParams({
                    ...adminSearchParams,
                    orderNumber: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">仪器序列号</label>
                      <Input placeholder="请输入仪器序列号" value={adminSearchParams.instrumentSerial} onChange={e => setAdminSearchParams({
                    ...adminSearchParams,
                    instrumentSerial: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">报告状态</label>
                      <Select value={adminSearchParams.status} onValueChange={value => setAdminSearchParams({
                    ...adminSearchParams,
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
                      <Select value={adminSearchParams.auditStatus} onValueChange={value => setAdminSearchParams({
                    ...adminSearchParams,
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
                    <Button onClick={handleAdminSearch} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                      <Search className="w-4 h-4 mr-2" />
                      查询
                    </Button>
                    <Button variant="outline" onClick={() => {
                  setAdminSearchParams({
                    workOrder: '',
                    columnSerial: '',
                    orderNumber: '',
                    instrumentSerial: '',
                    status: 'all',
                    auditStatus: 'all'
                  });
                  setFilteredUnqualifiedReports(unqualifiedReports);
                }}>
                      重置
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 报告列表 */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
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
                      {getCurrentPageData().map(report => <TableRow key={report.id} className="hover:bg-gray-50">
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
                          <TableCell>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              待审核
                            </Badge>
                          </TableCell>
                          <TableCell>{report.reportDate}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button size="sm" variant="outline" onClick={() => handlePreview(report.id)} className="h-8 w-8 p-0">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDownload(report.id)} className="h-8 w-8 p-0">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => toast({
                          title: "编辑功能",
                          description: `正在编辑报告 ${report.id}`
                        })} className="h-8 w-8 p-0">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => toast({
                          title: "重新计算",
                          description: `正在重新计算报告 ${report.id}`
                        })} className="h-8 w-8 p-0">
                                <RefreshCw className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>}

          {/* 查询报告 */}
          {activeTab === 'query' && <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    查询条件
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">工单号</label>
                      <Input placeholder="请输入工单号" value={customerSearchParams.workOrder} onChange={e => setCustomerSearchParams({
                    ...customerSearchParams,
                    workOrder: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">层析柱序列号</label>
                      <Input placeholder="请输入层析柱序列号" value={customerSearchParams.columnSerial} onChange={e => setCustomerSearchParams({
                    ...customerSearchParams,
                    columnSerial: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">订单号</label>
                      <Input placeholder="请输入订单号" value={customerSearchParams.orderNumber} onChange={e => setCustomerSearchParams({
                    ...customerSearchParams,
                    orderNumber: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">仪器序列号</label>
                      <Input placeholder="请输入仪器序列号" value={customerSearchParams.instrumentSerial} onChange={e => setCustomerSearchParams({
                    ...customerSearchParams,
                    instrumentSerial: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">报告类型</label>
                      <Select value={customerSearchParams.reportType} onValueChange={value => setCustomerSearchParams({
                    ...customerSearchParams,
                    reportType: value
                  })}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择报告类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">全部类型</SelectItem>
                          <SelectItem value="quality">质量检测报告</SelectItem>
                          <SelectItem value="stability">稳定性测试报告</SelectItem>
                          <SelectItem value="purity">纯度分析报告</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleGenerateReport} disabled={generating} className="bg-green-600 hover:bg-green-700">
                      {generating ? <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          生成中...
                        </> : <>
                          <FileText className="w-4 h-4 mr-2" />
                          生成报告
                        </>}
                    </Button>
                    <Button variant="outline" onClick={handleCustomerSearch}>
                      <Search className="w-4 h-4 mr-2" />
                      查询
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 合格报告列表 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      合格报告列表
                    </span>
                    <div className="text-sm text-gray-500">
                      共 {qualifiedReports.length} 份报告
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>报告编号</TableHead>
                        <TableHead>报告名称</TableHead>
                        <TableHead>工单号</TableHead>
                        <TableHead>层析柱序列号</TableHead>
                        <TableHead>检测项目</TableHead>
                        <TableHead>检测结果</TableHead>
                        <TableHead>报告日期</TableHead>
                        <TableHead>文件大小</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {qualifiedReports.map(report => <TableRow key={report.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>
                            <div className="max-w-48">
                              <div className="truncate" title={report.reportName}>
                                {report.reportName}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{report.workOrder}</TableCell>
                          <TableCell>{report.columnSerial}</TableCell>
                          <TableCell>{report.检测项目}</TableCell>
                          <TableCell>
                            <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                              {report.检测结果}
                            </Badge>
                          </TableCell>
                          <TableCell>{report.reportDate}</TableCell>
                          <TableCell>{report.fileSize}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button size="sm" variant="outline" onClick={() => handlePreview(report.id)} className="h-8 w-8 p-0">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDownload(report.id)} className="h-8 w-8 p-0">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>}

          {/* 批量审核签字 */}
          {activeTab === 'audit' && <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    查询条件
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">工单号</label>
                      <Input placeholder="请输入工单号" value={auditSearchParams.workOrder} onChange={e => setAuditSearchParams({
                    ...auditSearchParams,
                    workOrder: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">层析柱序列号</label>
                      <Input placeholder="请输入层析柱序列号" value={auditSearchParams.columnSerial} onChange={e => setAuditSearchParams({
                    ...auditSearchParams,
                    columnSerial: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">订单号</label>
                      <Input placeholder="请输入订单号" value={auditSearchParams.orderNumber} onChange={e => setAuditSearchParams({
                    ...auditSearchParams,
                    orderNumber: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">仪器序列号</label>
                      <Input placeholder="请输入仪器序列号" value={auditSearchParams.instrumentSerial} onChange={e => setAuditSearchParams({
                    ...auditSearchParams,
                    instrumentSerial: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">检测类型</label>
                      <Select value={auditSearchParams.testType} onValueChange={value => setAuditSearchParams({
                    ...auditSearchParams,
                    testType: value
                  })}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择检测类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">全部类型</SelectItem>
                          <SelectItem value="纯度检测">纯度检测</SelectItem>
                          <SelectItem value="pH值检测">pH值检测</SelectItem>
                          <SelectItem value="杂质含量">杂质含量</SelectItem>
                          <SelectItem value="溶解度测试">溶解度测试</SelectItem>
                          <SelectItem value="稳定性测试">稳定性测试</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">优先级</label>
                      <Select value={auditSearchParams.priority} onValueChange={value => setAuditSearchParams({
                    ...auditSearchParams,
                    priority: value
                  })}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择优先级" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">全部优先级</SelectItem>
                          <SelectItem value="high">高</SelectItem>
                          <SelectItem value="medium">中</SelectItem>
                          <SelectItem value="low">低</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAdminSearch} className="bg-blue-600 hover:bg-blue-700">
                      <Search className="w-4 h-4 mr-2" />
                      查询
                    </Button>
                    <Button variant="outline" onClick={() => {
                  setAuditSearchParams({
                    workOrder: '',
                    columnSerial: '',
                    orderNumber: '',
                    instrumentSerial: '',
                    testType: 'all',
                    priority: 'all'
                  });
                  setFilteredPendingColumns(pendingColumns);
                }}>
                      重置
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 操作区域 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Button onClick={handleBatchAudit} disabled={selectedColumns.length === 0} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    批量审核 ({selectedColumns.length})
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  共 {filteredPendingColumns.length} 条待审核记录
                </div>
              </div>

              {/* 待审核列表 */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <input type="checkbox" onChange={e => {
                        if (e.target.checked) {
                          setSelectedColumns(filteredPendingColumns.map(column => column.id));
                        } else {
                          setSelectedColumns([]);
                        }
                      }} checked={selectedColumns.length === filteredPendingColumns.length && filteredPendingColumns.length > 0} className="rounded border-gray-300" />
                        </TableHead>
                        <TableHead>层析柱编号</TableHead>
                        <TableHead>工单号</TableHead>
                        <TableHead>层析柱名称</TableHead>
                        <TableHead>检测类型</TableHead>
                        <TableHead>检测日期</TableHead>
                        <TableHead>操作员</TableHead>
                        <TableHead>优先级</TableHead>
                        <TableHead>提交时间</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPendingColumns.map(column => <TableRow key={column.id} className="hover:bg-gray-50">
                          <TableCell>
                            <input type="checkbox" checked={selectedColumns.includes(column.id)} onChange={() => {
                        if (selectedColumns.includes(column.id)) {
                          setSelectedColumns(selectedColumns.filter(id => id !== column.id));
                        } else {
                          setSelectedColumns([...selectedColumns, column.id]);
                        }
                      }} className="rounded border-gray-300" />
                          </TableCell>
                          <TableCell className="font-medium">{column.columnSerial}</TableCell>
                          <TableCell>{column.workOrder}</TableCell>
                          <TableCell>
                            <div className="max-w-32">
                              <div className="truncate" title={column.columnName}>
                                {column.columnName}
                              </div>
                              <div className="text-xs text-gray-500">
                                {column.orderNumber}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{column.testType}</TableCell>
                          <TableCell>{column.testDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4 text-gray-400" />
                              {column.operator}
                            </div>
                          </TableCell>
                          <TableCell>{getPriorityBadge(column.priority)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              {column.submitTime}
                            </div>
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>}
        </div>

        {/* 分页 */}
        {totalPages > 1 && <div className="px-6 pb-6">
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

        {/* 签名弹窗 */}
        {showSignaturePad && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">电子签字确认</h3>
                <Button variant="outline" size="sm" onClick={() => setShowSignaturePad(false)}>
                  ×
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">审核操作</label>
                  <Select value={auditAction} onValueChange={setAuditAction}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approve">通过审核</SelectItem>
                      <SelectItem value="reject">拒绝审核</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">审核意见</label>
                  <textarea value={auditComment} onChange={e => setAuditComment(e.target.value)} placeholder="请输入审核意见..." className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">电子签名</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-2">
                    <canvas ref={canvasRef} width={600} height={200} className="border border-gray-200 rounded cursor-crosshair bg-white" onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} />
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-500">请在上方区域签名</p>
                    <Button variant="outline" size="sm" onClick={clearSignature}>
                      清除签名
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    即将{auditAction === 'approve' ? '通过' : '拒绝'} <span className="font-semibold text-blue-600">{selectedColumns.length}</span> 个层析柱的审核
                  </p>
                  <p className="text-sm text-gray-600">
                    审核人: <span className="font-semibold">{currentUser.name}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    审核时间: <span className="font-semibold">{new Date().toLocaleString('zh-CN')}</span>
                  </p>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowSignaturePad(false)}>
                    取消
                  </Button>
                  <Button onClick={confirmAudit} disabled={signing} className={auditAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}>
                    {signing ? <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        处理中...
                      </> : <>
                        <PenTool className="w-4 h-4 mr-2" />
                        确认{auditAction === 'approve' ? '通过' : '拒绝'}
                      </>}
                  </Button>
                </div>
              </div>
            </div>
          </div>}
      </div>;
  }

  // 客户界面
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">报告查询</h1>
              <p className="text-sm text-gray-500">欢迎回来，{currentUser.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <User className="w-3 h-3 mr-1" />
              客户
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 权限提示 */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-blue-800">
                您正在以客户身份访问报告查询系统，可以查看和下载合格的层析柱报告。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 查询条件 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              查询条件
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">工单号</label>
                <Input placeholder="请输入工单号" value={customerSearchParams.workOrder} onChange={e => setCustomerSearchParams({
                ...customerSearchParams,
                workOrder: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">层析柱序列号</label>
                <Input placeholder="请输入层析柱序列号" value={customerSearchParams.columnSerial} onChange={e => setCustomerSearchParams({
                ...customerSearchParams,
                columnSerial: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">订单号</label>
                <Input placeholder="请输入订单号" value={customerSearchParams.orderNumber} onChange={e => setCustomerSearchParams({
                ...customerSearchParams,
                orderNumber: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">仪器序列号</label>
                <Input placeholder="请输入仪器序列号" value={customerSearchParams.instrumentSerial} onChange={e => setCustomerSearchParams({
                ...customerSearchParams,
                instrumentSerial: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">报告类型</label>
                <Select value={customerSearchParams.reportType} onValueChange={value => setCustomerSearchParams({
                ...customerSearchParams,
                reportType: value
              })}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择报告类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类型</SelectItem>
                    <SelectItem value="quality">质量检测报告</SelectItem>
                    <SelectItem value="stability">稳定性测试报告</SelectItem>
                    <SelectItem value="purity">纯度分析报告</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleGenerateReport} disabled={generating} className="bg-green-600 hover:bg-green-700">
                {generating ? <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    生成中...
                  </> : <>
                    <FileText className="w-4 h-4 mr-2" />
                    生成报告
                  </>}
              </Button>
              <Button variant="outline" onClick={handleCustomerSearch}>
                <Search className="w-4 h-4 mr-2" />
                查询
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 合格报告列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                合格报告列表
              </span>
              <div className="text-sm text-gray-500">
                共 {qualifiedReports.length} 份报告
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>报告编号</TableHead>
                  <TableHead>报告名称</TableHead>
                  <TableHead>工单号</TableHead>
                  <TableHead>层析柱序列号</TableHead>
                  <TableHead>检测项目</TableHead>
                  <TableHead>检测结果</TableHead>
                  <TableHead>报告日期</TableHead>
                  <TableHead>文件大小</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQualifiedReports.map(report => <TableRow key={report.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>
                      <div className="max-w-48">
                        <div className="truncate" title={report.reportName}>
                          {report.reportName}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{report.workOrder}</TableCell>
                    <TableCell>{report.columnSerial}</TableCell>
                    <TableCell>{report.检测项目}</TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                        {report.检测结果}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.reportDate}</TableCell>
                    <TableCell>{report.fileSize}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" onClick={() => handlePreview(report.id)} className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDownload(report.id)} className="h-8 w-8 p-0">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 空状态 */}
        {filteredQualifiedReports.length === 0 && <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无报告</h3>
              <p className="text-gray-500 mb-4">请输入查询条件并生成报告</p>
            </CardContent>
          </Card>}
      </div>
    </div>;
}