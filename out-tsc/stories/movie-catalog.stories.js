import { html } from 'lit';
import '../src/movie-catalog.js';
export default {
    title: 'MovieCatalog',
    component: 'movie-catalog',
    argTypes: {
        backgroundColor: { control: 'color' },
    },
};
const Template = ({ backgroundColor = 'white' }) => html `
  <movie-catalog style="--movie-catalog-background-color: ${backgroundColor}"></movie-catalog>
`;
export const App = Template.bind({});
App.args = {};
//# sourceMappingURL=movie-catalog.stories.js.map