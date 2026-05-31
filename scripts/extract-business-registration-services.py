"""Extract structured Business Registration service seed data from the source PDF."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from pypdf import PdfReader


TOP_LEVEL_SERVICE = re.compile(r"(?:^|\s)title:\s*([^:]{1,100}?)\s+slug:\s*([a-z0-9-]+)")


def between(text: str, start: str, end: str | None) -> str:
    start_index = text.index(start) + len(start)
    end_index = text.index(end, start_index) if end else len(text)
    return text[start_index:end_index].strip()


def scalar(text: str, label: str, next_label: str) -> str:
    return between(text, f"{label}: ", f" {next_label}: ")


def bullets(text: str, label: str, next_label: str) -> list[str]:
    value = scalar(text, label, next_label)
    return [item.strip() for item in value.split("\u25cf") if item.strip()]


def numbered(text: str, label: str, next_label: str) -> list[str]:
    value = scalar(text, label, next_label)
    return [
        re.sub(r"^\d+\.\s*", "", item).strip()
        for item in re.split(r"\s+(?=\d+\.\s)", value)
        if item.strip()
    ]


def benefit_items(text: str) -> list[dict[str, str]]:
    value = scalar(text, "benefitItems", "content")
    pattern = re.compile(
        r"\d+\.\s+title:\s+(.*?)\s+description:\s+(.*?)(?=\s+\d+\.\s+title:|$)"
    )
    return [
        {"title": title.strip(), "description": description.strip()}
        for title, description in pattern.findall(value)
    ]


def eligibility_items(text: str) -> list[dict[str, str]]:
    value = scalar(text, "eligibilityItems", "requiredDocuments")
    pattern = re.compile(
        r"\d+\.\s+audience:\s+(.*?)\s+note:\s+(.*?)(?=\s+\d+\.\s+audience:|$)"
    )
    return [
        {"audience": audience.strip(), "note": note.strip()}
        for audience, note in pattern.findall(value)
    ]


def faqs(text: str) -> list[dict[str, str]]:
    value = scalar(text, "faqs", "whyChooseUs")
    pattern = re.compile(r"\d+\.\s+q:\s+(.*?)\s+a:\s+(.*?)(?=\s+\d+\.\s+q:|$)")
    return [{"q": question.strip(), "a": answer.strip()} for question, answer in pattern.findall(value)]


def extract_service(chunk: str, title: str, slug: str) -> dict:
    return {
        "title": title,
        "slug": slug,
        "icon": "Building2",
        "shortDescription": scalar(chunk, "shortDescription", "hero.heading"),
        "hero": {
            "heading": scalar(chunk, "hero.heading", "hero.subheading"),
            "subheading": scalar(chunk, "hero.subheading", "hero.ctaText"),
            "ctaText": scalar(chunk, "hero.ctaText", "quickInfo.timeline"),
        },
        "quickInfo": {
            "timeline": scalar(chunk, "quickInfo.timeline", "quickInfo.consultation"),
            "consultation": scalar(chunk, "quickInfo.consultation", "quickInfo.startingPrice"),
            "startingPrice": scalar(chunk, "quickInfo.startingPrice", "benefitItems"),
        },
        "benefits": [],
        "eligibility": [],
        "benefitItems": benefit_items(chunk),
        "eligibilityItems": eligibility_items(chunk),
        "requiredDocuments": bullets(chunk, "requiredDocuments", "processSteps"),
        "processSteps": numbered(chunk, "processSteps", "faqs"),
        "whyChooseUs": bullets(chunk, "whyChooseUs", "seo.title"),
        "faqs": faqs(chunk),
        "relatedServices": [],
        "seo": {
            "title": scalar(chunk, "seo.title", "seo.description"),
            "description": scalar(chunk, "seo.description", "seo.keywords"),
            "keywords": between(chunk, "seo.keywords: ", None),
        },
        "content": "",
        "featuredImage": "",
        "status": "published",
    }


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: python scripts/extract-business-registration-services.py <source.pdf> <output.json>")

    source = Path(sys.argv[1])
    output = Path(sys.argv[2])
    text = " ".join(" ".join((page.extract_text() or "").split()) for page in PdfReader(source).pages)
    matches = list(TOP_LEVEL_SERVICE.finditer(text))
    services = []

    for index, match in enumerate(matches):
        chunk_end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        chunk = text[match.start():chunk_end].strip()
        services.append(extract_service(chunk, match.group(1).strip(), match.group(2)))

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(services, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Extracted {len(services)} services to {output}")


if __name__ == "__main__":
    main()
