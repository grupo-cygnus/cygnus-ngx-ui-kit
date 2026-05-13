import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

@Component({
  selector: 'app-fonts-content',
  imports: [
    Highlight, HighlightLineNumbers,
  ],
  templateUrl: './fonts-content.component.html',
  styleUrl: './fonts-content.component.scss'
})
export class FontsContentComponent {

  peerDependenciesFonts: string = `
    "peerDependencies": {
      ...,
      "@fontsource/nunito-sans": "^5.0.0",
      "@fontsource/inter": "^5.0.0",
      "@fontsource/dm-sans": "^5.0.0"
    },
  `;

  packageJsonFonts: string = `
    "dependencies": {
      ...,
      "@fontsource/dm-sans": "^5.0.0",
      "@fontsource/inter": "^5.2.8",
      "@fontsource/nunito-sans": "^5.2.7",
      ...
    },
  `;

  stylesCss: string = `
    @import 'ngx-cygnus-ui/styles.css';

    /* FONTS */
    @import '@fontsource/nunito-sans';
    @import "@fontsource/inter";
    @import '@fontsource/dm-sans';

    :root {
      --font-nunito-sans: 'Nunito Sans', sans-serif;
      --font-inter      : "Inter", ui-sans-serif, system-ui, sans-serif;
      --font-dm-sans    : "DM-Sans", ui-sans-serif, system-ui, sans-serif;
    }

    body, html {
      font-family: var(--font-dm-sans);
    }
  `;

}
