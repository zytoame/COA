// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, useToast, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui';
// @ts-ignore;
import { Search, Download, Eye, FileText, ArrowLeft, Plus, Loader2, FileCheck, Clock, User } from 'lucide-react';

// 引入子组件
import { ReportTable } from '@/components/ReportTable';
import { ReportStats } from '@/components/ReportStats';
import { SearchFilters } from '@/components/SearchFilters';

// 简化的模拟合格报告数据
const mockQualifiedReports = [{
  id: 'RPT-Q001',
  workOrder: 'WO202501001',
  columnSn: 'COL-2025-001',
  orderNumber: 'ORD-202501001',
  instrumentSerial: 'INST-001',
  reportType: 'glycation',
  status: 'qualified',
  reportDate: '2025-01-15',
  检测项目: '糖化模式',
  检测结果: '合格',
  负责人: '张三',
  审核状态: 'approved',
  fileSize: '2.3MB',
  reportName: '糖化模式报告_20250115',
  generateTime: '2025-01-15 14:30:00',
  lastAccessTime: '2025-01-15 16:45:00',
  accessType: 'download'
}, {
  id: 'RPT-Q002',
  workOrder: 'WO202501002',
  columnSn: 'COL-2025-002',
  orderNumber: 'ORD-202501002',
  instrumentSerial: 'INST-002',
  reportType: 'thalassemia',
  status: 'qualified',
  reportDate: '2025-01-14',
  检测项目: '地贫模式',
  检测结果: '合格',
  负责人: '李四',
  审核状态: 'approved',
  fileSize: '1.8MB',
  reportName: '地贫模式报告_20250114',
  generateTime: '2025-01-14 16:45:00',
  lastAccessTime: '2025-01-15 15:20:00',
  accessType: 'preview'
}, {
  id: 'RPT-Q003',
  workOrder: 'WO202501003',
  columnSn: 'COL-2025-003',
  orderNumber: 'ORD-202501003',
  instrumentSerial: 'INST-001',
  reportType: 'glycation',
  status: 'qualified',
  reportDate: '2025-01-13',
  检测项目: '糖化模式',
  检测结果: '合格',
  负责人: '王五',
  审核状态: 'approved',
  fileSize: '2.1MB',
  reportName: '糖化模式报告_20250113',
  generateTime: '2025-01-13 11:20:00',
  lastAccessTime: '2025-01-15 14:10:00',
  accessType: 'download'
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
  const [qualifiedReports, setQualifiedReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [selectedReports, setSelectedReports] = useState([]);
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
    dateRange: 'all',
    startDate: '',
    endDate: ''
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

  // TODO: 从后端获取合格报告列表
  // 需要调用接口获取最近访问的20份合格报告
  const fetchQualifiedReports = async () => {
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
      //           { testResult: { $eq: '合格' } },
      //           { createBy: { $eq-current-user: true } }
      //         ]
      //       }
      //     },
      //     orderBy: [{ lastAccessTime: 'desc' }],
      //     select: { $master: true },
      //     getCount: true,
      //     pageSize: 20
      //   }
      // });
      // setQualifiedReports(result.records);
      // setFilteredReports(result.records);

      // 临时使用模拟数据
      setQualifiedReports(mockQualifiedReports);
      setFilteredReports(mockQualifiedReports);
    } catch (error) {
      console.error('获取合格报告失败:', error);
      toast({
        title: "获取数据失败",
        description: "无法加载合格报告列表",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // TODO: 根据搜索条件查询报告
  // 需要调用后端接口进行高级搜索
  const handleSearch = async () => {
    setLoading(true);
    try {
      // TODO: 替换为实际的数据源调用
      // const filterConditions = {
      //   $and: [
      //     { testResult: { $eq: '合格' } }
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

      // // 时间范围过滤
      // if (searchParams.dateRange !== 'all') {
      //   let dateFilter = {};
      //   if (searchParams.dateRange === 'today') {
      //     const today = new Date().toISOString().slice(0, 10);
      //     dateFilter = { reportDate: { $eq: today } };
      //   } else if (searchParams.dateRange === 'week') {
      //     const weekAgo = new Date();
      //     weekAgo.setDate(weekAgo.getDate() - 7);
      //     dateFilter = { reportDate: { $gte: weekAgo.toISOString().slice(0, 10) } };
      //   } else if (searchParams.dateRange === 'month') {
      //     const monthAgo = new Date();
      //     monthAgo.setMonth(monthAgo.getMonth() - 1);
      //     dateFilter = { reportDate: { $gte: monthAgo.toISOString().slice(0, 10) } };
      //   } else if (searchParams.dateRange === 'custom' && searchParams.startDate && searchParams.endDate) {
      //     dateFilter = { 
      //       reportDate: { 
      //         $gte: searchParams.startDate,
      //         $lte: searchParams.endDate
      //       } 
      //     };
      //   }
      //   if (Object.keys(dateFilter).length > 0) {
      //     filterConditions.$and.push(dateFilter);
      //   }
      // }

      // const result = await $w.cloud.callDataSource({
      //   dataSourceName: 'chromatography_reports',
      //   methodName: 'wedaGetRecordsV2',
      //   params: {
      //     filter: { where: filterConditions },
      //     orderBy: [{ lastAccessTime: 'desc' }],
      //     select: { $master: true },
      //     getCount: true,
      //     pageSize: 200
      //   }
      // });
      // setFilteredReports(result.records);

      // 临时使用前端过滤
      const filtered = qualifiedReports.filter(report => {
        let matchesSearch = true;

        // 基本条件过滤
        if (searchParams.workOrder && !report.workOrder.toLowerCase().includes(searchParams.workOrder.toLowerCase())) {
          matchesSearch = false;
        }
        if (searchParams.columnSn && !report.columnSn.toLowerCase().includes(searchParams.columnSn.toLowerCase())) {
          matchesSearch = false;
        }
        if (searchParams.orderNumber && !report.orderNumber.toLowerCase().includes(searchParams.orderNumber.toLowerCase())) {
          matchesSearch = false;
        }
        if (searchParams.instrumentSerial && !report.instrumentSerial.toLowerCase().includes(searchParams.instrumentSerial.toLowerCase())) {
          matchesSearch = false;
        }
        if (searchParams.reportType !== 'all' && report.reportType !== searchParams.reportType) {
          matchesSearch = false;
        }

        // 时间范围过滤
        if (searchParams.dateRange !== 'all') {
          const reportDate = new Date(report.reportDate);
          const today = new Date();
          if (searchParams.dateRange === 'today') {
            const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
            if (reportDate < todayStart || reportDate >= todayEnd) {
              matchesSearch = false;
            }
          } else if (searchParams.dateRange === 'week') {
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            if (reportDate < weekAgo) {
              matchesSearch = false;
            }
          } else if (searchParams.dateRange === 'month') {
            const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            if (reportDate < monthAgo) {
              matchesSearch = false;
            }
          } else if (searchParams.dateRange === 'custom' && searchParams.startDate && searchParams.endDate) {
            const startDate = new Date(searchParams.startDate);
            const endDate = new Date(searchParams.endDate);
            endDate.setHours(23, 59, 59, 999); // 包含结束日期的整天
            if (reportDate < startDate || reportDate > endDate) {
              matchesSearch = false;
            }
          }
        }
        return matchesSearch;
      });
      setFilteredReports(filtered);
      setCurrentPage(1); // 重置到第一页
      toast({
        title: "查询完成",
        description: `找到 ${filtered.length} 条合格报告`
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
      dateRange: 'all',
      startDate: '',
      endDate: ''
    });
    setFilteredReports(qualifiedReports);
    setCurrentPage(1); // 重置到第一页
  };

  // TODO: 生成新报告
  // 需要调用后端接口创建新的检测报告
  const handleGenerateReport = async () => {
    if (!searchParams.workOrder && !searchParams.columnSn && !searchParams.orderNumber && !searchParams.instrumentSerial) {
      toast({
        title: "查询条件不足",
        description: "请至少输入一个查询条件",
        variant: "destructive"
      });
      return;
    }
    setGenerating(true);
    try {
      // TODO: 替换为实际的数据源调用
      // const newReportData = {
      //   workOrder: searchParams.workOrder || 'WO' + Date.now(),
      //   columnSn: searchParams.columnSn || 'COL-' + Date.now(),
      //   orderNumber: searchParams.orderNumber || 'ORD-' + Date.now(),
      //   instrumentSerial: searchParams.instrumentSerial || 'INST-' + Math.floor(Math.random() * 1000),
      //   reportType: searchParams.reportType === 'all' ? 'glycation' : searchParams.reportType,
      //   status: 'qualified',
      //   reportDate: new Date().toISOString().slice(0, 10),
      //   检测项目: getReportTypeName(searchParams.reportType),
      //   检测结果: '合格',
      //   负责人: currentUser.name,
      //   审核状态: 'approved',
      //   fileSize: (Math.random() * 3 + 0.5).toFixed(1) + 'MB',
      //   reportName: `${getReportTypeName(searchParams.reportType)}报告_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`,
      //   generateTime: new Date().toLocaleString('zh-CN'),
      //   lastAccessTime: new Date().toLocaleString('zh-CN'),
      //   accessType: 'preview',
      //   createBy: currentUser.name,
      //   createTime: new Date().getTime()
      // };

      // const result = await $w.cloud.callDataSource({
      //   dataSourceName: 'chromatography_reports',
      //   methodName: 'wedaCreateV2',
      //   params: {
      //     data: newReportData
      //   }
      // });

      // if (result._id) {
      //   // 重新获取报告列表
      //   await fetchQualifiedReports();
      //   toast({
      //     title: "报告生成成功",
      //     description: `报告 ${result._id} 已生成，请查看报告列表`
      //   });
      // } else {
      //   throw new Error('生成失败');
      // }

      // 临时模拟报告生成过程
      await new Promise(resolve => setTimeout(resolve, 3000));
      const newReport = {
        id: `RPT-Q-${Date.now()}`,
        workOrder: searchParams.workOrder || 'WO' + Date.now(),
        columnSn: searchParams.columnSn || 'COL-' + Date.now(),
        orderNumber: searchParams.orderNumber || 'ORD-' + Date.now(),
        instrumentSerial: searchParams.instrumentSerial || 'INST-' + Math.floor(Math.random() * 1000),
        reportType: searchParams.reportType === 'all' ? 'glycation' : searchParams.reportType,
        status: 'qualified',
        reportDate: new Date().toISOString().slice(0, 10),
        检测项目: getReportTypeName(searchParams.reportType),
        检测结果: '合格',
        负责人: currentUser.name,
        审核状态: 'approved',
        fileSize: (Math.random() * 3 + 0.5).toFixed(1) + 'MB',
        reportName: `${getReportTypeName(searchParams.reportType)}报告_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`,
        generateTime: new Date().toLocaleString('zh-CN'),
        lastAccessTime: new Date().toLocaleString('zh-CN'),
        accessType: 'preview'
      };
      setQualifiedReports([newReport, ...qualifiedReports.slice(0, 19)]); // 保持最新20份
      setFilteredReports([newReport, ...filteredReports.slice(0, 19)]);
      setCurrentPage(1); // 新报告生成后跳转到第一页
      toast({
        title: "报告生成成功",
        description: `报告 ${newReport.id} 已生成，请查看报告列表`
      });
    } catch (error) {
      console.error('报告生成失败:', error);
      toast({
        title: "报告生成失败",
        description: error.message || "无法生成报告",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  // TODO: 预览报告
  // 需要从后端获取报告详情并显示预览
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

      // // 更新最后访问时间和类型
      // await $w.cloud.callDataSource({
      //   dataSourceName: 'chromatography_reports',
      //   methodName: 'wedaUpdateV2',
      //   params: {
      //     data: {
      //       lastAccessTime: new Date().toLocaleString('zh-CN'),
      //       accessType: 'preview',
      //       updateTime: new Date().getTime()
      //     },
      //     filter: {
      //       where: {
      //         $and: [
      //           { _id: { $eq: reportId } }
      //         ]
      //       }
      //     }
      //   }
      // });

      // 临时使用本地数据更新
      const updatedReports = qualifiedReports.map(r => r.id === reportId ? {
        ...r,
        lastAccessTime: new Date().toLocaleString('zh-CN'),
        accessType: 'preview'
      } : r);
      setQualifiedReports(updatedReports);
      setFilteredReports(updatedReports);
      toast({
        title: "预览报告",
        description: `正在预览报告 ${reportId}，请查看详细信息`
      });
    } catch (error) {
      console.error('预览失败:', error);
      toast({
        title: "预览失败",
        description: "无法预览报告",
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
      //     reportType: 'qualified',
      //     format: 'pdf'
      //   }
      // });

      // // 更新最后访问时间和类型
      // await $w.cloud.callDataSource({
      //   dataSourceName: 'chromatography_reports',
      //   methodName: 'wedaUpdateV2',
      //   params: {
      //     data: {
      //       lastAccessTime: new Date().toLocaleString('zh-CN'),
      //       accessType: 'download',
      //       updateTime: new Date().getTime()
      //     },
      //     filter: {
      //       where: {
      //         $and: [
      //           { _id: { $eq: reportId } }
      //         ]
      //       }
      //     }
      //   }
      // });

      // 临时使用本地数据更新
      const updatedReports = qualifiedReports.map(r => r.id === reportId ? {
        ...r,
        lastAccessTime: new Date().toLocaleString('zh-CN'),
        accessType: 'download'
      } : r);
      setQualifiedReports(updatedReports);
      setFilteredReports(updatedReports);
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
      //     reportType: 'qualified',
      //     format: 'pdf'
      //   }
      // });

      // // 批量更新最后访问时间和类型
      // const updatePromises = selectedReports.map(reportId => 
      //   $w.cloud.callDataSource({
      //     dataSourceName: 'chromatography_reports',
      //     methodName: 'wedaUpdateV2',
      //     params: {
      //       data: {
      //         lastAccessTime: new Date().toLocaleString('zh-CN'),
      //         accessType: 'download',
      //         updateTime: new Date().getTime()
      //       },
      //       filter: {
      //         where: {
      //           $and: [
      //             { _id: { $eq: reportId } }
      //           ]
      //         }
      //       }
      //     }
      //   })
      // );

      // await Promise.all(updatePromises);

      // 临时使用本地数据更新
      const updatedReports = qualifiedReports.map(r => selectedReports.includes(r.id) ? {
        ...r,
        lastAccessTime: new Date().toLocaleString('zh-CN'),
        accessType: 'download'
      } : r);
      setQualifiedReports(updatedReports);
      setFilteredReports(updatedReports);
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

  // 获取访问类型标签
  const getAccessTypeBadge = accessType => {
    return accessType === 'download' ? <Badge variant="default" className="bg-blue-100 text-blue-800 border-blue-200">
        <Download className="w-3 h-3 mr-1" />
        已下载
      </Badge> : <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
        <Eye className="w-3 h-3 mr-1" />
        已预览
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
    fetchQualifiedReports();
  }, []);

  // 计算统计数据
  const todayGenerated = qualifiedReports.filter(r => {
    const today = new Date().toISOString().slice(0, 10);
    return r.generateTime.includes(today);
  }).length;
  const downloadedCount = qualifiedReports.filter(r => r.accessType === 'download').length;
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
              <p className="text-sm text-gray-500">查询和生成各类检测报告（显示最近访问的20份报告）</p>
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
        <ReportStats qualifiedReports={qualifiedReports} todayGenerated={todayGenerated} downloadedCount={downloadedCount} />

        {/* 搜索区域 */}
        <SearchFilters searchParams={searchParams} setSearchParams={setSearchParams} onSearch={handleSearch} onReset={handleReset} loading={loading} />

        {/* 生成报告按钮 */}
        <div className="mb-6">
          <Button onClick={handleGenerateReport} disabled={generating} className="bg-green-600 hover:bg-green-700">
            {generating ? <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                生成中...
              </> : <>
                <Plus className="w-4 h-4 mr-2" />
                生成报告
              </>}
          </Button>
        </div>

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
                最近访问的合格报告
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
              </div> : <ReportTable reports={currentReports} selectedReports={selectedReports} onSelectReport={handleSelectReport} onSelectAll={handleSelectAll} onPreview={handlePreview} onDownload={handleDownload} getReportTypeBadge={getReportTypeBadge} getAccessTypeBadge={getAccessTypeBadge} />}
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