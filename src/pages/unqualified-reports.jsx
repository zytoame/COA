// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, Edit, RefreshCw, Download, Eye, Filter, FileText, AlertTriangle, CheckCircle, Clock, Shield, User, Calendar, ArrowLeft, Save, Calculator, X, Loader2 } from 'lucide-react';

// 引入组件
import { EditModal } from '@/components/EditModal';

// 模拟不合格报告数据
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
  审核状态: 'pending',
  // 详细检测数据
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '29.7°C',
      conclusion: 'pass'
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '7.8 MPa',
      conclusion: 'pass'
    },
    hbA1cAppearanceTime: {
      standard: '36-40 秒',
      result: '35.2 秒',
      conclusion: 'fail'
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '0.9%',
      conclusion: 'pass',
      // 重复性测试详细数据
      testData: [{
        id: 1,
        time: '09:15:23',
        value: 45.2,
        unit: '秒'
      }, {
        id: 2,
        time: '09:16:45',
        value: 45.8,
        unit: '秒'
      }, {
        id: 3,
        time: '09:18:12',
        value: 44.9,
        unit: '秒'
      }, {
        id: 4,
        time: '09:19:30',
        value: 45.5,
        unit: '秒'
      }, {
        id: 5,
        time: '09:20:48',
        value: 45.1,
        unit: '秒'
      }]
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '包装完好',
      conclusion: 'pass'
    }
  },
  finalConclusion: 'unqualified'
}, {
  id: 'RPT-U002',
  workOrder: 'WO202501005',
  columnSerial: 'COL-2025-005',
  orderNumber: 'ORD-202501005',
  instrumentSerial: 'INST-002',
  status: 'unqualified',
  reportDate: '2025-01-11',
  不合格项目: '重复性测试',
  不合格原因: 'CV值超标',
  负责人: '张三',
  审核状态: 'pending',
  // 详细检测数据
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '36.8°C',
      conclusion: 'pass'
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '6.2 MPa',
      conclusion: 'pass'
    },
    hbA1cAppearanceTime: {
      standard: '36-40 秒',
      result: '37.5 秒',
      conclusion: 'pass'
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '2.1%',
      conclusion: 'fail',
      // 重复性测试详细数据
      testData: [{
        id: 1,
        time: '14:25:15',
        value: 38.2,
        unit: '秒'
      }, {
        id: 2,
        time: '14:26:30',
        value: 42.1,
        unit: '秒'
      }, {
        id: 3,
        time: '14:27:45',
        value: 35.8,
        unit: '秒'
      }, {
        id: 4,
        time: '14:29:00',
        value: 41.5,
        unit: '秒'
      }, {
        id: 5,
        time: '14:30:15',
        value: 39.7,
        unit: '秒'
      }]
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '包装完好',
      conclusion: 'pass'
    }
  },
  finalConclusion: 'unqualified'
}];
export default function UnqualifiedReportsPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();

  // 状态管理
  const [unqualifiedReports, setUnqualifiedReports] = useState(mockUnqualifiedReports);
  const [filteredReports, setFilteredReports] = useState(mockUnqualifiedReports);
  const [loading, setLoading] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // 搜索条件
  const [searchParams, setSearchParams] = useState({
    workOrder: '',
    columnSerial: '',
    orderNumber: '',
    instrumentSerial: '',
    status: 'all',
    auditStatus: 'all'
  });

  // 当前用户信息
  const currentUser = {
    name: '管理员',
    type: 'admin'
  };

  // 搜索功能
  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const filtered = unqualifiedReports.filter(report => {
        return (!searchParams.workOrder || report.workOrder.toLowerCase().includes(searchParams.workOrder.toLowerCase())) && (!searchParams.columnSerial || report.columnSerial.toLowerCase().includes(searchParams.columnSerial.toLowerCase())) && (!searchParams.orderNumber || report.orderNumber.toLowerCase().includes(searchParams.orderNumber.toLowerCase())) && (!searchParams.instrumentSerial || report.instrumentSerial.toLowerCase().includes(searchParams.instrumentSerial.toLowerCase())) && (searchParams.status === 'all' || report.status === searchParams.status) && (searchParams.auditStatus === 'all' || report.审核状态 === searchParams.auditStatus);
      });
      setFilteredReports(filtered);
      setLoading(false);
      toast({
        title: "查询完成",
        description: `找到 ${filtered.length} 条不合格报告`
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
    setFilteredReports(unqualifiedReports);
  };

  // 预览报告
  const handlePreview = reportId => {
    const report = unqualifiedReports.find(r => r.id === reportId);
    if (report) {
      toast({
        title: "预览报告",
        description: `正在预览报告 ${reportId}`,
        action: {
          label: "查看详情",
          onClick: () => {
            // 这里可以打开一个详细的预览弹窗
            console.log("查看报告详情:", report);
          }
        }
      });
    }
  };

  // 下载报告
  const handleDownload = reportId => {
    const report = unqualifiedReports.find(r => r.id === reportId);
    if (report) {
      toast({
        title: "下载报告",
        description: `正在下载报告 ${reportId}`,
        action: {
          label: "查看进度",
          onClick: () => {
            console.log("查看下载进度:", reportId);
          }
        }
      });

      // 模拟下载过程
      setTimeout(() => {
        toast({
          title: "下载完成",
          description: `报告 ${reportId} 已下载完成`
        });
      }, 2000);
    }
  };

  // 编辑报告
  const handleEditReport = reportId => {
    const report = unqualifiedReports.find(r => r.id === reportId);
    if (report) {
      // 检查是否有重复性测试数据
      if (report.detectionData && report.detectionData.repeatabilityTest && report.detectionData.repeatabilityTest.testData) {
        setEditingReport(report);
        setShowEditModal(true);
      } else {
        toast({
          title: "无法编辑",
          description: "该报告没有重复性测试数据，无法编辑",
          variant: "destructive"
        });
      }
    }
  };

  // 保存编辑后的报告
  const handleSaveEditedReport = updatedReport => {
    const updatedReports = unqualifiedReports.map(report => report.id === updatedReport.id ? updatedReport : report);
    setUnqualifiedReports(updatedReports);
    setFilteredReports(updatedReports);
    toast({
      title: "保存成功",
      description: `报告 ${updatedReport.id} 已更新`
    });
  };

  // 重新计算报告
  const handleRecalculate = reportId => {
    const report = unqualifiedReports.find(r => r.id === reportId);
    if (report) {
      toast({
        title: "重新计算",
        description: `正在重新计算报告 ${reportId}`,
        action: {
          label: "查看进度",
          onClick: () => {
            console.log("查看计算进度:", reportId);
          }
        }
      });

      // 模拟重新计算过程
      setTimeout(() => {
        toast({
          title: "计算完成",
          description: `报告 ${reportId} 重新计算完成`
        });
      }, 3000);
    }
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
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">不合格报告管理</h1>
              <p className="text-sm text-gray-500">管理和编辑不合格的层析柱检测报告</p>
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
        {/* 统计概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">总报告数</p>
                  <p className="text-2xl font-bold">{unqualifiedReports.length}</p>
                </div>
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">待审核</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {unqualifiedReports.filter(r => r.审核状态 === 'pending').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">可编辑</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {unqualifiedReports.filter(r => r.detectionData?.repeatabilityTest?.testData).length}
                  </p>
                </div>
                <Edit className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">今日新增</p>
                  <p className="text-2xl font-bold text-green-600">3</p>
                </div>
                <Calendar className="w-8 h-8 text-green-400" />
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

        {/* 报告列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                不合格报告列表
              </span>
              <div className="text-sm text-gray-500">
                共 {filteredReports.length} 条记录
              </div>
            </CardTitle>
          </CardHeader>
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
                {filteredReports.map(report => <TableRow key={report.id} className="hover:bg-gray-50">
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
                        {report.审核状态 === 'pending' ? '待审核' : report.审核状态}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.reportDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" onClick={() => handlePreview(report.id)} className="h-8 w-8 p-0" title="预览报告">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDownload(report.id)} className="h-8 w-8 p-0" title="下载报告">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEditReport(report.id)} className="h-8 w-8 p-0" title="编辑报告" disabled={!report.detectionData?.repeatabilityTest?.testData}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleRecalculate(report.id)} className="h-8 w-8 p-0" title="重新计算">
                          <RefreshCw className="w-4 h-4" />
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
              <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无不合格报告</h3>
              <p className="text-gray-500 mb-4">所有报告都符合质量标准</p>
            </CardContent>
          </Card>}
      </div>

      {/* 编辑弹窗 */}
      <EditModal report={editingReport} isOpen={showEditModal} onClose={() => {
      setShowEditModal(false);
      setEditingReport(null);
    }} onSave={handleSaveEditedReport} toast={toast} />
    </div>;
}