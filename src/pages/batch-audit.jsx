// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, CheckCircle, XCircle, Clock, AlertTriangle, FileText, User, Calendar, PenTool, Download, Eye, RefreshCw, Loader2, ChevronDown, ChevronUp, Thermometer, Gauge, Timer, Activity, Package, X } from 'lucide-react';

// 模拟待审核层析柱数据（包含详细检测数据）
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

// 检测项目详情组件
const DetectionDataCard = ({
  detectionData,
  finalConclusion
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const getConclusionBadge = conclusion => {
    return conclusion === 'pass' ? <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">合格</Badge> : <Badge variant="destructive">不合格</Badge>;
  };
  const getFinalConclusionBadge = conclusion => {
    return conclusion === 'qualified' ? <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">最终合格</Badge> : <Badge variant="destructive">最终不合格</Badge>;
  };
  return <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5" />
            检测数据详情
          </CardTitle>
          <div className="flex items-center gap-2">
            {getFinalConclusionBadge(finalConclusion)}
            <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="h-8 w-8 p-0">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      {isExpanded && <CardContent>
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">图标</TableHead>
                  <TableHead>检测项目</TableHead>
                  <TableHead>标准值</TableHead>
                  <TableHead>检测结果</TableHead>
                  <TableHead>结论</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(detectionData).map(([key, data]) => {
              const Icon = data.icon;
              return <TableRow key={key}>
                      <TableCell>
                        <Icon className="w-5 h-5 text-gray-600" />
                      </TableCell>
                      <TableCell className="font-medium">
                        {key === 'moduleTemperature' && '模块温度'}
                        {key === 'systemPressure' && '系统压力'}
                        {key === 'hbA1cAppearanceTime' && 'HbA1c出峰时间'}
                        {key === 'repeatabilityTest' && '重复性测试'}
                        {key === 'appearanceInspection' && '外观检查'}
                      </TableCell>
                      <TableCell>
                        <span className="text-blue-600 font-medium">{data.standard}</span>
                      </TableCell>
                      <TableCell>
                        <span className={data.conclusion === 'pass' ? 'text-green-600' : 'text-red-600'}>
                          {data.result}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getConclusionBadge(data.conclusion)}
                      </TableCell>
                    </TableRow>;
            })}
              </TableBody>
            </Table>
          </div>
        </CardContent>}
    </Card>;
};

// 详情弹窗组件
const DetailModal = ({
  column,
  isOpen,
  onClose
}) => {
  if (!isOpen || !column) return null;
  const getConclusionBadge = conclusion => {
    return conclusion === 'pass' ? <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">合格</Badge> : <Badge variant="destructive">不合格</Badge>;
  };
  const getFinalConclusionBadge = conclusion => {
    return conclusion === 'qualified' ? <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">最终合格</Badge> : <Badge variant="destructive">最终不合格</Badge>;
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">层析柱检测详情</h2>
            <Button variant="outline" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">基本信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-gray-500">层析柱序列号</span>
                  <p className="font-medium">{column.columnSerial}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">层析柱名称</span>
                  <p className="font-medium">{column.columnName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">工单号</span>
                  <p className="font-medium">{column.workOrder}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">订单号</span>
                  <p className="font-medium">{column.orderNumber}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">仪器序列号</span>
                  <p className="font-medium">{column.instrumentSerial}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">检测类型</span>
                  <p className="font-medium">{column.testType}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">检测日期</span>
                  <p className="font-medium">{column.testDate}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">操作员</span>
                  <p className="font-medium">{column.operator}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">最终结论</span>
                  <div className="mt-1">{getFinalConclusionBadge(column.finalConclusion)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 详细检测数据 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5" />
                详细检测数据
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">图标</TableHead>
                    <TableHead>检测项目</TableHead>
                    <TableHead>标准值</TableHead>
                    <TableHead>检测结果</TableHead>
                    <TableHead>结论</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(column.detectionData).map(([key, data]) => {
                  const Icon = data.icon;
                  return <TableRow key={key}>
                        <TableCell>
                          <Icon className="w-5 h-5 text-gray-600" />
                        </TableCell>
                        <TableCell className="font-medium">
                          {key === 'moduleTemperature' && '模块温度'}
                          {key === 'systemPressure' && '系统压力'}
                          {key === 'hbA1cAppearanceTime' && 'HbA1c出峰时间'}
                          {key === 'repeatabilityTest' && '重复性测试'}
                          {key === 'appearanceInspection' && '外观检查'}
                        </TableCell>
                        <TableCell>
                          <span className="text-blue-600 font-medium">{data.standard}</span>
                        </TableCell>
                        <TableCell>
                          <span className={data.conclusion === 'pass' ? 'text-green-600' : 'text-red-600'}>
                            {data.result}
                          </span>
                        </TableCell>
                        <TableCell>
                          {getConclusionBadge(data.conclusion)}
                        </TableCell>
                      </TableRow>;
                })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 不合格原因 */}
          {column.finalConclusion === 'unqualified' && <Card>
              <CardHeader>
                <CardTitle className="text-lg text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  不合格原因
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">{column.不合格原因}</p>
                </div>
              </CardContent>
            </Card>}

          {/* 操作历史 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5" />
                操作历史
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {column.operationHistory.map((history, index) => <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <User className="w-4 h-4 text-gray-500 mt-0.5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{history.operator}</span>
                        <span className="text-sm text-gray-500">{history.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{history.action}</p>
                      {history.remark && <p className="text-sm text-gray-500 mt-1">{history.remark}</p>}
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              关闭
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              下载COA报告
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default function BatchAuditPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pendingColumns, setPendingColumns] = useState(mockPendingColumns);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState(mockPendingColumns);
  const [loading, setLoading] = useState(false);
  const [signing, setSigning] = useState(false);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [auditComment, setAuditComment] = useState('');
  const [auditAction, setAuditAction] = useState('approve'); // approve or reject
  const [expandedColumns, setExpandedColumns] = useState(new Set());
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);

  // 搜索条件
  const [searchParams, setSearchParams] = useState({
    workOrder: '',
    columnSerial: '',
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

  // 搜索功能
  const handleSearch = () => {
    const filtered = pendingColumns.filter(column => {
      return (!searchParams.workOrder || column.workOrder.toLowerCase().includes(searchParams.workOrder.toLowerCase())) && (!searchParams.columnSerial || column.columnSerial.toLowerCase().includes(searchParams.columnSerial.toLowerCase())) && (!searchParams.orderNumber || column.orderNumber.toLowerCase().includes(searchParams.orderNumber.toLowerCase())) && (!searchParams.instrumentSerial || column.instrumentSerial.toLowerCase().includes(searchParams.instrumentSerial.toLowerCase())) && (searchParams.testType === 'all' || column.testType === searchParams.testType) && (searchParams.priority === 'all' || column.priority === searchParams.priority);
    });
    setFilteredColumns(filtered);
    toast({
      title: "查询完成",
      description: `找到 ${filtered.length} 条待审核记录`
    });
  };

  // 重置搜索
  const handleReset = () => {
    setSearchParams({
      workOrder: '',
      columnSerial: '',
      orderNumber: '',
      instrumentSerial: '',
      testType: 'all',
      priority: 'all'
    });
    setFilteredColumns(pendingColumns);
  };

  // 批量选择
  const handleSelectAll = checked => {
    if (checked) {
      setSelectedColumns(filteredColumns.map(column => column.id));
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

  // 签名板功能
  const startDrawing = e => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };
  const draw = e => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // 清除签名
  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = canvas.toDataURL();
    if (isCanvasEmpty(canvas)) {
      toast({
        title: "请签名",
        description: "请在签名板上签名确认",
        variant: "destructive"
      });
      return;
    }
    setSigning(true);
    try {
      // 模拟审核过程
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 更新状态
      const updatedColumns = pendingColumns.filter(column => !selectedColumns.includes(column.id));
      setPendingColumns(updatedColumns);
      setFilteredColumns(updatedColumns);
      setSelectedColumns([]);
      toast({
        title: "审核完成",
        description: `已${auditAction === 'approve' ? '通过' : '拒绝'} ${selectedColumns.length} 个层析柱的审核`
      });

      // 关闭签名板
      setShowSignaturePad(false);
      clearSignature();
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

  // 检查画布是否为空
  const isCanvasEmpty = canvas => {
    const ctx = canvas.getContext('2d');
    const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let i = 3; i < pixelData.length; i += 4) {
      if (pixelData[i] !== 0) return false;
    }
    return true;
  };
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">批量审核签字</h1>
              <p className="text-sm text-gray-500">待审核层析柱管理和签字确认</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              待审核: {pendingColumns.length}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {currentUser.type === 'admin' ? '审核员' : '用户'}
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
                <Input placeholder="请输入工单号" value={searchParams.workOrder} onChange={e => setSearchParams({
                ...searchParams,
                workOrder: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">层析柱序列号</label>
                <Input placeholder="请输入层析柱序列号" value={searchParams.columnSerial} onChange={e => setSearchParams({
                ...searchParams,
                columnSerial: e.target.value
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
                <Select value={searchParams.testType} onValueChange={value => setSearchParams({
                ...searchParams,
                testType: value
              })}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择检测类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类型</SelectItem>
                    <SelectItem value="纯度检测">纯度检测</SelectItem>
                    <SelectItem value="pH值检测">pH值检测</SelectItem>
                    <SelectItem value="杂质含量">杂质含量</SelectItem>
                    <SelectItem value="溶解度测试">溶解度测试</SelectItem>
                    <SelectItem value="稳定性测试">稳定性测试</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">优先级</label>
                <Select value={searchParams.priority} onValueChange={value => setSearchParams({
                ...searchParams,
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
              <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4 mr-2" />
                查询
              </Button>
              <Button variant="outline" onClick={handleReset}>
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
            共 {filteredColumns.length} 条待审核记录
          </div>
        </div>

        {/* 待审核列表 */}
        <div className="space-y-4">
          {filteredColumns.map(column => <Card key={column.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" checked={selectedColumns.includes(column.id)} onChange={() => handleSelectColumn(column.id)} className="rounded border-gray-300 w-4 h-4" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg">{column.columnSerial}</h3>
                        {getPriorityBadge(column.priority)}
                      </div>
                      <p className="text-sm text-gray-500">{column.columnName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => toggleExpanded(column.id)} className="h-8 w-8 p-0">
                      {expandedColumns.has(column.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleViewDetail(column.id)} className="h-8 w-8 p-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* 基本信息 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-500">工单号</span>
                    <p className="font-medium">{column.workOrder}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">订单号</span>
                    <p className="font-medium">{column.orderNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">检测类型</span>
                    <p className="font-medium">{column.testType}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">检测日期</span>
                    <p className="font-medium">{column.testDate}</p>
                  </div>
                </div>

                {/* 检测数据详情 */}
                {expandedColumns.has(column.id) && <DetectionDataCard detectionData={column.detectionData} finalConclusion={column.finalConclusion} />}

                {/* 不合格原因 */}
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">不合格原因:</span>
                    <span className="text-sm text-red-600">{column.不合格原因}</span>
                  </div>
                </div>

                {/* 提交信息 */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>操作员: {column.operator}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>提交时间: {column.submitTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* 空状态 */}
        {filteredColumns.length === 0 && <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无待审核记录</h3>
              <p className="text-gray-500 mb-4">所有层析柱都已审核完成</p>
            </CardContent>
          </Card>}
      </div>

      {/* 详情弹窗 */}
      <DetailModal column={selectedColumn} isOpen={showDetailModal} onClose={handleCloseDetailModal} />

      {/* 签名弹窗 */}
      {showSignaturePad && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">电子签字确认</h3>
              <Button variant="outline" size="sm" onClick={() => setShowSignaturePad(false)}>
                <XCircle className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* 审核操作选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">审核操作</label>
                <Select value={auditAction} onValueChange={setAuditAction}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approve">通过审核</SelectItem>
                    <SelectItem value="reject">拒绝审核</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 审核意见 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">审核意见</label>
                <textarea value={auditComment} onChange={e => setAuditComment(e.target.value)} placeholder="请输入审核意见..." className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} />
              </div>

              {/* 签名板 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">电子签名</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-2">
                  <canvas ref={canvasRef} width={600} height={200} className="border border-gray-200 rounded cursor-crosshair bg-white" onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} />
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-500">请在上方区域签名</p>
                  <Button variant="outline" size="sm" onClick={clearSignature}>
                    清除签名
                  </Button>
                </div>
              </div>

              {/* 确认信息 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  即将{auditAction === 'approve' ? '通过' : '拒绝'} <span className="font-semibold text-blue-600">{selectedColumns.length}</span> 个层析柱的审核
                </p>
                <p className="text-sm text-gray-600">
                  审核人: <span className="font-semibold">{currentUser.name}</span>
                </p>
                <p className="text-sm text-gray-600">
                  审核时间: <span className="font-semibold">{new Date().toLocaleString('zh-CN')}</span>
                </p>
              </div>

              {/* 操作按钮 */}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowSignaturePad(false)}>
                  取消
                </Button>
                <Button onClick={confirmAudit} disabled={signing} className={auditAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}>
                  {signing ? <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      处理中...
                    </> : <>
                      <PenTool className="w-4 h-4 mr-2" />
                      确认{auditAction === 'approve' ? '通过' : '拒绝'}
                    </>}
                </Button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}