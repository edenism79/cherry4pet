import { z } from 'zod'

export const campaignSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  organization: z.string().optional(),
  summary: z.string().optional(),
  image_url: z.string().url('올바른 URL을 입력해주세요').optional().or(z.literal('')),
  goal_amount: z.number().min(0, '목표 금액은 0 이상이어야 합니다').default(0),
  raised_amount: z.number().min(0, '현재 금액은 0 이상이어야 합니다').default(0),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  external_url: z.string().url('올바른 URL을 입력해주세요').optional().or(z.literal('')),
  category: z.string().optional(),
  is_featured: z.boolean().default(false),
  is_visible: z.boolean().default(true),
  sort_order: z.number().default(0),
})

export const partnerSchema = z.object({
  name: z.string().min(1, '파트너명을 입력해주세요'),
  type: z.string().optional(),
  logo_url: z.string().url('올바른 URL을 입력해주세요').optional().or(z.literal('')),
  website_url: z.string().url('올바른 URL을 입력해주세요').optional().or(z.literal('')),
  description: z.string().optional(),
  is_visible: z.boolean().default(true),
  sort_order: z.number().default(0),
})

export const sectionSchema = z.object({
  section_key: z.string().min(1, '섹션 키를 입력해주세요'),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  body: z.string().optional(),
  image_url: z.string().url('올바른 URL을 입력해주세요').optional().or(z.literal('')),
  cta_label: z.string().optional(),
  cta_url: z.string().url('올바른 URL을 입력해주세요').optional().or(z.literal('')),
  extra: z.record(z.unknown()).optional(),
  sort_order: z.number().default(0),
  is_visible: z.boolean().default(true),
})

export const inquirySchema = z.object({
  type: z.string().default('general'),
  name: z.string().min(1, '이름을 입력해주세요'),
  organization: z.string().optional(),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  phone: z.string().optional(),
  message: z.string().min(1, '문의 내용을 입력해주세요'),
})

export const storySchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  summary: z.string().optional(),
  image_url: z.string().url('올바른 URL을 입력해주세요').optional().or(z.literal('')),
  link_url: z.string().url('올바른 URL을 입력해주세요').optional().or(z.literal('')),
  published_at: z.string().optional(),
  is_visible: z.boolean().default(true),
  sort_order: z.number().default(0),
})

export const siteSettingsSchema = z.object({
  site_name: z.string().min(1, '사이트명을 입력해주세요'),
  logo_url: z.string().url('올바른 URL을 입력해주세요').optional().or(z.literal('')),
  favicon_url: z.string().url('올바른 URL을 입력해주세요').optional().or(z.literal('')),
  primary_cta_label: z.string().default('지금 기부하기'),
  primary_cta_url: z.string().url('올바른 URL을 입력해주세요').optional().or(z.literal('')),
  footer_company_name: z.string().optional(),
  footer_business_info: z.string().optional(),
  privacy_url: z.string().url('올바른 URL을 입력해주세요').optional().or(z.literal('')),
  terms_url: z.string().url('올바른 URL을 입력해주세요').optional().or(z.literal('')),
  sns_links: z.record(z.string()).optional(),
  is_published: z.boolean().default(true),
})
