import * as React from "react";

const LangsDict = {
  en: "English",
  ru: "Русский"
};

type AvailableLangs = keyof typeof LangsDict

export const LangContext = React.createContext({ lang: 'en', onLangChange: (_: AvailableLangs) => {}});

export type LangProviderProps = {
  lang: AvailableLangs;
};

type LangProviderState = {
  lang: AvailableLangs;
  onLangChange: (newLang: AvailableLangs) => void;
};

export type LangContextValue = LangProviderState;

export class LangProvider extends React.Component<LangProviderProps, LangProviderState> {
  constructor(props: LangProviderProps) {
    super(props);
    this.state = {
      lang: props.lang,
      onLangChange: this.handleLangChange
    };
  }

  handleLangChange = (newLang: AvailableLangs) =>
    this.setState({ lang: newLang });

  render() {
    return (
      <LangContext.Provider value={this.state}>
        {this.props.children}
      </LangContext.Provider>
    );
  }
}

const enStrings = {
  title: "Hello",
  fruits: {
    apple: "Apple",
    orange: "Orange",
  },
  sayHi: (name: string) => `Hi, ${name}`
};

const ruStrings = {
  title: "Привет",
  fruits: {
    apple: "Ябылко",
    orange: "Аплесин"
  },
  sayHi: (name: string) => `Превед, ${name}`
};

const langs: Record<AvailableLangs, typeof enStrings> = {
  en: enStrings,
  ru: ruStrings
};

type ResourseProviderFunc = (strings: typeof enStrings) => React.ReactNode

type LocalizeFunc = (key: keyof typeof enStrings | ResourseProviderFunc) => React.ReactNode;

export type LangConsumerProps = {
  children: (renderProp: { l: LocalizeFunc }) => React.ReactNode;
};

export class LangConsumer extends React.Component<LangConsumerProps, {}> {
  static contextType = LangContext;

  isKeyof(key: keyof typeof enStrings | ResourseProviderFunc): key is keyof typeof enStrings {
    return typeof key === 'string'
  }

  localize: LocalizeFunc = key => {
    const resource = langs[(this.context as LangContextValue).lang]
    if (this.isKeyof(key))
      return resource[key];
    else
      return key(resource);
  }

  render() {
    return this.props.children({ l: this.localize })
  }
}
