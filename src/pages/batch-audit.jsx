// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui';
// @ts-ignore;
import { Search, CheckCircle, Eye, Download, AlertTriangle, Clock, User, Calendar, ChevronDown, ChevronUp, Thermometer, Gauge, Timer, Activity, Package, ArrowLeft, PenTool, XCircle, Loader2 } from 'lucide-react';

// 引入子组件
import { DetectionDataCard } from '@/components/DetectionDataCard';
import { DetailModal } from '@/components/DetailModal';
import { SignaturePad } from '@/components/SignaturePad';

// 模拟待审核层析柱数据
const mockPendingColumns = [{
  id: 'COL-001',
  workOrder: 'WO202501001',
  columnSn: 'COL-2025-001',
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
  testResult: '不合格',
  不合格原因: 'pH值超出范围',
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
  testResult: '不合格',
  不合格原因: '杂质含量超标',
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
}, {
  id: 'COL-004',
  workOrder: 'WO202501004',
  columnSn: 'COL-2025-004',
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
    setTemperature: {
      standard: '25-40°C',
      result: '29.7°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    pressure: {
      standard: '5.0-8.0 MPa',
      result: '7.8 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    peakTime: {
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
  columnSn: 'COL-2025-005',
  orderNumber: 'ORD-202501005',
  instrumentSerial: 'INST-002',
  columnName: 'Hydrophobic Column',
  testType: '稳定性测试',
  testDate: '2025-01-11',
  testResult: '不合格',
  不合格原因: '稳定性测试失败',
  operator: '张三',
  submitTime: '2025-01-11 15:30:00',
  priority: 'high',
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
      result: '8.2 MPa',
      conclusion: 'fail',
      icon: Gauge
    },
    peakTime: {
      standard: '36-40 秒',
      result: '41.5 秒',
      conclusion: 'fail',
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
      result: '标签模糊',
      conclusion: 'fail',
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
}, {
  id: 'COL-006',
  workOrder: 'WO202501006',
  columnSn: 'COL-2025-006',
  orderNumber: 'ORD-202501006',
  instrumentSerial: 'INST-001',
  columnName: 'Size Exclusion Column',
  testType: '回收率测试',
  testDate: '2025-01-10',
  testResult: '不合格',
  不合格原因: '回收率偏低',
  operator: '李四',
  submitTime: '2025-01-10 13:20:00',
  priority: 'medium',
  // 详细检测数据
  detectionData: {
    setTemperature: {
      standard: '25-40°C',
      result: '33.4°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    pressure: {
      standard: '5.0-8.0 MPa',
      result: '6.1 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    peakTime: {
      standard: '36-40 秒',
      result: '37.9 秒',
      conclusion: 'pass',
      icon: Timer
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '2.3%',
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
    time: '2025-01-10 13:20:00',
    operator: '李四',
    action: '提交检测',
    remark: '完成回收率测试'
  }]
}, {
  id: 'COL-007',
  workOrder: 'WO202501007',
  columnSn: 'COL-2025-007',
  orderNumber: 'ORD-202501007',
  instrumentSerial: 'INST-003',
  columnName: 'Reverse Phase Column',
  testType: '响应时间测试',
  testDate: '2025-01-09',
  testResult: '不合格',
  不合格原因: '响应时间过长',
  operator: '王五',
  submitTime: '2025-01-09 10:45:00',
  priority: 'medium',
  // 详细检测数据
  detectionData: {
    setTemperature: {
      standard: '25-40°C',
      result: '36.2°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    pressure: {
      standard: '5.0-8.0 MPa',
      result: '7.5 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    peakTime: {
      standard: '36-40 秒',
      result: '43.8 秒',
      conclusion: 'fail',
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
  },
  finalConclusion: 'unqualified',
  operationHistory: [{
    time: '2025-01-09 10:45:00',
    operator: '王五',
    action: '提交检测',
    remark: '完成响应时间测试'
  }]
}, {
  id: 'COL-008',
  workOrder: 'WO202501008',
  columnSn: 'COL-2025-008',
  orderNumber: 'ORD-202501008',
  instrumentSerial: 'INST-002',
  columnName: 'Chromatography Column',
  testType: '线性范围测试',
  testDate: '2025-01-08',
  testResult: '不合格',
  不合格原因: '线性范围不足',
  operator: '赵六',
  submitTime: '2025-01-08 16:10:00',
  priority: 'low',
  // 详细检测数据
  detectionData: {
    setTemperature: {
      standard: '25-40°C',
      result: '31.9°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    pressure: {
      standard: '5.0-8.0 MPa',
      result: '5.8 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    peakTime: {
      standard: '36-40 秒',
      result: '36.7 秒',
      conclusion: 'pass',
      icon: Timer
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '1.9%',
      conclusion: 'fail',
      icon: Activity
    },
    appearanceInspection: {
      standard: '包装完整，无明显损坏',
      result: '轻微划痕',
      conclusion: 'fail',
      icon: Package
    }
  },
  finalConclusion: 'unqualified',
  operationHistory: [{
    time: '2025-01-08 16:10:00',
    operator: '赵六',
    action: '提交检测',
    remark: '完成线性范围测试'
  }]
}, {
  id: 'COL-009',
  workOrder: 'WO202501009',
  columnSn: 'COL-2025-009',
  orderNumber: 'ORD-202501009',
  instrumentSerial: 'INST-001',
  columnName: 'Purification Column',
  testType: '检测限测试',
  testDate: '2025-01-07',
  testResult: '不合格',
  不合格原因: '检测限偏高',
  operator: '张三',
  submitTime: '2025-01-07 14:55:00',
  priority: 'medium',
  // 详细检测数据
  detectionData: {
    setTemperature: {
      standard: '25-40°C',
      result: '34.6°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    pressure: {
      standard: '5.0-8.0 MPa',
      result: '6.9 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    peakTime: {
      standard: '36-40 秒',
      result: '38.3 秒',
      conclusion: 'pass',
      icon: Timer
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '1.4%',
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
    time: '2025-01-07 14:55:00',
    operator: '张三',
    action: '提交检测',
    remark: '完成检测限测试'
  }]
}, {
  id: 'COL-010',
  workOrder: 'WO202501010',
  columnSn: 'COL-2025-010',
  orderNumber: 'ORD-202501010',
  instrumentSerial: 'INST-003',
  columnName: 'Analysis Column',
  testType: '特异性测试',
  testDate: '2025-01-06',
  testResult: '不合格',
  不合格原因: '特异性不足',
  operator: '李四',
  submitTime: '2025-01-06 11:30:00',
  priority: 'low',
  // 详细检测数据
  detectionData: {
    setTemperature: {
      standard: '25-40°C',
      result: '37.1°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    pressure: {
      standard: '5.0-8.0 MPa',
      result: '7.3 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    peakTime: {
      standard: '36-40 秒',
      result: '40.2 秒',
      conclusion: 'fail',
      icon: Timer
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '1.7%',
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
    time: '2025-01-06 11:30:00',
    operator: '李四',
    action: '提交检测',
    remark: '完成特异性测试'
  }]
}, {
  id: 'COL-011',
  workOrder: 'WO202501011',
  columnSn: 'COL-2025-011',
  orderNumber: 'ORD-202501011',
  instrumentSerial: 'INST-002',
  columnName: 'Separation Column',
  testType: '批间差异测试',
  testDate: '2025-01-05',
  testResult: '不合格',
  不合格原因: '批间差异过大',
  operator: '王五',
  submitTime: '2025-01-05 15:20:00',
  priority: 'medium',
  // 详细检测数据
  detectionData: {
    setTemperature: {
      standard: '25-40°C',
      result: '32.8°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    pressure: {
      standard: '5.0-8.0 MPa',
      result: '6.4 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    peakTime: {
      standard: '36-40 秒',
      result: '39.1 秒',
      conclusion: 'pass',
      icon: Timer
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '2.2%',
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
    time: '2025-01-05 15:20:00',
    operator: '王五',
    action: '提交检测',
    remark: '完成批间差异测试'
  }]
}, {
  id: 'COL-012',
  workOrder: 'WO202501012',
  columnSn: 'COL-2025-012',
  orderNumber: 'ORD-202501012',
  instrumentSerial: 'INST-001',
  columnName: 'HPLC Column',
  testType: '载量测试',
  testDate: '2025-01-04',
  testResult: '不合格',
  不合格原因: '载量不足',
  operator: '赵六',
  submitTime: '2025-01-04 12:40:00',
  priority: 'low',
  // 详细检测数据
  detectionData: {
    setTemperature: {
      standard: '25-40°C',
      result: '35.7°C',
      conclusion: 'pass',
      icon: Thermometer
    },
    pressure: {
      standard: '5.0-8.0 MPa',
      result: '7.1 MPa',
      conclusion: 'pass',
      icon: Gauge
    },
    peakTime: {
      standard: '36-40 秒',
      result: '37.6 秒',
      conclusion: 'pass',
      icon: Timer
    },
    repeatabilityTest: {
      standard: 'CV < 1.5%',
      result: '1.3%',
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
    time: '2025-01-04 12:40:00',
    operator: '赵六',
    action: '提交检测',
    remark: '完成载量测试'
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
  const [pendingColumns, setPendingColumns] = useState(mockPendingColumns);
  const [filteredPendingColumns, setFilteredPendingColumns] = useState(mockPendingColumns);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [expandedColumns, setExpandedColumns] = useState(new Set());
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [signing, setSigning] = useState(false);
  const [auditComment, setAuditComment] = useState('');
  const [auditAction, setAuditAction] = useState('approve');

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // 每页显示10条记录

  // 搜索条件
  const [auditSearchParams, setAuditSearchParams] = useState({
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
  const totalPages = Math.ceil(filteredPendingColumns.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentColumns = filteredPendingColumns.slice(startIndex, endIndex);

  // 获取优先级标签
  const getPriorityBadge = priority => {
    const priorityConfig = {
      high: {
        label: '高',
        color: 'destructive'
      },
      medium: {
        label: '中',
        color: 'secondary'
      },
      low: {
        label: '低',
        color: 'outline'
      }
    };
    const config = priorityConfig[priority] || priorityConfig.medium;
    return <Badge variant={config.color}>{config.label}</Badge>;
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
      }
    };
    const config = statusConfig[status] || statusConfig.unqualified;
    return <Badge variant={config.color}>{config.label}</Badge>;
  };

  // 搜索功能
  const handleAuditSearch = () => {
    const filtered = pendingColumns.filter(column => {
      return (!auditSearchParams.workOrder || column.workOrder.toLowerCase().includes(auditSearchParams.workOrder.toLowerCase())) && (!auditSearchParams.columnSn || column.columnSn.toLowerCase().includes(auditSearchParams.columnSn.toLowerCase())) && (!auditSearchParams.orderNumber || column.orderNumber.toLowerCase().includes(auditSearchParams.orderNumber.toLowerCase())) && (!auditSearchParams.instrumentSerial || column.instrumentSerial.toLowerCase().includes(auditSearchParams.instrumentSerial.toLowerCase())) && (auditSearchParams.testType === 'all' || column.testType === auditSearchParams.testType) && (auditSearchParams.priority === 'all' || column.priority === auditSearchParams.priority);
    });
    setFilteredPendingColumns(filtered);
    setCurrentPage(1); // 重置到第一页
    toast({
      title: "查询完成",
      description: `找到 ${filtered.length} 条待审核记录`
    });
  };

  // 重置搜索
  const handleAuditReset = () => {
    setAuditSearchParams({
      workOrder: '',
      columnSn: '',
      orderNumber: '',
      instrumentSerial: '',
      testType: 'all',
      priority: 'all'
    });
    setFilteredPendingColumns(pendingColumns);
    setCurrentPage(1); // 重置到第一页
  };

  // 批量选择
  const handleSelectAll = checked => {
    if (checked) {
      setSelectedColumns([...selectedColumns, ...currentColumns.map(column => column.id)]);
    } else {
      setSelectedColumns(selectedColumns.filter(id => !currentColumns.some(column => column.id === id)));
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

  // 下载COA报告
  const handleDownloadCOA = columnId => {
    const column = pendingColumns.find(c => c.id === columnId);
    if (column) {
      toast({
        title: "下载COA报告",
        description: `正在下载 ${column.columnSn} 的COA报告`
      });
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
          显示第 {startIndex + 1} - {Math.min(endIndex, filteredPendingColumns.length)} 条，共 {filteredPendingColumns.length} 条记录
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
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">批量审核签字</h1>
              <p className="text-sm text-gray-500">批量审核待审核的层析柱，支持电子签名和审核意见记录</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <User className="w-3 h-3 mr-1" />
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
                  <p className="text-sm text-gray-500">待审核总数</p>
                  <p className="text-2xl font-bold">{pendingColumns.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">高优先级</p>
                  <p className="text-2xl font-bold text-red-600">
                    {pendingColumns.filter(c => c.priority === 'high').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">已选择</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedColumns.length}</p>
                </div>
                <Activity className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">今日提交</p>
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
              <Search className="w-5 h-5" />
              查询条件
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">工单号</label>
                <Input placeholder="请输入工单号" value={auditSearchParams.workOrder} onChange={e => setAuditSearchParams({
                ...auditSearchParams,
                workOrder: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">层析柱序列号</label>
                <Input placeholder="请输入层析柱序列号" value={auditSearchParams.columnSn} onChange={e => setAuditSearchParams({
                ...auditSearchParams,
                columnSn: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">订单号</label>
                <Input placeholder="请输入订单号" value={auditSearchParams.orderNumber} onChange={e => setAuditSearchParams({
                ...auditSearchParams,
                orderNumber: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">仪器序列号</label>
                <Input placeholder="请输入仪器序列号" value={auditSearchParams.instrumentSerial} onChange={e => setAuditSearchParams({
                ...auditSearchParams,
                instrumentSerial: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">检测类型</label>
                <Select value={auditSearchParams.testType} onValueChange={value => setAuditSearchParams({
                ...auditSearchParams,
                testType: value
              })}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择检测类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类型</SelectItem>
                    <SelectItem value="糖化模式">糖化模式</SelectItem>
                    <SelectItem value="地貧模式">地貧模式</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">优先级</label>
                <Select value={auditSearchParams.priority} onValueChange={value => setAuditSearchParams({
                ...auditSearchParams,
                priority: value
              })}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择优先级" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部优先级</SelectItem>
                    <SelectItem value="high">高</SelectItem>
                    <SelectItem value="medium">中</SelectItem>
                    <SelectItem value="low">低</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAuditSearch} className="bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4 mr-2" />
                查询
              </Button>
              <Button variant="outline" onClick={handleAuditReset}>
                重置
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 操作区域 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Button onClick={handleBatchAudit} disabled={selectedColumns.length === 0} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              批量审核 ({selectedColumns.length})
            </Button>
            <Button variant="outline" onClick={() => setSelectedColumns([])} disabled={selectedColumns.length === 0}>
              清除选择
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            当前页显示 {currentColumns.length} 条，共 {filteredPendingColumns.length} 条待审核记录
          </div>
        </div>

        {/* 待审核列表 */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" checked={currentColumns.length > 0 && currentColumns.every(column => selectedColumns.includes(column.id))} onChange={e => handleSelectAll(e.target.checked)} className="rounded border-gray-300" />
                  </TableHead>
                  <TableHead>层析柱序列号</TableHead>
                  <TableHead>层析柱名称</TableHead>
                  <TableHead>工单号</TableHead>
                  <TableHead>检测类型</TableHead>
                  <TableHead>检测日期</TableHead>
                  <TableHead>操作员</TableHead>
                  <TableHead>优先级</TableHead>
                  <TableHead>检测结果</TableHead>
                  <TableHead>提交时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentColumns.map(column => <React.Fragment key={column.id}>
                    <TableRow className="hover:bg-gray-50">
                      <TableCell>
                        <input type="checkbox" checked={selectedColumns.includes(column.id)} onChange={() => handleSelectColumn(column.id)} className="rounded border-gray-300" />
                      </TableCell>
                      <TableCell className="font-medium">{column.columnSn}</TableCell>
                      <TableCell>
                        <div className="max-w-32">
                          <div className="truncate" title={column.columnName}>
                            {column.columnName}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{column.workOrder}</TableCell>
                      <TableCell>{column.testType}</TableCell>
                      <TableCell>{column.testDate}</TableCell>
                      <TableCell>{column.operator}</TableCell>
                      <TableCell>{getPriorityBadge(column.priority)}</TableCell>
                      <TableCell>{getStatusBadge(column.finalConclusion)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {column.submitTime}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" onClick={() => toggleExpanded(column.id)} className="h-8 w-8 p-0">
                            {expandedColumns.has(column.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleViewDetail(column.id)} className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDownloadCOA(column.id)} className="h-8 w-8 p-0">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedColumns.has(column.id) && <TableRow>
                        <TableCell colSpan={11} className="p-0">
                          <div className="p-4 bg-gray-50">
                            <DetectionDataCard detectionData={column.detectionData} finalConclusion={column.finalConclusion} />
                          </div>
                        </TableCell>
                      </TableRow>}
                  </React.Fragment>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 分页组件 */}
        {filteredPendingColumns.length > 0 && <div className="mt-4">
            {renderPagination()}
          </div>}

        {/* 空状态 */}
        {filteredPendingColumns.length === 0 && <Card className="text-center py-12">
            <CardContent>
              <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无待审核记录</h3>
              <p className="text-gray-500 mb-4">所有层析柱都已审核完成</p>
            </CardContent>
          </Card>}
      </div>

      {/* 详情弹窗 */}
      <DetailModal column={selectedColumn} isOpen={showDetailModal} onClose={handleCloseDetailModal} />

      {/* 签名板 */}
      <SignaturePad showSignaturePad={showSignaturePad} setShowSignaturePad={setShowSignaturePad} signing={signing} setSigning={setSigning} auditComment={auditComment} setAuditComment={setAuditComment} auditAction={auditAction} setAuditAction={setAuditAction} onConfirmAudit={confirmAudit} selectedColumns={selectedColumns} />
    </div>;
}