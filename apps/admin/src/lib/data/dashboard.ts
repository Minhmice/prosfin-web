/**
 * Dashboard Mock Data Layer
 * 
 * Generates realistic mock data for dashboard metrics, time series, and breakdowns.
 * All data is deterministic based on date ranges for consistent testing.
 */

import { format, startOfDay, subDays, eachDayOfInterval, parseISO } from "date-fns";
import type { Lead, Campaign } from "@/types/admin";

export interface DateRange {
  from: Date;
  to: Date;
}

export interface DashboardKPIs {
  newLeads: number;
  qualifiedLeads: number;
  meetingsScheduled: number;
  won: number;
  cvrLeadToQualified: number; // %
  cvrQualifiedToMeeting: number; // %
}

export interface DailySeriesPoint {
  date: string; // ISO date string
  sessions: number;
  leads: number;
  qualified: number;
  meetings: number;
  won: number;
}

export interface ChannelBreakdown {
  channel: string;
  leads: number;
  qualified: number;
  meetings: number;
  won: number;
  cvr: number;
}

export interface CampaignPerformance {
  campaignId: string;
  campaignName: string;
  utm_campaign: string;
  channel: string;
  leads: number;
  qualified: number;
  cvr: number;
}

export interface LandingPathPerformance {
  path: string;
  sessions: number;
  leads: number;
  cvr: number;
}

export interface PipelineSnapshot {
  stage: string;
  count: number;
  percentage: number;
}

export interface ActivityEvent {
  id: string;
  type: "status_changed" | "converted" | "campaign_created" | "note_added";
  title: string;
  timestamp: string;
  actor?: string;
  metadata?: Record<string, any>;
}

export interface DashboardData {
  kpis: DashboardKPIs;
  kpisCompare?: DashboardKPIs;
  dailySeries: DailySeriesPoint[];
  dailySeriesCompare?: DailySeriesPoint[];
  channelBreakdown: ChannelBreakdown[];
  campaignPerformance: CampaignPerformance[];
  landingPathPerformance: LandingPathPerformance[];
  pipelineSnapshot: PipelineSnapshot[];
  recentActivity: ActivityEvent[];
  sparklineData: number[]; // Last 7 days for sparkline
}

// Deterministic random seed based on date
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate daily series with realistic trends
function generateDailySeries(range: DateRange, baseTrend: number = 1): DailySeriesPoint[] {
  const days = eachDayOfInterval({ start: range.from, end: range.to });
  const series: DailySeriesPoint[] = [];
  
  days.forEach((day, index) => {
    const seed = day.getTime();
    const dayOfWeek = day.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Weekend effect (lower traffic)
    const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.6 : 1.0;
    
    // Base values with trend
    const baseSessions = 150 + (index * baseTrend * 0.5);
    const sessions = Math.round(baseSessions * weekendFactor * (0.8 + seededRandom(seed) * 0.4));
    
    // Conversion rates
    const sessionToLeadRate = 0.15 + seededRandom(seed + 1) * 0.1; // 15-25%
    const leadToQualifiedRate = 0.3 + seededRandom(seed + 2) * 0.2; // 30-50%
    const qualifiedToMeetingRate = 0.4 + seededRandom(seed + 3) * 0.2; // 40-60%
    const meetingToWonRate = 0.5 + seededRandom(seed + 4) * 0.3; // 50-80%
    
    const leads = Math.round(sessions * sessionToLeadRate);
    const qualified = Math.round(leads * leadToQualifiedRate);
    const meetings = Math.round(qualified * qualifiedToMeetingRate);
    const won = Math.round(meetings * meetingToWonRate);
    
    series.push({
      date: format(day, "yyyy-MM-dd"),
      sessions,
      leads,
      qualified,
      meetings,
      won,
    });
  });
  
  return series;
}

// Generate channel breakdown
function generateChannelBreakdown(series: DailySeriesPoint[]): ChannelBreakdown[] {
  const channels = ["Facebook", "Google", "LinkedIn", "Direct", "Email", "TikTok"];
  const breakdown: ChannelBreakdown[] = [];
  
  channels.forEach((channel, index) => {
    const seed = channel.charCodeAt(0) * 1000;
    const share = [0.25, 0.20, 0.15, 0.15, 0.15, 0.10][index]; // Distribution
    
    const totalLeads = series.reduce((sum, d) => sum + d.leads, 0);
    const leads = Math.round(totalLeads * share * (0.9 + seededRandom(seed) * 0.2));
    
    const qualifiedRate = 0.3 + seededRandom(seed + 1) * 0.2;
    const meetingRate = 0.4 + seededRandom(seed + 2) * 0.2;
    const wonRate = 0.5 + seededRandom(seed + 3) * 0.3;
    
    const qualified = Math.round(leads * qualifiedRate);
    const meetings = Math.round(qualified * meetingRate);
    const won = Math.round(meetings * wonRate);
    const cvr = leads > 0 ? (won / leads) * 100 : 0;
    
    breakdown.push({
      channel,
      leads,
      qualified,
      meetings,
      won,
      cvr: Math.round(cvr * 10) / 10,
    });
  });
  
  return breakdown.sort((a, b) => b.leads - a.leads);
}

// Generate campaign performance
function generateCampaignPerformance(series: DailySeriesPoint[]): CampaignPerformance[] {
  const campaigns = [
    { name: "Summer 2024 Campaign", utm: "summer-2024", channel: "Facebook" },
    { name: "Facebook Q1 2024", utm: "fb-q1-2024", channel: "Facebook" },
    { name: "LinkedIn B2B", utm: "linkedin-b2b", channel: "LinkedIn" },
    { name: "Google Ads Audit", utm: "google-audit", channel: "Google" },
    { name: "Email Newsletter", utm: "newsletter-jan", channel: "Email" },
  ];
  
  const totalLeads = series.reduce((sum, d) => sum + d.leads, 0);
  
  return campaigns.map((campaign, index) => {
    const seed = campaign.utm.charCodeAt(0) * 1000;
    const share = [0.3, 0.25, 0.2, 0.15, 0.1][index];
    
    const leads = Math.round(totalLeads * share * (0.9 + seededRandom(seed) * 0.2));
    const qualified = Math.round(leads * (0.35 + seededRandom(seed + 1) * 0.15));
    const cvr = leads > 0 ? (qualified / leads) * 100 : 0;
    
    return {
      campaignId: `campaign-${index + 1}`,
      campaignName: campaign.name,
      utm_campaign: campaign.utm,
      channel: campaign.channel,
      leads,
      qualified,
      cvr: Math.round(cvr * 10) / 10,
    };
  }).sort((a, b) => b.leads - a.leads);
}

// Generate landing path performance
function generateLandingPathPerformance(series: DailySeriesPoint[]): LandingPathPerformance[] {
  const paths = [
    { path: "/", sessions: 0.4 },
    { path: "/services", sessions: 0.25 },
    { path: "/contact", sessions: 0.15 },
    { path: "/about", sessions: 0.1 },
    { path: "/insights", sessions: 0.1 },
  ];
  
  const totalSessions = series.reduce((sum, d) => sum + d.sessions, 0);
  
  return paths.map((p) => {
    const seed = p.path.charCodeAt(0) * 1000;
    const sessions = Math.round(totalSessions * p.sessions * (0.9 + seededRandom(seed) * 0.2));
    const leadRate = 0.15 + seededRandom(seed + 1) * 0.1;
    const leads = Math.round(sessions * leadRate);
    const cvr = sessions > 0 ? (leads / sessions) * 100 : 0;
    
    return {
      path: p.path,
      sessions,
      leads,
      cvr: Math.round(cvr * 10) / 10,
    };
  }).sort((a, b) => b.sessions - a.sessions);
}

// Generate pipeline snapshot
function generatePipelineSnapshot(series: DailySeriesPoint[]): PipelineSnapshot[] {
  const total = series.reduce((sum, d) => sum + d.leads, 0);
  const qualified = series.reduce((sum, d) => sum + d.qualified, 0);
  const meetings = series.reduce((sum, d) => sum + d.meetings, 0);
  const won = series.reduce((sum, d) => sum + d.won, 0);
  
  const newLeads = total - qualified;
  
  return [
    { stage: "New", count: newLeads, percentage: total > 0 ? (newLeads / total) * 100 : 0 },
    { stage: "Qualified", count: qualified, percentage: total > 0 ? (qualified / total) * 100 : 0 },
    { stage: "Meeting Scheduled", count: meetings, percentage: total > 0 ? (meetings / total) * 100 : 0 },
    { stage: "Won", count: won, percentage: total > 0 ? (won / total) * 100 : 0 },
  ];
}

// Generate recent activity
function generateRecentActivity(range: DateRange): ActivityEvent[] {
  const events: ActivityEvent[] = [];
  const days = eachDayOfInterval({ start: range.from, end: range.to });
  
  days.forEach((day, dayIndex) => {
    const seed = day.getTime();
    const eventCount = Math.floor(2 + seededRandom(seed) * 3); // 2-5 events per day
    
    for (let i = 0; i < eventCount; i++) {
      const eventSeed = seed + i * 1000;
      const types: ActivityEvent["type"][] = ["status_changed", "converted", "campaign_created", "note_added"];
      const type = types[Math.floor(seededRandom(eventSeed) * types.length)];
      
      const hour = Math.floor(seededRandom(eventSeed + 1) * 24);
      const minute = Math.floor(seededRandom(eventSeed + 2) * 60);
      const timestamp = new Date(day);
      timestamp.setHours(hour, minute);
      
      const actors = ["You", "Admin", "Editor A", "System"];
      const actor = actors[Math.floor(seededRandom(eventSeed + 3) * actors.length)];
      
      let title = "";
      if (type === "status_changed") {
        title = "Lead status changed";
      } else if (type === "converted") {
        title = "Lead converted to client";
      } else if (type === "campaign_created") {
        title = "New campaign created";
      } else {
        title = "Note added to lead";
      }
      
      events.push({
        id: `event-${dayIndex}-${i}`,
        type,
        title,
        timestamp: timestamp.toISOString(),
        actor: type === "campaign_created" ? actor : undefined,
      });
    }
  });
  
  return events.sort((a, b) => parseISO(b.timestamp).getTime() - parseISO(a.timestamp).getTime()).slice(0, 20);
}

// Calculate KPIs from series
function calculateKPIs(series: DailySeriesPoint[]): DashboardKPIs {
  const newLeads = series.reduce((sum, d) => sum + d.leads, 0);
  const qualified = series.reduce((sum, d) => sum + d.qualified, 0);
  const meetings = series.reduce((sum, d) => sum + d.meetings, 0);
  const won = series.reduce((sum, d) => sum + d.won, 0);
  
  const cvrLeadToQualified = newLeads > 0 ? (qualified / newLeads) * 100 : 0;
  const cvrQualifiedToMeeting = qualified > 0 ? (meetings / qualified) * 100 : 0;
  
  return {
    newLeads,
    qualifiedLeads: qualified,
    meetingsScheduled: meetings,
    won,
    cvrLeadToQualified: Math.round(cvrLeadToQualified * 10) / 10,
    cvrQualifiedToMeeting: Math.round(cvrQualifiedToMeeting * 10) / 10,
  };
}

// Main function to get dashboard data
export async function getDashboardData(
  dateRange: DateRange,
  compareRange?: DateRange
): Promise<DashboardData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  // Generate current period data
  const dailySeries = generateDailySeries(dateRange, 1.0);
  const kpis = calculateKPIs(dailySeries);
  
  // Generate compare period data if provided
  let dailySeriesCompare: DailySeriesPoint[] | undefined;
  let kpisCompare: DashboardKPIs | undefined;
  
  if (compareRange) {
    dailySeriesCompare = generateDailySeries(compareRange, 0.95); // Slightly lower trend
    kpisCompare = calculateKPIs(dailySeriesCompare);
  }
  
  // Generate breakdowns
  const channelBreakdown = generateChannelBreakdown(dailySeries);
  const campaignPerformance = generateCampaignPerformance(dailySeries);
  const landingPathPerformance = generateLandingPathPerformance(dailySeries);
  const pipelineSnapshot = generatePipelineSnapshot(dailySeries);
  const recentActivity = generateRecentActivity(dateRange);
  
  // Generate sparkline data (last 7 days)
  const sparklineDays = Math.min(7, dailySeries.length);
  const sparklineData = dailySeries.slice(-sparklineDays).map((d) => d.leads);
  
  return {
    kpis,
    kpisCompare,
    dailySeries,
    dailySeriesCompare,
    channelBreakdown,
    campaignPerformance,
    landingPathPerformance,
    pipelineSnapshot,
    recentActivity,
    sparklineData,
  };
}

// Helper to calculate delta
export function calculateDelta(current: number, previous: number): {
  absolute: number;
  percent: number | null;
  isPositive: boolean;
} {
  const absolute = current - previous;
  const percent = previous !== 0 ? (absolute / previous) * 100 : null;
  const isPositive = absolute >= 0;
  
  return {
    absolute: Math.round(absolute),
    percent: percent !== null ? Math.round(percent * 10) / 10 : null,
    isPositive,
  };
}

