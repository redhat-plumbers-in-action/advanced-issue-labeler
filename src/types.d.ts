export type TConfigObject = {
  policy: TPolicyItem[];
};

export type TPolicyItem = {
  template?: string[];
  section: TSectionItem[];
};

export type TSectionItem = {
  id: string[];
  'block-list'?: string[];
  label: TLabelItem[];
};

export type TLabelItem = {
  name: string;
  keys: string[];
};

export type TInputs = {
  template?: string;
  section?: string;
  blockList?: string[];
};
