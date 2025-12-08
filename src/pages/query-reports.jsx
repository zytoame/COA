
// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, useToast, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui';
// @ts-ignore;
import { FileText, ArrowLeft, Download, Loader2, FileCheck, User } from 'lucide-react';

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
  testResult: 'qualified',
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
  }
}, {
  id: 'RPT-002',
  workOrder: 'WO202501002',
  columnSn: 'COL-2025-002',
  orderNumber: 'ORD-202501002',
  instrumentSerial: 'INST-002',
  columnName: 'Ion Exchange Column',
  testType: '地贫模式',
  testDate: '2025-01-14',
  testResult: 'qualified',
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
      result: '39.5 秒',
      conclusion: 'pass',
      icon: Timer
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '1.1%',
      conclusion: 'pass',
      icon: Activity
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '包装完好',
      conclusion: 'pass',
      icon: Package
    }
  }
}, {
  id: 'RPT-003',
  workOrder: 'WO202501003',
  columnSn: 'COL-2025-003',
  orderNumber: 'ORD-202501003',
  instrumentSerial: 'INST-001',
  columnName: 'Gel Filtration Column',
  testType: '糖化模式',
  testDate: '2025-01-13',
  testResult: 'unqualified',
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
      result: '42.3 秒',
      conclusion: 'fail',
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
  }
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
      // const downloadPromises = selectedReports.map(reportId => 
      //   $w.cloud.callDataSource({
      //     dataSourceName: 'chromatography_reports',
      //     methodName: 'generateReport',
      //     params: {
      //       reportId: reportId,
      //       format: 'pdf'
      //     }
      //   })
      // );

      // const results = await Promise.all(downloadPromises);
      
      // 临时模拟下载过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "批量下载成功",
        description: `${selectedReports.length} 个报告已开始下载`
      });
      setSelectedReports([]);
    } catch (error) {
      console.error('批量下载失败:', error);
      toast({
        title: "批量下载失败",
        description: error.message || "无法完成批量下载",
        variant: "destructive"
      });
    }
  };

  // TODO: 下载单个报告
  // 需要调用后端接口生成并下载报告
  const handleDownload = async reportId => {
    try {
      // TODO: 替换为实际的数据源调用
      // const result = await $w.cloud.callDataSource({
      //   dataSourceName: 'chromatography_reports',
      //   methodName: 'generateReport',
      //   params: {
      //     reportId: reportId,
      //     format: 'pdf'
      //   }
      // });

      // 临时模拟下载过程
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "下载成功",
        description: "报告已开始下载"
      });
    } catch (error) {
      console.error('下载失败:', error);
      toast({
        title: "下载失败",
        description: error.message || "无法下载报告",
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
              return <Pagination