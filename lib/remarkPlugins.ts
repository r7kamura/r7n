import { visit } from "unist-util-visit";
import { select } from "unist-util-select";

export function convertAmazonLink() {
  return (tree: any) => {
    visit(tree, "link", function (node) {
      if (node.url.startsWith("https://www.amazon.co.jp/dp/")) {
        node.url += "?tag=r7kamuracom-22";
      }
    });
  };
}

export function extractDescription() {
  return (tree: any, file: any) => {
    const firstParagraphText = select("paragraph text", tree) as any;
    if (firstParagraphText && firstParagraphText.value) {
      const segments = firstParagraphText.value.split("。");
      if (segments.length >= 2) {
        file.data.description = `${segments[0]}。`.substring(0, 140);
      }
    }
  };
}
