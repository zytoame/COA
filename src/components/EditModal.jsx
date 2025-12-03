// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast } from '@/components/ui';
// @ts-ignore;
import { X, Save, Calculator, Edit, Loader2 } from 'lucide-react';

export const EditModal = ({
  report,
  isOpen,
  onClose,
  onSave,
  toast
}) => {
  const [editData, setEditData] = useState(null);
  const [calculatedCV, setCalculatedCV] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // 初始化编辑数据
  React.useEffect(() => {
    if (report && report.detectionData && report.detectionData.repeatabilityTest) {
      const repeatabilityData = report.detectionData.repeatabilityTest;
      if (repeatabilityData.testData) {
        setEditData({
          ...repeatabilityData,
          testData: repeatabilityData.testData.map(test => ({
            ...test
          }))
        });
        calculateCV(repeatabilityData.testData);
      }
    }
  }, [report]);

  // 计算CV值
  const calculateCV = testData => {
    if (!testData || testData.length === 0) return;
    setIsCalculating(true);
    setTimeout(() => {
      const values = testData.map(test => parseFloat(test.value));
      const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
      const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
      const stdDev = Math.sqrt(variance);
      const cv = stdDev / mean * 100;
      setCalculatedCV(cv);
      setIsCalculating(false);
    }, 300);
  };

  // 更新测试值
  const updateTestValue = (testId, newValue) => {
    if (!editData) return;
    const updatedTestData = editData.testData.map(test => test.id === testId ? {
      ...test,
      value: newValue
    } : test);
    setEditData({
      ...editData,
      testData: updatedTestData
    });
    calculateCV(updatedTestData);
  };

  // 保存修改
  const handleSave = () => {
    if (!editData || !report) return;

    // 检查CV值是否合格
    const isQualified = calculatedCV < 1.5;

    // 更新报告数据
    const updatedReport = {
      ...report,
      detectionData: {
        ...report.detectionData,
        repeatabilityTest: {
          ...report.detectionData.repeatabilityTest,
          result: `${calculatedCV.toFixed(2)}%`,
          conclusion: isQualified ? 'pass' : 'fail',
          testData: editData.testData
        }
      },
      finalConclusion: isQualified ? 'qualified' : 'unqualified',
      不合格原因: isQualified ? '' : 'CV值超标'
    };
    onSave(updatedReport);
    onClose();
    toast({
      title: "保存成功",
      description: `CV值已更新为 ${calculatedCV.toFixed(2)}%，${isQualified ? '报告已合格' : '报告仍不合格'}`,
      variant: isQualified ? "default" : "destructive"
    });
  };
  if (!isOpen || !report || !editData) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">编辑重复性测试数据</h2>
            <Button variant="outline" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">报告信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-gray-500">报告编号</span>
                  <p className="font-medium">{report.id}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">层析柱序列号</span>
                  <p className="font-medium">{report.columnSerial}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">不合格项目</span>
                  <p className="font-medium">{report.不合格项目}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CV值计算结果 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                CV值计算结果
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">标准值</span>
                  <p className="text-lg font-medium">CV &lt; 1.5%</p>
                </div>
                <div className="text-center">
                  <span className="text-sm text-gray-500">当前CV值</span>
                  <p className={`text-2xl font-bold ${calculatedCV < 1.5 ? 'text-green-600' : 'text-red-600'}`}>
                    {isCalculating ? <Loader2 className="w-6 h-6 animate-spin inline" /> : `${calculatedCV.toFixed(2)}%`}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">结论</span>
                  <p className="text-lg font-medium">
                    {calculatedCV < 1.5 ? <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">合格</Badge> : <Badge variant="destructive">不合格</Badge>}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 重复性测试数据编辑 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">重复性测试数据</CardTitle>
              <p className="text-sm text-gray-500">修改测试值后系统将自动重新计算CV值</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>序号</TableHead>
                    <TableHead>测试时间</TableHead>
                    <TableHead>测试值</TableHead>
                    <TableHead>单位</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {editData.testData.map((test, index) => <TableRow key={test.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{test.time}</TableCell>
                      <TableCell>
                        <Input type="number" step="0.1" value={test.value} onChange={e => updateTestValue(test.id, e.target.value)} className="w-24" />
                      </TableCell>
                      <TableCell>{test.unit}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => {
                      const newValue = prompt('请输入新的测试值:', test.value);
                      if (newValue && !isNaN(newValue)) {
                        updateTestValue(test.id, parseFloat(newValue));
                      }
                    }}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 统计信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">统计信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-sm text-gray-500">平均值</span>
                  <p className="font-medium">
                    {(editData.testData.reduce((sum, test) => sum + parseFloat(test.value), 0) / editData.testData.length).toFixed(2)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">最大值</span>
                  <p className="font-medium">
                    {Math.max(...editData.testData.map(test => parseFloat(test.value))).toFixed(2)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">最小值</span>
                  <p className="font-medium">
                    {Math.min(...editData.testData.map(test => parseFloat(test.value))).toFixed(2)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">极差</span>
                  <p className="font-medium">
                    {(Math.max(...editData.testData.map(test => parseFloat(test.value))) - Math.min(...editData.testData.map(test => parseFloat(test.value)))).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              保存修改
            </Button>
          </div>
        </div>
      </div>
    </div>;
};