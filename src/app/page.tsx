import Link from 'next/link';
import {
  mockCandidates,
  mockJobRequests,
  mockKPIData,
  mockCredentialAlerts,
  mockSystemIntegrations,
  mockFlightRiskScores,
  mockCommunicationChannels,
  mockShadowCandidates,
} from '@/data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

export default function Dashboard() {
  const openJobs = mockJobRequests.filter((job) => job.status === 'open').length;
  const inProgressJobs = mockJobRequests.filter((job) => job.status === 'in_progress').length;
  const activeCandidates = mockCandidates.filter(
    (c) => c.status !== 'placed'
  ).length;
  const readyCandidates = mockCandidates.filter(
    (c) => c.status === 'ready'
  ).length;

  const avgPlacementTime = mockKPIData.averagePlacementTime.current;
  const complianceRate = mockKPIData.complianceRate.current;

  // StaffFlow AI Module Data
  const criticalCredentialAlerts = mockCredentialAlerts.filter(a => a.severity === 'critical').length;
  const connectedSystems = mockSystemIntegrations.filter(s => s.status === 'connected').length;
  const highRiskCandidates = mockFlightRiskScores.filter(f => f.riskScore > 50).length;
  const activeShadowCandidates = mockShadowCandidates.filter(s => s.activationReady).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          StaffFlow AI Command Center
        </h1>
        <p className="mt-2 text-gray-600">
          Complete Healthcare Workforce Intelligence Platform - Predictive, Unified, and AI-Driven
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Active Jobs */}
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {openJobs + inProgressJobs}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {openJobs} open, {inProgressJobs} in progress
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Candidates */}
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Candidates</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {activeCandidates}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {readyCandidates} ready for placement
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avg Placement Time */}
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Placement Time</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {avgPlacementTime}d
                </p>
                <p className="text-xs text-green-600 mt-1 font-semibold">
                  ↓ 45% improvement
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Rate */}
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {complianceRate}%
                </p>
                <p className="text-xs text-green-600 mt-1 font-semibold">
                  ↑ 24% improvement
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Four Module Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Module 1: Intelligent Credential Management */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
              Credential Engine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Critical Alerts</span>
                <Badge variant="destructive">{criticalCredentialAlerts}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Portal Health</span>
                <Badge variant="secondary">Monitoring</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Auto-Renewal</span>
                <Badge variant="default">Active</Badge>
              </div>
            </div>
            <Button variant="link" size="sm" className="mt-4 p-0" asChild>
              <Link href="/credentials">View Details →</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Module 2: Unified Workflow Command Center */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-300">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
              Workflow Hub
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Systems Connected</span>
                <Badge variant="default">{connectedSystems}/5</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Auto-Submissions</span>
                <Badge variant="secondary">2 Today</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Load Balancing</span>
                <Badge variant="default">Optimized</Badge>
              </div>
            </div>
            <Button variant="link" size="sm" className="mt-4 p-0" asChild>
              <Link href="/workflows">View Details →</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Module 3: Predictive Placement Intelligence */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
              Placement AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">High Flight Risk</span>
                <Badge variant="destructive">{highRiskCandidates}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Shadow Candidates</span>
                <Badge variant="default">{activeShadowCandidates} Ready</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Rate Optimizer</span>
                <Badge variant="secondary">&lt;3s</Badge>
              </div>
            </div>
            <Button variant="link" size="sm" className="mt-4 p-0" asChild>
              <Link href="/candidates">View Details →</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Module 4: Communication & Compliance Hub */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
              Comms Hub
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Multi-Channel</span>
                <Badge variant="default">Email/SMS/WA</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Languages</span>
                <Badge variant="secondary">4 Supported</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Geo-Onboarding</span>
                <Badge variant="default">3 Active</Badge>
              </div>
            </div>
            <Button variant="link" size="sm" className="mt-4 p-0" asChild>
              <Link href="/candidates">View Details →</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Alerts & Flight Risk */}
        <div className="lg:col-span-2 space-y-6">
          {/* Credential Alerts - Module 1 */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Intelligent Credential Alerts</CardTitle>
                <Badge variant="destructive">
                  {criticalCredentialAlerts} Critical
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCredentialAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.severity === 'critical'
                        ? 'bg-red-50 border-red-500'
                        : alert.severity === 'high'
                        ? 'bg-orange-50 border-orange-500'
                        : 'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              alert.severity === 'critical' || alert.severity === 'high'
                                ? 'destructive'
                                : 'default'
                            }
                          >
                            {alert.alertType.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {alert.candidateName}
                          </span>
                          {alert.smsSent && (
                            <Badge variant="outline" className="text-xs">
                              SMS Sent
                            </Badge>
                          )}
                          {alert.alternativePathwayTriggered && (
                            <Badge variant="secondary" className="text-xs">
                              Alt Pathway
                            </Badge>
                          )}
                        </div>
                        <p className="mt-2 text-sm text-gray-700">{alert.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Flight Risk Scores - Module 3 */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-lg">Flight Risk Intelligence</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Key Factors</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFlightRiskScores.slice(0, 4).map((risk) => (
                    <TableRow key={risk.candidateId}>
                      <TableCell>
                        <div className="text-sm font-medium text-gray-900">
                          {risk.candidateName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-2xl font-bold ${
                              risk.riskScore > 50
                                ? 'text-red-600'
                                : risk.riskScore > 30
                                ? 'text-yellow-600'
                                : 'text-green-600'
                            }`}
                          >
                            {risk.riskScore}
                          </span>
                          {risk.autoBackupTriggered && (
                            <Badge variant="destructive" className="text-xs">
                              Backup Active
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-gray-600">
                        {risk.behavioralFactors.lastActivityDaysAgo}d inactive,{' '}
                        {risk.behavioralFactors.avgResponseTimeHours}h response
                      </TableCell>
                      <TableCell>
                        <Badge variant={risk.riskScore > 50 ? 'destructive' : 'default'}>
                          {risk.riskScore > 50 ? 'Urgent' : 'Monitor'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* System Integrations - Module 2 */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-lg">System Integration Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSystemIntegrations.map((system) => (
                  <div
                    key={system.systemId}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          system.status === 'connected'
                            ? 'bg-green-500'
                            : system.status === 'degraded'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {system.systemName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {system.syncFrequency} • {system.recordsProcessed.toLocaleString()} records
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          system.status === 'connected'
                            ? 'default'
                            : system.status === 'degraded'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {system.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {system.errorRate}% error
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Shadow Candidates & Communication */}
        <div className="space-y-6">
          {/* Shadow Candidates - Module 3 */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-lg">Shadow Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockShadowCandidates.map((shadow) => (
                  <div
                    key={shadow.shadowCandidateId}
                    className={`p-3 rounded-lg border ${
                      shadow.activationReady
                        ? 'bg-green-50 border-green-300'
                        : 'bg-yellow-50 border-yellow-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {shadow.shadowCandidateName}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Backup for: {shadow.jobTitle}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="default" className="text-xs">
                            {shadow.matchScore}% Match
                          </Badge>
                          {shadow.activationReady && (
                            <Badge variant="default" className="text-xs bg-green-600">
                              Ready
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Communication Preferences - Module 4 */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-lg">AI Communication Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockCommunicationChannels.map((channel) => (
                  <div
                    key={channel.candidateId}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900">
                        {channel.candidateName}
                      </p>
                      <Badge variant="default" className="text-xs">
                        {channel.preferredChannel.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">
                      {channel.aiDetectedPreference}
                    </p>
                    <div className="mt-2 flex gap-1">
                      <Badge variant="outline" className="text-xs">
                        {channel.languagePreference}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-lg">Module Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/credentials">
                  Credential Engine
                </Link>
              </Button>
              <Button variant="default" className="w-full bg-green-600 hover:bg-green-700" asChild>
                <Link href="/workflows">
                  Workflow Hub
                </Link>
              </Button>
              <Button variant="default" className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                <Link href="/candidates">
                  Placement AI
                </Link>
              </Button>
              <Button variant="default" className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                <Link href="/reports">
                  View Reports
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
