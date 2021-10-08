import { html, TemplateResult } from 'lit';
import '../src/movie-catalog.js';

export default {
  title: 'MovieCatalog',
  component: 'movie-catalog',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ backgroundColor = 'white' }: ArgTypes) => html`
  <movie-catalog style="--movie-catalog-background-color: ${backgroundColor}"></movie-catalog>
`;

export const App = Template.bind({});
App.args = {};
