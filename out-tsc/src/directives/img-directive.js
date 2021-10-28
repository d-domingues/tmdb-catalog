import { html, nothing } from 'lit';
import { Directive, directive, PartType } from 'lit/directive.js';
import { ifDefined } from 'lit/directives/if-defined.js';
class ImgDirective extends Directive {
    constructor(part) {
        super(part);
        this.part = part;
        if (part.type !== PartType.ATTRIBUTE) {
            throw new Error('The `imgDirective` directive must be used in an img `src` attribute');
        }
    }
    render(srcSuffix, size = 'original', classes) {
        return html `<img
      class=${ifDefined(classes)}
      src="https://image.tmdb.org/t/p/${ifDefined(size)}${ifDefined(srcSuffix)}"
      alt=""
    />`;
    }
}
export const imgDirective = directive(ImgDirective);
export const imgSrc = (srcSuffix, size = 'original') => (typeof srcSuffix === 'string'
    ? `https://image.tmdb.org/t/p/${size}${srcSuffix}`
    : nothing);
//# sourceMappingURL=img-directive.js.map