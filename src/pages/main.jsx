// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, Edit, RefreshCw, Download, Eye, Filter, FileText, AlertTriangle, CheckCircle, Clock, Shield, User, Calendar, PenTool, Loader2, X, Save, Calculator, ChevronDown, ChevronUp, Thermometer, Gauge, Timer, Activity, Package, XCircle, ExternalLink } from 'lucide-react';

// 引入抽离的组件
import { EditModal } from '@/components/EditModal';
import { DetectionDataCard } from '@/components/DetectionDataCard';
import { DetailModal } from '@/components/DetailModal';
import { BatchAuditSection } from '@/components/BatchAuditSection';
import { SignaturePad } from '@/components/SignaturePad';

// 模拟合格报告数据（只有合格的层析柱才会生成报告）
const mockQualifiedReports = [{
  id: 'RPT-Q001',
  workOrder: 'WO202501001',
  columnSerial: 'COL-2025-001',
  orderNumber: 'ORD-202501001',
  instrumentSerial: 'INST-001',
  reportType: 'quality',
  status: 'qualified',
  reportDate: '2025-01-15',
  检测项目: '纯度检测',
  检测结果: '合格',
  负责人: '张三',
  审核状态: 'approved',
  fileSize: '2.3MB',
  reportName: '质量检测报告_20250115'
}, {
  id: 'RPT-Q002',
  workOrder: 'WO202501002',
  columnSerial: 'COL-2025-002',
  orderNumber: 'ORD-202501002',
  instrumentSerial: 'INST-002',
  reportType: 'stability',
  status: 'qualified',
  reportDate: '2025-01-14',
  检测项目: '稳定性测试',
  检测结果: '合格',
  负责人: '李四',
  审核状态: 'approved',
  fileSize: '1.8MB',
  reportName: '稳定性测试报告_20250114'
}, {
  id: 'RPT-Q003',
  workOrder: 'WO202501003',
  columnSerial: 'COL-2025-003',
  orderNumber: 'ORD-202501003',
  instrumentSerial: 'INST-001',
  reportType: 'purity',
  status: 'qualified',
  reportDate: '2025-01-13',
  检测项目: '纯度分析',
  检测结果: '合格',
  负责人: '王五',
  审核状态: 'approved',
  fileSize: '2.1MB',
  reportName: '纯度分析报告_20250113'
}];

// 模拟不合格报告数据（管理员专用）
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

// 模拟待审核层析柱数据（从batch-audit迁移）
const mockPendingColumns = [{
  id: 'COL-001',
  workOrder: 'WO202501001',
  columnSerial: 'COL-2025-001',
  orderNumber: 'ORD-202501001',
  instrumentSerial: 'INST-001',
  columnName: 'Protein A Column',
  testType: '纯度检测',
  testDate: '2025-01-15',
  testResult: '不合格',
  不合格原因: '纯度低于标准值',
  operator: '张三',
  submitTime: '2025-01-15 14:30:00',
  priority: 'high',
  // 详细检测数据
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '38.5°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '7.2 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    hbA1cAppearanceTime: {
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
  columnSerial: 'COL-2025-002',
  orderNumber: 'ORD-202501002',
  instrumentSerial: 'INST-002',
  columnName: 'Ion Exchange Column',
  testType: 'pH值检测',
  testDate: '2025-01-14',
  testResult: '不合格',
  不合格原因: 'pH值超出范围',
  operator: '李四',
  submitTime: '2025-01-14 16:45:00',
  priority: 'medium',
  // 详细检测数据
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '35.2°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '6.8 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    hbA1cAppearanceTime: {
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
  columnSerial: 'COL-2025-003',
  orderNumber: 'ORD-202501003',
  instrumentSerial: 'INST-001',
  columnName: 'Gel Filtration Column',
  testType: '杂质含量',
  testDate: '2025-01-13',
  testResult: '不合格',
  不合格原因: '杂质含量超标',
  operator: '王五',
  submitTime: '2025-01-13 11:20:00',
  priority: 'low',
  // 详细检测数据
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '32.1°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '5.5 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    hbA1cAppearanceTime: {
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
}, {
  id: 'COL-004',
  workOrder: 'WO202501004',
  columnSerial: 'COL-2025-004',
  orderNumber: 'ORD-202501004',
  instrumentSerial: 'INST-003',
  columnName: 'Affinity Column',
  testType: '溶解度测试',
  testDate: '2025-01-12',
  testResult: '不合格',
  不合格原因: '溶解度不达标',
  operator: '赵六',
  submitTime: '2025-01-12 09:15:00',
  priority: 'high',
  // 详细检测数据
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '29.7°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '7.8 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    hbA1cAppearanceTime: {
      standard: '36-40 秒',
      result: '35.2 秒',
      conclusion: 'fail',
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
  finalConclusion: 'unqualified',
  operationHistory: [{
    time: '2025-01-12 09:15:00',
    operator: '赵六',
    action: '提交检测',
    remark: '完成溶解度测试'
  }]
}, {
  id: 'COL-005',
  workOrder: 'WO202501005',
  columnSerial: 'COL-2025-005',
  orderNumber: 'ORD-202501005',
  instrumentSerial: 'INST-002',
  columnName: 'HPLC Column',
  testType: '稳定性测试',
  testDate: '2025-01-11',
  testResult: '不合格',
  不合格原因: '稳定性时间不足',
  operator: '张三',
  submitTime: '2025-01-11 15:30:00',
  priority: 'medium',
  // 详细检测数据
  detectionData: {
    moduleTemperature: {
      standard: '25-40°C',
      result: '36.8°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    systemPressure: {
      standard: '5.0-8.0 MPa',
      result: '6.2 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    hbA1cAppearanceTime: {
      standard: '36-40 秒',
      result: '37.5 秒',
      conclusion: 'pass',
      icon: Timer
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '1.6%',
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
  finalConclusion: 'unqualified',
  operationHistory: [{
    time: '2025-01-11 15:30:00',
    operator: '张三',
    action: '提交检测',
    remark: '完成稳定性测试'
  }]
}];
export default function MainPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();

  // 当前用户信息
  const currentUser = {
    name: '管理员',
    type: 'admin'
  };

  // 管理员状态
  const [activeTab, setActiveTab] = useState('reports'); // reports, query, audit
  const [unqualifiedReports, setUnqualifiedReports] = useState(mockUnqualifiedReports);
  const [filteredUnqualifiedReports, setFilteredUnqualifiedReports] = useState(mockUnqualifiedReports);
  const [pendingColumns, setPendingColumns] = useState(mockPendingColumns);
  const [filteredPendingColumns, setFilteredPendingColumns] = useState(mockPendingColumns);
  const [selectedReports, setSelectedReports] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [signing, setSigning] = useState(false);
  const [auditComment, setAuditComment] = useState('');
  const [auditAction, setAuditAction] = useState('approve');

  // 编辑相关状态
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingReport, setEditingReport] = useState(null);

  // 批量审核相关状态（从batch-audit迁移）
  const [expandedColumns, setExpandedColumns] = useState(new Set());
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);

  // 客户状态
  const [qualifiedReports, setQualifiedReports] = useState(mockQualifiedReports);
  const [filteredQualifiedReports, setFilteredQualifiedReports] = useState(mockQualifiedReports);
  const [generating, setGenerating] = useState(false);

  // 搜索条件 - 管理员
  const [adminSearchParams, setAdminSearchParams] = useState({
    workOrder: '',
    columnSerial: '',
    orderNumber: '',
    instrumentSerial: '',
    status: 'all',
    auditStatus: 'all'
  });

  // 搜索条件 - 客户
  const [customerSearchParams, setCustomerSearchParams] = useState({
    workOrder: '',
    columnSerial: '',
    orderNumber: '',
    instrumentSerial: '',
    reportType: 'all',
    dateRange: 'all'
  });

  // 待审核搜索条件（从batch-audit迁移）
  const [auditSearchParams, setAuditSearchParams] = useState({
    workOrder: '',
    columnSerial: '',
    orderNumber: '',
    instrumentSerial: '',
    testType: 'all',
    priority: 'all'
  });

  // 分页
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // 处理编辑报告
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
    setFilteredUnqualifiedReports(updatedReports);
  };

  // 管理员搜索功能
  const handleAdminSearch = () => {
    setLoading(true);
    setTimeout(() => {
      if (activeTab === 'reports') {
        const filtered = unqualifiedReports.filter(report => {
          return (!adminSearchParams.workOrder || report.workOrder.toLowerCase().includes(adminSearchParams.workOrder.toLowerCase())) && (!adminSearchParams.columnSerial || report.columnSerial.toLowerCase().includes(adminSearchParams.columnSerial.toLowerCase())) && (!adminSearchParams.orderNumber || report.orderNumber.toLowerCase().includes(adminSearchParams.orderNumber.toLowerCase())) && (!adminSearchParams.instrumentSerial || report.instrumentSerial.toLowerCase().includes(adminSearchParams.instrumentSerial.toLowerCase())) && (adminSearchParams.status === 'all' || report.status === adminSearchParams.status) && (adminSearchParams.auditStatus === 'all' || report.审核状态 === adminSearchParams.auditStatus);
        });
        setFilteredUnqualifiedReports(filtered);
      } else if (activeTab === 'audit') {
        const filtered = pendingColumns.filter(column => {
          return (!auditSearchParams.workOrder || column.workOrder.toLowerCase().includes(auditSearchParams.workOrder.toLowerCase())) && (!auditSearchParams.columnSerial || column.columnSerial.toLowerCase().includes(auditSearchParams.columnSerial.toLowerCase())) && (!auditSearchParams.orderNumber || column.orderNumber.toLowerCase().includes(auditSearchParams.orderNumber.toLowerCase())) && (!auditSearchParams.instrumentSerial || column.instrumentSerial.toLowerCase().includes(auditSearchParams.instrumentSerial.toLowerCase())) && (auditSearchParams.testType === 'all' || column.testType === auditSearchParams.testType) && (auditSearchParams.priority === 'all' || column.priority === auditSearchParams.priority);
        });
        setFilteredPendingColumns(filtered);
      }
      setCurrentPage(1);
      setLoading(false);
      toast({
        title: "查询完成",
        description: `找到 ${activeTab === 'reports' ? filteredUnqualifiedReports.length : filteredPendingColumns.length} 条记录`
      });
    }, 500);
  };

  // 客户搜索功能
  const handleCustomerSearch = () => {
    const filtered = qualifiedReports.filter(report => {
      return (!customerSearchParams.workOrder || report.workOrder.toLowerCase().includes(customerSearchParams.workOrder.toLowerCase())) && (!customerSearchParams.columnSerial || report.columnSerial.toLowerCase().includes(customerSearchParams.columnSerial.toLowerCase())) && (!customerSearchParams.orderNumber || report.orderNumber.toLowerCase().includes(customerSearchParams.orderNumber.toLowerCase())) && (!customerSearchParams.instrumentSerial || report.instrumentSerial.toLowerCase().includes(customerSearchParams.instrumentSerial.toLowerCase())) && (customerSearchParams.reportType === 'all' || report.reportType === customerSearchParams.reportType);
    });
    setFilteredQualifiedReports(filtered);
    toast({
      title: "查询完成",
      description: `找到 ${filtered.length} 条合格报告`
    });
  };

  // 生成报告（客户功能）
  const handleGenerateReport = async () => {
    if (!customerSearchParams.workOrder && !customerSearchParams.columnSerial && !customerSearchParams.orderNumber && !customerSearchParams.instrumentSerial) {
      toast({
        title: "查询条件不足",
        description: "请至少输入一个查询条件",
        variant: "destructive"
      });
      return;
    }
    setGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const newReport = {
        id: `RPT-Q-${Date.now()}`,
        workOrder: customerSearchParams.workOrder || 'WO' + Date.now(),
        columnSerial: customerSearchParams.columnSerial || 'COL-' + Date.now(),
        orderNumber: customerSearchParams.orderNumber || 'ORD-' + Date.now(),
        instrumentSerial: customerSearchParams.instrumentSerial || 'INST-' + Math.floor(Math.random() * 1000),
        reportType: customerSearchParams.reportType === 'all' ? 'quality' : customerSearchParams.reportType,
        status: 'qualified',
        reportDate: new Date().toISOString().slice(0, 10),
        检测项目: getReportTypeName(customerSearchParams.reportType),
        检测结果: '合格',
        负责人: '系统',
        审核状态: 'approved',
        fileSize: (Math.random() * 3 + 0.5).toFixed(1) + 'MB',
        reportName: `${getReportTypeName(customerSearchParams.reportType)}报告_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`
      };
      setQualifiedReports([newReport, ...qualifiedReports]);
      setFilteredQualifiedReports([newReport, ...filteredQualifiedReports]);
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
    toast({
      title: "预览报告",
      description: `正在预览报告 ${reportId}`
    });
  };

  // 下载报告
  const handleDownload = reportId => {
    toast({
      title: "下载报告",
      description: `正在下载报告 ${reportId}`
    });
  };

  // 获取报告类型名称
  const getReportTypeName = type => {
    const typeMap = {
      quality: '质量检测',
      stability: '稳定性测试',
      purity: '纯度分析',
      all: '综合'
    };
    return typeMap[type] || '质量检测';
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

  // 批量审核
  const handleBatchAudit = () => {
    if (selectedColumns.length === 0) {
      toast({
        title: "请选择待审核项目",
        description: "请先选择需要审核的层析柱",
        variant: "destructive"
      });
      return;
    }
    setShowSignaturePad(true);
  };

  // 确认审核
  const confirmAudit = async () => {
    setSigning(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const updatedColumns = pendingColumns.filter(column => !selectedColumns.includes(column.id));
      setPendingColumns(updatedColumns);
      setFilteredPendingColumns(updatedColumns);
      setSelectedColumns([]);
      toast({
        title: "审核完成",
        description: `已${auditAction === 'approve' ? '通过' : '拒绝'} ${selectedColumns.length} 个层析柱的审核`
      });
      setShowSignaturePad(false);
      setAuditComment('');
    } catch (error) {
      toast({
        title: "审核失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSigning(false);
    }
  };

  // 批量审核相关功能（从batch-audit迁移）
  // 搜索功能
  const handleAuditSearch = () => {
    const filtered = pendingColumns.filter(column => {
      return (!auditSearchParams.workOrder || column.workOrder.toLowerCase().includes(auditSearchParams.workOrder.toLowerCase())) && (!auditSearchParams.columnSerial || column.columnSerial.toLowerCase().includes(auditSearchParams.columnSerial.toLowerCase())) && (!auditSearchParams.orderNumber || column.orderNumber.toLowerCase().includes(auditSearchParams.orderNumber.toLowerCase())) && (!auditSearchParams.instrumentSerial || column.instrumentSerial.toLowerCase().includes(auditSearchParams.instrumentSerial.toLowerCase())) && (auditSearchParams.testType === 'all' || column.testType === auditSearchParams.testType) && (auditSearchParams.priority === 'all' || column.priority === auditSearchParams.priority);
    });
    setFilteredPendingColumns(filtered);
    toast({
      title: "查询完成",
      description: `找到 ${filtered.length} 条待审核记录`
    });
  };

  // 重置搜索
  const handleAuditReset = () => {
    setAuditSearchParams({
      workOrder: '',
      columnSerial: '',
      orderNumber: '',
      instrumentSerial: '',
      testType: 'all',
      priority: 'all'
    });
    setFilteredPendingColumns(pendingColumns);
  };

  // 批量选择
  const handleSelectAll = checked => {
    if (checked) {
      setSelectedColumns(filteredPendingColumns.map(column => column.id));
    } else {
      setSelectedColumns([]);
    }
  };

  // 单个选择
  const handleSelectColumn = columnId => {
    if (selectedColumns.includes(columnId)) {
      setSelectedColumns(selectedColumns.filter(id => id !== columnId));
    } else {
      setSelectedColumns([...selectedColumns, columnId]);
    }
  };

  // 切换检测数据展开状态
  const toggleExpanded = columnId => {
    const newExpanded = new Set(expandedColumns);
    if (newExpanded.has(columnId)) {
      newExpanded.delete(columnId);
    } else {
      newExpanded.add(columnId);
    }
    setExpandedColumns(newExpanded);
  };

  // 查看详情
  const handleViewDetail = columnId => {
    const column = pendingColumns.find(c => c.id === columnId);
    if (column) {
      setSelectedColumn(column);
      setShowDetailModal(true);
    }
  };

  // 关闭详情弹窗
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedColumn(null);
  };

  // 跳转到batch-audit页面
  const handleGoToBatchAudit = () => {
    $w.utils.navigateTo({
      pageId: 'batch-audit',
      params: {}
    });
  };

  // 当前页数据
  const getCurrentPageData = () => {
    let data = [];
    if (currentUser.type === 'admin') {
      if (activeTab === 'reports') {
        data = filteredUnqualifiedReports;
      } else if (activeTab === 'audit') {
        data = filteredPendingColumns;
      }
    } else {
      data = filteredQualifiedReports;
    }
    return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  };
  const totalPages = Math.ceil(currentUser.type === 'admin' ? activeTab === 'reports' ? filteredUnqualifiedReports.length : filteredPendingColumns.length : filteredQualifiedReports.length / pageSize);

  // 管理员界面
  if (currentUser.type === 'admin') {
    return <div style={style} className="min-h-screen bg-gray-50">
        {/* 顶部导航 */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">报告管理系统</h1>
                <p className="text-sm text-gray-500">欢迎回来，{currentUser.name}</p>
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

        {/* 标签页导航 */}
        <div className="bg-white border-b border-gray-200 px-6">
          <div className="flex space-x-8">
            <button onClick={() => setActiveTab('reports')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reports' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              不合格报告管理
            </button>
            <button onClick={() => setActiveTab('query')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'query' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              查询报告
            </button>
            <button onClick={() => setActiveTab('audit')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'audit' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              批量审核签字
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* 不合格报告管理 */}
          {activeTab === 'reports' && <div>
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
                      <Input placeholder="请输入工单号" value={adminSearchParams.workOrder} onChange={e => setAdminSearchParams({
                    ...adminSearchParams,
                    workOrder: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">层析柱序列号</label>
                      <Input placeholder="请输入层析柱序列号" value={adminSearchParams.columnSerial} onChange={e => setAdminSearchParams({
                    ...adminSearchParams,
                    columnSerial: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">订单号</label>
                      <Input placeholder="请输入订单号" value={adminSearchParams.orderNumber} onChange={e => setAdminSearchParams({
                    ...adminSearchParams,
                    orderNumber: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">仪器序列号</label>
                      <Input placeholder="请输入仪器序列号" value={adminSearchParams.instrumentSerial} onChange={e => setAdminSearchParams({
                    ...adminSearchParams,
                    instrumentSerial: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">报告状态</label>
                      <Select value={adminSearchParams.status} onValueChange={value => setAdminSearchParams({
                    ...adminSearchParams,
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
                      <Select value={adminSearchParams.auditStatus} onValueChange={value => setAdminSearchParams({
                    ...adminSearchParams,
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
                    <Button onClick={handleAdminSearch} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                      <Search className="w-4 h-4 mr-2" />
                      查询
                    </Button>
                    <Button variant="outline" onClick={() => {
                  setAdminSearchParams({
                    workOrder: '',
                    columnSerial: '',
                    orderNumber: '',
                    instrumentSerial: '',
                    status: 'all',
                    auditStatus: 'all'
                  });
                  setFilteredUnqualifiedReports(unqualifiedReports);
                }}>
                      重置
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 报告列表 */}
              <Card>
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
                      {getCurrentPageData().map(report => <TableRow key={report.id} className="hover:bg-gray-50">
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
                              待审核
                            </Badge>
                          </TableCell>
                          <TableCell>{report.reportDate}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button size="sm" variant="outline" onClick={() => handlePreview(report.id)} className="h-8 w-8 p-0">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDownload(report.id)} className="h-8 w-8 p-0">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleEditReport(report.id)} className="h-8 w-8 p-0">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => toast({
                          title: "重新计算",
                          description: `正在重新计算报告 ${report.id}`
                        })} className="h-8 w-8 p-0">
                                <RefreshCw className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>}

          {/* 查询报告 */}
          {activeTab === 'query' && <div>
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
                      <Input placeholder="请输入工单号" value={customerSearchParams.workOrder} onChange={e => setCustomerSearchParams({
                    ...customerSearchParams,
                    workOrder: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">层析柱序列号</label>
                      <Input placeholder="请输入层析柱序列号" value={customerSearchParams.columnSerial} onChange={e => setCustomerSearchParams({
                    ...customerSearchParams,
                    columnSerial: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">订单号</label>
                      <Input placeholder="请输入订单号" value={customerSearchParams.orderNumber} onChange={e => setCustomerSearchParams({
                    ...customerSearchParams,
                    orderNumber: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">仪器序列号</label>
                      <Input placeholder="请输入仪器序列号" value={customerSearchParams.instrumentSerial} onChange={e => setCustomerSearchParams({
                    ...customerSearchParams,
                    instrumentSerial: e.target.value
                  })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">报告类型</label>
                      <Select value={customerSearchParams.reportType} onValueChange={value => setCustomerSearchParams({
                    ...customerSearchParams,
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
                    <Button variant="outline" onClick={handleCustomerSearch}>
                      <Search className="w-4 h-4 mr-2" />
                      查询
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 合格报告列表 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      合格报告列表
                    </span>
                    <div className="text-sm text-gray-500">
                      共 {qualifiedReports.length} 份报告
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
                        <TableHead>检测项目</TableHead>
                        <TableHead>检测结果</TableHead>
                        <TableHead>报告日期</TableHead>
                        <TableHead>文件大小</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {qualifiedReports.map(report => <TableRow key={report.id} className="hover:bg-gray-50">
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
                          <TableCell>{report.检测项目}</TableCell>
                          <TableCell>
                            <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                              {report.检测结果}
                            </Badge>
                          </TableCell>
                          <TableCell>{report.reportDate}</TableCell>
                          <TableCell>{report.fileSize}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button size="sm" variant="outline" onClick={() => handlePreview(report.id)} className="h-8 w-8 p-0">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDownload(report.id)} className="h-8 w-8 p-0">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>}

          {/* 批量审核签字 - 使用抽离的组件 */}
          {activeTab === 'audit' && <BatchAuditSection auditSearchParams={auditSearchParams} setAuditSearchParams={setAuditSearchParams} filteredPendingColumns={filteredPendingColumns} pendingColumns={pendingColumns} selectedColumns={selectedColumns} setSelectedColumns={setSelectedColumns} expandedColumns={expandedColumns} setExpandedColumns={setExpandedColumns} showDetailModal={showDetailModal} setShowDetailModal={setShowDetailModal} selectedColumn={selectedColumn} setSelectedColumn={setSelectedColumn} onGoToBatchAudit={handleGoToBatchAudit} onBatchAudit={handleBatchAudit} onAuditSearch={handleAuditSearch} onAuditReset={handleAuditReset} onSelectAll={handleSelectAll} onSelectColumn={handleSelectColumn} onToggleExpanded={toggleExpanded} onViewDetail={handleViewDetail} onCloseDetailModal={handleCloseDetailModal} />}
        </div>

        {/* 编辑弹窗 */}
        <EditModal report={editingReport} isOpen={showEditModal} onClose={() => setShowEditModal(false)} onSave={handleSaveEditedReport} toast={toast} />

        {/* 签名板 */}
        <SignaturePad showSignaturePad={showSignaturePad} setShowSignaturePad={setShowSignaturePad} signing={signing} setSigning={setSigning} auditComment={auditComment} setAuditComment={setAuditComment} auditAction={auditAction} setAuditAction={setAuditAction} onConfirmAudit={confirmAudit} selectedColumns={selectedColumns} />
      </div>;
  }

  // 客户界面
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">报告查询系统</h1>
              <p className="text-sm text-gray-500">欢迎回来，{currentUser.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <User className="w-3 h-3 mr-1" />
              客户
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 搜索区域 */}
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
                <Input placeholder="请输入工单号" value={customerSearchParams.workOrder} onChange={e => setCustomerSearchParams({
                ...customerSearchParams,
                workOrder: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">层析柱序列号</label>
                <Input placeholder="请输入层析柱序列号" value={customerSearchParams.columnSerial} onChange={e => setCustomerSearchParams({
                ...customerSearchParams,
                columnSerial: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">订单号</label>
                <Input placeholder="请输入订单号" value={customerSearchParams.orderNumber} onChange={e => setCustomerSearchParams({
                ...customerSearchParams,
                orderNumber: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">仪器序列号</label>
                <Input placeholder="请输入仪器序列号" value={customerSearchParams.instrumentSerial} onChange={e => setCustomerSearchParams({
                ...customerSearchParams,
                instrumentSerial: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">报告类型</label>
                <Select value={customerSearchParams.reportType} onValueChange={value => setCustomerSearchParams({
                ...customerSearchParams,
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
              <Button variant="outline" onClick={handleCustomerSearch}>
                <Search className="w-4 h-4 mr-2" />
                查询
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 合格报告列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                合格报告列表
              </span>
              <div className="text-sm text-gray-500">
                共 {qualifiedReports.length} 份报告
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
                  <TableHead>检测项目</TableHead>
                  <TableHead>检测结果</TableHead>
                  <TableHead>报告日期</TableHead>
                  <TableHead>文件大小</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qualifiedReports.map(report => <TableRow key={report.id} className="hover:bg-gray-50">
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
                    <TableCell>{report.检测项目}</TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                        {report.检测结果}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.reportDate}</TableCell>
                    <TableCell>{report.fileSize}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" onClick={() => handlePreview(report.id)} className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDownload(report.id)} className="h-8 w-8 p-0">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>;
}