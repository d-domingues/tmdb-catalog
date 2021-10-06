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
  title?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ title, backgroundColor = 'white' }: ArgTypes) => html`
  <movie-catalog style="--movie-catalog-background-color: ${backgroundColor}" .title=${title}></movie-catalog>
`;

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
