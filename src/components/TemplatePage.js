import { readFileSync } from "fs";
import path from "path";

const ROUTE_REPLACEMENTS = [
  ["index.html", "/"],
  ["about.html", "/about"],
  ["service.html", "/service"],
  ["project.html", "/project"],
  ["feature.html", "/feature"],
  ["quote.html", "/quote"],
  ["team.html", "/team"],
  ["testimonial.html", "/testimonial"],
  ["contact.html", "/contact"],
  ["404.html", "/404"],
];

const ASSET_PREFIXES = [
  ["src=\"img/", "src=\"/img/"],
  ["src='img/", "src='/img/"],
  ["href=\"img/", "href=\"/img/"],
  ["href='img/", "href='/img/"],
  ["src=\"lib/", "src=\"/lib/"],
  ["src='lib/", "src='/lib/"],
  ["href=\"lib/", "href=\"/lib/"],
  ["href='lib/", "href='/lib/"],
  ["src=\"js/", "src=\"/js/"],
  ["src='js/", "src='/js/"],
  ["href=\"css/", "href=\"/css/"],
  ["href='css/", "href='/css/"],
];

function normalizeTemplateHtml(html) {
  let output = html;
  for (const [from, to] of ROUTE_REPLACEMENTS) {
    output = output.replaceAll(`href=\"${from}\"`, `href=\"${to}\"`);
    output = output.replaceAll(`href='${from}'`, `href='${to}'`);
  }
  for (const [from, to] of ASSET_PREFIXES) {
    output = output.replaceAll(from, to);
  }
  output = output.replace(/<script[\s\S]*?<\/script>/gi, "");
  return output;
}

export default function TemplatePage({ file }) {
  const templatePath = path.join(process.cwd(), "src", "templates", file);
  const html = readFileSync(templatePath, "utf8");
  const normalizedHtml = normalizeTemplateHtml(html);

  return <div dangerouslySetInnerHTML={{ __html: normalizedHtml }} />;
}
