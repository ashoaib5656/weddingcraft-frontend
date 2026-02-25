// allow imports with ?component
declare module "*.svg?component" {
  import * as React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>;
  export default ReactComponent;
}
