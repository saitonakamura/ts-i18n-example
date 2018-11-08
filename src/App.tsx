import * as React from "react";
import { LangConsumer } from "./i18n";

interface Props {
  name: string;
}

export const App: React.SFC<Props> = props => (
  <LangConsumer>{({ l }) => 
    <React.Fragment>
      <b>{l("title")} {props.name}</b>
      <div>{l(s => s.fruits.apple)}</div>
      <div>{l(s => s.sayHi('Meshanya'))}</div>
    </React.Fragment>
  }</LangConsumer>
);