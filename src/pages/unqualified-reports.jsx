// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui';
// @ts-ignore;
import { Search, Download, Eye, FileText, Calendar, User, ArrowLeft, Filter, Plus, BarChart3, AlertTriangle, Clock, Loader2, FileCheck, Edit, Save, X, RefreshCw } from 'lucide-react';

// 引入子组件
import { EditModal } from '@/components/EditModal';

// 模拟不合格报告数据
const mockUnqualifiedReports = [{
  id: 'RPT-U001',
  workOrder: 'WO202501001',
  columnSn: 'COL-2025-001',
  orderNumber: 'ORD-202501001',
  instrumentSerial: 'INST-001',
  reportType: 'glycation',
  status: 'unqualified',
  reportDate: '2025-01-15',
  检测项目: '糖化模式',
  检测结果: '不合格',
  不合格原因: '纯度低于标准值',
  负责人: '张三',
  审核状态: 'pending',
  fileSize: '2.3MB',
  reportName: '糖化模式报告_20250115',
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
      icon: 'Activity'
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '包装轻微破损',
      conclusion: 'fail',
      icon: 'Package'
    }
  }
}, {
  id: 'RPT-U002',
  workOrder: 'WO202501002',
  columnSn: 'COL-2025-002',
  orderNumber: 'ORD-202501002',
  instrumentSerial: 'INST-002',
  reportType: 'thalassemia',
  status: 'unqualified',
  reportDate: '2025-01-14',
  检测项目: '地贫模式',
  检测结果: '不合格',
  不合格原因: 'pH值超出��围',
  负责人: '李四',
  审核状态: 'pending',
  fileSize: '1.8MB',
  reportName: '地贫模式报告_20250114',
  generateTime: '2025-01-14 16:45:00',
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
      result: '1.2%',
      conclusion: 'pass',
      icon: 'Activity'
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '包装完好',
      conclusion: 'pass',
      icon: 'Package'
    }
  }
}, {
  id: 'RPT-U003',
  workOrder: 'WO202501003',
  columnSn: 'COL-2025-003',
  orderNumber: 'ORD-202501003',
  instrumentSerial: 'INST-001',
  reportType: 'purity',
  status: 'unqualified',
  reportDate: '2025-01-13',
  检测项目: '纯度分析',
  检测结果: '不合格',
  不合格原因: '杂质含量超标',
  负责人: '王五',
  审核状态: 'pending',
  fileSize: '2.1MB',
  reportName: '纯度分析报告_20250113',
  generateTime: '2025-01-13 11:20:00',
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
      result: '2.1%',
      conclusion: 'fail',
      icon: 'Activity'
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '密封塞松动',
      conclusion: 'fail',
      icon: 'Package'
    }
  }
}, {
  id: 'RPT-U004',
  workOrder: 'WO202501004',
  columnSn: 'COL-2025-004',
  orderNumber: 'ORD-202501004',
  instrumentSerial: 'INST-003',
  reportType: 'glycation',
  status: 'unqualified',
  reportDate: '2025-01-12',
  检测项目: '糖化模式',
  检测结果: '不合格',
  不合格原因: '溶解度不达标',
  负责人: '赵六',
  审核状态: 'pending',
  fileSize: '1.9MB',
  reportName: '糖化模式报告_20250112',
  generateTime: '2025-01-12 09:15:00',
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '29.7°C',
      conclusion: 'pass',
      icon: 'Thermometer'
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '7.8 MPa',
      conclusion: 'pass',
      icon: 'Gauge'
    },
    hbA1cAppearanceTime: {
      standard: '36-40 秒',
      result: '35.2 秒',
      conclusion: 'fail',
      icon: 'Timer'
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '0.9%',
      conclusion: 'pass',
      icon: 'Activity'
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '包装完好',
      conclusion: 'pass',
      icon: 'Package'
    }
  }
}, {
  id: 'RPT-U005',
  workOrder: 'WO202501005',
  columnSn: 'COL-2025-005',
  orderNumber: 'ORD-202501005',
  instrumentSerial: 'INST-002',
  reportType: 'thalassemia',
  status: 'unqualified',
  reportDate: '2025-01-11',
  检测项目: '地贫模式',
  检测结果: '不合格',
  不合格原因: '稳定性测试失败',
  负责人: '张三',
  审核状态: 'pending',
  fileSize: '2.5MB',
  reportName: '地贫模式报告_20250111',
  generateTime: '2025-01-11 15:30:00',
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '37.8°C',
      conclusion: 'pass',
      icon: 'Thermometer'
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '8.2 MPa',
      conclusion: 'fail',
      icon: 'Gauge'
    },
    hbA1cAppearanceTime: {
      standard: '36-40 秒',
      result: '41.5 秒',
      conclusion: 'fail',
      icon: 'Timer'
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '1.6%',
      conclusion: 'fail',
      icon: 'Activity'
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '标签模糊',
      conclusion: 'fail',
      icon: 'Package'
    }
  }
}, {
  id: 'RPT-U006',
  workOrder: 'WO202501006',
  columnSn: 'COL-2025-006',
  orderNumber: 'ORD-202501006',
  instrumentSerial: 'INST-001',
  reportType: 'purity',
  status: 'unqualified',
  reportDate: '2025-01-10',
  检测项目: '纯度分析',
  检测结果: '不合格',
  不合格原因: '回收率偏低',
  负责人: '李四',
  审核状态: 'pending',
  fileSize: '2.2MB',
  reportName: '纯度分析报告_20250110',
  generateTime: '2025-01-10 13:20:00',
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '33.4°C',
      conclusion: 'pass',
      icon: 'Thermometer'
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '6.1 MPa',
      conclusion: 'pass',
      icon: 'Gauge'
    },
    hbA1cAppearanceTime: {
      standard: '36-40 秒',
      result: '37.9 秒',
      conclusion: 'pass',
      icon: 'Timer'
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '2.3%',
      conclusion: 'fail',
      icon: 'Activity'
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '包装完好',
      conclusion: 'pass',
      icon: 'Package'
    }
  }
}, {
  id: 'RPT-U007',
  workOrder: 'WO202501007',
  columnSn: 'COL-2025-007',
  orderNumber: 'ORD-202501007',
  instrumentSerial: 'INST-003',
  reportType: 'glycation',
  status: 'unqualified',
  reportDate: '2025-01-09',
  检测项目: '糖化模式',
  检测结果: '不合格',
  不合格原因: '响应时间过长',
  负责人: '王五',
  审核状态: 'pending',
  fileSize: '1.7MB',
  reportName: '糖化模式报告_20250109',
  generateTime: '2025-01-09 10:45:00',
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '36.2°C',
      conclusion: 'pass',
      icon: 'Thermometer'
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '7.5 MPa',
      conclusion: 'pass',
      icon: 'Gauge'
    },
    hbA1cAppearanceTime: {
      standard: '36-40 秒',
      result: '43.8 秒',
      conclusion: 'fail',
      icon: 'Timer'
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '1.1%',
      conclusion: 'pass',
      icon: 'Activity'
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '包装完好',
      conclusion: 'pass',
      icon: 'Package'
    }
  }
}, {
  id: 'RPT-U008',
  workOrder: 'WO202501008',
  columnSn: 'COL-2025-008',
  orderNumber: 'ORD-202501008',
  instrumentSerial: 'INST-002',
  reportType: 'thalassemia',
  status: 'unqualified',
  reportDate: '2025-01-08',
  检测项目: '地贫模式',
  检测结果: '不合格',
  不合格原因: '线性范围不足',
  负责人: '赵六',
  审核状态: 'pending',
  fileSize: '2.0MB',
  reportName: '地贫模式报告_20250108',
  generateTime: '2025-01-08 16:10:00',
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '31.9°C',
      conclusion: 'pass',
      icon: 'Thermometer'
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '5.8 MPa',
      conclusion: 'pass',
      icon: 'Gauge'
    },
    hbA1cAppearanceTime: {
      standard: '36-40 秒',
      result: '36.7 秒',
      conclusion: 'pass',
      icon: 'Timer'
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '1.9%',
      conclusion: 'fail',
      icon: 'Activity'
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '轻微划痕',
      conclusion: 'fail',
      icon: 'Package'
    }
  }
}, {
  id: 'RPT-U009',
  workOrder: 'WO202501009',
  columnSn: 'COL-2025-009',
  orderNumber: 'ORD-202501009',
  instrumentSerial: 'INST-001',
  reportType: 'purity',
  status: 'unqualified',
  reportDate: '2025-01-07',
  检测项目: '纯度分析',
  检测结果: '不合格',
  不合格原因: '检测限偏高',
  负责人: '张三',
  审核状态: 'pending',
  fileSize: '2.4MB',
  reportName: '纯度分析报告_20250107',
  generateTime: '2025-01-07 14:55:00',
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '34.6°C',
      conclusion: 'pass',
      icon: 'Thermometer'
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '6.9 MPa',
      conclusion: 'pass',
      icon: 'Gauge'
    },
    hbA1cAppearanceTime: {
      standard: '36-40 秒',
      result: '38.3 秒',
      conclusion: 'pass',
      icon: 'Timer'
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '1.4%',
      conclusion: 'pass',
      icon: 'Activity'
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '包装完好',
      conclusion: 'pass',
      icon: 'Package'
    }
  }
}, {
  id: 'RPT-U010',
  workOrder: 'WO202501010',
  columnSn: 'COL-2025-010',
  orderNumber: 'ORD-202501010',
  instrumentSerial: 'INST-003',
  reportType: 'glycation',
  status: 'unqualified',
  reportDate: '2025-01-06',
  检测项目: '糖化模式',
  检测结果: '不合格',
  不合格原因: '特异性不足',
  负责人: '李四',
  审核状态: 'pending',
  fileSize: '1.9MB',
  reportName: '糖化模式报告_20250106',
  generateTime: '2025-01-06 11:30:00',
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '37.1°C',
      conclusion: 'pass',
      icon: 'Thermometer'
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '7.3 MPa',
      conclusion: 'pass',
      icon: 'Gauge'
    },
    hbA1cAppearanceTime: {
      standard: '36-40 秒',
      result: '40.2 秒',
      conclusion: 'fail',
      icon: 'Timer'
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '1.7%',
      conclusion: 'fail',
      icon: 'Activity'
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '包装完好',
      conclusion: 'pass',
      icon: 'Package'
    }
  }
}, {
  id: 'RPT-U011',
  workOrder: 'WO202501011',
  columnSn: 'COL-2025-011',
  orderNumber: 'ORD-202501011',
  instrumentSerial: 'INST-002',
  reportType: 'thalassemia',
  status: 'unqualified',
  reportDate: '2025-01-05',
  检测项目: '地贫模式',
  检测结果: '不合格',
  不合格原因: '批间差异过大',
  负责人: '王五',
  审核状态: 'pending',
  fileSize: '2.1MB',
  reportName: '地贫模式报告_20250105',
  generateTime: '2025-01-05 15:20:00',
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '32.8°C',
      conclusion: 'pass',
      icon: 'Thermometer'
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '6.4 MPa',
      conclusion: 'pass',
      icon: 'Gauge'
    },
    hbA1cAppearanceTime: {
      standard: '36-40 秒',
      result: '39.1 秒',
      conclusion: 'pass',
      icon: 'Timer'
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '2.2%',
      conclusion: 'fail',
      icon: 'Activity'
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '包装完好',
      conclusion: 'pass',
      icon: 'Package'
    }
  }
}, {
  id: 'RPT-U012',
  workOrder: 'WO202501012',
  columnSn: 'COL-2025-012',
  orderNumber: 'ORD-202501012',
  instrumentSerial: 'INST-001',
  reportType: 'purity',
  status: 'unqualified',
  reportDate: '2025-01-04',
  检测项目: '纯度分析',
  检测结果: '不合格',
  不合格原因: '载量不足',
  负责人: '赵六',
  审核状态: 'pending',
  fileSize: '2.3MB',
  reportName: '纯度分析报告_20250104',
  generateTime: '2025-01-04 12:40:00',
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '35.7°C',
      conclusion: 'pass',
      icon: 'Thermometer'
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '7.1 MPa',
      conclusion: 'pass',
      icon: 'Gauge'
    },
    hbA1cAppearanceTime: {
      standard: '36-40 秒',
      result: '37.6 秒',
      conclusion: 'pass',
      icon: 'Timer'
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '1.3%',
      conclusion: 'pass',
      icon: 'Activity'
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '包装完好',
      conclusion: 'pass',
      icon: 'Package'
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
  const [unqualifiedReports, setUnqualifiedReports] = useState(mockUnqualifiedReports);
  const [filteredReports, setFilteredReports] = useState(mockUnqualifiedReports);
  const [selectedReports, setSelectedReports] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [saving, setSaving] = useState(false);

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

  // 搜索功能
  const handleSearch = () => {
    const filtered = unqualifiedReports.filter(report => {
      return (!searchParams.workOrder || report.workOrder.toLowerCase().includes(searchParams.workOrder.toLowerCase())) && (!searchParams.columnSn || report.columnSn.toLowerCase().includes(searchParams.columnSn.toLowerCase())) && (!searchParams.orderNumber || report.orderNumber.toLowerCase().includes(searchParams.orderNumber.toLowerCase())) && (!searchParams.instrumentSerial || report.instrumentSerial.toLowerCase().includes(searchParams.instrumentSerial.toLowerCase())) && (searchParams.reportType === 'all' || report.reportType === searchParams.reportType);
    });
    setFilteredReports(filtered);
    setCurrentPage(1); // 重置到第一页
    toast({
      title: "查询完成",
      description: `找到 ${filtered.length} 条不合格报告`
    });
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

  // 编辑报告
  const handleEditReport = reportId => {
    const report = unqualifiedReports.find(r => r.id === reportId);
    if (report) {
      setEditingReport({
        ...report,
        // 深拷贝检测数据以避免直接修改原数据
        detectionData: JSON.parse(JSON.stringify(report.detectionData))
      });
      setShowEditModal(true);
    }
  };

  // 保存编辑
  const handleSaveEdit = async updatedReport => {
    setSaving(true);
    try {
      // 模拟保存过程
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 更新报告列表
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
      toast({
        title: "保存失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  // 预览报告
  const handlePreview = reportId => {
    const report = unqualifiedReports.find(r => r.id === reportId);
    if (report) {
      toast({
        title: "预览报告",
        description: `正在预览报告 ${reportId}，请查看详细信息`
      });
    }
  };

  // 下载报告
  const handleDownload = reportId => {
    const report = unqualifiedReports.find(r => r.id === reportId);
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
        color: 'green'
      },
      purity: {
        label: '纯度分析',
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
                  <p className="text-sm text-gray-500">今日新增</p>
                  <p className="text-2xl font-bold text-red-600">3</p>
                </div>
                <Plus className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">已编辑</p>
                  <p className="text-2xl font-bold text-blue-600">5</p>
                </div>
                <Edit className="w-8 h-8 text-blue-400" />
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" checked={currentReports.length > 0 && currentReports.every(report => selectedReports.includes(report.id))} onChange={e => handleSelectAll(e.target.checked)} className="rounded border-gray-300" />
                  </TableHead>
                  <TableHead>报告编号</TableHead>
                  <TableHead>报告名称</TableHead>
                  <TableHead>工单号</TableHead>
                  <TableHead>层析柱序列号</TableHead>
                  <TableHead>检测项目</TableHead>
                  <TableHead>报告类型</TableHead>
                  <TableHead>检测结果</TableHead>
                  <TableHead>不合格原因</TableHead>
                  <TableHead>负责人</TableHead>
                  <TableHead>生成时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentReports.map(report => <TableRow key={report.id} className="hover:bg-gray-50">
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
                    <TableCell>{report.columnSn}</TableCell>
                    <TableCell>{report.检测项目}</TableCell>
                    <TableCell>{getReportTypeBadge(report.reportType)}</TableCell>
                    <TableCell>
                      <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                        {report.检测结果}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-32">
                        <div className="truncate text-red-600" title={report.不合格原因}>
                          {report.不合格原因}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{report.负责人}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {report.generateTime}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" onClick={() => handleEditReport(report.id)} className="h-8 w-8 p-0" title="编辑报告">
                          <Edit className="w-4 h-4" />
                        </Button>
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

        {/* 分页组件 */}
        {filteredReports.length > 0 && <div className="mt-4">
            {renderPagination()}
          </div>}

        {/* 空状态 */}
        {filteredReports.length === 0 && <Card className="text-center py-12">
            <CardContent>
              <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无不合格报告</h3>
              <p className="text-gray-500 mb-4">所有检测报告都符合标准</p>
            </CardContent>
          </Card>}
      </div>

      {/* 编辑弹窗 */}
      <EditModal isOpen={showEditModal} onClose={() => {
      setShowEditModal(false);
      setEditingReport(null);
    }} report={editingReport} onSave={handleSaveEdit} saving={saving} />
    </div>;
}