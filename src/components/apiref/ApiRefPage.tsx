import { Children, isValidElement, type ReactNode } from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import "./styles.css";

type ApiRefPageProps = {
  children: ReactNode;
};

function collectAnchors(node: ReactNode, collectAnchor: (anchor: string | undefined) => void): void {
  Children.forEach(node, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    const props = child.props as { id?: string; children?: ReactNode };
    collectAnchor(props.id);
    collectAnchors(props.children, collectAnchor);
  });
}

export default function ApiRefPage({ children }: ApiRefPageProps) {
  const brokenLinks = useBrokenLinks();
  collectAnchors(children, brokenLinks.collectAnchor);

  return <div className="apiref-page">{children}</div>;
}