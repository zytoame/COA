// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, Download, Eye, FileText, Calendar, User, ArrowLeft, Filter, Plus, BarChart3, CheckCircle, Clock, Loader2, FileCheck } from 'lucide-react';

// 模拟合格报告数据
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
  reportName: '质量检测报告_20250115',
  generateTime: '2025-01-15 14:30:00'
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
  reportName: '稳定性测试报告_20250114',
  generateTime: '2025-01-14 16:45:00'
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
  reportName: '纯度分析报告_20250113',
  generateTime: '2025-01-13 11:20:00'
}, {
  id: 'RPT-Q004',
  workOrder: 'WO202501004',
  columnSerial: 'COL-2025-004',
  orderNumber: 'ORD-202501004',
  instrumentSerial: 'INST-003',
  reportType: 'quality',
  status: 'qualified',
  reportDate: '2025-01-12',
  检测项目: '质量检测',
  检测结果: '合格',
  负责人: '赵六',
  审核状态: 'approved',
  fileSize: '1.9MB',
  reportName: '质量检测报告_20250112',
  generateTime: '2025-01-12 09:15:00'
}, {
  id: 'RPT-Q005',
  workOrder: 'WO202501005',
  columnSerial: 'COL-2025-005',
  orderNumber: 'ORD-202501005',
  instrumentSerial: 'INST-002',
  reportType: 'stability',
  status: 'qualified',
  reportDate: '2025-01-11',
  检测项目: '稳定性测试',
  检测结果: '合格',
  负责人: '张三',
  审核状态: 'approved',
  fileSize: '2.5MB',
  reportName: '稳定性测试报告_20250111',
  generateTime: '2025-01-11 15:30:00'
}];
export default function QueryReportsPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();

  // 状态管理
  const [qualifiedReports, setQualifiedReports] = useState(mockQualifiedReports);
  const [filteredReports, setFilteredReports] = useState(mockQualifiedReports);
  const [generating, setGenerating] = useState(false);
  const [selectedReports, setSelectedReports] = useState([]);

  // 搜索条件
  const [searchParams, setSearchParams] = useState({
    workOrder: '',
    columnSerial: '',
    orderNumber: '',
    instrumentSerial: '',
    reportType: 'all',
    dateRange: 'all'
  });

  // 当前用户信息
  const currentUser = {
    name: '管理员',
    type: 'admin'
  };

  // 搜索功能
  const handleSearch = () => {
    const filtered = qualifiedReports.filter(report => {
      return (!searchParams.workOrder || report.workOrder.toLowerCase().includes(searchParams.workOrder.toLowerCase())) && (!searchParams.columnSerial || report.columnSerial.toLowerCase().includes(searchParams.columnSerial.toLowerCase())) && (!searchParams.orderNumber || report.orderNumber.toLowerCase().includes(searchParams.orderNumber.toLowerCase())) && (!searchParams.instrumentSerial || report.instrumentSerial.toLowerCase().includes(searchParams.instrumentSerial.toLowerCase())) && (searchParams.reportType === 'all' || report.reportType === searchParams.reportType);
    });
    setFilteredReports(filtered);
    toast({
      title: "查询完成",
      description: `找到 ${filtered.length} 条合格报告`
    });
  };

  // 重置搜索
  const handleReset = () => {
    setSearchParams({
      workOrder: '',
      columnSerial: '',
      orderNumber: '',
      instrumentSerial: '',
      reportType: 'all',
      dateRange: 'all'
    });
    setFilteredReports(qualifiedReports);
  };

  // 生成报告
  const handleGenerateReport = async () => {
    if (!searchParams.workOrder && !searchParams.columnSerial && !searchParams.orderNumber && !searchParams.instrumentSerial) {
      toast({
        title: "查询条件不足",
        description: "请至少输入一个查询条件",
        variant: "destructive"
      });
      return;
    }
    setGenerating(true);
    try {
      // 模拟报告生成过程
      await new Promise(resolve => setTimeout(resolve, 3000));
      const newReport = {
        id: `RPT-Q-${Date.now()}`,
        workOrder: searchParams.workOrder || 'WO' + Date.now(),
        columnSerial: searchParams.columnSerial || 'COL-' + Date.now(),
        orderNumber: searchParams.orderNumber || 'ORD-' + Date.now(),
        instrumentSerial: searchParams.instrumentSerial || 'INST-' + Math.floor(Math.random() * 1000),
        reportType: searchParams.reportType === 'all' ? 'quality' : searchParams.reportType,
        status: 'qualified',
        reportDate: new Date().toISOString().slice(0, 10),
        检测项目: getReportTypeName(searchParams.reportType),
        检测结果: '合格',
        负责人: currentUser.name,
        审核状态: 'approved',
        fileSize: (Math.random() * 3 + 0.5).toFixed(1) + 'MB',
        reportName: `${getReportTypeName(searchParams.reportType)}报告_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`,
        generateTime: new Date().toLocaleString('zh-CN')
      };
      setQualifiedReports([newReport, ...qualifiedReports]);
      setFilteredReports([newReport, ...filteredReports]);
      toast({
        title: "报告生成成功",
        description: `报告 ${newReport.id} 已生成，请查看报告列表`
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
    const report = qualifiedReports.find(r => r.id === reportId);
    if (report) {
      toast({
        title: "预览报告",
        description: `正在预览报告 ${reportId}，请查看详细信息`
      });
    }
  };

  // 下载报告
  const handleDownload = reportId => {
    const report = qualifiedReports.find(r => r.id === reportId);
    if (report) {
      toast({
        title: "下载报告",
        description: `正在下载报告 ${reportId}，请稍候`
      });

      // 模拟下载过程
      setTimeout(() => {
        toast({
          title: "下载完成",
          description: `报告 ${reportId} 已下载到本地`
        });
      }, 2000);
    }
  };

  // 批量下载
  const handleBatchDownload = () => {
    if (selectedReports.length === 0) {
      toast({
        title: "请选择报告",
        description: "请先选择要下载的报告",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "批量下载",
      description: `正在下载 ${selectedReports.length} 份报告，请稍候`
    });

    // 模拟批量下载过程
    setTimeout(() => {
      toast({
        title: "批量下载完成",
        description: `${selectedReports.length} 份报告已下载完成`
      });
      setSelectedReports([]);
    }, 3000);
  };

  // 选择/取消选择报告
  const handleSelectReport = reportId => {
    if (selectedReports.includes(reportId)) {
      setSelectedReports(selectedReports.filter(id => id !== reportId));
    } else {
      setSelectedReports([...selectedReports, reportId]);
    }
  };

  // 全选/取消全选
  const handleSelectAll = checked => {
    if (checked) {
      setSelectedReports(filteredReports.map(report => report.id));
    } else {
      setSelectedReports([]);
    }
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

  // 获取报告类型标签
  const getReportTypeBadge = type => {
    const typeConfig = {
      quality: {
        label: '质量检测',
        color: 'blue'
      },
      stability: {
        label: '稳定性测试',
        color: 'green'
      },
      purity: {
        label: '纯度分析',
        color: 'purple'
      }
    };
    const config = typeConfig[type] || typeConfig.quality;
    return <Badge variant="outline" className={`bg-${config.color}-50 text-${config.color}-700 border-${config.color}-200`}>
        {config.label}
      </Badge>;
  };

  // 返回主页
  const handleBackToMain = () => {
    $w.utils.navigateTo({
      pageId: 'main',
      params: {}
    });
  };
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={handleBackToMain} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回主页
            </Button>
            <Search className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">查询报告</h1>
              <p className="text-sm text-gray-500">查询和生成各类检测报告</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <User className="w-3 h-3 mr-1" />
              {currentUser.type === 'admin' ? '管理员' : '客户'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 统计概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">总报告数</p>
                  <p className="text-2xl font-bold">{qualifiedReports.length}</p>
                </div>
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">今日生成</p>
                  <p className="text-2xl font-bold text-green-600">3</p>
                </div>
                <Plus className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">本周生成</p>
                  <p className="text-2xl font-bold text-blue-600">12</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">已下载</p>
                  <p className="text-2xl font-bold text-purple-600">28</p>
                </div>
                <Download className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

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
                <label className="block text-sm font-medium text-gray-700 mb-1">报告类型</label>
                <Select value={searchParams.reportType} onValueChange={value => setSearchParams({
                ...searchParams,
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">时间范围</label>
                <Select value={searchParams.dateRange} onValueChange={value => setSearchParams({
                ...searchParams,
                dateRange: value
              })}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择时间范围" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部时间</SelectItem>
                    <SelectItem value="today">今天</SelectItem>
                    <SelectItem value="week">本周</SelectItem>
                    <SelectItem value="month">本月</SelectItem>
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
                    <Plus className="w-4 h-4 mr-2" />
                    生成报告
                  </>}
              </Button>
              <Button variant="outline" onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                查询
              </Button>
              <Button variant="outline" onClick={handleReset}>
                重置
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 批量操作 */}
        {selectedReports.length > 0 && <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    已选择 {selectedReports.length} 份报告
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedReports([])}>
                    取消选择
                  </Button>
                  <Button size="sm" onClick={handleBatchDownload} className="bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    批量下载
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>}

        {/* 报告列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                合格报告列表
              </span>
              <div className="text-sm text-gray-500">
                共 {filteredReports.length} 份报告
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" checked={selectedReports.length === filteredReports.length && filteredReports.length > 0} onChange={e => handleSelectAll(e.target.checked)} className="rounded border-gray-300" />
                  </TableHead>
                  <TableHead>报告编号</TableHead>
                  <TableHead>报告名称</TableHead>
                  <TableHead>工单号</TableHead>
                  <TableHead>层析柱序列号</TableHead>
                  <TableHead>检测项目</TableHead>
                  <TableHead>报告类型</TableHead>
                  <TableHead>检测结果</TableHead>
                  <TableHead>负责人</TableHead>
                  <TableHead>生成时间</TableHead>
                  <TableHead>文件大小</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map(report => <TableRow key={report.id} className="hover:bg-gray-50">
                    <TableCell>
                      <input type="checkbox" checked={selectedReports.includes(report.id)} onChange={() => handleSelectReport(report.id)} className="rounded border-gray-300" />
                    </TableCell>
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
                    <TableCell>{getReportTypeBadge(report.reportType)}</TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                        {report.检测结果}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.负责人}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {report.generateTime}
                      </div>
                    </TableCell>
                    <TableCell>{report.fileSize}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" onClick={() => handlePreview(report.id)} className="h-8 w-8 p-0" title="预览报告">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDownload(report.id)} className="h-8 w-8 p-0" title="下载报告">
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
        {filteredReports.length === 0 && <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无报告</h3>
              <p className="text-gray-500 mb-4">请输入查询条件并生成报告</p>
              <Button onClick={handleGenerateReport} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                生成新报告
              </Button>
            </CardContent>
          </Card>}
      </div>
    </div>;
}