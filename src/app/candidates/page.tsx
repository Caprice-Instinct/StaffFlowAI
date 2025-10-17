'use client';

import { useState } from 'react';
import { mockCandidates, mockJobRequests } from '@/data/mockData';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

export default function CandidatesPage() {
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // AI Matching Logic (Mock)
  const getMatchScore = (candidateId: string, jobId: string) => {
    // Mock AI matching algorithm
    const candidate = mockCandidates.find((c) => c.id === candidateId);
    const job = mockJobRequests.find((j) => j.id === jobId);

    if (!candidate || !job) return 0;

    let score = 50; // Base score

    // Specialty match
    const specialtyMatch = candidate.specialties.some((s) =>
      job.requiredSpecialties.some((rs) => rs.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(rs.toLowerCase()))
    );
    if (specialtyMatch) score += 25;

    // Role match
    if (candidate.role.toLowerCase().includes(job.role.toLowerCase()) ||
        job.role.toLowerCase().includes(candidate.role.toLowerCase())) {
      score += 15;
    }

    // Compliance score bonus
    if (candidate.complianceScore > 90) score += 5;
    if (candidate.complianceScore > 80) score += 3;

    // Dropout risk penalty
    if (candidate.dropoutRisk > 50) score -= 10;
    if (candidate.dropoutRisk > 30) score -= 5;

    // Availability bonus
    if (candidate.availability === 'Immediate') score += 5;

    return Math.min(100, Math.max(0, score));
  };

  // Get candidates with match scores
  const candidatesWithScores = mockCandidates.map((candidate) => ({
    ...candidate,
    matchScore: selectedJob ? getMatchScore(candidate.id, selectedJob) : 0,
  }));

  // Filter and sort
  let filteredCandidates = candidatesWithScores;
  if (filterStatus !== 'all') {
    filteredCandidates = filteredCandidates.filter((c) => c.status === filterStatus);
  }

  // Sort by match score if job selected
  if (selectedJob) {
    filteredCandidates.sort((a, b) => b.matchScore - a.matchScore);
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      screening: 'default',
      credentialing: 'secondary',
      compliance: 'secondary',
      ready: 'default',
      placed: 'outline',
      at_risk: 'destructive',
    };
    return variants[status] || 'outline';
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRiskBadge = (risk: number) => {
    if (risk > 50) return 'destructive';
    if (risk > 30) return 'secondary';
    return 'default';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Candidate Management</h1>
        <p className="mt-2 text-gray-600">
          AI-powered candidate matching and tracking system
        </p>
      </div>

      {/* AI Job Matching Panel */}
      <Card className="mb-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center">
                <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h2 className="text-2xl font-bold">AI Job Matching Engine</h2>
              </div>
              <p className="mt-2 text-blue-100">
                Select a job position to see AI-powered candidate matches based on skills, availability, credentials, and compliance.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="job-select" className="block text-sm font-medium mb-2">
              Select Job Position
            </label>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="w-full md:w-96 bg-white text-gray-900">
                <SelectValue placeholder="-- Select a job to match --" />
              </SelectTrigger>
              <SelectContent>
                {mockJobRequests
                  .filter((job) => job.status !== 'filled' && job.status !== 'cancelled')
                  .map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title} - {job.clientName} ({job.urgency})
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {selectedJob && (
              <div className="mt-4 bg-blue-700 bg-opacity-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">AI Matching Criteria:</h3>
                <ul className="text-sm text-blue-100 space-y-1">
                  <li>✓ Role and specialty alignment</li>
                  <li>✓ Credential compliance status</li>
                  <li>✓ Candidate availability</li>
                  <li>✓ Historical dropout risk analysis</li>
                  <li>✓ Location and preference matching</li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Automated Compliance Scoring Dashboard - Module 4 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Green Status (90%+)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-700 mb-2">
              {mockCandidates.filter(c => c.complianceScore >= 90).length}
            </p>
            <p className="text-xs text-green-800 mb-3">Ready for immediate placement</p>
            <div className="space-y-2">
              {mockCandidates
                .filter(c => c.complianceScore >= 90)
                .slice(0, 3)
                .map(candidate => (
                  <div key={candidate.id} className="p-2 bg-white rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">{candidate.role}</span>
                      <Badge variant="default" className="text-xs bg-green-600">{candidate.complianceScore}%</Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              Yellow Status (75-89%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-700 mb-2">
              {mockCandidates.filter(c => c.complianceScore >= 75 && c.complianceScore < 90).length}
            </p>
            <p className="text-xs text-yellow-800 mb-3">Minor compliance items pending</p>
            <div className="space-y-2">
              {mockCandidates
                .filter(c => c.complianceScore >= 75 && c.complianceScore < 90)
                .slice(0, 3)
                .map(candidate => (
                  <div key={candidate.id} className="p-2 bg-white rounded-lg border border-yellow-200">
                    <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">{candidate.role}</span>
                      <Badge variant="secondary" className="text-xs bg-yellow-600 text-white">{candidate.complianceScore}%</Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              Red Status (&lt;75%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-700 mb-2">
              {mockCandidates.filter(c => c.complianceScore < 75).length}
            </p>
            <p className="text-xs text-red-800 mb-3">Critical compliance issues</p>
            <div className="space-y-2">
              {mockCandidates
                .filter(c => c.complianceScore < 75)
                .slice(0, 3)
                .map(candidate => (
                  <div key={candidate.id} className="p-2 bg-white rounded-lg border border-red-200">
                    <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">{candidate.role}</span>
                      <Badge variant="destructive" className="text-xs">{candidate.complianceScore}%</Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Filter Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setFilterStatus('all')}
              variant={filterStatus === 'all' ? 'default' : 'outline'}
            >
              All ({mockCandidates.length})
            </Button>
            <Button
              onClick={() => setFilterStatus('ready')}
              variant={filterStatus === 'ready' ? 'default' : 'outline'}
              className={filterStatus === 'ready' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              Ready ({mockCandidates.filter((c) => c.status === 'ready').length})
            </Button>
            <Button
              onClick={() => setFilterStatus('credentialing')}
              variant={filterStatus === 'credentialing' ? 'default' : 'outline'}
              className={filterStatus === 'credentialing' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
            >
              Credentialing ({mockCandidates.filter((c) => c.status === 'credentialing').length})
            </Button>
            <Button
              onClick={() => setFilterStatus('at_risk')}
              variant={filterStatus === 'at_risk' ? 'destructive' : 'outline'}
            >
              At Risk ({mockCandidates.filter((c) => c.status === 'at_risk').length})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Table */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-lg">
            Candidates
            {selectedJob && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                (sorted by AI match score)
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                {selectedJob && (
                  <TableHead>Match Score</TableHead>
                )}
                <TableHead>Candidate</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Specialties</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Dropout Risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  {selectedJob && (
                    <TableCell>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full font-bold ${getMatchScoreColor(candidate.matchScore)}`}>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {candidate.matchScore}%
                      </div>
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {candidate.name}
                        </div>
                        <div className="text-xs text-gray-500">{candidate.location}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">{candidate.role}</div>
                    <div className="text-xs text-gray-500">{candidate.yearsExperience} years exp</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {candidate.specialties.slice(0, 2).map((specialty, idx) => (
                        <Badge key={idx} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                      {candidate.specialties.length > 2 && (
                        <Badge variant="outline">
                          +{candidate.specialties.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadge(candidate.status)}>
                      {candidate.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">
                    {candidate.availability}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-16 mr-2">
                        <Progress
                          value={candidate.complianceScore}
                          className={
                            candidate.complianceScore >= 90
                              ? 'bg-green-200 [&>div]:bg-green-600'
                              : candidate.complianceScore >= 75
                              ? 'bg-yellow-200 [&>div]:bg-yellow-600'
                              : 'bg-red-200 [&>div]:bg-red-600'
                          }
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {candidate.complianceScore}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRiskBadge(candidate.dropoutRisk) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                      {candidate.dropoutRisk}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI Insights */}
      {selectedJob && (
        <Card className="mt-6 bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-purple-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-purple-900">AI Matching Insights</h3>
                <p className="mt-2 text-sm text-purple-800">
                  The AI engine analyzes {filteredCandidates.length} candidates against job requirements.
                  Top matches (80%+) indicate strong alignment across role, specialties, credentials, and availability.
                  Consider candidates with 60-79% match if they show low dropout risk and high compliance scores.
                </p>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-white">
                    <CardContent className="p-3">
                      <p className="text-xs text-gray-600">Excellent Match (80%+)</p>
                      <p className="text-xl font-bold text-green-600">
                        {filteredCandidates.filter((c) => c.matchScore >= 80).length}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white">
                    <CardContent className="p-3">
                      <p className="text-xs text-gray-600">Good Match (60-79%)</p>
                      <p className="text-xl font-bold text-yellow-600">
                        {filteredCandidates.filter((c) => c.matchScore >= 60 && c.matchScore < 80).length}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white">
                    <CardContent className="p-3">
                      <p className="text-xs text-gray-600">Low Match (&lt;60%)</p>
                      <p className="text-xl font-bold text-red-600">
                        {filteredCandidates.filter((c) => c.matchScore < 60).length}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
