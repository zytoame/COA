// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, useToast, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui';
// @ts-ignore;
import { FileText, ArrowLeft, Plus, Search, Download, Loader2, User, Thermometer, Gauge, Timer, Activity, Package } from 'lucide-react';

// 引入子组件
import { ReportTable } from '@/components/ReportTable';
import { ReportStats } from '@/components/ReportStats';
import { SearchFilters } from '@/components/SearchFilters';
import { DetailModal } from '@/components/DetailModal';

// 简化的模拟报告数据
const mockReports = [{
  id: 'RPT-001',
  workOrder: 'WO202501001',
  columnSn: 'COL-2025-001',
  orderNumber: 'ORD-202501001',
  instrumentSerial: 'INST-001',
  columnName: 'Protein A Column',
  testType: '糖化模式',
  testDate: '2025-01-15',
  testResult: '合格',
  operator: '张三',
  submitTime: '2025-01-15 14:30:00',
  // 详细检测数据
  detectionData: {
    setTemperature: {
      standard: '25-40°C',
      result: '38.5°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    pressure: {
      standard: '5.0-8.0 MPa',
      result: '7.2 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    peakTime: {
      standard: '36-40 秒',
      result: '42.3 秒',
      conclusion: 'fail',
      icon: Timer
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '1.8%',
      conclusion: 'fail',
      icon: Activity
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '包装完好',
      conclusion: 'pass',
      icon: Package
    }
  },
  finalConclusion: 'qualified',
  // 操作历史
  operationHistory: [{
    time: '2025-01-15 14:30:00',
    operator: '张三',
    action: '提交检测',
    remark: '完成所有检测项目'
  }, {
    time: '2025-01-15 15:00:00',
    operator: '系统',
    action: '自动判定',
    remark: '检测结果显示合格'
  }]
}, {
  id: 'RPT-002',
  workOrder: 'WO202501002',
  columnSn: 'COL-2025-002',
  orderNumber: 'ORD-202501002',
  instrumentSerial: 'INST-002',
  columnName: 'Ion Exchange Column',
  testType: '地贫模式',
  testDate: '2025-01-14',
  testResult: '合格',
  operator: '李四',
  submitTime: '2025-01-14 16:45:00',
  // 详细检测数据
  detectionData: {
    setTemperature: {
      standard: '25-40°C',
      result: '35.2°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    pressure: {
      standard: '5.0-8.0 MPa',
      result: '6.8 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    peakTime: {
      standard: '36-40 秒',
      result: '38.1 秒',
      conclusion: 'pass',
      icon: Timer
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '1.2%',
      conclusion: 'pass',
      icon: Activity
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '包装完好',
      conclusion: 'pass',
      icon: Package
    }
  },
  finalConclusion: 'qualified',
  operationHistory: [{
    time: '2025-01-14 16:45:00',
    operator: '李四',
    action: '提交检测',
    remark: '完成地贫模式检测'
  }]
}, {
  id: 'RPT-003',
  workOrder: 'WO202501003',
  columnSn: 'COL-2025-003',
  orderNumber: 'ORD-202501003',
  instrumentSerial: 'INST-001',
  columnName: 'Gel Filtration Column',
  testType: '糖化模式',
  testDate: '2025-01-13',
  testResult: '不合格',
  operator: '王五',
  submitTime: '2025-01-13 11:20:00',
  // 详细检测数据
  detectionData: {
    setTemperature: {
      standard: '25-40°C',
      result: '32.1°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    pressure: {
      standard: '5.0-8.0 MPa',
      result: '5.5 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    peakTime: {
      standard: '36-40 秒',
      result: '39.8 秒',
      conclusion: 'pass',
      icon: Timer
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '2.1%',
      conclusion: 'fail',
      icon: Activity
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '密封塞松动',
      conclusion: 'fail',
      icon: Package
    }
  },
  finalConclusion: 'unqualified',
  operationHistory: [{
    time: '2025-01-13 11:20:00',
    operator: '王五',
    action: '提交检测',
    remark: '完成糖化模式检测'
  }]
}, {
  id: 'RPT-004',
  workOrder: 'WO202501004',
  columnSn: 'COL-2025-004',
  orderNumber: 'ORD-202501004',
  instrumentSerial: 'INST-002',
  columnName: 'Affinity Column',
  testType: '地贫模式',
  testDate: '2025-01-12',
  testResult: '合格',
  operator: '赵六',
  submitTime: '2025-01-12 09:15:00',
  // 详细检测数据
  detectionData: {
    setTemperature: {
      standard: '25-40°C',
      result: '37.8°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    pressure: {
      standard: '5.0-8.0 MPa',
      result: '6.2 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    peakTime: {
      standard: '36-40 秒',
      result: '37.5 秒',
      conclusion: 'pass',
      icon: Timer
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '0.9%',
      conclusion: 'pass',
      icon: Activity
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '包装完好',
      conclusion: 'pass',
      icon: Package
    }
  },
  finalConclusion: 'qualified',
  operationHistory: [{
    time: '2025-01-12 09:15:00',
    operator: '赵六',
    action: '提交检测',
    remark: '完成地贫模式检测'
  }]
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
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
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
    testType: 'all',
    testResult: 'all'
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

  // TODO: 从后端获取报告列表
  // 需要调用接口获取所有层析柱报告
  const fetchReports = async () => {
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
      //           { createBy: { $eq-current-user: true } }
      //         ]
      //       }
      //     },
      //     orderBy: [{ submitTime: 'desc' }],
      //     select: { $master: true },
      //     getCount: true,
      //     pageSize: 200
      //   }
      // });
      // setReports(result.records);
      // setFilteredReports(result.records);

      // 临时使用模拟数据
      setReports(mockReports);
      setFilteredReports(mockReports);
    } catch (error) {
      console.error('获取报告失败:', error);
      toast({
        title: "获取数据失败",
        description: "无法加载报告列表",
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
      //   $and: []
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
      // if (searchParams.testType !== 'all') {
      //   filterConditions.$and.push({ testType: { $eq: searchParams.testType } });
      // }
      // if (searchParams.testResult !== 'all') {
      //   filterConditions.$and.push({ testResult: { $eq: searchParams.testResult } });
      // }

      // const result = await $w.cloud.callDataSource({
      //   dataSourceName: 'chromatography_reports',
      //   methodName: 'wedaGetRecordsV2',
      //   params: {
      //     filter: { where: filterConditions },
      //     orderBy: [{ submitTime: 'desc' }],
      //     select: { $master: true },
      //     getCount: true,
      //     pageSize: 200
      //   }
      // });
      // setFilteredReports(result.records);

      // 临时使用前端过滤
      const filtered = reports.filter(report => {
        return (!searchParams.workOrder || report.workOrder.toLowerCase().includes(searchParams.workOrder.toLowerCase())) && (!searchParams.columnSn || report.columnSn.toLowerCase().includes(searchParams.columnSn.toLowerCase())) && (!searchParams.orderNumber || report.orderNumber.toLowerCase().includes(searchParams.orderNumber.toLowerCase())) && (!searchParams.instrumentSerial || report.instrumentSerial.toLowerCase().includes(searchParams.instrumentSerial.toLowerCase())) && (searchParams.testType === 'all' || report.testType === searchParams.testType) && (searchParams.testResult === 'all' || report.testResult === searchParams.testResult);
      });
      setFilteredReports(filtered);
      setCurrentPage(1); // 重置到第一页
      toast({
        title: "查询完成",
        description: `找到 ${filtered.length} 条报告`
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
      testType: 'all',
      testResult: 'all'
    });
    setFilteredReports(reports);
    setCurrentPage(1); // 重置到第一页
  };

  // TODO: 生成报告
  // 需要调用后端接口生成新的检测报告
  const handleGenerateReport = () => {
    $w.utils.navigateTo({
      pageId: 'generate-report',
      params: {}
    });
  };

  // TODO: 下载报告
  // 需要调用后端接口下载报告文件
  const handleDownload = async reportId => {
    try {
      // TODO: 替换为实际的数据源调用
      // const result = await $w.cloud.callFunction({
      //   name: 'downloadReport',
      //   data: {
      //     reportId: reportId
      //   }
      // });

      // 临时模拟下载
      const report = reports.find(r => r.id === reportId);
      if (report) {
        toast({
          title: "下载成功",
          description: `报告 ${report.id} 已开始下载`
        });
      }
    } catch (error) {
      console.error('下载失败:', error);
      toast({
        title: "下载失败",
        description: error.message || "无法下载报告",
        variant: "destructive"
      });
    }
  };

  // TODO: 批量下载报告
  // 需要调用后端接口批量下载报告
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
      // const result = await $w.cloud.callFunction({
      //   name: 'batchDownloadReports',
      //   data: {
      //     reportIds: selectedReports
      //   }
      // });

      // 临时模拟批量下载
      toast({
        title: "批量下载开始",
        description: `${selectedReports.length} 个报告已开始下载`
      });
      setSelectedReports([]);
    } catch (error) {
      console.error('批量下载失败:', error);
      toast({
        title: "批量下载失败",
        description: error.message || "无法批量下载报告",
        variant: "destructive"
      });
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
      // setViewingReport(report);
      // setShowDetailModal(true);

      // 临时使用本地数据
      const report = reports.find(r => r.id === reportId);
      if (report) {
        setViewingReport(report);
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

  // 展开/收起行
  const handleToggleExpand = reportId => {
    if (expandedRows.includes(reportId)) {
      setExpandedRows(expandedRows.filter(id => id !== reportId));
    } else {
      setExpandedRows([...expandedRows, reportId]);
    }
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
    fetchReports();
  }, []);

  // 计算统计数据
  const qualifiedCount = reports.filter(r => r.testResult === '合格').length;
  const unqualifiedCount = reports.filter(r => r.testResult === '不合格').length;
  const todayReports = reports.filter(r => r.submitTime.startsWith('2025-01-15')).length;
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={handleBackToMain} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回主页
            </Button>
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">报告查询</h1>
              <p className="text-sm text-gray-500">查询和管理层析柱检测报告</p>
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
        <ReportStats totalReports={reports.length} qualifiedCount={qualifiedCount} unqualifiedCount={unqualifiedCount} todayReports={todayReports} />

        {/* 搜索区域 */}
        <SearchFilters searchParams={searchParams} setSearchParams={setSearchParams} onSearch={handleSearch} onReset={handleReset} loading={loading} />

        {/* 批量操作 */}
        {selectedReports.length > 0 && <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    已选择 {selectedReports.length} 个报告
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
                报告列表
              </span>
              <div className="flex items-center space-x-2">
                <Button size="sm" onClick={handleGenerateReport} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  生成报告
                </Button>
                <div className="text-sm text-gray-500">
                  当前页显示 {currentReports.length} 条，共 {filteredReports.length} 个报告
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-500">加载中...</span>
              </div> : <ReportTable reports={currentReports} selectedReports={selectedReports} expandedRows={expandedRows} onSelectReport={handleSelectReport} onSelectAll={handleSelectAll} onToggleExpand={handleToggleExpand} onPreview={handlePreview} onDownload={handleDownload} />}
          </CardContent>
        </Card>

        {/* 分页组件 */}
        {filteredReports.length > 0 && <div className="mt-4">
            {renderPagination()}
          </div>}

        {/* 空状态 */}
        {!loading && filteredReports.length === 0 && <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无报告</h3>
              <p className="text-gray-500 mb-4">还没有生成任何检测报告</p>
              <Button onClick={handleGenerateReport} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                生成第一个报告
              </Button>
            </CardContent>
          </Card>}
      </div>

      {/* 详情模态框 */}
      {showDetailModal && viewingReport && <DetailModal report={viewingReport} isOpen={showDetailModal} onClose={() => {
      setShowDetailModal(false);
      setViewingReport(null);
    }} />}
    </div>;
}