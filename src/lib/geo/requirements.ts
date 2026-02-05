type SeoRequirements = {
  name: string;
  description: string;
  benefits: string[];
  keywords: string[];
  painPoints: string[];
  solutions: string[];
};

const PLACEHOLDERS: SeoRequirements = {
  name: "{{PROJECT_NAME}}",
  description: "{{PROJECT_DESCRIPTION}}",
  benefits: ["{{BENEFIT_1}}", "{{BENEFIT_2}}", "{{BENEFIT_3}}"],
  keywords: [
    "{{KEYWORD_1}}",
    "{{KEYWORD_2}}",
    "{{KEYWORD_3}}",
    "{{KEYWORD_4}}",
  ],
  painPoints: ["{{PAIN_POINT_1}}", "{{PAIN_POINT_2}}", "{{PAIN_POINT_3}}"],
  solutions: ["{{SOLUTION_1}}", "{{SOLUTION_2}}", "{{SOLUTION_3}}"],
};

export function getSeoRequirements(): SeoRequirements {
  return PLACEHOLDERS;
}

export function getSiteBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
}
