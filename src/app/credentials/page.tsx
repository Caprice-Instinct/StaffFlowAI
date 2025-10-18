'use client';

import { useState } from 'react';
import { mockCandidates, Credential, mockCredentialAlerts, mockBlockchainWallets, mockOCRProcessingLogs } from '@/data/mockData';
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
import { toast } from 'sonner';

export default function CredentialsPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Flatten all credentials from all candidates
  const allCredentials: Array<Credential & { candidateName: string; candidateId: string }> = [];
  mockCandidates.forEach((candidate) => {
    candidate.credentials.forEach((credential) => {
      allCredentials.push({
        ...credential,
        candidateName: candidate.name,
        candidateId: candidate.id,
      });
    });
  });

  // Filter credentials
  const filteredCredentials = filterStatus === 'all'
    ? allCredentials
    : allCredentials.filter((c) => c.status === filterStatus);

  // Count by status
  const statusCounts = {
    valid: allCredentials.filter((c) => c.status === 'valid').length,
    expiring: allCredentials.filter((c) => c.status === 'expiring').length,
    expired: allCredentials.filter((c) => c.status === 'expired').length,
    missing: allCredentials.filter((c) => c.status === 'missing').length,
  };

  const getStatusBadge = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      valid: 'default',
      expiring: 'secondary',
      expired: 'destructive',
      missing: 'outline',
    };
    return variants[status] || 'outline';
  };

  const getVerificationBadge = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      verified: 'default',
      pending: 'secondary',
      failed: 'destructive',
    };
    return variants[status] || 'outline';
  };

  const handleRequestRenewal = (candidateName: string, credentialName: string) => {
    toast.success(`Renewal request sent for ${credentialName}`, {
      description: `Email and SMS sent to ${candidateName} with renewal instructions`,
      position: 'bottom-right',
      duration: 5000,
    });
  };

  const handleRequestUpload = (candidateName: string, credentialName: string) => {
    toast.success(`Upload request sent for ${credentialName}`, {
      description: `Notification sent to ${candidateName} to upload missing document`,
      position: 'bottom-right',
      duration: 5000,
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const handleDeleteFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmitDocuments = () => {
    if (uploadedFiles.length === 0) {
      toast.error('No documents to submit', {
        description: 'Please upload at least one document before submitting',
        position: 'bottom-right',
        duration: 5000,
      });
      return;
    }

    toast.success(`${uploadedFiles.length} document${uploadedFiles.length > 1 ? 's' : ''} uploaded successfully`, {
      description: 'OCR processing started - extracting credential data using AI/NLP',
      position: 'bottom-right',
      duration: 5000,
    });

    // Clear uploaded files after submission
    setUploadedFiles([]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'expiring':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'expired':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'missing':
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Credential Tracker</h1>
        <p className="mt-2 text-gray-600">
          Monitor and manage credential status across all candidates
        </p>
      </div>

      {/* Predictive Alerts Dashboard - Module 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300">
            <CardHeader className="border-b border-blue-200">
              <CardTitle className="text-lg flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Predictive License Alerts (90/60/30-Day Monitoring)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {mockCredentialAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${
                      alert.severity === 'critical'
                        ? 'bg-red-50 border-red-300'
                        : alert.severity === 'high'
                        ? 'bg-orange-50 border-orange-300'
                        : 'bg-yellow-50 border-yellow-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant={alert.severity === 'critical' || alert.severity === 'high' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {alert.alertType.replace(/_/g, ' ').toUpperCase()}
                          </Badge>
                          <span className="text-xs font-medium text-gray-700">
                            {alert.candidateName}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800 font-medium">{alert.credentialName}</p>
                        <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {alert.smsSent && (
                            <Badge variant="outline" className="text-xs bg-white">
                              ✓ SMS Sent: {new Date(alert.smsTimestamp || '').toLocaleTimeString()}
                            </Badge>
                          )}
                          {alert.alternativePathwayTriggered && (
                            <Badge variant="default" className="text-xs bg-purple-600">
                              Alternative Pathway Active
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
        </div>

        {/* Portal Health Monitor */}
        <div>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-300">
            <CardHeader className="border-b border-green-200">
              <CardTitle className="text-base flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Portal Health Monitor
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-xs text-gray-700 mb-3">Monitoring licensing portals every 3 hours</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Nursing Council of Kenya</p>
                    <p className="text-xs text-gray-500">Last checked: 12 mins ago</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <Badge variant="default" className="text-xs bg-green-600">Online</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-yellow-200">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Kenya Red Cross (BLS)</p>
                    <p className="text-xs text-gray-500">Last checked: 8 mins ago</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <Badge variant="secondary" className="text-xs">Degraded</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                  <div>
                    <p className="text-sm font-medium text-gray-900">ACLS Provider Portal</p>
                    <p className="text-xs text-gray-500">Down for 6 hours</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <Badge variant="destructive" className="text-xs">Offline</Badge>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-xs text-purple-800">
                  <strong>Auto-Response:</strong> Alternative verification pathways activated for offline portals
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Document Parser with OCR + NLP - Module 1 */}
      <Card className="mb-8 bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-300">
        <CardHeader className="border-b border-indigo-200">
          <CardTitle className="text-lg flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            AI Document Parser (OCR + NLP)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-sm text-gray-700 mb-4">
            Upload credential documents (licenses, BLS, ACLS, PALS) as PDFs or images. AI automatically extracts license numbers, dates, and issuer information with 90%+ accuracy.
          </p>

          {/* Upload Area */}
          <div className="mb-6">
            <input
              type="file"
              id="file-upload"
              accept=".pdf,.png,.jpg,.jpeg"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="block p-6 border-2 border-dashed border-indigo-300 rounded-lg bg-white hover:bg-indigo-50 transition-colors cursor-pointer"
            >
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  Click to upload or drag and drop
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  PDF, PNG, JPG up to 10MB
                </p>
                <div className="mt-3">
                  <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Select Files
                  </span>
                </div>
              </div>
            </label>

            {/* Display Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Uploaded Files ({uploadedFiles.length})
                </h4>
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white border border-indigo-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <svg className="w-8 h-8 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteFile(index)}
                      className="ml-3 p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                      title="Delete file"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}

                {/* Submit Button */}
                <div className="pt-2">
                  <Button onClick={handleSubmitDocuments} className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg">
                    Submit {uploadedFiles.length} Document{uploadedFiles.length > 1 ? 's' : ''} for OCR Processing
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Processing Logs */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Recent Processing Activity
            </h4>

            {mockOCRProcessingLogs.map((log) => (
              <div
                key={log.processingId}
                className={`p-4 rounded-lg border ${
                  log.processingStatus === 'completed'
                    ? 'bg-green-50 border-green-200'
                    : log.processingStatus === 'processing'
                    ? 'bg-blue-50 border-blue-200'
                    : log.processingStatus === 'review_needed'
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          log.processingStatus === 'completed'
                            ? 'default'
                            : log.processingStatus === 'failed'
                            ? 'destructive'
                            : 'secondary'
                        }
                        className={
                          log.processingStatus === 'completed'
                            ? 'bg-green-600'
                            : log.processingStatus === 'processing'
                            ? 'bg-blue-600'
                            : ''
                        }
                      >
                        {log.processingStatus.toUpperCase().replace(/_/g, ' ')}
                      </Badge>
                      {log.processingStatus === 'processing' && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-blue-700">Processing...</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm font-medium text-gray-900">{log.candidateName}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      File: {log.fileName} • Uploaded: {new Date(log.uploadedAt).toLocaleString()}
                    </p>

                    {/* Extracted Data */}
                    {log.extractedData && (
                      <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-600">Credential:</span>
                            <p className="font-medium text-gray-900">{log.extractedData.credentialName}</p>
                          </div>
                          {log.extractedData.licenseNumber && (
                            <div>
                              <span className="text-gray-600">License #:</span>
                              <p className="font-medium text-gray-900">{log.extractedData.licenseNumber}</p>
                            </div>
                          )}
                          {log.extractedData.issueDate && (
                            <div>
                              <span className="text-gray-600">Issue Date:</span>
                              <p className="font-medium text-gray-900">{log.extractedData.issueDate}</p>
                            </div>
                          )}
                          {log.extractedData.expiryDate && (
                            <div>
                              <span className="text-gray-600">Expiry Date:</span>
                              <p className="font-medium text-gray-900">{log.extractedData.expiryDate}</p>
                            </div>
                          )}
                          {log.extractedData.issuer && (
                            <div className="col-span-2">
                              <span className="text-gray-600">Issuer:</span>
                              <p className="font-medium text-gray-900">{log.extractedData.issuer}</p>
                            </div>
                          )}
                        </div>

                        <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-xs">
                              <span className="text-gray-600">OCR Confidence:</span>
                              <span className={`ml-1 font-semibold ${
                                log.extractedData.confidence >= 95 ? 'text-green-700' :
                                log.extractedData.confidence >= 85 ? 'text-yellow-700' :
                                'text-red-700'
                              }`}>
                                {log.extractedData.confidence}%
                              </span>
                            </div>
                            <div className="text-xs">
                              <span className="text-gray-600">NLP:</span>
                              <span className="ml-1 font-semibold text-gray-900">{log.nlpConfidence}%</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {log.ocrEngine}
                          </Badge>
                        </div>
                      </div>
                    )}

                    {/* Processing Info */}
                    {log.processingStatus === 'processing' && (
                      <div className="mt-3 text-xs text-blue-700">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-blue-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-blue-600 h-full w-3/4 animate-pulse"></div>
                          </div>
                          <span>75%</span>
                        </div>
                        <p className="mt-1">Extracting text and analyzing structure...</p>
                      </div>
                    )}

                    {/* Review Notes */}
                    {log.manualReviewRequired && log.reviewNotes && (
                      <div className="mt-3 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs text-yellow-900">
                        <strong>Review Required:</strong> {log.reviewNotes}
                      </div>
                    )}

                    {/* Processing Time */}
                    {log.processingTimeMs > 0 && (
                      <p className="mt-2 text-xs text-gray-500">
                        Processing time: {(log.processingTimeMs / 1000).toFixed(2)}s
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* OCR Technology Info */}
          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div className="text-xs text-purple-800">
                <strong>AI Technology:</strong> Computer vision models (Tesseract OCR, Google Vision API, Azure Computer Vision) extract text from images.
                Natural Language Processing (NLP) identifies credential types, dates, and issuing authorities with 90%+ accuracy.
                Low-confidence extractions flagged for manual review.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valid</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{statusCounts.valid}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                {getStatusIcon('valid')}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{statusCounts.expiring}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                {getStatusIcon('expiring')}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{statusCounts.expired}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                {getStatusIcon('expired')}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-gray-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Missing</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{statusCounts.missing}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                {getStatusIcon('missing')}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Filter Credentials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setFilterStatus('all')}
              variant={filterStatus === 'all' ? 'default' : 'outline'}
            >
              All ({allCredentials.length})
            </Button>
            <Button
              onClick={() => setFilterStatus('valid')}
              variant={filterStatus === 'valid' ? 'default' : 'outline'}
              className={filterStatus === 'valid' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              Valid ({statusCounts.valid})
            </Button>
            <Button
              onClick={() => setFilterStatus('expiring')}
              variant={filterStatus === 'expiring' ? 'default' : 'outline'}
              className={filterStatus === 'expiring' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
            >
              Expiring Soon ({statusCounts.expiring})
            </Button>
            <Button
              onClick={() => setFilterStatus('expired')}
              variant={filterStatus === 'expired' ? 'destructive' : 'outline'}
            >
              Expired ({statusCounts.expired})
            </Button>
            <Button
              onClick={() => setFilterStatus('missing')}
              variant={filterStatus === 'missing' ? 'default' : 'outline'}
              className={filterStatus === 'missing' ? 'bg-gray-600 hover:bg-gray-700' : ''}
            >
              Missing ({statusCounts.missing})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Credentials Table */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-lg">
            Credential Details
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredCredentials.length} credentials)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Credential</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCredentials.map((credential, index) => (
                <TableRow key={`${credential.candidateId}-${credential.id}-${index}`}>
                  <TableCell>
                    <div className="flex items-center">
                      {getStatusIcon(credential.status)}
                      <Badge variant={getStatusBadge(credential.status)} className="ml-2">
                        {credential.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-gray-900">
                      {credential.candidateName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">{credential.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-500">{credential.type}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">
                      {credential.issueDate || '-'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">
                      {credential.expiryDate || '-'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getVerificationBadge(credential.verificationStatus)}>
                      {credential.verificationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {credential.status === 'expired' || credential.status === 'expiring' ? (
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={() => handleRequestRenewal(credential.candidateName, credential.name)}
                      >
                        Request Renewal
                      </Button>
                    ) : credential.status === 'missing' ? (
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={() => handleRequestUpload(credential.candidateName, credential.name)}
                      >
                        Request Upload
                      </Button>
                    ) : (
                      <span className="text-gray-400">No Action</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Blockchain Credential Wallet - Module 1 */}
      <Card className="mt-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300">
        <CardHeader className="border-b border-purple-200">
          <CardTitle className="text-lg flex items-center gap-2">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Blockchain Credential Wallet (Cryptographically Signed)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-sm text-gray-700 mb-4">
            Secure digital wallets with cryptographically signed credentials - eliminates redundant re-checks and enables instant verification sharing
          </p>
          <div className="space-y-4">
            {mockBlockchainWallets.map((wallet) => (
              <div key={wallet.candidateId} className="p-4 bg-white rounded-lg border border-purple-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{wallet.candidateName}</h4>
                    <p className="text-xs text-gray-600 mt-1 font-mono">
                      Wallet: {wallet.walletAddress.substring(0, 20)}...
                    </p>
                  </div>
                  <Badge variant="default" className="bg-purple-600">
                    {wallet.verifiedCredentials.length} Verified
                  </Badge>
                </div>

                {/* Verified Credentials */}
                <div className="space-y-2 mb-3">
                  {wallet.verifiedCredentials.map((cred) => (
                    <div key={cred.credentialId} className="p-3 bg-purple-50 rounded border border-purple-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{cred.credentialName}</p>
                          <p className="text-xs text-gray-600 mt-1">Issuer: {cred.issuer}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Verified: {new Date(cred.verifiedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="ml-3">
                          <div className="flex items-center gap-1 text-xs text-green-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Signed
                          </div>
                          <p className="text-xs text-gray-500 mt-1 font-mono">
                            {cred.cryptographicSignature.substring(0, 12)}...
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shared With Facilities */}
                {wallet.sharedWith.length > 0 && (
                  <div className="pt-3 border-t border-purple-200">
                    <p className="text-xs font-semibold text-gray-700 mb-2">
                      Shared Access ({wallet.sharedWith.length} facilities)
                    </p>
                    <div className="space-y-1">
                      {wallet.sharedWith.map((share, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-gray-700">{share.facilityName}</span>
                          <span className="text-gray-500">
                            Expires: {new Date(share.accessExpiry).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Security Features */}
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div className="text-xs text-green-800">
                      <strong>Security:</strong> 256-bit encryption, immutable audit trail, time-limited access tokens, automatic expiration enforcement
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Data Retention & Privacy */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Data Retention & Privacy Policy
            </h4>
            <div className="space-y-2 text-xs text-blue-800">
              <div className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <p><strong>Retention Period:</strong> Credential data retained for 7 years post-employment as per regulatory requirements</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <p><strong>Right to Deletion:</strong> Candidates can request permanent deletion after retention period expires</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <p><strong>Access Control:</strong> Multi-factor authentication required for wallet access, role-based permissions for staff</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <p><strong>Audit Logging:</strong> All credential access logged with timestamp, user ID, and action type - immutable blockchain records</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <p><strong>Encryption:</strong> AES-256 encryption at rest, TLS 1.3 in transit, zero-knowledge architecture for maximum privacy</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <p><strong>Compliance:</strong> GDPR compliant, HIPAA secure, Kenya Data Protection Act 2019 aligned</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Automation Notice */}
      <Card className="mt-6 bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-blue-900">AI-Powered Automation</h3>
              <p className="mt-2 text-sm text-blue-800">
                The system automatically monitors credential expiration dates and sends renewal reminders 30, 60, and 90 days before expiry.
                Verification requests are automatically sent to issuing authorities, and candidates receive notifications for missing documents.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
