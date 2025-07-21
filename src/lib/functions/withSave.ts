import { createRawSnippet, mount, unmount } from 'svelte'
import DataSave from '$lib/components/data/DataSave.svelte';

export function withSave(ChildComponent: any, props: Record<string, any>, saver: Function) {
  return function($$anchor: any, $$props: any) {
    const mergedProps = { ...props, ...$$props };

    const saveProps = {
      ...mergedProps, // Save component gets access to all props
      saver,
      children: createRawSnippet((restProps) => ({
        render: () => `<div class="boundary save"></div>`,
        setup: (target) => {
          const childInstance = mount(ChildComponent, {
            target,
            props: { ...restProps, ...mergedProps }
          });
          return () => unmount(childInstance);
        }
      }))
    };

    return DataSave($$anchor, saveProps);
  };
}
