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

// 简化的模拟不合格层析柱数据
const mockUnqualifiedColumns = [{
  id: 'COL-001',
  workOrder: 'WO202501001',
  columnSn: 'COL-2025-001',
  orderNumber: 'ORD-202501001',
  instrumentSerial: 'INST-001',
  reportType: 'glycation',
  status: 'unqualified',
  reportDate: '2025-01-15',
  检测项目: '糖化模式',
  检测结果: '不合格',
  负责人: '张三',
  审核状态: 'pending',
  不合格原因: '纯度低于标准值',
  generateTime: '2025-01-15 14:30:00',
  // 详细检测数据
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '38.5°C',
      conclusion: 'pass',
      icon: 'Thermometer'
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '7.2 MPa',
      conclusion: 'pass',
      icon: 'Gauge'
    },
    hbA1cAppearanceTime: {
      standard: '36-40 秒',
      result: '42.3 秒',
      conclusion: 'fail',
      icon: 'Timer'
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '1.8%',
      conclusion: 'fail',
      icon: 'Activity',
      rawValues: {
        '糖化模式': Array.from({
          length: 20
        }, (_, i) => (35.5 + Math.random() * 0.8).toFixed(2))
      }
    }
  }
}, {
  id: 'COL-002',
  workOrder: 'WO202501002',
  columnSn: 'COL-2025-002',
  orderNumber: 'ORD-202501002',
  instrumentSerial: 'INST-002',
  reportType: 'thalassemia',
  status: 'unqualified',
  reportDate: '2025-01-14',
  检测项目: '地贫模式',
  检测结果: '不合格',
  负责人: '李四',
  审核状态: 'pending',
  不合格原因: 'pH值超出范围',
  generateTime: '2025-01-14 16:45:00',
  // 详细检测数据
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '35.2°C',
      conclusion: 'pass',
      icon: 'Thermometer'
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '6.8 MPa',
      conclusion: 'pass',
      icon: 'Gauge'
    },
    hbA1cAppearanceTime: {
      standard: '36-40 秒',
      result: '38.1 秒',
      conclusion: 'pass',
      icon: 'Timer'
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '2.1%',
      conclusion: 'fail',
      icon: 'Activity',
      rawValues: {
        'HbF': Array.from({
          length: 10
        }, (_, i) => (32.5 + Math.random() * 0.6).toFixed(2)),
        'HbA1c': Array.from({
          length: 10
        }, (_, i) => (35.8 + Math.random() * 0.7).toFixed(2)),
        'HbA2': Array.from({
          length: 10
        }, (_, i) => (2.8 + Math.random() * 0.4).toFixed(2))
      }
    }
  }
}, {
  id: 'COL-003',
  workOrder: 'WO202501003',
  columnSn: 'COL-2025-003',
  orderNumber: 'ORD-202501003',
  instrumentSerial: 'INST-001',
  reportType: 'glycation',
  status: 'unqualified',
  reportDate: '2025-01-13',
  检测项目: '糖化模式',
  检测结果: '不合格',
  负责人: '王五',
  审核状态: 'pending',
  不合格原因: '杂质含量超标',
  generateTime: '2025-01-13 11:20:00',
  // 详细检测数据
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '32.1°C',
      conclusion: 'pass',
      icon: 'Thermometer'
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '5.5 MPa',
      conclusion: 'pass',
      icon: 'Gauge'
    },
    hbA1cAppearanceTime: {
      standard: '36-40 秒',
      result: '39.8 秒',
      conclusion: 'pass',
      icon: 'Timer'
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '1.9%',
      conclusion: 'fail',
      icon: 'Activity',
      rawValues: {
        '糖化模式': Array.from({
          length: 20
        }, (_, i) => (36.2 + Math.random() * 0.9).toFixed(2))
      }
    }
  }
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
  const [unqualifiedColumns, setUnqualifiedColumns] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [viewingColumn, setViewingColumn] = useState(null);
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
  const totalPages = Math.ceil(filteredColumns.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentColumns = filteredColumns.slice(startIndex, endIndex);

  // TODO: 从后端获取不合格层析柱列表
  // 需要调用接口获取所有不合格的层析柱
  const fetchUnqualifiedColumns = async () => {
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
      // setUnqualifiedColumns(result.records);
      // setFilteredColumns(result.records);

      // 临时使用模拟数据
      setUnqualifiedColumns(mockUnqualifiedColumns);
      setFilteredColumns(mockUnqualifiedColumns);
    } catch (error) {
      console.error('获取不合格层析柱失败:', error);
      toast({
        title: "获取数据失败",
        description: "无法加载不合格层析柱列表",
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
      //   dataSourceName: 'chromatography_columns',
      //   methodName: 'wedaGetRecordsV2',
      //   params: {
      //     filter: { where: filterConditions },
      //     orderBy: [{ createdAt: 'desc' }],
      //     select: { $master: true },
      //     getCount: true,
      //     pageSize: 200
      //   }
      // });
      // setFilteredColumns(result.records);

      // 临时使用前端过滤
      const filtered = unqualifiedColumns.filter(column => {
        return (!searchParams.workOrder || column.workOrder.toLowerCase().includes(searchParams.workOrder.toLowerCase())) && (!searchParams.columnSn || column.columnSn.toLowerCase().includes(searchParams.columnSn.toLowerCase())) && (!searchParams.orderNumber || column.orderNumber.toLowerCase().includes(searchParams.orderNumber.toLowerCase())) && (!searchParams.instrumentSerial || column.instrumentSerial.toLowerCase().includes(searchParams.instrumentSerial.toLowerCase())) && (searchParams.reportType === 'all' || column.reportType === searchParams.reportType);
      });
      setFilteredColumns(filtered);
      setCurrentPage(1); // 重置到第一页
      toast({
        title: "查询完成",
        description: `找到 ${filtered.length} 条不合格层析柱`
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
    setFilteredColumns(unqualifiedColumns);
    setCurrentPage(1); // 重置到第一页
  };

  // TODO: 保存编辑后的层析柱数据
  // 需要调用后端接口更新层析柱数据
  const handleSaveEdit = async updatedColumn => {
    setSaving(true);
    try {
      // TODO: 替换为实际的数据源调用
      // const result = await $w.cloud.callDataSource({
      //   dataSourceName: 'chromatography_columns',
      //   methodName: 'wedaUpdateV2',
      //   params: {
      //     data: {
      //       workOrder: updatedColumn.workOrder,
      //       columnSn: updatedColumn.columnSn,
      //       orderNumber: updatedColumn.orderNumber,
      //       instrumentSerial: updatedColumn.instrumentSerial,
      //       检测项目: updatedColumn.检测项目,
      //       reportType: updatedColumn.reportType,
      //       负责人: updatedColumn.负责人,
      //       reportDate: updatedColumn.reportDate,
      //       检测结果: updatedColumn.检测结果,
      //       不合格原因: updatedColumn.不合格原因,
      //       审核状态: updatedColumn.审核状态,
      //       remarks: updatedColumn.remarks,
      //       detectionData: updatedColumn.detectionData,
      //       updateBy: currentUser.name,
      //       updateTime: new Date().getTime()
      //     },
      //     filter: {
      //       where: {
      //         $and: [
      //           { _id: { $eq: updatedColumn.id } }
      //         ]
      //       }
      //     }
      //   }
      // });

      // if (result.count > 0) {
      //   // 更新本地状态
      //   const updatedColumns = unqualifiedColumns.map(column => column.id === updatedColumn.id ? updatedColumn : column);
      //   setUnqualifiedColumns(updatedColumns);
      //   setFilteredColumns(updatedColumns.map(column => column.id === updatedColumn.id ? updatedColumn : column));

      //   toast({
      //     title: "保存成功",
      //     description: `层析柱 ${updatedColumn.columnSn} 已更新`
      //   });
      //   setShowEditModal(false);
      //   setEditingColumn(null);
      // } else {
      //   throw new Error('更新失败');
      // }

      // 临时模拟保存过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      const updatedColumns = unqualifiedColumns.map(column => column.id === updatedColumn.id ? updatedColumn : column);
      setUnqualifiedColumns(updatedColumns);
      setFilteredColumns(updatedColumns.map(column => column.id === updatedColumn.id ? updatedColumn : column));
      toast({
        title: "保存成功",
        description: `层析柱 ${updatedColumn.columnSn} 已更新`
      });
      setShowEditModal(false);
      setEditingColumn(null);
    } catch (error) {
      console.error('保存失败:', error);
      toast({
        title: "保存失败",
        description: error.message || "无法保存层析柱更改",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
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
      // const detailColumn = {
      //   ...column,
      //   columnSerial: column.columnSn,
      //   columnName: `${column.检测项目}层析柱`,
      //   testType: column.检测项目,
      //   testDate: column.reportDate,
      //   operator: column.负责人,
      //   finalConclusion: 'unqualified',
      //   operationHistory: column.operationHistory || []
      // };
      // setViewingColumn(detailColumn);
      // setShowDetailModal(true);

      // 临时使用本地数据
      const column = unqualifiedColumns.find(c => c.id === columnId);
      if (column) {
        const detailColumn = {
          ...column,
          columnSerial: column.columnSn,
          columnName: `${column.检测项目}层析柱`,
          testType: column.检测项目,
          testDate: column.reportDate,
          operator: column.负责人,
          finalConclusion: 'unqualified',
          operationHistory: [{
            time: column.generateTime,
            operator: column.负责人,
            action: '提交检测',
            remark: `完成${column.检测项目}，发现${column.不合格原因}`
          }]
        };
        setViewingColumn(detailColumn);
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

  // TODO: 下载层析柱报告
  // 需要调用后端接口生成并下载层析柱报告文件
  const handleDownload = async columnId => {
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

      // // 调用报告生成服务
      // const downloadResult = await $w.cloud.callFunction({
      //   name: 'generateColumnReport',
      //   data: {
      //     columnId: columnId,
      //     reportType: 'unqualified',
      //     format: 'pdf'
      //   }
      // });

      toast({
        title: "下载报告",
        description: `正在下载层析柱 ${columnId} 报告，请稍候`
      });

      // 模拟下载过程
      setTimeout(() => {
        toast({
          title: "下载完成",
          description: `层析柱 ${columnId} 报告已下载到本地`
        });
      }, 2000);
    } catch (error) {
      console.error('下载失败:', error);
      toast({
        title: "下载失败",
        description: "无法下载层析柱报告",
        variant: "destructive"
      });
    }
  };

  // TODO: 批量下载层析柱报告
  // 需要调用后端接口批量生成并下载报告
  const handleBatchDownload = async () => {
    if (selectedColumns.length === 0) {
      toast({
        title: "请选择层析柱",
        description: "请先选择要下载报告的层析柱",
        variant: "destructive"
      });
      return;
    }
    try {
      // TODO: 替换为实际的数据源调用
      // const downloadResult = await $w.cloud.callFunction({
      //   name: 'batchGenerateColumnReports',
      //   data: {
      //     columnIds: selectedColumns,
      //     reportType: 'unqualified',
      //     format: 'pdf'
      //   }
      // });

      toast({
        title: "批量下载",
        description: `正在下载 ${selectedColumns.length} 份层析柱报告，请稍候`
      });

      // 模拟批量下载过程
      setTimeout(() => {
        toast({
          title: "批量下载完成",
          description: `${selectedColumns.length} 份层析柱报告已下载完成`
        });
        setSelectedColumns([]);
      }, 3000);
    } catch (error) {
      console.error('批量下载失败:', error);
      toast({
        title: "批量下载失败",
        description: "无法批量下载层析柱报告",
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
    fetchUnqualifiedColumns();
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
              <h1 className="text-2xl font-bold text-gray-900">不合格层析柱管理</h1>
              <p className="text-sm text-gray-500">查看和编辑不合格层析柱检测数据</p>
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
                  <p className="text-2xl font-bold text-red-600">{unqualifiedColumns.length}</p>
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
                    {unqualifiedColumns.filter(c => c.审核状态 === 'pending').length}
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
                    {unqualifiedColumns.filter(c => c.reportType === 'glycation').length}
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
                    {unqualifiedColumns.filter(c => c.reportType === 'thalassemia').length}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">检测类型</label>
                <Select value={searchParams.reportType} onValueChange={value => setSearchParams({
                ...searchParams,
                reportType: value
              })}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择检测类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类型</SelectItem>
                    <SelectItem value="glycation">糖化模式</SelectItem>
                    <SelectItem value="thalassemia">地贫模式</SelectItem>
                    <SelectItem value="purity">纯度分析</SelectItem>
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
        {selectedColumns.length > 0 && <Card className="mb-6 bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-900">
                    已选择 {selectedColumns.length} 个层析柱
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedColumns([])}>
                    取消选择
                  </Button>
                  <Button size="sm" onClick={handleBatchDownload} className="bg-red-600 hover:bg-red-700">
                    <Download className="w-4 h-4 mr-2" />
                    批量下载报告
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
                <AlertTriangle className="w-5 h-5" />
                不合格层析柱列表
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
              </div> : <UnqualifiedReportTable reports={currentColumns} selectedReports={selectedColumns} onSelectReport={handleSelectColumn} onSelectAll={handleSelectAll} onEdit={columnId => {
            const column = unqualifiedColumns.find(c => c.id === columnId);
            if (column) {
              setEditingColumn({
                ...column,
                detectionData: JSON.parse(JSON.stringify(column.detectionData))
              });
              setShowEditModal(true);
            }
          }} onPreview={handlePreview} onDownload={handleDownload} getReportTypeBadge={getReportTypeBadge} />}
          </CardContent>
        </Card>

        {/* 分页组件 */}
        {filteredColumns.length > 0 && <div className="mt-4">
            {renderPagination()}
          </div>}

        {/* 空状态 */}
        {!loading && filteredColumns.length === 0 && <Card className="text-center py-12">
            <CardContent>
              <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无不合格层析柱</h3>
              <p className="text-gray-500 mb-4">请调整查询条件或等待新的检测数据</p>
            </CardContent>
          </Card>}
      </div>

      {/* 编辑模态框 */}
      {showEditModal && editingColumn && <EditModal report={editingColumn} isOpen={showEditModal} onClose={() => {
      setShowEditModal(false);
      setEditingColumn(null);
    }} onSave={handleSaveEdit} saving={saving} />}

      {/* 详情模态框 */}
      {showDetailModal && viewingColumn && <DetailModal report={viewingColumn} isOpen={showDetailModal} onClose={() => {
      setShowDetailModal(false);
      setViewingColumn(null);
    }} />}
    </div>;
}