// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, useToast, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Button } from '@/components/ui';
// @ts-ignore;
import { AlertTriangle, ArrowLeft, Loader2, User } from 'lucide-react';

// 引入子组件
import { UnqualifiedReportTable } from '@/components/UnqualifiedReportTable';
import { UnqualifiedReportStats } from '@/components/UnqualifiedReportStats';
import { UnqualifiedSearchFilters } from '@/components/UnqualifiedSearchFilters';
import { DetailModal } from '@/components/DetailModal';

// 简化的模拟不合格报告数据
const mockUnqualifiedReports = [{
  id: 'UNQ-001',
  workOrder: 'WO202501001',
  columnSn: 'COL-2025-001',
  orderNumber: 'ORD-202501001',
  instrumentSerial: 'INST-001',
  columnName: 'Protein A Column',
  testType: '糖化模式',
  testDate: '2025-01-15',
  testResult: '不合格',
  operator: '张三',
  submitTime: '2025-01-15 14:30:00',
  // 不合格原因
  unqualifiedReasons: ['出峰时间超出标准范围', '重复性测试CV值超标'],
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
    remark: '检测结果显示不合格'
  }]
}, {
  id: 'UNQ-002',
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
  // 不合格原因
  unqualifiedReasons: ['重复性测试CV值超标', '外观检查不合格'],
  // 操作历史
  operationHistory: [{
    time: '2025-01-13 11:20:00',
    operator: '王五',
    action: '提交检测',
    remark: '完成糖化模式检测'
  }]
}, {
  id: 'UNQ-003',
  workOrder: 'WO202501004',
  columnSn: 'COL-2025-004',
  orderNumber: 'ORD-202501004',
  instrumentSerial: 'INST-002',
  columnName: 'Ion Exchange Column',
  testType: '地贫模式',
  testDate: '2025-01-12',
  testResult: '不合格',
  operator: '赵六',
  submitTime: '2025-01-12 09:15:00',
  // 不合格原因
  unqualifiedReasons: ['压力超出标准范围'],
  // 操作历史
  operationHistory: [{
    time: '2025-01-12 09:15:00',
    operator: '赵六',
    action: '提交检测',
    remark: '完成地贫模式检测'
  }]
}];
export default function UnqualifiedReportPage(props) {
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
    testType: 'all'
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
  // 需要调用接口获取所有不合格的层析柱报告
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
      //           { testResult: { $eq: 'unqualified' } },
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
      //     { testResult: { $eq: 'unqualified' } }
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
      // if (searchParams.testType !== 'all') {
      //   filterConditions.$and.push({ testType: { $eq: searchParams.testType } });
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
      const filtered = unqualifiedReports.filter(report => {
        return (!searchParams.workOrder || report.workOrder.toLowerCase().includes(searchParams.workOrder.toLowerCase())) && (!searchParams.columnSn || report.columnSn.toLowerCase().includes(searchParams.columnSn.toLowerCase())) && (!searchParams.orderNumber || report.orderNumber.toLowerCase().includes(searchParams.orderNumber.toLowerCase())) && (!searchParams.instrumentSerial || report.instrumentSerial.toLowerCase().includes(searchParams.instrumentSerial.toLowerCase())) && (searchParams.testType === 'all' || report.testType === searchParams.testType);
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
      testType: 'all'
    });
    setFilteredReports(unqualifiedReports);
    setCurrentPage(1); // 重置到第一页
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
      const report = unqualifiedReports.find(r => r.id === reportId);
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
              <h1 className="text-2xl font-bold text-gray-900">不合格层析柱列表</h1>
              <p className="text-sm text-gray-500">查看所有不合格的层析柱报告</p>
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
        <UnqualifiedReportStats totalReports={unqualifiedReports.length} todayReports={unqualifiedReports.filter(r => r.submitTime.startsWith('2025-01-15')).length} thisWeekReports={unqualifiedReports.filter(r => {
        const submitDate = new Date(r.submitTime);
        const today = new Date('2025-01-15');
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return submitDate >= weekAgo;
      }).length} />

        {/* 搜索区域 */}
        <UnqualifiedSearchFilters searchParams={searchParams} setSearchParams={setSearchParams} onSearch={handleSearch} onReset={handleReset} loading={loading} />

        {/* 报告列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                不合格报告列表
              </span>
              <div className="text-sm text-gray-500">
                当前页显示 {currentReports.length} 条，共 {filteredReports.length} 个报告
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-500">加载中...</span>
              </div> : <UnqualifiedReportTable reports={currentReports} expandedRows={expandedRows} onToggleExpand={handleToggleExpand} onPreview={handlePreview} />}
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无不合格报告</h3>
              <p className="text-gray-500 mb-4">所有层析柱检测都合格</p>
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