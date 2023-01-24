export enum TabsValueType {
  LONG = 'LONG',
  SHORT = 'SHORT',
}

export interface TabType {
  title: string;
  value: TabsValueType;
  id: string;
}
