import { html, nothing } from 'lit';
import { Directive, directive, PartInfo, PartType } from 'lit/directive.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type BackdropSize = 'w300' | 'w780' | '1280' | 'original';
export type PosterSize = 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original';

class ImgDirective extends Directive {
  constructor(private part: PartInfo) {
    super(part);

    if (part.type !== PartType.ATTRIBUTE) {
      throw new Error('The `imgDirective` directive must be used in an img `src` attribute');
    }
  }

  render(srcSuffix: string, size: BackdropSize | PosterSize = 'original', classes?: string) {
    return html`<img
      class=${ifDefined(classes)}
      src="https://image.tmdb.org/t/p/${ifDefined(size)}${ifDefined(srcSuffix)}"
      alt=""
    />`;
  }
}

export const imgDirective = directive(ImgDirective);

export const imgSrc = (srcSuffix: any, size: BackdropSize | PosterSize = 'original') =>
  (typeof srcSuffix === 'string'
    ? `https://image.tmdb.org/t/p/${size}${srcSuffix}`
    : nothing) as string;
