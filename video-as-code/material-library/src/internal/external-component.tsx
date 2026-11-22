import { useEffect, useState, type ComponentType } from "react";

type ExternalComponentLoader = () => Promise<unknown>;

export function createExternalComponent<Props extends object>(
  load: ExternalComponentLoader,
  exportName: string,
  displayName: string,
) {
  function ExternalComponent(props: Props) {
    const [LoadedComponent, setLoadedComponent] = useState<ComponentType<Props> | null>(null);

    useEffect(() => {
      let isMounted = true;

      load()
        .then((module) => {
          const candidate = (module as Record<string, unknown>)[exportName];

          if (!isMounted || typeof candidate !== "function") {
            return;
          }

          setLoadedComponent(() => candidate as ComponentType<Props>);
        })
        .catch(() => {
          if (isMounted) {
            setLoadedComponent(null);
          }
        });

      return () => {
        isMounted = false;
      };
    }, []);

    if (!LoadedComponent) {
      return null;
    }

    return <LoadedComponent {...props} />;
  }

  ExternalComponent.displayName = displayName;

  return ExternalComponent;
}
