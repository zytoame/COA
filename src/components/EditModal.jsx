// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Dialog, DialogContent, DialogHeader, DialogTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { X, Save, Edit2, Thermometer, Gauge, Timer, Activity, Package, AlertTriangle } from 'lucide-react';

export function EditModal({
  isOpen,
  onClose,
  report,
  onSave,
  saving
}) {
  const [editedReport, setEditedReport] = useState(report || {});
  const [activeTab, setActiveTab] = useState('basic');

  // 如果报告数据变化，更新编辑状态
  React.useEffect(() => {
    if (report) {
      setEditedReport({
        ...report,
        // 深拷贝检测数据以避免直接修改原数据
        detectionData: JSON.parse(JSON.stringify(report.detectionData || {}))
      });
    }
  }, [report]);

  // 更新基本信息
  const updateBasicInfo = (field, value) => {
    setEditedReport(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 更新检测数据
  const updateDetectionData = (key, field, value) => {
    setEditedReport(prev => ({
      ...prev,
      detectionData: {
        ...prev.detectionData,
        [key]: {
          ...prev.detectionData[key],
          [field]: value
        }
      }
    }));
  };

  // 获取检测项目图标
  const getDetectionIcon = iconName => {
    const iconMap = {
      Thermometer,
      Gauge,
      Timer,
      Activity,
      Package
    };
    const IconComponent = iconMap[iconName] || AlertTriangle;
    return <IconComponent className="w-5 h-5" />;
  };

  // 保存编辑
  const handleSave = () => {
    if (onSave) {
      onSave(editedReport);
    }
  };
  if (!isOpen || !editedReport) return null;
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit2 className="w-5 h-5" />
            编辑不合格报告 - {editedReport.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 标签页导航 */}
          <div className="flex space-x-1 border-b">
            <button className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'basic' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('basic')}>
              基本信息
            </button>
            <button className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'detection' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('detection')}>
              检测数据
            </button>
            <button className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'conclusion' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('conclusion')}>
              结论与备注
            </button>
          </div>

          {/* 基本信息标签页 */}
          {activeTab === 'basic' && <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">工单号</label>
                  <Input value={editedReport.workOrder || ''} onChange={e => updateBasicInfo('workOrder', e.target.value)} placeholder="请输入工单号" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">层析柱序列号</label>
                  <Input value={editedReport.columnSn || ''} onChange={e => updateBasicInfo('columnSn', e.target.value)} placeholder="请输入层析柱序列号" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">订单号</label>
                  <Input value={editedReport.orderNumber || ''} onChange={e => updateBasicInfo('orderNumber', e.target.value)} placeholder="请输入订单号" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">仪器序列号</label>
                  <Input value={editedReport.instrumentSerial || ''} onChange={e => updateBasicInfo('instrumentSerial', e.target.value)} placeholder="请输入仪器序列号" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">检测项目</label>
                  <Select value={editedReport.检测项目 || ''} onValueChange={value => updateBasicInfo('检测项目', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择检测项目" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="糖化模式">糖化模式</SelectItem>
                      <SelectItem value="地贫模式">地贫模式</SelectItem>
                      <SelectItem value="纯度分析">纯度分析</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">报告类型</label>
                  <Select value={editedReport.reportType || ''} onValueChange={value => updateBasicInfo('reportType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择报告类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="glycation">糖化模式报告</SelectItem>
                      <SelectItem value="thalassemia">地贫模式报告</SelectItem>
                      <SelectItem value="purity">纯度分析报告</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">负责人</label>
                  <Input value={editedReport.负责人 || ''} onChange={e => updateBasicInfo('负责人', e.target.value)} placeholder="请输入负责人" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">报告日期</label>
                  <Input type="date" value={editedReport.reportDate || ''} onChange={e => updateBasicInfo('reportDate', e.target.value)} />
                </div>
              </div>
            </div>}

          {/* 检测数据标签页 */}
          {activeTab === 'detection' && editedReport.detectionData && <div className="space-y-4">
              {Object.entries(editedReport.detectionData).map(([key, data]) => <Card key={key}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      {getDetectionIcon(data.icon)}
                      {key === 'moduleTemperature' && '模块温度'}
                      {key === 'systemPressure' && '系统压力'}
                      {key === 'hbA1cAppearanceTime' && 'HbA1c出现时间'}
                      {key === 'repeatabilityTest' && '重复性测试'}
                      {key === 'appearanceInspection' && '外观检查'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">标准值</label>
                        <Input value={data.standard || ''} onChange={e => updateDetectionData(key, 'standard', e.target.value)} placeholder="请输入标准值" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">检测结果</label>
                        <Input value={data.result || ''} onChange={e => updateDetectionData(key, 'result', e.target.value)} placeholder="请输入检测结果" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">结论</label>
                      <Select value={data.conclusion || ''} onValueChange={value => updateDetectionData(key, 'conclusion', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择结论" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pass">合格</SelectItem>
                          <SelectItem value="fail">不合格</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={data.conclusion === 'pass' ? 'default' : 'destructive'}>
                        {data.conclusion === 'pass' ? '合格' : '不合格'}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        标准: {data.standard} | 结果: {data.result}
                      </span>
                    </div>
                  </CardContent>
                </Card>)}
            </div>}

          {/* 结论与备注标签页 */}
          {activeTab === 'conclusion' && <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">检测结果</label>
                <Select value={editedReport.检测结果 || ''} onValueChange={value => updateBasicInfo('检测结果', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择检测结果" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="合格">合格</SelectItem>
                    <SelectItem value="不合格">不合格</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">不合格原因</label>
                <Input value={editedReport.不合格原因 || ''} onChange={e => updateBasicInfo('不合格原因', e.target.value)} placeholder="请输入不合格原因" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">审核状态</label>
                <Select value={editedReport.审核状态 || ''} onValueChange={value => updateBasicInfo('审核状态', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择审核状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">待审核</SelectItem>
                    <SelectItem value="approved">已通过</SelectItem>
                    <SelectItem value="rejected">已拒绝</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
                <textarea className="w-full p-2 border border-gray-300 rounded-md resize-vertical" rows={4} value={editedReport.remarks || ''} onChange={e => updateBasicInfo('remarks', e.target.value)} placeholder="请输入备注信息" />
              </div>
            </div>}

          {/* 操作按钮 */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose} disabled={saving}>
              <X className="w-4 h-4 mr-2" />
              取消
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
              {saving ? <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  保存中...
                </> : <>
                  <Save className="w-4 h-4 mr-2" />
                  保存
                </>}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
}