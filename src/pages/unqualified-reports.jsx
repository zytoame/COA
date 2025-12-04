// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui';
// @ts-ignore;
import { Search, Download, Eye, FileText, Calendar, User, ArrowLeft, Filter, Plus, BarChart3, AlertTriangle, Clock, Loader2, FileCheck, Edit, Save, X, RefreshCw } from 'lucide-react';

// 引入子组件
import { EditModal } from '@/components/EditModal';
import { DetailModal } from '@/components/DetailModal';
import { UnqualifiedReportTable } from '@/components/UnqualifiedReportTable';
import { mockUnqualifiedReports } from '@/components/UnqualifiedReportData';
export default function UnqualifiedReportsPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();

  // 状态管理
  const [unqualifiedReports, setUnqualifiedReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [viewingReport, setViewingReport] = useState(null);
  const [loading, setLoading] = useState(false);

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // 每页显示10条记录

  // 搜索条件
  const [searchParams, setSearchParams] = useState({
    workOrder: '',
    columnSn: '',
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

  // 计算分页数据
  const totalPages = Math.ceil(filteredReports.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentReports = filteredReports.slice(startIndex, endIndex);

  // TODO: 从后端获取不合格报告列表
  // 需要调用接口获取所有不合格的检测报告
  const fetchUnqualifiedReports = async () => {
    setLoading(true);
    try {
      // TODO: 替换为实际的数据源调用
      // const result = await $w.cloud.callDataSource({
      //   dataSourceName: 'chromatography_reports',
      //   methodName: 'wedaGetRecordsV2',
      //   params: {
      //     filter: {
      //       where: {
      //         $and: [
      //           { testResult: { $eq: '不合格' } },
      //           { createBy: { $eq-current-user: true } }
      //         ]
      //       }
      //     },
      //     orderBy: [{ createdAt: 'desc' }],
      //     select: { $master: true },
      //     getCount: true,
      //     pageSize: 200
      //   }
      // });
      // setUnqualifiedReports(result.records);
      // setFilteredReports(result.records);

      // 临时使用模拟数据
      setUnqualifiedReports(mockUnqualifiedReports);
      setFilteredReports(mockUnqualifiedReports);
    } catch (error) {
      console.error('获取不合格报告失败:', error);
      toast({
        title: "获取数据失败",
        description: "无法加载不合格报告列表",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // TODO: 根据搜索条件过滤报告
  // 需要调用后端接口进行高级搜索
  const handleSearch = async () => {
    setLoading(true);
    try {
      // TODO: 替换为实际的数据源调用
      // const filterConditions = {
      //   $and: [
      //     { testResult: { $eq: '不合格' } }
      //   ]
      // };

      // if (searchParams.workOrder) {
      //   filterConditions.$and.push({ workOrder: { $eq: searchParams.workOrder } });
      // }
      // if (searchParams.columnSn) {
      //   filterConditions.$and.push({ columnSn: { $eq: searchParams.columnSn } });
      // }
      // if (searchParams.orderNumber) {
      //   filterConditions.$and.push({ orderNumber: { $eq: searchParams.orderNumber } });
      // }
      // if (searchParams.instrumentSerial) {
      //   filterConditions.$and.push({ instrumentSerial: { $eq: searchParams.instrumentSerial } });
      // }
      // if (searchParams.reportType !== 'all') {
      //   filterConditions.$and.push({ reportType: { $eq: searchParams.reportType } });
      // }

      // const result = await $w.cloud.callDataSource({
      //   dataSourceName: 'chromatography_reports',
      //   methodName: 'wedaGetRecordsV2',
      //   params: {
      //     filter: { where: filterConditions },
      //     orderBy: [{ createdAt: 'desc' }],
      //     select: { $master: true },
      //     getCount: true,
      //     pageSize: 200
      //   }
      // });
      // setFilteredReports(result.records);

      // 临时使用前端过滤
      const filtered = unqualifiedReports.filter(report => {
        return (!searchParams.workOrder || report.workOrder.toLowerCase().includes(searchParams.workOrder.toLowerCase())) && (!searchParams.columnSn || report.columnSn.toLowerCase().includes(searchParams.columnSn.toLowerCase())) && (!searchParams.orderNumber || report.orderNumber.toLowerCase().includes(searchParams.orderNumber.toLowerCase())) && (!searchParams.instrumentSerial || report.instrumentSerial.toLowerCase().includes(searchParams.instrumentSerial.toLowerCase())) && (searchParams.reportType === 'all' || report.reportType === searchParams.reportType);
      });
      setFilteredReports(filtered);
      setCurrentPage(1); // 重置到第一页
      toast({
        title: "查询完成",
        description: `找到 ${filtered.length} 条不合格报告`
      });
    } catch (error) {
      console.error('搜索失败:', error);
      toast({
        title: "搜索失败",
        description: "无法执行搜索操作",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // 重置搜索
  const handleReset = () => {
    setSearchParams({
      workOrder: '',
      columnSn: '',
      orderNumber: '',
      instrumentSerial: '',
      reportType: 'all',
      dateRange: 'all'
    });
    setFilteredReports(unqualifiedReports);
    setCurrentPage(1); // 重置到第一页
  };

  // TODO: 保存编辑后的报告
  // 需要调用后端接口更新报告数据
  const handleSaveEdit = async updatedReport => {
    setSaving(true);
    try {
      // TODO: 替换为实际的数据源调用
      // const result = await $w.cloud.callDataSource({
      //   dataSourceName: 'chromatography_reports',
      //   methodName: 'wedaUpdateV2',
      //   params: {
      //     data: {
      //       workOrder: updatedReport.workOrder,
      //       columnSn: updatedReport.columnSn,
      //       orderNumber: updatedReport.orderNumber,
      //       instrumentSerial: updatedReport.instrumentSerial,
      //       检测项目: updatedReport.检测项目,
      //       reportType: updatedReport.reportType,
      //       负责人: updatedReport.负责人,
      //       reportDate: updatedReport.reportDate,
      //       检测结果: updatedReport.检测结果,
      //       不合格原因: updatedReport.不合格原因,
      //       审核状态: updatedReport.审核状态,
      //       remarks: updatedReport.remarks,
      //       detectionData: updatedReport.detectionData,
      //       updateBy: currentUser.name,
      //       updateTime: new Date().getTime()
      //     },
      //     filter: {
      //       where: {
      //         $and: [
      //           { _id: { $eq: updatedReport.id } }
      //         ]
      //       }
      //     }
      //   }
      // });

      // if (result.count > 0) {
      //   // 更新本地状态
      //   const updatedReports = unqualifiedReports.map(report => report.id === updatedReport.id ? updatedReport : report);
      //   setUnqualifiedReports(updatedReports);
      //   setFilteredReports(updatedReports.map(report => report.id === updatedReport.id ? updatedReport : report));

      //   toast({
      //     title: "保存成功",
      //     description: `报告 ${updatedReport.id} 已更新`
      //   });
      //   setShowEditModal(false);
      //   setEditingReport(null);
      // } else {
      //   throw new Error('更新失败');
      // }

      // 临时模拟保存过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      const updatedReports = unqualifiedReports.map(report => report.id === updatedReport.id ? updatedReport : report);
      setUnqualifiedReports(updatedReports);
      setFilteredReports(updatedReports.map(report => report.id === updatedReport.id ? updatedReport : report));
      toast({
        title: "保存成功",
        description: `报告 ${updatedReport.id} 已更新`
      });
      setShowEditModal(false);
      setEditingReport(null);
    } catch (error) {
      console.error('保存失败:', error);
      toast({
        title: "保存失败",
        description: error.message || "无法保存报告更改",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  // TODO: 预览报告详情
  // 需要从后端获取完整的报告详情数据
  const handlePreview = async reportId => {
    try {
      // TODO: 替换为实际的数据源调用
      // const result = await $w.cloud.callDataSource({
      //   dataSourceName: 'chromatography_reports',
      //   methodName: 'wedaGetItemV2',
      //   params: {
      //     filter: {
      //       where: {
      //         $and: [
      //           { _id: { $eq: reportId } }
      //         ]
      //       }
      //     },
      //     select: { $master: true }
      //   }
      // });

      // const report = result;
      // const detailReport = {
      //   ...report,
      //   columnSerial: report.columnSn,
      //   columnName: `${report.检测项目}层析柱`,
      //   testType: report.检测项目,
      //   testDate: report.reportDate,
      //   operator: report.负责人,
      //   finalConclusion: 'unqualified',
      //   operationHistory: report.operationHistory || []
      // };
      // setViewingReport(detailReport);
      // setShowDetailModal(true);

      // 临时使用本地数据
      const report = unqualifiedReports.find(r => r.id === reportId);
      if (report) {
        const detailReport = {
          ...report,
          columnSerial: report.columnSn,
          columnName: `${report.检测项目}层析柱`,
          testType: report.检测项目,
          testDate: report.reportDate,
          operator: report.负责人,
          finalConclusion: 'unqualified',
          operationHistory: [{
            time: report.generateTime,
            operator: report.负责人,
            action: '提交检测',
            remark: `完成${report.检测项目}，发现${report.不合格原因}`
          }]
        };
        setViewingReport(detailReport);
        setShowDetailModal(true);
      }
    } catch (error) {
      console.error('获取报告详情失败:', error);
      toast({
        title: "获取详情失败",
        description: "无法加载报告详情",
        variant: "destructive"
      });
    }
  };

  // TODO: 下载报告
  // 需要调用后端接口生成并下载报告文件
  const handleDownload = async reportId => {
    try {
      // TODO: 替换为实际的数据源调用
      // const result = await $w.cloud.callDataSource({
      //   dataSourceName: 'chromatography_reports',
      //   methodName: 'wedaGetItemV2',
      //   params: {
      //     filter: {
      //       where: {
      //         $and: [
      //           { _id: { $eq: reportId } }
      //         ]
      //       }
      //     },
      //     select: { $master: true }
      //   }
      // });

      // // 调用报告生成服务
      // const downloadResult = await $w.cloud.callFunction({
      //   name: 'generateReport',
      //   data: {
      //     reportId: reportId,
      //     reportType: 'unqualified',
      //     format: 'pdf'
      //   }
      // });

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
    } catch (error) {
      console.error('下载失败:', error);
      toast({
        title: "下载失败",
        description: "无法下载报告",
        variant: "destructive"
      });
    }
  };

  // TODO: 批量下载报告
  // 需要调用后端接口批量生成并下载报告
  const handleBatchDownload = async () => {
    if (selectedReports.length === 0) {
      toast({
        title: "请选择报告",
        description: "请先选择要下载的报告",
        variant: "destructive"
      });
      return;
    }
    try {
      // TODO: 替换为实际的数据源调用
      // const downloadResult = await $w.cloud.callFunction({
      //   name: 'batchGenerateReports',
      //   data: {
      //     reportIds: selectedReports,
      //     reportType: 'unqualified',
      //     format: 'pdf'
      //   }
      // });

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
    } catch (error) {
      console.error('批量下载失败:', error);
      toast({
        title: "批量下载失败",
        description: "无法批量下载报告",
        variant: "destructive"
      });
    }
  };

  // 选择/取消选择报告
  const handleSelectReport = reportId => {
    if (selectedReports.includes(reportId)) {
      setSelectedReports(selectedReports.filter(id => id !== reportId));
    } else {
      setSelectedReports([...selectedReports, reportId]);
    }
  };

  // 全选/取消全选（仅当前页）
  const handleSelectAll = checked => {
    if (checked) {
      setSelectedReports([...selectedReports, ...currentReports.map(report => report.id)]);
    } else {
      setSelectedReports(selectedReports.filter(id => !currentReports.some(report => report.id === id)));
    }
  };

  // 获取报告类型名称
  const getReportTypeName = type => {
    const typeMap = {
      glycation: '糖化模式',
      thalassemia: '地贫模式',
      purity: '纯度分析',
      all: '综合'
    };
    return typeMap[type] || '糖化模式';
  };

  // 获取报告类型标签
  const getReportTypeBadge = type => {
    const typeConfig = {
      glycation: {
        label: '糖化模式',
        color: 'blue'
      },
      thalassemia: {
        label: '地贫模式',
        color: 'purple'
      }
    };
    const config = typeConfig[type] || typeConfig.glycation;
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

  // 分页组件
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    return <div className="flex items-center justify-between px-2">
        <div className="text-sm text-gray-500">
          显示第 {startIndex + 1} - {Math.min(endIndex, filteredReports.length)} 条，共 {filteredReports.length} 条记录
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
            </PaginationItem>
            
            {/* 页码显示逻辑 */}
            {Array.from({
            length: totalPages
          }, (_, i) => i + 1).map(page => {
            // 显示逻辑：当前页前后各显示2页，超出范围显示省略号
            if (page === 1 || page === totalPages || page >= currentPage - 2 && page <= currentPage + 2) {
              return <PaginationItem key={page}>
                    <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page} className="cursor-pointer">
                      {page}
                    </PaginationLink>
                  </PaginationItem>;
            } else if (page === currentPage - 3 || page === currentPage + 3) {
              return <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>;
            }
            return null;
          })}
            
            <PaginationItem>
              <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>;
  };

  // 组件挂载时获取数据
  useEffect(() => {
    fetchUnqualifiedReports();
  }, []);
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
              <h1 className="text-2xl font-bold text-gray-900">不合格报告</h1>
              <p className="text-sm text-gray-500">查看和编辑不合格检测报告</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
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
                  <p className="text-sm text-gray-500">总不合格数</p>
                  <p className="text-2xl font-bold text-red-600">{unqualifiedReports.length}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">待处理</p>
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
                  <p className="text-sm text-gray-500">糖化模式</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {unqualifiedReports.filter(r => r.reportType === 'glycation').length}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">地贫模式</p>
                  <p className="text-2xl font-bold text-green-600">
                    {unqualifiedReports.filter(r => r.reportType === 'thalassemia').length}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-400" />
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
                <Input placeholder="请输入层析柱序列号" value={searchParams.columnSn} onChange={e => setSearchParams({
                ...searchParams,
                columnSn: e.target.value
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
                    <SelectItem value="glycation">糖化模式报告</SelectItem>
                    <SelectItem value="thalassemia">地贫模式报告</SelectItem>
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
              <Button variant="outline" onClick={handleSearch} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
                查询
              </Button>
              <Button variant="outline" onClick={handleReset}>
                重置
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 批量操作 */}
        {selectedReports.length > 0 && <Card className="mb-6 bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-900">
                    已选择 {selectedReports.length} 份报告
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedReports([])}>
                    取消选择
                  </Button>
                  <Button size="sm" onClick={handleBatchDownload} className="bg-red-600 hover:bg-red-700">
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
                <AlertTriangle className="w-5 h-5" />
                不合格报告列表
              </span>
              <div className="text-sm text-gray-500">
                当前页显示 {currentReports.length} 条，共 {filteredReports.length} 份报告
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-500">加载中...</span>
              </div> : <UnqualifiedReportTable reports={currentReports} selectedReports={selectedReports} onSelectReport={handleSelectReport} onSelectAll={handleSelectAll} onEdit={handleSaveEdit ? reportId => {
            const report = unqualifiedReports.find(r => r.id === reportId);
            if (report) {
              setEditingReport({
                ...report,
                detectionData: JSON.parse(JSON.stringify(report.detectionData))
              });
              setShowEditModal(true);
            }
          } : null} onPreview={handlePreview} onDownload={handleDownload} getReportTypeBadge={getReportTypeBadge} />}
          </CardContent>
        </Card>

        {/* 分页组件 */}
        {filteredReports.length > 0 && <div className="mt-4">
            {renderPagination()}
          </div>}

        {/* 空状态 */}
        {!loading && filteredReports.length === 0 && <Card className="text-center py-12">
            <CardContent>
              <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无不合适报告</h3>
              <p className="text-gray-500 mb-4">请调整查询条件或等待新的检测报告</p>
            </CardContent>
          </Card>}
      </div>

      {/* 编辑模态框 */}
      {showEditModal && editingReport && <EditModal report={editingReport} isOpen={showEditModal} onClose={() => {
      setShowEditModal(false);
      setEditingReport(null);
    }} onSave={handleSaveEdit} saving={saving} />}

      {/* 详情模态框 */}
      {showDetailModal && viewingReport && <DetailModal report={viewingReport} isOpen={showDetailModal} onClose={() => {
      setShowDetailModal(false);
      setViewingReport(null);
    }} />}
    </div>;
}