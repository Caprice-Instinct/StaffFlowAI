'use client';

import { useState } from 'react';
import { mockJobRequests } from '@/data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function JobsPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');

  // Filter jobs
  let filteredJobs = mockJobRequests;
  if (filterStatus !== 'all') {
    filteredJobs = filteredJobs.filter((job) => job.status === filterStatus);
  }
  if (filterUrgency !== 'all') {
    filteredJobs = filteredJobs.filter((job) => job.urgency === filterUrgency);
  }

  const getStatusBadge = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      open: 'default',
      in_progress: 'secondary',
      filled: 'default',
      cancelled: 'outline',
    };
    return variants[status] || 'outline';
  };

  const getUrgencyBadge = (urgency: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      critical: 'destructive',
      high: 'secondary',
      medium: 'secondary',
      low: 'default',
    };
    return variants[urgency] || 'outline';
  };

  const getUrgencyIcon = (urgency: string) => {
    if (urgency === 'critical' || urgency === 'high') {
      return (
        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    }
    return null;
  };

  // Calculate days until start
  const getDaysUntilStart = (startDate: string) => {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = start.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Requests</h1>
        <p className="mt-2 text-gray-600">
          Manage and track healthcare staffing requests from clients
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-600">Open Positions</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {mockJobRequests.filter((j) => j.status === 'open').length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-600">In Progress</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {mockJobRequests.filter((j) => j.status === 'in_progress').length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-600">Critical Urgency</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {mockJobRequests.filter((j) => j.urgency === 'critical').length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-600">Filled</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {mockJobRequests.filter((j) => j.status === 'filled').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Filter Jobs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setFilterStatus('all')}
                variant={filterStatus === 'all' ? 'default' : 'outline'}
              >
                All
              </Button>
              <Button
                onClick={() => setFilterStatus('open')}
                variant={filterStatus === 'open' ? 'default' : 'outline'}
              >
                Open
              </Button>
              <Button
                onClick={() => setFilterStatus('in_progress')}
                variant={filterStatus === 'in_progress' ? 'default' : 'outline'}
                className={filterStatus === 'in_progress' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                In Progress
              </Button>
              <Button
                onClick={() => setFilterStatus('filled')}
                variant={filterStatus === 'filled' ? 'default' : 'outline'}
                className={filterStatus === 'filled' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                Filled
              </Button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setFilterUrgency('all')}
                variant={filterUrgency === 'all' ? 'default' : 'outline'}
              >
                All
              </Button>
              <Button
                onClick={() => setFilterUrgency('critical')}
                variant={filterUrgency === 'critical' ? 'destructive' : 'outline'}
              >
                Critical
              </Button>
              <Button
                onClick={() => setFilterUrgency('high')}
                variant={filterUrgency === 'high' ? 'default' : 'outline'}
                className={filterUrgency === 'high' ? 'bg-orange-600 hover:bg-orange-700' : ''}
              >
                High
              </Button>
              <Button
                onClick={() => setFilterUrgency('medium')}
                variant={filterUrgency === 'medium' ? 'default' : 'outline'}
                className={filterUrgency === 'medium' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
              >
                Medium
              </Button>
              <Button
                onClick={() => setFilterUrgency('low')}
                variant={filterUrgency === 'low' ? 'default' : 'outline'}
                className={filterUrgency === 'low' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                Low
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Cards */}
      <div className="space-y-6">
        {filteredJobs.map((job) => {
          const daysUntilStart = getDaysUntilStart(job.startDate);
          return (
            <Card
              key={job.id}
              className={`border-l-4 ${
                job.urgency === 'critical'
                  ? 'border-l-red-500'
                  : job.urgency === 'high'
                  ? 'border-l-orange-500'
                  : job.urgency === 'medium'
                  ? 'border-l-yellow-500'
                  : 'border-l-green-500'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      {getUrgencyIcon(job.urgency)}
                      <h3 className="text-xl font-bold text-gray-900 ml-2">
                        {job.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{job.clientName}</p>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-medium text-gray-900">{job.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Shift Type</p>
                        <p className="text-sm font-medium text-gray-900">{job.shiftType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="text-sm font-medium text-gray-900">{job.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {job.startDate}
                          {daysUntilStart > 0 && (
                            <span className="ml-1 text-xs text-gray-500">
                              ({daysUntilStart}d)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6 flex flex-col items-end space-y-2">
                    <Badge variant={getUrgencyBadge(job.urgency)} className="border">
                      {job.urgency.toUpperCase()}
                    </Badge>
                    <Badge variant={getStatusBadge(job.status)}>
                      {job.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {/* Required Specialties */}
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">Required Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSpecialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Required Credentials */}
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">Required Credentials</p>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredCredentials.map((credential, idx) => (
                      <Badge key={idx} variant="default" className="bg-green-600">
                        {credential}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-900">
                        {job.matchedCandidates} matched candidates
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Posted: {job.createdDate}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button>
                      View Matches
                    </Button>
                    <Button variant="outline">
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <Card className="p-12 text-center">
          <CardContent>
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-4 text-gray-600">No jobs match the selected filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
