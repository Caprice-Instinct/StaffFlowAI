'use client';

import { useState } from 'react';
import {
  mockAuditLogs,
  mockEncryptionStatus,
  mockAccessControl,
  mockSecurityIncidents,
  mockComplianceMetrics
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

export default function SecurityPage() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'audit' | 'access' | 'incidents' | 'compliance'>('overview');

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant': return 'default';
      case 'partial': return 'secondary';
      case 'non_compliant': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Security & Compliance</h1>
        <p className="mt-2 text-gray-600">
          Enterprise-grade security architecture protecting healthcare data - HIPAA, GDPR, and Kenya Data Protection Act compliant
        </p>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Encryption Status</p>
                <p className="text-2xl font-bold text-green-700 mt-1">100%</p>
                <p className="text-xs text-gray-500 mt-1">AES-256 + TLS 1.3</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">MFA Enabled</p>
                <p className="text-2xl font-bold text-blue-700 mt-1">144</p>
                <p className="text-xs text-gray-500 mt-1">All active users</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Security Incidents</p>
                <p className="text-2xl font-bold text-yellow-700 mt-1">{mockSecurityIncidents.length}</p>
                <p className="text-xs text-gray-500 mt-1">{mockSecurityIncidents.filter(i => i.status === 'resolved').length} resolved</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance Score</p>
                <p className="text-2xl font-bold text-purple-700 mt-1">100%</p>
                <p className="text-xs text-gray-500 mt-1">9/9 requirements met</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setSelectedTab('overview')}
            variant={selectedTab === 'overview' ? 'default' : 'outline'}
          >
            Overview
          </Button>
          <Button
            onClick={() => setSelectedTab('audit')}
            variant={selectedTab === 'audit' ? 'default' : 'outline'}
          >
            Audit Logs
          </Button>
          <Button
            onClick={() => setSelectedTab('access')}
            variant={selectedTab === 'access' ? 'default' : 'outline'}
          >
            Access Control
          </Button>
          <Button
            onClick={() => setSelectedTab('incidents')}
            variant={selectedTab === 'incidents' ? 'default' : 'outline'}
          >
            Security Incidents
          </Button>
          <Button
            onClick={() => setSelectedTab('compliance')}
            variant={selectedTab === 'compliance' ? 'default' : 'outline'}
          >
            Compliance
          </Button>
        </div>
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Encryption Status */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Data Encryption Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Data Type</TableHead>
                    <TableHead>At Rest</TableHead>
                    <TableHead>In Transit</TableHead>
                    <TableHead>Key Rotation</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEncryptionStatus.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.category}</TableCell>
                      <TableCell className="text-sm text-gray-600">{item.dataType}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-600">{item.encryptionAtRest}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-blue-600">{item.encryptionInTransit}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        Every {item.keyRotationDays} days
                        <br />
                        <span className="text-xs text-gray-500">
                          Next: {new Date(item.nextRotation).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-600">
                          {item.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Security Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300">
              <CardHeader className="border-b border-blue-200">
                <CardTitle className="text-base">Multi-Factor Authentication (MFA)</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm text-blue-900">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p><strong>All users required:</strong> Authenticator app (Google/Microsoft Authenticator) + SMS backup</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p><strong>Sensitive operations:</strong> Credential downloads, financial access, wallet sharing require MFA re-authentication</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p><strong>Account takeover prevention:</strong> Even if password compromised, MFA blocks unauthorized access</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300">
              <CardHeader className="border-b border-purple-200">
                <CardTitle className="text-base">Data Retention & Privacy</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm text-purple-900">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p><strong>Retention period:</strong> 7 years post-employment (regulatory requirement)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p><strong>Right to deletion:</strong> Cryptographic shredding within 30 days of request</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p><strong>Backup strategy:</strong> Daily encrypted backups to separate geographic region, &lt;24hr recovery</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Incident Response Protocol */}
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-300">
            <CardHeader className="border-b border-red-200">
              <CardTitle className="text-base flex items-center gap-2">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Incident Response & Data Breach Protocol
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="p-3 bg-white rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <p className="font-semibold text-red-900">Detection</p>
                  </div>
                  <p className="text-xs text-red-800">Automated monitoring flags unauthorized access or data exfiltration attempts in real-time</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <p className="font-semibold text-red-900">Containment</p>
                  </div>
                  <p className="text-xs text-red-800">Affected accounts locked immediately. New credentials required. IP addresses blocked.</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <p className="font-semibold text-red-900">Notification</p>
                  </div>
                  <p className="text-xs text-red-800">Within 24 hours: affected users notified. Within 72 hours: public disclosure (GDPR/HIPAA)</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <p className="font-semibold text-red-900">Investigation</p>
                  </div>
                  <p className="text-xs text-red-800">Root cause analysis using audit logs. Security team review. Preventive measures implemented.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Audit Logs Tab */}
      {selectedTab === 'audit' && (
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Audit Logs - Complete Access Trail</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Every data access logged with who, what, when, where, and why. Logs encrypted, immutable, and retained for 7 years.
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>MFA</TableHead>
                  <TableHead>Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAuditLogs.map((log) => (
                  <TableRow key={log.logId} className={log.suspiciousActivity ? 'bg-red-50' : ''}>
                    <TableCell className="text-xs">
                      {new Date(log.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium text-sm">{log.userName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{log.userRole}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{log.action}</TableCell>
                    <TableCell className="text-xs text-gray-600">{log.resourceName}</TableCell>
                    <TableCell className="text-xs font-mono">{log.ipAddress}</TableCell>
                    <TableCell>
                      {log.mfaVerified ? (
                        <Badge variant="default" className="bg-green-600 text-xs">✓ MFA</Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs">No MFA</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={log.result === 'success' ? 'default' : 'destructive'} className="text-xs">
                        {log.result.toUpperCase()}
                      </Badge>
                      {log.suspiciousActivity && (
                        <Badge variant="destructive" className="ml-1 text-xs">
                          ⚠ SUSPICIOUS
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {mockAuditLogs.some(log => log.reason) && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-xs font-semibold text-gray-700 mb-2">Flagged Activities:</p>
                {mockAuditLogs.filter(log => log.reason).map((log) => (
                  <div key={log.logId} className="text-xs text-gray-600 mb-1">
                    • <strong>{log.userName}:</strong> {log.reason}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Access Control Tab */}
      {selectedTab === 'access' && (
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Role-Based Access Control (RBAC)</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Three-tier permission model ensuring principle of least privilege. MFA required for sensitive operations.
            </p>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-6">
              {mockAccessControl.map((role) => (
                <div key={role.roleId} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{role.roleName}</h3>
                      <p className="text-sm text-gray-600">
                        {role.activeUsers} active users • Last reviewed: {new Date(role.lastReviewDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-center">View</TableHead>
                        <TableHead className="text-center">Edit</TableHead>
                        <TableHead className="text-center">Delete</TableHead>
                        <TableHead className="text-center">Download</TableHead>
                        <TableHead className="text-center">MFA Required</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {role.permissions.map((perm, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{perm.category}</TableCell>
                          <TableCell className="text-center">
                            {perm.canView ? (
                              <svg className="w-5 h-5 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {perm.canEdit ? (
                              <svg className="w-5 h-5 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {perm.canDelete ? (
                              <svg className="w-5 h-5 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {perm.canDownload ? (
                              <svg className="w-5 h-5 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {perm.requiresMFA && (
                              <Badge variant="default" className="bg-blue-600 text-xs">MFA</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Incidents Tab */}
      {selectedTab === 'incidents' && (
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Security Incidents & Response</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Real-time threat detection and automated response. All incidents investigated and resolved.
            </p>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {mockSecurityIncidents.map((incident) => (
                <div
                  key={incident.incidentId}
                  className={`p-4 rounded-lg border ${
                    incident.severity === 'critical' ? 'bg-red-50 border-red-300' :
                    incident.severity === 'high' ? 'bg-orange-50 border-orange-300' :
                    incident.severity === 'medium' ? 'bg-yellow-50 border-yellow-300' :
                    'bg-blue-50 border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={getSeverityBadge(incident.severity) as "default" | "secondary" | "destructive" | "outline"}>
                        {incident.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">{incident.type.replace(/_/g, ' ').toUpperCase()}</Badge>
                      <Badge variant={incident.status === 'resolved' ? 'default' : 'secondary'} className={incident.status === 'resolved' ? 'bg-green-600' : ''}>
                        {incident.status.toUpperCase()}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-600">
                      {new Date(incident.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">{incident.description}</p>
                  <div className="text-xs text-gray-700 space-y-1 mb-2">
                    <p><strong>Affected users:</strong> {incident.affectedUsers.join(', ')}</p>
                    {incident.actionTaken && (
                      <p><strong>Action taken:</strong> {incident.actionTaken}</p>
                    )}
                    {incident.resolvedAt && (
                      <p><strong>Resolved at:</strong> {new Date(incident.resolvedAt).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compliance Tab */}
      {selectedTab === 'compliance' && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-lg">Regulatory Compliance Status</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                HIPAA, GDPR, Kenya Data Protection Act 2019, and ISO 27001 compliant. Regular audits ensure continuous compliance.
              </p>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 gap-4">
                {['HIPAA', 'GDPR', 'Kenya Data Protection Act 2019', 'ISO 27001'].map((standard) => {
                  const requirements = mockComplianceMetrics.filter(m => m.standard === standard);
                  const compliantCount = requirements.filter(r => r.status === 'compliant').length;

                  return (
                    <div key={standard} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{standard}</h3>
                          <p className="text-sm text-gray-600">
                            {compliantCount}/{requirements.length} requirements met
                          </p>
                        </div>
                        <Badge variant="default" className="bg-green-600">
                          {compliantCount === requirements.length ? '100% COMPLIANT' : `${Math.round((compliantCount / requirements.length) * 100)}%`}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        {requirements.map((req, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <p className="text-sm font-medium text-gray-900 flex-1">{req.requirement}</p>
                              <Badge variant={getStatusBadge(req.status) as "default" | "secondary" | "destructive" | "outline"} className={req.status === 'compliant' ? 'bg-green-600' : ''}>
                                {req.status.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-600 space-y-1">
                              <p><strong>Last audit:</strong> {new Date(req.lastAuditDate).toLocaleDateString()} • <strong>Next audit:</strong> {new Date(req.nextAuditDate).toLocaleDateString()}</p>
                              <p><strong>Evidence documents:</strong> {req.evidenceCount} files</p>
                              {req.notes && <p className="text-gray-700 italic">{req.notes}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
