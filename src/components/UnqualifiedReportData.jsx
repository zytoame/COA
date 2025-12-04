// @ts-ignore;
import React from 'react';

// 不合格报告数据
export const mockUnqualifiedReports = [{
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
  不合格原因: 'pH值超出范围',
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