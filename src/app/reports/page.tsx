import { mockKPIData } from '@/data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ReportsPage() {
  const {
    averagePlacementTime,
    dropoutRate,
    complianceRate,
    timeToCredential,
    placementsByMonth,
    credentialStatusDistribution,
    candidatesByStage,
    bottleneckAnalysis,
    candidateLossReasons,
    systemUsage,
    timeToFillByRole
  } = mockKPIData;

  const getTrendIcon = (change: number) => {
    if (change > 0) {
      return (
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    );
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      critical: 'destructive',
      high: 'destructive',
      medium: 'secondary',
      low: 'outline'
    } as const;
    return <Badge variant={variants[severity as keyof typeof variants]}>{severity.toUpperCase()}</Badge>;
  };

  const getDemandBadge = (demand: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return <Badge className={colors[demand as keyof typeof colors]}>{demand}</Badge>;
  };

  const maxPlacements = Math.max(...placementsByMonth.map((m) => m.placements));
  const maxCredentials = Math.max(...credentialStatusDistribution.map((c) => c.count));
  const maxCandidates = Math.max(...candidatesByStage.map((c) => c.count));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="mt-2 text-gray-600">
          Comprehensive performance metrics and process insights
        </p>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Average Placement Time */}
        <Card className="border-t-4 border-t-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Avg Placement Time</h3>
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">{averagePlacementTime.current}</p>
              <p className="ml-1 text-lg text-gray-600">{averagePlacementTime.unit}</p>
            </div>
            <div className="mt-2 flex items-center">
              {getTrendIcon(averagePlacementTime.change)}
              <span className={`ml-1 text-sm font-medium ${averagePlacementTime.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(averagePlacementTime.change)}%
              </span>
              <span className="ml-2 text-xs text-gray-500">vs previous period</span>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Previous: {averagePlacementTime.previous} {averagePlacementTime.unit}
            </p>
          </CardContent>
        </Card>

        {/* Dropout Rate */}
        <Card className="border-t-4 border-t-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Dropout Rate</h3>
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">{dropoutRate.current}</p>
              <p className="ml-1 text-lg text-gray-600">{dropoutRate.unit}</p>
            </div>
            <div className="mt-2 flex items-center">
              {getTrendIcon(dropoutRate.change)}
              <span className={`ml-1 text-sm font-medium ${dropoutRate.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(dropoutRate.change)}%
              </span>
              <span className="ml-2 text-xs text-gray-500">vs previous period</span>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Previous: {dropoutRate.previous}{dropoutRate.unit}
            </p>
          </CardContent>
        </Card>

        {/* Compliance Rate */}
        <Card className="border-t-4 border-t-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Compliance Rate</h3>
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">{complianceRate.current}</p>
              <p className="ml-1 text-lg text-gray-600">{complianceRate.unit}</p>
            </div>
            <div className="mt-2 flex items-center">
              {getTrendIcon(complianceRate.change)}
              <span className={`ml-1 text-sm font-medium ${complianceRate.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(complianceRate.change)}%
              </span>
              <span className="ml-2 text-xs text-gray-500">vs previous period</span>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Previous: {complianceRate.previous}{complianceRate.unit}
            </p>
          </CardContent>
        </Card>

        {/* Time to Credential */}
        <Card className="border-t-4 border-t-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Time to Credential</h3>
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">{timeToCredential.current}</p>
              <p className="ml-1 text-lg text-gray-600">{timeToCredential.unit}</p>
            </div>
            <div className="mt-2 flex items-center">
              {getTrendIcon(timeToCredential.change)}
              <span className={`ml-1 text-sm font-medium ${timeToCredential.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(timeToCredential.change)}%
              </span>
              <span className="ml-2 text-xs text-gray-500">vs previous period</span>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Previous: {timeToCredential.previous} {timeToCredential.unit}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Process Bottleneck Analysis - New Section */}
      <Card className="mb-8 border-l-4 border-l-red-500">
        <CardHeader className="border-b bg-red-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-red-900">Critical Process Bottlenecks</CardTitle>
              <p className="text-sm text-red-700 mt-1">Key delays impacting placement efficiency</p>
            </div>
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bottleneckAnalysis.map((bottleneck) => (
              <div key={bottleneck.category} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-gray-900">{bottleneck.category}</h4>
                      {getSeverityBadge(bottleneck.severity)}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Average delay: <span className="font-semibold text-red-600">{bottleneck.delayDays} days</span> •
                      Affected cases: <span className="font-semibold">{bottleneck.affectedCases}</span>
                    </p>
                  </div>
                </div>
                <Progress
                  value={(bottleneck.delayDays / 10) * 100}
                  className="h-2 bg-gray-200 [&>div]:bg-red-500"
                />
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-900">
              <strong>Action Required:</strong> These bottlenecks represent the primary friction points in the recruitment pipeline.
              Addressing manual documentation and license verification could reduce average placement time by up to 15 days.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Candidate Loss Analysis - New Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Candidate Loss Root Causes</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Why candidates drop out (Last 60 days)</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {candidateLossReasons.map((reason) => (
                <div key={reason.reason}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{reason.reason}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-red-600">{reason.percentage}%</span>
                      <span className="text-xs text-gray-500">({reason.count} cases)</span>
                    </div>
                  </div>
                  <Progress
                    value={reason.percentage}
                    className="h-3 bg-gray-200 [&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-red-600"
                  />
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Candidate Loss</span>
              <span className="font-bold text-red-600">
                {candidateLossReasons.reduce((acc, r) => acc + r.count, 0)} candidates
              </span>
            </div>
          </CardContent>
        </Card>

        {/* System Usage & Efficiency */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Platform Usage & Efficiency</CardTitle>
            <p className="text-sm text-gray-500 mt-1">System adoption and performance metrics</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemUsage.map((sys) => (
                <div key={sys.system} className="border-b pb-3 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{sys.system}</span>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        {sys.usage}% usage
                      </Badge>
                      <Badge
                        variant={sys.efficiency >= 80 ? 'default' : sys.efficiency >= 70 ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {sys.efficiency}% efficient
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Usage</p>
                      <Progress value={sys.usage} className="h-2 bg-gray-200 [&>div]:bg-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Efficiency</p>
                      <Progress
                        value={sys.efficiency}
                        className={`h-2 bg-gray-200 ${
                          sys.efficiency >= 80 ? '[&>div]:bg-green-500' :
                          sys.efficiency >= 70 ? '[&>div]:bg-yellow-500' :
                          '[&>div]:bg-red-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time to Fill by Role - New Section */}
      <Card className="mb-8">
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Time to Fill by Role Type</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Average placement duration and demand level per role</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timeToFillByRole.map((role) => (
              <Card key={role.role} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{role.role}</h4>
                    {getDemandBadge(role.demand)}
                  </div>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-3xl font-bold text-gray-900">{role.avgDays}</span>
                    <span className="text-sm text-gray-600">days avg</span>
                  </div>
                  <Progress
                    value={(role.avgDays / 45) * 100}
                    className="h-2 bg-gray-200 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-purple-600"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Original Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Placements by Month Chart */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Monthly Placements Trend</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Successful candidate placements per month</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {placementsByMonth.map((month) => (
                <div key={month.month}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{month.month}</span>
                    <span className="text-sm font-bold text-blue-600">{month.placements}</span>
                  </div>
                  <Progress
                    value={(month.placements / maxPlacements) * 100}
                    className="h-3 bg-gray-200 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-blue-600"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total (Last 7 months)</span>
                <span className="text-lg font-bold text-blue-600">
                  {placementsByMonth.reduce((acc, m) => acc + m.placements, 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credential Status Distribution */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Credential Status Distribution</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Current status across all credentials</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {credentialStatusDistribution.map((item) => {
                const colors = {
                  'Valid': '[&>div]:from-green-500 [&>div]:to-green-600',
                  'Expiring Soon': '[&>div]:from-yellow-500 [&>div]:to-yellow-600',
                  'Expired': '[&>div]:from-red-500 [&>div]:to-red-600',
                  'Missing': '[&>div]:from-gray-500 [&>div]:to-gray-600',
                };
                return (
                  <div key={item.status}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.status}</span>
                      <span className="text-sm font-bold text-gray-900">{item.count}</span>
                    </div>
                    <Progress
                      value={(item.count / maxCredentials) * 100}
                      className={`h-3 bg-gray-200 [&>div]:bg-gradient-to-r ${colors[item.status as keyof typeof colors]}`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Credentials</span>
                <span className="text-lg font-bold text-gray-900">
                  {credentialStatusDistribution.reduce((acc, c) => acc + c.count, 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Candidates by Stage */}
      <Card className="mb-8">
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Candidates by Workflow Stage</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Distribution of candidates across recruitment stages</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {candidatesByStage.map((stage) => {
              const colors = {
                'Screening': 'border-blue-500 bg-blue-50',
                'Credentialing': 'border-yellow-500 bg-yellow-50',
                'Compliance': 'border-purple-500 bg-purple-50',
                'Ready': 'border-green-500 bg-green-50',
                'Placed': 'border-gray-500 bg-gray-50',
              };
              const textColors = {
                'Screening': 'text-blue-600',
                'Credentialing': 'text-yellow-600',
                'Compliance': 'text-purple-600',
                'Ready': 'text-green-600',
                'Placed': 'text-gray-600',
              };
              const progressColors = {
                'Screening': '[&>div]:from-blue-500 [&>div]:to-blue-600',
                'Credentialing': '[&>div]:from-yellow-500 [&>div]:to-yellow-600',
                'Compliance': '[&>div]:from-purple-500 [&>div]:to-purple-600',
                'Ready': '[&>div]:from-green-500 [&>div]:to-green-600',
                'Placed': '[&>div]:from-gray-500 [&>div]:to-gray-600',
              };
              return (
                <Card
                  key={stage.stage}
                  className={`border-l-4 ${colors[stage.stage as keyof typeof colors]}`}
                >
                  <CardContent className="p-4 text-center">
                    <p className="text-sm font-medium text-gray-700">{stage.stage}</p>
                    <p className={`text-3xl font-bold mt-2 ${textColors[stage.stage as keyof typeof textColors]}`}>
                      {stage.count}
                    </p>
                    <div className="mt-3">
                      <Progress
                        value={(stage.count / maxCandidates) * 100}
                        className={`h-2 bg-gray-200 [&>div]:bg-gradient-to-r ${progressColors[stage.stage as keyof typeof progressColors]}`}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Impact Summary */}
      <Card className="bg-gradient-to-r from-primary to-green-800 text-white border-0">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">UISP Impact Summary</h2>
          <p className="text-green-100 mb-8">
            AI-driven automation has transformed staffing efficiency
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-700 bg-opacity-50 rounded-lg p-6">
              <div className="text-5xl font-bold mb-2">50%</div>
              <p className="text-green-100">Faster Placement Time</p>
              <p className="text-sm text-green-200 mt-2">From 58 to 32 days average</p>
            </div>
            <div className="bg-green-700 bg-opacity-50 rounded-lg p-6">
              <div className="text-5xl font-bold mb-2">47%</div>
              <p className="text-green-100">Dropout Reduction</p>
              <p className="text-sm text-green-200 mt-2">From 34% to 18% dropout rate</p>
            </div>
            <div className="bg-green-700 bg-opacity-50 rounded-lg p-6">
              <div className="text-5xl font-bold mb-2">24%</div>
              <p className="text-green-100">Compliance Improvement</p>
              <p className="text-sm text-green-200 mt-2">From 76% to 94% compliance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
