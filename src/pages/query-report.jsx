// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, Download, Eye, FileText, Calendar, User, Package, Settings, CheckCircle, Clock, AlertCircle, Loader2 } from 'lucide-react';

// 模拟生成的报告数据
const mockGeneratedReports = [{
  id: 'GEN-RPT-001',
  workOrder: 'WO202501001',
  columnSerial: 'COL-2025-001',
  orderNumber: 'ORD-202501001',
  instrumentSerial: 'INST-001',
  reportType: 'quality',
  generateTime: '2025-01-15 14:30:00',
  status: 'completed',
  fileSize: '2.3MB',
  reportName: '质量检测报告_20250115'
}, {
  id: 'GEN-RPT-002',
  workOrder: 'WO202501002',
  columnSerial: 'COL-2025-002',
  orderNumber: 'ORD-202501002',
  instrumentSerial: 'INST-002',
  reportType: 'stability',
  generateTime: '2025-01-15 13:45:00',
  status: 'completed',
  fileSize: '1.8MB',
  reportName: '稳定性测试报告_20250115'
}, {
  id: 'GEN-RPT-003',
  workOrder: 'WO202501003',
  columnSerial: 'COL-2025-003',
  orderNumber: 'ORD-202501003',
  instrumentSerial: 'INST-001',
  reportType: 'purity',
  generateTime: '2025-01-15 12:20:00',
  status: 'generating',
  fileSize: '-',
  reportName: '纯度分析报告_20250115'
}];
export default function QueryReportPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [reports, setReports] = useState(mockGeneratedReports);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  // 查询条件
  const [queryParams, setQueryParams] = useState({
    workOrder: '',
    columnSerial: '',
    orderNumber: '',
    instrumentSerial: '',
    reportType: 'all',
    dateRange: 'all'
  });

  // 当前用户信息
  const currentUser =  {
    name: '管理员',
    type: 'admin'
  };

  // 生成报告
  const handleGenerateReport = async () => {
    if (!queryParams.workOrder && !queryParams.columnSerial && !queryParams.orderNumber && !queryParams.instrumentSerial) {
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
        id: `GEN-RPT-${Date.now()}`,
        workOrder: queryParams.workOrder || 'WO' + Date.now(),
        columnSerial: queryParams.columnSerial || 'COL-' + Date.now(),
        orderNumber: queryParams.orderNumber || 'ORD-' + Date.now(),
        instrumentSerial: queryParams.instrumentSerial || 'INST-' + Math.floor(Math.random() * 1000),
        reportType: queryParams.reportType === 'all' ? 'quality' : queryParams.reportType,
        generateTime: new Date().toLocaleString('zh-CN'),
        status: 'completed',
        fileSize: (Math.random() * 3 + 0.5).toFixed(1) + 'MB',
        reportName: `${getReportTypeName(queryParams.reportType)}报告_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`
      };
      setReports([newReport, ...reports]);
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
    const report = reports.find(r => r.id === reportId);
    if (report && report.status === 'completed') {
      toast({
        title: "预览报告",
        description: `正在预览报告 ${reportId}`
      });
    } else {
      toast({
        title: "报告未完成",
        description: "请等待报告生成完成后再预览",
        variant: "destructive"
      });
    }
  };

  // 下载报告
  const handleDownload = reportId => {
    const report = reports.find(r => r.id === reportId);
    if (report && report.status === 'completed') {
      toast({
        title: "下载报告",
        description: `正在下载报告 ${reportId}`
      });
    } else {
      toast({
        title: "报告未完成",
        description: "请等待报告生成完成后再下载",
        variant: "destructive"
      });
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
    return typeMap[type] || '未知';
  };

  // 获取状态标签
  const getStatusBadge = status => {
    const statusConfig = {
      completed: {
        label: '已完成',
        color: 'default',
        icon: CheckCircle
      },
      generating: {
        label: '生成中',
        color: 'secondary',
        icon: Loader2
      },
      failed: {
        label: '失败',
        color: 'destructive',
        icon: AlertCircle
      }
    };
    const config = statusConfig[status] || statusConfig.generating;
    const Icon = config.icon;
    return <Badge variant={config.color} className="flex items-center gap-1">
        {status === 'generating' && <Icon className="w-3 h-3 animate-spin" />}
        {status !== 'generating' && <Icon className="w-3 h-3" />}
        {config.label}
      </Badge>;
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
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">查询报告</h1>
              <p className="text-sm text-gray-500">生成和管理各类检测报告</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {currentUser.type === 'admin' ? '管理员' : '客户'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 查询条件区域 */}
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
                <Input placeholder="请输入工单号" value={queryParams.workOrder} onChange={e => setQueryParams({
                ...queryParams,
                workOrder: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">层析柱序列号</label>
                <Input placeholder="请输入层析柱序列号" value={queryParams.columnSerial} onChange={e => setQueryParams({
                ...queryParams,
                columnSerial: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">订单号</label>
                <Input placeholder="请输入订单号" value={queryParams.orderNumber} onChange={e => setQueryParams({
                ...queryParams,
                orderNumber: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">仪器序列号</label>
                <Input placeholder="请输入仪器序列号" value={queryParams.instrumentSerial} onChange={e => setQueryParams({
                ...queryParams,
                instrumentSerial: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">报告类型</label>
                <Select value={queryParams.reportType} onValueChange={value => setQueryParams({
                ...queryParams,
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
                <Select value={queryParams.dateRange} onValueChange={value => setQueryParams({
                ...queryParams,
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
                    <FileText className="w-4 h-4 mr-2" />
                    生成报告
                  </>}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 报告列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                生成的报告
              </span>
              <div className="text-sm text-gray-500">
                共 {reports.length} 份报告
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
                  <TableHead>报告类型</TableHead>
                  <TableHead>生成时间</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>文件大小</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map(report => <TableRow key={report.id} className="hover:bg-gray-50">
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
                    <TableCell>{getReportTypeBadge(report.reportType)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {report.generateTime}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell>{report.fileSize}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" onClick={() => handlePreview(report.id)} disabled={report.status !== 'completed'} className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDownload(report.id)} disabled={report.status !== 'completed'} className="h-8 w-8 p-0">
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
        {reports.length === 0 && <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无报告</h3>
              <p className="text-gray-500 mb-4">请输入查询条件并生成报告</p>
            </CardContent>
          </Card>}
      </div>
    </div>;
}