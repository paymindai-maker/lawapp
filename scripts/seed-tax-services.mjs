/**
 * Seed Tax & Compliance services into Firestore.
 * Usage: node scripts/seed-tax-services.mjs
 *
 * Requires FIREBASE_ADMIN_* env vars (PROJECT_ID, CLIENT_EMAIL, PRIVATE_KEY).
 * Loads .env.local automatically.
 *
 * Idempotent: uses slug as doc ID; re-running updates in place.
 */

import { readFileSync } from "node:fs"
import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore, FieldValue } from "firebase-admin/firestore"

// ─── env loader (.env.local) ──────────────────────────────────────────────────
try {
  const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8")
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!m) continue
    let v = m[2]
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1)
    }
    if (!process.env[m[1]]) process.env[m[1]] = v
  }
} catch {
  // no .env.local — rely on existing env
}

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n")

if (!projectId || !clientEmail || !privateKey) {
  console.error("Missing FIREBASE_ADMIN_PROJECT_ID / CLIENT_EMAIL / PRIVATE_KEY in env.")
  process.exit(1)
}

initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) })
const db = getFirestore()

// ─── Category ─────────────────────────────────────────────────────────────────

const CATEGORY = {
  id: "tax-compliance",
  slug: "tax-compliance",
  name: "Tax & Compliance",
  description:
    "Income tax, TDS, GST, ROC annual filing, PAN, and accounting compliance services for individuals and businesses.",
}

// ─── Services ─────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    slug: "income-tax-return-filing",
    title: "Income Tax Return (ITR) Filing",
    icon: "FileText",
    shortDescription:
      "File your Income Tax Return accurately and on time with expert assistance. Whether you are a salaried employee, freelancer, consultant, business owner, investor, or professional, we help ensure compliant and hassle-free tax filing.",
    hero: {
      heading: "File Your Income Tax Return With Confidence",
      subheading:
        "Expert assistance for accurate Income Tax Return filing, tax computation, deductions, capital gains reporting, refund claims, and compliance support.",
      ctaText: "File Your ITR Today",
    },
    quickInfo: {
      timeline: "1–3 Business Days",
      consultation: "Free Initial Assessment",
      startingPrice: "Starting at ₹999",
    },
    benefitItems: [
      { title: "Accurate Tax Filing", description: "Our professionals review your income sources, deductions, and tax liabilities to ensure accurate return preparation and filing." },
      { title: "Maximum Eligible Tax Savings", description: "We help identify applicable deductions, exemptions, and tax benefits available under current tax laws." },
      { title: "Faster Refund Processing", description: "Properly prepared returns reduce errors and help facilitate smoother processing of income tax refunds." },
      { title: "Complete Compliance Support", description: "Avoid notices, penalties, and compliance issues through timely and professionally managed return filing." },
    ],
    eligibilityItems: [
      { audience: "Salaried Employees", note: "Suitable for individuals earning salary income and claiming deductions or tax refunds." },
      { audience: "Freelancers and Consultants", note: "Ideal for professionals earning independent income from services and projects." },
      { audience: "Business Owners and Entrepreneurs", note: "Required for reporting business income, profits, and tax liabilities." },
      { audience: "Investors and Property Owners", note: "Suitable for taxpayers reporting capital gains, dividends, rental income, and investment-related earnings." },
    ],
    requiredDocuments: [
      "PAN Card", "Aadhaar Card", "Form 16 (if applicable)", "Salary slips", "Bank statements",
      "Interest certificates", "Investment proofs", "Capital gains statements", "Rental income details (if applicable)",
      "Previous year tax return (if available)", "TDS certificates", "Business income records (if applicable)",
    ],
    processSteps: [
      "Consultation and taxpayer category assessment",
      "Collection of financial documents",
      "Income and tax computation",
      "Verification of deductions and exemptions",
      "Selection of appropriate ITR form",
      "Preparation and review of return",
      "Online filing with Income Tax Department",
      "E-verification and filing completion",
    ],
    faqs: [
      { q: "Who is required to file an Income Tax Return?", a: "Individuals meeting prescribed income thresholds or other compliance requirements may be required to file an ITR. Filing may also be beneficial for claiming refunds and maintaining financial records." },
      { q: "Can I file an ITR if TDS has already been deducted?", a: "Yes. Filing an ITR helps reconcile taxes paid, report income accurately, and claim refunds where applicable." },
      { q: "How long does ITR filing take?", a: "Most standard returns can be prepared and filed within 1–3 business days after receiving complete documentation." },
      { q: "What happens if I do not file my ITR?", a: "Failure to file may result in penalties, interest, delayed refunds, compliance notices, and other consequences under applicable tax laws." },
      { q: "Can I revise a return after filing?", a: "Yes. Revised returns may generally be filed within the time limits prescribed under applicable tax provisions." },
    ],
    whyChooseUs: [
      "Experienced tax professionals",
      "Accurate tax computation and filing",
      "Assistance with deductions and tax planning",
      "Support for refund claims",
      "Transparent pricing and quick turnaround",
      "Ongoing compliance and notice assistance",
    ],
    seo: {
      title: "Income Tax Return Filing Services in India | Expert ITR Filing Assistance",
      description: "File your Income Tax Return accurately with expert assistance. Tax computation, refund claims, deductions, compliance support, and hassle-free ITR filing services.",
      keywords: "ITR filing India, income tax return filing, online ITR filing, tax return services, income tax consultant, ITR filing assistance, tax refund filing, income tax compliance",
    },
  },
  {
    slug: "tds-return-filing",
    title: "TDS Return Filing",
    icon: "Receipt",
    shortDescription:
      "Ensure timely and accurate TDS Return Filing with professional assistance. We help businesses, employers, professionals, and organizations comply with tax deduction obligations while minimizing penalties and compliance risks.",
    hero: {
      heading: "File Your TDS Returns Accurately & On Time",
      subheading: "Expert assistance for TDS computation, return preparation, correction filings, compliance management, and quarterly TDS return submission.",
      ctaText: "File TDS Return Now",
    },
    quickInfo: { timeline: "1–5 Business Days", consultation: "Free Compliance Review", startingPrice: "Starting at ₹1,499" },
    benefitItems: [
      { title: "Avoid Penalties and Interest", description: "Timely filing of TDS returns helps businesses avoid late filing fees, interest liabilities, and regulatory penalties." },
      { title: "Accurate Tax Reporting", description: "Ensure proper reporting of tax deductions, deductee details, challan information, and payment records." },
      { title: "Compliance With Tax Regulations", description: "Stay compliant with Income Tax Department requirements through professionally prepared and verified TDS returns." },
      { title: "Correction and Revision Support", description: "Assistance with revised returns, correction statements, PAN mismatches, and filing-related issues." },
    ],
    eligibilityItems: [
      { audience: "Employers", note: "Suitable for businesses deducting TDS on employee salaries." },
      { audience: "Companies and LLPs", note: "Required for organizations making payments subject to TDS provisions." },
      { audience: "Professionals and Consultants", note: "Applicable where professional payments attract TDS requirements." },
      { audience: "Contractors and Business Entities", note: "Necessary for reporting tax deductions on contractor and vendor payments." },
    ],
    requiredDocuments: [
      "TAN Registration Details", "PAN of deductor", "Challan payment details", "Deductee PAN information",
      "Salary records (if applicable)", "Contractor payment records", "Professional fee payment records",
      "Rent payment details", "Interest payment records", "Previous TDS filing records", "Bank payment records",
    ],
    processSteps: [
      "Collection of deduction and payment records",
      "Verification of deductee details",
      "Reconciliation of challans and tax deposits",
      "Computation of TDS liabilities",
      "Preparation of quarterly TDS return",
      "Validation and compliance review",
      "Online filing of TDS return",
      "Filing confirmation and compliance support",
    ],
    faqs: [
      { q: "Who is required to file TDS returns?", a: "Entities responsible for deducting tax at source on specified payments are generally required to file periodic TDS returns." },
      { q: "How often are TDS returns filed?", a: "TDS returns are typically filed quarterly, subject to applicable regulations and reporting requirements." },
      { q: "What happens if TDS returns are filed late?", a: "Late filing may result in fees, penalties, interest liabilities, and compliance notices from tax authorities." },
      { q: "Can errors in a TDS return be corrected?", a: "Yes. Correction statements and revised filings may generally be submitted to rectify reporting errors." },
      { q: "Why is accurate PAN information important?", a: "Incorrect PAN details can lead to return rejection, tax credit issues, compliance notices, and deductee-related disputes." },
    ],
    whyChooseUs: [
      "Experienced tax compliance professionals",
      "Accurate TDS computation and reporting",
      "Quarterly filing support",
      "Challan reconciliation assistance",
      "Correction return expertise",
      "Fast turnaround and compliance-focused service",
    ],
    seo: {
      title: "TDS Return Filing Services in India | Quarterly TDS Compliance Assistance",
      description: "Professional TDS Return Filing services for businesses, employers, LLPs, companies, and professionals. Accurate filing, compliance support, correction returns, and TDS management.",
      keywords: "TDS return filing, quarterly TDS filing, TDS compliance services, TDS return consultant, online TDS filing India, TDS correction return, employer TDS filing, business TDS compliance",
    },
  },
  {
    slug: "property-purchase-tds-filing",
    title: "Property Purchase TDS Filing",
    icon: "Home",
    shortDescription:
      "Comply with mandatory property purchase tax requirements through accurate TDS filing and Form 26QB submission. We assist property buyers with TDS calculation, payment, filing, and TDS certificate generation.",
    hero: {
      heading: "Property Purchase TDS Filing Made Simple",
      subheading: "Expert assistance for Form 26QB filing, TDS payment, compliance verification, and Form 16B generation for property transactions.",
      ctaText: "File Property TDS Now",
    },
    quickInfo: { timeline: "1–2 Business Days", consultation: "Free Compliance Review", startingPrice: "Starting at ₹999" },
    benefitItems: [
      { title: "Complete Form 26QB Filing Support", description: "We prepare and submit Form 26QB accurately, ensuring compliance with property transaction tax requirements." },
      { title: "Avoid Interest and Penalties", description: "Timely filing and payment help prevent late fees, interest charges, and notices from tax authorities." },
      { title: "Accurate TDS Calculation", description: "Professional review ensures the correct tax amount is deducted and deposited based on transaction details." },
      { title: "Form 16B Generation Assistance", description: "We help generate and download Form 16B, the TDS certificate required for property transactions." },
    ],
    eligibilityItems: [
      { audience: "Residential Property Buyers", note: "Suitable for individuals purchasing residential flats, apartments, houses, or plots." },
      { audience: "Commercial Property Purchasers", note: "Applicable to buyers acquiring commercial property and business premises." },
      { audience: "Joint Buyers", note: "Professional assistance is useful when multiple buyers or co-owners are involved." },
      { audience: "Real Estate Investors", note: "Helps investors maintain proper tax compliance for property acquisitions." },
    ],
    requiredDocuments: [
      "PAN Card of buyer", "PAN Card of seller", "Aadhaar Card", "Property sale agreement",
      "Property address details", "Purchase consideration details", "Payment records",
      "Buyer contact information", "Seller contact information", "Property transaction date details",
    ],
    processSteps: [
      "Review of property transaction details",
      "Verification of buyer and seller information",
      "TDS applicability assessment",
      "Calculation of tax liability",
      "Preparation of Form 26QB",
      "Online payment of TDS",
      "Filing confirmation and verification",
      "Generation and download of Form 16B",
    ],
    faqs: [
      { q: "Who is responsible for deducting TDS on property purchases?", a: "The property buyer is generally responsible for deducting, depositing, and reporting TDS in accordance with applicable tax provisions." },
      { q: "What is Form 26QB?", a: "Form 26QB is a challan-cum-statement used for reporting TDS deducted on property purchase transactions." },
      { q: "What is Form 16B?", a: "Form 16B is the TDS certificate issued after successful TDS payment and filing, which is generally provided to the seller." },
      { q: "What happens if TDS is not deposited on time?", a: "Delayed compliance may result in interest liabilities, penalties, and notices from tax authorities." },
      { q: "Can corrections be made after filing Form 26QB?", a: "Yes. Certain corrections may be possible depending on the nature of the error and applicable procedures." },
    ],
    whyChooseUs: [
      "Property transaction compliance specialists",
      "Accurate TDS calculation support",
      "Complete Form 26QB filing assistance",
      "Form 16B generation guidance",
      "Fast turnaround times",
      "Transparent and professional service",
    ],
    seo: {
      title: "Property Purchase TDS Filing Services | Form 26QB & Form 16B Assistance",
      description: "Expert assistance for property purchase TDS filing, Form 26QB submission, TDS payment, and Form 16B generation. Ensure accurate compliance for property transactions.",
      keywords: "property purchase TDS filing, Form 26QB filing, Form 16B generation, property TDS compliance, TDS on property purchase, property tax deduction filing, Section 194IA compliance",
    },
  },
  {
    slug: "gst-return-filing",
    title: "GST Return Filing",
    icon: "FileCheck",
    shortDescription:
      "Ensure timely and accurate GST Return Filing with expert support. We help businesses comply with GST regulations, file returns correctly, reconcile transactions, and avoid penalties, interest, and compliance notices.",
    hero: {
      heading: "File Your GST Returns Without Compliance Hassles",
      subheading: "Professional GST return filing services for businesses, startups, LLPs, companies, traders, ecommerce sellers, and service providers across India.",
      ctaText: "File GST Return Now",
    },
    quickInfo: { timeline: "1–3 Business Days", consultation: "Free GST Compliance Review", startingPrice: "Starting at ₹999" },
    benefitItems: [
      { title: "Timely GST Compliance", description: "Stay compliant with GST regulations through accurate and timely filing of monthly, quarterly, and annual GST returns." },
      { title: "Avoid Penalties and Notices", description: "Proper filing reduces the risk of late fees, interest liabilities, GST notices, and compliance-related issues." },
      { title: "Input Tax Credit Optimization", description: "Accurate reconciliation helps maximize eligible Input Tax Credit (ITC) while maintaining compliance." },
      { title: "Professional GST Support", description: "Receive expert assistance for GST reporting, reconciliations, corrections, and compliance management." },
    ],
    eligibilityItems: [
      { audience: "GST Registered Businesses", note: "Mandatory for businesses holding active GST registration." },
      { audience: "Startups and SMEs", note: "Suitable for growing businesses seeking reliable compliance support." },
      { audience: "Ecommerce Sellers", note: "Required for online sellers operating through ecommerce platforms." },
      { audience: "Professionals and Service Providers", note: "Applicable to consultants, agencies, freelancers, and service-based businesses registered under GST." },
    ],
    requiredDocuments: [
      "GST Registration Certificate", "GSTIN Details", "Sales Invoices", "Purchase Invoices",
      "Input Tax Credit Records", "Bank Statements", "Accounting Records",
      "E-way Bill Details (if applicable)", "Previous GST Return Data", "Reconciliation Statements",
    ],
    processSteps: [
      "Collection of transaction and invoice data",
      "Review of sales and purchase records",
      "GST liability computation",
      "Input Tax Credit reconciliation",
      "Preparation of GST return",
      "Compliance review and verification",
      "Online filing on GST portal",
      "Filing confirmation and compliance support",
    ],
    faqs: [
      { q: "Who is required to file GST returns?", a: "All GST-registered taxpayers are generally required to file GST returns according to the applicable filing schedule and registration category." },
      { q: "What happens if GST returns are filed late?", a: "Late filing may result in late fees, interest liabilities, compliance notices, and restrictions on Input Tax Credit claims." },
      { q: "Can GST returns be revised after filing?", a: "GST returns generally cannot be revised directly, but certain corrections may be reported in subsequent returns as permitted under applicable rules." },
      { q: "What is Input Tax Credit (ITC)?", a: "Input Tax Credit allows businesses to claim credit for GST paid on eligible purchases and expenses used in business operations." },
      { q: "How often are GST returns filed?", a: "The filing frequency depends on the taxpayer category and applicable GST scheme, with monthly, quarterly, and annual filing requirements being common." },
    ],
    whyChooseUs: [
      "Experienced GST professionals",
      "Accurate GST computation and filing",
      "Input Tax Credit reconciliation support",
      "GST notice and compliance assistance",
      "Fast turnaround times",
      "Transparent pricing and dedicated support",
    ],
    seo: {
      title: "GST Return Filing Services in India | Professional GST Compliance Support",
      description: "File your GST returns accurately with expert assistance. GST compliance, Input Tax Credit reconciliation, monthly and quarterly return filing, and notice support.",
      keywords: "GST return filing, GST compliance services, GST filing India, online GST return filing, GST consultant, GST reconciliation, GST return filing service, Input Tax Credit filing",
    },
  },
  {
    slug: "mandatory-annual-filing",
    title: "Mandatory Annual Filing",
    icon: "CalendarCheck",
    shortDescription:
      "Stay compliant with statutory requirements through timely annual filing services for Private Limited Companies, One Person Companies (OPCs), and LLPs. We manage annual returns, financial statement filings, ROC compliance, and regulatory reporting.",
    hero: {
      heading: "Stay Compliant With Mandatory Annual Filing",
      subheading: "Professional annual filing and ROC compliance services for companies and LLPs to help avoid penalties, maintain good standing, and meet statutory obligations.",
      ctaText: "Book Compliance Consultation",
    },
    quickInfo: { timeline: "3–10 Business Days", consultation: "Free Compliance Review", startingPrice: "Starting at ₹4,999" },
    benefitItems: [
      { title: "Avoid Heavy ROC Penalties", description: "Timely filing helps businesses avoid significant penalties, additional fees, director disqualifications, and compliance risks." },
      { title: "Maintain Legal Compliance", description: "Ensure your company or LLP remains compliant with Ministry of Corporate Affairs (MCA) requirements and statutory obligations." },
      { title: "Professional Documentation Support", description: "Receive assistance with preparing financial statements, annual returns, compliance records, and ROC filings." },
      { title: "Strengthen Business Credibility", description: "Regular compliance demonstrates transparency and good governance to investors, banks, vendors, and stakeholders." },
    ],
    eligibilityItems: [
      { audience: "Private Limited Companies", note: "Annual ROC filings and financial statement submissions are generally mandatory." },
      { audience: "One Person Companies (OPCs)", note: "Required to comply with applicable company filing obligations." },
      { audience: "Limited Liability Partnerships (LLPs)", note: "Must file annual returns and statutory compliance forms." },
      { audience: "Growing Businesses and Startups", note: "Maintaining compliance helps support fundraising, expansion, and operational continuity." },
    ],
    requiredDocuments: [
      "PAN Card of entity", "Certificate of Incorporation", "CIN or LLPIN Details", "Financial Statements",
      "Balance Sheet", "Profit and Loss Statement", "Director Details", "Shareholding Information",
      "Statutory Registers", "Auditor Information (if applicable)", "Previous Filing Records",
      "Bank Statements and Financial Records",
    ],
    processSteps: [
      "Compliance assessment and requirement review",
      "Collection of financial and statutory records",
      "Preparation of annual filing documents",
      "Review of financial statements",
      "Compliance verification and reconciliation",
      "ROC filing and submission",
      "Confirmation of successful filing",
      "Ongoing compliance guidance",
    ],
    faqs: [
      { q: "What happens if annual filings are not completed?", a: "Failure to comply may result in penalties, additional filing fees, compliance notices, and other regulatory consequences." },
      { q: "Which entities require annual filing?", a: "Private Limited Companies, OPCs, LLPs, and certain other registered entities are generally subject to annual filing requirements." },
      { q: "Can a dormant company avoid annual filing?", a: "Even inactive or dormant entities may have compliance obligations depending on their legal status and applicable regulations." },
      { q: "How often are annual filings required?", a: "Annual filings are generally required once every financial year within prescribed deadlines." },
      { q: "Can late filings be regularized?", a: "Yes. In many cases, delayed filings can be completed, although additional fees and penalties may apply." },
    ],
    whyChooseUs: [
      "Experienced ROC compliance professionals",
      "Annual filing specialists for companies and LLPs",
      "Financial statement review support",
      "Deadline tracking and compliance management",
      "Transparent pricing and filing process",
      "Ongoing compliance advisory services",
    ],
    seo: {
      title: "Mandatory Annual Filing Services | ROC Compliance for Companies & LLPs",
      description: "Professional annual filing and ROC compliance services for Private Limited Companies, OPCs, and LLPs. Avoid penalties and stay compliant with expert support.",
      keywords: "mandatory annual filing, ROC filing services, annual compliance company, LLP annual filing, company annual return filing, ROC compliance India, annual filing consultant, MCA compliance services",
    },
  },
  {
    slug: "new-pan-application",
    title: "New PAN Application",
    icon: "CreditCard",
    shortDescription:
      "Apply for a new Permanent Account Number (PAN) quickly and accurately with professional assistance. We help individuals, students, salaried employees, business owners, NRIs, and organizations complete the PAN application process smoothly.",
    hero: {
      heading: "Apply For Your New PAN Card With Ease",
      subheading: "Professional assistance for PAN application, documentation, verification, correction support, and application tracking from start to finish.",
      ctaText: "Apply for PAN Now",
    },
    quickInfo: { timeline: "7–15 Business Days", consultation: "Free Application Review", startingPrice: "Starting at ₹499" },
    benefitItems: [
      { title: "Accurate Application Filing", description: "Professional review helps minimize application errors, documentation issues, and processing delays." },
      { title: "Essential Financial Identity", description: "A PAN card is required for income tax filing, banking transactions, investments, and numerous financial activities." },
      { title: "Application Tracking Support", description: "Receive assistance with status tracking, verification requirements, and follow-up support throughout the process." },
      { title: "Suitable for Individuals and Businesses", description: "We assist individuals, professionals, students, businesses, trusts, societies, and other eligible entities with PAN applications." },
    ],
    eligibilityItems: [
      { audience: "Individual Applicants", note: "Suitable for first-time PAN applicants, students, employees, and professionals." },
      { audience: "Business Owners and Entrepreneurs", note: "Required for many business registrations and financial transactions." },
      { audience: "Companies and LLPs", note: "Necessary for tax compliance, banking, and regulatory purposes." },
      { audience: "Trusts, Societies, and Other Entities", note: "Required for organizational tax and financial activities." },
    ],
    requiredDocuments: [
      "Aadhaar Card", "Identity Proof", "Address Proof", "Date of Birth Proof",
      "Passport-size Photographs", "Mobile Number", "Email Address",
      "Incorporation Documents (for entities)", "Registration Certificates (where applicable)",
    ],
    processSteps: [
      "Consultation and eligibility review",
      "Collection of required documents",
      "Verification of applicant information",
      "Preparation of PAN application",
      "Submission of application",
      "Processing by authorities",
      "Application status tracking",
      "PAN allotment and issuance",
    ],
    faqs: [
      { q: "Who can apply for a PAN card?", a: "Individuals, companies, LLPs, partnership firms, trusts, societies, and other eligible entities can apply for a PAN card." },
      { q: "Is PAN mandatory for filing Income Tax Returns?", a: "In most cases, PAN is required for filing income tax returns and conducting various financial transactions." },
      { q: "How long does PAN card processing take?", a: "Most PAN applications are processed within 7–15 business days, depending on verification and processing timelines." },
      { q: "Can minors apply for a PAN card?", a: "Yes. PAN cards may be issued to minors through the prescribed application process." },
      { q: "Can a business operate without PAN?", a: "Many business registrations, banking activities, and tax compliance requirements require a valid PAN." },
    ],
    whyChooseUs: [
      "Experienced PAN application specialists",
      "Accurate documentation review",
      "Fast application processing support",
      "Application tracking assistance",
      "Support for individuals and businesses",
      "Transparent and affordable service",
    ],
    seo: {
      title: "New PAN Application Services | Apply for PAN Card Online",
      description: "Apply for a new PAN card with expert assistance. PAN application support for individuals, businesses, companies, LLPs, trusts, and societies with complete documentation guidance.",
      keywords: "new PAN application, apply PAN card online, PAN card registration, PAN application services, PAN card consultant, PAN card assistance, business PAN application, PAN registration India",
    },
  },
  {
    slug: "pan-correction",
    title: "PAN Correction",
    icon: "FileEdit",
    shortDescription:
      "Update or correct errors in your PAN card quickly and accurately. We assist individuals, professionals, business owners, and organizations with PAN correction applications, document verification, and processing support.",
    hero: {
      heading: "Correct Your PAN Details Without Hassle",
      subheading: "Professional assistance for PAN card corrections, name updates, date of birth corrections, address changes, photograph updates, and other PAN-related modifications.",
      ctaText: "Request PAN Correction",
    },
    quickInfo: { timeline: "7–15 Business Days", consultation: "Free Application Review", startingPrice: "Starting at ₹699" },
    benefitItems: [
      { title: "Accurate PAN Information", description: "Ensure your PAN records match official documents and avoid issues during tax filing, banking, and financial transactions." },
      { title: "Avoid Compliance Problems", description: "Incorrect PAN details can lead to tax mismatches, verification failures, and regulatory complications. Timely corrections help maintain compliance." },
      { title: "Professional Documentation Support", description: "Receive assistance with document preparation, verification, and application filing to reduce delays and rejection risks." },
      { title: "Comprehensive PAN Updates", description: "We help with name changes, date of birth corrections, address updates, photograph changes, signature updates, and other modifications." },
    ],
    eligibilityItems: [
      { audience: "Individual PAN Holders", note: "Suitable for correcting personal information and updating PAN records." },
      { audience: "Married Individuals", note: "Commonly used for updating names following marriage." },
      { audience: "Professionals and Employees", note: "Helps ensure accurate records for tax filing and employment verification." },
      { audience: "Businesses and Registered Entities", note: "Useful when organizational information requires correction or updating." },
    ],
    requiredDocuments: [
      "Existing PAN Card Copy", "Aadhaar Card", "Identity Proof", "Address Proof", "Date of Birth Proof",
      "Marriage Certificate (if applicable)", "Gazette Notification (if applicable)",
      "Passport-size Photographs", "Supporting documents relevant to requested corrections",
    ],
    processSteps: [
      "Review of existing PAN details",
      "Identification of required corrections",
      "Collection of supporting documents",
      "Preparation of correction application",
      "Verification of information",
      "Submission of correction request",
      "Processing by authorities",
      "Updated PAN issuance and verification",
    ],
    faqs: [
      { q: "What details can be corrected on a PAN card?", a: "Common corrections include name changes, date of birth updates, address changes, photograph updates, signature changes, and other personal information modifications." },
      { q: "How long does PAN correction take?", a: "Most PAN correction requests are processed within 7–15 business days, subject to verification and authority processing timelines." },
      { q: "Do I receive a new PAN number after correction?", a: "No. The PAN number generally remains the same; only the associated information is updated." },
      { q: "Can multiple corrections be requested in one application?", a: "Yes. Multiple updates may generally be requested through a single correction application, subject to documentation requirements." },
      { q: "Why is PAN correction important?", a: "Accurate PAN records help prevent issues during tax filing, banking, investments, KYC verification, and other financial activities." },
    ],
    whyChooseUs: [
      "Experienced PAN correction specialists",
      "Accurate document verification",
      "Fast application preparation support",
      "Application tracking assistance",
      "Support for complex correction requests",
      "Transparent and affordable pricing",
    ],
    seo: {
      title: "PAN Correction Services | Update PAN Card Details Online",
      description: "Correct and update your PAN card details with expert assistance. Name changes, address updates, date of birth corrections, photograph changes, and complete PAN correction support.",
      keywords: "PAN correction, PAN update services, correct PAN details, PAN name change, PAN card correction online, PAN address update, PAN modification services, update PAN card information",
    },
  },
  {
    slug: "itr-u-updated-return-filing",
    title: "ITR-U (Updated Return) Filing",
    icon: "RefreshCcw",
    shortDescription:
      "Missed filing your Income Tax Return or discovered errors in a previously filed return? File an ITR-U (Updated Return) with professional assistance and regularize your tax compliance while minimizing future complications.",
    hero: {
      heading: "Correct Past Tax Filing Mistakes With ITR-U",
      subheading: "Expert assistance for filing Updated Income Tax Returns, correcting omissions, reporting missed income, and improving tax compliance under applicable provisions.",
      ctaText: "File ITR-U Today",
    },
    quickInfo: { timeline: "1–5 Business Days", consultation: "Free Eligibility Assessment", startingPrice: "Starting at ₹1,999" },
    benefitItems: [
      { title: "Voluntary Tax Compliance", description: "Correct previously omitted income or filing mistakes before they result in notices, investigations, or compliance complications." },
      { title: "Reduce Future Tax Risks", description: "Updating tax records proactively can help minimize future disputes and regulatory concerns." },
      { title: "Professional Error Review", description: "We review previously filed returns and identify reporting gaps, omissions, and compliance issues requiring correction." },
      { title: "Complete Filing Assistance", description: "Receive end-to-end support for tax computation, additional tax calculations, document preparation, and updated return filing." },
    ],
    eligibilityItems: [
      { audience: "Individuals With Missed Tax Filings", note: "Suitable for taxpayers who failed to file returns within prescribed deadlines." },
      { audience: "Taxpayers With Reporting Errors", note: "Useful for correcting omissions, computational errors, and disclosure mistakes." },
      { audience: "Professionals and Freelancers", note: "Applicable when additional income requires reporting or correction." },
      { audience: "Business Owners and Investors", note: "Helps regularize tax records involving business income, investments, and capital gains." },
    ],
    requiredDocuments: [
      "PAN Card", "Aadhaar Card", "Previously Filed ITR (if applicable)", "Form 16", "Bank Statements",
      "Interest Certificates", "Capital Gains Statements", "Investment Proofs", "Business Income Records",
      "TDS Certificates", "Additional Income Documentation", "Tax Payment Records",
    ],
    processSteps: [
      "Eligibility assessment for ITR-U filing",
      "Review of previous returns and records",
      "Identification of omissions or errors",
      "Computation of revised tax liability",
      "Calculation of additional taxes and applicable charges",
      "Preparation of Updated Return",
      "Filing of ITR-U with tax authorities",
      "Verification and compliance support",
    ],
    faqs: [
      { q: "What is the purpose of ITR-U?", a: "ITR-U allows eligible taxpayers to voluntarily update previously filed returns or regularize missed tax filings under applicable provisions." },
      { q: "Can I file ITR-U if I forgot to report income?", a: "In many cases, omitted income can be reported through an Updated Return, subject to eligibility conditions and applicable regulations." },
      { q: "Is additional tax payable when filing ITR-U?", a: "Depending on the circumstances, taxpayers may need to pay additional taxes, interest, and other applicable charges." },
      { q: "Can everyone file an Updated Return?", a: "Eligibility depends on specific conditions prescribed under tax laws. Professional review is recommended before filing." },
      { q: "How long does ITR-U filing take?", a: "Most Updated Returns can be prepared and filed within 1–5 business days once complete documentation is available." },
    ],
    whyChooseUs: [
      "Experienced income tax professionals",
      "Detailed review of previous tax filings",
      "Accurate tax computation and correction support",
      "Guidance on eligibility and compliance requirements",
      "Fast turnaround and transparent process",
      "Ongoing support for notices and tax queries",
    ],
    seo: {
      title: "ITR-U Updated Return Filing Services | Correct Previous Income Tax Returns",
      description: "File your ITR-U Updated Return with expert assistance. Correct missed income, filing errors, and tax reporting issues while improving compliance and reducing future tax risks.",
      keywords: "ITR-U filing, updated return filing, income tax updated return, ITR correction filing, missed ITR filing, tax compliance update, updated income tax return, ITR-U consultant",
    },
  },
  {
    slug: "accounting-bookkeeping-services",
    title: "Accounting & Bookkeeping Services",
    icon: "BookOpen",
    shortDescription:
      "Focus on growing your business while we manage your books. Our accounting and bookkeeping services help startups, SMEs, LLPs, companies, ecommerce sellers, and professionals maintain accurate financial records and stay compliant year-round.",
    hero: {
      heading: "Professional Accounting & Bookkeeping For Growing Businesses",
      subheading: "Outsource your accounting, bookkeeping, reconciliations, and financial reporting to experienced professionals while focusing on business growth.",
      ctaText: "Book a Free Consultation",
    },
    quickInfo: { timeline: "Monthly Ongoing Service", consultation: "Free Business Assessment", startingPrice: "Starting at ₹2,999/Month" },
    benefitItems: [
      { title: "Accurate Financial Records", description: "Maintain organized and up-to-date financial records that support compliance, reporting, decision-making, and business growth." },
      { title: "Save Time and Resources", description: "Outsource bookkeeping and accounting tasks to professionals, allowing your team to focus on operations and revenue generation." },
      { title: "Improved Financial Visibility", description: "Receive timely reports and financial insights that help you understand business performance and cash flow." },
      { title: "Compliance Ready Books", description: "Well-maintained accounts simplify GST filing, income tax compliance, audits, annual filings, and business financing." },
    ],
    eligibilityItems: [
      { audience: "Startups and Small Businesses", note: "Ideal for businesses seeking cost-effective accounting support without hiring a full-time accountant." },
      { audience: "Private Limited Companies and LLPs", note: "Supports statutory compliance, reporting, and annual filing requirements." },
      { audience: "Ecommerce Sellers", note: "Helps manage marketplace transactions, reconciliations, and GST reporting." },
      { audience: "Consultants, Agencies, and Professionals", note: "Provides organized financial management and tax-ready records." },
    ],
    requiredDocuments: [
      "Business Registration Documents", "GST Registration Details (if applicable)", "Bank Statements",
      "Sales Invoices", "Purchase Invoices", "Expense Records", "Vendor Details", "Customer Receipts",
      "Previous Accounting Records", "Payroll Information (if applicable)", "Financial Reports (if available)",
    ],
    processSteps: [
      "Business assessment and accounting requirement review",
      "Collection of financial records and documents",
      "Accounting system setup or review",
      "Transaction recording and categorization",
      "Bank and ledger reconciliations",
      "Preparation of financial reports",
      "Ongoing bookkeeping and compliance support",
      "Monthly reporting and advisory assistance",
    ],
    faqs: [
      { q: "What is the difference between bookkeeping and accounting?", a: "Bookkeeping focuses on recording financial transactions, while accounting involves analysis, reporting, compliance, and financial management based on those records." },
      { q: "How often should bookkeeping be updated?", a: "Businesses should ideally update their books regularly, with many organizations choosing weekly or monthly bookkeeping cycles." },
      { q: "Can bookkeeping help with GST and tax compliance?", a: "Yes. Accurate bookkeeping simplifies GST filings, income tax returns, audits, and other compliance requirements." },
      { q: "Do startups need professional bookkeeping?", a: "Yes. Early-stage businesses benefit from organized financial records that support growth, funding, and compliance." },
      { q: "Can accounting services be outsourced?", a: "Yes. Many businesses outsource bookkeeping and accounting functions to reduce costs and access professional expertise." },
    ],
    whyChooseUs: [
      "Experienced accounting professionals",
      "Industry-specific bookkeeping solutions",
      "Monthly reporting and reconciliation support",
      "GST and tax-ready financial records",
      "Affordable outsourced accounting services",
      "Dedicated support for growing businesses",
    ],
    seo: {
      title: "Accounting & Bookkeeping Services for Businesses | Outsourced Accounting Solutions",
      description: "Professional accounting and bookkeeping services for startups, SMEs, LLPs, companies, ecommerce sellers, and professionals. Accurate records, reporting, reconciliations, and compliance support.",
      keywords: "accounting services India, bookkeeping services, outsourced accounting, bookkeeping for startups, accounting for LLP, accounting for private limited company, business bookkeeping services, financial record management",
    },
  },
]

// ─── Run ──────────────────────────────────────────────────────────────────────

const now = FieldValue.serverTimestamp()

async function upsertCategory() {
  const ref = db.collection("service_categories").doc(CATEGORY.id)
  const existing = await ref.get()
  const data = {
    slug: CATEGORY.slug,
    name: CATEGORY.name,
    description: CATEGORY.description,
    updatedAt: now,
    ...(existing.exists ? {} : { createdAt: now }),
  }
  await ref.set(data, { merge: true })
  console.log(`✓ category: ${CATEGORY.id}`)
}

async function upsertService(svc) {
  const ref = db.collection("services").doc(svc.slug)
  const existing = await ref.get()
  const data = {
    title: svc.title,
    slug: svc.slug,
    categoryId: CATEGORY.id,
    icon: svc.icon,
    shortDescription: svc.shortDescription,
    hero: svc.hero,
    quickInfo: svc.quickInfo,
    benefits: [],
    eligibility: [],
    benefitItems: svc.benefitItems,
    eligibilityItems: svc.eligibilityItems,
    requiredDocuments: svc.requiredDocuments,
    processSteps: svc.processSteps,
    whyChooseUs: svc.whyChooseUs,
    faqs: svc.faqs,
    relatedServices: [],
    seo: svc.seo,
    content: svc.shortDescription,
    featuredImage: "",
    status: "published",
    updatedAt: now,
    ...(existing.exists ? {} : { createdAt: now }),
  }
  await ref.set(data, { merge: true })
  console.log(`✓ service: ${svc.slug}`)
}

try {
  await upsertCategory()
  for (const svc of SERVICES) await upsertService(svc)
  console.log(`\nSeeded ${SERVICES.length} services under category "${CATEGORY.name}".`)
  process.exit(0)
} catch (err) {
  console.error("Seed failed:", err)
  process.exit(1)
}
