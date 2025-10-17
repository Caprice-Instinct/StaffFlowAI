'use client';

import { useState } from 'react';
import { mockWorkflows, mockAutoSubmissionLogs } from '@/data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function WorkflowsPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterStage, setFilterStage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('daysInProcess');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBlockedWorkflow, setSelectedBlockedWorkflow] = useState<typeof mockWorkflows[0] | null>(null);
  const [actionMessage, setActionMessage] = useState<string>('');

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'in_progress':
        return (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        );
      case 'blocked':
        return (
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'pending':
      default:
        return (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const getProgressPercentage = (workflow: typeof mockWorkflows[0]) => {
    const completedStages = workflow.stages.filter((s) => s.status === 'completed').length;
    return Math.round((completedStages / workflow.stages.length) * 100);
  };

  const handleSendAction = () => {
    if (!actionMessage.trim()) {
      toast.error('Please enter an action message', {
        position: 'bottom-left',
      });
      return;
    }

    if (!selectedBlockedWorkflow) return;

    const blockedStage = selectedBlockedWorkflow.stages.find((s) => s.status === 'blocked');

    toast.success(`Action sent to ${blockedStage?.assignee || 'assignee'}`, {
      description: `Message: "${actionMessage}"`,
      position: 'bottom-left',
      duration: 5000,
    });

    setSelectedBlockedWorkflow(null);
    setActionMessage('');
  };

  // Filter workflows
  let filteredWorkflows = [...mockWorkflows];

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredWorkflows = filteredWorkflows.filter((w) =>
      w.candidateName.toLowerCase().includes(query) ||
      w.jobTitle.toLowerCase().includes(query) ||
      w.currentStage.toLowerCase().includes(query)
    );
  }

  // Filter by status
  if (filterStatus === 'blocked') {
    filteredWorkflows = filteredWorkflows.filter((w) =>
      w.stages.some((s) => s.status === 'blocked')
    );
  } else if (filterStatus === 'in_progress') {
    filteredWorkflows = filteredWorkflows.filter((w) =>
      w.stages.some((s) => s.status === 'in_progress') &&
      !w.stages.some((s) => s.status === 'blocked')
    );
  } else if (filterStatus === 'completed') {
    filteredWorkflows = filteredWorkflows.filter((w) =>
      w.stages.every((s) => s.status === 'completed')
    );
  }

  // Filter by current stage
  if (filterStage !== 'all') {
    filteredWorkflows = filteredWorkflows.filter((w) =>
      w.currentStage === filterStage
    );
  }

  // Sort workflows
  if (sortBy === 'daysInProcess') {
    filteredWorkflows.sort((a, b) => b.daysInProcess - a.daysInProcess);
  } else if (sortBy === 'progress') {
    filteredWorkflows.sort((a, b) =>
      getProgressPercentage(b) - getProgressPercentage(a)
    );
  } else if (sortBy === 'name') {
    filteredWorkflows.sort((a, b) =>
      a.candidateName.localeCompare(b.candidateName)
    );
  }

  // Get unique stages for filter
  const uniqueStages = Array.from(new Set(mockWorkflows.map((w) => w.currentStage)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Candidate Workflows</h1>
        <p className="mt-2 text-gray-600">
          Track candidate progress from application to onboarding
        </p>
      </div>

      {/* Search Bar */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <Input
              type="text"
              placeholder="Search by candidate name, job title, or stage..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Filters and Sort */}
      <Card className="mb-6">
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Filter & Sort Workflows</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setFilterStatus('all')}
                variant={filterStatus === 'all' ? 'default' : 'outline'}
              >
                All ({mockWorkflows.length})
              </Button>
              <Button
                onClick={() => setFilterStatus('in_progress')}
                variant={filterStatus === 'in_progress' ? 'default' : 'outline'}
              >
                In Progress ({mockWorkflows.filter((w) => w.stages.some((s) => s.status === 'in_progress') && !w.stages.some((s) => s.status === 'blocked')).length})
              </Button>
              <Button
                onClick={() => setFilterStatus('blocked')}
                variant={filterStatus === 'blocked' ? 'destructive' : 'outline'}
              >
                Blocked ({mockWorkflows.filter((w) => w.stages.some((s) => s.status === 'blocked')).length})
              </Button>
              <Button
                onClick={() => setFilterStatus('completed')}
                variant={filterStatus === 'completed' ? 'default' : 'outline'}
                className={filterStatus === 'completed' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                Completed ({mockWorkflows.filter((w) => w.stages.every((s) => s.status === 'completed')).length})
              </Button>
            </div>
          </div>

          {/* Stage Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Current Stage</label>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setFilterStage('all')}
                variant={filterStage === 'all' ? 'default' : 'outline'}
                className={filterStage === 'all' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                All Stages
              </Button>
              {uniqueStages.map((stage) => (
                <Button
                  key={stage}
                  onClick={() => setFilterStage(stage)}
                  variant={filterStage === stage ? 'default' : 'outline'}
                  className={filterStage === stage ? 'bg-purple-600 hover:bg-purple-700' : ''}
                >
                  {stage} ({mockWorkflows.filter((w) => w.currentStage === stage).length})
                </Button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setSortBy('daysInProcess')}
                variant={sortBy === 'daysInProcess' ? 'default' : 'outline'}
                className={sortBy === 'daysInProcess' ? 'bg-orange-600 hover:bg-orange-700' : ''}
              >
                Days in Process
              </Button>
              <Button
                onClick={() => setSortBy('progress')}
                variant={sortBy === 'progress' ? 'default' : 'outline'}
                className={sortBy === 'progress' ? 'bg-orange-600 hover:bg-orange-700' : ''}
              >
                Progress %
              </Button>
              <Button
                onClick={() => setSortBy('name')}
                variant={sortBy === 'name' ? 'default' : 'outline'}
                className={sortBy === 'name' ? 'bg-orange-600 hover:bg-orange-700' : ''}
              >
                Candidate Name
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredWorkflows.length}</span> of {mockWorkflows.length} workflows
            </p>
          </div>
        </CardContent>
      </Card>

      {/* One-Click Packet Bot - Module 2 */}
      <Card className="mb-8 bg-gradient-to-br from-green-50 to-green-100 border-green-300">
        <CardHeader className="border-b border-green-200">
          <CardTitle className="text-lg flex items-center gap-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            One-Click Packet Bot (RPA Auto-Submission)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-sm text-gray-700 mb-4">
            Automated packet generation and VMS submission - generates facility-specific documents, logs into client VMS, and submits automatically
          </p>
          <div className="space-y-3">
            {mockAutoSubmissionLogs.map((log) => (
              <div
                key={log.logId}
                className={`p-4 rounded-lg border ${
                  log.status === 'success'
                    ? 'bg-white border-green-300'
                    : log.status === 'pending'
                    ? 'bg-yellow-50 border-yellow-300'
                    : 'bg-red-50 border-red-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          log.status === 'success'
                            ? 'default'
                            : log.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                        className={log.status === 'success' ? 'bg-green-600' : ''}
                      >
                        {log.status.toUpperCase()}
                      </Badge>
                      <span className="text-sm font-medium text-gray-900">
                        {log.candidateName}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>Facility:</strong> {log.facilityName}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        {log.packetGenerated ? (
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span>Packet Generated</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {log.vmsSubmitted ? (
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span>VMS Submitted</span>
                      </div>
                      <div>
                        <strong>Confirmation:</strong> {log.confirmationNumber}
                      </div>
                      <div>
                        <strong>Time:</strong> {new Date(log.submittedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-xs text-blue-800">
                <strong>RPA Process:</strong> Bot automatically extracts candidate data, generates customized packets per facility requirements, authenticates with VMS portals, uploads documents, and captures confirmation numbers - all within 90 seconds per submission.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-600">Active Workflows</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {mockWorkflows.length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-600">Avg Time to Completion</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {Math.round(mockWorkflows.reduce((acc, w) => acc + w.daysInProcess, 0) / mockWorkflows.length)}d
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-600">In Progress</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {mockWorkflows.filter((w) => w.stages.some((s) => s.status === 'in_progress')).length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-600">Blocked</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {mockWorkflows.filter((w) => w.stages.some((s) => s.status === 'blocked')).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Timelines */}
      <div className="space-y-6">
        {filteredWorkflows.length === 0 ? (
          <Card className="p-12 text-center">
            <CardContent>
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="mt-4 text-gray-600 text-lg">No workflows match the selected filters.</p>
              <Button
                onClick={() => {
                  setFilterStatus('all');
                  setFilterStage('all');
                  setSearchQuery('');
                }}
                className="mt-4"
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredWorkflows.map((workflow) => {
          const progress = getProgressPercentage(workflow);
          const hasBlockedStage = workflow.stages.some((s) => s.status === 'blocked');

          return (
            <Card
              key={`${workflow.candidateId}-${workflow.jobId}`}
              className={`border-l-4 ${
                hasBlockedStage ? 'border-l-red-500' : 'border-l-primary'
              }`}
            >
              {/* Workflow Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">
                        {workflow.candidateName}
                      </CardTitle>
                      {hasBlockedStage && (
                        <>
                          <Badge variant="destructive">
                            BLOCKED
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedBlockedWorkflow(workflow)}
                            className="ml-auto"
                          >
                            Send Action Update
                          </Button>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {workflow.jobTitle} • {workflow.daysInProcess} days in process
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      Progress: {progress}%
                    </div>
                    <div className="w-32 mt-2">
                      <Progress
                        value={progress}
                        className={hasBlockedStage ? 'bg-red-200 [&>div]:bg-red-500' : ''}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Timeline */}
              <CardContent className="p-6">
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                  {/* Stages */}
                  <div className="space-y-6">
                    {workflow.stages.map((stage, index) => (
                      <div key={index} className="relative flex items-start">
                        {/* Stage Icon */}
                        <div className="relative z-10 flex-shrink-0">
                          {getStageIcon(stage.status)}
                        </div>

                        {/* Stage Content */}
                        <div className="ml-6 flex-1">
                          <Card className="bg-gray-50">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="text-sm font-semibold text-gray-900">
                                    {stage.stage}
                                  </h4>
                                  {stage.completedDate && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      Completed: {stage.completedDate}
                                    </p>
                                  )}
                                  {stage.assignee && (
                                    <p className="text-xs text-gray-600 mt-1">
                                      Assignee: {stage.assignee}
                                    </p>
                                  )}
                                  {stage.notes && (
                                    <p className="text-xs text-red-600 mt-2 italic">
                                      Note: {stage.notes}
                                    </p>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <Badge
                                    variant={
                                      stage.status === 'completed'
                                        ? 'default'
                                        : stage.status === 'in_progress'
                                        ? 'secondary'
                                        : stage.status === 'blocked'
                                        ? 'destructive'
                                        : 'outline'
                                    }
                                    className={stage.status === 'completed' ? 'bg-green-600' : ''}
                                  >
                                    {stage.status.replace('_', ' ')}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>

              {/* Current Stage Highlight */}
              <CardContent className="bg-blue-50 border-t border-blue-100">
                <p className="text-sm">
                  <span className="font-semibold text-blue-900">Current Stage:</span>{' '}
                  <span className="text-blue-700">{workflow.currentStage}</span>
                </p>
              </CardContent>
            </Card>
          );
        })
        )}
      </div>

      {/* Blocked Workflow Action Dialog */}
      <Dialog open={!!selectedBlockedWorkflow} onOpenChange={() => setSelectedBlockedWorkflow(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Action Update</DialogTitle>
            <DialogDescription>
              Send an action update to resolve the blocked workflow for {selectedBlockedWorkflow?.candidateName}
            </DialogDescription>
          </DialogHeader>

          {selectedBlockedWorkflow && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-red-900">Blocked Stage</p>
                <p className="text-sm text-red-700 mt-1">
                  {selectedBlockedWorkflow.stages.find((s) => s.status === 'blocked')?.stage}
                </p>
                <p className="text-xs text-red-600 mt-2 italic">
                  {selectedBlockedWorkflow.stages.find((s) => s.status === 'blocked')?.notes}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Assignee: {selectedBlockedWorkflow.stages.find((s) => s.status === 'blocked')?.assignee}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Action Message
                </label>
                <Textarea
                  placeholder="Describe the action to take to resolve this blockage..."
                  value={actionMessage}
                  onChange={(e) => setActionMessage(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setSelectedBlockedWorkflow(null);
              setActionMessage('');
            }}>
              Cancel
            </Button>
            <Button onClick={handleSendAction}>
              Send Action
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Automation Notice */}
      <Card className="mt-8 bg-gradient-to-r from-purple-600 to-purple-800 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-start">
            <svg className="w-8 h-8 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div className="ml-4">
              <h3 className="text-xl font-bold">Automated Workflow Management</h3>
              <p className="mt-2 text-purple-100">
                UISP automatically tracks candidate progress through each stage, sends notifications to assignees,
                escalates delays, and predicts bottlenecks before they occur. Stage transitions are logged in real-time
                with full audit trails.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-700 bg-opacity-50 rounded-lg p-3">
                  <p className="text-sm font-semibold">Auto-Notifications</p>
                  <p className="text-xs text-purple-200 mt-1">
                    Assignees notified on stage changes
                  </p>
                </div>
                <div className="bg-purple-700 bg-opacity-50 rounded-lg p-3">
                  <p className="text-sm font-semibold">Delay Detection</p>
                  <p className="text-xs text-purple-200 mt-1">
                    AI flags stages exceeding avg time
                  </p>
                </div>
                <div className="bg-purple-700 bg-opacity-50 rounded-lg p-3">
                  <p className="text-sm font-semibold">Smart Routing</p>
                  <p className="text-xs text-purple-200 mt-1">
                    Candidates routed to available staff
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
