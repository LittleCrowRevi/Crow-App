
export function ChangeStyle(property: string, value: string) {

  let root = document.documentElement;

  root.style.setProperty(property, value);
}