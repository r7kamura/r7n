import { visit } from "unist-util-visit";

export function convertAmazonLink() {
  return (tree: any) => {
    visit(tree, "link", function (node) {
      if (node.url.startsWith("https://www.amazon.co.jp/dp/")) {
        node.url += "?tag=r7kamuracom-22";
      }
    });
  };
}
