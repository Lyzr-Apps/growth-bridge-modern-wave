'use client'

import { useState } from 'react'
import { callAIAgent, uploadFiles } from '@/lib/aiAgent'
import { copyToClipboard } from '@/lib/clipboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import {
  Loader2,
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Copy,
  Send,
  TrendingUp,
  Target,
  Award,
  Lightbulb,
  BarChart3,
  Users,
  MessageSquare
} from 'lucide-react'

// Agent IDs
const AGENT_IDS = {
  CV_ANALYSIS: '69858230a051b79c1135a076',
  CONTENT_GENERATOR: '6985825d382ef8715224cf07',
  QUALITY_ASSURANCE: '698582830ee88347863f0706',
  GROWTH_MANAGER: '698582abb90162af337b1dfd',
}

// TypeScript Interfaces from actual test responses
interface CVAnalysisResult {
  analysis_summary: string
  gap_analysis: {
    skills_missing: string[]
    experience_gaps: string[]
    keyword_opportunities: string[]
    section_improvements: Array<{
      section: string
      recommendation: string
      priority: string
    }>
  }
  optimization_score: string
  top_recommendations: Array<{
    action: string
    impact: string
    reason: string
  }>
}

interface ContentVariation {
  version: string
  post_content: string
  keywords: string[]
  hashtags: string[]
  hook: string
  word_count: number
  estimated_engagement: string
}

interface ContentGeneratorResult {
  content_category: string
  variations: ContentVariation[]
  content_tips: string[]
}

interface QualityAssuranceResult {
  approval_status: string
  overall_score: string
  quality_scores: {
    content_quality: string
    seo_optimization: string
    engagement_potential: string
    brand_consistency: string
  }
  passed_checks: string[]
  failed_checks: string[]
  issues_found: Array<{
    category: string
    severity: string
    issue: string
    recommendation: string
  }>
  revision_recommendations: string[]
  strengths: string[]
  approval_notes: string
}

interface GrowthManagerResult {
  request_type: string
  workflow_summary: string
  agents_engaged: string[]
  aggregated_results: {
    cv_analysis?: any
    content_generated?: any
    quality_review?: any
  }
  recommendations: string[]
  next_steps: string[]
  overall_assessment: string
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-blue-200 bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">LinkedIn Growth & Career Agent</h1>
              <p className="text-blue-600">AI-powered career optimization and content creation platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-blue-50 border border-blue-200">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cv-analysis">CV Analysis</TabsTrigger>
            <TabsTrigger value="content">Content Generator</TabsTrigger>
            <TabsTrigger value="qa">Quality Check</TabsTrigger>
            <TabsTrigger value="complete">Full Optimization</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-white border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Welcome to Your LinkedIn Growth Platform</CardTitle>
                <CardDescription className="text-blue-600">
                  Leverage AI to optimize your LinkedIn presence, create engaging content, and accelerate your career growth
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* CV Analysis Card */}
              <Card
                className="bg-blue-50 border-blue-300 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setActiveTab('cv-analysis')}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-gray-900">CV Analysis</CardTitle>
                  </div>
                  <CardDescription className="text-blue-700">
                    Compare your CV against your LinkedIn profile to identify gaps and optimization opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      Identify missing skills and experience
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      Discover keyword opportunities
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      Get optimization score and recommendations
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Content Generator Card */}
              <Card
                className="bg-blue-50 border-blue-300 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setActiveTab('content')}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Sparkles className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-gray-900">Content Generator</CardTitle>
                  </div>
                  <CardDescription className="text-blue-700">
                    Create engaging LinkedIn posts with AI - get 3 variations in different tones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      Professional, casual, and data-driven tones
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      Optimized hashtags and keywords
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      Engagement estimates and content tips
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Quality Assurance Card */}
              <Card
                className="bg-blue-50 border-blue-300 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setActiveTab('qa')}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CheckCircle2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-gray-900">Quality Assurance</CardTitle>
                  </div>
                  <CardDescription className="text-blue-700">
                    Review and validate your content for quality, SEO, and engagement potential
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      Content quality scoring
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      SEO and engagement analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      Detailed revision recommendations
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Complete Optimization Card */}
              <Card
                className="bg-blue-50 border-blue-300 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setActiveTab('complete')}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Award className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-gray-900">Complete Optimization</CardTitle>
                  </div>
                  <CardDescription className="text-blue-700">
                    Full workflow using the growth manager agent to coordinate all optimization tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      Automated multi-agent workflows
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      Coordinated analysis and content creation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      Strategic recommendations and next steps
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* CV Analysis Tab */}
          <TabsContent value="cv-analysis">
            <CVAnalysisSection />
          </TabsContent>

          {/* Content Generator Tab */}
          <TabsContent value="content">
            <ContentGeneratorSection />
          </TabsContent>

          {/* Quality Assurance Tab */}
          <TabsContent value="qa">
            <QualityAssuranceSection />
          </TabsContent>

          {/* Complete Optimization Tab */}
          <TabsContent value="complete">
            <CompleteOptimizationSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// CV Analysis Component
function CVAnalysisSection() {
  const [cvFile, setCVFile] = useState<File | null>(null)
  const [linkedinProfile, setLinkedinProfile] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CVAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCVFile(e.target.files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!linkedinProfile.trim()) {
      setError('Please provide LinkedIn profile information')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      let message = `Analyze this LinkedIn profile information: ${linkedinProfile}`

      // Upload CV file if provided
      if (cvFile) {
        const uploadResult = await uploadFiles(cvFile)
        if (uploadResult.success && uploadResult.asset_ids.length > 0) {
          const response = await callAIAgent(
            message,
            AGENT_IDS.CV_ANALYSIS,
            { assets: uploadResult.asset_ids }
          )

          if (response.success && response.response.status === 'success') {
            setResult(response.response.result as CVAnalysisResult)
          } else {
            setError(response.response.message || 'Analysis failed')
          }
        } else {
          setError('Failed to upload CV file')
        }
      } else {
        const response = await callAIAgent(message, AGENT_IDS.CV_ANALYSIS)

        if (response.success && response.response.status === 'success') {
          setResult(response.response.result as CVAnalysisResult)
        } else {
          setError(response.response.message || 'Analysis failed')
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white border-blue-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            CV & LinkedIn Profile Analysis
          </CardTitle>
          <CardDescription className="text-blue-600">
            Upload your CV and provide LinkedIn profile details to identify gaps and optimization opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload CV (Optional)
            </label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                className="bg-white border-blue-300 text-gray-900"
              />
              {cvFile && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-300">
                  {cvFile.name}
                </Badge>
              )}
            </div>
          </div>

          {/* LinkedIn Profile Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn Profile Information
            </label>
            <Textarea
              placeholder="Paste your LinkedIn profile information, experience, skills, education... Or describe what's currently on your profile and what's in your CV."
              value={linkedinProfile}
              onChange={(e) => setLinkedinProfile(e.target.value)}
              rows={6}
              className="bg-white border-blue-300 text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Analyze Button */}
          <Button
            onClick={handleAnalyze}
            disabled={loading || !linkedinProfile.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-gray-900"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Target className="mr-2 h-4 w-4" />
                Analyze CV & Profile
              </>
            )}
          </Button>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Summary & Score */}
          <Card className="bg-white border-blue-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{result.analysis_summary}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Optimization Score</span>
                  <span className="text-2xl font-bold text-blue-600">{result.optimization_score}%</span>
                </div>
                <Progress value={parseInt(result.optimization_score)} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Gap Analysis */}
          <Card className="bg-white border-blue-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Missing Skills */}
              {result.gap_analysis.skills_missing.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    Missing Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.gap_analysis.skills_missing.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="border-blue-300 text-blue-600">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Gaps */}
              {result.gap_analysis.experience_gaps.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-blue-600" />
                    Experience Gaps
                  </h4>
                  <ul className="space-y-1">
                    {result.gap_analysis.experience_gaps.map((gap, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        {gap}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Keyword Opportunities */}
              {result.gap_analysis.keyword_opportunities.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-blue-600" />
                    Keyword Opportunities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.gap_analysis.keyword_opportunities.map((keyword, idx) => (
                      <Badge key={idx} className="bg-blue-100 text-blue-700 border-blue-300">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Section Improvements */}
              {result.gap_analysis.section_improvements.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Section Improvements</h4>
                  <div className="space-y-3">
                    {result.gap_analysis.section_improvements.map((item, idx) => (
                      <div key={idx} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-blue-300">{item.section}</span>
                          <Badge
                            variant={item.priority === 'high' ? 'destructive' : 'secondary'}
                            className={item.priority === 'high' ? 'bg-blue-100 text-blue-700' : ''}
                          >
                            {item.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{item.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Recommendations */}
          <Card className="bg-white border-blue-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Top Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.top_recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Badge
                          variant={rec.impact === 'high' ? 'destructive' : 'secondary'}
                          className={rec.impact === 'high' ? 'bg-blue-100 text-blue-700' : ''}
                        >
                          {rec.impact} impact
                        </Badge>
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="font-medium text-gray-700">{rec.action}</p>
                        <p className="text-sm text-blue-100/70">{rec.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Content Generator Component
function ContentGeneratorSection() {
  const [category, setCategory] = useState('milestone')
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ContentGeneratorResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      setError('Please provide content details')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const message = `Create a ${category} LinkedIn post: ${userInput}`
      const response = await callAIAgent(message, AGENT_IDS.CONTENT_GENERATOR)

      if (response.success && response.response.status === 'success') {
        setResult(response.response.result as ContentGeneratorResult)
      } else {
        setError(response.response.message || 'Content generation failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (content: string, index: number) => {
    const success = await copyToClipboard(content)
    if (success) {
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white border-blue-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            LinkedIn Content Generator
          </CardTitle>
          <CardDescription className="text-blue-600">
            Create engaging LinkedIn posts with AI - get 3 variations optimized for different tones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Category Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Category
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['milestone', 'thought leadership', 'engagement'].map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? 'default' : 'outline'}
                  onClick={() => setCategory(cat)}
                  className={category === cat
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'border-blue-300 text-blue-600 hover:bg-blue-50'
                  }
                >
                  {cat === 'milestone' && <Award className="mr-2 h-4 w-4" />}
                  {cat === 'thought leadership' && <Lightbulb className="mr-2 h-4 w-4" />}
                  {cat === 'engagement' && <MessageSquare className="mr-2 h-4 w-4" />}
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Details
            </label>
            <Textarea
              placeholder="Describe what you want to post about... Share your achievement, insight, or topic for discussion."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={5}
              className="bg-white border-blue-300 text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={loading || !userInput.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate LinkedIn Posts
              </>
            )}
          </Button>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Results - Content Variations */}
      {result && (
        <div className="space-y-6">
          {/* Content Tips */}
          {result.content_tips && result.content_tips.length > 0 && (
            <Alert className="bg-blue-50 border-blue-300">
              <Lightbulb className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-gray-700">
                <strong>Tips:</strong> {result.content_tips.join(' • ')}
              </AlertDescription>
            </Alert>
          )}

          {/* Variations */}
          <div className="grid gap-6">
            {result.variations.map((variation, idx) => (
              <Card key={idx} className="bg-white border-blue-200 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 text-lg">{variation.version}</CardTitle>
                    <Badge className="bg-blue-100 text-blue-600">
                      {variation.estimated_engagement} engagement
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Post Content */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-blue-100 whitespace-pre-wrap">{variation.post_content}</p>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-600 font-medium">Keywords:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {variation.keywords.map((keyword, kidx) => (
                          <Badge key={kidx} variant="outline" className="border-blue-300 text-blue-600 text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Hashtags:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {variation.hashtags.map((tag, tidx) => (
                          <Badge key={tidx} className="bg-blue-100 text-blue-600 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-blue-200" />

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleCopy(variation.post_content, idx)}
                      variant="outline"
                      className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Post
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send to QA
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Quality Assurance Component
function QualityAssuranceSection() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<QualityAssuranceResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!content.trim()) {
      setError('Please provide content to review')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const message = `Review this LinkedIn post: ${content}`
      const response = await callAIAgent(message, AGENT_IDS.QUALITY_ASSURANCE)

      if (response.success && response.response.status === 'success') {
        setResult(response.response.result as QualityAssuranceResult)
      } else {
        setError(response.response.message || 'Quality check failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-blue-100 text-blue-600 border-blue-300'
      case 'needs revision': return 'bg-blue-100 text-blue-600 border-blue-300'
      case 'rejected': return 'bg-blue-100 text-blue-700 border-blue-300'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-700/50'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white border-blue-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-blue-600" />
            Quality Assurance & Content Review
          </CardTitle>
          <CardDescription className="text-blue-600">
            Analyze your LinkedIn content for quality, SEO optimization, and engagement potential
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn Post Content
            </label>
            <Textarea
              placeholder="Paste your LinkedIn post content here for quality review..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="bg-white border-blue-300 text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Analyze Button */}
          <Button
            onClick={handleAnalyze}
            disabled={loading || !content.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Content...
              </>
            ) : (
              <>
                <BarChart3 className="mr-2 h-4 w-4" />
                Analyze Content Quality
              </>
            )}
          </Button>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Status & Overall Score */}
          <Card className="bg-white border-blue-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">Quality Assessment</CardTitle>
                <Badge className={getStatusColor(result.approval_status)}>
                  {result.approval_status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Overall Score</span>
                  <span className="text-2xl font-bold text-blue-600">{result.overall_score}%</span>
                </div>
                <Progress value={parseInt(result.overall_score)} className="h-3" />
              </div>

              {/* Quality Scores Breakdown */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Content Quality</span>
                    <span className="font-medium text-blue-600">{result.quality_scores.content_quality}%</span>
                  </div>
                  <Progress value={parseInt(result.quality_scores.content_quality)} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">SEO Optimization</span>
                    <span className="font-medium text-blue-600">{result.quality_scores.seo_optimization}%</span>
                  </div>
                  <Progress value={parseInt(result.quality_scores.seo_optimization)} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Engagement Potential</span>
                    <span className="font-medium text-blue-600">{result.quality_scores.engagement_potential}%</span>
                  </div>
                  <Progress value={parseInt(result.quality_scores.engagement_potential)} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Brand Consistency</span>
                    <span className="font-medium text-blue-600">{result.quality_scores.brand_consistency}%</span>
                  </div>
                  <Progress value={parseInt(result.quality_scores.brand_consistency)} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checks */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Passed Checks */}
            <Card className="bg-white border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  Passed Checks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.passed_checks.map((check, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      {check}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Failed Checks */}
            {result.failed_checks.length > 0 && (
              <Card className="bg-white border-blue-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 text-lg flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-blue-600" />
                    Failed Checks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.failed_checks.map((check, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <XCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        {check}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Issues Found */}
          {result.issues_found.length > 0 && (
            <Card className="bg-white border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  Issues Found
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.issues_found.map((issue, idx) => (
                    <div key={idx} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="border-blue-300 text-blue-600 text-xs">
                          {issue.category}
                        </Badge>
                        <Badge
                          variant={issue.severity === 'high' ? 'destructive' : 'secondary'}
                          className={issue.severity === 'high' ? 'bg-blue-100 text-blue-700 text-xs' : 'text-xs'}
                        >
                          {issue.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{issue.issue}</p>
                      <p className="text-xs text-gray-700/70">
                        <strong>Recommendation:</strong> {issue.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Revision Recommendations */}
          {result.revision_recommendations.length > 0 && (
            <Card className="bg-white border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                  Revision Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.revision_recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-600 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Strengths */}
          {result.strengths.length > 0 && (
            <Card className="bg-white border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Content Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Approval Notes */}
          {result.approval_notes && (
            <Alert className="bg-blue-50 border-blue-300">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-gray-700">
                <strong>Reviewer Notes:</strong> {result.approval_notes}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  )
}

// Complete Optimization Component
function CompleteOptimizationSection() {
  const [request, setRequest] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GrowthManagerResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleOptimize = async () => {
    if (!request.trim()) {
      setError('Please describe what you need help with')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await callAIAgent(request, AGENT_IDS.GROWTH_MANAGER)

      if (response.success && response.response.status === 'success') {
        setResult(response.response.result as GrowthManagerResult)
      } else {
        setError(response.response.message || 'Optimization workflow failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white border-blue-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Award className="h-6 w-6 text-blue-600" />
            Complete LinkedIn Optimization
          </CardTitle>
          <CardDescription className="text-blue-600">
            Leverage the growth manager agent to coordinate comprehensive workflows across all sub-agents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Request Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What would you like help with?
            </label>
            <Textarea
              placeholder="Describe your LinkedIn growth goal... Examples:&#10;- Create a thought leadership post about AI trends in healthcare&#10;- Analyze my profile and create optimized content&#10;- Review my CV and generate posts about my recent achievements"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              rows={6}
              className="bg-white border-blue-300 text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Optimize Button */}
          <Button
            onClick={handleOptimize}
            disabled={loading || !request.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Optimization Workflow...
              </>
            ) : (
              <>
                <TrendingUp className="mr-2 h-4 w-4" />
                Start Complete Optimization
              </>
            )}
          </Button>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Workflow Summary */}
          <Card className="bg-white border-blue-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">Workflow Summary</CardTitle>
                <Badge className="bg-blue-100 text-blue-600 border-blue-300">
                  {result.request_type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{result.workflow_summary}</p>

              {/* Engaged Agents */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Agents Engaged
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.agents_engaged.map((agent, idx) => (
                    <Badge key={idx} variant="outline" className="border-blue-300 text-blue-600">
                      {agent}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aggregated Results */}
          {result.aggregated_results && (
            <Card className="bg-white border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Content Generated */}
                {result.aggregated_results.content_generated && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    {result.aggregated_results.content_generated.title && (
                      <h4 className="font-semibold text-gray-700 mb-2">
                        {result.aggregated_results.content_generated.title}
                      </h4>
                    )}
                    {result.aggregated_results.content_generated.content && (
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {result.aggregated_results.content_generated.content}
                      </p>
                    )}
                  </div>
                )}

                {/* Quality Review */}
                {result.aggregated_results.quality_review && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Quality Review</span>
                      {result.aggregated_results.quality_review.quality_score && (
                        <Badge className="bg-blue-100 text-blue-600">
                          Score: {result.aggregated_results.quality_review.quality_score}/10
                        </Badge>
                      )}
                    </div>
                    {result.aggregated_results.quality_review.feedback && (
                      <p className="text-sm text-gray-600">
                        {result.aggregated_results.quality_review.feedback}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <Card className="bg-white border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                  Strategic Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          {result.next_steps.length > 0 && (
            <Card className="bg-white border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.next_steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex-shrink-0">
                        {idx + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Overall Assessment */}
          {result.overall_assessment && (
            <Alert className="bg-blue-50 border-blue-300">
              <Award className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-gray-700">
                <strong>Overall Assessment:</strong> {result.overall_assessment}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  )
}
