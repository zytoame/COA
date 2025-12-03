// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
// @ts-ignore;
import { X, Download, Activity, Clock, User, AlertTriangle, Thermometer, Gauge, Timer, Package } from 'lucide-react';

export const DetailModal = ({
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