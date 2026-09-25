import { portfolioData } from "@/data/portfolio";

export type Goal = "leads" | "sell" | "product" | "internal" | "refresh" | "unsure";
export type Readiness = "idea" | "design" | "replace" | "extend";
export type Audience = "customers" | "team" | "both";
export type ContentMode = "static" | "editable" | "catalog";
export type Extra = "payments" | "accounts" | "cms" | "integrations" | "admin" | "none";
export type Scope = "small" | "medium" | "large";
export type ProductKind = "landing" | "storefront" | "product" | "dashboard" | "extension";

export interface Answers {
  goal: Goal | null;
  readiness: Readiness | null;
  audience: Audience | null;
  content: ContentMode | null;
  extras: Extra[];
  scope: Scope | null;
}

export interface CompleteAnswers {
  goal: Goal;
  readiness: Readiness;
  audience: Audience;
  content: ContentMode;
  extras: Extra[];
  scope: Scope;
}

export type StepId = keyof Answers;

export interface EstimateOption {
  id: string;
  label: string;
  detail: string;
}

export interface EstimateStep {
  id: StepId;
  title: string;
  hint: string;
  multiple: boolean;
  options: EstimateOption[];
}

export interface EstimateProject {
  title: string;
  description: string;
  href?: string;
  image: string;
}

export interface EstimateResult {
  kind: ProductKind;
  title: string;
  summary: string;
  priceLow: number;
  priceHigh: number;
  weeksLow: number;
  weeksHigh: number;
  priceLabel: string;
  timeLabel: string;
  technologies: string[];
  factors: string[];
  projects: EstimateProject[];
  brief: string;
}

export const emptyAnswers = (): Answers => ({
  goal: null,
  readiness: null,
  audience: null,
  content: null,
  extras: [],
  scope: null,
});

export const estimateSteps: EstimateStep[] = [
  {
    id: "goal",
    title: "What should this do for you?",
    hint: "Pick the outcome, not the technology.",
    multiple: false,
    options: [
      {
        id: "leads",
        label: "Bring in requests",
        detail: "A page about the business, with a clear way to get in touch.",
      },
      {
        id: "sell",
        label: "Sell products online",
        detail: "A catalog, a cart, and checkout.",
      },
      {
        id: "product",
        label: "Give people a product they use",
        detail: "Accounts and features they come back to.",
      },
      {
        id: "internal",
        label: "Help my team work",
        detail: "Tables, reports, and the processes you repeat every day.",
      },
      {
        id: "refresh",
        label: "Improve what I already have",
        detail: "New parts, or a cleaner version of a product that already runs.",
      },
      {
        id: "unsure",
        label: "I'm not sure yet",
        detail: "We'll use the next answers to find the closest match.",
      },
    ],
  },
  {
    id: "readiness",
    title: "Where are you starting from?",
    hint: "This changes how much discovery the first version needs.",
    multiple: false,
    options: [
      {
        id: "idea",
        label: "An idea",
        detail: "Nothing is designed or built yet.",
      },
      {
        id: "design",
        label: "A design or a clear brief",
        detail: "The shape of the product is already decided.",
      },
      {
        id: "replace",
        label: "Something I want replaced",
        detail: "A site or product exists, and it should be rebuilt.",
      },
      {
        id: "extend",
        label: "A working product",
        detail: "It runs today and needs new parts.",
      },
    ],
  },
  {
    id: "audience",
    title: "Who will use it?",
    hint: "Visitors, your team, or both.",
    multiple: false,
    options: [
      {
        id: "customers",
        label: "Customers or visitors",
        detail: "People outside the company.",
      },
      {
        id: "team",
        label: "My team",
        detail: "Employees working in it day to day.",
      },
      {
        id: "both",
        label: "Both",
        detail: "A public side and a side for the team.",
      },
    ],
  },
  {
    id: "content",
    title: "How should the content live?",
    hint: "Who changes text, images, or products after launch.",
    multiple: false,
    options: [
      {
        id: "static",
        label: "It rarely changes",
        detail: "Updates can wait for a developer.",
      },
      {
        id: "editable",
        label: "I want to edit it myself",
        detail: "Text and images, without a deploy.",
      },
      {
        id: "catalog",
        label: "A catalog that changes often",
        detail: "Products, prices, or a growing list of items.",
      },
    ],
  },
  {
    id: "extras",
    title: "What has to be in the first version?",
    hint: "Choose every item you need. Or say none of these yet.",
    multiple: true,
    options: [
      {
        id: "payments",
        label: "Taking payment",
        detail: "Customers pay inside the product.",
      },
      {
        id: "accounts",
        label: "User accounts",
        detail: "People sign in and keep their own data.",
      },
      {
        id: "cms",
        label: "A content editor",
        detail: "Your team publishes pages without a developer.",
      },
      {
        id: "integrations",
        label: "A connection to another system",
        detail: "An existing service, API, or database.",
      },
      {
        id: "admin",
        label: "An admin area",
        detail: "A private place to manage orders, users, or records.",
      },
      {
        id: "none",
        label: "None of these yet",
        detail: "The first version can stay simpler.",
      },
    ],
  },
  {
    id: "scope",
    title: "How big is the first version?",
    hint: "Size of what should ship first, not the whole future product.",
    multiple: false,
    options: [
      {
        id: "small",
        label: "Small",
        detail: "One main job and a handful of screens.",
      },
      {
        id: "medium",
        label: "Medium",
        detail: "Several parts that have to work together.",
      },
      {
        id: "large",
        label: "Large",
        detail: "Many roles, flows, or integrations.",
      },
    ],
  },
];

const BASE: Record<ProductKind, { price: number; weeks: number; floor: number }> = {
  landing: { price: 2000, weeks: 2, floor: 1400 },
  storefront: { price: 9000, weeks: 8, floor: 5500 },
  product: { price: 8500, weeks: 9, floor: 5000 },
  dashboard: { price: 9500, weeks: 10, floor: 6000 },
  extension: { price: 4000, weeks: 4, floor: 2000 },
};

const ADDON: Record<Exclude<Extra, "none">, { price: number; weeks: number }> = {
  payments: { price: 2200, weeks: 2 },
  accounts: { price: 1400, weeks: 1.5 },
  cms: { price: 1600, weeks: 1.5 },
  integrations: { price: 1800, weeks: 2 },
  admin: { price: 1200, weeks: 1.5 },
};

const KIND_COPY: Record<ProductKind, { title: string; summary: string; reason: string }> = {
  landing: {
    title: "A marketing site",
    summary:
      "A focused site that explains what you offer and gives people a clear way to reach you. A handful of sections, fast to open, and straightforward to extend later.",
    reason: "A marketing site fits a page whose job is to bring in requests.",
  },
  storefront: {
    title: "An online store",
    summary:
      "A storefront with a catalog, cart, and checkout, plus a place to manage products without a developer for every change.",
    reason: "A store fits selling products and keeping a catalog up to date.",
  },
  product: {
    title: "A web product",
    summary:
      "An application people sign into and come back to: their own data, the features that make it useful, and room to grow after the first release.",
    reason: "A web product fits accounts and features people use over time.",
  },
  dashboard: {
    title: "An internal tool",
    summary:
      "A working tool for your team: tables, filters, and the flows you repeat every day. Built to be reliable in daily use.",
    reason: "An internal tool fits a team working with data and processes.",
  },
  extension: {
    title: "Work on what you already have",
    summary:
      "New parts, or a cleaner version of the product that already runs. The first version stays smaller because the foundation is there.",
    reason: "This is work on an existing product, so it does not start from zero.",
  },
};

const PROJECT_TITLES: Record<ProductKind, string[]> = {
  landing: [
    "Landing page for a therapy and wellness practice",
    "Landing page for the IT-company",
  ],
  storefront: [
    "Truck Accessories & Modular Cargo Platform",
    "Hecosvc: Auto Tools Hub",
  ],
  product: [
    "MindHaven: Mental Wellness Hub",
    "Gaming platform for Warcraft III: The Frozen Throne",
  ],
  dashboard: [
    "LIMS application for an oil company",
    "VTB Online: Digital Banking Platform",
  ],
  extension: [
    "LIMS application for an oil company",
    "Truck Accessories & Modular Cargo Platform",
  ],
};

const SCOPE_FACTOR: Record<Scope, { price: number; weeks: number; label: string }> = {
  small: { price: 0.8, weeks: 0.75, label: "A small first version: one main job." },
  medium: { price: 1, weeks: 1, label: "A medium first version: several parts working together." },
  large: { price: 1.4, weeks: 1.35, label: "A large first version: more roles, flows, or integrations." },
};

const READINESS_COPY: Record<Readiness, string> = {
  idea: "Starting from an idea, so the range includes time to shape the first version.",
  design: "A design or a clear brief is already there, so discovery stays shorter.",
  replace: "Replacing something that exists, so the range includes the move off the old version.",
  extend: "The product already runs, so this prices the new parts rather than a full rebuild.",
};

export function isStepAnswered(step: EstimateStep, answers: Answers) {
  if (step.id === "extras") return answers.extras.length > 0;
  return answers[step.id] !== null;
}

export function isComplete(answers: Answers): answers is CompleteAnswers {
  return estimateSteps.every((step) => isStepAnswered(step, answers));
}

function resolveKind(answers: CompleteAnswers): ProductKind {
  const selling = answers.goal === "sell" || answers.content === "catalog";
  const forTeam = answers.goal === "internal" || answers.audience === "team";
  const withAccounts = answers.goal === "product" || answers.extras.includes("accounts");

  if (selling && answers.goal !== "internal") return "storefront";

  if (answers.goal === "refresh" || answers.readiness === "extend") {
    if (forTeam && answers.goal !== "leads") return "dashboard";
    if (withAccounts && answers.goal !== "leads") return "product";
    return "extension";
  }

  if (forTeam && answers.goal !== "leads") return "dashboard";
  if (withAccounts && answers.goal !== "leads") return "product";
  if (answers.extras.includes("payments") && answers.goal !== "leads") return "storefront";
  return "landing";
}

function includedInBase(kind: ProductKind, extra: Exclude<Extra, "none">) {
  if (extra === "payments" || extra === "cms") return kind === "storefront";
  if (extra === "accounts") return kind === "product" || kind === "dashboard";
  if (extra === "admin") return kind === "dashboard";
  return false;
}

function neededExtras(kind: ProductKind, answers: CompleteAnswers) {
  const needed = new Set<Exclude<Extra, "none">>();
  for (const extra of answers.extras) {
    if (extra !== "none") needed.add(extra);
  }
  if (answers.content === "editable" || answers.content === "catalog") needed.add("cms");
  if (answers.goal === "sell" || answers.content === "catalog") needed.add("payments");

  return [...needed].filter((extra) => !includedInBase(kind, extra));
}

function technologies(kind: ProductKind, answers: CompleteAnswers) {
  const tech = ["Next.js", "TypeScript", "Tailwind CSS"];
  const extras = new Set(answers.extras);

  if (kind === "landing") tech.push("React Hook Form", "Zod");
  if (kind === "storefront") tech.push("Payload CMS", "Saleor");
  else if (answers.content !== "static" || extras.has("cms")) tech.push("Payload CMS");

  if (kind === "product") tech.push("Zustand", "Zod", "ShadCN");
  if (kind === "dashboard") tech.push("TanStack Query", "ShadCN", "Zod");
  if (kind === "extension") tech.push("React", "ShadCN");

  const needsServer =
    kind === "storefront" ||
    kind === "product" ||
    kind === "dashboard" ||
    extras.has("accounts") ||
    extras.has("integrations") ||
    extras.has("payments");

  if (needsServer && kind !== "landing") tech.push("Nest.js", "PostgreSQL");
  if (kind === "landing" && extras.has("integrations")) tech.push("Nest.js");

  return [...new Set(tech)];
}

function matchProjects(kind: ProductKind): EstimateProject[] {
  return PROJECT_TITLES[kind].flatMap((title) => {
    const project = portfolioData.projects.find((item) => item.title === title);
    if (!project) return [];
    return [
      {
        title: project.title,
        description: project.description,
        href: project.link,
        image: project.images[0],
      },
    ];
  });
}

function roundMoney(value: number) {
  const step = value < 4000 ? 100 : 500;
  return Math.round(value / step) * step;
}

export function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function optionLabel(stepId: StepId, optionId: string) {
  const step = estimateSteps.find((item) => item.id === stepId);
  return step?.options.find((option) => option.id === optionId)?.label ?? optionId;
}

export function calculateEstimate(answers: CompleteAnswers): EstimateResult {
  const kind = resolveKind(answers);
  const base = BASE[kind];
  const scope = SCOPE_FACTOR[answers.scope];
  const extras = neededExtras(kind, answers);

  let price = base.price;
  let weeks = base.weeks;

  for (const extra of extras) {
    price += ADDON[extra].price;
    weeks += ADDON[extra].weeks;
  }

  price *= scope.price;
  weeks *= scope.weeks;

  if (answers.readiness === "idea") {
    price *= 1.12;
    weeks += 1;
  } else if (answers.readiness === "design") {
    price *= 0.95;
  } else if (answers.readiness === "replace") {
    price *= 1.08;
    weeks += 1;
  } else if (answers.readiness === "extend" && kind !== "extension") {
    price *= 0.75;
    weeks = Math.max(2, weeks * 0.7);
  }

  if (answers.audience === "both") {
    price *= 1.1;
    weeks += 1;
  }

  price = Math.max(price, base.floor);

  let priceLow = roundMoney(price * 0.9);
  let priceHigh = roundMoney(price * 1.22);
  if (priceHigh <= priceLow) priceHigh = priceLow + (priceLow < 4000 ? 400 : 1000);

  const weeksLow = Math.max(1, Math.round(weeks * 0.85));
  const weeksHigh = Math.max(weeksLow + 1, Math.round(weeks * 1.2));

  const copy = KIND_COPY[kind];
  const summary =
    answers.goal === "unsure"
      ? `${copy.summary} You were not sure where to start, so this is the closest match from your answers.`
      : copy.summary;

  const stack = technologies(kind, answers);
  const projects = matchProjects(kind);
  const priceLabel = `${formatUsd(priceLow)}–${formatUsd(priceHigh)}`;
  const timeLabel = `${weeksLow}–${weeksHigh} weeks`;

  const factors = [copy.reason, scope.label, READINESS_COPY[answers.readiness]];
  if (answers.audience === "both") {
    factors.push("Both customers and your team use it, so the first version covers two sides.");
  }

  const answerLines = [
    `Goal: ${optionLabel("goal", answers.goal)}`,
    `Starting point: ${optionLabel("readiness", answers.readiness)}`,
    `Audience: ${optionLabel("audience", answers.audience)}`,
    `Content: ${optionLabel("content", answers.content)}`,
    `First version includes: ${answers.extras.map((id) => optionLabel("extras", id)).join(", ")}`,
    `Size: ${optionLabel("scope", answers.scope)}`,
  ];

  const brief = [
    "I went through the project estimate on your site.",
    "",
    `What I need: ${copy.title}`,
    `Approximate budget: ${priceLabel}`,
    `Approximate time: ${timeLabel}`,
    `Stack: ${stack.join(", ")}`,
    "",
    "My answers:",
    ...answerLines,
  ].join("\n");

  return {
    kind,
    title: copy.title,
    summary,
    priceLow,
    priceHigh,
    weeksLow,
    weeksHigh,
    priceLabel,
    timeLabel,
    technologies: stack,
    factors,
    projects,
    brief,
  };
}
