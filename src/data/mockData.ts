// Mock data for StaffFlow AI - Healthcare Workforce Intelligence Platform

export type CredentialStatus = 'valid' | 'expiring' | 'expired' | 'missing';
export type CandidateStatus = 'screening' | 'credentialing' | 'compliance' | 'ready' | 'placed' | 'at_risk';
export type JobStatus = 'open' | 'in_progress' | 'filled' | 'cancelled';

export interface Credential {
  id: string;
  name: string;
  type: string;
  status: CredentialStatus;
  issueDate: string;
  expiryDate: string;
  verificationStatus: 'verified' | 'pending' | 'failed';
  daysUntilExpiry?: number;
  autoRenewalTriggered?: boolean;
  portalHealthStatus?: 'online' | 'degraded' | 'offline';
}

// Module 1: Intelligent Credential Management Engine
export interface CredentialAlert {
  id: string;
  credentialId: string;
  candidateId: string;
  candidateName: string;
  credentialName: string;
  alertType: '90_day' | '60_day' | '30_day' | 'portal_down' | 'verification_failed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  smsSent: boolean;
  smsTimestamp?: string;
  alternativePathwayTriggered?: boolean;
}

export interface MicroCredentialingStage {
  stageId: string;
  stageName: string;
  status: 'completed' | 'in_progress' | 'pending' | 'failed';
  parallelizable: boolean;
  estimatedMinutes: number;
  completedAt?: string;
}

export interface BlockchainCredentialWallet {
  candidateId: string;
  candidateName: string;
  walletAddress: string;
  verifiedCredentials: {
    credentialId: string;
    credentialName: string;
    cryptographicSignature: string;
    verifiedAt: string;
    issuer: string;
  }[];
  sharedWith: {
    facilityName: string;
    sharedAt: string;
    accessExpiry: string;
  }[];
}

export interface OCRDocumentProcessing {
  processingId: string;
  candidateId: string;
  candidateName: string;
  documentType: 'license' | 'bls' | 'acls' | 'pals' | 'tb_test' | 'certification';
  fileName: string;
  uploadedAt: string;
  processingStatus: 'processing' | 'completed' | 'failed' | 'review_needed';
  extractedData?: {
    credentialName: string;
    licenseNumber?: string;
    issueDate?: string;
    expiryDate?: string;
    issuer?: string;
    holderName?: string;
    confidence: number; // 0-100
  };
  processingTimeMs: number;
  ocrEngine: 'Tesseract OCR' | 'Google Vision API' | 'Azure Computer Vision';
  nlpConfidence: number; // 0-100
  manualReviewRequired: boolean;
  reviewNotes?: string;
}

// SECURITY ARCHITECTURE
export interface AuditLog {
  logId: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: 'recruiter' | 'credentialer' | 'staffing_lead' | 'candidate' | 'admin';
  action: string;
  resourceType: 'candidate_profile' | 'credential_document' | 'financial_data' | 'system_settings' | 'audit_logs';
  resourceId: string;
  resourceName: string;
  ipAddress: string;
  mfaVerified: boolean;
  result: 'success' | 'denied' | 'failed';
  suspiciousActivity: boolean;
  reason?: string;
}

export interface EncryptionStatus {
  category: string;
  dataType: string;
  encryptionAtRest: 'AES-256' | 'AES-128' | 'none';
  encryptionInTransit: 'TLS 1.3' | 'TLS 1.2' | 'none';
  keyRotationDays: number;
  lastRotation: string;
  nextRotation: string;
  status: 'compliant' | 'warning' | 'critical';
}

export interface AccessControl {
  roleId: string;
  roleName: string;
  permissions: {
    category: string;
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canDownload: boolean;
    requiresMFA: boolean;
  }[];
  activeUsers: number;
  lastReviewDate: string;
}

export interface SecurityIncident {
  incidentId: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'unauthorized_access' | 'data_exfiltration' | 'brute_force' | 'suspicious_download' | 'failed_mfa';
  description: string;
  affectedUsers: string[];
  status: 'detected' | 'investigating' | 'contained' | 'resolved';
  actionTaken?: string;
  resolvedAt?: string;
}

export interface ComplianceMetric {
  standard: 'HIPAA' | 'GDPR' | 'Kenya Data Protection Act 2019' | 'ISO 27001';
  requirement: string;
  status: 'compliant' | 'partial' | 'non_compliant';
  lastAuditDate: string;
  nextAuditDate: string;
  evidenceCount: number;
  notes?: string;
}

// Module 2: Unified Workflow Command Center
export interface SystemIntegration {
  systemId: string;
  systemName: string;
  systemType: 'ats' | 'vms' | 'signature' | 'payroll' | 'job_board';
  status: 'connected' | 'disconnected' | 'degraded';
  lastSync: string;
  syncFrequency: string;
  recordsProcessed: number;
  errorRate: number;
}

export interface AutoSubmissionLog {
  logId: string;
  candidateId: string;
  candidateName: string;
  facilityName: string;
  packetGenerated: boolean;
  vmsSubmitted: boolean;
  submittedAt: string;
  confirmationNumber: string;
  status: 'success' | 'pending' | 'failed';
}

export interface CredentialerWorkload {
  credentialerId: string;
  credentialerName: string;
  activeCases: number;
  avgCaseComplexity: number;
  specializations: string[];
  availabilityScore: number;
}

// Module 3: Predictive Placement Intelligence
export interface ShadowCandidate {
  primaryCandidateId: string;
  shadowCandidateId: string;
  shadowCandidateName: string;
  matchScore: number;
  documentsPreStaged: boolean;
  activationReady: boolean;
  jobId: string;
  jobTitle: string;
}

export interface FlightRiskScore {
  candidateId: string;
  candidateName: string;
  riskScore: number; // 0-100
  behavioralFactors: {
    avgResponseTimeHours: number;
    interviewPunctuality: 'excellent' | 'good' | 'fair' | 'poor';
    communicationGaps: number;
    lastActivityDaysAgo: number;
    commitmentIndicators: number;
  };
  recommendedAction: string;
  autoBackupTriggered: boolean;
}

export interface RateOptimization {
  jobId: string;
  jobTitle: string;
  facilityName: string;
  marketData: {
    regionalAverage: number;
    competitorRates: number[];
    demandIndex: number;
  };
  suggestedRate: number;
  confidence: number;
  calculatedInMs: number;
}

// Module 4: Communication & Compliance Hub
export interface CommunicationChannel {
  candidateId: string;
  candidateName: string;
  preferredChannel: 'email' | 'sms' | 'whatsapp';
  channelActivity: {
    email: { sent: number; opened: number; replied: number };
    sms: { sent: number; replied: number };
    whatsapp: { sent: number; replied: number };
  };
  aiDetectedPreference: string;
  languagePreference: 'english' | 'swahili' | 'french' | 'arabic';
}

export interface GeoSmartOnboarding {
  candidateId: string;
  candidateName: string;
  facilityName: string;
  facilityAddress: string;
  startDate: string;
  firstDayInstructions: {
    departureTime: string;
    turnByTurnDirections: string[];
    transportationMode: string;
    estimatedDuration: string;
    qrCheckInCode: string;
    emergencyContact: string;
  };
  smsSent: boolean;
  offlinePackageGenerated: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  specialties: string[];
  status: CandidateStatus;
  availability: string;
  location: string;
  yearsExperience: number;
  credentials: Credential[];
  applicationDate: string;
  lastActivity: string;
  dropoutRisk: number; // 0-100 percentage
  complianceScore: number; // 0-100 percentage
}

export interface Client {
  id: string;
  name: string;
  location: string;
  type: string;
  activeJobs: number;
}

export interface JobRequest {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  role: string;
  requiredSpecialties: string[];
  location: string;
  shiftType: string;
  startDate: string;
  duration: string;
  status: JobStatus;
  requiredCredentials: string[];
  matchedCandidates: number;
  createdDate: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

export interface WorkflowStage {
  stage: string;
  status: 'completed' | 'in_progress' | 'pending' | 'blocked';
  completedDate?: string;
  assignee?: string;
  notes?: string;
}

export interface CandidateWorkflow {
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  stages: WorkflowStage[];
  currentStage: string;
  daysInProcess: number;
}

// Mock Credentials
export const mockCredentials: Credential[] = [
  {
    id: 'cred-1',
    name: 'Nursing Council of Kenya Registration',
    type: 'License',
    status: 'valid',
    issueDate: '2022-01-15',
    expiryDate: '2026-01-15',
    verificationStatus: 'verified'
  },
  {
    id: 'cred-2',
    name: 'BLS Certification',
    type: 'Certification',
    status: 'expiring',
    issueDate: '2023-06-01',
    expiryDate: '2025-11-01',
    verificationStatus: 'verified'
  },
  {
    id: 'cred-3',
    name: 'ACLS Certification',
    type: 'Certification',
    status: 'expired',
    issueDate: '2022-03-10',
    expiryDate: '2024-03-10',
    verificationStatus: 'failed'
  },
  {
    id: 'cred-4',
    name: 'TB Test',
    type: 'Health Screening',
    status: 'missing',
    issueDate: '',
    expiryDate: '',
    verificationStatus: 'pending'
  }
];

// Mock Candidates
export const mockCandidates: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Wanjiru Kamau',
    email: 'wanjiru.kamau@email.com',
    phone: '+254 712 345678',
    role: 'Registered Nurse',
    specialties: ['ICU', 'Emergency Care', 'Critical Care'],
    status: 'ready',
    availability: 'Immediate',
    location: 'Westlands, Nairobi',
    yearsExperience: 8,
    credentials: [
      { ...mockCredentials[0], id: 'c1-1' },
      { ...mockCredentials[1], id: 'c1-2', status: 'valid', expiryDate: '2027-06-01' }
    ],
    applicationDate: '2025-09-15',
    lastActivity: '2025-10-14',
    dropoutRisk: 15,
    complianceScore: 95
  },
  {
    id: 'cand-2',
    name: 'Otieno Odhiambo',
    email: 'otieno.odhiambo@email.com',
    phone: '+254 722 456789',
    role: 'Licensed Practical Nurse',
    specialties: ['Pediatrics', 'General Care'],
    status: 'credentialing',
    availability: '2 weeks',
    location: 'Kisumu, Kenya',
    yearsExperience: 5,
    credentials: [
      { ...mockCredentials[0], id: 'c2-1', name: 'LPN License' },
      { ...mockCredentials[1], id: 'c2-2', status: 'expiring' }
    ],
    applicationDate: '2025-10-01',
    lastActivity: '2025-10-15',
    dropoutRisk: 35,
    complianceScore: 78
  },
  {
    id: 'cand-3',
    name: 'Njeri Mwangi',
    email: 'njeri.mwangi@email.com',
    phone: '+254 733 567890',
    role: 'Registered Nurse',
    specialties: ['Surgery', 'Post-Op Care'],
    status: 'at_risk',
    availability: '1 week',
    location: 'Mombasa, Kenya',
    yearsExperience: 12,
    credentials: [
      { ...mockCredentials[0], id: 'c3-1' },
      { ...mockCredentials[2], id: 'c3-2' },
      { ...mockCredentials[3], id: 'c3-3' }
    ],
    applicationDate: '2025-09-20',
    lastActivity: '2025-10-08',
    dropoutRisk: 72,
    complianceScore: 62
  },
  {
    id: 'cand-4',
    name: 'Kipchoge Mutai',
    email: 'kipchoge.mutai@email.com',
    phone: '+254 744 678901',
    role: 'Travel Nurse',
    specialties: ['ER', 'Trauma', 'ICU'],
    status: 'compliance',
    availability: 'Flexible',
    location: 'Eldoret, Kenya',
    yearsExperience: 6,
    credentials: [
      { ...mockCredentials[0], id: 'c4-1' },
      { ...mockCredentials[1], id: 'c4-2', status: 'valid', expiryDate: '2027-08-01' }
    ],
    applicationDate: '2025-10-05',
    lastActivity: '2025-10-16',
    dropoutRisk: 22,
    complianceScore: 88
  },
  {
    id: 'cand-5',
    name: 'Achieng Onyango',
    email: 'achieng.onyango@email.com',
    phone: '+254 755 789012',
    role: 'Nurse Practitioner',
    specialties: ['Family Medicine', 'Primary Care'],
    status: 'screening',
    availability: '3 weeks',
    location: 'Nakuru, Kenya',
    yearsExperience: 10,
    credentials: [
      { ...mockCredentials[0], id: 'c5-1', name: 'NP License' },
      { ...mockCredentials[1], id: 'c5-2', status: 'valid', expiryDate: '2027-02-01' }
    ],
    applicationDate: '2025-10-12',
    lastActivity: '2025-10-16',
    dropoutRisk: 18,
    complianceScore: 92
  },
  {
    id: 'cand-6',
    name: 'Wafula Wekesa',
    email: 'wafula.wekesa@email.com',
    phone: '+254 766 890123',
    role: 'Registered Nurse',
    specialties: ['Cardiology', 'Telemetry'],
    status: 'placed',
    availability: 'Currently Placed',
    location: 'Kakamega, Kenya',
    yearsExperience: 7,
    credentials: [
      { ...mockCredentials[0], id: 'c6-1' },
      { ...mockCredentials[1], id: 'c6-2', status: 'valid', expiryDate: '2026-12-01' }
    ],
    applicationDate: '2025-08-20',
    lastActivity: '2025-10-10',
    dropoutRisk: 8,
    complianceScore: 98
  },
  {
    id: 'cand-7',
    name: 'Muthoni Kariuki',
    email: 'muthoni.kariuki@email.com',
    phone: '+254 777 901234',
    role: 'Registered Nurse',
    specialties: ['Labor & Delivery', 'Postpartum'],
    status: 'credentialing',
    availability: '2 weeks',
    location: 'Thika, Kenya',
    yearsExperience: 9,
    credentials: [
      { ...mockCredentials[0], id: 'c7-1' },
      { ...mockCredentials[1], id: 'c7-2', status: 'valid', expiryDate: '2027-03-01' }
    ],
    applicationDate: '2025-10-08',
    lastActivity: '2025-10-15',
    dropoutRisk: 28,
    complianceScore: 85
  },
  {
    id: 'cand-8',
    name: 'Musyoka Kioko',
    email: 'musyoka.kioko@email.com',
    phone: '+254 788 012345',
    role: 'Licensed Practical Nurse',
    specialties: ['Geriatrics', 'Long-term Care'],
    status: 'screening',
    availability: '1 week',
    location: 'Machakos, Kenya',
    yearsExperience: 4,
    credentials: [
      { ...mockCredentials[0], id: 'c8-1', name: 'LPN License' },
      { ...mockCredentials[1], id: 'c8-2', status: 'expiring' }
    ],
    applicationDate: '2025-10-14',
    lastActivity: '2025-10-16',
    dropoutRisk: 42,
    complianceScore: 73
  },
  {
    id: 'cand-9',
    name: 'Atieno Ouma',
    email: 'atieno.ouma@email.com',
    phone: '+254 799 123456',
    role: 'Registered Nurse',
    specialties: ['Oncology', 'Chemotherapy'],
    status: 'ready',
    availability: 'Immediate',
    location: 'Kisii, Kenya',
    yearsExperience: 11,
    credentials: [
      { ...mockCredentials[0], id: 'c9-1' },
      { ...mockCredentials[1], id: 'c9-2', status: 'valid', expiryDate: '2027-05-01' }
    ],
    applicationDate: '2025-09-28',
    lastActivity: '2025-10-16',
    dropoutRisk: 12,
    complianceScore: 96
  },
  {
    id: 'cand-10',
    name: 'Abdirahman Hassan',
    email: 'abdirahman.hassan@email.com',
    phone: '+254 701 234567',
    role: 'Travel Nurse',
    specialties: ['Med-Surg', 'Telemetry'],
    status: 'compliance',
    availability: 'Flexible',
    location: 'Garissa, Kenya',
    yearsExperience: 5,
    credentials: [
      { ...mockCredentials[0], id: 'c10-1' },
      { ...mockCredentials[1], id: 'c10-2', status: 'valid', expiryDate: '2027-01-01' }
    ],
    applicationDate: '2025-10-10',
    lastActivity: '2025-10-16',
    dropoutRisk: 19,
    complianceScore: 90
  }
];

// Mock Clients
export const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'Kenyatta National Hospital',
    location: 'Nairobi, Kenya',
    type: 'Hospital',
    activeJobs: 8
  },
  {
    id: 'client-2',
    name: 'Aga Khan University Hospital',
    location: 'Nairobi, Kenya',
    type: 'Medical Center',
    activeJobs: 5
  },
  {
    id: 'client-3',
    name: 'Gertrude\'s Children\'s Hospital',
    location: 'Nairobi, Kenya',
    type: 'Long-term Care',
    activeJobs: 3
  },
  {
    id: 'client-4',
    name: 'Moi Teaching & Referral Hospital',
    location: 'Eldoret, Kenya',
    type: 'Health System',
    activeJobs: 12
  }
];

// Mock Job Requests
export const mockJobRequests: JobRequest[] = [
  {
    id: 'job-1',
    clientId: 'client-1',
    clientName: 'Kenyatta National Hospital',
    title: 'ICU Registered Nurse',
    role: 'Registered Nurse',
    requiredSpecialties: ['ICU', 'Critical Care'],
    location: 'Nairobi, Kenya',
    shiftType: 'Night Shift',
    startDate: '2025-11-01',
    duration: '13 weeks',
    status: 'in_progress',
    requiredCredentials: ['Nursing Council of Kenya Registration', 'BLS', 'ACLS'],
    matchedCandidates: 3,
    createdDate: '2025-09-25',
    urgency: 'high'
  },
  {
    id: 'job-2',
    clientId: 'client-2',
    clientName: 'Aga Khan University Hospital',
    title: 'Pediatric Nurse',
    role: 'Registered Nurse',
    requiredSpecialties: ['Pediatrics'],
    location: 'Nairobi, Kenya',
    shiftType: 'Day Shift',
    startDate: '2025-11-15',
    duration: '8 weeks',
    status: 'open',
    requiredCredentials: ['Nursing Council of Kenya Registration', 'BLS', 'PALS'],
    matchedCandidates: 2,
    createdDate: '2025-10-01',
    urgency: 'medium'
  },
  {
    id: 'job-3',
    clientId: 'client-3',
    clientName: 'Gertrude\'s Children\'s Hospital',
    title: 'Long-term Care LPN',
    role: 'Licensed Practical Nurse',
    requiredSpecialties: ['General Care'],
    location: 'Nairobi, Kenya',
    shiftType: 'Day Shift',
    startDate: '2025-10-25',
    duration: '6 months',
    status: 'open',
    requiredCredentials: ['LPN License', 'BLS'],
    matchedCandidates: 1,
    createdDate: '2025-10-05',
    urgency: 'critical'
  },
  {
    id: 'job-4',
    clientId: 'client-4',
    clientName: 'Moi Teaching & Referral Hospital',
    title: 'ER Travel Nurse',
    role: 'Travel Nurse',
    requiredSpecialties: ['ER', 'Trauma'],
    location: 'Eldoret, Kenya',
    shiftType: 'Rotating',
    startDate: '2025-11-10',
    duration: '13 weeks',
    status: 'in_progress',
    requiredCredentials: ['Nursing Council of Kenya Registration', 'BLS', 'ACLS', 'TNCC'],
    matchedCandidates: 2,
    createdDate: '2025-09-30',
    urgency: 'high'
  },
  {
    id: 'job-5',
    clientId: 'client-1',
    clientName: 'Kenyatta National Hospital',
    title: 'Surgery Unit RN',
    role: 'Registered Nurse',
    requiredSpecialties: ['Surgery', 'Post-Op Care'],
    location: 'Nairobi, Kenya',
    shiftType: 'Day Shift',
    startDate: '2025-10-20',
    duration: '12 weeks',
    status: 'filled',
    requiredCredentials: ['Nursing Council of Kenya Registration', 'BLS', 'ACLS'],
    matchedCandidates: 1,
    createdDate: '2025-09-10',
    urgency: 'low'
  }
];

// Mock Candidate Workflows
export const mockWorkflows: CandidateWorkflow[] = [
  {
    candidateId: 'cand-1',
    candidateName: 'Wanjiru Kamau',
    jobId: 'job-1',
    jobTitle: 'ICU Registered Nurse',
    stages: [
      { stage: 'Application Submitted', status: 'completed', completedDate: '2025-09-15', assignee: 'System' },
      { stage: 'Initial Screening', status: 'completed', completedDate: '2025-09-18', assignee: 'Grace Wambui' },
      { stage: 'Credential Verification', status: 'completed', completedDate: '2025-09-25', assignee: 'Peter Mwangi' },
      { stage: 'Compliance Check', status: 'completed', completedDate: '2025-10-02', assignee: 'Faith Akinyi' },
      { stage: 'Client Interview', status: 'completed', completedDate: '2025-10-08', assignee: 'Grace Wambui' },
      { stage: 'Offer Extended', status: 'completed', completedDate: '2025-10-10', assignee: 'Grace Wambui' },
      { stage: 'Onboarding', status: 'in_progress', assignee: 'HR Team' }
    ],
    currentStage: 'Onboarding',
    daysInProcess: 31
  },
  {
    candidateId: 'cand-2',
    candidateName: 'Otieno Odhiambo',
    jobId: 'job-2',
    jobTitle: 'Pediatric Nurse',
    stages: [
      { stage: 'Application Submitted', status: 'completed', completedDate: '2025-10-01', assignee: 'System' },
      { stage: 'Initial Screening', status: 'completed', completedDate: '2025-10-03', assignee: 'Grace Wambui' },
      { stage: 'Credential Verification', status: 'in_progress', assignee: 'Peter Mwangi', notes: 'Waiting on BLS renewal' },
      { stage: 'Compliance Check', status: 'pending' },
      { stage: 'Client Interview', status: 'pending' },
      { stage: 'Offer Extended', status: 'pending' },
      { stage: 'Onboarding', status: 'pending' }
    ],
    currentStage: 'Credential Verification',
    daysInProcess: 15
  },
  {
    candidateId: 'cand-3',
    candidateName: 'Njeri Mwangi',
    jobId: 'job-5',
    jobTitle: 'Surgery Unit RN',
    stages: [
      { stage: 'Application Submitted', status: 'completed', completedDate: '2025-09-20', assignee: 'System' },
      { stage: 'Initial Screening', status: 'completed', completedDate: '2025-09-23', assignee: 'Grace Wambui' },
      { stage: 'Credential Verification', status: 'blocked', notes: 'ACLS expired, TB test missing' },
      { stage: 'Compliance Check', status: 'pending' },
      { stage: 'Client Interview', status: 'pending' },
      { stage: 'Offer Extended', status: 'pending' },
      { stage: 'Onboarding', status: 'pending' }
    ],
    currentStage: 'Credential Verification',
    daysInProcess: 26
  },
  {
    candidateId: 'cand-4',
    candidateName: 'Kipchoge Mutai',
    jobId: 'job-4',
    jobTitle: 'ER Travel Nurse',
    stages: [
      { stage: 'Application Submitted', status: 'completed', completedDate: '2025-10-05', assignee: 'System' },
      { stage: 'Initial Screening', status: 'completed', completedDate: '2025-10-07', assignee: 'Grace Wambui' },
      { stage: 'Credential Verification', status: 'completed', completedDate: '2025-10-12', assignee: 'Peter Mwangi' },
      { stage: 'Compliance Check', status: 'in_progress', assignee: 'Faith Akinyi' },
      { stage: 'Client Interview', status: 'pending' },
      { stage: 'Offer Extended', status: 'pending' },
      { stage: 'Onboarding', status: 'pending' }
    ],
    currentStage: 'Compliance Check',
    daysInProcess: 11
  },
  {
    candidateId: 'cand-7',
    candidateName: 'Muthoni Kariuki',
    jobId: 'job-2',
    jobTitle: 'Pediatric Nurse',
    stages: [
      { stage: 'Application Submitted', status: 'completed', completedDate: '2025-10-08', assignee: 'System' },
      { stage: 'Initial Screening', status: 'completed', completedDate: '2025-10-10', assignee: 'Grace Wambui' },
      { stage: 'Credential Verification', status: 'in_progress', assignee: 'Peter Mwangi', notes: 'Pending PALS certification' },
      { stage: 'Compliance Check', status: 'pending' },
      { stage: 'Client Interview', status: 'pending' },
      { stage: 'Offer Extended', status: 'pending' },
      { stage: 'Onboarding', status: 'pending' }
    ],
    currentStage: 'Credential Verification',
    daysInProcess: 8
  },
  {
    candidateId: 'cand-8',
    candidateName: 'Musyoka Kioko',
    jobId: 'job-3',
    jobTitle: 'Long-term Care LPN',
    stages: [
      { stage: 'Application Submitted', status: 'completed', completedDate: '2025-10-14', assignee: 'System' },
      { stage: 'Initial Screening', status: 'blocked', assignee: 'Grace Wambui', notes: 'Missing employment verification documents' },
      { stage: 'Credential Verification', status: 'pending' },
      { stage: 'Compliance Check', status: 'pending' },
      { stage: 'Client Interview', status: 'pending' },
      { stage: 'Offer Extended', status: 'pending' },
      { stage: 'Onboarding', status: 'pending' }
    ],
    currentStage: 'Initial Screening',
    daysInProcess: 2
  },
  {
    candidateId: 'cand-9',
    candidateName: 'Atieno Ouma',
    jobId: 'job-1',
    jobTitle: 'ICU Registered Nurse',
    stages: [
      { stage: 'Application Submitted', status: 'completed', completedDate: '2025-09-28', assignee: 'System' },
      { stage: 'Initial Screening', status: 'completed', completedDate: '2025-09-30', assignee: 'Grace Wambui' },
      { stage: 'Credential Verification', status: 'completed', completedDate: '2025-10-05', assignee: 'Peter Mwangi' },
      { stage: 'Compliance Check', status: 'completed', completedDate: '2025-10-10', assignee: 'Faith Akinyi' },
      { stage: 'Client Interview', status: 'completed', completedDate: '2025-10-14', assignee: 'Grace Wambui' },
      { stage: 'Offer Extended', status: 'in_progress', assignee: 'Grace Wambui' },
      { stage: 'Onboarding', status: 'pending' }
    ],
    currentStage: 'Offer Extended',
    daysInProcess: 18
  },
  {
    candidateId: 'cand-10',
    candidateName: 'Abdirahman Hassan',
    jobId: 'job-4',
    jobTitle: 'ER Travel Nurse',
    stages: [
      { stage: 'Application Submitted', status: 'completed', completedDate: '2025-10-10', assignee: 'System' },
      { stage: 'Initial Screening', status: 'completed', completedDate: '2025-10-12', assignee: 'Grace Wambui' },
      { stage: 'Credential Verification', status: 'completed', completedDate: '2025-10-15', assignee: 'Peter Mwangi' },
      { stage: 'Compliance Check', status: 'in_progress', assignee: 'Faith Akinyi' },
      { stage: 'Client Interview', status: 'pending' },
      { stage: 'Offer Extended', status: 'pending' },
      { stage: 'Onboarding', status: 'pending' }
    ],
    currentStage: 'Compliance Check',
    daysInProcess: 6
  },
  {
    candidateId: 'cand-5',
    candidateName: 'Achieng Onyango',
    jobId: 'job-2',
    jobTitle: 'Pediatric Nurse',
    stages: [
      { stage: 'Application Submitted', status: 'completed', completedDate: '2025-10-12', assignee: 'System' },
      { stage: 'Initial Screening', status: 'in_progress', assignee: 'Grace Wambui' },
      { stage: 'Credential Verification', status: 'pending' },
      { stage: 'Compliance Check', status: 'pending' },
      { stage: 'Client Interview', status: 'pending' },
      { stage: 'Offer Extended', status: 'pending' },
      { stage: 'Onboarding', status: 'pending' }
    ],
    currentStage: 'Initial Screening',
    daysInProcess: 4
  },
  {
    candidateId: 'cand-3',
    candidateName: 'Njeri Mwangi',
    jobId: 'job-3',
    jobTitle: 'Long-term Care LPN',
    stages: [
      { stage: 'Application Submitted', status: 'completed', completedDate: '2025-09-22', assignee: 'System' },
      { stage: 'Initial Screening', status: 'completed', completedDate: '2025-09-25', assignee: 'Grace Wambui' },
      { stage: 'Credential Verification', status: 'blocked', assignee: 'Peter Mwangi', notes: 'Background check pending - awaiting response from previous employer' },
      { stage: 'Compliance Check', status: 'pending' },
      { stage: 'Client Interview', status: 'pending' },
      { stage: 'Offer Extended', status: 'pending' },
      { stage: 'Onboarding', status: 'pending' }
    ],
    currentStage: 'Credential Verification',
    daysInProcess: 24
  }
];

// KPI Data for Reports
export const mockKPIData = {
  averagePlacementTime: {
    current: 32,
    previous: 58,
    unit: 'days',
    change: -45
  },
  dropoutRate: {
    current: 18,
    previous: 34,
    unit: '%',
    change: -47
  },
  complianceRate: {
    current: 94,
    previous: 76,
    unit: '%',
    change: 24
  },
  timeToCredential: {
    current: 12,
    previous: 21,
    unit: 'days',
    change: -43
  },
  activeCandidates: {
    current: 124,
    previous: 98,
    unit: 'candidates',
    change: 27
  },
  placementsByMonth: [
    { month: 'Apr', placements: 12 },
    { month: 'May', placements: 15 },
    { month: 'Jun', placements: 18 },
    { month: 'Jul', placements: 22 },
    { month: 'Aug', placements: 25 },
    { month: 'Sep', placements: 28 },
    { month: 'Oct', placements: 31 }
  ],
  credentialStatusDistribution: [
    { status: 'Valid', count: 156 },
    { status: 'Expiring Soon', count: 23 },
    { status: 'Expired', count: 8 },
    { status: 'Missing', count: 12 }
  ],
  candidatesByStage: [
    { stage: 'Screening', count: 18 },
    { stage: 'Credentialing', count: 24 },
    { stage: 'Compliance', count: 15 },
    { stage: 'Ready', count: 42 },
    { stage: 'Placed', count: 25 }
  ],
  bottleneckAnalysis: [
    { category: 'Manual Documentation', delayDays: 5.2, affectedCases: 34, severity: 'high' },
    { category: 'License Verification', delayDays: 3.8, affectedCases: 28, severity: 'high' },
    { category: 'System Fragmentation', delayDays: 2.5, affectedCases: 45, severity: 'medium' },
    { category: 'Coordination Gaps', delayDays: 4.1, affectedCases: 22, severity: 'high' },
    { category: 'Regulatory Delays', delayDays: 6.3, affectedCases: 18, severity: 'critical' }
  ],
  candidateLossReasons: [
    { reason: 'Slow Credentialing Process', percentage: 35, count: 21 },
    { reason: 'Competitor Offer', percentage: 28, count: 17 },
    { reason: 'Availability Mismatch', percentage: 18, count: 11 },
    { reason: 'Rate Disagreement', percentage: 12, count: 7 },
    { reason: 'Other', percentage: 7, count: 4 }
  ],
  systemUsage: [
    { system: 'Indeed', usage: 92, efficiency: 78 },
    { system: 'JobDiva', usage: 85, efficiency: 71 },
    { system: 'VMS', usage: 88, efficiency: 65 },
    { system: 'Adobe Sign', usage: 95, efficiency: 89 },
    { system: 'Payroll System', usage: 76, efficiency: 82 }
  ],
  timeToFillByRole: [
    { role: 'ICU Nurse', avgDays: 28, demand: 'high' },
    { role: 'ER Nurse', avgDays: 32, demand: 'high' },
    { role: 'Med-Surg RN', avgDays: 25, demand: 'medium' },
    { role: 'Travel Nurse', avgDays: 35, demand: 'high' },
    { role: 'LPN', avgDays: 22, demand: 'medium' },
    { role: 'Nurse Practitioner', avgDays: 42, demand: 'low' }
  ]
};

// Predictive Alerts
export const mockAlerts = [
  {
    id: 'alert-1',
    type: 'dropout_risk',
    severity: 'high',
    candidateId: 'cand-3',
    candidateName: 'Njeri Mwangi',
    message: 'High dropout risk (72%) - No activity in 8 days, missing credentials',
    timestamp: '2025-10-16T10:30:00',
    actionable: true,
    suggestedAction: 'Follow up on credential renewal and schedule check-in call'
  },
  {
    id: 'alert-2',
    type: 'credential_expiry',
    severity: 'medium',
    candidateId: 'cand-2',
    candidateName: 'Otieno Odhiambo',
    message: 'BLS Certification expiring in 16 days',
    timestamp: '2025-10-16T09:15:00',
    actionable: true,
    suggestedAction: 'Send renewal reminder and verify completion'
  },
  {
    id: 'alert-3',
    type: 'delay_warning',
    severity: 'medium',
    candidateId: 'cand-4',
    candidateName: 'Kipchoge Mutai',
    message: 'Compliance check taking longer than average (11 days vs 8 day average)',
    timestamp: '2025-10-16T08:45:00',
    actionable: true,
    suggestedAction: 'Check with compliance team for status update'
  },
  {
    id: 'alert-4',
    type: 'dropout_risk',
    severity: 'medium',
    candidateId: 'cand-2',
    candidateName: 'Otieno Odhiambo',
    message: 'Moderate dropout risk (35%) - Credential verification pending',
    timestamp: '2025-10-15T16:20:00',
    actionable: true,
    suggestedAction: 'Expedite credential verification process'
  },
  {
    id: 'alert-5',
    type: 'job_match',
    severity: 'low',
    candidateId: 'cand-5',
    candidateName: 'Achieng Onyango',
    message: 'New candidate matches 2 open positions with 95% compatibility',
    timestamp: '2025-10-15T14:10:00',
    actionable: true,
    suggestedAction: 'Schedule screening call and present opportunities'
  }
];

// MODULE 1: Intelligent Credential Management Engine Data
export const mockCredentialAlerts: CredentialAlert[] = [
  {
    id: 'ca-1',
    credentialId: 'cred-2',
    candidateId: 'cand-2',
    candidateName: 'Otieno Odhiambo',
    credentialName: 'BLS Certification',
    alertType: '30_day',
    severity: 'high',
    message: 'BLS Certification expires in 16 days - SMS sent to candidate and recruiter',
    smsSent: true,
    smsTimestamp: '2025-10-16T06:00:00'
  },
  {
    id: 'ca-2',
    credentialId: 'cred-3',
    candidateId: 'cand-3',
    candidateName: 'Njeri Mwangi',
    credentialName: 'ACLS Certification',
    alertType: 'verification_failed',
    severity: 'critical',
    message: 'ACLS verification failed - credential expired. Alternative pathway triggered.',
    smsSent: true,
    smsTimestamp: '2025-10-15T14:30:00',
    alternativePathwayTriggered: true
  },
  {
    id: 'ca-3',
    credentialId: 'cred-1',
    candidateId: 'cand-7',
    candidateName: 'Muthoni Kariuki',
    credentialName: 'Nursing Council of Kenya Registration',
    alertType: '90_day',
    severity: 'low',
    message: 'License renewal due in 86 days - Early renewal reminder sent',
    smsSent: true,
    smsTimestamp: '2025-10-14T08:00:00'
  },
  {
    id: 'ca-4',
    credentialId: 'cred-portal',
    candidateId: 'cand-4',
    candidateName: 'Kipchoge Mutai',
    credentialName: 'Nursing Council Portal',
    alertType: 'portal_down',
    severity: 'critical',
    message: 'Nursing Council of Kenya portal offline for 6 hours - Alternative verification initiated',
    smsSent: true,
    smsTimestamp: '2025-10-16T11:45:00',
    alternativePathwayTriggered: true
  }
];

export const mockMicroCredentialingPipelines = [
  {
    candidateId: 'cand-1',
    candidateName: 'Wanjiru Kamau',
    stages: [
      { stageId: 'mc-1', stageName: 'Document Collection', status: 'completed' as const, parallelizable: false, estimatedMinutes: 15, completedAt: '2025-09-15T10:30:00' },
      { stageId: 'mc-2', stageName: 'License Verification (NCK)', status: 'completed' as const, parallelizable: true, estimatedMinutes: 45, completedAt: '2025-09-15T11:15:00' },
      { stageId: 'mc-3', stageName: 'BLS Verification', status: 'completed' as const, parallelizable: true, estimatedMinutes: 20, completedAt: '2025-09-15T11:10:00' },
      { stageId: 'mc-4', stageName: 'ACLS Verification', status: 'completed' as const, parallelizable: true, estimatedMinutes: 20, completedAt: '2025-09-15T11:12:00' },
      { stageId: 'mc-5', stageName: 'Background Check', status: 'completed' as const, parallelizable: true, estimatedMinutes: 120, completedAt: '2025-09-16T09:00:00' },
      { stageId: 'mc-6', stageName: 'Employment Verification', status: 'completed' as const, parallelizable: true, estimatedMinutes: 90, completedAt: '2025-09-16T10:30:00' },
      { stageId: 'mc-7', stageName: 'TB Screening', status: 'completed' as const, parallelizable: true, estimatedMinutes: 30, completedAt: '2025-09-15T14:00:00' },
      { stageId: 'mc-8', stageName: 'Final Compliance Review', status: 'completed' as const, parallelizable: false, estimatedMinutes: 25, completedAt: '2025-09-17T11:00:00' }
    ],
    totalEstimatedMinutes: 365,
    actualMinutes: 280,
    efficiency: 77
  },
  {
    candidateId: 'cand-3',
    candidateName: 'Njeri Mwangi',
    stages: [
      { stageId: 'mc-1', stageName: 'Document Collection', status: 'completed' as const, parallelizable: false, estimatedMinutes: 15, completedAt: '2025-09-20T09:00:00' },
      { stageId: 'mc-2', stageName: 'License Verification (NCK)', status: 'completed' as const, parallelizable: true, estimatedMinutes: 45, completedAt: '2025-09-20T10:00:00' },
      { stageId: 'mc-3', stageName: 'BLS Verification', status: 'completed' as const, parallelizable: true, estimatedMinutes: 20, completedAt: '2025-09-20T09:45:00' },
      { stageId: 'mc-4', stageName: 'ACLS Verification', status: 'failed' as const, parallelizable: true, estimatedMinutes: 20 },
      { stageId: 'mc-5', stageName: 'Background Check', status: 'in_progress' as const, parallelizable: true, estimatedMinutes: 120 },
      { stageId: 'mc-6', stageName: 'Employment Verification', status: 'in_progress' as const, parallelizable: true, estimatedMinutes: 90 },
      { stageId: 'mc-7', stageName: 'TB Screening', status: 'pending' as const, parallelizable: true, estimatedMinutes: 30 },
      { stageId: 'mc-8', stageName: 'Final Compliance Review', status: 'pending' as const, parallelizable: false, estimatedMinutes: 25 }
    ],
    totalEstimatedMinutes: 365,
    actualMinutes: 0,
    efficiency: 0
  }
];

export const mockBlockchainWallets: BlockchainCredentialWallet[] = [
  {
    candidateId: 'cand-1',
    candidateName: 'Wanjiru Kamau',
    walletAddress: '0x7f9c8e3a1d4b6f2a9c5e8d1b3a4f6c9e2d5a8b7c',
    verifiedCredentials: [
      {
        credentialId: 'cred-1',
        credentialName: 'Nursing Council of Kenya Registration',
        cryptographicSignature: 'sig_nck_wk_2025_a7f3e9d2',
        verifiedAt: '2025-09-15T10:30:00',
        issuer: 'Nursing Council of Kenya'
      },
      {
        credentialId: 'cred-2',
        credentialName: 'BLS Certification',
        cryptographicSignature: 'sig_bls_wk_2025_b8e4f1c3',
        verifiedAt: '2025-09-15T11:10:00',
        issuer: 'Kenya Red Cross Society'
      }
    ],
    sharedWith: [
      {
        facilityName: 'Kenyatta National Hospital',
        sharedAt: '2025-10-01T09:00:00',
        accessExpiry: '2026-01-01T00:00:00'
      },
      {
        facilityName: 'Aga Khan University Hospital',
        sharedAt: '2025-10-05T14:30:00',
        accessExpiry: '2025-12-31T23:59:59'
      }
    ]
  },
  {
    candidateId: 'cand-9',
    candidateName: 'Atieno Ouma',
    walletAddress: '0x3a8f7c2e9d1b5a4f6c8e2d9a1b7f3c5e8d2a6b9c',
    verifiedCredentials: [
      {
        credentialId: 'cred-1',
        credentialName: 'Nursing Council of Kenya Registration',
        cryptographicSignature: 'sig_nck_ao_2025_c9f5e2a4',
        verifiedAt: '2025-09-28T11:15:00',
        issuer: 'Nursing Council of Kenya'
      },
      {
        credentialId: 'cred-2',
        credentialName: 'BLS Certification',
        cryptographicSignature: 'sig_bls_ao_2025_d1g6f3b5',
        verifiedAt: '2025-09-28T11:45:00',
        issuer: 'Kenya Red Cross Society'
      },
      {
        credentialId: 'cred-onc',
        credentialName: 'Oncology Nursing Certification',
        cryptographicSignature: 'sig_onc_ao_2025_e2h7g4c6',
        verifiedAt: '2025-09-29T10:00:00',
        issuer: 'Kenya Oncology Nurses Association'
      }
    ],
    sharedWith: [
      {
        facilityName: 'Kenyatta National Hospital',
        sharedAt: '2025-10-10T10:00:00',
        accessExpiry: '2026-04-10T23:59:59'
      }
    ]
  }
];

// MODULE 2: Unified Workflow Command Center Data
export const mockSystemIntegrations: SystemIntegration[] = [
  {
    systemId: 'sys-1',
    systemName: 'Indeed',
    systemType: 'job_board',
    status: 'connected',
    lastSync: '2025-10-17T09:30:00',
    syncFrequency: 'Every 15 minutes',
    recordsProcessed: 2847,
    errorRate: 0.8
  },
  {
    systemId: 'sys-2',
    systemName: 'JobDiva',
    systemType: 'ats',
    status: 'connected',
    lastSync: '2025-10-17T09:25:00',
    syncFrequency: 'Real-time',
    recordsProcessed: 1923,
    errorRate: 1.2
  },
  {
    systemId: 'sys-3',
    systemName: 'Hospital VMS Portal',
    systemType: 'vms',
    status: 'connected',
    lastSync: '2025-10-17T09:28:00',
    syncFrequency: 'Every 30 minutes',
    recordsProcessed: 1456,
    errorRate: 2.3
  },
  {
    systemId: 'sys-4',
    systemName: 'Adobe Sign',
    systemType: 'signature',
    status: 'connected',
    lastSync: '2025-10-17T09:32:00',
    syncFrequency: 'Real-time',
    recordsProcessed: 892,
    errorRate: 0.5
  },
  {
    systemId: 'sys-5',
    systemName: 'Payroll System',
    systemType: 'payroll',
    status: 'degraded',
    lastSync: '2025-10-17T08:45:00',
    syncFrequency: 'Every hour',
    recordsProcessed: 645,
    errorRate: 5.7
  }
];

export const mockAutoSubmissionLogs: AutoSubmissionLog[] = [
  {
    logId: 'sub-1',
    candidateId: 'cand-1',
    candidateName: 'Wanjiru Kamau',
    facilityName: 'Kenyatta National Hospital',
    packetGenerated: true,
    vmsSubmitted: true,
    submittedAt: '2025-10-10T14:23:15',
    confirmationNumber: 'KNH-2025-10-001234',
    status: 'success'
  },
  {
    logId: 'sub-2',
    candidateId: 'cand-9',
    candidateName: 'Atieno Ouma',
    facilityName: 'Kenyatta National Hospital',
    packetGenerated: true,
    vmsSubmitted: true,
    submittedAt: '2025-10-14T11:45:32',
    confirmationNumber: 'KNH-2025-10-001298',
    status: 'success'
  },
  {
    logId: 'sub-3',
    candidateId: 'cand-4',
    candidateName: 'Kipchoge Mutai',
    facilityName: 'Moi Teaching & Referral Hospital',
    packetGenerated: true,
    vmsSubmitted: false,
    submittedAt: '2025-10-16T16:12:08',
    confirmationNumber: 'PENDING',
    status: 'pending'
  },
  {
    logId: 'sub-4',
    candidateId: 'cand-3',
    candidateName: 'Njeri Mwangi',
    facilityName: 'Gertrude\'s Children\'s Hospital',
    packetGenerated: false,
    vmsSubmitted: false,
    submittedAt: '2025-10-15T09:30:00',
    confirmationNumber: 'ERROR',
    status: 'failed'
  }
];

export const mockCredentialerWorkloads: CredentialerWorkload[] = [
  {
    credentialerId: 'cred-staff-1',
    credentialerName: 'Peter Mwangi',
    activeCases: 8,
    avgCaseComplexity: 6.5,
    specializations: ['RN License Verification', 'International Credentials', 'Travel Nurse Compliance'],
    availabilityScore: 78
  },
  {
    credentialerId: 'cred-staff-2',
    credentialerName: 'Faith Akinyi',
    activeCases: 5,
    avgCaseComplexity: 4.2,
    specializations: ['Compliance Checks', 'Background Verification', 'Health Screenings'],
    availabilityScore: 92
  },
  {
    credentialerId: 'cred-staff-3',
    credentialerName: 'James Omondi',
    activeCases: 12,
    avgCaseComplexity: 7.8,
    specializations: ['LPN Credentials', 'Certification Renewals', 'State Portal Issues'],
    availabilityScore: 45
  }
];

// MODULE 3: Predictive Placement Intelligence Data
export const mockShadowCandidates: ShadowCandidate[] = [
  {
    primaryCandidateId: 'cand-3',
    shadowCandidateId: 'cand-7',
    shadowCandidateName: 'Muthoni Kariuki',
    matchScore: 89,
    documentsPreStaged: true,
    activationReady: true,
    jobId: 'job-5',
    jobTitle: 'Surgery Unit RN'
  },
  {
    primaryCandidateId: 'cand-3',
    shadowCandidateId: 'cand-1',
    shadowCandidateName: 'Wanjiru Kamau',
    matchScore: 87,
    documentsPreStaged: true,
    activationReady: true,
    jobId: 'job-5',
    jobTitle: 'Surgery Unit RN'
  },
  {
    primaryCandidateId: 'cand-2',
    shadowCandidateId: 'cand-5',
    shadowCandidateName: 'Achieng Onyango',
    matchScore: 92,
    documentsPreStaged: true,
    activationReady: false,
    jobId: 'job-2',
    jobTitle: 'Pediatric Nurse'
  },
  {
    primaryCandidateId: 'cand-8',
    shadowCandidateId: 'cand-2',
    shadowCandidateName: 'Otieno Odhiambo',
    matchScore: 85,
    documentsPreStaged: true,
    activationReady: true,
    jobId: 'job-3',
    jobTitle: 'Long-term Care LPN'
  }
];

export const mockFlightRiskScores: FlightRiskScore[] = [
  {
    candidateId: 'cand-3',
    candidateName: 'Njeri Mwangi',
    riskScore: 72,
    behavioralFactors: {
      avgResponseTimeHours: 38,
      interviewPunctuality: 'fair',
      communicationGaps: 3,
      lastActivityDaysAgo: 8,
      commitmentIndicators: 2
    },
    recommendedAction: 'Immediate intervention - Schedule call within 24 hours, activate shadow candidate',
    autoBackupTriggered: true
  },
  {
    candidateId: 'cand-8',
    candidateName: 'Musyoka Kioko',
    riskScore: 42,
    behavioralFactors: {
      avgResponseTimeHours: 18,
      interviewPunctuality: 'good',
      communicationGaps: 2,
      lastActivityDaysAgo: 1,
      commitmentIndicators: 4
    },
    recommendedAction: 'Monitor closely - Missing documents may indicate disengagement',
    autoBackupTriggered: false
  },
  {
    candidateId: 'cand-2',
    candidateName: 'Otieno Odhiambo',
    riskScore: 35,
    behavioralFactors: {
      avgResponseTimeHours: 12,
      interviewPunctuality: 'excellent',
      communicationGaps: 1,
      lastActivityDaysAgo: 2,
      commitmentIndicators: 6
    },
    recommendedAction: 'Low risk - Expedite credential verification to maintain engagement',
    autoBackupTriggered: false
  },
  {
    candidateId: 'cand-1',
    candidateName: 'Wanjiru Kamau',
    riskScore: 15,
    behavioralFactors: {
      avgResponseTimeHours: 4,
      interviewPunctuality: 'excellent',
      communicationGaps: 0,
      lastActivityDaysAgo: 3,
      commitmentIndicators: 9
    },
    recommendedAction: 'Very low risk - Proceed with onboarding',
    autoBackupTriggered: false
  }
];

export const mockRateOptimizations: RateOptimization[] = [
  {
    jobId: 'job-1',
    jobTitle: 'ICU Registered Nurse',
    facilityName: 'Kenyatta National Hospital',
    marketData: {
      regionalAverage: 185000,
      competitorRates: [175000, 190000, 182000, 188000],
      demandIndex: 8.7
    },
    suggestedRate: 187500,
    confidence: 94,
    calculatedInMs: 2.3
  },
  {
    jobId: 'job-2',
    jobTitle: 'Pediatric Nurse',
    facilityName: 'Aga Khan University Hospital',
    marketData: {
      regionalAverage: 165000,
      competitorRates: [160000, 168000, 170000, 163000],
      demandIndex: 6.2
    },
    suggestedRate: 166500,
    confidence: 89,
    calculatedInMs: 1.8
  },
  {
    jobId: 'job-4',
    jobTitle: 'ER Travel Nurse',
    facilityName: 'Moi Teaching & Referral Hospital',
    marketData: {
      regionalAverage: 215000,
      competitorRates: [210000, 220000, 218000, 225000],
      demandIndex: 9.3
    },
    suggestedRate: 219000,
    confidence: 96,
    calculatedInMs: 2.1
  }
];

// MODULE 4: Communication & Compliance Hub Data
export const mockCommunicationChannels: CommunicationChannel[] = [
  {
    candidateId: 'cand-1',
    candidateName: 'Wanjiru Kamau',
    preferredChannel: 'email',
    channelActivity: {
      email: { sent: 24, opened: 23, replied: 22 },
      sms: { sent: 8, replied: 6 },
      whatsapp: { sent: 3, replied: 2 }
    },
    aiDetectedPreference: 'Email - 96% response rate, avg 3 hour response time',
    languagePreference: 'english'
  },
  {
    candidateId: 'cand-2',
    candidateName: 'Otieno Odhiambo',
    preferredChannel: 'whatsapp',
    channelActivity: {
      email: { sent: 15, opened: 12, replied: 8 },
      sms: { sent: 12, replied: 11 },
      whatsapp: { sent: 18, replied: 18 }
    },
    aiDetectedPreference: 'WhatsApp - 100% response rate, avg 45 minute response time',
    languagePreference: 'swahili'
  },
  {
    candidateId: 'cand-3',
    candidateName: 'Njeri Mwangi',
    preferredChannel: 'sms',
    channelActivity: {
      email: { sent: 18, opened: 10, replied: 4 },
      sms: { sent: 14, replied: 9 },
      whatsapp: { sent: 6, replied: 3 }
    },
    aiDetectedPreference: 'SMS - 64% response rate, inconsistent timing suggests disengagement',
    languagePreference: 'english'
  },
  {
    candidateId: 'cand-10',
    candidateName: 'Abdirahman Hassan',
    preferredChannel: 'whatsapp',
    channelActivity: {
      email: { sent: 12, opened: 11, replied: 10 },
      sms: { sent: 15, replied: 14 },
      whatsapp: { sent: 22, replied: 22 }
    },
    aiDetectedPreference: 'WhatsApp - 100% response rate, prefers Swahili/Arabic mix',
    languagePreference: 'arabic'
  }
];

export const mockGeoSmartOnboarding: GeoSmartOnboarding[] = [
  {
    candidateId: 'cand-1',
    candidateName: 'Wanjiru Kamau',
    facilityName: 'Kenyatta National Hospital',
    facilityAddress: 'Hospital Road, Upper Hill, Nairobi',
    startDate: '2025-11-01',
    firstDayInstructions: {
      departureTime: '05:30 AM',
      turnByTurnDirections: [
        'From Westlands Roundabout, take Waiyaki Way East',
        'Continue on Uhuru Highway for 6.2 km',
        'Turn right onto Kenyatta Avenue',
        'Turn left onto Hospital Road',
        'Destination: Staff Entrance B (right side)'
      ],
      transportationMode: 'Matatu Route 46 or Uber',
      estimatedDuration: '45 minutes (allow 60 min for traffic)',
      qrCheckInCode: 'QR-KNH-WK-20251101',
      emergencyContact: 'HR Desk: +254 20 272 6300'
    },
    smsSent: true,
    offlinePackageGenerated: true
  },
  {
    candidateId: 'cand-9',
    candidateName: 'Atieno Ouma',
    facilityName: 'Kenyatta National Hospital',
    facilityAddress: 'Hospital Road, Upper Hill, Nairobi',
    startDate: '2025-10-28',
    firstDayInstructions: {
      departureTime: '06:00 AM',
      turnByTurnDirections: [
        'From Kisii town center, take Kisii-Nairobi Highway (A104)',
        'Continue for 287 km to Nairobi',
        'In Nairobi, follow signs to Upper Hill',
        'Turn onto Hospital Road',
        'Destination: Staff Entrance B'
      ],
      transportationMode: 'Long-distance bus to Nairobi, then Uber',
      estimatedDuration: '6-7 hours total journey',
      qrCheckInCode: 'QR-KNH-AO-20251028',
      emergencyContact: 'HR Desk: +254 20 272 6300'
    },
    smsSent: true,
    offlinePackageGenerated: true
  },
  {
    candidateId: 'cand-4',
    candidateName: 'Kipchoge Mutai',
    facilityName: 'Moi Teaching & Referral Hospital',
    facilityAddress: 'Nandi Road, Eldoret',
    startDate: '2025-11-10',
    firstDayInstructions: {
      departureTime: '06:30 AM',
      turnByTurnDirections: [
        'From Eldoret town center, head west on Uganda Road',
        'Turn right onto Nandi Road',
        'Hospital complex on left after 2.5 km',
        'Destination: Main Staff Gate'
      ],
      transportationMode: 'Boda boda or walking',
      estimatedDuration: '20 minutes',
      qrCheckInCode: 'QR-MTRH-KM-20251110',
      emergencyContact: 'HR Office: +254 53 203 3471'
    },
    smsSent: false,
    offlinePackageGenerated: false
  }
];

// AI Document Parser - OCR + NLP Processing Logs
export const mockOCRProcessingLogs: OCRDocumentProcessing[] = [
  {
    processingId: 'ocr-1',
    candidateId: 'cand-1',
    candidateName: 'Wanjiru Kamau',
    documentType: 'license',
    fileName: 'NCK_License_WK_2025.pdf',
    uploadedAt: '2025-09-15T09:45:00',
    processingStatus: 'completed',
    extractedData: {
      credentialName: 'Nursing Council of Kenya Registration',
      licenseNumber: 'NCK/RN/2022/001567',
      issueDate: '2022-01-15',
      expiryDate: '2026-01-15',
      issuer: 'Nursing Council of Kenya',
      holderName: 'KAMAU, WANJIRU',
      confidence: 98
    },
    processingTimeMs: 1850,
    ocrEngine: 'Google Vision API',
    nlpConfidence: 96,
    manualReviewRequired: false
  },
  {
    processingId: 'ocr-2',
    candidateId: 'cand-2',
    candidateName: 'Otieno Odhiambo',
    documentType: 'bls',
    fileName: 'BLS_Certificate_OO_scan.jpg',
    uploadedAt: '2025-10-01T11:20:00',
    processingStatus: 'completed',
    extractedData: {
      credentialName: 'Basic Life Support (BLS) Certification',
      licenseNumber: 'BLS-KE-2023-4782',
      issueDate: '2023-06-01',
      expiryDate: '2025-11-01',
      issuer: 'Kenya Red Cross Society',
      holderName: 'Otieno Odhiambo',
      confidence: 94
    },
    processingTimeMs: 2340,
    ocrEngine: 'Azure Computer Vision',
    nlpConfidence: 92,
    manualReviewRequired: false
  },
  {
    processingId: 'ocr-3',
    candidateId: 'cand-3',
    candidateName: 'Njeri Mwangi',
    documentType: 'acls',
    fileName: 'ACLS_cert_njeri_photo.png',
    uploadedAt: '2025-09-20T14:15:00',
    processingStatus: 'review_needed',
    extractedData: {
      credentialName: 'Advanced Cardiac Life Support',
      licenseNumber: 'ACLS-22-8934',
      issueDate: '2022-03-10',
      expiryDate: '2024-03-10',
      issuer: 'Kenya Emergency Medical Services',
      holderName: 'MWANGI NJERI',
      confidence: 87
    },
    processingTimeMs: 3120,
    ocrEngine: 'Tesseract OCR',
    nlpConfidence: 85,
    manualReviewRequired: true,
    reviewNotes: 'Expiry date detected as past - please verify document authenticity and renewal status'
  },
  {
    processingId: 'ocr-4',
    candidateId: 'cand-5',
    candidateName: 'Achieng Onyango',
    documentType: 'certification',
    fileName: 'NP_License_AO_2025.pdf',
    uploadedAt: '2025-10-12T10:00:00',
    processingStatus: 'completed',
    extractedData: {
      credentialName: 'Nurse Practitioner License',
      licenseNumber: 'NCK/NP/2023/000892',
      issueDate: '2023-04-20',
      expiryDate: '2028-04-20',
      issuer: 'Nursing Council of Kenya',
      holderName: 'ONYANGO, ACHIENG',
      confidence: 99
    },
    processingTimeMs: 1650,
    ocrEngine: 'Google Vision API',
    nlpConfidence: 97,
    manualReviewRequired: false
  },
  {
    processingId: 'ocr-5',
    candidateId: 'cand-8',
    candidateName: 'Musyoka Kioko',
    documentType: 'tb_test',
    fileName: 'TB_test_results_MK.jpg',
    uploadedAt: '2025-10-14T15:30:00',
    processingStatus: 'processing',
    processingTimeMs: 0,
    ocrEngine: 'Azure Computer Vision',
    nlpConfidence: 0,
    manualReviewRequired: false
  },
  {
    processingId: 'ocr-6',
    candidateId: 'cand-4',
    candidateName: 'Kipchoge Mutai',
    documentType: 'acls',
    fileName: 'ACLS_certificate_damaged_scan.pdf',
    uploadedAt: '2025-10-05T13:45:00',
    processingStatus: 'failed',
    processingTimeMs: 4200,
    ocrEngine: 'Tesseract OCR',
    nlpConfidence: 42,
    manualReviewRequired: true,
    reviewNotes: 'Poor image quality - text confidence below 50%. Request candidate to re-upload higher quality scan or photo'
  }
];

// SECURITY ARCHITECTURE - Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    logId: 'audit-1',
    timestamp: '2025-10-17T09:23:15',
    userId: 'user-001',
    userName: 'Grace Wambui',
    userRole: 'recruiter',
    action: 'Downloaded credential document',
    resourceType: 'credential_document',
    resourceId: 'cred-1',
    resourceName: 'Wanjiru Kamau - NCK License',
    ipAddress: '197.248.12.45',
    mfaVerified: true,
    result: 'success',
    suspiciousActivity: false
  },
  {
    logId: 'audit-2',
    timestamp: '2025-10-17T08:45:22',
    userId: 'user-002',
    userName: 'Peter Mwangi',
    userRole: 'credentialer',
    action: 'Viewed credential verification status',
    resourceType: 'credential_document',
    resourceId: 'cred-3',
    resourceName: 'Njeri Mwangi - ACLS Certification',
    ipAddress: '41.90.23.178',
    mfaVerified: true,
    result: 'success',
    suspiciousActivity: false
  },
  {
    logId: 'audit-3',
    timestamp: '2025-10-17T07:12:08',
    userId: 'user-003',
    userName: 'Unknown User',
    userRole: 'recruiter',
    action: 'Attempted to access financial data',
    resourceType: 'financial_data',
    resourceId: 'payroll-001',
    resourceName: 'Payroll Records - October 2025',
    ipAddress: '102.165.88.234',
    mfaVerified: false,
    result: 'denied',
    suspiciousActivity: true,
    reason: 'Insufficient permissions - Recruiter role cannot access financial data'
  },
  {
    logId: 'audit-4',
    timestamp: '2025-10-17T06:34:19',
    userId: 'user-004',
    userName: 'Faith Akinyi',
    userRole: 'credentialer',
    action: 'Bulk download of 127 credential documents',
    resourceType: 'credential_document',
    resourceId: 'bulk-export-001',
    resourceName: 'October Compliance Report',
    ipAddress: '105.112.45.90',
    mfaVerified: true,
    result: 'success',
    suspiciousActivity: false
  },
  {
    logId: 'audit-5',
    timestamp: '2025-10-17T05:18:45',
    userId: 'user-005',
    userName: 'Suspicious Login Attempt',
    userRole: 'admin',
    action: 'Failed login attempt (5th consecutive)',
    resourceType: 'system_settings',
    resourceId: 'login-system',
    resourceName: 'Admin Portal',
    ipAddress: '185.220.101.67',
    mfaVerified: false,
    result: 'failed',
    suspiciousActivity: true,
    reason: 'Account locked after 5 failed attempts - potential brute force attack'
  },
  {
    logId: 'audit-6',
    timestamp: '2025-10-17T04:56:12',
    userId: 'user-006',
    userName: 'James Omondi',
    userRole: 'staffing_lead',
    action: 'Viewed compliance dashboard',
    resourceType: 'audit_logs',
    resourceId: 'dashboard-001',
    resourceName: 'October Compliance Metrics',
    ipAddress: '41.80.123.45',
    mfaVerified: true,
    result: 'success',
    suspiciousActivity: false
  },
  {
    logId: 'audit-7',
    timestamp: '2025-10-17T03:22:33',
    userId: 'user-007',
    userName: 'Wanjiru Kamau',
    userRole: 'candidate',
    action: 'Granted credential wallet access',
    resourceType: 'credential_document',
    resourceId: 'wallet-001',
    resourceName: 'Shared wallet with Kenyatta National Hospital',
    ipAddress: '197.254.78.12',
    mfaVerified: true,
    result: 'success',
    suspiciousActivity: false
  }
];

// SECURITY ARCHITECTURE - Encryption Status
export const mockEncryptionStatus: EncryptionStatus[] = [
  {
    category: 'Personal Identifiable Information (PII)',
    dataType: 'Names, DOB, Addresses, Phone Numbers, Email',
    encryptionAtRest: 'AES-256',
    encryptionInTransit: 'TLS 1.3',
    keyRotationDays: 90,
    lastRotation: '2025-09-18',
    nextRotation: '2025-12-17',
    status: 'compliant'
  },
  {
    category: 'Protected Health Information (PHI)',
    dataType: 'Medical Licenses, Health Screenings, Vaccination Records',
    encryptionAtRest: 'AES-256',
    encryptionInTransit: 'TLS 1.3',
    keyRotationDays: 90,
    lastRotation: '2025-09-18',
    nextRotation: '2025-12-17',
    status: 'compliant'
  },
  {
    category: 'Financial Data',
    dataType: 'Bank Account Numbers, Billing Rates, Payroll Information',
    encryptionAtRest: 'AES-256',
    encryptionInTransit: 'TLS 1.3',
    keyRotationDays: 90,
    lastRotation: '2025-09-18',
    nextRotation: '2025-12-17',
    status: 'compliant'
  },
  {
    category: 'Credential Documents',
    dataType: 'Scanned Licenses, Certifications, Government IDs (PDFs/Images)',
    encryptionAtRest: 'AES-256',
    encryptionInTransit: 'TLS 1.3',
    keyRotationDays: 90,
    lastRotation: '2025-09-18',
    nextRotation: '2025-12-17',
    status: 'compliant'
  },
  {
    category: 'Audit Logs',
    dataType: 'Access Logs, System Events, Security Incidents',
    encryptionAtRest: 'AES-256',
    encryptionInTransit: 'TLS 1.3',
    keyRotationDays: 90,
    lastRotation: '2025-09-18',
    nextRotation: '2025-12-17',
    status: 'compliant'
  },
  {
    category: 'Blockchain Credential Wallet',
    dataType: 'Cryptographic Signatures, Wallet Addresses, Shared Access Logs',
    encryptionAtRest: 'AES-256',
    encryptionInTransit: 'TLS 1.3',
    keyRotationDays: 90,
    lastRotation: '2025-09-18',
    nextRotation: '2025-12-17',
    status: 'compliant'
  }
];

// SECURITY ARCHITECTURE - Access Control (Role-Based Permissions)
export const mockAccessControl: AccessControl[] = [
  {
    roleId: 'role-1',
    roleName: 'Recruiter',
    permissions: [
      { category: 'Candidate Profiles', canView: true, canEdit: true, canDelete: false, canDownload: false, requiresMFA: false },
      { category: 'Job Matching', canView: true, canEdit: true, canDelete: false, canDownload: true, requiresMFA: false },
      { category: 'Offer Status', canView: true, canEdit: true, canDelete: false, canDownload: false, requiresMFA: false },
      { category: 'Communication History', canView: true, canEdit: true, canDelete: false, canDownload: false, requiresMFA: false },
      { category: 'Financial Data', canView: false, canEdit: false, canDelete: false, canDownload: false, requiresMFA: true },
      { category: 'Credential Documents', canView: true, canEdit: false, canDelete: false, canDownload: true, requiresMFA: true },
      { category: 'System Settings', canView: false, canEdit: false, canDelete: false, canDownload: false, requiresMFA: true }
    ],
    activeUsers: 12,
    lastReviewDate: '2025-09-01'
  },
  {
    roleId: 'role-2',
    roleName: 'Credentialer',
    permissions: [
      { category: 'Candidate Profiles', canView: true, canEdit: false, canDelete: false, canDownload: false, requiresMFA: false },
      { category: 'Credential Documents', canView: true, canEdit: true, canDelete: false, canDownload: true, requiresMFA: true },
      { category: 'Verification Status', canView: true, canEdit: true, canDelete: false, canDownload: false, requiresMFA: false },
      { category: 'Compliance Checklist', canView: true, canEdit: true, canDelete: false, canDownload: true, requiresMFA: false },
      { category: 'Financial Data', canView: false, canEdit: false, canDelete: false, canDownload: false, requiresMFA: true },
      { category: 'Recruiter Notes', canView: false, canEdit: false, canDelete: false, canDownload: false, requiresMFA: true },
      { category: 'System Settings', canView: false, canEdit: false, canDelete: false, canDownload: false, requiresMFA: true }
    ],
    activeUsers: 5,
    lastReviewDate: '2025-09-01'
  },
  {
    roleId: 'role-3',
    roleName: 'Staffing Lead',
    permissions: [
      { category: 'Dashboard Metrics', canView: true, canEdit: false, canDelete: false, canDownload: true, requiresMFA: false },
      { category: 'Compliance Reporting', canView: true, canEdit: false, canDelete: false, canDownload: true, requiresMFA: true },
      { category: 'Audit Logs', canView: true, canEdit: false, canDelete: false, canDownload: true, requiresMFA: true },
      { category: 'Candidate PII', canView: false, canEdit: false, canDelete: false, canDownload: false, requiresMFA: true },
      { category: 'Financial Data', canView: true, canEdit: false, canDelete: false, canDownload: true, requiresMFA: true },
      { category: 'System Settings', canView: true, canEdit: true, canDelete: false, canDownload: false, requiresMFA: true }
    ],
    activeUsers: 3,
    lastReviewDate: '2025-09-01'
  },
  {
    roleId: 'role-4',
    roleName: 'Candidate',
    permissions: [
      { category: 'Own Profile', canView: true, canEdit: true, canDelete: false, canDownload: true, requiresMFA: false },
      { category: 'Credential Wallet', canView: true, canEdit: true, canDelete: false, canDownload: true, requiresMFA: true },
      { category: 'Offer Status', canView: true, canEdit: false, canDelete: false, canDownload: false, requiresMFA: false },
      { category: 'Payment Details', canView: true, canEdit: true, canDelete: false, canDownload: false, requiresMFA: true },
      { category: 'Other Candidates', canView: false, canEdit: false, canDelete: false, canDownload: false, requiresMFA: true },
      { category: 'Recruiter Notes', canView: false, canEdit: false, canDelete: false, canDownload: false, requiresMFA: true }
    ],
    activeUsers: 124,
    lastReviewDate: '2025-09-01'
  },
  {
    roleId: 'role-5',
    roleName: 'Admin',
    permissions: [
      { category: 'All Data', canView: true, canEdit: true, canDelete: false, canDownload: true, requiresMFA: true },
      { category: 'System Settings', canView: true, canEdit: true, canDelete: false, canDownload: false, requiresMFA: true },
      { category: 'Audit Logs', canView: true, canEdit: false, canDelete: false, canDownload: true, requiresMFA: true },
      { category: 'User Management', canView: true, canEdit: true, canDelete: true, canDownload: false, requiresMFA: true }
    ],
    activeUsers: 2,
    lastReviewDate: '2025-09-01'
  }
];

// SECURITY ARCHITECTURE - Security Incidents
export const mockSecurityIncidents: SecurityIncident[] = [
  {
    incidentId: 'inc-1',
    timestamp: '2025-10-17T05:18:45',
    severity: 'high',
    type: 'brute_force',
    description: 'Multiple failed login attempts detected for admin account from suspicious IP address',
    affectedUsers: ['admin@staffflow.ai'],
    status: 'contained',
    actionTaken: 'Account locked after 5 failed attempts. IP address 185.220.101.67 added to blocklist. MFA re-authentication required.',
    resolvedAt: '2025-10-17T05:25:12'
  },
  {
    incidentId: 'inc-2',
    timestamp: '2025-10-16T14:32:18',
    severity: 'medium',
    type: 'suspicious_download',
    description: 'Credentialer attempted to download 500+ credential documents in 5 minutes',
    affectedUsers: ['peter.mwangi@staffflow.ai'],
    status: 'resolved',
    actionTaken: 'Investigated - user was generating monthly compliance report. Download pattern within acceptable limits for role. No malicious intent detected.',
    resolvedAt: '2025-10-16T15:45:00'
  },
  {
    incidentId: 'inc-3',
    timestamp: '2025-10-15T22:15:33',
    severity: 'critical',
    type: 'unauthorized_access',
    description: 'Recruiter attempted to access financial payroll data without proper authorization',
    affectedUsers: ['recruiter-external@staffingagency.com'],
    status: 'resolved',
    actionTaken: 'Access denied by role-based permission system. User account flagged for review. Security team notified. No data compromised.',
    resolvedAt: '2025-10-15T22:16:12'
  },
  {
    incidentId: 'inc-4',
    timestamp: '2025-10-14T11:08:22',
    severity: 'low',
    type: 'failed_mfa',
    description: 'Candidate failed MFA verification 3 consecutive times while accessing credential wallet',
    affectedUsers: ['wanjiru.kamau@email.com'],
    status: 'resolved',
    actionTaken: 'User contacted via registered phone number. MFA reset requested. Verified identity through alternative authentication method. Access restored.',
    resolvedAt: '2025-10-14T12:30:45'
  }
];

// SECURITY ARCHITECTURE - Compliance Metrics
export const mockComplianceMetrics: ComplianceMetric[] = [
  {
    standard: 'HIPAA',
    requirement: 'Encryption of PHI at rest and in transit (45 CFR § 164.312)',
    status: 'compliant',
    lastAuditDate: '2025-09-15',
    nextAuditDate: '2025-12-15',
    evidenceCount: 6,
    notes: 'All PHI encrypted with AES-256 at rest, TLS 1.3 in transit. Key rotation every 90 days.'
  },
  {
    standard: 'HIPAA',
    requirement: 'Access controls and user authentication (45 CFR § 164.312(a))',
    status: 'compliant',
    lastAuditDate: '2025-09-15',
    nextAuditDate: '2025-12-15',
    evidenceCount: 5,
    notes: 'Role-based access control implemented. MFA required for sensitive operations. Audit logs track all access.'
  },
  {
    standard: 'HIPAA',
    requirement: 'Audit controls and logging (45 CFR § 164.312(b))',
    status: 'compliant',
    lastAuditDate: '2025-09-15',
    nextAuditDate: '2025-12-15',
    evidenceCount: 7,
    notes: 'Comprehensive audit logging of all data access. Logs encrypted, immutable, and retained for 7 years.'
  },
  {
    standard: 'GDPR',
    requirement: 'Right to erasure (Article 17)',
    status: 'compliant',
    lastAuditDate: '2025-08-20',
    nextAuditDate: '2025-11-20',
    evidenceCount: 3,
    notes: 'Data deletion workflow implemented. Cryptographic shredding ensures data is unrecoverable. 30-day processing time.'
  },
  {
    standard: 'GDPR',
    requirement: 'Data breach notification within 72 hours (Article 33)',
    status: 'compliant',
    lastAuditDate: '2025-08-20',
    nextAuditDate: '2025-11-20',
    evidenceCount: 1,
    notes: 'Incident response protocol in place. Automated detection and notification system tested quarterly.'
  },
  {
    standard: 'Kenya Data Protection Act 2019',
    requirement: 'Data protection impact assessment (Section 31)',
    status: 'compliant',
    lastAuditDate: '2025-07-10',
    nextAuditDate: '2025-10-10',
    evidenceCount: 4,
    notes: 'DPIA conducted for all high-risk processing activities. Regular reviews scheduled quarterly.'
  },
  {
    standard: 'Kenya Data Protection Act 2019',
    requirement: 'Cross-border data transfer safeguards (Section 48)',
    status: 'compliant',
    lastAuditDate: '2025-07-10',
    nextAuditDate: '2025-10-10',
    evidenceCount: 2,
    notes: 'Data Processing Agreements (DPA) in place with all international partners. Standard Contractual Clauses (SCC) implemented.'
  },
  {
    standard: 'ISO 27001',
    requirement: 'Information security risk assessment (Clause 6.1.2)',
    status: 'compliant',
    lastAuditDate: '2025-06-05',
    nextAuditDate: '2025-12-05',
    evidenceCount: 8,
    notes: 'Annual risk assessment completed. All high and critical risks mitigated. Medium risks monitored.'
  },
  {
    standard: 'ISO 27001',
    requirement: 'Business continuity and disaster recovery (Clause A.17)',
    status: 'compliant',
    lastAuditDate: '2025-06-05',
    nextAuditDate: '2025-12-05',
    evidenceCount: 5,
    notes: 'Daily encrypted backups to separate geographic region. <24 hour recovery time objective (RTO). Tested monthly.'
  }
];
