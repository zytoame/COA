import BATCH_AUDIT from '../pages/batch-audit.jsx';
import MAIN from '../pages/main.jsx';
import UNQUALIFIED_REPORTS from '../pages/unqualified-reports.jsx';
import QUERY_REPORTS from '../pages/query-reports.jsx';
import QUERY_REPORT from '../pages/query-report.jsx';
export const routers = [{
  id: "batch-audit",
  component: BATCH_AUDIT
}, {
  id: "main",
  component: MAIN
}, {
  id: "unqualified-reports",
  component: UNQUALIFIED_REPORTS
}, {
  id: "query-reports",
  component: QUERY_REPORTS
}, {
  id: "query-report",
  component: QUERY_REPORT
}]