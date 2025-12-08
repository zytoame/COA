// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, useToast, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui';
// @ts-ignore;
import { CheckCircle, ArrowLeft, PenTool, XCircle, Loader2, FileCheck, User, Thermometer, Gauge, Timer, Activity, Package } from 'lucide-react';

// 引入子组件
import { BatchAuditTable } from '@/components/BatchAuditTable';
import { BatchAuditStats } from '@/components/BatchAuditStats';
import { BatchSearchFilters } from '@/components/BatchSearchFilters';
import { DetailModal } from '@/components/DetailModal';
import { SignaturePad } from '@/components/SignaturePad';

// 简化的模拟待审核层析柱数据
const mockPendingColumns = [{
  id: 'COL-001',
  workOrder: 'WO202501001',
  columnSn: 'COL-2025-001',
  orderNumber: 'ORD-202501001',
  instrumentSerial: 'INST-001',
  columnName: 'Protein A Column',
  testType: '纯度检测',
  testDate: '2025-01-15',
  testResult: '合格',
  operator: '张三',
  submitTime: '2025-01-15 14:30:00',
  priority: 'high',
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
      result: '包装轻微破损',
      conclusion: 'fail',
      icon: Package
    }
  },
  finalConclusion: 'unqualified',
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
  id: 'COL-002',
  workOrder: 'WO202501002',
  columnSn: 'COL-2025-002',
  orderNumber: 'ORD-202501002',
  instrumentSerial: 'INST-002',
  columnName: 'Ion Exchange Column',
  testType: 'pH值检测',
  testDate: '2025-01-14',
  testResult: '合格',
  operator: '李四',
  submitTime: '2025-01-14 16:45:00',
  priority: 'medium',
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
    remark: '完成pH值检测'
  }]
}, {
  id: 'COL-003',
  workOrder: 'WO202501003',
  columnSn: 'COL-2025-003',
  orderNumber: 'ORD-202501003',
  instrumentSerial: 'INST-001',
  columnName: 'Gel Filtration Column',
  testType: '杂质含量',
  testDate: '2025-01-13',
  testResult: '合格',
  operator: '王五',
  submitTime: '2025-01-13 11:20:00',
  priority: 'low',
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
    remark: '完成杂质含量检测'
  }]
}];
export default function BatchAuditPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();

  // 状态管理
  const [pendingColumns, setPendingColumns] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [viewingColumn, setViewingColumn] = useState(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signing, setSigning] = useState(false);
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
    priority: 'all'
  });

  // 当前用户信息
  const currentUser = {
    name: '管理员',
    type: 'admin'
  };

  // 计算分页数据
  const totalPages = Math.ceil(filteredColumns.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentColumns = filteredColumns.slice(startIndex, endIndex);

  // TODO: 从后端获取待审核层析柱列表
  // 需要调用接口获取所有待审核的层析柱
  const fetchPendingColumns = async () => {
    setLoading(true);
    try {
      // TODO: 替换为实际的数据源调用
      // const result = await $w.cloud.callDataSource({
      //   dataSourceName: 'chromatography_columns',
      //   methodName: 'wedaGetRecordsV2',
      //   params: {
      //     filter: {
      //       where: {
      //         $and: [
      //           { auditStatus: { $eq: 'pending' } },
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
      // setPendingColumns(result.records);
      // setFilteredColumns(result.records);

      // 临时使用模拟数据
      setPendingColumns(mockPendingColumns);
      setFilteredColumns(mockPendingColumns);
    } catch (error) {
      console.error('获取待审核层析柱失败:', error);
      toast({
        title: "获取数据失败",
        description: "无法加载待审核层析柱列表",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // TODO: 根据搜索条件过滤层析柱
  // 需要调用后端接口进行高级搜索
  const handleSearch = async () => {
    setLoading(true);
    try {
      // TODO: 替换为实际的数据源调用
      // const filterConditions = {
      //   $and: [
      //     { auditStatus: { $eq: 'pending' } }
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
      // if (searchParams.priority !== 'all') {
      //   filterConditions.$and.push({ priority: { $eq: searchParams.priority } });
      // }

      // const result = await $w.cloud.callDataSource({
      //   dataSourceName: 'chromatography_columns',
      //   methodName: 'wedaGetRecordsV2',
      //   params: {
      //     filter: { where: filterConditions },
      //     orderBy: [{ submitTime: 'desc' }],
      //     select: { $master: true },
      //     getCount: true,
      //     pageSize: 200
      //   }
      // });
      // setFilteredColumns(result.records);

      // 临时使用前端过滤
      const filtered = pendingColumns.filter(column => {
        return (!searchParams.workOrder || column.workOrder.toLowerCase().includes(searchParams.workOrder.toLowerCase())) && (!searchParams.columnSn || column.columnSn.toLowerCase().includes(searchParams.columnSn.toLowerCase())) && (!searchParams.orderNumber || column.orderNumber.toLowerCase().includes(searchParams.orderNumber.toLowerCase())) && (!searchParams.instrumentSerial || column.instrumentSerial.toLowerCase().includes(searchParams.instrumentSerial.toLowerCase())) && (searchParams.testType === 'all' || column.testType === searchParams.testType) && (searchParams.priority === 'all' || column.priority === searchParams.priority);
      });
      setFilteredColumns(filtered);
      setCurrentPage(1); // 重置到第一页
      toast({
        title: "查询完成",
        description: `找到 ${filtered.length} 条待审核层析柱`
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
      priority: 'all'
    });
    setFilteredColumns(pendingColumns);
    setCurrentPage(1); // 重置到第一页
  };

  // TODO: 批量审核通过
  // 需要调用后端接口批量更新审核状态
  const handleBatchApprove = async () => {
    if (selectedColumns.length === 0) {
      toast({
        title: "请选择层析柱",
        description: "请先选择要审核的层析柱",
        variant: "destructive"
      });
      return;
    }
    setShowSignatureModal(true);
  };

  // TODO: 确认批量审核
  // 需要调用后端接口更新审核状态并记录签名
  const handleConfirmBatchApprove = async signatureData => {
    setSigning(true);
    try {
      // TODO: 替换为实际的数据源调用
      // const updatePromises = selectedColumns.map(columnId => 
      //   $w.cloud.callDataSource({
      //     dataSourceName: 'chromatography_columns',
      //     methodName: 'wedaUpdateV2',
      //     params: {
      //       data: {
      //         auditStatus: 'approved',
      //         auditTime: new Date().toLocaleString('zh-CN'),
      //         auditBy: currentUser.name,
      //         auditSignature: signatureData,
      //         updateTime: new Date().getTime()
      //       },
      //       filter: {
      //         where: {
      //           $and: [
      //             { _id: { $eq: columnId } }
      //           ]
      //         }
      //       }
      //     }
      //   })
      // );

      // // 记录审核历史
      // const auditPromises = selectedColumns.map(columnId => 
      //   $w.cloud.callDataSource({
      //     dataSourceName: 'audit_records',
      //     methodName: 'wedaCreateV2',
      //     params: {
      //       data: {
      //         columnId: columnId,
      //         auditType: 'batch_approve',
      //         auditBy: currentUser.name,
      //         auditTime: new Date().toLocaleString('zh-CN'),
      //         auditSignature: signatureData,
      //         createBy: currentUser.name,
      //         createTime: new Date().getTime()
      //       }
      //     }
      //   })
      // );

      // await Promise.all([...updatePromises, ...auditPromises]);

      // 临时模拟审核过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      const updatedColumns = pendingColumns.filter(column => !selectedColumns.includes(column.id));
      setPendingColumns(updatedColumns);
      setFilteredColumns(updatedColumns.filter(column => !selectedColumns.includes(column.id)));
      setSelectedColumns([]);
      setShowSignatureModal(false);
      toast({
        title: "批量审核成功",
        description: `${selectedColumns.length} 个层析柱已审核通过`
      });
    } catch (error) {
      console.error('批量审核失败:', error);
      toast({
        title: "批量审核失败",
        description: error.message || "无法完成批量审核",
        variant: "destructive"
      });
    } finally {
      setSigning(false);
    }
  };

  // TODO: 预览层析柱详情
  // 需要从后端获取完整的层析柱详情数据
  const handlePreview = async columnId => {
    try {
      // TODO: 替换为实际的数据源调用
      // const result = await $w.cloud.callDataSource({
      //   dataSourceName: 'chromatography_columns',
      //   methodName: 'wedaGetItemV2',
      //   params: {
      //     filter: {
      //       where: {
      //         $and: [
      //           { _id: { $eq: columnId } }
      //         ]
      //       }
      //     },
      //     select: { $master: true }
      //   }
      // });

      // const column = result;
      // setViewingColumn(column);
      // setShowDetailModal(true);

      // 临时使用本地数据
      const column = pendingColumns.find(c => c.id === columnId);
      if (column) {
        setViewingColumn(column);
        setShowDetailModal(true);
      }
    } catch (error) {
      console.error('获取层析柱详情失败:', error);
      toast({
        title: "获取详情失败",
        description: "无法加载层析柱详情",
        variant: "destructive"
      });
    }
  };

  // 选择/取消选择层析柱
  const handleSelectColumn = columnId => {
    if (selectedColumns.includes(columnId)) {
      setSelectedColumns(selectedColumns.filter(id => id !== columnId));
    } else {
      setSelectedColumns([...selectedColumns, columnId]);
    }
  };

  // 全选/取消全选（仅当前页）
  const handleSelectAll = checked => {
    if (checked) {
      setSelectedColumns([...selectedColumns, ...currentColumns.map(column => column.id)]);
    } else {
      setSelectedColumns(selectedColumns.filter(id => !currentColumns.some(column => column.id === id)));
    }
  };

  // 展开/收起行
  const handleToggleExpand = columnId => {
    if (expandedRows.includes(columnId)) {
      setExpandedRows(expandedRows.filter(id => id !== columnId));
    } else {
      setExpandedRows([...expandedRows, columnId]);
    }
  };


  // 获取结论标签
  const getConclusionBadge = conclusion => {
    return conclusion === 'qualified' ? <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
        <CheckCircle className="w-3 h-3 mr-1" />
        合格
      </Badge> : <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
        <XCircle className="w-3 h-3 mr-1" />
        不合格
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
          显示第 {startIndex + 1} - {Math.min(endIndex, filteredColumns.length)} 条，共 {filteredColumns.length} 条记录
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
    fetchPendingColumns();
  }, []);

  // 计算统计数据
  const highPriorityCount = pendingColumns.filter(c => c.priority === 'high').length;
  const qualifiedCount = pendingColumns.filter(c => c.finalConclusion === 'qualified').length;
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={handleBackToMain} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回主页
            </Button>
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">批量审核签字</h1>
              <p className="text-sm text-gray-500">批量审核待审核的层析柱</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <User className="w-3 h-3 mr-1" />
              {currentUser.type === 'admin' ? '管理员' : '客户'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 统计概览 */}
        <BatchAuditStats totalColumns={pendingColumns.length} pendingCount={pendingColumns.length} highPriorityCount={highPriorityCount} qualifiedCount={qualifiedCount} />

        {/* 搜索区域 */}
        <BatchSearchFilters searchParams={searchParams} setSearchParams={setSearchParams} onSearch={handleSearch} onReset={handleReset} loading={loading} />

        {/* 批量操作 */}
        {selectedColumns.length > 0 && <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-900">
                    已选择 {selectedColumns.length} 个层析柱
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedColumns([])}>
                    取消选择
                  </Button>
                  <Button size="sm" onClick={handleBatchApprove} className="bg-green-600 hover:bg-green-700">
                    <PenTool className="w-4 h-4 mr-2" />
                    批量审核通过
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>}

        {/* 层析柱列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                待审核层析柱列表
              </span>
              <div className="text-sm text-gray-500">
                当前页显示 {currentColumns.length} 条，共 {filteredColumns.length} 个层析柱
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-500">加载中...</span>
              </div> : <BatchAuditTable columns={currentColumns} selectedColumns={selectedColumns} expandedRows={expandedRows} onSelectColumn={handleSelectColumn} onSelectAll={handleSelectAll} onToggleExpand={handleToggleExpand} onPreview={handlePreview} getConclusionBadge={getConclusionBadge} />}
          </CardContent>
        </Card>

        {/* 分页组件 */}
        {filteredColumns.length > 0 && <div className="mt-4">
            {renderPagination()}
          </div>}

        {/* 空状态 */}
        {!loading && filteredColumns.length === 0 && <Card className="text-center py-12">
            <CardContent>
              <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无待审核层析柱</h3>
              <p className="text-gray-500 mb-4">所有层析柱都已审核完成</p>
            </CardContent>
          </Card>}
      </div>

      {/* 详情模态框 */}
      {showDetailModal && viewingColumn && <DetailModal report={viewingColumn} isOpen={showDetailModal} onClose={() => {
      setShowDetailModal(false);
      setViewingColumn(null);
    }} />}

      {/* 签名模态框 */}
      {showSignatureModal && <SignaturePad isOpen={showSignatureModal} onClose={() => {
      setShowSignatureModal(false);
    }} onConfirm={handleConfirmBatchApprove} signing={signing} />}
    </div>;
}