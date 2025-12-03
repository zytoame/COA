// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, CheckCircle, XCircle, Clock, AlertTriangle, FileText, User, Calendar, PenTool, Download, Eye, RefreshCw, Loader2 } from 'lucide-react';

// 模拟待审核层析柱数据
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
  priority: 'high'
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
  priority: 'medium'
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
  priority: 'low'
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
  priority: 'high'
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
  priority: 'medium'
}];
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

  // 查看详情
  const handleViewDetail = columnId => {
    const column = pendingColumns.find(c => c.id === columnId);
    toast({
      title: "查看详情",
      description: `正在查看层析柱 ${columnId} 的详细信息`
    });
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
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" onChange={e => handleSelectAll(e.target.checked)} checked={selectedColumns.length === filteredColumns.length && filteredColumns.length > 0} className="rounded border-gray-300" />
                  </TableHead>
                  <TableHead>层析柱编号</TableHead>
                  <TableHead>工单号</TableHead>
                  <TableHead>层析柱名称</TableHead>
                  <TableHead>检测类型</TableHead>
                  <TableHead>检测日期</TableHead>
                  <TableHead>操作员</TableHead>
                  <TableHead>优先级</TableHead>
                  <TableHead>提交时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredColumns.map(column => <TableRow key={column.id} className="hover:bg-gray-50">
                    <TableCell>
                      <input type="checkbox" checked={selectedColumns.includes(column.id)} onChange={() => handleSelectColumn(column.id)} className="rounded border-gray-300" />
                    </TableCell>
                    <TableCell className="font-medium">{column.columnSerial}</TableCell>
                    <TableCell>{column.workOrder}</TableCell>
                    <TableCell>
                      <div className="max-w-32">
                        <div className="truncate" title={column.columnName}>
                          {column.columnName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {column.orderNumber}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{column.testType}</TableCell>
                    <TableCell>{column.testDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4 text-gray-400" />
                        {column.operator}
                      </div>
                    </TableCell>
                    <TableCell>{getPriorityBadge(column.priority)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {column.submitTime}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => handleViewDetail(column.id)} className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 空状态 */}
        {filteredColumns.length === 0 && <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无待审核记录</h3>
              <p className="text-gray-500 mb-4">所有层析柱都已审核完成</p>
            </CardContent>
          </Card>}
      </div>

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