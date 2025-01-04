import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';

import '../css/app.css';

createInertiaApp({
  title: title => `Priority matrix - ${title}`,
  resolve: name =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
    ),
  setup: ({ el, App, props }) => {
    if (import.meta.env.SSR) {
      hydrateRoot(el, <App {...props} />);

      return;
    }

    createRoot(el).render(<App {...props} />);
  },
  progress: {
    color: '#4B5563',
  },
});
